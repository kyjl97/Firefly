---
title: API封装Skill
published: 2025-11-30
description: 最近被阿里巴巴通义MAI的Z-Image狠狠圈粉，不仅搭载了高效的 Z-Image-Turbo 模型，更关键的是每天能免费生 2000 张图，不管是生成文章视频...
tags:
  - 效率工具
  - Claude
  - API
draft: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260114235919010.webp
category: Workflow
---
最近被阿里巴巴通义MAI的Z-Image狠狠圈粉，不仅搭载了高效的 **Z-Image-Turbo** 模型，更关键的是**每天能免费生 2000 张图**，不管是生成文章视频封面还是异常创作，这个配额都完全够用。



恰巧这段时间我正在研究 Claude 的 Skills 功能，于是就萌生了一个想法：**把 Z-Image 的免费生图能力和 Claude Skills 结合起来**，做一个专属生图 Skill，通过自然语言就可以生图到本地文件夹，既省时间又能充分利用免费配额。带着这个实操需求，我把整个创建过程整理成了这篇文章，希望能给同样喜欢折腾工具、需要生图功能的朋友提供一点参考～



## 一.创建方法

登录（可用GitHub）魔搭社区，打开下方地址，点击“查看代码范例”进去复制API代码

https://modelscope.cn/models/Tongyi-MAI/Z-Image-Turbo

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260114235919010.webp)

⚠️ 注意事项：API Key 需要先完成账户绑定才能使用图片生成功能

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260115001924596.webp)

告诉Claude Code

```
根据代码创建Skill：【粘贴代码】
```
（可选）

```
帮我配置一下自定义斜杠命令  这样我方便使用，另外默输出尺寸设置为1920x1080，输出默认文件夹为D:\zhishiku\.claude\skills\image
```

项目目录结构

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260115020802212.webp)

## 二.如何使用

### 自然语言描述

Claude会自动根据你的自然语言调用这个生图skill

比如我用它测试生成我过往文章/视频的封面

```
生成3张16:9的文章配图，文章主题是Obsidian+AI，绝杀！你的第二大脑终于觉醒了
 
生成文章封面，文章主题是：如何创建一个生图Claude SkillS

练习两年半，我做了个免费 AI编程自学网！吊打付费课，会打字就能学，根据这个主题生成视封面
```
### 斜杠命令

另外你可以通过命令进行调用，可以让他输出指定的尺寸

```
/image 一只金色的猫
/gen-image 赛博朋克城市，霓虹灯效果
/image 可爱的卡通小熊 -o bear.jpg
/image 描述 -s 2048x1152  
/image 一个年轻女性在夕阳下的肖像，电影级质感 -s 1920x1080  
/image 赛博朋克城市，霓虹灯效果 -s 1920x1080 -o city.jpg
```

#### 核心命令
| 命令 | 功能说明 |
|------|----------|
| `/image <描述>` | 生成指定描述的图片 |
| `/gen-image <描述>` | 与 `/image` 功能一致，生成指定描述的图片 |

#### 可选参数
| 参数 | 全称 | 功能说明 |
|------|------|----------|
| `-o` | `--output` | 指定生成图片的输出文件名（含后缀，如 `bear.jpg`） |
| `-s` | `--size` | 指定生成图片的尺寸 |



## 三.写在最后

通过上面的例子可以看出，其实不仅是 API，任何你过往用过的优质提示词，都可以让 Claude 帮你封装成一个个 Skills，Skills 的调用方式更简单，也更有优势：你不用每次都跟 AI 详细说明要怎么做，只要用自然语言表达需求，Claude 就会自动判断并调用合适的 Skills，而且多个 Skills 还可以协同工作，组合出更复杂、更完整的工作流。


