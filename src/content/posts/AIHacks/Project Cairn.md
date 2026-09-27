---
title: Project Cairn经验账本
published: 2026-08-13
tags:
  - AI
  - Agent
  - Skill
  - Obsidian
  - 飞书
  - Notion
  - 工作流
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260812235726085.webp
---
我一开始看到 Project Cairn 的时候，以为它就是一个“全局复利与踩坑日志记录本”。

后来实际看完它的说明和配置方式，发现这个理解只对了一半。

Project Cairn 不是一个单独的全局日志本，而是给每个项目装一个项目级经验账本。它先把经验沉淀在当前项目里，等某些经验被验证、能复用、适合长期保存时，再把它们“毕业”到 Obsidian、飞书 Wiki 或 Notion。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/把项目工作沉淀为可复用的知识!.webp)
这件事对经常用 AI Agent 做项目的人很重要。因为很多经验不是没有产生，而是做完就散了。

今天装好了一个工具，明天又忘了当时怎么排错。今天搭通了一个 Agent 工作流，下次换项目又从头试。AI 帮我们加快了执行速度，但如果经验不沉淀，效率提升就很难复利。


**开源地址**：iBlinkQ/project-cairn

### 01. 让经验真正复利

普通日志解决的是“我做过什么”。

Project Cairn 更关心的是“这个项目产生了什么可复用经验”。

它会把一个项目里的进展、决策、踩坑、方法论放进固定结构里。不是随手写一堆散乱笔记，而是让 Agent 在项目过程中持续维护一套经验账本。

默认结构大概是这样：

```text
某个项目/
  AGENTS.md
  CLAUDE.md
  .cairn/
    config.yaml
  cairn/
    LOG.md
    ROADMAP.md
    某个主题.md
```

这里面最核心的是三类文件。

第一，`AGENTS.md` 是规则。它告诉后续参与这个项目的 Agent：这个项目如何记录经验，什么时候更新日志，什么内容值得沉淀。

第二，`.cairn/config.yaml` 是配置。比如项目名、经验目录、语言、是否提交到 Git、是否连接长期知识库。

第三，`cairn/` 是项目自己的经验账本。`LOG.md` 记录阶段性进展，主题笔记记录稳定结论、决策和踩坑经验。

所以它不是一个自动同步工具，而是一套项目经验管理规范。

### 02. 先把技能装好

我这里是通过中央技能仓库安装的。

在 Codex 里可以直接说：

```text
https://github.com/iBlinkQ/project-cairn/tree/main 帮我安装这个技能
```

如果已经有自己的技能安装skill，也可以按仓库地址安装：

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260812235726085.webp)


安装完成后，就可以在项目里调用：

```text
/project-cairn 初始化这个项目
```


它会询问几个关键配置：

```text
1. 项目名和一句话说明
2. 经验目录是否提交到 Git
3. 文档语言
4. 是否连接 Obsidian、飞书 Wiki 或 Notion
5. 是否迁移历史经验
```

这里最需要注意的是 Git 策略。

如果是公开项目或客户项目，不要默认把所有经验都提交到仓库。更安全的做法是先选择忽略 `cairn/`，等确认里面没有敏感信息，再决定哪些内容可以公开。

### 03. 项目开始就初始化

我一开始也容易想成：项目做完后，调用一下这个技能，把经验总结出来。

这样当然也能用，但不是它最理想的用法。

更合理的流程是：

```text
1. 创建项目文件夹
2. 进入这个项目
3. 调用 /project-cairn 初始化
4. 生成 AGENTS.md、.cairn/config.yaml、cairn/LOG.md 等文件
5. 后续每完成一个阶段，让 Agent 按规则更新 cairn/ 里的记录
6. 项目结束或阶段结束时，审计哪些经验值得长期沉淀
```

这就像给项目装了一个经验账本。

不是等项目结束再回忆，而是边做边留下轨迹。等你以后复盘时，不需要翻聊天记录、终端输出和一堆散乱文件，直接看 `cairn/` 就能知道这个项目怎么推进、踩过什么坑、最后沉淀了什么方法。

### 04. 经验要先毕业

Project Cairn 里面有一个很重要的概念，叫 graduation。

我把它理解成“经验毕业”。

不是所有项目记录都应该进入长期知识库。很多内容只是当前项目的过程信息，比如临时判断、客户上下文、一次性的实现细节。这些东西留在项目自己的 `cairn/` 里就可以。

真正值得毕业的经验，至少要满足几个条件：

```text
1. 已经在项目里验证过
2. 离开当前项目也能复用
3. 不依赖太多本地实现细节
4. 不包含敏感信息
5. 能追溯来源
```

比如：

```text
某个 Windows 环境变量导致 lark-cli 误判配置失效
某类 Agent 项目应该先初始化经验账本，再做任务
客户项目里的 cairn/ 默认不应该提交到公开仓库
```

这些就适合毕业。

而像某个客户的具体需求、某次临时调试的中间文件、某个还没确认的猜测，就不适合直接进入长期知识库。

### 05. 连接长期知识库

Project Cairn 原生支持三类长期目标。

第一种是 Obsidian。

这最适合本地 Markdown 知识库。它会把毕业后的经验写成一篇 Obsidian 笔记，并可以追加到 `INDEX.md`。

如果你的 Obsidian vault 是：

```text
D:\project2026\fuwari
```

那可以把长期经验库放在：

```text
D:\project2026\fuwari\src\content\Xenia\project-cairn
```

在配置里应该写 vault 内相对路径：

```yaml
graduation:
  provider: obsidian
  target: "src/content/Xenia/project-cairn"
  index: "src/content/Xenia/project-cairn/INDEX.md"
  link_format: wikilink
```

第二种是飞书 Wiki。

这适合团队知识库或客户交付文档。它需要本机 `lark-cli` 已经登录，并且有 Wiki 相关权限。毕业时会在飞书知识库里创建子文档，并读回验证。

第三种是 Notion。

这适合用 Notion database 管长期经验。每条毕业经验会成为 database 里的一条 page。Notion 需要 internal integration、`NOTION_API_TOKEN`，并且 database 要分享给 integration。

这里要注意一个词：它不是全量同步，而是毕业。

你不是把整个 `cairn/` 目录一股脑同步到 Obsidian、飞书或 Notion，而是挑出真正成熟的经验，经你确认后，再写入长期知识库。

### 06. 我的三层用法

我的计划是分成三层。

第一层，单个项目内的 `cairn/`。

这里记录这个项目自己的过程、决策、踩坑和主题笔记。它是项目内部账本，不一定公开，也不一定长期复用。

第二层，`全局复利与踩坑日志.md`。

这里继续保留，作为跨项目的简短流水账。它适合快速记录：今天踩了什么坑、怎么解决、以后要注意什么。

第三层，`Xenia/project-cairn`。

这里放已经整理成体系的长期经验资产，比如 SOP、排错方法、Agent 工作流原则、客户项目交付模式。

也就是说：

```text
客户项目A/cairn/
客户项目B/cairn/
工具排错项目/cairn/

成熟经验毕业到：

D:\project2026\fuwari\src\content\Xenia\project-cairn
```

这个结构的好处是，过程和资产分开。

项目过程可以粗糙一点、真实一点、保留上下文。长期资产必须更干净、更抽象、更可复用。

### 07. 和普通笔记不同

普通笔记靠人记。

Project Cairn 靠项目规则驱动 Agent 记。

它不是让你多写一份文档，而是让 AI Agent 在做事的时候，把有价值的过程留下来。后面换一个 Agent、换一个模型、换一个项目，也能读到同一套项目经验。

这对 AI 工作流很关键。

因为 Agent 做项目时，真正损耗最大的地方，往往不是代码本身，而是上下文丢失。

为什么当时这么决策？
这个坑是不是已经踩过？
这个配置为什么不能改？
这次成功的经验能不能复制到下一个项目？

如果这些问题都散在聊天记录里，它们很快就会失效。

Project Cairn 的价值，就是把这些上下文变成项目资产。

### 08. 先跑最小版本

如果你也想试，不建议一开始就搞复杂。

最小版本可以这样做：

```text
1. 新项目开始时，先用 /project-cairn 初始化
2. git_policy 先选 ignore，避免误提交敏感经验
3. language 选 zh
4. graduation provider 先选 none，暂时不连接长期知识库
5. 项目做完一个阶段后，让 Agent 更新 cairn/LOG.md
6. 项目结束后，再审计哪些经验适合毕业到 Obsidian
```

等你确认这套方式真的适合自己，再连接 Obsidian、飞书或 Notion。

工具系统不是一开始就设计到完美，而是在真实项目里长出来。

Project Cairn 对我的意义也在这里。

它不是又多了一个笔记工具，而是给 AI 项目补上了一个过去经常缺失的环节：经验沉淀。

只有经验能被记录、被筛选、被迁移到长期知识库，AI Agent 的效率才不会停留在一次性加速，而会慢慢变成自己的复利资产。

**以上，既然看到这里了，如果对你有所帮助，还望不吝点赞与关注，这也是对我最大的鼓励与支持。**

感谢你拨冗阅读，山高水长，我们期待下篇文章与你再见。

*\>/ 更多Agent、Obsidian与自动化工作流实操,访问博客：[kyjl97.github.io](https://kyjl97.github.io/)*
