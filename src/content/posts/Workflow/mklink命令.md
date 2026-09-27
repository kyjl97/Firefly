---
title: mklink命令使用指南
published: 2026-04-20
tags:
  - Windows
  - DOS命令
  - 技术教程
  - 工作流
category: Workflow
draft: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260420172844734.webp
---

你是否遇到过这些问题：想让软件从A目录读取文件，但文件实际存放在B目录？



想在多个位置同步同一个文件，又不想每次手动复制？或是想给文件夹创建"替身"，让不同程序都能访问？



**Windows 自带的 mklink 命令，就是解决这些问题的神器。**

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260420172844734.webp)

### 01 先搞懂四种链接的区别

Windows 提供了四种创建链接的方式，各有各的脾气：

**文件软链接（符号链接）** 是默认模式，用 `mklink 链接名 目标文件` 即可创建。它像一个"快捷方式升级版"，让程序能读取别处的文件。**支持跨盘**，比如在D盘创建一个链接指向C盘的文件。但如果你删掉原文件，这个链接就失效了。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260420173406196.webp)

**目录软链接（/D参数）** 

专门用于文件夹，和文件软链接一样支持跨盘，原文件夹删除后链接同样失效。很多工具用它来重定向配置目录，比如让Claude从默认路径读取，实际文件存放在别处。



**硬链接（/H参数）** 

它不是指向路径，而是给同一份数据多起几个"名字"。即使删掉原始文件，链接依然能打开内容，因为它指向的是硬盘上的实际数据。**但它只能在同一个盘符内使用**，且只能用于文件，不能用于文件夹。



**目录联接（/J参数）** 

和目录软链接类似，也是针对文件夹的链接方式。区别在于它属于NTFS的旧功能，**不支持跨盘**，但兼容性更好，一些老旧程序也能正常识别。

### 02 实际使用场景

**场景一：让AI工具读取备份目录**

想把Claude的全局skills目录指向GitHub备份仓库？可以这样操作：

```cmd
cmd /c mklink /D "C:\Users\你的用户名\.claude\skills" "C:\Users\你的用户名\claude-skills"
```

这两个路径指向同一个文件夹，往任意一个里放文件，另一个立刻同步。



**场景二：项目skill使用全局skill配置**

在Obsidian仓库里创建软链接，指向Claude code读取的全局skill目录：

```cmd
mklink /D "%userprofile%\.claude\skills" "%userprofile%\Documents\Obsidian\.claude\skills"
```

这样AI在Obsidia仓库就可以调用全局skill，不要单独安装



**场景三：一个规范给不同的Agent用**

用硬链接让同一份文档以不一样的名字显示，同时保持内容完全一致：

*PS.这是 3 条独立命令，会运行 3 次，创建 3 个独立的硬链接。*

```cmd
mklink /h "D:\project2026\zhishiku\AGENTS\知识库规范.md" "D:\project2026\zhishiku\知识库规范.md"
mklink /h "D:\project2026\zhishiku\CLAUDE\知识库规范.md" "D:\project2026\zhishiku\知识库规范.md"
mklink /h "D:\project2026\zhishiku\QWEN\知识库规范.md" "D:\project2026\zhishiku\知识库规范.md"
```

修改任意一个文件，其他文件同步更新，而且不怕误删原文件。

### 03 重要注意事项

- 创建符号链接需要**管理员权限**，记得以管理员模式运行CMD或PowerShell
- 软链接删除原文件后链接失效，因为链接指向的是路径
- 硬链接删除原文件后依然有效，因为它指向的是数据本身
- 如果你需要跨盘操作，选择软链接；如果只在同盘内使用，硬链接更稳定



**掌握这四个命令，你就是Windows文件管理的高手了。**
