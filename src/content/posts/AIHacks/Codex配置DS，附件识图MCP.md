---
title: Codex配置DS，附件识图MCP
published: 2026-08-04
tags:
  - ai
  - codex
  - deepseek
  - workflow
  - token
  - api
  - obsidian
  - gpt
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-deepseek-codex-vision-20260804-162947.webp
---
DeepSeek V4 Flash 正式版发了。

不是Preview，是正式版。Terminal-Bench跑到82.7，工具调用能力直接起飞。

我在 OpenRouter 上看了一下它的成本，百万 token 输出只需要 1.3 块，这简直就是免费送！

下面我教你如何把它接入到 Codex 里面，然后再补齐它的图像识别能力。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-deepseek-codex-vision-20260804-162947.webp)

### 01.下载 Codex

你直接在微软商店搜索 ChatGPT 或 Codex（现在它们两个合并了，名字就叫 ChatGPT），然后下载。

下载完之后，它会自动打开，这个时候你可以先退出。

如果微软商店打不开或下载后启动崩溃，又不想自己折腾，公众号后台可以回复【codex】获取懒人包。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260804155650921.webp)

### 02.获取DeepSeek API Key

去DeepSeek开放平台。直接搜"DeepSeek开放平台"就能进。

进来找到API Keys页面，点"新建"。

名字写个"Codex"方便自己认，创建完把Key复制下来。

注意：它只显示一次，存好。

如果之前没充过值，充个十块钱就够用很久了。V4 Flash的价格极其便宜。


### 03.一键接入 Codex

DeepSeek官方出了一键接入脚本。

把官方脚本命令粘进去，回车，选择一，输入你的API key即可。

不用CC Switch，不用手动改配置文件，不用折腾任何东西。

API key 已经配置好了，现在打开 Codex 桌面版，测试一下它能不能正常输出。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260804155752538.webp)


### 04.补齐图像识别能力

DeepSeek 这类模型很强，但看不见图片。你丢一张截图过去，它只能干瞪眼。

GLM-4.6V-Flash 是 GLM-4.6V 的免费版本，你可以让你的智能体把这个模型制作成一个 MCP，然后再把这个 MCP 封装成一个 skill，这样你的 DeepSeek 就拥有了图像识别能力。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260804170620217.webp)

可以将下面这段话发给你的DeepSeek。

**底层调用glm-4.6v-flash，制作一个mcp，把这个图片识别的mcp，封装成skill**

当然，如果你自己懒得制作的话，我自己也已经帮你制作好了一个后台，只需要公众号回复 codex 免费获取。

### 04.补齐生图别能力

DeepSeek 本身不是多模态模型，如果你让它进行生图的话，它本身是不能够进行生图的。那有什么方法能够让它生图呢？其实最简单的方法，就是让它在生图的时候调用一个后端的生图 API 就可以了。

我自己的做法是写一个 skill，主要用来生图。这个 skill 会调用一个 Python 脚本，脚本里面配置了生图 IPA 的所有接口。

我自己使用的这个生图的API平台是：[点此查看]( https://apimart.ai/register?aff=QVui)，它的成本非常便宜，每张图的生图成本只需要8分钱，也就是说10块钱可以生成117张。

当然，如果你自己懒得去制作这样一个 Python 脚本，我也把这样一个东西封装成了一个开源项目。

地址 https://github.com/kyjl97/deepseek-imagegen

我的公众号的文章的封面都是用它来进行生图的。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260804183004577.webp)


以上觉得有用，转发给你身边也在用AI智能体的朋友。

**PS.特别提醒：**

1，如果你是内容创作者，笔记杂乱、灵感难沉淀、素材难以复用，这套融合 PARA + 卡片法 + LLM 自动运维的 Obsidian 知识库模板直接抄作业：[点此查看详情！](https://mp.weixin.qq.com/s/5LkcBS6TvwXEGxIMiA-1jQ)


2，日常用 Codex 做自动化、写脚本、管理项目？这套完整落地实战手册，避开大量踩坑流程：[点此查看详情！](https://mp.weixin.qq.com/s/F3HS6BUfTDP0h3rFipoJhA)


3，需要一对一远程技术支持：
Codex 安装调试、疑难故障修复、Plus 版本升级、专属 Skill 自动化工作流定制，找我：kyjl97

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/631b2f126cd24e7588d8fb3ac8137c28.webp)