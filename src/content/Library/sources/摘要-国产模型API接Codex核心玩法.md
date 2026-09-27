---
title: "摘要 - 国产模型 API 接 Codex 核心玩法"
type: source
tags: [codex, coding-plan, step-plan, agent]
sources: [01-输入/03-微信/国产模型API接到Codex之后，还能跑通这10个核心玩法.md]
last_updated: 2026-05-27
---

## 核心摘要

- **Step Plan 接入 Codex**：阶跃星辰 Step Plan 可通过 `step-router-v1` 智能路由在 deepseek-v4-pro 和 step-3.5-flash 间自动切换，通过 cc-switch 桥接
- **API 模式功能保留**：手机端 Codex 可用、锁屏可用、双击 Command 截屏可用、浏览器自动化可用、Computer Use 可用
- **Codex 三大入口**：browser（网页审查/阅读）、@chrome（需要登录态的工作流）、@computer（桌面 GUI 任务）
- **任务干预**：引导（AI 跑偏时拉回）和排队（不打断当前任务，排到后面）
- **Goals 功能**：`codex features enable goals` 启用，给 AI 设定长期目标持续完成，可中途修改
- **记忆协作**：共享记忆 + Obsidian 持久上下文，API 模式下 Chronicle 记忆组件不可用
- **Agent 分工**：Hermes 做 IM 入口和长期调度层，Codex 做执行层，Claude Code 做编程层，三者互补

## 关联连接

- [[Step-Plan]] — 阶跃星辰 Coding Plan 实体
- [[CC-Switch]] — API 桥接工具
- [[../../ZEN交付/Codex插件界面补丁]] — OpenAI 编程 Agent
- [[Coding-Plan-选型方法论]] — 模型选型策略
