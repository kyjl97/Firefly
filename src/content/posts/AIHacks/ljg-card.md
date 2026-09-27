---
title: ljg-card
published: 2026-03-01
tags:
  - skill
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/MiMo_长图.webp
---

ljg-card 是一个将内容铸造成 PNG 信息卡片的技能。输入文字或链接，输出高质量的视觉卡片。

技能地址：https://github.com/lijigang/ljg-skills/tree/master/skills/ljg-card

### 目录结构

```
~/.claude/skills/ljg-card/
├── SKILL.md                        # 技能主文件，参数说明、执行流程
├── package.json                    # Node.js 依赖配置
├── assets/
│   ├── capture.js                  # 截图工具（Playwright 截取 HTML → PNG）
│   ├── logo.png                    # 品牌头像（footer 使用）
│   ├── long_template.html          # 长图模具模板
│   ├── infograph_template.html     # 信息图模具模板
│   ├── poster_template.html        # 多卡/海报模具模板
│   ├── sketchnote_template.html    # 视觉笔记模具模板
│   ├── comic_template.html         # 漫画模具模板
│   └── whiteboard_template.html    # 白板模具模板
├── references/
│   ├── taste.md                    # 设计品味准则（全模具通用）
│   ├── mode-long.md                # 长图模式执行步骤
│   ├── mode-infograph.md           # 信息图模式执行步骤
│   ├── mode-poster.md              # 多卡/海报模式执行步骤
│   ├── mode-sketchnote.md          # 视觉笔记模式执行步骤
│   ├── mode-comic.md               # 漫画模式执行步骤
│   └── mode-whiteboard.md          # 白板模式执行步骤
└── tmp/                            # 临时文件目录（生成的 HTML 和截图）
```

### 模具总览

技能内置六种模板（模具），每种对应不同的视觉风格和使用场景：

| 参数 | 模具名称 | 尺寸 | 说明 |
|------|---------|------|------|
| `-l`（默认） | 长图 | 1080 × auto | 单张阅读卡，内容自动撑高 |
| `-i` | 信息图 | 1080 × auto | 内容驱动的自适应视觉布局 |
| `-m` | 多卡 | 1080 × 1440 | 固定 3:4 比例，超出内容自动切分为多张 |
| `-v` | 视觉笔记 | 1080 × auto | 手绘风格 sketchnote，动态选择风格路线 |
| `-c` | 漫画 | 1080 × auto | 日式黑白漫画风格，动态选择漫画家视觉语言 |
| `-w` | 白板 | 1080 × auto | 白板马克笔风格，结构化框图 + 箭头 + 彩色标记 |

宽度全部固定 1080px，适配手机端阅读。高度方面只有多卡（-m）固定 1440px（3:4 比例），其余五个由内容量自动决定。

### 输入方式

| 输入方式 | 处理方式 |
|---------|---------|
| URL 链接 | 自动抓取网页内容 |
| 粘贴文本 | 直接使用 |
| 文件路径 | 读取文件内容 |

### 长图（-l）

单张阅读卡，适合文章摘要、读书笔记等场景。内容从上到下自然排列，高度随内容自动撑高。

![MiMo_长图.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/MiMo_长图.webp)

### 信息图（-i）

数据驱动的视觉布局，适合产品介绍、数据对比等场景。没有默认布局，视觉形式从内容的形状中生长出来，支持稀 / 中 / 密三种信息密度。

![MiMo_信息图.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/MiMo_信息图.webp)

### 多卡/海报（-m）

固定 1080 × 1440（3:4 比例），内容超出时自动切分为多张卡片。适合需要严格尺寸控制的场景，如社交媒体封面、活动海报等。

![MiMo_多卡.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/MiMo_多卡.webp)

### 视觉笔记（-v）

手绘风格的 sketchnote，概念之间用箭头连接、关键词被圈出、旁边有简笔画。支持多种风格路线：

- **火柴人叙事** — 大号手写标题 + 火柴人 SVG + 色块分区
- **概念地图** — 混合字号手写 + 图标化概念 + 箭头连线网络
- **餐巾纸草图** — 极简线条 + 大量留白 + 一个核心图解
- **概念拼贴** — 主视觉占半幅 + 文字围绕 + 视觉隐喻

![MiMo_视觉笔记.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/MiMo_视觉笔记.webp)

### 漫画（-c）

日式黑白漫画风格，用分格节奏、黑白对比、集中线和留白制造戏剧性。支持多种漫画家风格：

- **大友克洋 — 精密废墟** — 极细线条密集排列、机械细节、灰阶丰富
- **井上雄彦 — 水墨留白** — 大面积留白、墨色浓淡渐变、极简构图
- **三浦建太郎 — 暗黑压迫** — 大面积纯黑、极高对比、压迫感强
- **松本大洋 — 生猛粗线** — 粗细不均的线条、不规则构图、能量感
- **谷口治郎 — 静谧精描** — 建筑级精细线条、银盐照片般的灰阶

![MiMo_漫画.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/MiMo_漫画.webp)

### 白板（-w）

推理过程的可视化——思路展开的痕迹，以日系余白为呼吸。支持多种风格：

- **逻辑链** — 横向推理链 + 纵向层级 + 黄色关键词
- **脑暴墙** — 核心词居中 + 放射状分支 + 色块便签
- **时间线** — 纵向时间轴 + 节点 + 旁注
- **矩阵分析** — 2×2 或多格矩阵 + 象限标签

![MiMo_白板.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/MiMo_白板.webp)


