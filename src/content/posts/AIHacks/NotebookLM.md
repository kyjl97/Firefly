---
title: NBLM指南
published: 2026-03-23
tags:
  - AI
  - chrome插件
  - skill
  - 工作流
  - 软件推荐
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260323071304352.webp
---
NotebookLM 是一个只根据你输入的信息思考的人工智能。 它不像 ChatGPT 那样引用整个互联网的信息，而是读取并回答“只提供你给我的材料”。

在咨询通用人工智能关于职业相关事务时，它可能会检测到年龄、工作类型和背景等负面因素，并无意中给出严厉的评价。 NotebookLM 不用担心这些。 他们只会给你你想要申诉的信息，所以他们只会考虑。

因此，你输入的信息质量和数量，将决定结果的质量。

我有时听到有人说，“我试过用它，但效果不好。” 通常是因为你输入的信息太少。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260323071304352.webp)


### 去水印
https://www.notebooklmwatermark.com/
支持小于等于50Mb大小的PDF文件。

https://geminiwatermarkremover.net
PDF去水印。

https://clean.lazyso.com/notebooklm/
信息图去水印



### 相关Chrome插件

| 插件名字                                                                                                                                                                       | 作用                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [**YouTube to NotebookLM**](https://chromewebstore.google.com/detail/youtube-to-notebooklm/kobncfkmjelbefaoohoblamnbackjggk?hl=zh-CN)                                      | 将导入YouTube视频的步骤从繁琐的6步简化为2步，在视频下方直接提供专属快捷按钮，无需复制链接即可一键导入。                   |
| [**NotebookLM Web Importer**](https://chromewebstore.google.com/detail/notebooklm-%E7%BD%91%E9%A1%B5%E5%AF%BC%E5%85%A5%E5%99%A8/ijdefdijdmghafocfmmdojfghnpelnfn?hl=zh-CN) | 专门用于将全网的优质图文网页、干货文章快速添加并转换为NotebookLM的资料库。                                 |
| [**Bookshelf**](https://chromewebstore.google.com/detail/bookshelf%EF%BC%9Anotebooklm-%E6%96%87%E4%BB%B6%E5%A4%B9%E7%AE%A1/ibjbgddbhlcookmdhehgljaneccjidik?hl=zh-CN)      | 解决笔记本过多导致的杂乱问题，支持通过拖拽将笔记本归类到不同的文件夹（如工作、学习等），并能在不同笔记本之间作为快捷导航一键跳转。          |
| [**Kortex**](https://chromewebstore.google.com/detail/kortex-notebooklm/hdapplggdhndkblofffknpmnnnnbncbn?hl=zh-CN)                                                         | 作为笔记本里的内容管家，支持一键保存网页内容（包括ChatGPT等AI工具的聊天记录）、自动按格式分类信息源，并支持批量导出信息源和生成的对话内容。 |
| [**NotebookLM MindMap Exporter**](https://chromewebstore.google.com/detail/notebooklm-mindmap-export/jeaclciaoglkeohcfeobijdojpclkmkb?hl=zh-CN)                            | 解决系统自带思维导图生成后无法编辑的致命短板，支持将其复制或导入到专业工具中，从而自由修改、移动节点进行二次创作。                  |
| [**NotebookLM Ultra Exporter**](https://chromewebstore.google.com/detail/notebooklm-ultra-exporter/afchokljnhhggkhedfbmkcmdagjmjchj?hl=zh-CN)                              | 补齐原生界面缺乏快捷导出按钮的缺陷，支持对笔记、PPT、图表、博客等各类内容进行一键导出，且导出格式自由、支持批量灵活导出。             |
| [**NotebookLM Source Helper**](https://chromewebstore.google.com/detail/notebooklm-source-helper/mdmenpppkndcjiojaclnlceegloooeip?hl=zh-CN)                                | 专为满足去水印的核心需求而设计，上传下载好的PDF文件后，可一键去除演示文稿（PPT）右下角自带的NotebookLM系统水印，方便工作汇报和演示。 |
| [Web Clipper for NotebookLM](https://chromewebstore.google.com/detail/web-clipper-for-notebookl/ancgeemmgnlempppapnfkdpghghphgjb)                                          | 一键把网页、文章、研究报告剪藏到NotebookLM,帮你快速搭建高质量的资料库。                                  |


### 相关 skill 技能

- notebooklm-py：[项目地址](https://github.com/teng-lin/notebooklm-py)  用法：[点此打开](https://jieliu.me/article/details/159020470)
让Claude code操作notebooklm

- [qiaomu-anything-to-notebooklm](https://github.com/joeseesun/qiaomu-anything-to-notebooklm)
用自然语言把**任何内容**变成**任何格式**。自动检测并绕过 300+ 付费新闻网站的付费墙。

- 自己创建skill
每次 notebooklm-mcp前先阅读我的个人介绍，我希望你每次创建完笔记本后，间隔5到10分钟，能够自动将搜索来源的信息进导，省去我额外动操作的步骤。请将这个要求更新到notebooLMk的skills面。

- notebooklm-mcp
https://github.com/PleasePrompto/notebooklm-mcp
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260521155602282.webp)


```
我是一个完全零基础的AI小白，希望从几个不同维度学习AI，既能赶上时代潮流，也能在未来从事相关工作。结合2026年AI发展的趋势，请为我推荐3到4个必须彻底掌握的具体领域，以及1到2个未来需要进阶的潜在领域。请给出这5个不同方向的主题，并分别做出简要解释。
```


```
请针对这5个主题，在NotebookLM上分别创建5个涵盖不同领域的独立笔记本。针对每个主题，都要使用其“源文件”（Sources）功能，并确保每个笔记本都包含内容丰富、来源多样的资料。同时，请务必注意信息的时效性与可靠性。
```

```
帮我将你搜集到的内容全部自动导入到各自的笔记本里面，并且针对每一个笔记本都帮我制作一张信息图，并把链接也发过来让我可以直接点击
```

```
帮我检查NotebookLM的全部内容，然后在左侧帮我创建一份说明件，我需要概了解这些笔记本包含哪些内容及其来源。
```

```
我目前比较关注AI医疗行业。同时我对AI硬件AI漫具等方向也非常的感兴趣。我每天可以拿出两个时时间学习AI，请根据我nbookLM里面的内容，帮我制定一个一个月的学习计划，包含我一定需要看到的youtube链接，并且我需要你帮我筛选一下视频的质量。我需要发布时间在6个月以内播放量在1万以上的视频。同时请直接在左侧的项目中帮我创建这份计划书。
```

```
根据我从NotebookLM中提取的内容，这份以及这份学习计划，帮我创建一个可以交互的落地页，我需要简单的功能是可以进学习进度的追踪，自由标记我的学习进度，页UI要好看，内部链接点击可以直接跳转。另外，有完善动画，登录界面，一键部署github，部署Vercel。搞完直接使用内部的浏览器帮我打开我要测试一下功能
```

```
帮我把这个文件上传到notebooklm里面，新建一个名为品牌指南的笔记本保存进去。@xxx.MD
```

```
我需要你调用notebooklm mcp，帮我找到关于品牌设计的笔记本，然后按照那份文件的要求重新设计当前落地页的ui界面，然后使用内部的浏览器帮我打开我要看下
```
### 相关提示词

PPT
```
请根据我《红楼梦》课表的全部内容，成份约30到45页的PPT纲。
我希望你完全根据我的课程内容、主题等元素进设计，要求重点明确。同时，PPT的设计格、样式及配图，请参考“戴敦邦新绘全本红楼梦”的艺术格。
```
保存为笔记，作为来源。


3D风格ppt
```
你是一位专家级UI UX演示设计师，请生成高保真、未来科技感的16比9演示文稿幻灯片。请根据视觉平衡美学，自动在封面、网格布局或数据可视化中选择一种最完美的构图。 全局视觉语言方面，风格要无缝融合Apple Keynote的极简主义、现代SaaS产品设计和玻璃拟态风格。整体氛围需要高端、沉浸、洁净且有呼吸感。光照采用电影级体积光、柔和的光线追踪反射和环境光遮蔽。配色方案选择深邃的虚空黑或纯净的陶瓷白作为基底，并以流动的极光渐变色即霓虹紫、电光蓝、柔和珊瑚橙、青色作为背景和UI高光点缀。 关于画面内容模块，请智能整合以下元素： 1. 排版引擎采用Bento便当盒网格系统，将内容组织在模块化的圆角矩形容器中。容器材质必须是带有模糊效果的磨砂玻璃，具有精致的白色边缘和柔和的投影，并强制保留巨大的内部留白，避免拥挤。 2. 插入礼物质感的3D物体，渲染独特的高端抽象3D制品作为视觉锚点。它们的外观应像实体的昂贵礼物或收藏品，材质为抛光金属、幻彩亚克力、透明玻璃或软硅胶，形状可是悬浮胶囊、球体、盾牌、莫比乌斯环或流体波浪。 3. 字体与数据方面，使用干净的无衬线字体，建立高对比度。如果有图表，请使用发光的3D甜甜圈图、胶囊状进度条或悬浮数字，图表应看起来像发光的霓虹灯玩具。 构图逻辑参考： 如果生成封面，请在中心放置一个巨大的复杂3D玻璃物体，并覆盖粗体大字，背景有延伸的极光波浪。 如果生成内容页，请使用Bento网格布局，将3D图标放在小卡片中，文本放在大卡片中。 如果生成数据页，请使用分屏设计，左侧排版文字，右侧悬浮巨大的发光3D数据可视化图表。 渲染质量要求：虚幻引擎5渲染，8k分辨率，超细节纹理，UI设计感，UX界面，Dribbble热门趋势，设计奖获奖作品。
```

```
这本书的核心论点是什么？用2句话清楚地说出来。然后列出5个最强的支持观点。
```

```
将每一章浓缩成一年后值得记住的核心观点。
```

```
将整本书转化为我在接下来30天内可以实施的10个具体行动。要具体且可衡量。
```

```
审视所有文档后，识别缺口。具体：1)重要子主题未覆盖，2)缺少何种文献，3)哪些结论证据不足，4)需添加5个什么类型源使研究无懈可击？
```

```
提供：1)所有文档的3个核心主题，2)哪些地方一致/矛盾，3)最惊人的发现，4)文档提出但未完全回答的关键问题。
```

### 联动Gemini

这是一个极少人知道的隐藏神技，你可以把NotebookLM整理好的知识直接变成一个网站或App

在Gemini中直接添加NotebookLM作为文件来源，你的整个知识库就会进入Gemini

```
建构一个网站来可视化我的内容，使用日系极简风格
```

### 参考资料
NotebookLM+Antigravity手把手教你开启上帝视角（插件Office Viewer）
https://www.bilibili.com/video/BV1EDcSzxErw/?spm_id_from=333.1387.favlist.content.click&vd_source=206031f494850e57fd6c92ace02b1bed
https://www.biji.com/mine/notes/WPKWeqx2wyV6g4QP
## 写在最后

当NotebookLM 把 1 小时的学习压缩到 15 分钟，把 3 天的调研缩短到 1 小时，效率差距已不再是努力程度，而是工具选择。从学生到科研人员，从产品经理到内容创作者，这款被《巴伦周刊》称为 “生成式 AI 杀手级应用” 的工具，正在重构知识工作的底层逻辑。现在登录 Google 账号即可免费体验，你的 10 倍效率革命，从上传第一份文档开始。
