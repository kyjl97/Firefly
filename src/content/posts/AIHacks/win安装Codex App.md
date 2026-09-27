---
title: 离线安装微软商城软件
published: 2026-05-09
tags:
  - Codex
  - OpenAI
  - Windows
  - 微软商城
  - 离线安装
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260509221703981.webp
---
很多朋友安装了精简版 Windows，却遭遇致命痛点：想装个应用，系统却强行跳转微软商城？

Microsoft Store 打不开、下载失败、寸步难行！今天以 **Codex** 为例，手把手教你离线安装微软商城应用

这不仅是解决 Codex 的方案，更是**破解所有微软商城应用安装僵局的终极钥匙**！

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260509221703981.webp)


### 01：提取微软商城链接

打开微软商城，搜索 Codex，复制地址栏里的链接。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260509221138557.webp)


### 02：解析并下载安装包

- 打开https://store.rg-adguard.net/
- 把链接粘贴进去解析，找到 `.msix` 文件下载。

> 📌 文件名类似
>  `OpenAI.Codex_26.506.3741.0_x64__2p2nqsd0c76g0.Msix`，版本号会更新。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260509220949717.webp)



### 03：安装 .msix 文件

1. 从开始菜单打开 **PowerShell**
2. cd 到下载目录，例如：`cd D:\Downloads`
3. 执行安装命令：

```powershell
Add-AppxPackage .\你下载的文件名.Msix
```

### 04：启动 Codex

从开始菜单搜索「Codex」打开。

---
这个方法不仅能装 Codex，其他人任何微软商城应用都可以用这种方式离线安装，只需要替换对应的商城链接即可！

**有用的话，欢迎收藏转发！**

文章来源：[kyjl97.github.io](https://kyjl97.github.io/)  远程技术支持：[fix.kyjl97.github.io](https://github.com/kyjl97/)