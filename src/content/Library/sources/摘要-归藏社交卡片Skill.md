---
title: "摘要 - guizang-social-card-skill：Claude Code / Codex 图文卡片技能"
type: source
tags: [skills, 社交卡片, 小红书, 公众号, Claude Code, Codex]
sources: [01-输入/03-微信/GitHub - op7418-guizang-social-card-skill- 🪧 Claude Code - Codex skill — generate Xiaohongshu car....md]
last_updated: 2026-05-29
---

## 核心摘要

- **定位**：归藏出品的 Claude Code / Codex Agent 图文卡片技能，从文章、文案、截图、产品笔记、字幕或照片生成小红书图文组图与公众号 21:9 + 1:1 封面对
- **双视觉系统**：电子杂志风（Editorial，16 个版式骨架，适合叙事/生活方式/旅行）+ 瑞士国际主义（Swiss，12 个版式骨架，适合产品测评/数据/教程/AI 工具）
- **核心能力**：28 个版式骨架、10 套主题预设（Editorial 6 + Swiss 4）、3 个画板尺寸（小红书 3:4 / 公众号 21:9 / 公众号 1:1）、WebGL 墨流背景、图片底图遮罩 + 人脸避让、MapLibre 地图组件
- **技术方案**：单文件 HTML + Playwright 渲染出 PNG，不需要前端构建链，Agent 可直接写/读/改/验证
- **校验脚本**：validate-social-deck.mjs 基于 Playwright 真实 DOM 测量，6 条规则（溢出/字号/密度/footer碰撞/帧溢出/瑞士规范）
- **安装**：`npx skills add https://github.com/op7418/guizang-social-card-skill --skill guizang-social-card-skill`
- **11 个小红书品类适配**：端到端强势（旅行/职场/推荐）、文与结构强势（游戏/影视/美食/健身/家居/穿搭）、能力圈外主动说明
- **设计原则**：克制优于喊话、结构优于装饰、版式优于自由、图片优先用户的、越大越细、默认不自动核查
- **与 guizang-ppt-skill 的关系**：PPT 解决横向翻页演讲，Social Card 解决静态信息流图文，共享美学语言但独立维护

## 关联连接

- [[guizang-social-card-skill]] — 实体页面
- [[guizang-ppt-skill]] — 姐妹项目，共享美学语言
- [[Claude_Code]] — 支持的 Agent 环境
- [[Codex_App]] — 支持的 Agent 环境
- [[Claude-Code-Skills生态]] — Skills 生态的一部分
