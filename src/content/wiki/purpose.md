# Wiki Purpose

本 Wiki 是个人技术博客（Fuwari 主题）的内容知识库，用于：

1. **内容索引** — 121 篇文章的结构化目录，支持快速定位
2. **知识沉淀** — 提炼文章中的核心概念、工具链、工作流模式
3. **增量维护** — 通过 meta.json 追踪内容变更，支持后续由 AI 接管更新
4. **跨文章关联** — 发现不同分类之间的主题联系和依赖关系

## 如何使用

- 从 [index.md](index.md) 开始浏览
- 查看 [overview.md](overview.md) 了解博客全貌
- 按分类阅读 [AIHacks](sources/aihacks.md)、[Software](sources/software.md)、[Technical](sources/technical.md)、[Workflow](sources/workflow.md)
- 深入概念参考 [MCP Ecosystem](concepts/mcp-ecosystem.md)、[Static Site Deployment](concepts/static-site-deployment.md)

## 维护原则

- 不改变现有 wiki 路由和链接转换逻辑
- 分类页以 `posts/` 当前实际目录为准
- 博客文章链接优先使用 `../../content/posts/...md` 格式，保证网页渲染后可跳转
