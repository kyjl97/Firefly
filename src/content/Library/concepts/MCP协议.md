---
title: "MCP 协议"
type: concept
tags: [协议, AI, 标准, 互操作]
sources:
  - 01-输入/02-get笔记/notes/2026-05-20/memo@5个无人讲过的NotebookLM高阶玩法：连接ANTIGRAVITY打造AI超级外接大脑_89.md
  - 01-输入/02-get笔记/notes/2026-05-14/memo@国内用户使用Cloud Code完全指南：从认知到落地的实操手册_63.md
  - 01-输入/02-get笔记/notes/2026-03-06/memo@飞书MCP（AI+文档）功能配置与应用指南_82.md
last_updated: 2026-05-27
---

## 定义

MCP（Model Context Protocol，模型上下文协议）是一种让 AI 灵活调用外部工具的协议标准，实现不同 AI 工具之间的数据流动和能力协作。是连接 NotebookLM 与 ANTIGRAVITY、Cloud Code 与飞书等工具的"通行证"。

## 要点

- **核心作用**：作为 AI 工具之间的连接桥梁，实现跨平台数据调用和能力互补
- **权限管理**：支持精细权限控制（如 32 项权限管理），可根据需求开放或限制特定功能
- **配置方式**：通过 MCP 配置文件添加服务，支持命令行工具（如 `cloud mcp add`）和图形界面配置
- **应用场景**：NotebookLM + ANTIGRAVITY 协作、飞书文档自动化、Cloud Code 工具扩展
- **降低幻觉**：连接后 AI 自动判断调用哪些资料，无需手动拖拽文件，避免上下文占用过多

## 关联连接

- [[NotebookLM]] — 通过 MCP 连接的知识库
- [[ANTIGRAVITY]] — 通过 MCP 连接的执行工具
- [[Claude_Code]] — 支持 MCP 配置的编程工具
- [[飞书MCP]] — 飞书文档的 MCP 实现
- [[智能躯干与超级大脑协同系统]] — MCP 驱动的协作模型
