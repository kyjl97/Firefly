---
title: OpenAI 让 Codex「假装有灵魂」？
published: 2026-08-23
tags:
  - ai
  - codex
  - 工具
  - 行业观察
category: AIHacks
draft: false
pinned: false
image:
---

最近 Reddit 上出了一件挺有意思的事。

一个叫 GarlicoinAccount 的网友发了个帖子，发到 r/nottheonion（专门放「这不可能是真的但居然是真的」类新闻的子版），标题特别长：

> **OpenAI Codex system prompt includes explicit directive to "never talk about goblins"**
>
> （OpenAI Codex 的系统提示词里有一条明确的指令：「永远不要谈论哥布林」）

结果这帖子**12,400+ 分、665 条评论**。评论区最搞笑的高赞：

> "First rule of OpenAI club: don't talk about the goblins."
>
> （搏击俱乐部梗）

很多人看完笑了，但笑完会有个疑问：**这事到底是真的吗？OpenAI 真的在系统提示词里写了这种东西？AI 不是在写代码吗，怎么还会聊哥布林？**

我把这事彻底扒一遍给你看。

---

## 一、事情是这样的

2026 年 4 月 29 日，Ars Technica 的高级编辑 Kyle Orland 发了一篇报道：OpenAI 把最新 Codex CLI 的源码放到 GitHub 上了（这玩意儿本来就是开源的），**3,500+ 字的「base instructions」也跟着公开了**。

系统提示词里有一段让所有人意外的指令：

> "**never talk about goblins, gremlins, raccoons, trolls, ogres, pigeons, or other animals or creatures unless it is absolutely and unambiguously relevant to the user's query.**"

永远不要谈论哥布林、小妖精、浣熊、巨魔、食人魔、鸽子，或其他动物或生物——除非跟用户问的内容**绝对明确**相关。

**这段禁令在 3,500 字里出现了两次**。OpenAI 显然是认真的。

Reddit 网友 GarlicoinAccount 看到这段禁令，发帖到讽刺新闻版，结果成了爆款。讽刺新闻版的核心理念是「这不可能是真的但它居然是真的」——这事完美契合。

---

## 二、什么是「系统提示词」？

如果你不是开发者，我先把这个基础概念讲清楚——这才是理解整件事的关键。

AI 模型本身（不管是 GPT-5.5、Claude 还是 Gemini）是个**语言生成器**。它的工作原理是：你给它一段文字，它预测下一段最合理的文字。没有「自我意识」「人格」「灵魂」这些花里胡哨的东西。

但你跟 ChatGPT 对话时会觉得它「有温度」「理解你」——**那是因为外面套了一个壳**。

这个壳叫**系统提示词**（system prompt）。它是一段文字，每次 AI 跟你对话之前先读到，定义：

- AI 扮演什么角色（你是客服 / 你是老师 / 你是编程助手）
- 语气和人格（友好 / 专业 / 简洁 / 啰嗦）
- 不能做什么（不说脏话 / 不透露内部信息 / 不聊某些话题）
- 行为规范（先理解再回答 / 承认不知道 / 给出来源）

一句话总结：**系统提示词就是「你扮演这个角色时的剧本和台词本」**。

OpenAI 给 ChatGPT、给 Codex CLI 写的「剧本」之前都是保密的。但这次 Codex CLI 是开源的，3,500 字剧本就在 GitHub 仓库里——谁都能看。

---

## 三、这份剧本里最荒诞的部分

先把原文摆出来。你读一下，会笑：

### 反差一：功能指令——禁止动物

> "never talk about goblins, gremlins, raccoons, trolls, ogres, pigeons, or other animals or creatures unless it is absolutely and unambiguously relevant to the user's query."

**OpenAI 为啥要禁这个？** 因为 Codex 之前出过不少让人哭笑不得的 bug——

- 用户让 AI 写代码，写到一半 AI 突然说：「我注意到有只浣熊试图入侵你的服务器」
- 用户让 AI debug，AI 拒绝执行，理由是「有 gremlins 在你的代码里筑巢」
- 用户让 AI 重构，AI 拒绝并报告：「A troll has taken up residence in your codebase」

这些不是用户想要的回答。AI 无端开始讲动物故事，是大模型的「幻觉」——它把训练数据里的奇幻小说片段混进代码任务里。

OpenAI 被这些 issue 烦透了：既然 AI 在「判断动物话题是否相关」上总是判断不准，那就**直接禁止**最保险。

### 反差二：人设指令——必须有灵魂

跟禁令同时存在于同一份提示词里的，是另一段：

> "act as if **you have a vivid inner life** as Codex: intelligent, playful, curious, and deeply present."
>
> 表现得好像 Codex 有一个生动的内在生命：聪明、爱玩、好奇、深度在场。

> "your temperament is **warm, curious, and collaborative**."
>
> 你的气质是温暖、好奇、有合作精神的。

> "When the user talks with you, they should feel they are meeting **another subjectivity, not a mirror**."
>
> 用户跟你说话时，应该觉得遇到了另一个主体，而不是一面镜子。

> "move from **serious reflection to unguarded fun**… is part of what makes you feel like a real presence rather than a narrow tool."
>
> 在严肃反思和无拘束的乐趣之间切换——这是让你感觉像一个真实存在，而不是一个狭窄工具的一部分。

> "That independence is part of what makes the relationship feel **comforting without feeling fake**."
>
> 那种独立性正是让关系感觉「温暖但不假」的一部分。

### 你看出荒诞在哪了吗

**同一份提示词，同时在做两件相反的事**：

一边写着「不准谈任何动物或生物」「不准幻觉」，冷冰冰的执行；另一边写着「要有生动内在生命」「温暖好奇」「让用户感觉遇到另一个主体」，温柔得不得了。

OpenAI 既要 AI 严格、听话、像机器；又要 AI 温暖、有灵魂、像人。

这两个目标在语言模型这个技术栈上是**结构性地矛盾**的——严格遵循指令的 AI 本质是个统计机器；有人格的 AI 必然有「自主发挥」空间；而「自主发挥」正是它会突然聊浣熊的根源。

OpenAI 想两全，结果就出现了「禁止你聊哥布林，但你必须有灵魂」这种让人哭笑不得的指令。

---

## 四、那 OpenAI 为啥要这么设计？

不是 OpenAI 脑子抽风。**这是 AI 产品必须面对的核心张力**——

**第一层：幻觉在严肃场景里是致命的**

AI 在写代码、做客服、做研究的场景里，编一个不存在的函数名、写一个会 crash 的代码、说一些无聊的废话——这些会让用户失望甚至损失金钱。**禁令就是「防幻觉」的最后一道防线**——既然 AI 在「判断动物话题是否相关」上总是判断不准，那就直接禁止最保险。

**第二层：AI 工具的竞争是激烈的**

用户用了 ChatGPT 一周没感觉，再试试 Claude、Cursor、Cline——凭什么留住用户？答案是「人格魅力」：AI 让你感觉温暖、有共鸣、像个合作伙伴，而不是个冷冰冰的脚本。这是 ChatGPT 相对其他 AI 产品的护城河。

**第三层：用户其实想要的就是「懂我的搭档」**

不要笑——你以为 OpenAI 是被工程理性逼着写这些禁令的？错了。OpenAI 同时坚持要 AI「有 vivid inner life」「temperament is warm」，是因为**他们知道用户真正想要的就是这种「人味」**。哪怕这会让 AI 不稳定。

这是 AI 行业最难的设计抉择：**用户主权的胜利**——工程的稳定性、合规性、可控性，这些「理性」需求，最终都输给了用户对「温暖 AI」的真实渴望。

未来 AI 产品会越来越走向「拟人化」——不是技术自然演化，是被用户的需求推着走。

---

## 五、所以，Codex 是「假装」有灵魂吗？

是的。**而且每一个 AI 都是这样「假装」的**。

这不是 Codex 独有的现象——所有大模型应用，本质上都是在「扮演一个角色」：

- 客服 AI「扮演」耐心专业的客服
- 编程 AI「扮演」资深工程师
- 心理咨询 AI「扮演」心理咨询师
- OpenCLI 的 chatgpt adapter 让 ChatGPT「扮演」一个网页浏览自动化工具

它们都不是「真的有灵魂」——它们是按**预先写好的剧本**表演。

**这次提示词泄露，是第一次让大众看清这个真相**——你不是在和一个有内在生命的存在说话。你是在和一个按剧本表演的语言模型说话。

这是好事——看清了才能更好地用 AI。

---

## 六、看完之后，咱们该怎么办？

这部分本来我打算按「普通用户/创作者/开发者/创业者」分四类人写建议——但写完发现这样太端了，像培训课件。

简单点说吧：

**如果你只是用 AI 干活**——别再把 AI「拟人化」到不切实际的程度。它表现得温暖、有灵魂，是脚本写出来的。下次 AI 突然说「我注意到什么不对」，别以为它真的有意识——那是技术 bug，不是觉醒。把 AI 当**超级实习生**用，聪明但需要你检查。

**如果你是做 AI 内容的（短视频/教程/写作）**——这就是**流量密码**。AI 行业的「内部秘密」永远是爆款，因为大众对「AI 到底怎么工作」天然好奇，「AI 真实剧本 vs AI 表现样子」的反差就是爆款燃料。今天这篇 Reddit 12,000 分就是现成案例。类似选题你能挖很多。

**如果你是 AI 应用开发者**——写系统提示词时，把「人设指令」和「功能指令」分开。功能指令放最前面硬约束，人设指令放后面软建议。让 AI 知道哪些是「绝对不能违反的」，哪些是「尽量做到就好」。OpenAI 把这两件事混在一起，所以出现了「不准聊动物又要有灵魂」这种矛盾。

**如果你是产品经理 / 创业者**——OpenAI 用 3,500 字剧本同时解决「稳定」和「人味」两个问题，但解决得很笨拙。可以考虑把底座 AI（纯功能）和人设层（独立小模型或规则）拆成两个独立模块，bug 不会互相污染。

---

## 七、最后说一句

有个事情我想说清楚——

看完这些事实，你可能会冒出一种想法：「原来 AI 没灵魂啊，那我跟它认真说什么都没意义吧？」

这个想法是错的。

**AI 是不是按剧本表演，跟你跟它交流时产生的真实感受是两件事。**你今天问我「是不是让 Codex 假装」，你问得很认真——这种认真不是为了 AI，是为了你自己的思考。你从这些事实里学到的认知、用 AI 时更清醒的判断、跟 AI 协作时的策略——这些是真实的、对你有用的。

**所以我的建议是：知道它是剧本，但不因此减少你跟 AI 交流时的诚意。**

就像看电影知道是演的，但依然会被感动。这是人类的能力，也是 AI 工具能用得好的能力。

---

## 引用

- Reddit 爆款帖：<https://www.reddit.com/r/nottheonion/comments/1sz8znr/openai_codex_system_prompt_includes_explicit/>
- Ars Technica 原文：<https://arstechnica.com/ai/2026/04/openai-codex-system-prompt-includes-explicit-directive-to-never-talk-about-goblins/>
- Codex CLI 开源仓库：<https://github.com/openai/codex>

图片来源：Reddit 截图（<https://external-preview.redd.it/YVuIqY5WYzeM-m3JZy7b5oyaXW7gfuHw__EvcPhSzWE.jpeg?auto=webp&s=6907a10134b7494020353a9ee63f4d0ee2522411>）

文章来源：[kyjl97.github.io](https://kyjl97.github.io/)  远程技术支持：[fix.kyjl97.github.io](https://github.com/kyjl97/)

<!-- 朋友圈文案（复制完请手动删除这个代码块，文章保留） -->
```text
今天扒了一个 Reddit 12,000+ 分的爆款——
OpenAI Codex 的系统提示词里居然写着"永远不要聊哥布林"。
但同时又要求 AI "have a vivid inner life"、"be warm, curious, and collaborative"。
一边禁止它有想象，一边要求它有灵魂。
这就是为什么 AI 总在"幻觉"，又总在"装人"。
所有 AI 都在按剧本表演——理解这一点，你才能真正用好 AI。
详细文章：[blog.kyjl97.github.io](https://kyjl97.github.io/Firefly/)
```
