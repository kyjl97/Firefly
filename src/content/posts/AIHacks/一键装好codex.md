---
title: 一键装部署codex工具
published: 2026-08-10
tags:
  - ai
  - codex
  - tools
  - workflow
category: AIHacks
draft: false
pinned: false
image: 
---

很多 AI 实践者在安装 Codex 桌面端（即微软商店中的官方客户端）时，经常会遇到微软商店打不开、国内网络无法下载、或者界面全英文看不懂等各种卡点。

其实，社区开发者已经为我们铺好了路。今天我整理了目前最新、最稳的一套 **“一键安装与汉化”** 解决方案，无论是想要极简一键管理，还是需要手动离线安装和接入国产大模型，都可以轻松搞定。

---

## 方案一：使用 Codex App Manager（最推荐，省心一键式）

如果你不想手动折腾各种安装包和更新，可以直接使用社区开发的管理器。

* **工具名称**：Codex App Manager
* **下载地址**：[https://codexapp.agentsmirror.com/](https://codexapp.agentsmirror.com/)
* **功能特色**：
  * **一键安装**：免去微软商店的步骤，直接后台下载最新版。
  * **增量更新**：自动检测并完成版本升级。
  * **干净卸载**：避免残留注册表和缓存垃圾。

---

## 方案二：手动下载官方离线镜像包（适合商店打不开的用户）

如果你的电脑无法访问微软商店（MsStore），可以使用自动同步的官方镜像源直接下载离线安装包。

* **镜像发布页**：[Wangnov/codex-app-mirror Releases](https://github.com/Wangnov/codex-app-mirror/releases)
* **版本推荐**：目前适用于 **26.803.5235.0** 版本的官方离线安装包：
  * **微软官方 CDN 纯净下载直链**：[点击下载 26.803.5235.0 安装包](http://tlu.dl.delivery.mp.microsoft.com/filestreamingservice/files/2abd4cac-6e68-43a1-b571-d5b3345d9073?P1=1786380915&P2=404&P3=2&P4=YUz73s9sN8HgxqTXvU%2fUGu9r1AlA4v7qyG3bjAEHOO1x535sIyu4iRjpzFe4ecpygEzFAU2p8W9KFVwQRqM3ew%3d%3d)

### 离线包安装方法：

1. 下载上面的 `.msix` / `.appxbundle` 格式文件。
2. 以**管理员身份**打开 PowerShell 终端。
3. 切换到文件所在目录，运行以下命令即可完成安装：

```powershell
Add-AppxPackage .\文件名.msix
```


---

## 方案四：一键中文汉化与安装脚本

Codex 默认是全英文界面。可以通过以下开源项目进行一键汉化。

* **汉化项目地址**：[codex-zh-cn-agent](https://github.com/ukinch605/codex-zh-cn-agent)
* **适用版本**：完美兼容官方最新版本（包含 26.803.5235.0）。
* **使用方法**：
  1. 前往项目 Releases 页面下载汉化压缩包。
  2. 解压后，双击运行目录内的一键安装脚本（`install-windows.bat`）。
  3. 脚本会自动定位本地的 Codex 安装目录，注入汉化补丁，重新打开即可享受纯中文界面。
