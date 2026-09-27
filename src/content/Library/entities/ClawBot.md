---
title: "ClawBot"
type: entity
tags: [微信, bot, 协议]
sources: [01-输入/01-Clipings/在微信里使用 Claude Code，刚刚在 GitHub 上开源了这个 Skill 。.md]
last_updated: 2026-05-27
---

## 定义

微信 Bot 协议实现，提供微信消息收发的底层协议支持，包括 HTTP 长轮询、AES 加密、扫码认证、CDN 媒体传输。

## 核心能力/特点

- HTTP 长轮询接收消息
- AES 加密处理消息安全
- 扫码认证登录机制
- CDN 上传下载媒体文件
- 微信官方开放的 Bot 插件协议
- 包名为 `@tencent-weixin/openclaw-weixin`

## 关联连接

- [[摘要-微信使用Claude Code]] — 使用 ClawBot 协议的案例
- [[wechat-claude-code]] — 基于 ClawBot 协议的项目
- [[OpenClaw]] — ClawBot 的上层框架
