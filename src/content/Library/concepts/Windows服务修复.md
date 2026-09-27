---
title: "Windows 服务修复"
type: concept
tags: [windows, 系统服务, 注册表, 故障排除]
sources: [01-输入/01-Clipings/Windows 无法安装 Codex App？我解决这三个问题才搞定。.md]
last_updated: 2026-05-27
---

## 定义

Windows 系统服务修复方法论，针对因第三方工具锁定、配置错误或网络问题导致的服务无法正常启动的情况。

## 要点

- **DoSvc 服务修复**：Delivery Optimization 服务被 Windows Update Blocker (WUB) 锁定，需删除注册表 WubLock 键值并恢复 Start=3
- **wuauserv 服务修复**：Windows Update 服务宿主地址出错，需补回 wusvcs 服务组配置
- **注册表操作**：需手动修改注册表所有者和权限，命令行方式可能无法生效
- **网络代理**：Microsoft Store 走 CDN 通道与浏览器不同出口，需切换代理节点
- **排查顺序**：证书绕过 → 服务修复 → 网络调整

## 关联连接

- [[Codex_App]] — 应用场景
- [[摘要-Windows安装Codex App问题解决]] — 详细案例
- [[Microsoft_Store]] — Windows 应用商店
