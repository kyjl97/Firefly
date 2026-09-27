---
title: "微信 Bot 协议"
type: concept
tags: [微信, bot, 协议, agent]
sources: [01-输入/01-Clipings/在微信里使用 Claude Code，刚刚在 GitHub 上开源了这个 Skill 。.md]
last_updated: 2026-05-27
---

## 定义

微信官方开放的 Bot 插件协议，允许第三方 AI Agent 通过标准化接口接入微信，实现消息收发和媒体传输。

## 要点

- **协议组成**：HTTP 长轮询收消息、AES 加密处理、扫码认证、CDN 媒体传输
- **包名**：`@tencent-weixin/openclaw-weixin`
- **扩展性**：任何 Agent 都能基于协议写对接层接入微信
- **应用场景**：AI 助手、自动化工作流、智能客服
- **技术门槛**：需要理解协议细节，但有开源实现可参考

## 关联连接

- [[ClawBot]] — 协议实现
- [[wechat-claude-code]] — 基于协议的项目
- [[摘要-微信使用Claude Code]] — 详细案例
- [[OpenClaw]] — 上层框架
