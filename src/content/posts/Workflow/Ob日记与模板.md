---
title: Ob日记与模板
published: 2026-04-08
tags:
  - Obsidian插件
  - Obsidian
category: Workflow
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260408235725942.webp
---

在 Obsidian 打造高效日记自动化，核心插件是基础，模板是骨架，辅助插件是关键。



本文聚焦 Calendar、Templater、Dataview 三大插件，带你从 0 到 1 搭建模板、配置自动调用，实现日记一键生成、结构统一。



额外分享两款实用工具，拉满创建效率与体验，一站式打通 Obsidian 日记工作流闭环，让记录更轻松、复盘更高效。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260408235725942.webp)

## 1.开启核心插件：日记 & 模板

**首先在 Obsidian 内置核心插件中，开启两个关键功能：**

1.打开 Obsidian → 点击左下角设置 → 进入「核心插件」

2.开启 **日记** 和 **模板** 两个选项


**设置模板路径**

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260409115138831.webp)

**设置日记相关路径**

注意⚠️：新存放位置/日记模板位置→复制基于库的相对路径

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260409115155521.webp)



## 2.安装插件Calendar&Template

Calendar这个插件可以实现点击日历中的任意日期，自动在指定文件夹创建对应日期的笔记（自动套用模板）无需复杂的设置，

不过还需要配合Template插件来用。



**安装Template**，设置如下

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260408234649216.webp)

绑定文件夹对应不同的模板

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260408234731402.webp)

## 3.安装插件Dataview


Dataview是 Obsidian 里的“智能检索 + 数据统计工具”



它不用你手动整理、汇总，只需要写几句简单的查询语句，比如我在我日记的模板结尾这样写：



**今日新建**

```dataview
table without id
  file.folder as "分类",
  file.link as "笔记"
where file.mday = date("{{date}}")
sort file.folder, file.name asc
```

**今日修改**

```dataview
list
where file.mday = date("{{date}}")
sort file.mtime asc
```



以上。Obsidian 日记自动化的核心配置就全部完成了！



通过核心插件与3个增强插件的组合，我们实现了：一键新建日记、模板自动套用、内容动态汇总、复盘数据化」的完整工作流。