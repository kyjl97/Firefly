import fs from "node:fs";
import path from "node:path";
import markdownIt from "markdown-it";

export interface WikiNode {
	name: string;
	slug: string;
	title: string;
	type: "file" | "directory";
	children?: WikiNode[];
	content?: string;
}

const WIKI_DIR = path.join(process.cwd(), "src/content/wiki");
const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

/**
 * 从 markdown 文件提取标题（第一个 # 标题或文件名）
 */
function extractTitle(content: string, filename: string): string {
	const match = content.match(/^#\s+(.+)$/m);
	if (match) {
		return match[1].trim();
	}
	// 使用文件名作为标题
	return filename
		.replace(/\.md$/, "")
		.replace(/-/g, " ")
		.replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * 递归读取 wiki 目录构建树形结构
 */
function readWikiDir(dir: string, basePath = ""): WikiNode[] {
	const nodes: WikiNode[] = [];
	const entries = fs.readdirSync(dir, { withFileTypes: true });

	// 先收集目录，再收集文件，保证顺序
	const dirs = entries.filter((e) => e.isDirectory());
	const files = entries.filter(
		(e) => e.isFile() && e.name.endsWith(".md") && !e.name.startsWith("."),
	);

	// 处理目录
	for (const dirEntry of dirs) {
		const dirPath = path.join(dir, dirEntry.name);
		const slug = basePath ? `${basePath}/${dirEntry.name}` : dirEntry.name;
		const children = readWikiDir(dirPath, slug);

		if (children.length > 0) {
			nodes.push({
				name: dirEntry.name,
				slug,
				title: dirEntry.name
					.replace(/-/g, " ")
					.replace(/\b\w/g, (c) => c.toUpperCase()),
				type: "directory",
				children,
			});
		}
	}

	// 处理文件
	for (const file of files) {
		const filePath = path.join(dir, file.name);
		const content = fs.readFileSync(filePath, "utf-8");
		const slug = basePath
			? `${basePath}/${file.name.replace(/\.md$/, "")}`
			: file.name.replace(/\.md$/, "");

		nodes.push({
			name: file.name,
			slug,
			title: file.name.replace(/\.md$/, ""),
			type: "file",
			content,
		});
	}

	return nodes;
}

/**
 * 获取 wiki 树形结构
 */
export function getWikiTree(): WikiNode[] {
	if (!fs.existsSync(WIKI_DIR)) {
		return [];
	}
	return readWikiDir(WIKI_DIR);
}

/**
 * 根据 slug 获取 wiki 内容
 */
export function getWikiBySlug(slug: string): WikiNode | null {
	const slugParts = slug.split("/");
	let currentDir = WIKI_DIR;

	// 构建文件路径
	for (let i = 0; i < slugParts.length - 1; i++) {
		currentDir = path.join(currentDir, slugParts[i]);
	}

	const fileName = `${slugParts[slugParts.length - 1]}.md`;
	const filePath = path.join(currentDir, fileName);

	if (!fs.existsSync(filePath)) {
		return null;
	}

	const content = fs.readFileSync(filePath, "utf-8");
	return {
		name: fileName,
		slug,
		title: extractTitle(content, fileName),
		type: "file",
		content,
	};
}

/**
 * 从 markdown 内容提取大纲（h2, h3 标题）
 */
export function extractHeadings(
	content: string,
): { depth: number; slug: string; text: string }[] {
	const headings: { depth: number; slug: string; text: string }[] = [];
	const regex = /^(#{2,3})\s+(.+)$/gm;
	let match: RegExpExecArray | null;

	while ((match = regex.exec(content)) !== null) {
		const depth = match[1].length;
		const text = match[2].trim();
		const slug = text
			.toLowerCase()
			.replace(/[^\w\u4e00-\u9fa5]+/g, "-")
			.replace(/^-|-$/g, "");
		headings.push({ depth, slug, text });
	}

	return headings;
}

let cachedBlogSlugByPath: Map<string, string> | null = null;

function normalizePostSlugPart(value: string): string {
	return value
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w一-龥-]/g, "")
		.replace(/-+/g, "-")
		.replace(/^-/, "");
}

function normalizePostPath(value: string): string {
	return decodeURI(value)
		.replace(/\\/g, "/")
		.replace(/^\/+/, "")
		.replace(/\.md$/, "");
}

function getBlogSlugByPath(): Map<string, string> {
	if (cachedBlogSlugByPath) {
		return cachedBlogSlugByPath;
	}

	const slugs = new Map<string, string>();

	if (!fs.existsSync(POSTS_DIR)) {
		cachedBlogSlugByPath = slugs;
		return slugs;
	}

	function scanDir(dir: string) {
		const entries = fs.readdirSync(dir, { withFileTypes: true });

		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);

			if (entry.isDirectory()) {
				scanDir(fullPath);
			} else if (entry.isFile() && entry.name.endsWith(".md")) {
				const relativePath = path.relative(POSTS_DIR, fullPath).replace(/\\/g, "/");
				const normalizedPath = normalizePostPath(relativePath);
				const slug = normalizedPath.split("/").map(normalizePostSlugPart).join("/");
				slugs.set(normalizedPath, slug);
				slugs.set(slug, slug);
			}
		}
	}

	scanDir(POSTS_DIR);
	cachedBlogSlugByPath = slugs;
	return slugs;
}

function convertPostPathToBlogSlug(relativePath: string): string | null {
	const normalizedPath = normalizePostPath(relativePath);
	const blogSlugByPath = getBlogSlugByPath();
	return blogSlugByPath.get(normalizedPath) ?? blogSlugByPath.get(normalizedPath.split("/").map(normalizePostSlugPart).join("/")) ?? null;
}

function convertWikiFileNameToBlogSlug(fileName: string): string | null {
	const nameWithoutExt = fileName.replace(/\.md$/, "");

	for (const [postPath, slug] of getBlogSlugByPath()) {
		if (postPath.endsWith(`/${nameWithoutExt}`) || slug.endsWith(`/${normalizePostSlugPart(nameWithoutExt)}`)) {
			return slug;
		}
	}

	return null;
}

function preprocessPostLinks(content: string): string {
	return content.replace(
		/\]\(((?:\.\.\/)+content\/posts\/[^)]+?\.md)\)/g,
		(match, href: string) => {
			const postsMatch = href.match(/(?:\.\.\/)+content\/posts\/(.+)$/);
			const slug = postsMatch ? convertPostPathToBlogSlug(postsMatch[1]) : null;
			return slug ? `](/posts/${slug}/)` : match;
		},
	);
}

/**
 * 预处理 wiki 内容 - 将表格中的 .md 文件名转换为链接
 */
function preprocessWikiContent(content: string): string {
	// 按行处理内容
	const lines = content.split("\n");
	const result: string[] = [];

	for (const line of lines) {
		// 检查是否是表格行（包含 | 符号）
		if (line.includes("|")) {
			// 分割表格单元格
			const cells = line.split("|").map(cell => cell.trim());

			// 处理每个单元格
			const processedCells = cells.map(cell => {
				// 检查单元格是否包含 .md 文件名
				// 匹配以 .md 结尾的单词（前面是字母、数字或中文，后面是标点或空白）
				const mdFileMatch = cell.match(/([\w\u4e00-\u9fa5-]+\.md)(?=[,，、。\s]|$)/);

				if (mdFileMatch) {
					const fileName = mdFileMatch[1];
					const slug = convertWikiFileNameToBlogSlug(fileName);

					if (slug) {
						// 将文件名转换为 Markdown 链接（使用绝对路径）
						return cell.replace(fileName, `[${fileName}](/posts/${slug}/)`);
					}
				}

				return cell;
			});

			// 重新组合表格行
			result.push(processedCells.join(" | "));
		} else {
			// 非表格行，保持原样
			result.push(line);
		}
	}

	return result.join("\n");
}

/**
 * 创建 markdown-it 实例并配置链接转换
 */
export function createMarkdownParser(): markdownIt {
	const md = markdownIt({ html: true, linkify: true, typographer: true });

	// 给标题添加 id 属性，以便 TOC 锚点链接能正常工作
	md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
		const token = tokens[idx];
		// 获取下一个 token（inline token）中的文本内容
		const nextToken = tokens[idx + 1];
		if (nextToken && nextToken.type === 'inline') {
			const text = nextToken.content;
			const slug = text
				.toLowerCase()
				.replace(/[^\w一-龥]+/g, "-")
				.replace(/^-|-$/g, "");
			token.attrSet('id', slug);
		}
		return self.renderToken(tokens, idx, options);
	};

	// 重写链接渲染规则
	const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
		return self.renderToken(tokens, idx, options);
	};

	md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
		const token = tokens[idx];
		const hrefIndex = token.attrIndex("href");

		if (hrefIndex >= 0) {
			const href = token.attrs[hrefIndex][1];

			// 转换 wiki 内部的相对链接到博客文章
			// 匹配任意深度的 content/posts/ 路径（如 ../../content/posts/ 或 ../../../content/posts/）
			const postsMatch = href && href.match(/(?:\.\.\/)+content\/posts\/(.+)$/);
			if (postsMatch) {
				const slug = convertPostPathToBlogSlug(postsMatch[1]);
				if (slug) {
					token.attrs[hrefIndex][1] = `/posts/${slug}/`;
				}
			}
			// 处理 wiki 目录内的 .md 链接
			else if (href && href.endsWith(".md") && !href.startsWith("http")) {
				// 移除 .md 后缀
				let cleanHref = href.replace(/\.md$/, "");
				// 处理重复的 .md 后缀（如 purpose.md.md）
				if (cleanHref.endsWith(".md")) {
					cleanHref = cleanHref.replace(/\.md$/, "");
				}
				// 如果是以 ./ 开头的相对链接，移除 ./
				if (href.startsWith("./")) {
					cleanHref = cleanHref.replace(/^\.\//, "");
				}
				// 转换为 wiki URL: /wiki/slug/
				token.attrs[hrefIndex][1] = `/wiki/${cleanHref}/`;
			}
			// 处理指向 wiki 的相对链接（不以 / 开头，不以 http 开头，不以 .md 结尾）
			else if (href && !href.startsWith("http") && !href.startsWith("/") && !href.startsWith("#") && !href.endsWith(".md")) {
				// 可能是 wiki 内部的无扩展名链接
				// 保持原样，让浏览器处理
			}
		}

		return defaultRender(tokens, idx, options, env, self);
	};

	return md;
}

/**
 * 渲染 wiki 内容（移除开头的一级标题，避免与页面标题重复）
 */
export function renderWikiContent(content: string): string {
	// 移除开头的一级标题
	const contentWithoutFirstH1 = content.replace(/^#\s+.+$/m, "").trim();
	// 预处理内容
	const preprocessedContent = preprocessWikiContent(preprocessPostLinks(contentWithoutFirstH1));
	// 创建解析器
	const md = createMarkdownParser();
	// 渲染
	return md.render(preprocessedContent);
}
