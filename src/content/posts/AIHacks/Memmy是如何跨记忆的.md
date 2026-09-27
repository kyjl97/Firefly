---
title: Memmy跨会话记忆详解
published: 2026-08-14
tags:
  - Agent
  - Memory
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260814145317913.webp
---

你有没有遇到过这种情况：在 Cursor 里跟 AI 讨论了半天的架构方案，切到 Claude Code 继续写代码时，它一脸茫然地问你"请问你的项目是什么？"。又或者你在 Codex 里调通了一个复杂的部署流程，第二天换个会话，一切又得从头解释。

**每一次 AI 协作都会产生有价值的上下文和经验，但它们被锁死在不同的工具和会话里。**

Memmy 要解决的就是这个问题——让所有 AI Agent 共享同一份关于你的记忆。

项目地址：MemTensor/memmy-agent

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260814145317913.webp)

## 01. 它到底是什么？

Memmy 不是一个聊天机器人，也不是又一个 IDE 插件。它是一层**跨 Agent 共享的记忆底座**。

简单理解：你在 Cursor、Claude Code、Codex、OpenClaw、Hermes Agent 等任何 AI Agent 里的工作，都会被 Memmy 自动采集、理解、结构化，沉淀成一份只属于你的长期记忆。下次不管你在哪个 Agent 里开始新会话，它都能接上之前的上下文。

用一句话概括：**一次积累，多处使用。**

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/7b55d03497ba89c84e72efb3b5cb96a3.webp)

## 02. 记忆是怎么"跨"过去的？

这是最核心的问题。Memmy 的跨记忆机制分三层来理解：

### 第一层：统一采集

Memmy 提供了一个叫 **Agent Source** 的适配器机制。它能扫描你已有的 Agent 历史记录——Cursor 的对话、Claude Code 的终端交互、Codex 的任务日志——把这些散落在不同地方的对话和项目经验，统一拉进 Memmy 的记忆库。

安装后几分钟内，你过去几个月积累的上下文就会被转化。Memmy 还会生成一份个性化的「初见报告」，告诉你它从历史中读到了什么。

目前已支持扫描的 Agent 包括：Cursor、Claude Code、Codex、OpenCode、OpenClaw、Hermes、WorkBuddy、Pi、qwenwork Agent。

### 第二层：MemOS 记忆引擎

采集只是第一步，真正的核心在于 **MemOS 驱动的记忆引擎**。它不是简单地存聊天记录，而是：

- **自动摘要**：用专门的 AI 模型（memory_summary）从对话中提取关键信息——你的偏好、项目背景、技术栈、决策记录
- **经验演化**：用另一个模型（memory_evolution）把零散的对话痕迹归纳为可复用的策略和经验
- **语义检索**：通过 Embedding 模型将记忆向量化，支持模糊语义搜索，而不是只能按关键词匹配

记忆被分为不同层级：

| 层级 | 作用 | 生命周期 |
|------|------|---------|
| Trace（痕迹） | 原始对话片段 | 短期，作为演化原料 |
| Experience（经验） | 提炼出的策略和模式 | 中期，可跨项目复用 |
| World（世界模型） | 用户偏好、项目知识 | 长期，持续更新 |
| Skill（技能） | 可执行的能力定义 | 永久，按需加载 |

### 第三层：统一注入

当你打开一个新的 Agent 会话时，Memmy 会自动把相关记忆注入到上下文中。不管这个 Agent 是桌面端的 Memmy 自己，还是通过 MCP/Skill 接入的外部 Agent，读到的都是**同一份记忆**。

这就是为什么你在 Memmy 桌面端讨论过的方案，切到 CLI 或者通过 Telegram 发消息时，Agent 都能无缝接上。

## 03. 本地优先，数据在你手里

很多人第一反应是：这不是要把我所有对话上传到云端？

Memmy 的设计原则是 **Local-first**：

- 记忆、配置、应用状态默认保存在本机（SQLite 数据库）
- 本地记忆服务跑在 `127.0.0.1:18960`，只有授权的来源能调用
- 当记忆服务不可用时，它会明确告诉你"记忆不可用"，而不是编造一条假记忆糊弄你

你的数据不需要上传云端，记忆的控制权完全在你手里。

## 04. 不只是记忆，还是完整的 Agent Runtime

Memmy 的记忆层是核心差异化，但它同时也是一套完整的本地 Agent 运行环境：

| 层 | 作用 | 核心能力 |
|---|------|---------|
| 🧠 Memory Layer | 保存和管理长期上下文 | 跨 Agent 记忆、历史导入、知识沉淀 |
| 🤖 Agent Runtime | 驱动 Agent 执行任务 | 推理、工具调用、MCP、Skill |
| 🔌 Integration Layer | 连接外部生态 | Telegram、Discord、微信、飞书、GitHub、Notion 等 |
| 🖥️ User Interface | 提供使用入口 | 桌面应用、CLI/TUI、Web 接口 |

通过 Skills 和 MCP 可以扩展更多能力：文件处理、Shell 操作、Web 搜索、图像生成、自动化任务……Agent 不只是能聊天，还能真正干活。

## 05. 怎么跑起来？

### 桌面端（推荐）

去 [官网](https://memmy.cn/) 或 [GitHub Release](https://github.com/MemTensor/memmy-agent/releases) 下载安装。注册后选择**账号模式**，直接就能用，不需要自备 API Key。

登录后记得做两件事：
1. 打开「记忆管理」→ 扫描 Agent 历史来源，把已有的对话导入
2. 打开「工具」→ 连接你常用的消息渠道

### CLI 模式

```bash
memmy onboard    # 初始化配置
memmy status     # 查看状态
memmy            # 进入交互式聊天
memmy serve      # 启动 OpenAI 兼容 API
```

### 给外部 Agent 装记忆

Memmy 还提供了 `memmy-memory` CLI，专门给外部 Agent 和脚本调用：

```bash
memmy-memory init      # 写入配置，按需安装 Skill
memmy-memory search "项目里的记忆策略"
memmy-memory add "这是一条需要保存的知识"
memmy-memory get <id>
```

## 06. 和其他个人 Agent 有什么区别？

Hermes Agent、OpenClaw 这类产品定位是「个人 AI Agent」——帮你聊天、办事。Memmy 的定位不同，它是**记忆底座 + 通用 Agent**。

最关键的区别：

- **跨 Agent 共享记忆**：Hermes 和 OpenClaw 的记忆只在自己内部用，Memmy 的记忆所有 Agent 都能读
- **接管外部 Agent 历史**：只有 Memmy 能扫描 Cursor/Codex/Claude Code 的历史，把过去的对话变成持续生长的知识资产
- **为外部 Agent 安装记忆 Skill**：让其他 Agent 也拥有长期记忆能力

简单说，其他 Agent 是"一个更聪明的助手"，Memmy 是"让所有助手都认识你的那个基础设施"。

## 07. 福利

注册 Memmy 时使用邀请码，可获得额外200万额度：

```
MEMMY-htm5ZS
```

注册即赠送 Agent 任务体验 Token，体验完整的 Memory + Agent Runtime。额度用尽后可切换至 BYOK 模式，使用自己的模型 API Key 继续。

另外对于我也建议，给你的agent装个项目级经验账本，查看[Project Cairn](https://mp.weixin.qq.com/s/tG_pb9FsSGummV4yCu9xhw)这篇文章

说到底，AI 协作最大的摩擦不是模型不够聪明，而是每次都要从零开始认识你。 Memmy 试图让这件事不再发生。

**以上，既然看到这里了，如果对你有所帮助，还望不吝点赞与关注，这也是对我最大的鼓励与支持。**

感谢你拨冗阅读，山高水长，我们期待下篇文章与你再见。


![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/a40746dd7c4aef1a757eedac61ca79e9.webp)

1，如果你是内容创作者，笔记杂乱、灵感难沉淀、素材难以复用，这套融合 PARA + 卡片法 + LLM 自动运维的 Obsidian 知识库模板直接抄作业：[点此查看详情！](https://mp.weixin.qq.com/s/5LkcBS6TvwXEGxIMiA-1jQ)

2，日常用 Codex 做自动化、写脚本、管理项目？这套完整落地实战手册，避开大量踩坑流程：[点此查看详情！](https://mp.weixin.qq.com/s/F3HS6BUfTDP0h3rFipoJhA)
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/7e9c576eddfd4a197e24648cac48c285.webp)
3，想用 AI 提高效率，但卡在安装、配置、报错和工作流搭建上，可提供Codex安装部署、疑难故障修复，API配置、代充Plus、专属Skill定制，找我：kyjl97