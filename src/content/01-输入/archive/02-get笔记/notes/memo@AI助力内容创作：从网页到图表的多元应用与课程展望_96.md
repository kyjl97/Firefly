---
title: "AI助力内容创作：从网页到图表的多元应用与课程展望"
created: 2025-03-20 20:58:26
source: "[【教程】必须收藏的 4 段 Prompt 提示词，生成PPT、生成3D动画，生成网站，生成万物...](https://mp.weixin.qq.com/s/TwXiFFWKGYYj1Oubvwf7Sw)"
tags:
  - AI链接笔记
  - AI内容创作
  - 提示词
  - 网页生成
---

![](<01-输入/02-get笔记/get attachment/8d5bfff10c45ed1fcb42aec6b6997633.jpeg>)
💡 **创意灵感来源**
- 好友@歸藏给出从前端和设计角度出发的提示词，要求Claude Sonnet 3.7模型用现代网站开发常用组件库，将任何内容转换成精美单页HTML，此思路很靠谱，给AI限定最佳实践框架能让内容生成更可控。
🎨 **生成网页效果展示**
- 三五环最新一期播客、《原则》书摘都能生成对应风格的网站，体验地址分别为[https://www.qiaomu.ai/demo/25031502.html](https://www.qiaomu.ai/demo/25031502.html) 等。
- 支持Claude Sonnet 3.7或3.7 Thinking模型的AI工具都可用于生成，实际测试POE和Raycast AI在稳定性和生成质量上更优，AI编程工具超一定代码行数会报错，Raycast推荐购买地址为[https://raycast.com/?via=joe-seesun](https://raycast.com/?via=joe-seesun) 。
- 作者在歸藏提示词基础上迭代出V3版提示词，对设计目标、指导、技术规范等都有详细要求。
🧬 **脑洞发散应用**
- **3D动画生成**：用ThreeJS代码库，AI能生成如「精酿啤酒」工艺演示、北京四合院结构演示等3D动画，还有大模型原理、巧克力制作等更多3D演示，作者调试后给出特定提示词。
- **AI生成海报**：给AI提示词和文章可自动生成海报，但效果不够稳定，当前提示词对内容、设计风格、技术规范等多方面有要求，生成后可在[https://www.svgviewer.dev/](https://www.svgviewer.dev/) 查看。
- **AI生成网页PPT**：指定RevealJS库，给定主题或内容可自动生成动态交互PPT，提示词对设计目标、指导、技术规范、RevealJS特性运用等都有详细说明。
- **AI生成Mermaid图表**：把文章发给AI，用特定提示词可生成Mermaid图，如示例文章生成的图，用Deepseek V3就能实现。
📚 **课程展望**
- 作者认为越是模型进步，越需要精准控制的Prompt Engineering技术。
- 作者和好友@姚金刚老师正在做一套AI学习平台，预计月底上线，首套课程教Prompt Engineering，开发前与宝玉、李继刚老师打过招呼，上线前会邀请他们Review点评，感兴趣可关注公众号回复“课程”获取首批内测资格。