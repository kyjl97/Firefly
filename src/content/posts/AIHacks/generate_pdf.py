#!/usr/bin/env python3
"""
Generate a business-style PDF from a Markdown file with proper Chinese font support.
Outputs: cover page + table of contents + body content with page numbers.
"""

import re
import os
import sys
from datetime import datetime
from html import escape

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, black, white, Color
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, ListFlowable, ListItem, Flowable, HRFlowable, Image as RLImage
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

# ============================================================
# Font Registration
# ============================================================

FONT_REGULAR = "MSYH"
FONT_BOLD = "MSYHBD"
FONT_LIGHT = "SimSun"
FONT_MONO = "SimHei"

def register_fonts():
    """Register Chinese fonts with reportlab."""
    font_paths = {
        FONT_REGULAR: [
            r"C:\Windows\Fonts\msyh.ttc",
            r"C:\Windows\Fonts\msyh.ttf",
        ],
        FONT_BOLD: [
            r"C:\Windows\Fonts\msyhbd.ttc",
            r"C:\Windows\Fonts\msyhbd.ttf",
            r"C:\Windows\Fonts\msyh.ttc",
        ],
        FONT_LIGHT: [
            r"C:\Windows\Fonts\simsun.ttc",
            r"C:\Windows\Fonts\simsun.ttf",
        ],
        FONT_MONO: [
            r"C:\Windows\Fonts\simhei.ttf",
            r"C:\Windows\Fonts\simkai.ttf",
        ],
    }

    for font_name, paths in font_paths.items():
        for path in paths:
            if os.path.exists(path):
                try:
                    pdfmetrics.registerFont(TTFont(font_name, path))
                    print(f"  Registered font: {font_name} from {path}")
                    break
                except Exception as e:
                    # Try subfontIndex for .ttc files
                    try:
                        pdfmetrics.registerFont(TTFont(font_name, path, subfontIndex=0))
                        print(f"  Registered font: {font_name} from {path} (subfont 0)")
                        break
                    except Exception as e2:
                        print(f"  Failed to register {font_name} from {path}: {e2}")
                        continue
        else:
            print(f"  WARNING: No font file found for {font_name}")

    # Register font family for bold/italic mapping
    from reportlab.pdfbase.pdfmetrics import registerFontFamily
    registerFontFamily(
        FONT_REGULAR,
        normal=FONT_REGULAR,
        bold=FONT_BOLD,
        italic=FONT_REGULAR,
        boldItalic=FONT_BOLD,
    )

# ============================================================
# Color Palette - Business Minimalist
# ============================================================

COLOR_PRIMARY = HexColor("#1a1a2e")    # Deep navy
COLOR_ACCENT = HexColor("#16213e")     # Darker navy
COLOR_TEXT = HexColor("#333333")       # Dark gray
COLOR_LIGHT = HexColor("#666666")      # Medium gray
COLOR_VERY_LIGHT = HexColor("#999999") # Light gray
COLOR_BG_LIGHT = HexColor("#f5f5f5")   # Very light gray bg
COLOR_BORDER = HexColor("#e0e0e0")     # Border gray
COLOR_ACCENT_BLUE = HexColor("#0f3460") # Accent blue
COLOR_CODE_BG = HexColor("#f8f8f8")    # Code block bg
COLOR_QUOTE_BG = HexColor("#f0f4f8")   # Quote bg
COLOR_QUOTE_BORDER = HexColor("#4a90d9") # Quote left border
COLOR_TABLE_HEADER = HexColor("#1a1a2e") # Table header bg
COLOR_TABLE_ROW_ALT = HexColor("#f9f9f9") # Alt row

# ============================================================
# Markdown Parser
# ============================================================

class MarkdownParser:
    """Parse markdown into a list of (type, content) tuples."""

    def __init__(self, text):
        self.lines = text.split("\n")
        self.pos = 0
        self.elements = []

    def parse(self):
        # Skip frontmatter
        if self.lines and self.lines[0].strip() == "---":
            self._skip_frontmatter()

        while self.pos < len(self.lines):
            line = self.lines[self.pos]

            # Skip empty lines
            if not line.strip():
                self.pos += 1
                continue

            # Images - parse and embed
            img_match = re.match(r'^!\[.*\]\((.+)\)$', line.strip())
            if img_match:
                img_url = img_match.group(1)
                self.elements.append(("image", img_url))
                self.pos += 1
                continue

            # Headings
            if line.startswith("#"):
                level = len(line) - len(line.lstrip("#"))
                text = line.lstrip("#").strip()
                self.elements.append(("heading", level, text))
                self.pos += 1
                continue

            # Code block
            if line.strip().startswith("```"):
                self._parse_code_block()
                continue

            # Table
            if "|" in line and self.pos + 1 < len(self.lines) and "---" in self.lines[self.pos + 1]:
                self._parse_table()
                continue

            # Blockquote
            if line.strip().startswith(">"):
                self._parse_blockquote()
                continue

            # List items
            if re.match(r'^[\s]*[-*]\s', line):
                self._parse_list()
                continue

            # Numbered list
            if re.match(r'^[\s]*\d+\.\s', line):
                self._parse_numbered_list()
                continue

            # Regular paragraph
            self._parse_paragraph()

        return self.elements

    def _skip_frontmatter(self):
        self.pos = 1  # skip opening ---
        while self.pos < len(self.lines):
            if self.lines[self.pos].strip() == "---":
                self.pos += 1
                break
            self.pos += 1

    def _parse_code_block(self):
        self.pos += 1  # skip opening ```
        code_lines = []
        while self.pos < len(self.lines):
            if self.lines[self.pos].strip().startswith("```"):
                self.pos += 1
                break
            code_lines.append(self.lines[self.pos])
            self.pos += 1
        code_text = "\n".join(code_lines)
        self.elements.append(("code", code_text))

    def _parse_table(self):
        header_line = self.lines[self.pos]
        self.pos += 1  # skip header
        self.pos += 1  # skip separator

        headers = [c.strip() for c in header_line.split("|") if c.strip()]
        rows = []
        while self.pos < len(self.lines):
            line = self.lines[self.pos]
            if not line.strip() or "|" not in line:
                break
            cells = [c.strip() for c in line.split("|")]
            # Remove empty first/last from splitting
            cells = [c for c in cells if c != ""]
            if cells:
                rows.append(cells)
            self.pos += 1

        self.elements.append(("table", headers, rows))

    def _parse_blockquote(self):
        quote_lines = []
        while self.pos < len(self.lines):
            line = self.lines[self.pos]
            if line.strip().startswith(">"):
                text = line.strip().lstrip(">").strip()
                quote_lines.append(text)
                self.pos += 1
            elif not line.strip():
                break
            else:
                break
        self.elements.append(("blockquote", "\n".join(quote_lines)))

    def _parse_list(self):
        items = []
        indent_stack = [0]
        while self.pos < len(self.lines):
            line = self.lines[self.pos]
            if not line.strip():
                self.pos += 1
                # Check if next non-empty line is still a list item
                if self.pos < len(self.lines) and re.match(r'^[\s]*[-*]\s', self.lines[self.pos]):
                    continue
                else:
                    break
            if re.match(r'^[\s]*[-*]\s', line):
                indent = len(line) - len(line.lstrip())
                text = re.sub(r'^[\s]*[-*]\s+', '', line)
                items.append((indent, text))
                self.pos += 1
            else:
                break
        self.elements.append(("list", items))

    def _parse_numbered_list(self):
        items = []
        while self.pos < len(self.lines):
            line = self.lines[self.pos]
            if not line.strip():
                self.pos += 1
                if self.pos < len(self.lines) and re.match(r'^[\s]*\d+\.\s', self.lines[self.pos]):
                    continue
                else:
                    break
            if re.match(r'^[\s]*\d+\.\s', line):
                text = re.sub(r'^[\s]*\d+\.\s+', '', line)
                items.append(text)
                self.pos += 1
            else:
                break
        self.elements.append(("numbered_list", items))

    def _parse_paragraph(self):
        para_lines = []
        while self.pos < len(self.lines):
            line = self.lines[self.pos]
            if not line.strip():
                break
            if line.startswith("#") or line.strip().startswith("```") or line.strip().startswith(">"):
                break
            if re.match(r'^[\s]*[-*]\s', line) or re.match(r'^[\s]*\d+\.\s', line):
                break
            if "|" in line and self.pos + 1 < len(self.lines) and "---" in self.lines[self.pos + 1]:
                break
            if re.match(r'^!\[.*\]\(.*\)$', line.strip()):
                img_m = re.match(r'^!\[.*\]\((.+)\)$', line.strip())
                if img_m:
                    self.elements.append(("image", img_m.group(1)))
                self.pos += 1
                continue
            para_lines.append(line.strip())
            self.pos += 1

        if para_lines:
            text = " ".join(para_lines)
            self.elements.append(("paragraph", text))


# ============================================================
# Inline Markdown Formatting
# ============================================================

def process_inline(text):
    """Convert markdown inline formatting to reportlab-compatible HTML."""
    # Escape XML special chars first
    text = escape(text)

    # Bold + italic ***text***
    text = re.sub(r'\*\*\*(.+?)\*\*\*', r'<b><i>\1</i></b>', text)
    # Bold **text**
    text = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', text)
    # Italic *text*
    text = re.sub(r'\*(.+?)\*', r'<i>\1</i>', text)
    # Inline code `text`
    text = re.sub(r'`([^`]+)`', r'<font name="' + FONT_MONO + r'" size="9" color="#c7254e">\1</font>', text)
    # Links [text](url) -> clickable hyperlink with color (only external http/https)
    # Internal anchor links (#xxx) are kept as plain underlined text
    def _link_repl(m):
        link_text = m.group(1)
        url = m.group(2)
        if url.startswith("http://") or url.startswith("https://"):
            return f'<a href="{url}" color="#1a5fb4">{link_text}</a>'
        else:
            return f'<u>{link_text}</u>'

    text = re.sub(r'\[([^\]]+)\]\(([^\)]+)\)', _link_repl, text)

    return text


# ============================================================
# Styles
# ============================================================

def create_styles():
    """Create paragraph styles for the document."""
    styles = {}

    styles["title"] = ParagraphStyle(
        "CustomTitle",
        fontName=FONT_BOLD,
        fontSize=26,
        leading=36,
        textColor=COLOR_PRIMARY,
        alignment=TA_CENTER,
        spaceAfter=10,
    )

    styles["subtitle"] = ParagraphStyle(
        "CustomSubtitle",
        fontName=FONT_REGULAR,
        fontSize=14,
        leading=20,
        textColor=COLOR_LIGHT,
        alignment=TA_CENTER,
        spaceAfter=6,
    )

    styles["date"] = ParagraphStyle(
        "CustomDate",
        fontName=FONT_REGULAR,
        fontSize=11,
        leading=16,
        textColor=COLOR_VERY_LIGHT,
        alignment=TA_CENTER,
    )

    styles["h1"] = ParagraphStyle(
        "H1",
        fontName=FONT_BOLD,
        fontSize=18,
        leading=26,
        textColor=COLOR_PRIMARY,
        spaceBefore=24,
        spaceAfter=12,
        keepWithNext=True,
    )

    styles["h2"] = ParagraphStyle(
        "H2",
        fontName=FONT_BOLD,
        fontSize=15,
        leading=22,
        textColor=COLOR_ACCENT_BLUE,
        spaceBefore=18,
        spaceAfter=8,
        keepWithNext=True,
    )

    styles["h3"] = ParagraphStyle(
        "H3",
        fontName=FONT_BOLD,
        fontSize=13,
        leading=19,
        textColor=COLOR_ACCENT,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True,
    )

    styles["h4"] = ParagraphStyle(
        "H4",
        fontName=FONT_BOLD,
        fontSize=11.5,
        leading=17,
        textColor=COLOR_TEXT,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True,
    )

    styles["body"] = ParagraphStyle(
        "Body",
        fontName=FONT_REGULAR,
        fontSize=10.5,
        leading=18,
        textColor=COLOR_TEXT,
        alignment=TA_JUSTIFY,
        spaceAfter=6,
        firstLineIndent=0,
    )

    styles["list_item"] = ParagraphStyle(
        "ListItem",
        fontName=FONT_REGULAR,
        fontSize=10.5,
        leading=17,
        textColor=COLOR_TEXT,
        spaceAfter=3,
        leftIndent=10,
    )

    styles["quote"] = ParagraphStyle(
        "Quote",
        fontName=FONT_REGULAR,
        fontSize=10.5,
        leading=17,
        textColor=COLOR_LIGHT,
        leftIndent=15,
        rightIndent=10,
        spaceBefore=6,
        spaceAfter=6,
        borderColor=COLOR_QUOTE_BORDER,
        borderWidth=0,
        backColor=COLOR_QUOTE_BG,
        borderPadding=8,
    )

    styles["code"] = ParagraphStyle(
        "Code",
        fontName=FONT_MONO,
        fontSize=9,
        leading=14,
        textColor=COLOR_TEXT,
        backColor=COLOR_CODE_BG,
        leftIndent=10,
        rightIndent=10,
        spaceBefore=4,
        spaceAfter=4,
        borderPadding=6,
    )

    styles["table_header"] = ParagraphStyle(
        "TableHeader",
        fontName=FONT_BOLD,
        fontSize=9.5,
        leading=14,
        textColor=white,
        alignment=TA_CENTER,
    )

    styles["table_cell"] = ParagraphStyle(
        "TableCell",
        fontName=FONT_REGULAR,
        fontSize=9.5,
        leading=14,
        textColor=COLOR_TEXT,
        alignment=TA_LEFT,
    )

    styles["toc_title"] = ParagraphStyle(
        "TocTitle",
        fontName=FONT_BOLD,
        fontSize=20,
        leading=28,
        textColor=COLOR_PRIMARY,
        alignment=TA_CENTER,
        spaceAfter=20,
    )

    # ---- Cover page styles (light text on dark bg) ----
    styles["cover_title"] = ParagraphStyle(
        "CoverTitle",
        fontName=FONT_BOLD,
        fontSize=28,
        leading=42,
        textColor=white,
        alignment=TA_CENTER,
        spaceAfter=10,
    )

    styles["cover_subtitle"] = ParagraphStyle(
        "CoverSubtitle",
        fontName=FONT_REGULAR,
        fontSize=14,
        leading=20,
        textColor=HexColor("#aabbdd"),
        alignment=TA_CENTER,
        spaceAfter=6,
    )

    styles["cover_date"] = ParagraphStyle(
        "CoverDate",
        fontName=FONT_REGULAR,
        fontSize=11,
        leading=16,
        textColor=HexColor("#8899bb"),
        alignment=TA_CENTER,
    )

    styles["cover_author"] = ParagraphStyle(
        "CoverAuthor",
        fontName=FONT_BOLD,
        fontSize=12,
        leading=18,
        textColor=HexColor("#ccddee"),
        alignment=TA_CENTER,
    )

    styles["cover_role"] = ParagraphStyle(
        "CoverRole",
        fontName=FONT_REGULAR,
        fontSize=10,
        leading=15,
        textColor=HexColor("#7788aa"),
        alignment=TA_CENTER,
    )

    styles["cover_label"] = ParagraphStyle(
        "CoverLabel",
        fontName=FONT_REGULAR,
        fontSize=12,
        leading=18,
        textColor=HexColor("#aabbdd"),
        alignment=TA_CENTER,
    )

    return styles


# ============================================================
# Custom Flowables
# ============================================================

class HRule(Flowable):
    """Horizontal rule."""
    def __init__(self, width, color=COLOR_BORDER, thickness=0.5):
        Flowable.__init__(self)
        self.width = width
        self.color = color
        self.thickness = thickness

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.thickness)
        self.canv.line(0, 0, self.width, 0)


class CodeBlock(Flowable):
    """Code block with background and border."""
    def __init__(self, text, style, width):
        Flowable.__init__(self)
        self.text = text
        self.style = style
        self.width = width
        self.lines = text.split("\n")
        self.line_height = 14
        self.padding = 8
        self.height = len(self.lines) * self.line_height + self.padding * 2

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        return (self.width, self.height)

    def draw(self):
        c = self.canv
        # Background
        c.setFillColor(COLOR_CODE_BG)
        c.roundRect(0, 0, self.width, self.height, 3, fill=1, stroke=0)
        # Left border accent
        c.setFillColor(COLOR_ACCENT_BLUE)
        c.rect(0, 0, 3, self.height, fill=1, stroke=0)
        # Text
        c.setFillColor(COLOR_TEXT)
        c.setFont(FONT_MONO, 9)
        y = self.height - self.padding - 10
        for line in self.lines:
            # Truncate long lines
            display_line = line
            if len(display_line) > 85:
                display_line = display_line[:82] + "..."
            c.drawString(self.padding + 5, y, display_line)
            y -= self.line_height


# ============================================================
# PDF Builder
# ============================================================

class TocDocTemplate(SimpleDocTemplate):
    """Custom doc template that captures TOC entries via afterFlowable."""

    def afterFlowable(self, flowable):
        """Called after each flowable is drawn - used for TOC entries."""
        if hasattr(flowable, "_bookmarkName"):
            level = flowable._toc_level
            text = flowable._toc_text
            key = flowable._bookmarkName

            self.canv.bookmarkPage(key)
            self.notify("TOCEntry", (level, text, self.canv.getPageNumber(), key))


class PDFBuilder:
    def __init__(self, output_path, md_text, title, date_str):
        self.output_path = output_path
        self.md_text = md_text
        self.title = title
        self.date_str = date_str
        self.styles = create_styles()
        self.story = []
        self.toc_entries = []

        # Page dimensions
        self.page_width, self.page_height = A4
        self.margin_left = 25 * mm
        self.margin_right = 25 * mm
        self.margin_top = 25 * mm
        self.margin_bottom = 25 * mm
        self.content_width = self.page_width - self.margin_left - self.margin_right

    def build(self):
        """Build the full PDF document."""
        register_fonts()

        # Parse markdown
        parser = MarkdownParser(self.md_text)
        elements = parser.parse()

        # Build story
        self._build_cover()
        self.story.append(PageBreak())
        self._build_toc()
        self.story.append(PageBreak())
        self._build_body(elements)

        # Create document with page numbers
        doc = TocDocTemplate(
            self.output_path,
            pagesize=A4,
            leftMargin=self.margin_left,
            rightMargin=self.margin_right,
            topMargin=self.margin_top,
            bottomMargin=self.margin_bottom,
            title=self.title,
            author="kyjl97",
        )

        # Multi-pass build for TOC
        doc.multiBuild(self.story, onFirstPage=self._on_page, onLaterPages=self._on_page)

        print(f"\nPDF generated: {self.output_path}")

    def _build_cover(self):
        """Build the cover page content (text only; background drawn in _on_page)."""
        # Top spacing to push title to vertical center area
        self.story.append(Spacer(1, 85 * mm))

        # Title
        self.story.append(Paragraph(self.title, self.styles["cover_title"]))

        # Subtitle
        self.story.append(Spacer(1, 6 * mm))
        self.story.append(Paragraph("AI Agent Tools Guide", self.styles["cover_subtitle"]))

        # Date
        self.story.append(Spacer(1, 3 * mm))
        self.story.append(Paragraph(self.date_str, self.styles["cover_date"]))

        # Bottom spacing
        self.story.append(Spacer(1, 55 * mm))

        # Author info
        self.story.append(Paragraph("kyjl97 / KYJL97", self.styles["cover_author"]))
        self.story.append(Spacer(1, 2 * mm))
        self.story.append(Paragraph("Digital Productivity Practitioner", self.styles["cover_role"]))

    def _build_toc(self):
        """Build the table of contents page."""
        self.story.append(Paragraph("CONTENTS", self.styles["toc_title"]))
        self.story.append(HRFlowable(
            width="40%", thickness=1.5, color=COLOR_ACCENT_BLUE,
            spaceBefore=0, spaceAfter=20, hAlign="CENTER"
        ))

        toc = TableOfContents()
        toc.levelStyles = [
            ParagraphStyle(
                name="TOCLevel0",
                fontName=FONT_BOLD,
                fontSize=11.5,
                leading=20,
                textColor=COLOR_PRIMARY,
                leftIndent=0,
                firstLineIndent=0,
                spaceBefore=4,
            ),
            ParagraphStyle(
                name="TOCLevel1",
                fontName=FONT_REGULAR,
                fontSize=10.5,
                leading=18,
                textColor=COLOR_TEXT,
                leftIndent=20,
                firstLineIndent=0,
                spaceBefore=2,
            ),
            ParagraphStyle(
                name="TOCLevel2",
                fontName=FONT_REGULAR,
                fontSize=10,
                leading=16,
                textColor=COLOR_LIGHT,
                leftIndent=40,
                firstLineIndent=0,
                spaceBefore=1,
            ),
        ]
        self.story.append(toc)

    def _build_body(self, elements):
        """Build the body content from parsed elements."""
        heading_counter = 0

        for elem in elements:
            elem_type = elem[0]

            if elem_type == "heading":
                level = elem[1]
                text = elem[2]
                processed = process_inline(text)

                if level == 1:
                    style = self.styles["h1"]
                    toc_level = 0
                elif level == 2:
                    style = self.styles["h2"]
                    toc_level = 0
                elif level == 3:
                    style = self.styles["h3"]
                    toc_level = 1
                else:
                    style = self.styles["h4"]
                    toc_level = 2

                # Create heading with bookmark and TOC entry
                heading_counter += 1
                bookmark_key = f"heading_{heading_counter}"

                para = Paragraph(processed, style)
                para._bookmarkName = bookmark_key
                para._toc_level = toc_level
                para._toc_text = text

                # Add TOC entry via afterFlowable hook
                self.story.append(para)

            elif elem_type == "paragraph":
                processed = process_inline(elem[1])
                self.story.append(Paragraph(processed, self.styles["body"]))

            elif elem_type == "list":
                items = elem[1]
                flowables = []
                for indent, text in items:
                    processed = process_inline(text)
                    indent_level = 0
                    if indent >= 4:
                        indent_level = 1
                    style = ParagraphStyle(
                        f"ListItem_{indent_level}",
                        parent=self.styles["list_item"],
                        leftIndent=15 + indent_level * 20,
                        bulletIndent=5 + indent_level * 20,
                    )
                    p = Paragraph(processed, style, bulletText="\u2022")
                    flowables.append(p)

                for f in flowables:
                    self.story.append(f)
                self.story.append(Spacer(1, 4))

            elif elem_type == "numbered_list":
                items = elem[1]
                for i, text in enumerate(items, 1):
                    processed = process_inline(text)
                    style = ParagraphStyle(
                        f"NumItem_{i}",
                        parent=self.styles["list_item"],
                        leftIndent=20,
                        bulletIndent=5,
                    )
                    p = Paragraph(processed, style, bulletText=f"{i}.")
                    self.story.append(p)
                self.story.append(Spacer(1, 4))

            elif elem_type == "code":
                code_block = CodeBlock(elem[1], self.styles["code"], self.content_width)
                self.story.append(Spacer(1, 4))
                self.story.append(code_block)
                self.story.append(Spacer(1, 4))

            elif elem_type == "blockquote":
                text = elem[1]
                processed = process_inline(text)
                # Create a table to simulate blockquote with left border
                quote_para = Paragraph(processed, self.styles["quote"])

                # Use a simple table for the border effect
                quote_table = Table(
                    [[quote_para]],
                    colWidths=[self.content_width - 5],
                )
                quote_table.setStyle(TableStyle([
                    ("BACKGROUND", (0, 0), (-1, -1), COLOR_QUOTE_BG),
                    ("LEFTPADDING", (0, 0), (-1, -1), 12),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                    ("TOPPADDING", (0, 0), (-1, -1), 8),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                    ("LINEBEFORE", (0, 0), (0, -1), 3, COLOR_QUOTE_BORDER),
                ]))
                self.story.append(Spacer(1, 4))
                self.story.append(quote_table)
                self.story.append(Spacer(1, 4))

            elif elem_type == "table":
                headers = elem[1]
                rows = elem[2]

                # Process cell content
                header_cells = [Paragraph(process_inline(h), self.styles["table_header"]) for h in headers]
                data = [header_cells]

                for row in rows:
                    # Pad row if needed
                    while len(row) < len(headers):
                        row.append("")
                    row_cells = [Paragraph(process_inline(c), self.styles["table_cell"]) for c in row[:len(headers)]]
                    data.append(row_cells)

                # Calculate column widths
                num_cols = len(headers)
                col_width = self.content_width / num_cols

                table = Table(data, colWidths=[col_width] * num_cols, repeatRows=1)
                table_style = TableStyle([
                    # Header
                    ("BACKGROUND", (0, 0), (-1, 0), COLOR_TABLE_HEADER),
                    ("TEXTCOLOR", (0, 0), (-1, 0), white),
                    ("FONTNAME", (0, 0), (-1, 0), FONT_BOLD),
                    ("FONTSIZE", (0, 0), (-1, 0), 9.5),
                    ("ALIGN", (0, 0), (-1, 0), "CENTER"),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    # Body
                    ("FONTNAME", (0, 1), (-1, -1), FONT_REGULAR),
                    ("FONTSIZE", (0, 1), (-1, -1), 9.5),
                    ("TEXTCOLOR", (0, 1), (-1, -1), COLOR_TEXT),
                    # Padding
                    ("TOPPADDING", (0, 0), (-1, -1), 6),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                    ("LEFTPADDING", (0, 0), (-1, -1), 8),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                    # Borders
                    ("GRID", (0, 0), (-1, -1), 0.5, COLOR_BORDER),
                    # Alternating rows
                ])

                # Add alternating row colors
                for i in range(1, len(data)):
                    if i % 2 == 0:
                        table_style.add("BACKGROUND", (0, i), (-1, i), COLOR_TABLE_ROW_ALT)

                table.setStyle(table_style)
                self.story.append(Spacer(1, 6))
                self.story.append(table)
                self.story.append(Spacer(1, 6))

            elif elem_type == "image":
                img_url = elem[1]
                # Map gitee webp URL to local PNG file
                img_filename = img_url.split("/")[-1].replace(".webp", ".png")
                local_dir = os.path.dirname(os.path.abspath(__file__))
                img_path = os.path.join(local_dir, "images", img_filename)

                if os.path.exists(img_path):
                    try:
                        from PIL import Image as PILImage
                        pil_img = PILImage.open(img_path)
                        orig_w, orig_h = pil_img.size
                        pil_img.close()

                        # Scale to fit content width (max 160mm)
                        max_width = min(self.content_width, 160 * mm)
                        scale = max_width / orig_w
                        img_w = orig_w * scale
                        img_h = orig_h * scale

                        # If still too tall, cap at 200mm
                        max_height = 200 * mm
                        if img_h > max_height:
                            scale_h = max_height / img_h
                            img_w *= scale_h
                            img_h *= scale_h

                        rl_img = RLImage(img_path, width=img_w, height=img_h)
                        rl_img.hAlign = "CENTER"
                        self.story.append(Spacer(1, 6))
                        self.story.append(rl_img)
                        self.story.append(Spacer(1, 6))
                    except Exception as e:
                        print(f"  WARNING: Failed to embed image {img_filename}: {e}")
                        self.story.append(Spacer(1, 4))
                else:
                    print(f"  WARNING: Image not found: {img_path}")

    def _on_page(self, canv, doc):
        """Draw page background (cover) or header/footer with page numbers."""
        canv.saveState()
        page_num = canv.getPageNumber()

        if page_num == 1:
            # ===== Cover page: dark navy background with geometric decoration =====

            # Full-page dark background
            canv.setFillColor(COLOR_PRIMARY)  # #1a1a2e
            canv.rect(0, 0, self.page_width, self.page_height, fill=1, stroke=0)

            # Large subtle circle (upper-right) — lighter navy
            canv.setFillColor(HexColor("#16213e"))
            canv.circle(self.page_width * 0.82, self.page_height * 0.78, 140, fill=1, stroke=0)

            # Smaller circle (lower-left) — accent blue
            canv.setFillColor(HexColor("#0f3460"))
            canv.circle(self.page_width * 0.12, self.page_height * 0.18, 80, fill=1, stroke=0)

            # Thin accent line — coral red, adds a pop of color
            canv.setStrokeColor(HexColor("#e94560"))
            canv.setLineWidth(2)
            line_y = self.page_height * 0.52
            canv.line(self.page_width * 0.38, line_y, self.page_width * 0.62, line_y)

            # Bottom band — slightly lighter navy
            canv.setFillColor(HexColor("#16213e"))
            canv.rect(0, 0, self.page_width, 35, fill=1, stroke=0)

            # Bottom accent strip — thin coral line on top of band
            canv.setStrokeColor(HexColor("#e94560"))
            canv.setLineWidth(1.5)
            canv.line(0, 35, self.page_width, 35)

            # Small label in bottom band
            canv.setFont(FONT_REGULAR, 8)
            canv.setFillColor(HexColor("#7788aa"))
            label = "WorkBuddy Guide"
            lw = canv.stringWidth(label, FONT_REGULAR, 8)
            canv.drawString((self.page_width - lw) / 2, 14, label)

        elif page_num > 1:
            # ===== Regular pages: header + footer with page numbers =====

            # Header line
            canv.setStrokeColor(COLOR_BORDER)
            canv.setLineWidth(0.5)
            canv.line(self.margin_left, self.page_height - self.margin_top + 10,
                      self.page_width - self.margin_right, self.page_height - self.margin_top + 10)

            # Header text - document title (left)
            canv.setFont(FONT_REGULAR, 8)
            canv.setFillColor(COLOR_VERY_LIGHT)
            canv.drawString(self.margin_left, self.page_height - self.margin_top + 14,
                           self.title[:40] + ("..." if len(self.title) > 40 else ""))

            # Footer line
            canv.setStrokeColor(COLOR_BORDER)
            canv.setLineWidth(0.5)
            canv.line(self.margin_left, self.margin_bottom - 10,
                      self.page_width - self.margin_right, self.margin_bottom - 10)

            # Page number (center)
            canv.setFont(FONT_REGULAR, 9)
            canv.setFillColor(COLOR_LIGHT)
            page_text = f"- {page_num} -"
            text_width = canv.stringWidth(page_text, FONT_REGULAR, 9)
            canv.drawString((self.page_width - text_width) / 2, self.margin_bottom - 22, page_text)

            # Author (right)
            canv.setFont(FONT_REGULAR, 8)
            canv.setFillColor(COLOR_VERY_LIGHT)
            author_text = "kyjl97"
            author_width = canv.stringWidth(author_text, FONT_REGULAR, 8)
            canv.drawString(self.page_width - self.margin_right - author_width,
                           self.margin_bottom - 22, author_text)

        canv.restoreState()


# ============================================================
# Main
# ============================================================

def main():
    input_path = r"D:\project2026\fuwari\src\content\posts\AIHacks\WorkBuddy.md"
    output_path = r"D:\project2026\fuwari\src\content\posts\AIHacks\WorkBuddy.pdf"

    print(f"Reading: {input_path}")
    with open(input_path, "r", encoding="utf-8") as f:
        md_text = f.read()

    # Extract title from frontmatter
    title_match = re.search(r'^title:\s*(.+)$', md_text, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else "WorkBuddy Guide"

    # Extract date
    date_match = re.search(r'^published:\s*(.+)$', md_text, re.MULTILINE)
    date_str = date_match.group(1).strip() if date_match else datetime.now().strftime("%Y-%m-%d")

    print(f"Title: {title}")
    print(f"Date: {date_str}")
    print(f"Output: {output_path}")
    print("\nRegistering fonts...")

    builder = PDFBuilder(output_path, md_text, title, date_str)
    builder.build()

    # Get file size
    size = os.path.getsize(output_path)
    print(f"File size: {size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
