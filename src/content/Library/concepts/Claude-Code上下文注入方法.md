---
title: Claude Code 上下文注入方法
type: concept
tags:
  - Claude-Code
  - Agent
  - 上下文工程
  - 方法论
sources:
  - 01-输入/01-Clipings/深入理解 Claude Code：从 CLAUDE.md 到 Hooks、Skills、Subagents.md
last_updated: 2026-06-20
---

## 定义

Claude Code 提供的 7 种控制/上下文注入方法，用于在不同场景下向 Agent 注入指令和约束。核心原则是：**不同的指令要有不同的生命周期**——需要时出现，不需要时消失。

## 要点

### 方法分类（按加载时机）

| 方法 | 加载时机 | token 成本 | 适用内容 |
|------|---------|-----------|---------|
| CLAUDE.md | 启动即加载，全程在 | 高（持续消耗） | 项目事实：构建命令、目录结构 |
| Rules | 碰到限定路径文件时加载 | 按需 | 跨目录约束（如所有 migration 文件规则） |
| Skills | 被调用时加载完整内容 | 按需（几十 token 名字+描述常驻） | 流程：部署清单、review checklist |
| Subagents | 独立上下文窗口执行 | 零（主会话只收摘要） | 脏活累活：深度搜索、日志分析 |
| Hooks | 完全绕过上下文 | 零（代码执行） | 硬护栏：安全约束、自动格式化 |
| Output Styles | system prompt 注入 | 中（永不压缩） | 人设/语气（但会替换默认 prompt） |
| System Prompt Append | CLI 临时追加 | 中（永不压缩） | 轻量临时指令（单次有效） |

### 核心原则

1. **事实放 CLAUDE.md**：构建命令、目录结构、团队约定
2. **流程放 Skills**：部署流程、发布流程、review checklist
3. **护栏放 Hooks**：安全约束、自动执行（确定性）
4. **隔离任务给 Subagent**：不需要中间结果的独立任务

### 常见误区

- ❌ 「每次 X，必须做 Y」放 CLAUDE.md → 应用 PostToolUse Hook
- ❌ 「绝对不要做 Z」放 CLAUDE.md → 应用 PreToolUse Hook（exit code 2 阻止）
- ❌ 30 行流程放 CLAUDE.md → 应放 Skill
- ❌ Rule 不加 paths 限定 → 等于全程加载白费 token
- ❌ 个人偏好放项目级文件 → 应放用户级本地文件

## 最佳实践

- CLAUDE.md 保持精简，只放事实，避免膨胀导致指令遵循率下降
- 子目录 CLAUDE.md 用 `claudeMdExcludes` 配置跳过不相关团队的文件
- 组织级安全策略通过 MDM 或配置管理工具统一部署，个人不可覆盖
- Skill 不是提示词，是打包的文件夹，本质是按约定结构组织的资源包

## 关联连接

- [[Claude_Code]] — 核心实体
- [[CLAUDE_md]] — CLAUDE.md 配置机制
- [[Claude-Code-Rules]] — Rules 路径限定
- [[Claude-Code-Skills生态]] — Skills 技能包
- [[Claude-Code-Subagents]] — Subagents 子代理
- [[Claude-Code-Hooks]] — Hooks 确定性执行
- [[Claude-Code-Output-Styles]] — Output Styles
- [[Claude-Code-System-Prompt-Append]] — System Prompt 追加
- [[Dynamic-Workflows]] — 动态工作流
- [[ContextWindow管理]] — 上下文窗口管理方法论
