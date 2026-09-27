---
title: HTML视频框架
published: 2026-04-30T16:00:00.000Z
tags:
  - Claudecode
  - skill
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260430153231682.webp
---

### 引言

做短视频最烦的是什么？写文案、找素材、调时间轴、配音乐、导出……每一步都是手动操作。

今天分享一个骚操作：**直接丢一篇 Markdown 文章给 Claude Code，它自动帮你生成一个带动画、配乐的视频 MP4 文件。**

整个过程我全程没碰任何剪辑软件，全靠一条命令搞定。

用到的工具叫 **HyperFrames**，开源免费

GitHub 地址：

https://github.com/heygen-com/hyperframes

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260430153231682.webp)

### 一、HyperFrames 是什么

简单说，它是一个 **用 HTML 写视频** 的框架。

- 视频的每一帧都是 HTML + CSS
- 动画用 GSAP（前端最流行的动画库）控制
- 时序用 `data-*` 属性标记
- 最终渲染成 MP4

配合 Claude Code 的 AI 能力，你只需要告诉它"我要什么风格的视频"，它就能自动写出 HTML、配好动画、加上音乐，然后渲染出成品。

### 二、安装步骤

#### 前置条件

- Node.js ≥ 22
- FFmpeg
- Claude Code（或任意 AI 编程工具）

#### 安装 HyperFrames 技能

在终端执行：

```bash
npx skills add heygen-com/hyperframes
```

执行后会列出 6 个 skill，**首次建议全选**（按空格键勾选全部，回车确认）：

| 技能名 | 核心用途 |
|--------|---------|
| `gsap` | GSAP 动画语法参考 |
| `hyperframes` | 核心技能：创建视频合成、动画、标题卡 |
| `hyperframes-cli` | 命令行工具：初始化、检查、预览、渲染 |
| `hyperframes-registry` | 安装官方组件库/预设模块 |
| `remotion-to-hyperframes` | 将 Remotion 项目转为 HyperFrames 格式 |
| `website-to-hyperframes` | 抓取网页并自动生成视频 |

安装完成后，重启 Claude Code 即可使用。

### 三、实操：把一篇文章做成视频

下面是我完整的操作流程，从一篇 Markdown 文章到一个 MP4 视频，全程自动化。

#### 第一步：给 Claude Code 发指令

我有一篇自我介绍文章，路径是：

```
D:\project2026\fuwari\src\content\posts\Xenia\自我介绍.md
```

直接在 Claude Code 对话框发送：

```
把这个文章使用HyperFrames做个视频
```

#### 第二步：选择风格和用途

Claude Code 会问你两个问题：

**问题一：视觉风格**
- 科技感/暗色 — 深色背景，霓虹高亮，适合技术博主
- 简约/明亮 — 白色背景，干净排版，适合品牌展示
- 活力/彩色 — 多彩渐变，适合社交媒体

**问题二：视频用途**
- 短视频/社交媒体 — 15-30 秒，竖屏 9:16
- 个人介绍/B 站片头 — 30-60 秒，横屏 16:10
- 完整自我介绍视频 — 1-2 分钟，横屏 16:9

我选了「科技感/暗色」+「完整自我介绍视频」。

#### 第三步：自动初始化项目

Claude Code 会自动执行 `npx hyperframes init`，生成项目结构：

```
kyjl97-self-intro/
├── assets/                # 静态资源（音乐、图片等）
├── renders/               # 渲染输出的 MP4 视频
├── AGENTS.md              # AI 协作文档
├── CLAUDE.md              # Claude 技能配置
├── DESIGN.md              # 视觉设计方案（颜色、字体、规范）
├── hyperframes.json       # 项目配置
├── index.html             # 核心！视频的源文件就是这个 HTML
└── meta.json              # 项目元数据
```

其中 **`index.html`** 是最重要的文件——整个视频的画面、动画、时序全写在这里面。

> **⚠️ 重要：每个视频是独立项目。** 这个 `kyjl97-self-intro` 文件夹只针对本次视频。下次做新视频会生成一个全新的项目文件夹，互不影响。各文件复用情况如下：
>
> | 文件/文件夹 | 能否复用 | 说明 |
> |---|---|---|
> | `index.html` | 不复用 | 视频本身，每个视频完全不同 |
> | `DESIGN.md` | **可当模板** | 配色方案可复制到新项目，省得重新定义风格 |
> | `assets/` | 不复用 | 本视频的音乐/图片，新视频用新素材 |
> | `renders/` | 不复用 | 输出的 MP4，每个视频单独渲染 |
> | `CLAUDE.md` `AGENTS.md` `hyperframes.json` `meta.json` | 自动生成 | 每次 init 都会生成，内容固定 |
>
> **以后做新视频的流程：**
> ```bash
> # 1. 在新目录初始化
> npx hyperframes init my-new-video
>
> # 2. 如果想复用科技暗色风格，把 DESIGN.md 复制过去
> cp kyjl97-self-intro/DESIGN.md my-new-video/
>
> # 3. 告诉 Claude Code 用新文章创建视频
> # 它会自动写新的 index.html
> ```
> 简单说：**每次新视频 = 新文件夹 + 新 index.html**，其他都是辅助文件。只有 `DESIGN.md` 值得复用当模板。

#### 第四步：自动创建视频内容

Claude Code 会根据你的文章内容，自动做这些事：

1. **创建 DESIGN.md** — 定义配色方案、字体、视觉风格
2. **分析文章结构** — 把文章拆分成多个场景（Scene）
3. **编写 HTML** — 每个场景是一个 `<div>`，用 `data-start` 和 `data-duration` 控制出现时间
4. **添加 GSAP 动画** — 元素入场、退出、过渡效果
5. **运行 lint 检查** — 自动检查 HTML 是否有错误

我的自我介绍视频被拆成了 7 个场景：

| 场景 | 时间 | 内容 |
|------|------|------|
| 1. 标题 | 0-5s | "得救之道" 品牌开场 |
| 2. 关于我 | 5-16s | 个人介绍 + 正在做的事 |
| 3. 项目展示 | 16-30s | 8 个网站 + 开源项目 |
| 4. 服务社群 | 30-44s | 商业服务 + 社群列表 |
| 5. 社交媒体 | 44-56s | 粉丝数据 + 平台矩阵 |
| 6. AI 工具链 | 56-68s | AI Agent + API 供应商 |
| 7. 结尾 | 68-80s | 联系方式收尾 |

#### 第五步：本地预览

Claude Code 会启动一个本地预览服务器：

```bash
npx hyperframes preview
```

浏览器打开 `http://localhost:3002` 就能看到视频效果。**修改 HTML 后会自动刷新**，所见即所得。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260430150154455.webp)

#### 第六步：反馈优化

这一步很关键。我看第一版后觉得：

- **节奏太慢** — 80 秒太长了
- **没有音乐** — 需要加 BGM

直接告诉 Claude Code，它会自动修改：
- 把总时长从 80 秒压缩到 55 秒
- 动画从 0.5 秒缩短到 0.35 秒
- 卡片入场间隔从 0.08 秒压缩到 0.06 秒
- 问我要音乐文件，然后自动添加到项目中

#### 第七步：渲染导出 MP4

确认效果没问题后，执行渲染：

```bash
npx hyperframes render
```

渲染完成后，MP4 文件在：

```
项目目录/renders/kyjl97-self-intro_2026-04-30_15-09-53.mp4
```

我的成品：1920×1080、55 秒、3.8 MB，带背景音乐，可以直接上传社交媒体。

视频

### 四、核心概念速览

#### HTML 就是视频源文件

整个视频就是一个 HTML 文件，核心结构：

```html
<div id="root" data-composition-id="main"
     data-start="0" data-duration="55"
     data-width="1920" data-height="1080">

  <!-- 每个场景是一个 clip -->
  <div id="scene1" class="clip scene"
       data-start="0" data-duration="3.5" data-track-index="1">
    <!-- 你的内容 -->
  </div>
</div>
```

- `data-start` — 这个元素从第几秒出现
- `data-duration` — 持续几秒
- `data-track-index` — 轨道编号（决定层级）

#### 动画用 GSAP 控制

```javascript
const tl = gsap.timeline({ paused: true });

// 入场动画：从下方滑入 + 淡入
tl.from("#title", {
  opacity: 0, y: 40,
  duration: 0.5, ease: "power3.out"
}, 0); // 0 = 在第 0 秒开始

// 退出动画：向上滑出 + 淡出
tl.to("#title", {
  opacity: 0, y: -25,
  duration: 0.25, ease: "power2.in"
}, 2.8); // 在第 2.8 秒退出
```

#### 视觉方案在 DESIGN.md 中定义

```markdown
## Colors
| 角色       | 色值      | 说明              |
|-----------|----------|------------------|
| 背景      | #0a0e1a  | 深蓝黑，不是纯黑    |
| 强调色    | #3b82f6  | 电光蓝            |
| 辅助色    | #06b6d4  | 青色             |
| 文字      | #e2e8f0  | 暖白色            |
```

Claude Code 会严格遵守这个配色方案，不会乱用颜色。

### 五、踩坑记录

#### 1. 视频还没渲染出来

预览只是本地 HTML 渲染，要生成 MP4 必须手动执行 `npx hyperframes render`。

#### 2. 第一版节奏大概率偏慢

AI 生成的视频默认节奏都比较保守，建议：
- 直接告诉它"节奏加快，总时长控制在 X 秒"
- 每个场景的动画时长建议 0.3-0.4 秒

#### 3. 背景音乐需要自己提供

HyperFrames 支持添加音频，但音乐文件需要你自己准备。支持 mp3、wav、m4a 格式。

#### 4. 字体加载需要联网

渲染时会从 Google Fonts 加载字体，首次渲染会慢一些。之后有缓存就快了。

#### 5. 大文件渲染时间较长

55 秒的视频渲染大约需要 1-2 分钟，取决于你的电脑配置。

### 总结

整个流程的核心思路就是：**用自然语言描述你想要的视频 → AI 自动生成 HTML → 渲染成 MP4**。

你不需要学 PR、不需要学剪映、不需要手动对齐时间轴。写一篇文章，跑一条命令，等几分钟，视频就出来了。

效果可能不一定完美，但你只需要先出第一版，之后让 AI 根据你的建议优化就行。整个过程耗时至少半小时，但**全程不用你动手**——你可以去忙别的，等它完成后再提修改意见。

以上，既然看到这里了，如果你觉得内容不错，随手**点个赞、在看、转发**三连吧！如果想第一时间收到推送，可以给我点个星标⭐～

谢谢你看我的文章，我们，下次再见。

### 参考资料

- 项目地址：https://github.com/heygen-com/hyperframes
- 作者推文：https://x.com/liu8in/status/2044827628700684463
