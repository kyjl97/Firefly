import { ArgumentError, CommandExecutionError, EmptyResultError } from "@jackwener/opencli/errors";
import { cli, Strategy } from "@jackwener/opencli/registry";

const BASE_URL = "https://kyjl97.github.io/Firefly";
const ARCHIVE_URL = `${BASE_URL}/archive/`;
const REQUEST_TIMEOUT_MS = 15_000;
const MAX_LIMIT = 50;

function decodeHtml(value) {
	return value
		.replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
		.replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
		.replace(/&nbsp;/gi, " ")
		.replace(/&amp;/gi, "&")
		.replace(/&quot;/gi, '"')
		.replace(/&apos;/gi, "'")
		.replace(/&lt;/gi, "<")
		.replace(/&gt;/gi, ">");
}

function stripTags(value) {
	return decodeHtml(value.replace(/<[^>]+>/g, " "));
}

function normalizeText(value) {
	return stripTags(value).replace(/\s+/g, " ").trim();
}

function getAttribute(tag, name) {
	const match = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i"));
	return match ? decodeHtml(match[1]) : "";
}

function requireLimit(value, defaultValue) {
	const parsed = Number(value ?? defaultValue);
	if (!Number.isInteger(parsed) || parsed < 1 || parsed > MAX_LIMIT) {
		throw new ArgumentError(`kyjl97 limit 必须是 1-${MAX_LIMIT} 之间的整数`);
	}
	return parsed;
}

async function fetchHtml(url, label) {
	try {
		const response = await fetch(url, {
			headers: {
				Accept: "text/html",
				"User-Agent": "opencli-plugin-kyjl97-blog/0.1.0",
			},
			signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
		});
		if (!response.ok) {
			throw new CommandExecutionError(`${label} 请求失败：HTTP ${response.status}`);
		}
		return await response.text();
	} catch (error) {
		if (error instanceof CommandExecutionError) throw error;
		const message = error instanceof Error ? error.message : String(error);
		throw new CommandExecutionError(`${label} 请求失败：${message}`, "请检查 blog.kyjl97.github.io 是否可以访问。");
	}
}

function extractYear(htmlBeforeLink) {
	const years = [...htmlBeforeLink.matchAll(/>\s*(20\d{2})\s*<\/div>/g)].map((match) => match[1]);
	return years.at(-1) ?? "";
}

function parseArchive(html) {
	const articles = [];
	const seen = new Set();
	const linkPattern = /<a\b[^>]*href\s*=\s*["'](\/posts\/[^"']+)["'][^>]*>[\s\S]*?<\/a>/gi;

	let match;
	while ((match = linkPattern.exec(html))) {
		const anchor = match[0];
		const path = match[1].endsWith("/") ? match[1] : `${match[1]}/`;
		const url = new URL(path, BASE_URL).toString();
		if (seen.has(url)) continue;

		const title = getAttribute(anchor, "aria-label") || normalizeText(anchor);
		if (!title) continue;

		const anchorText = normalizeText(anchor);
		const dateMatch = anchorText.match(/\b(20\d{2}-\d{2}-\d{2}|\d{2}-\d{2})\b/);
		const shortDate = dateMatch?.[1] ?? "";
		const year = extractYear(html.slice(0, match.index));
		const published = shortDate.length === 5 && year ? `${year}-${shortDate}` : shortDate;
		const segments = path.split("/").filter(Boolean);
		const category = decodeURIComponent(segments[1] ?? "");
		const slug = segments.slice(1).map((segment) => decodeURIComponent(segment)).join("/");

		seen.add(url);
		articles.push({ title, published, category, path, slug, url });
	}

	return articles;
}

async function loadArchive() {
	const articles = parseArchive(await fetchHtml(ARCHIVE_URL, "博客归档")).filter((article) => article.title);
	if (!articles.length) {
		throw new EmptyResultError("kyjl97 archive", "没有从博客归档页解析到文章。");
	}
	return articles;
}

function findMetaContent(html, key) {
	const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
	for (const tag of tags) {
		const name = getAttribute(tag, "property") || getAttribute(tag, "name");
		if (name.toLowerCase() === key.toLowerCase()) return getAttribute(tag, "content");
	}
	return "";
}

function parseJsonLd(html) {
	const block = html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i)?.[1];
	if (!block) return {};
	try {
		const parsed = JSON.parse(block);
		return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
	} catch {
		return {};
	}
}

function extractArticleContent(html) {
	const contentStart = html.match(/<div\b[^>]*class=["'][^"']*\bmarkdown-content\b[^"']*["'][^>]*>/i);
	if (!contentStart || contentStart.index === undefined) return "";

	const bodyStart = contentStart.index + contentStart[0].length;
	const endMarkers = [
		"<!-- 文章底部标签 -->",
		"<!-- 文章反馈与编辑区域 -->",
		'<div id="giscus-container"',
	];
	const ends = endMarkers.map((marker) => html.indexOf(marker, bodyStart)).filter((index) => index >= 0);
	const body = html.slice(bodyStart, ends.length ? Math.min(...ends) : html.length);

	return decodeHtml(
		body
			.replace(/<script\b[\s\S]*?<\/script>/gi, "")
			.replace(/<style\b[\s\S]*?<\/style>/gi, "")
			.replace(/<!--([\s\S]*?)-->/g, "")
			.replace(/<a\b[^>]*class=["'][^"']*\banchor\b[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, "")
			.replace(/<img\b[^>]*alt=["']([^"']*)["'][^>]*>/gi, (_, alt) => `\n[图片：${decodeHtml(alt)}]\n`)
			.replace(/<img\b[^>]*>/gi, "\n[图片]\n")
			.replace(/<div\b[^>]*class=["'][^"']*ec-line[^"']*["'][^>]*>/gi, "\n")
			.replace(/<li\b[^>]*>/gi, "\n- ")
			.replace(/<h([1-6])\b[^>]*>/gi, (_, level) => `\n${"#".repeat(Number(level))} `)
			.replace(/<(?:br|\/p|\/li|\/h[1-6]|\/section|\/blockquote|\/pre|\/tr)\b[^>]*>/gi, "\n")
			.replace(/<[^>]+>/g, "")
			.replace(/\r/g, "")
			.split("\n")
			.map((line) => line.replace(/[ \t]+/g, " ").trim())
			.filter(Boolean)
			.join("\n"),
	).trim();
}

function resolveArticleUrl(value, articles) {
	const input = String(value ?? "").trim();
	if (!input) throw new ArgumentError("请提供文章标题、slug、/posts/ 路径或完整 URL");

	if (/^https?:\/\//i.test(input)) {
		const url = new URL(input);
		if (!["blog.kyjl97.github.io", "kyjl97.github.io", "kyjl97.github.io"].includes(url.hostname) || !url.pathname.startsWith("/posts/")) {
			throw new ArgumentError("article 只允许读取 blog.kyjl97.github.io 的 /posts/ 文章地址");
		}
		return url.toString();
	}

	if (input.startsWith("/")) {
		if (!input.startsWith("/posts/")) throw new ArgumentError("文章路径必须以 /posts/ 开头");
		return new URL(input.endsWith("/") ? input : `${input}/`, BASE_URL).toString();
	}

	const needle = input.toLocaleLowerCase();
	const matches = articles.filter((article) => {
		const lastSlug = article.slug.split("/").at(-1)?.toLocaleLowerCase() ?? "";
		return article.title.toLocaleLowerCase() === needle || article.slug.toLocaleLowerCase() === needle || lastSlug === needle;
	});
	if (matches.length === 1) return matches[0].url;
	if (matches.length > 1) throw new ArgumentError(`匹配到 ${matches.length} 篇文章，请使用分类/slug 或完整 URL`);
	throw new ArgumentError(`找不到文章：${input}。可先运行 opencli kyjl97 search <关键词>`);
}

cli({
	site: "kyjl97",
	name: "latest",
	access: "read",
	description: "列出得救之道博客最新文章",
	domain: "blog.kyjl97.github.io",
	strategy: Strategy.PUBLIC,
	browser: false,
	args: [{ name: "limit", type: "int", default: 10, help: "返回数量（1-50）" }],
	columns: ["rank", "title", "published", "category", "url"],
	func: async (args) => {
		const limit = requireLimit(args.limit, 10);
		return (await loadArchive()).slice(0, limit).map((article, index) => ({
			rank: index + 1,
			title: article.title,
			published: article.published,
			category: article.category,
			url: article.url,
		}));
	},
});

cli({
	site: "kyjl97",
	name: "search",
	access: "read",
	description: "按标题、分类或 slug 搜索得救之道博客文章",
	domain: "blog.kyjl97.github.io",
	strategy: Strategy.PUBLIC,
	browser: false,
	args: [
		{ name: "keyword", positional: true, required: true, help: "搜索关键词" },
		{ name: "limit", type: "int", default: 20, help: "返回数量（1-50）" },
	],
	columns: ["rank", "title", "published", "category", "url"],
	func: async (args) => {
		const keyword = String(args.keyword ?? "").trim();
		if (!keyword) throw new ArgumentError("请提供搜索关键词");
		const limit = requireLimit(args.limit, 20);
		const needle = keyword.toLocaleLowerCase();
		const matches = (await loadArchive()).filter((article) =>
			`${article.title} ${article.category} ${article.slug}`.toLocaleLowerCase().includes(needle),
		);
		if (!matches.length) throw new EmptyResultError("kyjl97 search", `没有找到包含“${keyword}”的文章。`);
		return matches.slice(0, limit).map((article, index) => ({
			rank: index + 1,
			title: article.title,
			published: article.published,
			category: article.category,
			url: article.url,
		}));
	},
});

cli({
	site: "kyjl97",
	name: "article",
	access: "read",
	description: "读取得救之道博客单篇文章正文",
	domain: "blog.kyjl97.github.io",
	strategy: Strategy.PUBLIC,
	browser: false,
	defaultFormat: "md",
	args: [{ name: "slug", positional: true, required: true, help: "文章标题、slug、/posts/ 路径或完整 URL" }],
	columns: ["title", "published", "category", "url", "description", "content"],
	func: async (args) => {
		const articles = await loadArchive();
		const url = resolveArticleUrl(args.slug, articles);
		const html = await fetchHtml(url, "文章页面");
		const jsonLd = parseJsonLd(html);
		const visibleTitle = html.match(/data-pagefind-meta=["']title["'][^>]*>([\s\S]*?)<\/div>/i)?.[1];
		const title = normalizeText(visibleTitle ?? "") || String(jsonLd.headline ?? "") || findMetaContent(html, "og:title").replace(/\s+-\s+得救之道博客$/, "");
		const published = String(jsonLd.datePublished ?? html.match(/<span[^>]*>\s*(20\d{2}-\d{2}-\d{2})\s*<\/span>/i)?.[1] ?? "");
		const category = decodeURIComponent(html.match(/href=["']\/categories\/([^"']+)["']/i)?.[1] ?? "").replace(/\/$/, "");
		const content = extractArticleContent(html);
		const description = (content.split("\n")[0] || String(jsonLd.description ?? findMetaContent(html, "description") ?? "")).trim();
		if (!title || !content) throw new EmptyResultError("kyjl97 article", "文章页面没有解析到正文内容。");
		return [{ title, published, category, url, description, content }];
	},
});
