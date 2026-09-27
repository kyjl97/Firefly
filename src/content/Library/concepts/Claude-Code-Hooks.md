---
title: "Claude Code Hooks"
type: concept
tags: [Claude-Code, 自动化, 安全, 上下文注入]
sources:
  - 01-输入/01-Clipings/深入理解 Claude Code：从 CLAUDE.md 到 Hooks、Skills、Subagents.md
last_updated: 2026-06-20
---

## 定义

Claude Code 里最不像 AI 的机制——触发脚本。在 `settings.json` 里注册 hook，指定「当某个事件发生时执行这条命令」，类似 IFTTT 的 if-this-then-that。完全绕过上下文窗口，由 harness 在外部执行。

## 要点

### 8 种 Hook 事件

| 事件 | 触发时机 | 典型用途 |
|------|---------|---------|
| PreToolUse | 工具执行前 | 拦截危险命令、验证文件路径；exit code 2 阻止执行 |
| PostToolUse | 工具执行后 | 写文件后自动 Prettier、改代码后自动 linter |
| PermissionRequest | 权限对话框弹出前 | 自动批准常用安全操作 |
| SessionStart | 会话启动时 | 自动注入 git status、TODO 列表 |
| PreCompact | 上下文压缩前 | 备份完整对话到文件，防止重要决策丢失 |
| Stop | 回复完成时 | 检查任务是否做完、测试是否通过；返回 continue:true 让 Claude 继续 |
| SubagentStop | Subagent 回复完成时 | 同 Stop，针对 subagent |
| UserPromptSubmit | 提交 prompt 时 | 自动追加当前 sprint 信息 |

### 5 种动作类型

1. **command**：执行命令（确定性）
2. **HTTP**：调接口（确定性）
3. **mcp_tool**：调 MCP 工具（确定性）
4. **prompt**：让模型判断（非确定性）
5. **agent**：启动 agent 判断（非确定性）

前三种完全确定性执行，后两种用模型判断力。

## 最佳实践

- **安全护栏用 Hook**：「永远不要执行 rm -rf」用 PreToolUse Hook 而非 CLAUDE.md
- 提示词防护在长会话、压力大、prompt injection 时可能失效，Hook 拦截是确定性的
- 组织级护栏用 Managed Settings + Hook，管理员部署，用户不可覆盖

## 关联连接

- [[Claude_Code]] — 核心实体
- [[Claude-Code上下文注入方法]] — 7 种注入方法之一
- [[CLAUDE_md]] — 安全约束不应放 CLAUDE.md 而应用 Hook
- [[MCP协议]] — Hook 可调用 MCP 工具
