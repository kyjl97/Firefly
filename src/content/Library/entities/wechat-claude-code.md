---
title: "wechat-claude-code"
type: entity
tags: [claude-code, 微信, agent, 开源]
sources: [01-输入/01-Clipings/在微信里使用 Claude Code，刚刚在 GitHub 上开源了这个 Skill 。.md]
last_updated: 2026-05-27
---

## 定义

一个开源项目，通过微信 Bot 协议将 Claude Code 接入微信，实现手机端与 AI 对话。

## 核心能力/特点

- 基于微信 Bot 协议（HTTP 长轮询、AES 加密、扫码认证、CDN 媒体传输）
- 替换 OpenClaw 消息处理逻辑为 Claude Agent SDK
- 本地 Node.js 进程运行，无需公网 IP
- 首次扫码认证，之后微信直接对话
- 使用 Superpowers 框架开发
- 开源地址 https://github.com/Wechat-ggGitHub/wechat-claude-code

## 关联连接

- [[摘要-微信使用Claude Code]] — 项目详细介绍
- [[Claude_Code]] — Anthropic AI 编程助手
- [[Superpowers]] — Claude Code Skill 框架
- [[ClawBot]] — 微信 Bot 协议
