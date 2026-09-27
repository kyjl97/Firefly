import type {
	ExpressiveCodeConfig,
	GitHubEditConfig,
	ImageFallbackConfig,
	LicenseConfig,
	NavBarConfig,
	NoticeConfig,
	ProfileConfig,
	SiteConfig,
	UmamiConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const noticeConfig: NoticeConfig = {
	enable: false,
	level: "happy",
	content: "元宝发红包了！看置顶文章？",
};

export const siteConfig: SiteConfig = {
	title: "得救之道",
	subtitle: "内容记录、AI 探索与知识管理",
	description:
		"kyjl97 的个人博客，持续记录学习、工具与成长，探索 AI 工具、自动化、知识管理与写作工作流。",

	keywords: ["得救之道", "kyjl97", "AI 工具", "知识管理", "个人博客"],
	lang: "zh_CN", // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th'
	themeColor: {
		hue: 250, // 纯蓝色系 - 天蓝色调
		fixed: true, // Hide the theme color picker for visitors
		forceDarkMode: false, // Force dark mode and hide theme switcher
	},
	banner: {
		enable: false,
		src: "/xinghui.avif", // Relative to the /src directory. Relative to the /public directory if it starts with '/'

		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: true, // Display the credit text of the banner image
			text: "Pixiv @chokei", // Credit text to be displayed

			url: "https://www.pixiv.net/artworks/122782209", // (Optional) URL link to the original artwork or artist's page
		},
	},
	background: {
		enable: false, // 没有背景图片，禁用 bg-box 覆盖层
		src: "",
		position: "center",
		size: "cover",
		repeat: "no-repeat",
		attachment: "fixed",
		opacity: 1,
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		{
			src: "/brand-logo.png",
			sizes: "32x32",
		},
	],
	officialSites: [
		{ url: "https://kyjl97.github.io", alias: "项目主页" },
		{ url: "https://jieliu.me", alias: "个人主页" },
		{ url: "https://github.com/kyjl97", alias: "GitHub" },
	],
	server: [
		{ url: "https://umami.acofork.com", text: "Umami" },
		{ url: "https://pic1.acofork.com", text: "RandomPic" },
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "Gallery",
			url: "/gallery/",
			external: false,
		},
		{
			name: "Notes",
			url: "/notes/",
			external: false,
		},
		{
			name: "Wiki",
			url: "/wiki/",
			external: false,
		},
		{
			name: "项目主页",
			url: "https://kyjl97.github.io/",
			external: true,
		},
		{
			name: "作品",
			url: "https://kyjl97.github.io/#projects",
			external: true,
		},
		{
			name: "导航",
			url: "https://kyjl97.github.io/nav/",
			external: true,
		},
		{
			name: "关于",
			url: "https://jieliu.me/",
			external: true,
		},
		{
			name: "GitHub",
			url: "https://github.com/kyjl97",
			external: true,
		},
		{
			name: "RSS",
			url: "https://kyjl97.github.io/Firefly/rss.xml",
			external: true,
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "/brand-logo.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "kyjl97",
	bio: "微信公众号「得救之道」创作者<br>内容记录 · AI 工具 · 知识管理",
	links: [
		{
			name: "GitHub",
			icon: "github", // Local icon
			url: "https://github.com/kyjl97",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: false,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const imageFallbackConfig: ImageFallbackConfig = {
	enable: false,
	originalDomain: "https://eopfapi.acofork.com/pic?img=ua",
	fallbackDomain: "https://eopfapi.acofork.com/pic?img=ua",
};

export const umamiConfig: UmamiConfig = {
	enable: true,
	baseUrl: "https://umami.acofork.com",
	shareId: "CdkXbGgZr6ECKOyK",
	timezone: "Asia/Shanghai",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark",
};

export const gitHubEditConfig: GitHubEditConfig = {
	enable: true,
	baseUrl: "https://github.com/kyjl97/Firefly/blob/main/src/content/posts",
};

// todoConfig removed from here
