---
title: 关于gemini模型选择
published: 2026-07-24
tags:
  - ai
  - codex
  - claude
  - gemini
category: AIHacks
draft: false
pinned: false
image: 
---
### 一.Gemini

#### 有哪些模型
- 3.5Flash-Lite 快速问答/总结长文章/快速翻译
- 3.6Flash   日常聯天/一般编程/看图说话/写长文
- 3.1Pro 高难代码重构/复杂数学题/深度逻辑推断
- 3.6 Flash或 3.1 Pro + 开启 扩展思考  碰到极其复杂、容易出错的超级难题

#### 模型优势
1. 天然的数据入口优势，信息检索能力
2. 超长上下文能力更强
3. 网页端整体设计比较克制

### 特殊功能

- 制作视频
- 制作音乐
- Canvas
- Deep Research
- Gem创建

### 二. antigravity

#### 有哪些模型

- **写复杂代码、排查死锁、攻克数学/逻辑难题**：优先选择 **`google-antigravity/claude-opus-4-6-thinking`**。
- **日常开发、文档撰写、常规对话（最推荐）**：优先选择 **`google-antigravity/claude-sonnet-4-6`**。
- **需要分析超长文档/论文/大型代码库**：选择 **`google-antigravity/gemini-3.1-pro`**。
- **追求极速回复、处理简单大量文本**：选择 **`google-antigravity/gemini-3.6-flash`**。

#### 使用

1. Antigravity客户端:https://antigravity.google/

2. Codex中使用，借助[lidge-jun/opencodex](https://github.com/lidge-jun/opencodex)