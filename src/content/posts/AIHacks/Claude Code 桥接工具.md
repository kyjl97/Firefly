---
title: Claude Code 桥接工具
published: 2026-05-10
tags: []
category: AIHacks
draft: false
pinned: false
image:
---
很多开发者都有这样一个刚需：正在电脑上用 **Claude Code** 开发项目，突然临时有事需要离开工位。 、

人一走，就没法继续和电脑端的 Claude Code 交互跟进任务。其实现在已有不少解决方案，可以通过技能把 Claude Code 桥接到第三方平台，比如飞书、微信、Telegram。哪怕不在电脑旁，也能随时查看开发进度、远程下发指令操控。

weclaw
微信 AI Agent 桥接器 — 将微信消息接入 AI Agent（Claude、Codex、Gemini、Kimi 等）。
https://github.com/fastclaw-ai/weclaw/blob/main/README_CN.md

在 Telegram使用Claude code
https://github.com/hanxiao/claudecode-telegram


将 Claude Code / Codex 桥接到 IM 平台 —— 在 Telegram、Discord、飞书、QQ 或微信中与 AI 编程代理对话
https://github.com/op7418/Claude-to-IM/blob/main/README.zh-CN.md
https://github.com/op7418/Claude-to-IM-skill/blob/main/README_CN.md

将飞书即时通讯平台与 Claude Code CLI 桥接消息持续刷新，实时展示 Claude 的执行过程 - 工具调用、文件操作一目了然：
https://github.com/Hanson/claude-client


微信桥接Claude code
https://github.com/anxiong2025/wechat-ai
https://mp.weixin.qq.com/s/6kdQgFr6xDccFxLkJhS1CA
wechat-ai  微信官方 iLink API  高

微信、飞书桥接的Claude code
https://github.com/lc2panda/claude-plugin-wechat

| 方案         | 原理             | 稳定性 | 封号风险 |
| ---------- | -------------- | --- | ---- |
| wechat-ai  | 微信官方 iLink API | 高   | 几乎没有 |
| cc-connect | WebSocket 转发   | 中   | 低    |
| 逆向协议类      | 协议逆向           | 不确定 | 偏高   |
微信 iLink Bot API 通信协议规范
https://github.com/epiral/weixin-bot/blob/main/docs/protocol-spec.md