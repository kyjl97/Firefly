---
title: kami
published: 2026-05-03
tags:
  - skill
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260503212707072.webp
---
AI生成文档最大的问题不是内容差，而是排版千篇一律的灰色平庸。

Kami（紙）是一个面向AI Agent的文档排版设计系统，用一套约束语言让每份输出都像专业印刷品。

**项目地址**：https://github.com/tw93/kami

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260503212707072.webp)


### 它能做什么

Kami 内置6种文档模板

覆盖日常办公场景：

- **One-Pager** — 一页纸方案 / 执行摘要
- **Resume** — 简历，结构化输出
- **Slides** — 幻灯片，支持导出PDF/PPTX
- **Long Doc** — 白皮书 / 技术报告
- **Letter** — 正式信件 / 推荐信
- **Portfolio** — 作品集

设计风格统一：暖色羊皮纸底 `#f5f4ed`、墨蓝强调色、衬线字体层级，装完不用配置，自然语言直接触发。

### 安装命令

**Claude Code 一行命令**：
```
npx skills add tw93/kami -a claude-code -g -y
```

**Claude Desktop**：下载 kami.zip，在「自定义 > Skills」上传即可。

### 使用示例

装完后不需要记命令，直接说人话就行：

| 你说                                         | Kami 自动做什么                                                      |
| ------------------------------------------ | --------------------------------------------------------------- |
| 帮我做一份简历                                    | 生成暖色排版的PDF简历                                                    |
| 做一个一页纸公司介绍                                 | 输出专业单页方案                                                        |
| 把这份研究做成演示幻灯片                               | 6页幻灯片，可导出PDF                                                    |
| 帮我写一封正式推荐信                                 | 衬线字体信件模板                                                        |
| 把我的项目做一份作品集                                | Portfolio多页展示                                                   |

**再比如，我对 Agent 直接说了句**：「把 Kami 技能里的配色提取出来，应用到我的博客中」。

几秒钟后，博客的主色、背景色、强调色全部换成了 Kami 那套暖色羊皮纸风格，标题用了墨蓝衬线，正文间距也跟着调整了——一句话搞定整站视觉统一。

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260503213507841.webp)


作者 Tw93 是淘宝前端工程师，他是从每次让Claude写美股研报时受不了默认排版开始，一步步提炼出这套设计约束。

Kami 是 Kaku（写代码）、Waza（练技能）、Kami（做文档）三部曲的最后一环。

