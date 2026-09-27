---
title: "Claude Code Output Styles"
type: concept
tags: [Claude-Code, 配置, 上下文注入]
sources:
  - 01-输入/01-Clipings/深入理解 Claude Code：从 CLAUDE.md 到 Hooks、Skills、Subagents.md
last_updated: 2026-06-20
---

## 定义

`.claude/output-styles/` 下的配置，注入到 system prompt 中，权重最高但影响面也最大。可以修改 Claude Code 的「人设」。

## 要点

- **位置**：`.claude/output-styles/` 目录
- **注入位置**：system prompt，永不被压缩
- **指令遵循权重**：最高
- **关键限制**：自定义 output style 会**替换掉默认的 system prompt**（除非 frontmatter 加 `keep-coding-instructions: true`）

### 内置 Style

1. **Proactive**：自主决策多
2. **Explanatory**：教学模式
3. **Learning**：协作编码

## 最佳实践

- 改动较大，适合需要完全自定义人设的场景
- 如果只想追加少量指令，用 System Prompt Append 更轻量
- 注意保留默认 system prompt 中的软件工程指令

## 关联连接

- [[Claude_Code]] — 核心实体
- [[Claude-Code上下文注入方法]] — 7 种注入方法之一
- [[Claude-Code-System-Prompt-Append]] — 更轻量的替代方案
