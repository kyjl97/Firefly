---
title: "CLAUDE.md"
type: concept
tags: [Claude-Code, 配置, 上下文注入]
sources:
  - 01-输入/01-Clipings/深入理解 Claude Code：从 CLAUDE.md 到 Hooks、Skills、Subagents.md
last_updated: 2026-06-20
---

## 定义

Claude Code 项目的「说明书」，启动时自动读入，类似 ChatGPT 的 Instruction 或 API 的 System Prompt。是唯一全程加载、全程占 token 的上下文注入方法。

## 要点

### 两种加载模式

1. **始终加载**：根目录 CLAUDE.md + 本地个人偏好 CLAUDE.md，启动即加载，压缩后重新读取，全程在
2. **按需加载**：子目录 CLAUDE.md（如 `app/api/CLAUDE.md`），只在 Claude 读取该目录文件时加载，压缩后丢失，再次碰该目录才重新加载

### 正确用法

- 放**事实**：构建命令、目录结构、编码规范
- **不放流程**：部署流程、review checklist → 放 Skills
- **不放护栏**：安全约束 → 放 Hooks
- 保持精简，避免膨胀导致指令遵循率下降

### Codex 对应

在 OpenAI Codex 中，对应文件叫 `agents.md`。

## 最佳实践

- 每个团队目录放自己的 CLAUDE.md，用 `claudeMdExcludes` 跳过不相关团队文件
- 组织级安全策略通过 MDM 统一部署，个人不可排除
- 个人偏好（如 commit message 格式）放用户级本地文件，不放项目级

## 关联连接

- [[Claude_Code]] — 核心实体
- [[Claude-Code上下文注入方法]] — 7 种注入方法的总览
- [[Claude-Code-Skills生态]] — 流程应放 Skills 而非 CLAUDE.md
- [[Claude-Code-Hooks]] — 护栏应放 Hooks 而非 CLAUDE.md
- [[ContextWindow管理]] — CLAUDE.md 的 token 消耗问题
