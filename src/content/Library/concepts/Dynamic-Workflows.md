---
title: "Dynamic Workflows"
type: concept
tags: [Claude-Code, Agent, 工作流, 方法论]
sources:
  - 01-输入/01-Clipings/深入理解 Claude Code：从 CLAUDE.md 到 Hooks、Skills、Subagents.md
last_updated: 2026-06-20
---

## 定义

Anthropic 发布的动态工作流能力，让 Claude 自己写编排脚本，协调多个 subagent 并行工作，解决复杂任务。用独立上下文窗口隔离每个子任务，从结构上消解默认 harness 的三个问题。

## 要点

### 解决的三个问题

1. **Agentic laziness（偷懒）**：安全审查要查 50 项，Claude 查到第 35 项就宣布完成
2. **Self-preferential bias（自我偏好）**：让 Claude 检查自己写的代码，倾向于觉得没问题
3. **Goal drift（目标漂移）**：长会话中每次压缩都是有损的，边缘需求和约束容易丢失

### 核心函数

- `Agent(prompt, opts?)` — 生成子任务
- `parallel([fns])` — 并行执行
- `pipeline(items, ...)` — 流水线编排

### 触发方式

- 跟 Claude 说「用一个 workflow」
- 触发词 `ultracode`

### 6 种编排模式

| 模式 | 说明 |
|------|------|
| **Classify-and-act** | 先用 classifier 判断任务类型，再分发给对应 agent |
| **Fan-out-and-synthesize** | 拆成 N 个子任务并行，最后汇总 |
| **Adversarial verification** | 每个执行 agent 配一个验证 agent，对抗性检查 |
| **Tournament** | N 个 agent 用不同方法做同一件事，逐对比较选最优 |
| **Generate-and-filter** | 先大量生成，再过滤去重 |
| **Loop until done** | 循环 spawn agent 直到满足终止条件 |

### 实际案例

- Bun 从 Zig 重写到 Rust 时使用了 dynamic workflows：每个修复跑一个 subagent 在独立 worktree 里改，另一个 agent 对抗性 review
- Deep Research（`/deep-research`）：内置 workflow skill，扇出搜索→抓取→对抗验证→汇总报告
- 反向用法：翻最近 50 个 session，找出反复修正 Claude 的模式，聚类成规则候选，通过的写进 CLAUDE.md

## 最佳实践

- 大规模复杂任务优先考虑 dynamic workflows
- 结合 subagent 嵌套（最深 5 层）实现多级编排
- 适合需要并行处理、对抗验证、循环迭代的场景

## 关联连接

- [[Claude_Code]] — 核心实体
- [[Claude-Code上下文注入方法]] — 7 种注入方法的延伸
- [[Claude-Code-Subagents]] — Subagents 是动态工作流的基础单元
- [[并行Agent开发]] — 多 Agent 并行开发模式
- [[Claude-Code-Hooks]] — Hooks 提供确定性护栏
