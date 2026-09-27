# Wiki Schema

## 页面类型

| 类型 | 目录 | 说明 | 命名规则 |
| --- | --- | --- | --- |
| Entity | `entities/` | 核心实体（博客系统、AI 工具链、Obsidian 工作流） | kebab-case |
| Concept | `concepts/` | 抽象概念（部署模式、MCP 生态、Dataview 模板） | kebab-case |
| Source | `sources/` | posts/ 分类摘要（AIHacks、Software、Technical、Workflow） | kebab-case |
| Synthesis | `synthesis/` | 跨模块分析（依赖关系、内容矩阵） | kebab-case |

## 链接格式

- Wiki 内部链接：`[页面名](relative/path.md)`
- 博客文章链接：`[文章名](../../content/posts/Category/article.md)`
- 绝对站内链接：仅在确认 slug 后使用 `/posts/category/article/`
- 图片链接：使用图床 URL 或明确可访问的相对路径

## Frontmatter 规范

博客文章使用 YAML frontmatter：

```yaml
title: 文章标题
published: YYYY-MM-DD
tags: [标签1, 标签2]
category: 分类名
draft: false
pinned: false
image: 封面图 URL
```

## 当前 posts 分类

- AIHacks: 60 篇
- Software: 25 篇
- Technical: 21 篇
- Workflow: 15 篇
