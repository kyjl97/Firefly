---
title: "Claude Code System Prompt Append"
type: concept
tags: [Claude-Code, 配置, 上下文注入]
sources:
  - 01-输入/01-Clipings/深入理解 Claude Code：从 CLAUDE.md 到 Hooks、Skills、Subagents.md
last_updated: 2026-06-20
---

## 定义

通过 CLI 参数 `--append-system-prompt` 临时往 system prompt 后面追加内容，不修改默认指令，只对当次调用生效。

## 要点

- **用法**：`claude --append-system-prompt "所有回复使用中文，代码注释也用中文"`
- **生效范围**：只对当次调用有效，不写文件，不跨 session
- **压缩行为**：永不被压缩
- **vs Output Styles**：不替换默认 prompt，只追加，更轻量

### 适用场景

- 加编码规范
- 输出格式偏好
- 语气偏好
- 轻量临时指令

### 注意事项

- 追加指令越多，Claude 对每条指令的遵循率越低（递减效应）
- 指令间有冲突时，遵循率下降更快

## 关联连接

- [[Claude_Code]] — 核心实体
- [[Claude-Code上下文注入方法]] — 7 种注入方法之一
- [[Claude-Code-Output-Styles]] — 更重量级的替代方案
