---
title: "摘要 - 讯飞星辰 Astron Coding Plan 体验"
type: source
tags: [coding-plan, token, agent, 讯飞]
sources: [01-输入/03-微信/3.9元无限Token，Codex、Claude Code、龙虾都能用.md]
last_updated: 2026-05-27
---

## 核心摘要

- **Tokenmaxxing 文化**：硅谷兴起 Token 消耗文化，Meta 内部追踪员工 Token 消耗量，30天全公司消耗超 60 万亿 Token；黄仁勋认为年薪 50 万的工程师应消耗 25 万美元 Token
- **Astron Coding Plan 定价**：最低 3.9 元/月（人民币），无忧版体验小模型，专业版每 5 小时 1200 次，高效版每 5 小时 6000 次
- **支持模型**：GLM-5.1、K2.5、Qwen 3.6、DeepSeek V3.2、Spark X2 等国产主流模型，model id 统一填 `astron-code-latest`（智能路由）
- **接入方式**：支持 Claude Code（Anthropic 格式）、Codex/OpenClaw/Cursor（OpenAI 格式），通过 CC-Switch 桥接 Codex
- **模型选型建议**：速度选 Flash 版本；视觉选 Qwen3.6-35B-A3B/K2.5；写代码选 GLM-5.1/K2.5/M2.5；写作选 DeepSeek-V3.2
- **GLM-5.1 表现**：One shot 即可生成 3D 金门大桥效果，优于 DeepSeek V4 同场景表现

## 关联连接

- [[Astron-Coding-Plan]] — 讯飞星辰推出的低价 Coding Plan 实体
- [[CC-Switch]] — 桥接国产 API 与 Codex 的工具
- [[Coding-Plan-选型方法论]] — 不同 Agent 场景下的模型选择策略
