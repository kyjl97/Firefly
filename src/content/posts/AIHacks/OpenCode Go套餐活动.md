---
published: 2026-01-01
title: OCGo套餐
description: DeepSeek API 即将涨价，OpenCode Go 套餐却半价放送，10 刀额度翻倍到等效 120 刀，约 31 万次请求。附配置避坑指南。
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-deepseek-opencode-20260809-143029.webp
tags: []
category: AIHacks
draft: false
---
DeepSeek API 马上要涨价了，这波大家应该都知道了。

但我发现一个事——**OpenCode 的 Go 套餐不但没涨，还在半价活动，而且额度翻倍了。**

10 刀套餐，原本每个月给 60 刀等效额度，现在直接翻到 **等效 120 美元**，差不多 **31 万次请求**。算下来，比之前便宜了一半还多。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-deepseek-opencode-20260809-143029.webp)

### ✅ 5 折优惠通道

[https://opencode.ai/go?ref=9AYD2ZQFJG](https://opencode.ai/go?ref=9AYD2ZQFJG)

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/d0451d046b390564b049b2ebbad0d9e0.webp)

### ⚠️ 配置避坑：记得打开这个开关

订阅完之后，**一定要在 Go 的界面**，把提供商里面的「**启用部署在中国的模型**」这个开关打开。

如果不打开，你把 API 配置到任何智能体里，都会报 **401、403 或各种诡异的错误**。我第一次踩坑就折腾了半天。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260809141217543.webp)

### 🔧 接入智能体

将 API 接入到自己的智能体。我习惯用 Codex，通过 [OpenCode](https://mp.weixin.qq.com/s/_pSBZvLVB_-zhlruIKMgCw) 这个工具来配置，操作很简单：

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260809141557253.webp)

---

以上。

如果对你有所帮助，还望不吝点赞与关注，这也是对我最大的鼓励与支持。

如需 Codex 协助安装、报错问题修复、Plus 升级、Skill 工作流定制，找我：**kyjl97**
