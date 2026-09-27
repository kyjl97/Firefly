---
title: "Claude Code Rules"
type: concept
tags: [Claude-Code, 配置, 上下文注入]
sources:
  - 01-输入/01-Clipings/深入理解 Claude Code：从 CLAUDE.md 到 Hooks、Skills、Subagents.md
last_updated: 2026-06-20
---

## 定义

`.claude/rules/` 目录下的 markdown 文件，为特定文件或目录设定约束，做到「碰到这类文件才生效」。是更精细的 CLAUDE.md。

## 要点

- **位置**：`.claude/rules/` 目录
- **路径限定**：通过 `paths:` 字段限定生效范围
- **无路径限定**：等同于写在 CLAUDE.md 里，启动即加载，全程占 token
- **有路径限定**：只在 Claude 读取限定路径文件时才加载，不浪费 token

### 示例

```yaml
---
paths:
  - "src/api/**"
  - "**/*.handler.ts"
---
所有 API handler 必须用 Zod 做输入校验
```

只有当 Claude 读取 `src/api/` 下的文件时，这条 Rule 才加载。

## 最佳实践

- 适用于跨目录但不需要全局生效的约束
- 必须加 `paths:` 限定，否则白费 token
- 典型场景：所有 migration 文件只能追加、所有测试文件必须用某个 mock 库

## 关联连接

- [[Claude_Code]] — 核心实体
- [[CLAUDE_md]] — Rules 是更精细的 CLAUDE.md
- [[Claude-Code上下文注入方法]] — 7 种注入方法之一
- [[ContextWindow管理]] — 路径限定减少 token 消耗
