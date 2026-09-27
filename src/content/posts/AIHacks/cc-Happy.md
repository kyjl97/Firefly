---
title: cc-Happy
published: 2026-02-14
tags:
  - Claudecode
  - 命令行工具
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260306063507065.webp
---

我之前用AI编程一直特别拧巴：Claude Code明明能自己干活，可我必须守在电脑前，它每走一步都要等我确认才能继续。直到我用上了 Happy，它直接把电脑上的 Claude Code 实时映射到手机，不把代码文件上传云端，数据全程端到端加密，不用经过第三方服务器，既能随时随地查看和控制，安全感也拉满，彻底摆脱了必须坐在电脑前的束缚。



## 什么是Happy

一个让你用手机远程控制和实时查看电脑上Claude或Codex编程过程的工具。它通过将电脑上的 Claude Code 或 Codex 实时映射到手机，解决了需要守在电脑前被动等待的痛点，它让用户从“必须坐在电脑前等待指令”的束缚中解放出来，可以随时随地了解 AI 的工作进展并能随时介入，实现了“无需一直盯着，但一切尽在掌握”的流畅协作体验。



项目地址

https://github.com/slopus/happy

## **先说几点个人体验心得**

- 实时状态同步，手机与电脑看到的是同一个对话框，你也可以直接在手机端控制
- 手机端支持语音输入
- 默认模式是逐步确认可以设置yelo模式让它全自动跑
- 电脑上开多个终端窗口跑不同的Claude实例，手机同时跟它们对话互不干扰。
- 一个App切换多个的电脑AI对话任务，对话历史可以追溯
- 电脑端与手机端不需要同一局域网也可以用
- 支持消息推送通知
- 支持斜杠命令
- 支持Claude Code、Codex
- ⚠️注意：电脑必须保持开机、不能休眠
- ⚠️手机远程控制时，会提示“已切换到local模式”（本地模式），此时左下角可以设置权限模式为yelo模式，此时电脑编



## **三步搞定使用，5 分钟上手**

### 第一步：电脑端安装

PowerShell运行如下安装命令

```Plain
npm install -g happy-coder
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260306063507065.webp)

安装完成后，以后启动 Claude Code 时，把`claude`命令换成`happy`就行了。

```Plain
happy      # 启动Claude
# 或者
happy codex  # 启动Codex
```

输入`happy`启动后，会让你选择使用移动 APP 还是网页浏览器。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260306063604724.webp)

### 第二步：APP 使用

> iOS 用户去美区 App Store 搜索 “Happy”，Android 用户去 Google Play 下载。

选择 APP 连接，终端会显示一个二维码与URL，扫码或者粘贴url即可

链接后手机会显示终端链接成功，此时你就能在手机上看到电脑端运行的 Claude Code 实例了

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260306063629727.webp)

> 点开当前对话框，左下角设置点开，有个权限模式、模型选择，你可以选择自己舒服的模式，比如选择YOlo模式就是绕过所有权限，Claude会全自动跑，如果默认每一步都需要你的确认，模型的一般会选择Opus

### 第三步：网页使用

也可以直接用浏览器访问 Web 版，不用下载 App。选择浏览器访问后，终端会出现一个链URL，在其他任何设备的浏览器上打开（比如 pad、手机、其他电脑），选择接受连接即可。连接成功后，终端会自动进入 claudecode 界面，手机端则显示已连接终端，还能显示项目文件夹，点击进入操作。启动会话后，能看到连接的设备、项目文件，还可以选择权限模式，比如接受编辑、计划模式、Yolo 模式。



**如果觉得这篇教程对你有帮助，别忘了点赞+收藏+转发三连呀！关注我，后续分享更多实用技巧、效率工具干货，下次见～ 👋**



**得救之道远程技术支持：[fix.kyjl97.github.io](https://github.com/kyjl97/)**

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260306064028188.webp)