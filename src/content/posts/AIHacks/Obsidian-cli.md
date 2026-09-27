---
title: Obsidian-cli
published: 2026-04-05
tags:
  - cli
  - Obsidian
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260405214553243.webp
---

2026年2月27日，Obsidian 1.12.4正式发布官方CLI。

这是Obsidian有史以来最重要的功能更新之一，意味着你的笔记库不再只是一个需要手动点开的应用，而变成了随时可调用的基础设施。

无论你是想快速捕获一个想法、批量处理上百篇笔记、还是让AI帮你分析和整理知识库——一切都变得前所未有的简单。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260405214553243.webp)

## 什么是Obsidian CLI？

CLI（Command Line Interface）命令行界面，是Obsidian官方提供的终端工具。在此之前，你需要通过第三方脚本直接修改.md文件，但现在——**任何你在Obsidian** **GUI****里能做的事，都可以从命令行完成**。

## 安装步骤（Windows）

### 第一步：更新Obsidian

确保安装 **Obsidian v1.12.4 或更高版本**。

检查方法：`设置` → `关于` → 查看版本号

如果版本较旧：`帮助` → `检查更新`

### 第二步：启用CLI

1. 打开Obsidian → `设置` → `关于`
2. 向下滚动找到 **命令行界面** 部分
3. 开启开关

Obsidian会自动将CLI二进制文件添加到系统PATH。

> ⚠️ **重要**：修改PATH后，**必须打开新的终端窗口**才能生效！

### 第三步：验证安装

打开新的PowerShell终端窗口，运行：

```PowerShell
obsidian version
```

成功输出类似：

```Plain
Obsidian CLI 1.12.4
```

### 第四步（如果提示command not found）

```PowerShell
# 手动添加到当前会话
$env:PATH += ";$env:LOCALAPPDATA\Programs\Obsidian\"

# 验证
obsidian version
```

> 路径通常是：`C:\Users\你的用户名\AppData\Local\Programs\Obsidian\obsidian.exe`

## 快速上手：5个核心命令

1. ### 浏览笔记库（TUI模式）

```PowerShell
obsidian
```

启动全屏终端界面，像文件管理器一样浏览笔记，用方向键导航，`/`搜索，`Enter`打开笔记。

1. ### 打开今日日记

```PowerShell
obsidian daily
```

跳转到今天的日记，不存在则自动创建。**这是使用频率最高的命令**。

1. ### 全文搜索

```PowerShell
obsidian search query="PKM"
```

搜索整个笔记库内容，结果直接输出到终端。

1. ### 快速捕获想法

```PowerShell
obsidian daily:append content="突然想到一个绝妙的主意"
```

不用打开Obsidian，直接往今日日记追加内容。

1. ### 查看笔记库统计

```PowerShell
obsidian files total
obsidian tags sort=count
```

看看你的笔记库有多少篇笔记，最常用的标签是什么。

## 进阶用法

### 高级搜索

```PowerShell
# 按标签搜索
obsidian search query="[tag:publish]"

# 按属性搜索
obsidian search query="[status:active]"

# 输出JSON给脚本处理
obsidian search query="meeting" format=json
```

### 文件操作

```PowerShell
# 创建新笔记
obsidian create name="新笔记" content="# 标题`n内容"

# 移动笔记（自动更新链接！）
obsidian move file="草稿" to=Archive/2026/

# 设置属性
obsidian properties:set file="项目A" status=active type=text
```

### 任务管理

```PowerShell
# 查看所有待办
obsidian tasks

# 创建任务
obsidian task:create content="写周报" tags="work"

# 完成任务
obsidian task:complete task=任务ID
```

## Claudian 插件集成 — 在Obsidian内直接用AI

这是最实用的集成方式——通过 **Claudian** 插件，在Obsidian内部直接调用Claude Code，无需切换窗口。

### 安装 Claudian 插件

由于这个插件不在社区插件市场，需要手动安装：

**步骤1：下载插件文件** 访问 GitHub 下载最新版本：https://github.com/ansong/claudian/releases 需要下载：`main.js`、`manifest.json`、`styles.css`

**步骤2：创建插件目录**

```Plain
你的笔记库/.obsidian/plugins/claudian/
```

把下载的文件放进去。

**步骤3：启用插件**

1. 重启Obsidian
2. 设置 → 第三方插件 → 刷新
3. 找到 Claudian 并启用

## Claude Code 实战案例

### 案例1：知识库研究员

```Plain
> 搜索我笔记库里所有关于"第二大脑"的内容，总结出5个核心要点
```

AI会：

- 检索所有相关笔记
- 提取核心观点
- 直接回复你总结

### 案例2：写作助手

```Plain
> 把我上周的日记里有价值的内容整理成一篇800字的公众号文章
```

AI会：

- 读取你的多篇日记
- 智能筛选有效信息
- 生成可直接发布的文章

### 案例3：任务梳理

```Plain
> 列出我笔记库里所有标记为[status:pending]的任务，按优先级排序
```

### 案例4：批量重命名标签

```Plain
> 把所有笔记里的 #会议 标签改成 #例会
```

### 案例5：信息聚合

```Plain
> 搜索最近30天创建的笔记，提取所有链接，生成一个知识图谱总结
```

### 案例6：内容改写

```Plain
> 读取"投资笔记"，把它改写成适合发小红书的版本，保持核心观点但语言更口语化
```

### 案例7：周报自动生成

```Plain
> 读取我本周的日记和工作笔记，生成一份周报，包含：本周完成事项、待办事项、学习收获
```

### 案例8：碎片整理

```Plain
> 扫描Inbox文件夹下所有笔记，把相似主题的整理到一起，生成一个主题索引
```

### 案例9：深度研究

```Plain
> 我想了解"AI笔记"这个主题，先搜索我笔记库里所有相关内容，然后列出我还缺什么角度
```

### 案例10：数据库查询

```Plain
> 搜索所有包含"价格"关键词的笔记，提取其中的数字信息，生成一个对比表格
```

## 写在最后

在此之前，笔记库是一个你需要手动打开、鼠标点击的应用；现在，它变成了随时可调用的基础设施。

你可以坐在终端前，快速捕获想法、搜索内容、移动文件、管理任务，甚至让AI直接帮你读取、分析、重组你的整个知识体系。

配合Claudian插件，你甚至不需要离开Obsidian界面，就能调用Claude Code完成写作优化、内容总结、代码生成等任务。

整个过程是无缝的、自然的——就像你的第二个大脑终于学会了说话。

**我建议你今天就做两件事：**

第一，打开Obsidian设置，启用CLI；

第二，下载 Claudian 插件，体验在笔记里直接用AI的快感。

从 `obsidian daily` 开始，从一个命令开始，你会发现一个全新的Obsidian。