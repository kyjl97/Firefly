---
title: "摘要 - The Vibe Companion：把 Claude Code 搬进浏览器"
type: source
tags: [AI工具, Claude-Code, 开源, 浏览器]
sources: [01-输入/01-Clipings/把 Claude Code 搬进了浏览器.md]
last_updated: 2026-05-27
---

## 核心摘要

- **项目概况**：The Vibe Companion 是 GitHub 上的开源项目，将 Claude Code 的命令行交互搬进浏览器，提供可视化 Web 界面。
- **技术实现**：通过逆向工程破解了 Claude Code CLI 内部未公开的 WebSocket 协议，在其上构建可视化界面。
- **核心功能**：支持多会话并行运行多个 Claude Code 实例，每个实例拥有独立进程和权限设置；具备可视化工具调用流，Bash 命令、文件读写、代码修改均以折叠块形式清晰呈现。
- **使用门槛**：无需额外 API Key，直接复用现有 Claude Code 订阅，通过 Bun 环境一行命令本地启动。
- **适用场景**：适合习惯 Claude Code 辅助编程但苦于命令行交互限制的用户。

## 关联连接

- [[The_Vibe_Companion]] — 项目实体页面
- [[AI_Knowledge_Management]] — AI 工具在知识工作流中的应用
