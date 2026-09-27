---
title: Hermes Agent教程
published: 2026-04-15
tags:
  - Agent
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260414222135731.webp
---

最近叫Hermes Agent的开源项目，短短两个月GitHub星标冲到8万+，被无数开发者称为"OpenClaw的真正对手"。它不是又一个聊天机器人，也不是IDE里的代码助手，而是一个真正会随着你一起成长、越用越聪明的自主AI Agent。


项目地址：
https://github.com/NousResearch/hermes-agent

官网
https://hermes-agent.nousresearch.com/


最近很多养虾的朋友，安装了Hermes Agent

![1278](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260729190103812.webp)

## 01.安装步骤

支持macOs、Linux、WSL2（Windows子系统），Windows原生不支持，需要先安装 WSL2，再在 WSL2 环境里按本教程操作。可在微软官方文档搜索「安装 WSL」，



另外确保git已安装，还有需要准备**大模型 API Key**



### **安装命令**

PowerShell执行

```
irm https://hermes-agent.nousresearch.com/install.ps1 | iex
```

安装完成后，脚本会自动进入引导设置，选择 **Quick setup** 模式，然后按提示配置模型。推荐选 OpenRouter，进入后可以选免费模型（如 g*oogle/gemma-4-31b-it:free*），零成本跑起来先体验。



如果之前本地已有 OpenAI 或 Codex 的授权配置，Hermes 会自动读取，不用重复填写。

配置最后会询问是否注册为系统服务，选 **Y** 可以开机自启、后台常驻，省去每次手动启动的麻烦。



如果你暂时不想配置聊天平台，选择跳过（Skip），直接在终端里输入：

```
hermes
```

能看到对话界面，说明安装成功了，可以直接在命令行里开聊。

![图像](https://pbs.twimg.com/media/HFYiyvda8AQToWq?format=png&name=900x900)

安装后必须的事情

```
让Hermes agent配置 COMFOX及CAMOFOX_URL。
让Hermes agent编辑写入 ~/.hermes/SOUL.md 
让Hermes agent帮我配置个exa
让Hermes agent
让Hermes agent
```

```
做一个 终端命令审计插件（Terminal Audit Hook）：在每次 terminal 工具执行完毕后，自动把命令内容、执行结果、时间戳、会话ID 追加到日志文件。
```



## 02. 接入web ui

强烈推荐hermes web ui，区分了 CLI 对话、TG 对话以及最新的微信对话。



相较于 CLI 终端对话，它展示内容更加具体。系统新增了定时任务配置、模型添加与实时切换功能，同时集成了官方技能点配置、用户笔记编辑、用户画像管理等能力。



此外，还优化了实时响应机制，缩短了消息间隔，并新增回复完成提示音。项目地址：https://github.com/EKKOLearnAI/c

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260414222135731.webp)



**其他类似的web ui项目**

- [hermes-webui](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/weixin)
- [hermes-hudui](https://github.com/joeynyc/hermes-hudui)



## 03.接入飞书



## 04.桥接个人微信

> 1. 首先打开终端，输入 hermes update
>
> 2. 更新好之后输入 hermes gateway setup
>
> 3. 找到 Weixin 按空格进入设置
>
> 4. 稍等出现一个二维码或者链接，手机扫码绑定即可
>
> 5. 之后会有两个选择，都选第一个就行
>
>
> 然后我们直接在终端里把安装好的 hermes 喊出来，告诉它：帮我配置好微信的 gateway 服务。它会自动帮你配置好，然后就可以用了

参考文档：[点此查看](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/weixin)



PS.担心账号被封禁，绝对值得保持谨慎，并使用小号进行测试！



##  05.常见问题

**Q：从 OpenClaw 迁移过来，原来的配置还能用吗？**

可以，Hermes 内置了迁移命令：

```text
hermes claw migrate
```

## 06.信息来源

[X 上的 文森.Z：“保姆级 Hermes 生图配置教程 - Telegram & Wechat” / X](https://x.com/VinceZcrikl/status/2043308211886055697)

[X 上的 岚叔：“上手 Hermes Agent 后建议先尝试的十件事情” / X](https://x.com/LufzzLiz/status/2042237123865297267)

旧安卓手机变成 Linux 桌面电脑或智能家居服务器，不需要 root

https://github.com/mayukh4/linux-android

多Agent团队协作才是Hermes Agent的正确打开方式。

https://x.com/Saccc_c/status/2044018336673964207



2026/07/30补充

Hermes 的全局身份文件SOUL.md  每次会话都会自动加载
它设置的是 agent 的身份/人格，不是项目规则，但始终加载。
```
C:\Users\Administrator\.hermes\SOUL.md
```

如果想让项目规则跨目录继承，应该用 `.hermes.md`。
1. `.hermes.md` / `HERMES.md`（会向上遍历到 git 根）
2. `AGENTS.md` / `agents.md`（只看当前目录）

![991](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260730023909211.webp)
