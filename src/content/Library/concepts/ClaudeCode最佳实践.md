---
title: "Claude Code 大型代码库最佳实践"
type: concept
tags: [AI编程, Agent架构, 工作流, Claude Code]
sources: [01-输入/01-Clipings/Claude Code 为什么放弃 RAG 用 Grep 搜索代码？大型代码库最佳实践全解析.md]
last_updated: 2026-05-29
---

## 定义

Anthropic 官方文档和 70 万行 C# 项目 Skyline 实战总结的 Claude Code 使用最佳实践，覆盖环境配置、工作流、Context 管理、扩展能力四个维度。

## 要点

### 环境配置
- **CLAUDE.md 写法**：包含 Claude 猜不到的 bash 命令、和默认不同的代码风格、测试说明、仓库规范、开发环境特殊配置；太长会被忽略，需定期修剪
- **权限管理**：Auto mode（分类器判断安全性）、Permission allowlists（白名单信任命令）、Sandboxing（操作系统级隔离）

### 工作流
- **探索优先**：Explore（Plan Mode 只读不写）→ Plan → Implement → Commit
- **给 Claude 验证手段**：最高杠杆做法，没有验证标准会写出"看起来对但不对"的代码
- **避免失败模式**：厨房水槽式会话、反复纠正、CLAUDE.md 过长、信任但不验证、无限探索

### Context 管理
- /clear 清空 context、子 Agent 做重研究、/context 查看使用情况

### 扩展能力
- **Skills**：可复用知识模块，按需加载不占日常 context
- **Hooks**：确定性操作，每次文件编辑后自动跑 lint、每次 commit 前自动检查
- **Subagents**：独立 context window 做深度探索，只返回摘要

## 最佳实践

- 先探索再计划再编码，不要一上来就让 Claude 写代码
- 始终提供验证手段（测试用例、验证标准）
- 两次纠错失败后 /clear 重新开始
- 用 Skills 沉淀领域知识，用 Hooks 做确定性操作

## 关联连接

- [[Claude_Code]] — 核心工具
- [[GrepOverRAG设计哲学]] — 底层设计哲学
- [[ContextWindow管理]] — Context 工程方法论
- [[Claude-Code-Skills生态]] — Skills 扩展机制
- [[摘要-ClaudeCode-GrepOverRAG最佳实践]] — 详细来源摘要
