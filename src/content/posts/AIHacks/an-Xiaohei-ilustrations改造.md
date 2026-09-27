---
title: 改造小黑插画skill
published: 2026-06-18
tags:
  - skill
  - illustration
  - Gemini
  - tutorial
category: AIHacks
draft: false
pinned: false
image:
---

今天这篇文章，我教大家如何去改造一个 skill。最近我在 GitHub 上发现了一个生图的 skill，效果也不错，但是有几点问题：

1. 后端生图需要自己配置 API：我想到自己有 Gemini 的 PRO 会员，那我为什么不能去调用它呢？
2. 形象是小黑形象：我想着是不是可以让 AI 帮我去改造换一下，结果就可以了。
3. 图片上传与插入：我的图片一般是上传到图床的，所以每次生成图片时，我希望它能够上传到图床，并且返回一个在线地址，直接插入到我的文章当中，这样我就不用去手动地复制粘贴了。

下面看看我是是如何做到的。

## 一、搞定后端：让本地 Agent 调用 Gemini 网页版生图

这个 skill 原本设计里有个致命假设——它假设运行环境里有个内置的 `image_gen` 工具，走到生图那一步直接调用。但我的环境里根本没有这个工具，所以前面「消化文章 / 选配图点 / 写 prompt」全都白做，最后一步画不出图。

那怎么补上这一环？思路很简单：**找 GitHub 上有没有人逆向了 Gemini 网页版的接口，能让我本地脚本直接调它生图。**

我的第一句话是这么问的：

```
你帮我在 GitHub 上找一下，有没有这样的方案：如何让本地的 AI Agent 软件调用这个网页的 Gemini PRO 进行生图，然后下载到本地？
```

然后把 skill 目录丢给它：

```
C:\Users\Administrator\ZCodeProject\ian-xiaohei-illustrations\ian-xiaohei-illustrations 你看一下，我这边有一个给文章配图的生图 skill，但它没办法生图。我想使用这个，你看怎么弄比较好？
```

### 用到的关键库

GitHub 上有一个 `HanaokaYuzu/Gemini-API`（Python 包名 `gemini_webapi`），它逆向了 `gemini.google.com` 的网页接口，用你浏览器登录后的 cookie 鉴权，**不依赖任何付费 API key**。它原生支持 Nano Banana 生图（也就是 Gemini Pro 的生图能力），生图后返回字节流，自己 `open()` 写成本地文件就行。

> 链接：https://github.com/HanaokaYuzu/Gemini-API

### 改造过程

我没动 skill 的设计（消化文章 / 选配图点 / prompt 模板这些都很优秀），只在「最后画图那一下」插了一个本地生图脚本 `scripts/gemini_image_gen.py`，作为 `image_gen` 的替代。整个链路变成：

```
文章 → [消化/选配图点] → [套 prompt 模板生成提示词] → ✅ scripts/gemini_image_gen.py 生图 → ✅ 落到 assets/
```

### 关键配置：鉴权 cookie

用网页接口绕不开鉴权，需要两个 cookie。步骤：

1. 浏览器打开 https://gemini.google.com 并登录（注意账号要 ≥18 岁，且地区支持生图）
2. `F12` → Application → Cookies → `https://gemini.google.com`
3. 复制这两个 cookie 的值：
   - `__Secure-1PSID`
   - `__Secure-1PSIDTS`
4. 填到 skill 目录下的 `.env` 文件里：
   ```
   GEMINI_1PSID=你的值
   GEMINI_1PSIDTS=你的值
   ```

装依赖、跑一下验证命令，看到图片落到本地目录，整条链路就通了。

⚠️ **一个坑提醒**：这俩 cookie 等同于你的登录态，千万别提交到 git 或截图发别人。我已经在 `.gitignore` 里排除了 `.env`。另外 `__Secure-1PSIDTS` 寿命短（几小时到一天），过期了就重新取一次填进去——脚本运行期间会自动刷新，但隔段时间不用就得手动换。

我本来想让它自动从 Chrome 读 cookie 省去手动复制，结果撞墙了：Chrome 从 2024 年起用了 **App-Bound Encryption (ABE)** 加密 cookie，第三方 Python 库（browser-cookie3 等）全部读不了。这不是库的 bug，是 Google 有意堵的。代码我保留了（`AUTO_READ_CHROME=1`），以后要是换成 Edge 或 Firefox 登录 Gemini 就能用——这俩浏览器没上 ABE。

## 二、换形象：从「小黑」改成我自己的 KATONG

原 skill 的主角是「小黑」——一个黑色实心、白点眼、细腿、空表情的怪诞小怪物，整体走的是纯白手绘草图、冷幽默、荒诞的路线。

但我不想要这个形象，我有自己的 IP 角色叫 **KATONG**，是个亚洲男性创业者形象：短黑寸头、浓眉细眼、黑 hoodie、皇家蓝裤子（#4A78F0）、胸前白色 34 号徽章，走极简扁平矢量、企业插画的精致风格。

问题来了——这两个角色定调的画风是**直接对立**的：

| 维度 | 原 skill 小黑 | 我的 KATONG |
|---|---|---|
| 画风 | 手绘线稿、轻微抖动、白纸草图感 | 几何矢量、干净轮廓、企业插画 |
| 气质 | 怪诞、荒诞、冷幽默、deadpan | 冷静自信、创业者、有行动力 |
| 禁忌 | 明确禁止「商业插画、精致扁平」 | 描述里就要「corporate illustration」 |

如果只是把角色塞进原 prompt，prompt 会自相矛盾（一边说「禁止商业插画」一边说「corporate illustration style」）。

### 我的做法：保留框架，换形象换画风

我选了「KATONG 角色 + 保留文章配图框架」的融合方案——保留 16:9 横版、白底、中文标注、一图一概念这套有价值的配图纪律，但角色和画风整体换成 KATONG 的精致企业矢量风。

具体改了三个文件：

1. **`references/xiaohei-ip.md`**：重写成 KATONG 的形象定义。五官、服装、徽章 34、风格禁忌（不要 anime / 3D / 写实）全部写死，要求每张图必须保持一致。但保留了原文件里很有价值的「动作职责库」（搬运、拉线、守门、搭桥等），因为那是文章配图的核心，只换形象不换职责逻辑。

2. **`references/style-dna.md`**：从「怪诞手绘草图」整体重写成「极简扁平矢量企业插画风」。颜色体系也调了：主色黑、品牌蓝皇家蓝 #4A78F0、强调红、辅助蓝，中性灰。绝对不要那一栏把「手绘线稿、抖动笔触、纸张感」也加进去了——这是画风切换的明确边界。

3. **`references/prompt-template.md`**：这是真正喂给生图模型的东西，最关键。把 Visual DNA 和 IP 角色描述都换成 KATONG 版本，英文 prompt 里 KATONG 的完整特征（短黑寸头 / 浓眉细眼 / 黑hoodie / 皇家蓝裤子 #4A78F0 / 胸前白色 34 号徽章）写死，每次生图都带上，尽量逼近原型。

另外 `SKILL.md` 和 `qa-checklist.md` 里残留的「怪诞 / 手绘 / 小黑」表述也一并更新了，迭代方法里还加了一条「角色漂移就用 edit 局部修正」。

### 必须诚实说的一个限制

**纯文生图做不到「同一个角色在多张图里长得一模一样」。** 文字描述能让风格一致，但跨图会有漂移——第 1 张的 KATONG 和第 5 张的 KATONG，细节上不会完全相同。这不是脚本的问题，是纯文生图模型的固有限制。

应对办法是：① 每次把完整特征写进 prompt 尽量逼近；② 某张图偏差大了（比如丢了徽章、画风变动漫），用脚本提供的 edit 模式基于该图做局部修正，或者重生成。

> 我给自己生成角色特征用的提示词思路：先用文生图把想要的角色生成出来，拿到图后让 AI 反推这个角色的核心特征（发型、五官、服装、配色、徽章、风格禁忌），写成一段结构化的英文描述，以后每次生图套进去。这段描述越精确、越结构化，跨图一致性越好。

## 三、指定输出目录 + 自动上传 PicGo

文章配图的最后一公里：图生出来后，我要的是「直接拿到一个能插入文章的在线地址」，而不是手动去找本地文件、手动上传图床、手动复制链接。

### 指定输出目录

先在 `.env` 里加一行，设一次永久生效：

```
IMAGE_OUTPUT_DIR=D:\data\images\Article-illustrations
```

以后所有生图默认都进这个目录，不用每次在命令里加 `-o`。

### 自动上传 PicGo

PicGo 大家应该熟，是个本地图片上传工具，核心能力是把本地图片传到图床（阿里云 OSS、腾讯 COS、七牛、Gitee、sm.ms 等）然后返回一个外网 URL。

我接的是 **PicGo 的本地 HTTP 接口**（方式 A）——PicGo 客户端跑着，脚本把图片绝对路径 POST 给它，它返回外链。这种方式最省事，因为图床配置、命名规则、水印这些都已经在 PicGo 客户端里设好了，脚本不用管。

实现很简单，在生图脚本里加了一个 `upload_to_picgo()` 函数：

- 端点：`POST {PICGO_SERVER}/upload`（默认 `http://127.0.0.1:36677`）
- 请求体：`{"list": ["图片绝对路径"]}`
- 鉴权：若 PicGo 里设了 token，加请求头 `X-PicGo-Token`
- 返回：`{"success": true, "result": ["外网URL"]}`

然后在 `gen` 和 `edit` 两个子命令的保存循环里，每张图保存成功后，如果 `.env` 里 `PICGO_AUTO_UPLOAD=1` 就自动调上传。还额外加了个 `upload` 子命令，可以单独把任意本地图片传 PicGo（不用每次都生图才能测）。

配置好之后，一次生图的输出长这样：

```
[OK] 已保存: D:\data\images\Article-illustrations\20260617_003728_0.png
[>] 上传到 PicGo (http://127.0.0.1:36677): 20260617_003728_0.png
[OK] 外链: https://gitee.com/xxx/typora/raw/master/image/20260617_003728_0.png
```

**本地保存 + 图床外链一条龙**。两步是独立的——PicGo 挂了不影响本地文件，本地没了图床那份还在，双保险。

关于「下载到本地还是云端」这个问题，答案很明确：**两步都有，且都可控。** 生图后一定先下载到本地永久保存（你完全拥有），如果你开了 PicGo，本地保存成功后再自动传图床拿外链。

## 四、去水印（左上角标题）

生图模型有个毛病：经常会在画面左上角自作主张写一个「Workflow / 系统架构图 / 常见坑 / 路线图」之类的类型标题，很丑。skill 的 QA checklist 里专门把这条列为失败信号。

应对办法是脚本提供的 `edit` 子命令做局部编辑，prompt 里写明：

```
Edit the provided image. Remove only the text "要删除的文字" and its underline
from the top-left corner. Fill that area with the same clean white background.
Preserve everything else exactly: character, labels, paths, line style,
composition, aspect ratio. Do not add any new text or objects.
```

这种局部编辑比重新生成更省事，因为不用从头再来，只改坏掉的那一小块。

## 五、总结

回顾一下，这次改造的核心就三件事：

| 改造点       | 解决的问题                         | 做法                                            |
| --------- | ----------------------------- | --------------------------------------------- |
| **后端生图**  | skill 假设有内置 `image_gen` 但环境没有 | 接入 `gemini_webapi` 逆向库，cookie 鉴权调 Nano Banana |
| **换形象**   | 不想要小黑怪诞手绘风，要自己的 KATONG        | 改三个参考文件（IP / 风格 / prompt 模板），保留框架换画风          |
| **输出+上传** | 想要本地保存 + 自动拿图床外链              | `.env` 配默认目录 + 接 PicGo 本地 HTTP 接口自动上传         |

整个过程的本质是：**一个好 skill 的核心价值在于它的工作流设计（怎么消化文章、怎么选配图点、怎么组织 prompt、怎么 QA），而不是绑定某个具体的生图工具。** 后端生图工具、角色形象、输出渠道这三层都是可替换的「插件」，只要保持接口一致，换个实现就能让 skill 适配你自己的需求。

这也是我改造 skill 的通用思路：先读懂它的工作流设计，找到卡住的环节，再针对性地补一个本地实现。下一次你拿到一个好 skill 但环境对不上时，不妨也这么拆一下。
