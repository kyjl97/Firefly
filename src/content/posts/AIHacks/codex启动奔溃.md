---
title: codex启动奔溃
published: 2026-06-10
tags: []
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/dc54be601b8edb2fb49406fd55838454.webp
---
Codex 桌面版（Windows App）启动时崩溃，错误信息：


**如下图所示：**
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/dc54be601b8edb2fb49406fd55838454.webp)


### 根本原因

**Astrill VPN 的 LSP（Layered Service Provider，分层服务程序）导致。**

Astrill 安装时会往 Windows 网络栈里插入一个名为 **ASProxy**（ASProxy64.dll / ASProxy.dll）的 LSP 组件。这个 LSP 会被注入到所有网络进程中，包括 Codex 的 app-server，触发 aws-lc-rs 加密库初始化崩溃。

**你的网络像一条快递传送带：**
- 正常情况：包裹（网络数据）从程序 → 传送带 → 网卡 → 互联网
- 装了 Astrill 后：Astrill 在传送带中间**硬塞了一个自己的检查站**（LSP），每个包裹都要经过它
- 这个检查站（ASProxy.dll）在某些 CPU/系统组合下会"卡死崩溃"，导致 Codex 启动失败


### 解决方案

重置 Winsock，清除第三方 LSP（含 Astrill 的 ASProxy），将网络栈恢复为 Windows 默认状态。

如需远程协助，可通过向日葵或 ToDesk 远程处理。加**GitHub: https://github.com/kyjl97


