---
title: Karpathy指令
published: 2026-04-30
tags: []
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260430170738814.webp
---

Andrej Karpathy，OpenAI 创始成员、前 Tesla AI 总监，在 GitHub 扔出一份 `CLAUDE.md`。

结果一周狂揽 44k star，总星直接飙到 **98k star**。

> 这是什么概念？Stack Overflow 都没这么火过。

项目地址：[github.com/forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260430170738814.webp)


### 一、AI 编程助手为什么不听话？

Karpathy 发现了一个扎心的真相：

> AI 不是不会干活，是**太爱发挥了**。

你一定遇到过这些场景：

- 你让 AI 写个排序，它给你整一套策略模式 + 工厂模式 + 观察者模式
- 你让 AI 改个 bug，它顺手"优化"了三个文件
- 你让 AI 加个验证，它直接搭了一套框架

这不是助手，是**灾难**。

Karpathy 原话说得更狠：

> "模型替你做了错误假设，然后一条道跑到黑。它们不管理自己的困惑，不追问，不暴露矛盾，不呈现权衡，该推回来的时候也不推。"

> "它们特别喜欢过度复杂化代码和 API，膨胀抽象层，不清理死代码……100 行能搞定的事，非得搞出 1000 行的臃肿建筑。"

> "它们还会顺手改掉那些自己都没完全理解的注释和代码，即使那些跟当前任务完全无关。"

---

### 二、解决方案：65 行的四条铁律

Karpathy 的方案极其简单 —— 一个 `CLAUDE.md` 文件，**总共才 65 行**，四条原则，直接给 AI 套上紧箍咒。

| 原则 | 一句话 | 解决什么问题 |
|------|--------|-------------|
| **Think Before Coding** | 先想后写 | 错误假设、隐藏困惑、遗漏权衡 |
| **Simplicity First** | 极简主义 | 过度设计、膨胀抽象 |
| **Surgical Changes** | 精准手术 | 误改无关代码、顺手重构 |
| **Goal-Driven Execution** | 目标驱动 | 缺乏验证、含糊指令 |

下面逐条拆解：

#### 原则一：Think Before Coding（先想后写）

**核心：不确定就问，别替我做决定。**

LLM 最大的毛病就是 —— 遇到歧义，它不问你，自己挑一个方向就闷头干。等你发现错了，已经浪费了一轮对话。

这条原则要求 AI：

- **假设必须显式说出来** — 你觉得是 A 还是 B？说出来，让我决定
- **有歧义就列举选项** — 别自己挑，把几个可能性摆出来
- **有更好的方案就推回来** — 我说往东，你发现往西更好，要说
- **卡住了就停** — 不懂就说不懂，别硬编

#### 原则二：Simplicity First（极简主义）

**核心：能 50 行解决的，禁止写 200 行。**

AI 特别爱搞"防御性编程"和"过度抽象" —— 你只要一个功能，它给你搭一个可扩展框架。

这条原则的铁律：

- 没要求的功能，一个都不加
- 只用一次的代码，不许抽象
- 不要的"灵活性"和"可配置性"，没人要就别搞
- 不可能发生的场景，不写错误处理
- 如果 200 行能缩到 50 行，重写

> 自测标准：一个资深工程师看到这段代码会说"搞复杂了"吗？如果是，简化。

#### 原则三：Surgical Changes（精准手术）

**核心：只改该改的，旁边的一根毛都不动。**

这是 AI 最让人生气的行为 —— 你说改 A，它把 B、C 也"顺手优化"了。结果 diff 一堆无关改动，review 的人崩溃。

铁律：

- 不许"改进"相邻代码、注释、格式
- 不许重构没坏的东西
- 代码风格跟着项目走，哪怕你觉得可以更好
- 发现不相关的死代码？**提一嘴就行，别删**
- 你的改动导致某些东西没人用了？**你自己清理干净**

> 自测标准：diff 里的每一行，能不能直接追溯到用户的需求？追溯不到就不该出现。

#### 原则四：Goal-Driven Execution（目标驱动）

**核心：别告诉 AI 怎么做，告诉它"什么算做完"。**

这是 Karpathy 指南里最有洞察力的一条。

Karpathy 原话：

> "LLMs are exceptionally good at looping until they meet specific goals... Don't tell it what to do, give it success criteria and watch it go."

翻译：LLM 非常擅长循环迭代直到达标……别告诉它步骤，给它验收标准，让它自己跑。

转换思路：

| 别这么说 | 要这么说 |
|----------|---------|
| "加个验证" | "写测试覆盖非法输入，然后让测试通过" |
| "修这个 bug" | "写一个能复现的测试，然后让它通过" |
| "重构 X" | "确保重构前后测试都能通过" |

多步任务时，要求 AI 给出计划 + 检查点：

```
1. [步骤] → 验证：[检查什么]
2. [步骤] → 验证：[检查什么]
3. [步骤] → 验证：[检查什么]
```

> 成功标准越强，AI 越能自主循环。标准越弱（比如"让它能用"），就越需要你不断追问。

---

### 三、怎么用？

这个文件有**两种安装方式**：

#### 方式一：全局安装（推荐）

放到 `~/.claude/CLAUDE.md`，所有项目自动生效。

```bash
# 下载到全局目录
curl -o ~/.claude/CLAUDE.md \
  https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md
```

如果你项目里已经有 CLAUDE.md（比如项目技术栈、目录结构说明），**两个文件会叠加生效**，不会覆盖：

| 文件位置 | 作用范围 |
|----------|---------|
| `~/.claude/CLAUDE.md` | 全局，所有项目 |
| `项目/CLAUDE.md` | 仅当前项目 |

各管各的，互不干扰。

#### 方式二：作为 Claude Code Plugin 安装

```bash
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills
```

---

### 四、效果验证

怎么知道它起作用了？看这四点：

- **diff 变干净了** — 只有你要求的改动，没有"顺手优化"
- **不再返工** — 代码第一次就简单，不用推翻重来
- **先问后做** — 有歧义时 AI 会先确认，而不是闷头干完才发现错
- **PR 更清爽** — 没有 drive-by refactoring，没有无关改动

---

### 五、为什么这个文件能火？

说到底，它厉害在三个地方：

**1. 问题找得准**

不是泛泛地教 AI"写好代码"，而是精确命中 AI 编程的三大痛点：乱假设、过度设计、误改代码。每一条都有具体的症状对应。

**2. 方案极其简单**

65 行，四条原则，一个文件。没有框架，没有依赖，没有配置。任何人 30 秒就能用上。

**3. 最有洞察力的那条 —— 目标驱动**

第四条原则抓住了一个本质：别教 AI 怎么做，给它验收标准让它自己跑。这个思路一旦建立，不只编程，任何 AI 协作场景都能用。

---

> Karpathy 的核心洞察就一句话：
>
> **别告诉 AI 怎么做，告诉它什么算做完，然后放手让它跑。**
