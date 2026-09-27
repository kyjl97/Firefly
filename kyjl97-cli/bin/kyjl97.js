#!/usr/bin/env node

import { spawn } from "node:child_process";
import process from "node:process";

const BASE_URL = "https://kyjl97.github.io/Firefly";
const RSS_URL = `${BASE_URL}/rss.xml`;
const REQUEST_TIMEOUT_MS = 15_000;
const MAX_RESULTS = 500;
const LIST_TOP_ROW = 4;

const ANSI = {
	reset: "\x1b[0m",
	dim: "\x1b[2m",
	bold: "\x1b[1m",
	cyan: "\x1b[36m",
	yellow: "\x1b[33m",
	green: "\x1b[32m",
	red: "\x1b[31m",
	reverse: "\x1b[7m",
	hideCursor: "\x1b[?25l",
	showCursor: "\x1b[?25h",
	clear: "\x1b[2J\x1b[H",
	enableMouse: "\x1b[?1000h\x1b[?1006h",
	disableMouse: "\x1b[?1000l\x1b[?1006l",
};

function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeHtml(value) {
	return value
		.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
		.replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
		.replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
		.replace(/&nbsp;/gi, " ")
		.replace(/&amp;/gi, "&")
		.replace(/&quot;/gi, '"')
		.replace(/&apos;/gi, "'")
		.replace(/&lt;/gi, "<")
		.replace(/&gt;/gi, ">");
}

function htmlToText(value) {
	return decodeHtml(value)
		.replace(/<script\b[\s\S]*?<\/script>/gi, "")
		.replace(/<style\b[\s\S]*?<\/style>/gi, "")
		.replace(/<!--[\s\S]*?-->/g, "")
		.replace(/<img\b[^>]*alt=["']([^"']*)["'][^>]*>/gi, (_, alt) => `\n[图片：${decodeHtml(alt)}]\n`)
		.replace(/<img\b[^>]*>/gi, "\n[图片]\n")
		.replace(/<(?:br|\/p|\/li|\/h[1-6]|\/div|\/section|\/blockquote|\/pre)\b[^>]*>/gi, "\n")
		.replace(/<li\b[^>]*>/gi, "\n- ")
		.replace(/<[^>]+>/g, "")
		.replace(/\r/g, "")
		.split("\n")
		.map((line) => line.replace(/[ \t]+/g, " ").trim())
		.filter(Boolean)
		.join("\n")
		.trim();
}

function getXmlText(block, tagName) {
	const tag = escapeRegExp(tagName);
	const match = block.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
	return match ? decodeHtml(match[1]).trim() : "";
}

function normalizeArticleUrl(value) {
	try {
		const url = new URL(decodeHtml(value), BASE_URL);
		if (!["blog.kyjl97.github.io", "kyjl97.github.io", "kyjl97.github.io"].includes(url.hostname)) return "";
		if (!url.pathname.startsWith("/posts/")) return "";
		url.protocol = "https:";
		url.hostname = "blog.kyjl97.github.io";
		return url.toString();
	} catch {
		return "";
	}
}

function categoryFromUrl(url) {
	try {
		return decodeURIComponent(new URL(url).pathname.split("/").filter(Boolean)[1] ?? "");
	} catch {
		return "";
	}
}

function formatDate(value) {
	const match = value.match(/\b(20\d{2}-\d{2}-\d{2})\b/);
	if (match) return match[1];
	const parsed = new Date(value);
	return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 10);
}

async function loadPosts() {
	const response = await fetch(RSS_URL, {
		headers: {
			Accept: "application/rss+xml, application/xml, text/xml",
			"User-Agent": "kyjl97-cli/0.1.0",
		},
		signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
	});
	if (!response.ok) throw new Error(`博客 RSS 请求失败：HTTP ${response.status}`);

	const xml = await response.text();
	const posts = [];
	for (const match of xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)) {
		const block = match[0];
		const url = normalizeArticleUrl(getXmlText(block, "link"));
		const title = getXmlText(block, "title");
		if (!url || !title) continue;

		const description = htmlToText(getXmlText(block, "description"));
		const content = htmlToText(getXmlText(block, "content:encoded"));
		posts.push({
			title,
			category: categoryFromUrl(url),
			published: formatDate(getXmlText(block, "pubDate")),
			url,
			description,
			content,
		});
	}

	if (!posts.length) throw new Error("没有从博客 RSS 解析到文章。");
	return posts;
}

function searchPosts(posts, query) {
	const terms = query
		.trim()
		.toLocaleLowerCase()
		.split(/\s+/)
		.filter(Boolean);

	if (!terms.length) return posts.slice(0, MAX_RESULTS).map((post) => ({ ...post, excerpt: post.description || post.content }));

	return posts
		.map((post, sourceIndex) => {
			const title = post.title.toLocaleLowerCase();
			const description = post.description.toLocaleLowerCase();
			const content = post.content.toLocaleLowerCase();
			const url = post.url.toLocaleLowerCase();
			const searchable = `${title}\n${description}\n${content}\n${url}`;
			if (!terms.every((term) => searchable.includes(term))) return null;

			let score = 0;
			for (const term of terms) {
				if (title.includes(term)) score += 100;
				if (description.includes(term)) score += 30;
				if (url.includes(term)) score += 20;
				if (content.includes(term)) score += 10;
			}

			return {
				...post,
				excerpt: makeExcerpt(post, terms),
				score,
				sourceIndex,
			};
		})
		.filter(Boolean)
		.sort((a, b) => b.score - a.score || a.sourceIndex - b.sourceIndex)
		.slice(0, MAX_RESULTS);
}

function makeExcerpt(post, terms) {
	const source = post.content || post.description || "暂无摘要";
	const lowerSource = source.toLocaleLowerCase();
	const matchIndex = terms
		.map((term) => lowerSource.indexOf(term))
		.filter((index) => index >= 0)
		.sort((a, b) => a - b)[0];

	if (matchIndex === undefined) return source.slice(0, 220);
	const start = Math.max(0, matchIndex - 80);
	const end = Math.min(source.length, matchIndex + 180);
	return `${start > 0 ? "…" : ""}${source.slice(start, end)}${end < source.length ? "…" : ""}`;
}

function isWideCodePoint(codePoint) {
	return (
		(codePoint >= 0x1100 && codePoint <= 0x115f) ||
		(codePoint >= 0x2e80 && codePoint <= 0xa4cf) ||
		(codePoint >= 0xac00 && codePoint <= 0xd7a3) ||
		(codePoint >= 0xf900 && codePoint <= 0xfaff) ||
		(codePoint >= 0xfe10 && codePoint <= 0xfe6f) ||
		(codePoint >= 0xff01 && codePoint <= 0xff60) ||
		(codePoint >= 0x1f300 && codePoint <= 0x1faff)
	);
}

function displayWidth(value) {
	let width = 0;
	for (const character of value) width += isWideCodePoint(character.codePointAt(0)) ? 2 : 1;
	return width;
}

function clip(value, width) {
	if (width <= 0) return "";
	if (displayWidth(value) <= width) return value;
	let result = "";
	let currentWidth = 0;
	for (const character of value) {
		const characterWidth = isWideCodePoint(character.codePointAt(0)) ? 2 : 1;
		if (currentWidth + characterWidth + 1 > width) break;
		result += character;
		currentWidth += characterWidth;
	}
	return `${result}…`;
}

function padRight(value, width) {
	return `${value}${" ".repeat(Math.max(0, width - displayWidth(value)))}`;
}

function wrapText(value, width, maxLines) {
	const lines = [];
	let line = "";
	for (const character of value.replace(/\r/g, "")) {
		if (character === "\n") {
			if (line) lines.push(line);
			line = "";
			continue;
		}
		const nextWidth = displayWidth(line + character);
		if (line && nextWidth > width) {
			lines.push(line);
			line = character;
		} else {
			line += character;
		}
	}
	if (line) lines.push(line);
	if (lines.length <= maxLines) return lines;
	lines.length = maxLines;
	lines[maxLines - 1] = clip(lines[maxLines - 1], Math.max(1, width - 1)) + "…";
	return lines;
}

function openArticle(url) {
	const parsed = new URL(url);
	if (parsed.protocol !== "https:" || parsed.hostname !== "blog.kyjl97.github.io" || !parsed.pathname.startsWith("/posts/")) {
		throw new Error("出于安全原因，只允许打开 blog.kyjl97.github.io 的文章链接。");
	}

	if (process.platform === "win32") {
		const child = spawn("rundll32.exe", ["url.dll,FileProtocolHandler", parsed.toString()], {
			detached: true,
			stdio: "ignore",
		});
		child.unref();
		return;
	}
	const command = process.platform === "darwin" ? "open" : "xdg-open";
	const child = spawn(command, [parsed.toString()], { detached: true, stdio: "ignore" });
	child.unref();
}

function help() {
	console.log(`用法：\n  kyjl97              进入交互式博客搜索\n  kyjl97 --help       查看帮助\n  kyjl97 --version    查看版本\n\n交互操作：\n  输入关键词       搜索标题、摘要和正文\n  ↑ / ↓             选择文章\n  Enter             在浏览器打开当前文章\n  鼠标单击         选择文章；再次单击当前文章可打开\n  Esc               退出`);
}

function previewLines(post, width, height) {
	const title = wrapText(post.title, width, 2);
	const meta = wrapText(`${post.category || "博客"} · ${post.published || "日期未知"}`, width, 1);
	const url = wrapText(post.url, width, 2);
	const excerpt = wrapText(post.excerpt || post.description || "暂无摘要", width, Math.max(1, height - title.length - meta.length - url.length - 5));
	return [...title, "", ...meta, "", ...url, "", ...excerpt];
}

function createInterface(posts, initialQuery = "") {
	let query = initialQuery;
	let results = searchPosts(posts, query);
	let selected = 0;
	let scrollOffset = 0;
	let active = true;
	let terminalActive = false;
	let inputBuffer = "";
	let escapeTimer;
	let lastMouseClick = { index: -1, time: 0 };

	function updateResults(resetSelection = true) {
		results = searchPosts(posts, query);
		if (resetSelection) selected = 0;
		scrollOffset = 0;
	}

	function exit(message = "") {
		if (!active) return;
		active = false;
		if (escapeTimer) clearTimeout(escapeTimer);
		if (terminalActive) {
			process.stdin.off("data", onData);
			process.stdin.setRawMode(false);
			process.stdin.pause();
			process.stdout.write(`${ANSI.disableMouse}${ANSI.showCursor}\n`);
		}
		if (message) console.log(message);
	}

	function openSelected() {
		const post = results[selected];
		if (!post) return;
		try {
			openArticle(post.url);
			exit(`${ANSI.green}已打开：${post.title}${ANSI.reset}\n${post.url}`);
		} catch (error) {
			exit(`${ANSI.red}${error instanceof Error ? error.message : String(error)}${ANSI.reset}`);
		}
	}

	function ensureSelectionVisible(listHeight) {
		if (selected < scrollOffset) scrollOffset = selected;
		if (selected >= scrollOffset + listHeight) scrollOffset = selected - listHeight + 1;
	}

	function render() {
		if (!active) return;
		const columns = Math.max(70, process.stdout.columns || 100);
		const rows = Math.max(16, process.stdout.rows || 24);
		const leftWidth = Math.max(30, Math.floor(columns * 0.44));
		const rightWidth = Math.max(30, columns - leftWidth - 3);
		const listHeight = Math.max(3, rows - 4);
		ensureSelectionVisible(listHeight);

		const selectedPost = results[selected];
		const start = scrollOffset;
		const visibleResults = results.slice(start, start + listHeight);
		const rightLines = selectedPost ? previewLines(selectedPost, rightWidth, listHeight) : [];
		const lines = [
			`${ANSI.bold}${ANSI.cyan}KYJL97 BLOG SEARCH${ANSI.reset}  ${ANSI.dim}得救之道博客 · blog.kyjl97.github.io${ANSI.reset}`,
			`${ANSI.yellow}›${ANSI.reset} ${clip(query, columns - 4)}${ANSI.cyan}▌${ANSI.reset}`,
			`${ANSI.dim}${"─".repeat(Math.max(1, columns))}${ANSI.reset}`,
		];

		for (let index = 0; index < listHeight; index += 1) {
			const post = visibleResults[index];
			const absoluteIndex = start + index;
			let left = "";
			if (post) {
				const marker = absoluteIndex === selected ? "› " : "  ";
				left = `${marker}${clip(post.title, leftWidth - 4)}`;
				if (absoluteIndex === selected) left = `${ANSI.reverse}${padRight(left, leftWidth)}${ANSI.reset}`;
				else left = padRight(left, leftWidth);
			} else if (index === 0 && !results.length) {
				left = padRight(`${ANSI.dim}没有找到匹配文章${ANSI.reset}`, leftWidth);
			} else {
				left = " ".repeat(leftWidth);
			}
			const right = rightLines[index] ? clip(rightLines[index], rightWidth) : "";
			lines.push(`${left}${ANSI.dim} │ ${ANSI.reset}${padRight(right, rightWidth)}`);
		}

		process.stdout.write(`${ANSI.clear}${lines.join("\n")}`);
	}

	function moveSelection(delta) {
		if (!results.length) return;
		selected = Math.max(0, Math.min(results.length - 1, selected + delta));
		render();
	}

	function handleMouse(button, x, y, eventType) {
		if (eventType !== "M" || x > Math.floor((process.stdout.columns || 100) * 0.44) || y < LIST_TOP_ROW) return;
		const listHeight = Math.max(3, (process.stdout.rows || 24) - 7);
		const index = scrollOffset + y - LIST_TOP_ROW;
		if (y >= LIST_TOP_ROW + listHeight || index >= results.length) return;
		if (button !== 0) return;
		const now = Date.now();
		if (lastMouseClick.index === index && now - lastMouseClick.time < 350) {
			selected = index;
			openSelected();
			return;
		}
		lastMouseClick = { index, time: now };
		selected = index;
		render();
	}

	function handleSequence(sequence) {
		if (sequence === "\x1b[A" || sequence === "\x1bOA") return moveSelection(-1);
		if (sequence === "\x1b[B" || sequence === "\x1bOB") return moveSelection(1);
		if (sequence === "\x1b[5~") return moveSelection(-5);
		if (sequence === "\x1b[6~") return moveSelection(5);
		if (sequence === "\x1b[H" || sequence === "\x1b[1~") return moveSelection(-selected);
		if (sequence === "\x1b[F" || sequence === "\x1b[4~") return moveSelection(results.length - 1 - selected);
	}

	function handleCharacter(character) {
		if (character === "\u0003") return exit("已退出");
		if (character === "\u001b") return exit("已退出");
		if (character === "\r" || character === "\n") return openSelected();
		if (character === "\u007f" || character === "\b") {
			if (query) {
				query = Array.from(query).slice(0, -1).join("");
				updateResults();
				render();
			}
			return;
		}
		if (character >= " " && character !== "\u007f") {
			query += character;
			updateResults();
			render();
		}
	}

	function parseInput() {
		while (inputBuffer) {
			if (inputBuffer.startsWith("\x1b[<")) {
				const mouseMatch = inputBuffer.match(/^\x1b\[<(\d+);(\d+);(\d+)([mM])/);
				if (!mouseMatch) return;
				inputBuffer = inputBuffer.slice(mouseMatch[0].length);
				handleMouse(Number(mouseMatch[1]), Number(mouseMatch[2]), Number(mouseMatch[3]), mouseMatch[4]);
				continue;
			}
			if (inputBuffer.startsWith("\x1b[")) {
				const sequenceMatch = inputBuffer.match(/^\x1b\[[0-9;?]*[A-Za-z~]/);
				if (!sequenceMatch) return;
				inputBuffer = inputBuffer.slice(sequenceMatch[0].length);
				handleSequence(sequenceMatch[0]);
				continue;
			}
			if (inputBuffer.startsWith("\x1b")) {
				if (inputBuffer.length === 1) {
					inputBuffer = "";
					if (escapeTimer) clearTimeout(escapeTimer);
					escapeTimer = setTimeout(() => exit("已退出"), 40);
					return;
				}
				inputBuffer = inputBuffer.slice(1);
				handleCharacter("\x1b");
				continue;
			}
			const character = Array.from(inputBuffer)[0];
			inputBuffer = inputBuffer.slice(character.length);
			handleCharacter(character);
		}
	}

	function onData(chunk) {
		if (escapeTimer) {
			clearTimeout(escapeTimer);
			escapeTimer = undefined;
		}
		inputBuffer += chunk;
		parseInput();
	}

	terminalActive = true;
	process.stdin.setEncoding("utf8");
	process.stdin.setRawMode(true);
	process.stdin.resume();
	process.stdin.on("data", onData);
	process.stdout.write(`${ANSI.hideCursor}${ANSI.enableMouse}`);
	render();
}

async function main() {
	const args = process.argv.slice(2);
	if (args.includes("--help") || args.includes("-h")) return help();
	if (args.includes("--version") || args.includes("-v")) return console.log("0.1.0");
	if (!process.stdin.isTTY || !process.stdout.isTTY) {
		console.error("kyjl97 需要在交互式终端中运行。请直接打开终端后输入 kyjl97。");
		process.exitCode = 1;
		return;
	}

	process.stdout.write("正在获取博客文章索引…\n");
	try {
		const posts = await loadPosts();
		createInterface(posts, args.join(" "));
	} catch (error) {
		console.error(`${ANSI.red}${error instanceof Error ? error.message : String(error)}${ANSI.reset}`);
		process.exitCode = 1;
	}
}

main();
