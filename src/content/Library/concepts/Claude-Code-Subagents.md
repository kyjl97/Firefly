---
title: "Claude Code Subagents"
type: concept
tags: [Claude-Code, Agent, 上下文注入]
sources:
  - 01-输入/01-Clipings/深入理解 Claude Code：从 CLAUDE.md 到 Hooks、Skills、Subagents.md
last_updated: 2026-06-20
---

## 定义

`.claude/agents/` 目录下的 markdown 文件，定义独立的子代理。在自己独立的上下文窗口里跑任务，跑完只把结论返回给主会话。从主会话角度，上下文成本为零。

## 要点

- **位置**：`.claude/agents/` 目录
- **定义方式**：YAML frontmatter 定义名字、描述、模型选择和可用工具
- **核心优势**：独立上下文窗口，不污染主会话
- **嵌套能力**：最深 5 层，是大规模编排的基础
- **与 Skills 区别**：Skill 在主线程执行，能看到中间过程；Subagent 在独立窗口跑，主会话只收最终结果

### 典型场景

1. **深度搜索**：大量中间结果不需要保留
2. **日志分析**：翻几百行 log 找问题
3. **依赖审计**：逐个检查库版本
4. **跑测试**：独立窗口执行测试，不干扰主会话

### 选择标准

- 需要看到每一步的中间结果 → 用 Skill
- 不需要，让它跑完给结论 → 用 Subagent

## 最佳实践

- Subagent 做脏活累活（50 轮搜索、200 个文件），主会话只多一段摘要
- 可嵌套使用，结合 Dynamic Workflows 实现大规模并行编排
- 适合耗时长、中间过程不需要人工干预的任务

## 关联连接

- [[Claude_Code]] — 核心实体
- [[Claude-Code上下文注入方法]] — 7 种注入方法之一
- [[Claude-Code-Skills生态]] — 与 Subagents 的对比选择
- [[Dynamic-Workflows]] — Subagents 是动态工作流的基础
- [[并行Agent开发]] — 多 Agent 并行开发模式
