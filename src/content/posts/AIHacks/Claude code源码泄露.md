---
title: Claude code源码泄露
published: 2026-04-01
tags:
  - Claudecode
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/Gemini_Generated_Image_4nfm254nfm254nfm.webp
---

就在昨天（2026年3月31日），一场波及整个AI编程圈的“核弹级”事件突然引爆——Anthropic旗下最神秘的AI编程助手Claude Code的**完整源码**，疑似通过npm source map意外泄露！



一夜之间，87个被封印的隐藏功能、108个失踪模块、44个内部feature flag、完整的Agent调度系统……全部暴露在光天化日之下。



这场轰动全球技术圈的“代码狂欢”，不仅让无数开发者第一次窥见Claude Code的底层架构，更像打开了潘多拉魔盒



**Anthropic在AI Agent领域的全部野心与路线图，被撕开了最后的遮羞布。**

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/Gemini_Generated_Image_4nfm254nfm254nfm.webp)

## 被“封印”的绝密功能：Claude想做的，远不止是个编程助手

源码显示，Claude Code从来就不是一个“简单的AI代码补全工具”。



它是一个**高度模块化、可扩展的AI Agent平台**，一个可以24小时为你打工的“数字员工”。



泄露出来的未发布特性，让人细思极恐：

- 🔄 **后台智能体7×24小时待命**：

Claude可以离线持续运行，像一个真正的数字员工，随时响应任务、监控系统、生成报告

- 🤖 **Claude指挥Claude协同作战**：

主Claude能调度多个子实例并行执行任务，实现真正的多Agent协同规划

- ⏰ **内置Cron定时任务系统**：

Agent按计划自动执行脚本、监控项目、定时生成内容，彻底解放人力

- 🎤 **完整语音控制模式**：

无需打字，直接语音指挥Claude完成编码、调试、部署全流程

- 🌐 **真正的浏览器自动化**：

通过Playwright直接操控真实浏览器，实现网页自动化、数据抓取、界面测试

- 💤 **智能休眠与自恢复**：

Agent能自动休眠节省资源，需要时即刻唤醒，状态无缝衔接

- 🧠 **跨会话持久记忆引擎**：

记忆支持跨设备、跨会话长期保持，你的知识库不会丢失。



更令人震惊的是，源码中还发现了：



**Undercover Mode（隐身模式）、远程killswitch、以及108个被标记为“受控发布”的失踪模块**。



**这意味着什么？**



Anthropic的目标，从来不是做一个“好用的代码补全工具”，而是打造一个**能真正“思考、协作、拥有持久记忆”的AI编程操作系统。**




## 社区极速反击：三款“干净版”同时开源

消息一出，全球开发者社区的反应速度堪称“光速”。泄露后仅1小时，几个关键fork就已上线，**直接把Anthropic的遥测、后门、监控全部移除**。



1. **纯净解锁版：free-code**



泄露后 1 小时内火速上线的“干净分支”。它移除了所有出站遥测（OpenTelemetry/Sentry等），并暴力解锁了 45+ 编译时 feature flag，让拥有自建 API Key 的开发者可以直接体验深度推理、语音输入、token 预算控制等隐藏功能。



仓库地址：https://github.com/paoloanzn/free-code



**2. 修复可运行版：claude-code-haha**



原始泄露源码存在**6大致命BUG**，根本跑不起来。这个版本**最NB的地方**：直接修复源码致命BUG，**本地可运行**， 支持API端点完全自定义，所有遥测全部禁用，模型映射可自由调整。



仓库地址：https://github.com/NanmiCoder/claude-code-haha



3. **Rust重写版：claurst**



基于泄露代码的逻辑，使用 Rust 语言进行了隔离逆向工程（Clean-room reverse engineering）。不仅重现了 AI 编程 CLI 的核心功能，还复刻了 40+ 工具、Buddy 宠物、KAIROS 助手和 Dream 记忆引擎。



仓库地址：https://github.com/Kuberwastaken/claurst



## 源码深度解剖：108个失踪模块到底藏了什么？

如果你以为这就完了，那 too young。

ChinaSiro同学整理的**源码目录图谱**，直接扒出了更多内幕：

地址：https://github.com/ChinaSiro/claude-code-sourcemap



重点曝光：

- 108个失踪模块的命名规则与功能推测
- killswitch的具体实现逻辑
- 44个内部feature flag的完整一览表
- 受 Anthropic 控制的“分阶段发布”机制

简单说，我们看到的 v2.1.88 只是一个“阉割版”，**完整功能被分成了上百个模块，逐步向付费用户开放。**



## AI编程新时代，已经提前到来

Claude Code源码泄露事件，堪称2026年AI开源史上最戏剧性的一幕。



它不仅让87个隐藏功能浮出水面，更让所有人看到Anthropic的真正野心：打造一个能真正“思考、协作、持久记忆”的AI编程生态。



无论你是想尝鲜实验功能，还是打算基于泄露源码二次开发，现在都是最佳时机。社区已经把路铺好——剩下的，就看你敢不敢直接上手了。



**PS.**

- 远程服务GitHub: https://github.com/kyjl97

- 付费社群：[点此加入](https://t.zsxq.com/d4zSX)



**Source来源**

泄露源码：https://github.com/instructkr/claw-code

泄露源码图谱https://github.com/ChinaSiro/claude-code-sourcemap

干净Free Code  https://github.com/paoloanzn/free-code

Rust重写完整版 https://github.com/Kuberwastaken/claude-code

修复版https://github.com/NanmiCoder/claude-code-haha

Claude code两个可能导致缓存失效的漏洞

https://x.com/altryne/status/2038676458026189225

泄露的 Claude Code 源代码包含 44 个隐藏功能标志和 20 多个未发布的功能。

https://x.com/RoundtableSpace/status/2038960753458438156

