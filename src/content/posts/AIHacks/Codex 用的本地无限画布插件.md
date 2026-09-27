---
title: Codex无限画布
published: 2026-06-21
tags:
  - codex
  - plugin
  - skill
  - image
category: AIHacks
draft: true
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-cowart-canvas-codex-20260621-173504.webp
---
钟二信做了一个给 Codex 用的本地无限画布插件，名字叫 **Cowart**。

我第一次看到它的时候，感觉挺有意思。

以前我们让 AI 改图，大多数时候都是在聊天框里描述：这里大一点，那里小一点，文字往左挪一点，背景再暗一点。

问题是，图像修改这种事，很多时候不是靠文字说清楚的。

你明明想改的是图右下角那一块，但一说出来就变成了很长一段 prompt。AI 也不一定知道你说的「这里」到底是哪里。来回几轮之后，人也累，图也不一定往正确方向走。

Cowart 解决的就是这个问题。

**它把「让 AI 改图」从纯文字提示，变成一种更直觉的画布流程。**

你可以在画布里放一张图，直接用箭头、文字、圈选做标注。比如「面条拉高一点」「碗小一点」「用白汤」「标题不要贴边」。然后把这个标注截图交给 Codex，Codex 再调用图像生成能力，生成一张干净的新图，并放在原图旁边。

原图、标注图、新图都留在画布上。

这点很关键。

因为很多 AI 改图工具只给你一个结果，但 Cowart 更像是在保留一次设计沟通的过程。你能看到上一版是什么，哪里被标注过，后来改成了什么样。

项目地址：
https://github.com/zhongerxin/cowart
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-cowart-canvas-codex-20260621-173504.webp)

### 安装方式

作者 README 里给了安装方式。

你可以直接把下面这段发给 Codex：

```text
请从 https://github.com/zhongerxin/cowart.git 安装 Cowart Codex 插件。
请 clone 仓库到 ~/plugins/cowart，确认 .codex-plugin/plugin.json 存在，
把插件加入 personal marketplace，先运行 codex plugin marketplace add ~，
再运行 codex plugin add cowart@personal。
安装后请校验插件，并告诉我是否需要开启一个新对话来加载新技能和 MCP 工具。
```

如果是 Windows 环境，要留意一点：有些版本的启动脚本默认走 `bash`。如果本机没有 bash，可能需要把 MCP 启动方式改成直接用 Node 跑：

```json
{
  "mcpServers": {
    "cowart_mcp": {
      "command": "node",
      "args": [
        "./mcp/server.mjs"
      ],
      "cwd": "."
    }
  }
}
```

装完之后，最好开一个新对话或重启 Codex，让新的 skill 和 MCP 工具完整加载。

### 怎么使用

安装完插件之后，你可以直接对 Codex 说：

```text
打开 Cowart 画布
```

它会启动一个本地服务，默认地址是：

```text
http://127.0.0.1:43217/
```

画布数据会保存在当前项目目录下：

```text
canvas/pages/<page-id>/cowart-canvas.json
canvas/pages/<page-id>/assets/
```

这意味着它不是把你的图都传到一个未知平台上，而是把画布数据和资源放在你当前项目里。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260621171327099.webp)

常见用法有两种。

第一种，是先创建一个 AI image holder，再让 Codex 往里面生成图。

比如你可以在画布里画一个竖版封面占位框，然后说：

```text
生成一张可口可乐的广告海报，放进选中的 Cowart AI image holder。
```

Codex 会读取你选中的区域比例，再生成对应尺寸的图片。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260621171705303.webp)

第二种，是基于标注图改图。

你先在画布里对原图做标注。哪里要改，就直接画箭头、写文字。然后把标注截图发给 Codex，说：

```text
根据这张 Cowart 标注截图，生成一张干净的修改版，放在原图旁边。
```
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260621172739022.webp)
这时 Codex 会理解标注里的修改意见，生成一张不带红线、不带批注的新图。

它的体验就像你在跟一个设计师沟通：先把问题圈出来，再等对方出一个新版。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260621173207590.webp)


### 我理解它的三个亮点

**第一个亮点，是给 Codex 加了一个视觉工作台。**

Codex 原本很擅长处理代码、文件、脚本、命令。但一碰到图片，交互就容易退回到纯文字。

Cowart 做的事情，是把图片重新放回画布里。

这样你不需要把所有视觉意图都翻译成文字。你可以直接指给它看。

**第二个亮点，是把 AI 出图和本地项目打通了。**

很多人用 AI 生成图片，最后会散落在下载目录、聊天记录、网页历史里。过几天想找某一版，基本只能靠记忆。

Cowart 的画布数据默认保存在当前项目的 `canvas/` 目录里。对做内容、做封面、做产品草图的人来说，这个习惯很舒服。

它不是一次性出图，而是把出图过程变成项目资产。

**第三个亮点，是它适合做迭代。**

海报、封面、广告图、UI 草图这些东西，很少一版就结束。

真正消耗时间的往往是后面那些小改动：标题上移一点，主体放大一点，背景别那么乱，某个元素换成另一种风格。

这些小改动如果全靠文字说，特别磨人。

但如果能在图上直接标注，沟通成本会低很多。


### 写在最后

我觉得 Cowart 最有意思的地方，不是「它能不能完美改图」。

而是它让 Codex 多了一种交互方式。

过去我们跟 AI 协作，主要靠文字。

但很多任务天然不是文字优先的。图片、布局、流程图、界面草稿、封面设计，这些东西更适合在画布上沟通。

Cowart 做的事情，就是把这块画布补上。

它还很早期，也有不少粗糙的地方。

但方向挺对。

未来的 Agent 不应该只会回答问题，也不应该只会执行命令。它应该能进入我们的工作现场，看到我们正在看的东西，理解我们在图上留下的痕迹，然后继续往下做。

Cowart 现在做的，就是这个方向上的一个小样板。

如果你本来就在用 Codex，又经常做图片、封面、海报、视觉草稿，可以试一下。

它不一定会替代专业设计工具。

但它会让 Codex 更像一个能一起改图、一起留痕、一起迭代的工作台。

以上，既然看到这里了，如果对你有所帮助，还望不吝点赞与关注，这也是对我最大的鼓励与支持。

感谢你拨冗阅读，山高水长，我们期待下次再见。

*\>/ 更多Agent实战干货
迎访问我的博客：[kyjl97.github.io](https://kyjl97.github.io/)*
