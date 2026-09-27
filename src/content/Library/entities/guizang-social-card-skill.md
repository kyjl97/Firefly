---
title: "guizang-social-card-skill"
type: entity
tags: [skills, 社交卡片, 设计, html, Claude Code, Codex]
sources: [01-输入/03-微信/GitHub - op7418-guizang-social-card-skill- 🪧 Claude Code - Codex skill — generate Xiaohongshu car....md]
last_updated: 2026-05-29
---

## 定义

归藏出品的 Claude Code / Codex Agent 图文卡片技能，生成小红书图文组图与公众号封面对，guizang-ppt-skill 的姊妹项目。

## 核心能力/特点

- **双视觉系统**：电子杂志风（Editorial）+ 瑞士国际主义（Swiss），共用一份工作流
- **28 个版式骨架**：Editorial 16 个（M01-M16）+ Swiss 12 个（S01-S12）
- **10 套主题预设**：Editorial 6 套（墨水经典/靛蓝瓷/森林墨/牛皮纸/沙丘/午夜墨）+ Swiss 4 套锚点色（IKB Klein Blue/柠檬黄/柠檬绿/安全橙）
- **3 个画板尺寸**：小红书 3:4（1080x1440）、公众号 21:9（2100x900）、公众号 1:1（1080x1080）
- **技术方案**：单文件 HTML + Playwright 渲染 PNG，Agent 可直接写/读/改/验证
- **校验脚本**：validate-social-deck.mjs，6 条 Playwright 真实 DOM 测量规则
- **图源工作流**：用户图优先，无图时按 Unsplash → Pexels → Flickr CC → Wallhaven → 直接搜索取图
- **安装**：`npx skills add https://github.com/op7418/guizang-social-card-skill --skill guizang-social-card-skill`
- **GitHub**：`github.com/op7418/guizang-social-card-skill`
- **协议**：AGPL-3.0

## 关联连接

- [[guizang-ppt-skill]] — 姐妹项目，共享美学语言，PPT 解决横向翻页，Social Card 解决静态图文
- [[Claude-Code-Skills生态]] — Skills 生态的一部分
- [[摘要-归藏社交卡片Skill]] — 详细来源摘要
