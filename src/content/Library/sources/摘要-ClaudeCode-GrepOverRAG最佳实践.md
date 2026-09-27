---
title: "摘要 - Claude Code 为什么放弃 RAG 用 Grep 搜索代码？大型代码库最佳实践全解析"
type: source
tags: [Claude Code, RAG, 代码搜索, Agent架构, Context工程]
sources: [01-输入/01-Clipings/Claude Code 为什么放弃 RAG 用 Grep 搜索代码？大型代码库最佳实践全解析.md]
last_updated: 2026-05-29
---

## 核心摘要

- **RAG 在代码搜索场景的五个致命问题**：索引永远追不上代码变化、语法树解析成本高、Embedding 压缩丢信息、语义相似不等于代码相关、流水线复杂度高
- **Grep Over RAG 的设计哲学**：开发者怎么探索代码库就让 AI 怎么探索——glob/grep 实时搜索文件系统，始终最新、精准匹配、零预处理、可组合
- **混合检索架构**：静态上下文（CLAUDE.md + Auto Memory + Skills + System Instructions）启动时加载 + 动态检索（Glob/Grep/Read/Bash）按需获取 + 隔离层（Subagents + Compaction）
- **Context Window 管理三大机制**：Compaction（自动压缩保留关键信息）、结构化笔记（外部文件保存进度）、Subagents（独立 context window 做深度研究，只返回摘要）
- **70 万行 C# 项目 Onboarding 案例**：Brendan MacLean 维护 Skyline 蛋白质分析软件，通过建立上下文仓库 + Skills 库 + MCP 集成，搁置一年的功能两周完成，三年没动的模块不到一天加新功能
- **最佳实践清单**：写好 CLAUDE.md 但别太长、配好权限减少打断、先探索再计划再编码、给 Claude 验证手段、管理 Context、避免常见失败模式、用 Skills 沉淀领域知识、用 Hooks 做确定性操作、用子 Agent 做重研究
- **Grep vs RAG 适用场景**：代码搜索/结构化数据/实时性要求高/Agent 循环用 Grep；非结构化知识库/语义搜索/大规模静态内容/跨模态检索用 RAG

## 关联连接

- [[Claude_Code]] — 文章核心讨论的 AI 编程工具
- [[GrepOverRAG设计哲学]] — 文章提炼的核心设计哲学概念
- [[ContextWindow管理]] — 文章深入讨论的 Context 工程方法论
- [[ClaudeCode最佳实践]] — 文章总结的大型代码库实战最佳实践
- [[MCP协议]] — Skyline 案例中使用的模型上下文协议
- [[Claude-Code-Skills生态]] — Skills 作为领域知识扩展机制
