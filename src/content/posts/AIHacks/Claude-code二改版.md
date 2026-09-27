---
title: Claude二改版
published: 2026-05-18
tags: []
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260517213248392.webp
---
分享市面上一些Claude code二改版

### CLI版本

#### MiniClaude

Claude Code 在开发体验上做得不错，但内置了大量云服务逻辑。我做了一个精简版 MiniClaude ，保留 100% 核心功能，移除了所有不必要的部分。
与 Claude Code 的区别
• 删除了 OAuth 、遥测、设置同步、团队协作、速率限制、实验功能（-92000 行）
• 不依赖 Anthropic 云服务，API Key 直连
• 支持多 Provider：DeepSeek / Kiro 反代 / 任何 OpenAI 兼容端点
• 新增 /provider 命令实现多 Provider 热切换，无需重启
• 启用 ENABLE_PROMPT_CACHING_1H 可获得 1 小时缓存 TTL

来源地址：
https://www.v2ex.com/t/1213338#reply10
开源地址：
https://github.com/txl16095/MiniClaude

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260517213248392.webp)

#### Newtype-os
**项目地址**：
https://github.com/newtype-01/newtype-os/blob/main/README.zh-cn.md

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260330163220785.webp)




### GUI 形态
#### claude-desktop-cn
网页聊天只是入口，命令行工具门槛偏高；Claude Desktop CN 的价值，是把 AI 对话、本地项目、代码编辑、Git、命令执行、多 Agent 和插件能力，变成一个中文桌面工作台。

来源地址：
https://www.bilibili.com/video/BV1Y2526tEzZ/?share_source=copy_web&vd_source=0ff53b7b59566dd33907b903ad936e21
项目地址：
https://github.com/Qiao-920/claude-desktop-cn
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260517215115491.webp)


#### CodePilot

开源地址：
https://github.com/op7418/CodePilot

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260517214338508.webp)

#### oh-my-openagent
https://ohmyopenagent.com/zh
https://github.com/code-yeongyu/oh-my-openagent/blob/dev/README.zh-cn.md
https://github.com/newtype-01/newtype-os/blob/main/README.zh-cn.md（黄益贺）
[newtype-os](newtype-os.md)

#### Craft Agents
来源
https://web.okjike.com/u/5D79173A-D706-4D3F-BA50-6C4BB7C8E9EE/post/69eb4ddf4ef528349ce43c24
开源地址：
https://github.com/lukilabs/craft-agents-oss/
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260517214958350.webp)
