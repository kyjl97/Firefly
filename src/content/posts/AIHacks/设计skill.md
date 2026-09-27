---
title: 设计相关skill
published: 2026-06-09
tags:
  - design
  - ppt
  - ui
category: AIHacks
draft: true
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-ai-design-tools-20260609-193147.webp
---
AI 生成内容的能力已经很强了，但「能看」和「好看」之间隔着一整个设计师。

你有没有这种感觉：AI 写出来的页面，功能都有，排版就是差点意思——间距要么挤要么空、配色像系统默认、PPT 更是一页白底黑字从头杵到尾。不是你 prompt 写得不好，是 AI 缺了「设计感」这个维度。

下面这些开源项目，本质上都是在给 AI 补设计课。有的专攻 PPT，有的打磨 UI 细节，有的直接提供设计系统。把它们塞进你的工作流，输出质量能上一个台阶。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-ai-design-tools-20260609-193147.webp)

### 一、PPT 篇：从「裸奔」到专业级

#### Huashu Design

PPT 只是它的副业，但副业已经够强了。它支持生成产品发布动画、可交互的 App 原型、可编辑的专业级 PPT 以及印刷级信息图，一条指令就能完成演示文稿设计、交互动画制作、设计评审等任务。

https://github.com/alchaincyf/huashu-design

```
「做一份 AI 心理学的演讲 PPT，推荐 3 个风格方向让我选」
「做个 AI 番茄钟 iOS 原型，4 个核心屏幕要真能点击」
「把这段逻辑做成 60 秒动画，导出 MP4 和 GIF」
「帮我对这个设计做一个 5 维度评审」
```

#### Magic Slide

给它一段文字或 Markdown，直接吐出带平滑转场和完整视觉系统的 HTML 演示稿。适合产品介绍、项目路演、方案展示——不用再手动调 PPT，内容即幻灯片。

https://github.com/daniel-style/magic-slide

#### frontend-slides

基于 HTML 的轻量级幻灯片工具，支持 AI 辅助生成和实时预览。风格偏技术向，适合做技术分享、前端知识科普类演示，做出来的效果比 PowerPoint 灵活得多。

https://github.com/zarazhangrui/frontend-slides

#### ian-handdrawn-ppt

手绘风格 PPT 生成工具，能快速产出有手绘质感的演示文稿。适合想打破正经商务风、做轻松有趣分享的场景——教育、创意提案、个人分享都适用。

https://github.com/helloianneo/ian-handdrawn-ppt

#### guizang-ppt-skill

Claude Code 的 PPT 制作 skill，聚焦排版效率和视觉质感提升。帮你解决 PPT 制作中最耗时的两个环节：排版和美化，把精力省出来打磨内容。

https://github.com/op7418/guizang-ppt-skill

#### mindmap-ppt

基于 PPT 结构的思维导图编辑工具，可以在思维导图和演示文稿之间双向转换。先理清逻辑，一键变成幻灯片，适合结构化内容的高效输出。

https://github.com/agegr/mindmap-ppt

### 二、UI 篇：让网页看起来像是人设计的

#### Taste-Skill

专治 AI 生成页面的「默认丑」。它会告诉 AI：页面怎么排版、间距怎么留、字体怎么选、颜色怎么搭、视觉层级怎么建立。适合做官网、产品页、落地页、作品集——一句话，就是给 AI 装了一套设计审美。

https://github.com/Leonxlnx/taste-skill

#### Web Designer Plugin

相当于给 AI 配了一个网页设计总监。内置 48 个设计模式，参考了 38 个优秀网站的设计语言，覆盖排版、配色、动效、3D、页面节奏。适合不想只堆卡片、想做真正有设计感网页的人。

https://github.com/MickeyAlton33/web-designer-plugin

#### Emil Kowalski Skill

不做大改，专抠细节。交互反馈、动效曲线、按钮 hover 状态、组件过渡——这些用户说不出来但能感受到的地方，它帮 AI 一一打磨。适合把页面从「能用」推到「舒服」。

https://github.com/emilkowalski/skill

#### Awesome DESIGN.md

把知名网站和产品的设计系统整理成标准化的 `DESIGN.md` 文件。放进项目里，AI 就能按指定风格生成界面——相当于给 AI 一套可直接引用的设计规范，不用每次重复描述样式。

https://github.com/VoltAgent/awesome-design-md

#### impeccable

综合设计 skill，实际体验比 uiuxpromax 等热门同类项目更实用，覆盖的设计场景也更全面。不想一个一个试的话，这个可以作为首选。

https://impeccable.style

#### skill-site-generator

为任意 Agent Skill（SKILL.md 格式）自动生成产品落地页并部署到 GitHub Pages。如果你的 skill 需要对外展示，不用手写页面，一键生成。

https://github.com/eze-is/skill-site-generator

### 三、灵感篇：不知道什么风格好看？先逛这些

工具有了，但如果你还不确定想要什么风格，这些网站值得收藏。看到喜欢的，截图发给 AI Agent，它能帮你复刻出八九不离十的效果。

**找参考：**

| 方向 | 网站 |
|------|------|
| 网页设计 | https://curated.design |
| 着陆页 | https://onepagelove.com |
| 设计系统 | https://component.gallery |
| 动效 | https://appmotion.design |
| 应用界面 | https://mobbin.com |
| 品牌设计 | https://rebrand.gallery |
| 设计工程师工具集 | https://designengineer.tools |

**确定风格：** 在 https://getdesign.md 输入你的项目描述，它会推荐匹配的设计风格方向——帮你从「不知道长什么样」到「就是这个感觉」。

---

以上这些项目，没有一个在说「替代设计师」。它们做的事情更实际：让你在没有设计师资源的时候，也能产出不露怯的 PPT 和网页。把设计能力从专业技能降维成 AI 可执行的规则，这才是它们的真正价值。

收藏是一种美德，但用起来才是自己的。挑一两个先跑起来，效果比想象中好。

以上，既然看到这里了，如果觉得不错，随手**点个赞、在看、转发**三连吧！想第一时间收到推送，可以给我个星标⭐️～

谢谢你看我的文章，我们，下次再见。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/未命名的设计.webp)
*\>/ 作者：得救之道*
*\>/ 更多干货，请访问：[kyjl97.github.io](https://kyjl97.github.io/)*