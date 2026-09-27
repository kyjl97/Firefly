# Library操作规范

## 语言设定

无论输入何种语言，始终使用**简体中文**进行思考、回复和Library编写。

## 目录权限边界

| 目录 | 权限 | 说明 |
|------|------|------|
| `01-输入/` | **只读** | 原始素材，禁止修改或删除 |
| `Library/` | **可读写** | AI 专属工作区，创建/更新/提炼知识 |

## 页面 Frontmatter 规范

所有 wiki 页面**必须**包含以下 YAML 头部：

```yaml
---
title: "页面标题"
type: concept | entity | source | synthesis
tags: [标签1, 标签2]
sources: [01-输入/来源文件路径.md]
last_updated: YYYY-MM-DD
---
```

## 四类页面模板

### Sources（来源摘要）

- **文件名**：前缀 `摘要-` + 中文标题，如 `摘要-Claude Code浏览器版.md`、`摘要-卡帕西访谈.md`
- **目录**：`Library/sources/`
- **结构**：

```markdown
---
title: "摘要 - 原始标题"
type: source
tags: [相关标签]
sources: [01-输入/原始文件路径.md]
last_updated: YYYY-MM-DD
---

## 核心摘要

- **要点一**：具体发现或结论
- **要点二**：具体发现或结论
- **要点三**：具体发现或结论

## 关联连接

- [[相关概念]] — 关联说明
- [[相关实体]] — 关联说明
```

### Entities（实体）

- **文件名**：中文名称优先，专有名词保留英文原名，如 `卡帕西.md`、`The Vibe Companion.md`、`字节跳动.md`
- **目录**：`Library/entities/`
- **结构**：

```markdown
---
title: "实体名称"
type: entity
tags: [工具, AI] 或 [人物] 或 [公司]
sources: [相关来源路径]
last_updated: YYYY-MM-DD
---

## 定义

一句话描述该实体的核心身份/功能。

## 核心能力/特点

- 能力一
- 能力二

## 关联连接

- [[相关概念]] — 关联说明
- [[相关来源摘要]] — 来源引用
```

### Concepts（概念）

- **文件名**：中文名称优先，如 `Lolm Wiki框架.md`、`本地知识库+大模型.md`、`AI Coding工作流.md`
- **目录**：`Library/concepts/`
- **结构**：

```markdown
---
title: "概念名称"
type: concept
tags: [方法论, 工作流]
sources: [相关来源路径]
last_updated: YYYY-MM-DD
---

## 定义

概念的核心定义和适用范围。

## 要点

- 关键要素一
- 关键要素二

## 最佳实践

- 实践建议一
- 实践建议二

## 关联连接

- [[相关实体]] — 关联说明
- [[相关概念]] — 关联说明
```

### Syntheses（综合分析）

- **文件名**：kebab-case，如 `ai-coding-tools-对比分析.md`
- **目录**：`Library/syntheses/`
- **结构**：自由格式，针对复杂问题的深度分析，结尾必须有 `## 关联连接`。

## 强制规则

1. **双向链接**：每个页面必须有 `## 关联连接` 区域，不允许孤岛页面。
2. **矛盾处理**：新知识与旧知识冲突时，在页面中新建 `## 知识冲突` 区块，保留两种说法并对比。
3. **index.md 同步**：每次新增 wiki 页面后，必须更新 `Library/index.md`。
4. **log.md 追加**：每次操作后在 `Library/log.md` 追加日志条目。
5. **来源追溯**：每个页面必须通过 `sources` 字段关联到 `01-输入/` 中的原始文件。
