---
title: "摘要 - Windows 安装 Codex App 问题解决"
type: source
tags: [codex, windows, 故障排除]
sources: [01-输入/01-Clipings/Windows 无法安装 Codex App？我解决这三个问题才搞定。.md]
last_updated: 2026-05-27
---

## 核心摘要

- **问题背景**：Windows 用户安装 OpenAI Codex App 桌面版时遇到 Microsoft Store 打不开、安装无反应、winget 报错等问题
- **第一个坑：DoSvc 服务被锁**：Windows Update Blocker (WUB) 类工具在注册表写入 WubLock 标记，导致 Delivery Optimization 服务无法启动，需手动删除注册表键值并恢复启动类型
- **第二个坑：wuauserv 宿主地址出错**：系统优化脚本误删了 wuauserv 服务组配置，导致 Windows Update 服务找不到宿主，需补回 wusvcs 组配置
- **第三个坑：网络代理节点**：Microsoft Store 走 CDN 通道与浏览器不同出口，需切换代理节点（如从美国改为香港）
- **关键经验**：AI 工具可解决 98% 问题，但手动注册表修改和网络调整仍需人工判断

## 关联连接

- [[Codex_App]] — OpenAI 桌面应用产品
- [[Windows服务修复]] — Windows 系统服务修复方法论
- [[Microsoft_Store]] — Windows 应用商店
