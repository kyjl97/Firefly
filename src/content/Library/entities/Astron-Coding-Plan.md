---
title: "Astron Coding Plan"
type: entity
tags: [coding-plan, 讯飞, token, agent]
sources: [01-输入/03-微信/3.9元无限Token，Codex、Claude Code、龙虾都能用.md]
last_updated: 2026-05-27
---

## 定义

讯飞星辰推出的低价 AI 编程订阅计划，最低 3.9 元/月，支持多款国产大模型接入 Claude Code、Codex、OpenClaw 等主流 Agent。

## 核心能力/特点

- **三档定价**：无忧版 3.9 元/月（小模型）、专业版（每 5 小时 1200 次）、高效版（每 5 小时 6000 次，专业版 5 倍）
- **智能路由**：model id 统一填 `astron-code-latest`，后台切换模型 1-3 分钟生效
- **双协议支持**：Claude Code 用 Anthropic 格式 URL，Codex/OpenClaw/Cursor 用 OpenAI 格式 URL
- **支持模型**：GLM-5.1、K2.5、Qwen 3.6、DeepSeek V3.2、Spark X2、MiniMax-M2.5 等
- **免费模型**：Qwen-3.5-35B、Qwen-3.6-35B 可享 7-30 天免费高并发
- **管理后台**：API Key、model id、url 一键复制，用量统计集中展示

## 关联连接

- [[摘要-讯飞星辰Astron-Coding-Plan体验]] — 来源引用
- [[CC-Switch]] — 接入 Codex 时需要的桥接工具
- [[Coding-Plan-选型方法论]] — 模型选择策略
- [[Step-Plan]] — 同类竞品
