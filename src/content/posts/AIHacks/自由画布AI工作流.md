---
image: null
title: 自由画布AI工作流
published: 2026-06-30
description: 记录一次给朋友电脑安装 Infinite-Canvas 的可复制步骤。
tags:
- AI工具
- 本地部署
- Infinite-Canvas
category: AIHacks
draft: false
pinned: false
---
想把 Infinite-Canvas 安装到朋友电脑上，先别讲 API、模型协议和 ComfyUI。第一目标是让网页能打开。

项目地址
https://github.com/hero8152/Infinite-Canvas/tree/main

![Uploading file...8lx8f]()

第一步，下载项目。朋友会用 Git 的话，打开 PowerShell，进入准备保存项目的目录，例如 `D:\AI-Tools`，执行 `git clone https://github.com/hero8152/Infinite-Canvas.git`。

不会 Git 也没关系，直接在 GitHub 页面点绿色的 `Code`，选择 `Download ZIP`，下载后解压到固定目录，比如 `D:\Infinite-Canvas`。不建议放在微信下载目录或桌面临时文件夹。

第二步，安装依赖。进入项目目录，先看有没有 `python\python.exe`。如果有，说明项目自带 Python，直接双击 `安装依赖.bat`。如果没有，就先安装 Python 3.10 或 3.11，安装时勾选 `Add Python to PATH`，再运行 `安装依赖.bat`。

第三步，启动服务。依赖安装完成后，双击 `run.bat`。正常情况下浏览器会打开 `http://127.0.0.1:3000/`。

能看到页面，就说明本地服务已经跑起来了。API Key、ModelScope、ComfyUI 地址不用提前改代码，进入网页后在左下角设置里填。用在线模型就填请求地址和 key；连本地 ComfyUI 就先启动 ComfyUI，再填本机地址。

常见问题也很集中：3000 端口被占用，就关掉之前的运行窗口；依赖安装失败，多半是网络问题，换网络后重跑；页面打不开，就看运行窗口有没有报错。

一句话总结：先跑起来，再配置模型。能打开网页以后，再按需要填对应配置。
