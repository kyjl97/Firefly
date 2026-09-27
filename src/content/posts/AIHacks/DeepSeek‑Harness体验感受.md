---
title: DeepSeek‑Harness体验感受
published: 2026-08-20
tags: []
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/DSH_Desktop_P7QtoVCxmJ.webp
---

先说结论：新手可以尝鲜但是不适合新人去折腾，需要配置各种插件，弥补它原生的各种不足。适合动手能力的开发者去二次开发，或拿去帮客户做定制化的开发。

---

## DeepSeek Harness（官方，代号 dsh）

```
DeepSeek Harness（官方，代号 dsh）
│
├── 形态①：Web 版 / CLI 版
│   本质 = 官方 dsh 核心，用命令行 npx @deepseek-ai/dsh web 启动
│   出来是浏览器里的网页界面
│
└── 形态②：桌面版（DSH Desktop）
    本质 = 同一个官方 dsh 核心，外面套了个 Electron 壳
    出来是双击图标、独立窗口的桌面程序
```

---

我自己使用的 Windows 系统，安装的是 GitHub 社区的，一个大佬开发的桌面版。

说一下我的几点感受。

---

## 1. 桌面版安装侧边栏插件

我这几天安装了大概五六个桌面版。有一些带有侧边栏，但我感觉并不好用；有一些下载安装完后打不开。不过在测试了几款之后，我发现目前使用的这一款是最好的。但是它没有侧边栏，于是我给它安装了一个侧边栏插件 dsh-better-sidebar，因为这个插件也是适配于官方的原生版本，所以它对桌面版的安装也是有一些不一样的。

参考：[DeepSeek Harness 侧边栏插件安装](https://github.com/kyjl97)

---

## 2. 截图粘贴拒绝

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/DSH_Desktop_P7QtoVCxmJ.webp)

在 `$DSH_HOME/settings.yaml` 中，给支持视觉的模型显式声明 `input: [text, image]`：

参考：[DeepSeek Harness 截图粘贴拒绝](https://github.com/kyjl97)

---

## 3. 识图报错

我知道 DeepSeek 没有视觉能力，于是呢，我给他配置了一个我自己以前写的 MCP。但是呢，依然报错了。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/微信图片_20260819224949_159.webp)


我找了很多的视觉的插件，都装不进去，**而且原因很（这些插件）本质上是一个专为 dsh web 开源 Web 版设计的插件**，核心机制强烈依赖 web 版独有的 webServer 服务，而 **Desktop 走的 community-market 受管安装器根本不接受它**。

现在我的做法是，因为我在里面使用的是 OpenCode 的 API，里面有很多模型也是具备视觉能力的，我需要视觉的时候，就切换到这个。如果是纯文本的日常任务的话，我就会使用 DeepSeek V4 flash。

---

## 4. 联网搜索的坑

我在 DeepSeek harness 当中呢，配置的是 opencode go 套餐的 API，让她帮我找个东西，他会使用 web_search，有几次他报我"余额不足"，我在想，我里面最近刚充的钱怎么会没钱呢？突然我想到，我的 DeepSeek 官方 API 那里面没钱了。

于是呢，我上网搜索了一下才发现：

在 DeepSeek Harness 中，即使主对话模型已经切换到 opencode，内置的联网搜索（web_search）依然走 DeepSeek 官方 API，继续消耗 DeepSeek 额度。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/微信图片_20260819221422_63.webp)


使用 DeepSeek-Harness-Web-Tools 免费搜索插件替代 DSH 自带的 web_search。

参考：[DeepSeek Harness 联网搜索的坑](https://github.com/kyjl97)

---

## 5. 沙箱里的 pwsh报错

沙箱里的 pwsh 一碰某些操作就挂

报内存访问错误，报错 `0xC0000409`，exit `3221225794`。

解决办法，把他的权限开成完全访问。


