---
title: "摘要 - 深入理解 Claude Code：从 CLAUDE.md 到 Hooks、Skills、Subagents"
type: source
tags: [Claude-Code, 上下文注入, Agent, Skills, Hooks]
sources:
  - 01-输入/01-Clipings/深入理解 Claude Code：从 CLAUDE.md 到 Hooks、Skills、Subagents.md
last_updated: 2026-06-20
---

## 核心摘要

- **核心论点**：AI Agent 的能力、问题和用法由上下文决定。不同的上下文注入方法有不同的生命周期——需要时出现，不需要时消失
- **7 种上下文注入方法**：CLAUDE.md（全程加载）、Rules（路径限定按需加载）、Skills（调用时加载）、Subagents（独立上下文窗口）、Hooks（绕过上下文的确定性执行）、Output Styles（system prompt 注入）、System Prompt Append（临时追加）
- **CLAUDE.md 正确用法**：放事实（构建命令、目录结构），流程放 Skills，护栏放 Hooks。全程加载会持续消耗 token，应避免膨胀
- **Skills 本质**：不是提示词，是按约定结构打包的文件夹（.skill 后缀）。只在调用时加载完整内容，平时只占几十个 token
- **Subagents 核心价值**：独立上下文窗口执行，主会话只收到摘要结果，不污染主会话。可嵌套最深 5 层
- **Hooks 是确定性护栏**：8 种事件（PreToolUse、PostToolUse 等）+ 5 种动作类型。"绝对不要做 X"类约束必须用 Hook 而非 CLAUDE.md
- **Dynamic Workflows**：让 Claude 自己写编排脚本，解决 Agentic laziness、Self-preferential bias、Goal drift 三个问题。6 种编排模式：Classify-and-act、Fan-out-and-synthesize、Adversarial verification、Tournament、Generate-and-filter、Loop until done
- **常见误区**：行为约束不应放 CLAUDE.md（用 Hook）；流程不应放 CLAUDE.md（用 Skill）；Rule 必须加路径限定否则白费 token

## 关联连接

- [[Claude_Code]] — 核心实体
- [[Claude-Code上下文注入方法]] — 提炼的概念页面
- [[CLAUDE_md]] — CLAUDE.md 配置文件
- [[Claude-Code-Rules]] — Rules 路径限定机制
- [[Claude-Code-Skills生态]] — Skills 技能包机制
- [[Claude-Code-Subagents]] — Subagents 子代理机制
- [[Claude-Code-Hooks]] — Hooks 确定性执行机制
- [[Claude-Code-Output-Styles]] — Output Styles 人设注入
- [[Claude-Code-System-Prompt-Append]] — System Prompt 临时追加
- [[Dynamic-Workflows]] — 动态工作流编排
- [[ContextWindow管理]] — 上下文窗口管理
