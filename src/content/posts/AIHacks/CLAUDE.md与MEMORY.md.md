---
title: Claude与记忆
description: 一个给 AI 看，一个给 AI 记。搞混了，你的 AI 助手就废了。
published: 2026-04-30
tags:
  - Claudecode
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260430235845976.webp
---
很多人用 Claude Code 写了上百篇文章，但99%的人从来没搞清楚一个最基本的问题：

**CLAUDE.md 和 MEMORY.md 到底有什么区别？**

今天用一张表、一个比喻，彻底讲清楚。

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260430235845976.webp)

---

### 一、一张表看懂

| | 项目根目录的 `CLAUDE.md` | `~/.claude/projects/xxx/memory/MEMORY.md` |
|---|---|---|
| **放在哪** | 项目根目录（跟着代码走） | Claude Code 内部目录（跟着工具走） |
| **谁来写** | **你手写**或 `/init` 生成 | Claude Code **自动生成** |
| **给谁用** | 给 Claude **看** | 给 Claude **记** |
| **作用** | 告诉 Claude 这个项目是什么、怎么构建、有哪些规范 | 记住 Claude 在做这个项目时学到的东西 |
| **类比** | 项目的**说明书** | Claude 的**笔记本** |

---

### 二、打个比方你就懂了

想象你是一家公司的老板，Claude 是你新招的员工。

**CLAUDE.md = 《员工手册》**

你交给新员工的第一天，告诉他：

- 公司做什么的（项目是干嘛的）
- 办公室在哪（目录结构怎么分）
- 着装要求（代码规范是什么）
- 出了事找谁（构建命令、测试命令）

这是你**主动写的**，每个新员工拿到的都一样。

**memory/MEMORY.md = 《员工的笔记本》**

员工干了一段时间，自己记下来的：

- "上次改支付模块踩了个坑，金额字段是字符串不是数字"
- "老板不喜欢用 npm，这个项目统一用 bun"
- "数据库迁移要在周三之前完成"

这是 Claude **自己积累的**，每做一件事就多记一点。下次遇到类似场景，它直接翻笔记，不用你再提醒。

---

### 三、它们怎么配合工作？

实际使用中，Claude Code 启动时的加载顺序是这样的：

```
1. 加载全局 CLAUDE.md（~/.claude/CLAUDE.md）
2. 加载项目 CLAUDE.md（项目根目录/CLAUDE.md）
3. 加载项目记忆（~/.claude/projects/xxx/memory/）
```

三层叠加，Claude 既知道"这个项目是什么"（CLAUDE.md），也知道"之前做过什么"（memory），还能保持通用的行为准则（全局 CLAUDE.md）。

**打个连续的比方：**

| 阶段 | 发生了什么 | 类比 |
|------|-----------|------|
| 第一次对话 | Claude 读 CLAUDE.md 了解项目 | 新员工读员工手册 |
| 做了几个任务 | Claude 在 memory 里积累了经验 | 员工开始记工作笔记 |
| 下次对话 | Claude 先读手册，再翻笔记，直接上手 | 老员工回公司，熟门熟路 |

---

### 四、CLAUDE.md 里该写什么？

根据 Karpathy 的经验（那个 98k Star 的项目），一份好的 CLAUDE.md 应该包含：

- **项目概述** — 这个项目是干什么的
- **目录结构** — 关键目录各放什么
- **构建和测试命令** — 怎么跑、怎么测
- **代码规范** — 命名风格、注释要求等
- **踩坑记录** — 已知的坑，避免重复犯

**关键原则：不超过 200 行。** Claude Code 创始人 Boris Cherny 说过，CLAUDE.md 超过 200 行，Claude 会选择性忽略。

---

### 五、memory 目录下还有什么？

`~/.claude/projects/xxx/memory/` 不只有 MEMORY.md，通常还有这些：

| 文件 | 说明 |
|------|------|
| `MEMORY.md` | 记忆索引，列出所有记忆文件 |
| `user_preferences.md` | 用户偏好（输出目录、格式习惯等） |
| `feedback.md` | 用户的纠正和认可 |
| `project.md` | 项目背景（进度、决策、约束） |
| `reference.md` | 外部资源指引（文档链接、API 地址等） |

这些文件会在新会话时自动加载，Claude 不用你重复解释。

---
### 六、两个额外的工具

- [claude-mem](https://github.com/thedotmack/claude-mem)：一个让Claude code记忆持久化的skill
- [karpathy大神的CLAUDE.md ](https://github.com/forrestchang/andrej-karpathy-skills )： 65 行四条铁律，直接给你的cc套上紧箍咒。

### 六、一句话总结

> **CLAUDE.md 告诉 Claude "你是什么"，MEMORY.md 记住 Claude "做过什么"。**

一个是项目说明书，一个是 AI 笔记本。搞清楚这个区别，你的 Claude Code 用起来才能真正"越用越聪明"。
