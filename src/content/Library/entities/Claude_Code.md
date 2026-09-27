---
title: "Claude Code"
type: entity
tags: [AI编程, Anthropic, 编程助手, CLI]
sources:
  - 01-输入/02-get笔记/notes/2026-05-14/memo@国内用户使用Cloud Code完全指南：从认知到落地的实操手册_63.md
  - 01-输入/02-get笔记/notes/2026-05-20/memo@Cloud Code实用技巧与深度应用指南：从入门到高阶_20.md
  - 01-输入/01-Clipings/深入理解 Claude Code：从 CLAUDE.md 到 Hooks、Skills、Subagents.md
last_updated: 2026-06-20
---

## 定义

Claude Code（文中称 Cloud Code）是 Anthropic 推出的全自主代理型 AI 编程助手，终端优先，可直接生成执行结果而非仅提供建议。

## 核心能力/特点

- 全自主代理：一次性生成完整函数/文件、修复整个 bug，无需逐行补全
- 代码库问答：新人入职从 2-3 周缩短至 2-3 天
- 零侵入工作流：适配所有 IDE 及终端环境（本地/远程/SSH/tmux）
- 代码本地存储，不上传远程服务器，不用于模型训练
- Cloud.md 系统：项目背景知识持久化，AI 自动读取遵循
- SDK 模式：支持管道化处理、JSON 输出、CI/CD 集成
- 多模态：支持图像输入（拖入图片生成对应代码）
- 国内可用：接入国产模型（质朴 GLN 5.1、Minimax、Kimi）
- 上下文注入体系：7 种注入方法（CLAUDE.md、Rules、Skills、Subagents、Hooks、Output Styles、System Prompt Append）
- Dynamic Workflows：Claude 自写编排脚本，协调多 subagent 并行，6 种编排模式

## 关联连接

- [[摘要-Cloud-Code深度应用]] — 详细来源摘要
- [[摘要-ClaudeCode-GrepOverRAG最佳实践]] — Grep Over RAG 设计哲学与最佳实践
- [[GrepOverRAG设计哲学]] — 代码搜索的设计哲学
- [[ClaudeCode最佳实践]] — 大型代码库最佳实践
- [[MCP协议]] — 使用的模型上下文协议
- [[Obsidian加AI自动化内容创作]] — 在内容创作中的应用
- [[AI_Knowledge_Management]] — AI 知识管理中的核心工具
- [[Claude-Code上下文注入方法]] — 7 种上下文注入方法总览
- [[Dynamic-Workflows]] — 动态工作流编排
