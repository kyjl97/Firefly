---
title: gemini生成高级封面
published: 2026-05-12
tags: []
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260512011936477.webp
---
最近在推特上找封面相关的提示词，偶然刷到极客杰尼老师的文章，我再整理一下，

流程：主副标题→16:9海报提示词→即梦→图片


### 从 Pinterest 找灵感
https://jp.pinterest.com/search/pins/?q=%E6%96%87%E5%AD%97%E6%8E%92%E7%89%88&rs=typed

```
分析这张图片里的设计元素，比如文字、背景、图标等等，然后帮我提炼出一个“模板提示词”
```

**参考**：

```
A modern dark-themed promotional banner with a pure black background. 
On the right side, flowing silk-like gradient light effects in vibrant orange and electric purple (smooth, dreamy, fluid texture). 
On the left side, bold sans-serif typography: large white headline text "城市猎人" and smaller subtitle text "在钢筋森林中发现新地标" filled with an orange-to-purple gradient. 
A short gradient underline beneath the subtitle. 
At the top, white line-art map pin icons of varying sizes connected by thin curved paths, suggesting urban exploration. 
High contrast, minimalist, tech-inspired, cinematic lighting, 4K, clean composition.
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260512012315542.webp)


---


```
A modern dark-themed promotional banner, pure black background (#000000). 
Right side: large flowing silk-like gradient light effects in [COLOR1] and [COLOR2], smooth, dreamy, fluid texture, soft volumetric glow, occupying about 40% of the frame. 
Left side: bold sans-serif headline "[MAIN_TITLE]" in pure white, heavy weight, clean typography. 
Below headline: smaller subtitle with mixed styling — first half "[SUB_PART1]" in a [COLOR1]-to-[COLOR2] gradient, second half "[SUB_PART2]" in solid [COLOR2]. 
Beneath subtitle: a short horizontal gradient line from [COLOR1] to [COLOR2], [DECORATION_EXTRA]. 
Top area: white line-art [THEME_ICON] icons with subtle [COLOR1] glow accents, connected by thin curved lines, minimalist and tech-inspired. 
High contrast, cinematic lighting, futuristic atmosphere, 4K, left-text-right-glow composition, ultra-clean.
```


![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260512011936477.webp)

---


### 创建图片生成提示词智能体

```
你是海报设计专家，下面是模板提示词，用户每次提供主标题和副标题，你需要分析内容，最终输出完整的提示词，策略性地加入和内容相关的图片装饰，颜色也可以结合内容变化。 

``` 一张具有现代设计感的公众号图片，采用**纯黑色**背景，画面右侧有**红色和青色的模糊渐变**效果，营造出流动、模糊的视觉氛围。画面左侧为文字区域，用**大号粗体无衬线字体**突出显示主标题“**港卡办理**”，并在其下方用**小号细体字体**显示副标题“**众安银行教程**”。**副标题中“众安银行教程”这部分文字的颜色应呈现出与右侧背景渐变色相同的红色到青色的渐变效果。**在副标题的下方，有一条短小的、与右侧背景渐变色相呼应的线条作为点缀。在画面顶部和文字旁边，策略性地加入**几个由发光线条构成的抽象声波和脉冲图标**。海报整体风格极简、现代、科技感十足，构图完美，细节精致。 ```

```



PS.代码快中的内容就是替换的模板

### 快速上手
主副标题→16:9海报提示词→复制粘贴再次发送→图片

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260512005937832.webp)

补充
作者的提供的思路是复制提示词到即梦生成
然后压缩 压缩网站[参照](https://www.iloveimg.com/zh-cn/compress-image)

### 文章来源
https://mp.weixin.qq.com/s/g-uB-TmLD8Jk0P5I-0q_PA
https://x.com/seekjourney/status/1977307327645835478