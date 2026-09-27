---
title: 宝玉文章封面&配图技能改造
published: 2026-05-17
tags:
  - skill
  - AI配图
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cshoutu.webp
---
我写公众号文章，有两件事是刚需：**文章内配图**和**封面图**。

之前这两个需求分别用两个不同的技能来满足——`baoyu-article-illustrator` 负责给正文配图，封面则靠手动折腾。最近我把它们统一到了同一个生图后端上，整个流程顺畅了不少。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cshoutu.webp)


### 先说起因

`baoyu-article-illustrator` 是个开源的文章自动配图技能，核心逻辑很清晰：分析文章结构 → 找到需要插图的位置 → 根据内容生成配图 prompt → 调用图片后端渲染 → 写入文章。

流程设计得不错，但它默认的生图后端有两个问题：一是生成的图片右下角强制附加「图片由 AI 生成」水印且无法关闭；二是图片只存本地相对路径，没法直接用于公众号。

**因此，我做了两件事。**

### 改造baoyu-article-illustrator

 **换后端**：

把原生图像生成替换成了 **GPT-Image-2**（[Apimart](https://apimart.ai/register?aff=QVui) 提供的第三方 API）。这个模型无水印、支持 16:9 横版、分辨率最高 4K，价格是 **$0.005/张**——一美元能生成 200 张图，一篇公众号配 3~4 张图成本不到两毛钱。

PS.Apimart 是一个第三方 API 平台，除了 GPT-Image-2 还支持各种模型调用。我用了这段时间，速度和稳定性都不错，性价比很高。注册送额度，可以先试用再决定：[apimart.ai/register?aff=QVui](https://apimart.ai/register?aff=QVui)

![成本优势](https://gitee.com/da-qiang-classmate/typora/raw/master/image/03-scene-cost-warm.webp)
调用方式是异步的：提交 prompt → 拿到 task_id → 轮询状态 → 下载图片。我封装了一个 Python 小脚本 `gpt_image2_gen.py`，传 prompt 和输出路径就行，轮询和下载全自动。

然后把这个脚本正式注册进了技能的后端选择体系里——在 SKILL.md 的 `## Image Generation Tools` 段落新增了 `gpt-image-2` 作为可选后端，优先级排在 Codex imagegen 之后。项目级 EXTEND.md 里把 `preferred_image_backend` 直接锁定为 `gpt-image-2`，以后调用配图技能就自动走这条管线，不用每次手动指定。

**加自动上传**：

原来的流程到「把图片写入文章」就结束了，图片路径还是本地的。我在 Step 6 后面新增了 **Step 7: Upload to PicGo & Replace URLs**——图片生成完后自动 POST 到本地 PicGo Server（端口 36677），上传到 Gitee 图床，然后把文章里的本地路径替换成在线 URL。整条管线跑完，文章里的图片引用直接就是可访问的在线地址。

![改造前后对比](https://gitee.com/da-qiang-classmate/typora/raw/master/image/01-scene-before-after.webp)

### 创建一个封面技能

正文配图解决了，但封面图还是个痛点。市面上的方案要么不够灵活，要么风格不可控。于是我从零写了 **article-cover-16x9**——一个专门生成 16:9 封面图的技能。

它的工作方式很简单：你给它一篇文章（或一段文本），它会提炼出主标题、副标题和一个视觉隐喻，构造一张电影感封面的 prompt，然后调用生图 API 渲染出来。输出默认保存到桌面，同时附带一份 `.prompt.md` 记录文件，方便二次修改。

关键决策是：**封面技能也复用 GPT-Image-2 这个 API**。同一个脚本、同一份 API Key、同一个无水印后端。这样两个技能共享同一套基础设施，维护成本低，账单也只有一份。

### 现在的样子

两条管线走的是同一个引擎：

![双管线流程图](https://gitee.com/da-qiang-classmate/typora/raw/master/image/02-infographic-dual-pipeline.webp)

```
baoyu-article-illustrator → 分析文章 → 生成配图 prompt → GPT-Image-2 → PicGo 上传 → 在线 URL
article-cover-16x9       → 提炼标题 → 构造封面 prompt → GPT-Image-2      → 桌面 PNG
```

说一句话，正文配图和封面图都搞定了。中间不需要手动切换后端、不需要处理水印、不需要手动上传图床。

 一美元 200 张图，一个月重度使用不到六块钱。换来的是每篇文章都有干净、高质量、风格统一的原创配图。

以上，既然看到这里了，如果觉得不错，随手点个赞、在看、转发三连吧，如果想第一时间收到推送，也可以给我个星标⭐～
谢谢你看我的文章，我们，下次再见。

/ 作者：得救之道
/ 更多干货，请访问：kyjl97.github.io


