---
title: 技能中央仓库
published: 2026-06-19
tags:
  - skill
  - workflow
  - Claude
  - Codex
  - Gemini
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-agent-skills-central-20260619-204833.webp
---
你装了多少个 Agent？我数了一下自己电脑上——Claude Code、Codex、Qwen、Gemini CLI、Reasonix、WorkBuddy，6 个。每个都有自己的 skills 目录，每个都要单独装 skill。

一开始我觉得没什么，装就装呗。直到有一天我在 Claude Code 里装了一个超级好用的 skill，切到 Gemini 想用的时候发现——没有。又切回 Claude 看一眼目录结构，再手动给 Gemini 拷一份。然后隔天更新了 skill，又要同步一遍。

烦了。真的烦了。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-agent-skills-central-20260619-204833.webp)
*6 个 Agent，6 套 skills 目录，一个中央仓库全打通。*

### 发现问题：6 个 Agent，6 套 skills

我的 Agent 们各自的 skill 目录长这样：

```
C:\Users\Administrator\.claude\skills\
C:\Users\Administrator\.codex\skills\
C:\Users\Administrator\.qwen\skills\
C:\Users\Administrator\.gemini\skills\
C:\Users\Administrator\.reasonix\skills\
C:\Users\Administrator\.workbuddy\skills\
```

每个目录都是独立的。装一个 skill 要重复 6 次操作，更新一次也要重复 6 次。更坑的是有时候我忘了哪个装了哪个没装，还得挨个 ls 看一眼。

这哪是玩 AI，这是在做数据搬运工。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/illus1-comparison-gemini.webp)
*左侧：各自独立的 6 套 skills。右侧：一个中央仓库全部打通。*

### 尝试方案：软链接 + 中央仓库

我突然想到一个东西——**符号链接（Symlink）**。Windows 上有 junction（目录联接），可以让多个路径指向同一个物理位置。

思路很简单：

1. 建一个中央仓库：`C:\Users\Administrator\.agents\skills\`
2. 把所有 Agent 的 skills 目录通过 junction 链接到这个中央仓库
3. 以后只管中央仓库，所有 Agent 自动同步

我把这个想法丢给了 Reasonix。它帮我干了这些事：

**对于不存在的目录**（`.claude/skills`、`.qwen/skills`），直接创建，每个 skill 都建一个 junction 指向中央仓库。

**对于已有内容的目录**（`.codex/skills`、`.gemini/skills` 等），逐个对比中央仓库，缺什么补什么链接。各自独有的 skill 保留不动——比如 `.codex` 里独有的 `playwright`、`impeccable` 等，`.workbuddy` 里的 `ian-xiaohei-illustrations`，都不会动。

最终每个目录都指向同一个中央仓库，共 37 个 skill 全部打通。

> 📌 **Junction 到底能不能"实时同步"？**
>
> 我最初说「通过 junction 同步」后，有人问了一个好问题：junction 不就已经是实时同步了吗？删一个目录其他也会同步删才对？
>
> 答案是——**"实时同步"在文件内容层面成立，但在新建和删除整个 skill 时并不成立。**
>
> Junction（目录联接）让多个路径指向**同一份底层数据**。所以你在 Reasonix 里编辑 `ljg-writes/SKILL.md`，实际上改的就是中央仓库里的那份文件；切到 Work Buddy 打开同一个 skill，内容已经是修改后的。**不存在"复制"和"同步延迟"——因为它们就是同一个文件的不同入口。**
>
> 但 junction 的实时性只限于入口**内部**的文件。对入口**本身**的操作不会双向传播：
>
> | 操作 | 结果 |
> |---|---|
> | 在中央仓库**删除** `ljg-writes/` | 其他目录的 junction 变成**断链**——入口还在，但指向的数据已不存在 |
> | 在 Reasonix 里**删除** `ljg-writes/` | 只删了 junction 链接本身，中央仓库的真实数据毫发无损 |
> | 在中央仓库**新建**一个技能文件夹 | 其他目录不会自动出现对应的 junction，需要运行同步脚本 |
> | 在 Reasonix 里**新建**一个技能文件夹 | 那是一个普通文件夹，不是 junction，跟中央仓库毫无关系 |
>
> 所以这个方案的完整工作流是：**日常编辑**（改文件、加文件、删文件）在哪个入口都行，junction 自动兜底；而**新增和删除整个技能**，始终在中央仓库操作，然后跑一遍同步脚本补链路。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/illus2-manual-copy-gemini.webp)
*手动同步 6 次？那画面太美我不敢看。*

### 发现新痛点：装个新 skill 还是麻烦

软链接搞定了旧 skill 的同步，但**新 skill 怎么办**？

比如我在网上看到一个开源 skill，想装到中央仓库里。流程是这样的：

1. 去 GitHub 上 clone 下来
2. 复制到 `C:\Users\Administrator\.agents\skills\` 下
3. 手动运行同步脚本 `sync-skills.ps1`
4. 等着它补齐 6 个目录的链接

虽然比手动复制 6 次强，但三步操作还是烦。而且人嘛，一旦懒下来，就不想再勤快回去。

我盯着那个同步脚本想了半天——**能不能让这一切自动化？**

### 最终方案：把这个工作流封装成 skill

我跟 Reasonix 说：能不能把我刚才说的这一整套装 skill 的流程，直接做成一个 skill？以后我只需要丢一个 GitHub 地址给你，你帮我搞定全部。

它真干了。最终产物是一个叫 **`install-to-central`** 的技能。

用法超级简单，在任何一个 Agent 里输入：

```
/install-to-central https://github.com/xxx/xxx
```

或者子目录模式（一个仓库里有多个 skill）：

```
/install-to-central https://github.com/xxx/xxx/subdir/skill-name
```

它会自动做这 7 件事：

1. **解析 URL** — 判断是整个仓库还是一个子目录，自动提取 skill 名
2. **克隆** — `git clone --depth 1` 到临时目录
3. **定位** — 仓库模式用根目录，子目录模式定位到子路径
4. **安装** — 复制到中央仓库
5. **同步** — 自动运行同步脚本，补齐所有 Agent 的链接
6. **清理** — 删除临时文件
7. **报告** — 告诉你装了什么、同步到了哪些 Agent

也就是说，以后我想装任何一个 skill，只说一句话就够了：

> 「帮我装一下这个技能：https://github.com/xxx/xxx」

回车，等几秒钟，6 个 Agent 全都能用了。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/illus3-one-command-gemini.webp)
*一行命令，6 个 Agent 全亮。*

### 最终效果

中央仓库现在长这样：

```
C:\Users\Administrator\.agents\
├── skills\                    ← 唯一需要操作的地方（38 个 skill）
│   ├── Title\
│   ├── agent-reach\
│   ├── gsap\
│   ├── install-to-central\    ← 就是这个技能本身
│   └── ...
├── sync-skills.ps1            ← 自动同步脚本
└── sync-skills.bat            ← 双击运行
```

每个 Agent 的目录结构通过 junction 指向同一份文件，不存在「这个有那个没有」的问题。

### 一点感想

这件事让我意识到一个道理：**工具越多，管理工具的工具越重要。**

6 个 Agent 各有各的强项，本来是好事。但如果管理它们的时间成本超过了使用它们的收益，那就本末倒置了。

这次折腾下来，最大的收获不是「有了一个自动安装脚本」，而是**让 Agent 帮我管理 Agent**——把重复劳动抽象成一个技能，然后让技能自己去执行。

这大概就是所谓的「元技能」吧。一个用来管理其他技能的技能。

---

**相关文件：** 同步脚本 `sync-skills.ps1` 和 `install-to-central` 技能都可以直接在你的 Agent 里使用。需要完整方案的，评论区告诉我，我把中央仓库的初始化流程也发出来。


---
以上，既然看到这里了，如果觉得不错，随手**点个赞、在看、转发**三连吧！想第一时间收到推送，可以给我个星标⭐️～

谢谢你看我的文章，我们，下次再见。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/未命名的设计.webp)
*\>/ 作者：得救之道*
*\>/ 更多干货，请访问：[kyjl97.github.io](https://kyjl97.github.io/)*