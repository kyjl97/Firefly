---
title: "摘要 - 微信使用 Claude Code"
type: source
tags: [claude-code, 微信, agent, skill]
sources: [01-输入/01-Clipings/在微信里使用 Claude Code，刚刚在 GitHub 上开源了这个 Skill 。.md]
last_updated: 2026-05-27
---

## 核心摘要

- **项目介绍**：通过微信 Bot 协议将 Claude Code 接入微信，实现手机端与 AI 对话
- **技术原理**：基于 ClawBot 包的微信协议（HTTP 长轮询、AES 加密、扫码认证、CDN 媒体传输），替换 OpenClaw 消息处理逻辑为 Claude Agent SDK
- **开发工具**：使用 Superpowers 框架（10 万 Star），包含 Brainstorming、Writing Plans、Dispatching Parallel Agents 三个 Skill
- **开发流程**：
  - 头脑风暴分析协议细节
  - 写实施计划拆分模块
  - 并行 Agent 开发 15 个模块
- **使用方式**：本地 Node.js 进程运行，首次扫码认证，之后微信直接对话
- **开源地址**：https://github.com/Wechat-ggGitHub/wechat-claude-code

## 关联连接

- [[wechat-claude-code]] — 微信 Claude Code 集成项目
- [[Claude_Code]] — Anthropic AI 编程助手
- [[Superpowers]] — Claude Code Skill 框架
- [[ClawBot]] — 微信 Bot 协议
- [[并行Agent开发]] — 多 Agent 并行开发概念
