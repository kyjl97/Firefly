---
title: "摘要 - 用 Cursor 做 AI 字幕校对工具"
type: source
tags: [字幕, cursor, 剪映, api]
sources: [01-输入/03-微信/用 Cursor 搞了个AI字幕校对的工具，处理剪映字幕识别不准确的问题.md]
last_updated: 2026-05-27
---

## 核心摘要

- **核心问题**：剪映字幕自动识别错别字多，HeyGem 数字人动辄几分钟音频逐句检查崩溃
- **模型选型踩坑**：硅基流动智普 9B 不能完整匹配时间点；DeepSeek R1 非流式输出超时断连；火山引擎需指定地区节点 API（`ark.cn-beijing.volces.com`）
- **最终方案**：使用豆包 1.5 Pro 模型，性价比优于 DeepSeek R1
- **工具流程**：剪映导出 SRT → 上传 SRT + 口播稿到网站 → 大模型校对 → 下载修正 SRT → 重新导入剪映
- **经验教训**：Cursor 开发调 API 时应给官方文档做参考；先在各家大模型广场测试能力再选型
- **Token 消耗大**：带格式字幕每个符号/字符都占 1 Token，消耗量远高于普通中文文本
- **工具地址**：subtitle-edit.com

## 关联连接

- [[AI字幕校对]] — 字幕自动校对方法论
- [[videocut-skills]] — 更成熟的字幕自动化方案
- [[火山引擎ASR]] — 语音识别服务
