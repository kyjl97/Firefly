---
title: Canvasight画布插件
published: 2026-07-13
tags:
  - Codex插件
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260713175944329.webp
---
在GitHub上发现了一个挺有意思的 Codex 插件，分享给大家。这名字叫Canvasight

它不是传统意义上的思维导图插件，而是给 Codex 加了一块“可执行画布”：先把复杂任务拆成节点，再从任意节点继续让 Codex 往下做。

项目地址：Niall-Young/Canvasight

![1301](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260713175944329.webp)



安装时，可以直接把下面这句发给 Codex：

```text
github.com/Niall-Young/Canvasight 安装下
```

装好之后，就可以让它把本地资料转换成画布。我用自己的自我介绍文档做了一次测试：

```text
D:\project2026\fuwari\src\content\posts\Technical\00自我介绍.md 使用 Canvasight 帮我做一个画布
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260713172035515.webp)


这也是它和普通思维导图最大的区别。

普通思维导图解决的是“我怎么把想法分层整理出来”，Canvasight 更进一步，解决的是“我怎么把整理出来的结构继续推进成结果”。

比如一篇长文章，可以拆成定位、受众、证据、服务、风险和下一步；一个代码项目，可以拆成模块、依赖、待改文件和验证方式；一个商业服务，也可以拆成用户痛点、交付流程、报价、入口和转化路径。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260713180950142.webp)

它比较有价值的地方在于，节点不是几个孤立关键词，而是可以承载完整上下文、提示词、附件和执行范围。你点某个节点运行，Codex 就能围绕这个节点继续写文案、改文件、查代码或生成计划。

换句话说，它把“整理结构”和“继续执行”接在了一起，不需要每次都从一大段聊天记录里重新找背景。

所以 Canvasight 更适合三类场景：第一，长资料结构化，比如自我介绍、课程大纲、产品文档；第二，复杂任务拆解，比如网站改版、代码库分析、工作流部署；第三，多轮协作推进，比如先画出全局，再逐个节点执行。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260713182127329.webp)


它不替代聊天，也不只是画图。它真正解决的是：先把事情想清楚，再把每个分支继续做下去。

**延伸阅读：**

如果你对这种“把复杂任务拆成可执行技能”的方式感兴趣，也可以看看 dbskill 这一类技能合集：

**dontbesilent2025/dbskill**

**以上，既然看到这里了，如果对你有所帮助，还望不吝点赞与关注，这也是对我最大的鼓励与支持。**

感谢你拨冗阅读，山高水长，我们期待下篇文章与你再见。

*\>/ 更多Agent实战干货
迎访问我的博客：[kyjl97.github.io](https://kyjl97.github.io/)*
