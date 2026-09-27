---
title: 张咋啦html模板库
published: 2026-05-06
tags:
  - PPT
  - skill
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260506231120270.png
---
> AI 时代的 HTML 幻灯片模板库，让任何 AI Agent 都能为用户生成精美的演示文稿。

GitHub地址
https://github.com/zarazhangrui/beautiful-html-templates

这个项目收集了 32 款精美的 HTML 幻灯片模板，专为 AI Agent 设计。AI 可以根据用户的需求自动选择合适的模板、填充内容，生成可在浏览器中直接演示的 HTML 幻灯片。

## 模板展示

### Vellum【推荐】

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260506231147503.png)

> Deep navy canvas with warm-yellow italic Cormorant serifs and a single dusty teal accent. A quiet, scholarly aesthetic.


### Signal【推荐】

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260506231424868.png)

> Deep navy canvas with bone paper and a single muted-gold accent; institutional with quiet weight.


### Grove【推荐】

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260506231335320.png)

> Forest-green canvas with cream type, classical Playfair serifs, and a single rust accent.



### Soft Editorial

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260506231120270.png)

> Cormorant Garamond serif on warm paper with sage, blush, and lemon accents.

### Stencil & Tablet

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260506231135382.png)

> Bone paper with stencil-cut headlines and a six-color earth palette: archaeology meets brand.



### Monochrome

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260506231216035.png)

> Ivory ledger paper with all-black type; Lora serif headlines, Jost body, no color at all.

### Pink Script — After Hours

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260506231231379.png)

> Black canvas, hot pink accent, pearl-cream paper, Instrument Serif headlines: late-night editorial luxury.

### Blue Professional

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260506231248742.png)

> Cream paper background with electric cobalt blue accents; clean modern professional.

### Broadside

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260506231304455.png)

> Dark editorial canvas with a single fire orange accent and bilingual Latin/Chinese type stack.

### Cartesian

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260506231322239.png)

> Quiet warm-neutral palette with classical Playfair serifs; tasteful and unhurried.



### Mat

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260506231355024.png)

> Dark sage canvas with bone paper and burnt-orange accent; mid-century modern with wood undertones.

### Pin & Paper

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260506231408418.png)

> Yellow paper with safety-pin illustrations, ink-blue handwritten Caveat, paper-grain texture.


### Biennale Yellow

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260506231451296.png)

> Solar yellow on warm parchment with deep indigo serif and atmospheric sun-glow gradients. Dutch-editorial poster energy.

## 使用方式

给 AI Agent 发送以下指令即可自动生成幻灯片：

```
Clone https://github.com/zarazhangrui/beautiful-html-templates and follow the instructions in AGENTS.md to build me a beautiful HTML slide deck.
```

AI 会：
1. 询问你幻灯片的用途和想要的风格
2. 根据你的回答推荐 3 个合适的模板
3. 生成预览让你选择
4. 用你的内容填充模板，生成完整幻灯片

## 已集成到 Skill

我已经将精选模板集成到 Claude Code 的 skill 中，你可以直接使用：

### Skill 1: frontend-slides

位置：`C:\Users\Administrator\AISkills\frontend-slides`

特点：代码生成 + 专业模板（混搭）
- 12 个代码预设（动态生成）
- 14 个专业模板（已集成）
- 支持 PPTX 转 HTML

触发方式：正常使用 `/frontend-slides` 或描述需求

### Skill 2: beautiful-slides

位置：`C:\Users\Administrator\AISkills\beautiful-slides`

特点：纯专业模板
- 14 个精选模板（与 frontend-slides 共享）
- 独立的工作流程
- 专注于模板选择和填充

触发方式：正常使用 `/beautiful-slides` 或描述需求

## 模板对照表

| 模板 | 风格 | 适用场景 |
|------|------|----------|
| **Signal** | 深海军蓝 + 骨纸 + 哑光金 | 投资者 deck、董事会、咨询 |
| **Pin & Paper** | 黄纸 + 手写 Caveat + 安全针 | 研究报告、手工感 |
| **Mat** | 深鼠尾草 + 骨纸 + 焦橙 | 设计工作室、建筑 |
| **Grove** | 森林绿 + Playfair + 锈色 | 可持续、wellness、画廊 |
| **Coral** | 奶油 + 珊瑚 + Bebas Neue | 时尚、健身、杂志 |
| **Cartesian** | 暖中性 + Playfair | 学术、白皮书 |
| **Vellum** | 深蓝 + 暖黄斜体 Cormorant | 研究、学术 |
| **Soft Editorial** | 暖纸 + Cormorant Garamond | 品牌故事、优雅 |
| **Stencil & Tablet** | 骨纸 + 模板切割标题 | 考古、品牌 |
| **Monochrome** | 象牙账本纸 + 全黑字体 | 极简、正式 |
| **Pink Script** | 黑底 + 热粉 + 手写 | 夜店、奢华 |
| **Blue Professional** | 奶油 + 电光蓝 | B2B，专业 |
| **Broadside** | 深色 + 火焰橙 + 中英双语 | 品牌宣言 |
| **Biennale Yellow** | 太阳黄 + 靛蓝 + 氛围渐变 | 艺术、展览 |

## 网站集成

生成的 HTML 幻灯片可以：

1. **直接嵌入** — 通过 iframe 嵌入到你的网站
2. **下载使用** — 下载 HTML 文件自行整合
3. **作为展示页** — 作为独立的演示/作品集页面
