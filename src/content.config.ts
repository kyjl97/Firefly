import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// 空集合：阻止 Astro 自动为这些目录创建带默认 loader 的 collection
const emptyGlob = (dir: string) =>
	defineCollection({
		loader: glob({ pattern: "__never_match__/**/*", base: `./src/content/${dir}` }),
	});

const postsCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default("").nullable(),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().default("未分类"),
		lang: z.string().optional().default(""),
		pinned: z.boolean().optional().default(false),

		/* For internal use */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});

const wikiCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/wiki" }),
	schema: z.object({
		title: z.string().optional().default(""),
		description: z.string().optional().default(""),
	}),
});

export const collections = {
	posts: postsCollection,
	wiki: wikiCollection,
	// 阻止自动创建 collection 的空定义
	Zen: emptyGlob("Zen"),
	"01-输入": emptyGlob("01-输入"),
	Xenia: emptyGlob("Xenia"),
	Yoke: emptyGlob("Yoke"),
	Memoria: emptyGlob("Memoria"),
};
