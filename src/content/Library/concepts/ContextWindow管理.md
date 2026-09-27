---
title: "Context Window 管理"
type: concept
tags: [Agent架构, Context工程, AI编程]
sources: [01-输入/01-Clipings/Claude Code 为什么放弃 RAG 用 Grep 搜索代码？大型代码库最佳实践全解析.md]
last_updated: 2026-05-29
---

## 定义

AI Agent 运行中最核心的资源管理策略——Context Window 是比任何检索技术都更重要的约束条件，需要通过压缩、结构化笔记、子 Agent 等机制主动管理。

## 要点

- **Context Rot 问题**：随着 context 增长，模型回忆准确率下降，这是 Transformer 注意力机制决定的（n 个 token 间有 n² 注意力关系）
- **Compaction（压缩）**：context 接近上限时自动触发，消息历史交给模型做摘要，保留架构决策和未解决 bug，丢掉冗余工具输出，保留最近 5 个文件
- **结构化笔记**：Agent 把进度写到外部笔记文件（TODO/NOTES.md），不属于 context 但可重新读取，解决长程任务的 context 耗尽
- **Subagents**：在独立 context window 里做深度研究，只返回 1000-2000 token 摘要，主 Agent context 保持干净
- **管理工具**：/clear 清空 context、/context 查看使用情况、两次纠错失败后重新开始

## 最佳实践

- 用 /clear 在不同任务之间清空 context
- 用子 Agent 做代码调研，避免大范围 grep/read 填满主 context
- 超过两次纠错失败，/clear 重新开始带上更精确的 prompt
- 限定探索范围，避免无限探索

## 关联连接

- [[Claude_Code]] — 实践 Context 管理的核心工具
- [[GrepOverRAG设计哲学]] — Context 管理与 Grep 策略的配合
- [[摘要-ClaudeCode-GrepOverRAG最佳实践]] — 详细来源摘要
