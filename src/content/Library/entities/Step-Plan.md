---
title: "Step Plan"
type: entity
tags: [coding-plan, 阶跃星辰, agent]
sources: [01-输入/03-微信/国产模型API接到Codex之后，还能跑通这10个核心玩法.md]
last_updated: 2026-05-27
---

## 定义

阶跃星辰推出的 Coding Plan 订阅服务，支持通过智能路由自动切换 deepseek-v4-pro 和 step-3.5-flash，可通过 CC-Switch 接入 Codex。

## 核心能力/特点

- **智能路由**：`step-router-v1` 根据任务复杂度自动在 deepseek-v4-pro 和 step-3.5-flash 间切换
- **价格优势**：deepseek-v4-pro 保持 2.5 折，等效于"DeepSeek 出了 Coding Plan"
- **附加模型**：含 6B 以下 image-edit-2 模型，支持文生图和图像编辑（修改图片文字速度快且准确）
- **API 模式 Codex 功能保留**：手机端、锁屏、截屏、浏览器自动化、Computer Use、上下文压缩均可用
- **缺失功能**：Chronicle 记忆组件（从屏幕活动提取构建记忆）不可用
- **安装脚本**：`curl -fsSL ... stepfun-codex-adapter` 自动引导配置

## 关联连接

- [[CC-Switch]] — API 桥接工具
- [[Astron-Coding-Plan]] — 同类竞品
- [[Coding-Plan-选型方法论]] — 模型选型策略
- [[摘要-国产模型API接Codex核心玩法]] — 来源引用
