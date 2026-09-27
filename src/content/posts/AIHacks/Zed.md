---
title: Zed安装使用教程
published: 2026-04-09
tags:
  - Agent
  - AI
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260409135131089.webp
---

近期代码圈掀起热潮，不少深耕VS Code、Sublime的开发者，纷纷转向Zed编辑器。



起初我并未在意，亲身试用一周便彻底舍弃旧工具，这款编辑器精准拿捏了程序员的核心需求。依托Rust构建，它性能拉满，打开大容量代码库、函数跳转、全局搜索均无延迟，告别卡顿与加载等待，极致丝滑的编写体验，让人用过便难以割舍。



定价：基础编辑器永久免费（无 AI 功能）；

Zed Pro 含免费额度，付费版 20 美元 / 月（500 次提示），协作功能全用户免费

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260409135131089.webp)

## 一.下载安装

### 官方版

https://zed.dev/

### 汉化版

> https://github.com/x6nux/zed-globalization
>
> https://github.com/tc999/zed-loc
>
> https://github.com/qq602431132/zed-fanyi
>



ps.如报错如下DLL错误

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260409133730352.webp)

第三方 DLL 网站下载[windowsperformancerecordercontrol.DLL](http://windowsperformancerecordercontrol.DLL)

将文件粘贴到你电脑的 `C:\Windows\System32` 目录（64 位系统）

执行注册命令

```
regsvr32 windowsperformancerecordercontrol.DLL
```

### 软件设置
自动保存→开启。
![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260427005030653.webp)


## 二.安装插件

### opencode插件


****

Ctrl + Shift + X打开扩展插件面板，

搜索安装**opencode**

Ctrl + Shift + /打开Agent面板选择opencode进行对话

> **OpenCode插件提供的免费模型清单**
>
> 1. OpenCode Zen/Qwen3.6 Plus Free（接近 Claude Opus）
> 2. OpenCode Zen/Qwen3.6 Plus Free (low)
> 3. OpenCode Zen/Qwen3.6 Plus Free (medium)
> 4. OpenCode Zen/Qwen3.6 Plus Free (high)
> 5. OpenCode Zen/Nemotron 3 Super Free
> 6. OpenCode Zen/Nemotron 3 Super Free (low)
> 7. OpenCode Zen/Nemotron 3 Super Free (medium)
> 8. OpenCode Zen/Nemotron 3 Super Free (high)
> 9. OpenCode Zen/MiniMax M2.5 Free（首选，对标 Claude Opus）


![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260425225520823.webp)

#### skill目录

```
C:\Users\Administrator\.config\opencode\skills\
```


### **其他插件**

- Markdown Oxide
Obsidian 风格的知识管理语言服务器
内置Markdown 预览：Windows打开预览→`Ctrl-Shift-V`

- GitHub MCP Server
在 Agent Panel 中操作 GitHub（创建 PR、review、issue 等）

- Context7 MCP Serveri
为 AI 助手提供最新的官方文档和代码示例
如：帮我用 React hooks，use context7

- 2slides MCP Server
AI 生成 PPT/幻灯片

- Weave MCP Server
多 Agent 协同开发，实体级别合并冲突检测

而且社区插件生态虽然不如 VS Code 成熟，但常用的插件基本都有，足够满足日常开发需求，关键是插件加载也快，不会拖慢编辑器速度。


## 三.**常用快捷键**

| 功能操作 | 快捷键 |
| ---- | ---- |
| 打开设置 | Ctrl + , |
| 打开主题切换面板 | Ctrl + K + Ctrl + T |
| 打开扩展插件面板 | Ctrl + Shift + X |
| 打开Agent面板 | Ctrl + Shift + / |
| 打开命令面板 | Ctrl + Shift + P |
| 打开快捷键配置 | Ctrl + K + Ctrl + S |
| 打开文件夹 | Ctrl + O |
| 快速打开文件 | Ctrl + P |
| 查看 AI 聊天历史 | Ctrl + Shift + H |
| 预览 Markdown | Ctrl + Shift + V |
| 打开对话线程侧边栏 | Ctrl + Alt + J |
| 显示/隐藏侧边栏 | Ctrl + B |
| 打开终端 | Ctrl + ` |
| 打开 Git 面板 | Ctrl + Shift + G |
| 新建编辑器窗口 | Ctrl + Shift + N |
| 新建对话 | Ctrl + N |
