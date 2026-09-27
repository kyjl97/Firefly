---
title: "Grep Over RAG 设计哲学"
type: concept
tags: [Agent架构, 代码搜索, Context工程, Claude Code]
sources: [01-输入/01-Clipings/Claude Code 为什么放弃 RAG 用 Grep 搜索代码？大型代码库最佳实践全解析.md]
last_updated: 2026-05-29
---

## 定义

Anthropic 在 Claude Code 中采用的设计哲学：用 grep/glob 实时搜索替代 RAG 检索增强生成来探索代码库，核心洞察是"开发者怎么探索代码库就让 AI 怎么探索"。

## 要点

- **RAG 在代码搜索的五个致命问题**：索引过时、语法树解析成本高、Embedding 丢信息、语义相似不等于代码相关、流水线复杂
- **Grep 的优势**：始终最新（直接读文件系统）、精准匹配（正则表达式）、零预处理（不需要 embedding 流水线）、可组合（grep + read + bash 组合出任意复杂查询）
- **混合策略**：静态上下文一次性加载（CLAUDE.md/Skills/Auto Memory），动态信息按需获取（Glob/Grep/Read/Bash），大量研究隔离到子 Agent
- **适用边界**：代码搜索/结构化数据/实时性/Agent 循环用 Grep；非结构化知识库/语义搜索/大规模静态内容/跨模态用 RAG

## 最佳实践

- 在能用 grep 的地方用 grep，在 grep 不够用的地方才上 RAG
- 开发者的探索习惯就是 AI Agent 的最佳探索路径
- Context Window 是 AI Agent 最核心的资源，比任何检索技术都重要

## 关联连接

- [[Claude_Code]] — 实践该哲学的核心工具
- [[ContextWindow管理]] — 与 Grep 策略配合的 Context 工程
- [[摘要-ClaudeCode-GrepOverRAG最佳实践]] — 详细来源摘要
