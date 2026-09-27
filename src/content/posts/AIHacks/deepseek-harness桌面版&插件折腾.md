---
title: DSH桌面版插件折腾
published: 2026-08-16
tags:
  - DeepSeek Harness
  - AI Agent
  - 插件
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260814105531095.webp
---
DeepSeek Harness 原生版只有网页前端，没有桌面客户端。安装、升级、启动都需要用命令行。

**安装**（需要 Node.js 22.19+ 已安装）：
```powershell
npx -y @deepseek-ai/dsh web
```
首次运行会下载依赖，约需 8 分钟，终端长时间无输出是正常现象。

**启动**（日常使用）：
```powershell
npx -y @deepseek-ai/dsh web
```
启动后终端会打印本地地址，默认 `http://127.0.0.1:3080`，浏览器打开即可。

**升级**：
```powershell
npx -y @deepseek-ai/dsh@latest web
```
npx 每次启动默认拉最新版，显式指定 `@latest` 可确保更新到最新。

## 用户配置目录

```
C:\Users\Administrator\.dsh\
├── settings.yaml          # 用户设置
├── .credentials.yaml      # API 密钥
├── profiles\
│   └── web\
│       ├── package.json
│       ├── cordis.patch.yml
│       ├── cordis.yml
│       ├── pnpm-workspace.yaml
│       └── node_modules\  # 插件都在这里
│           └── dsh-better-sidebar\
├── sessions\              # 会话数据
└── storages\              # 存储数据
```

## 插件安装位置

```
C:\Users\Administrator\.dsh\profiles\web\node_modules\dsh-better-sidebar\
├── lib\
│   ├── index.js           # 宿主端（服务端）
│   ├── client.js          # 客户端主包
│   ├── client-terminal.js # 终端 chunk（懒加载）
│   └── client-editor.js   # 编辑器 chunk（懒加载）
├── src\                   # 源码（供参考）
└── package.json
```

---

我在 GitHub 上找到了一个开发者做的桌面封装版：deepseek-harness-desktop。

## Web 前端 dist

桌面版的前端文件存放在：
```
D:\software\DeepSeek Harness\resources\host\node_modules\@deepseek-ai\dsh-web-frontend\dist\
```

原生版的前端文件存放在 npm 缓存目录中：
```
C:\Users\Administrator\AppData\Local\npm-cache\_npx\1e7f6d9597241db0\node_modules\@deepseek-ai\dsh-web-frontend\dist\
```

两者的内容完全相同，只是存放位置不同。

## Electron 特有文件（桌面版独有）

```
D:\software\DeepSeek Harness\
├── DeepSeek Harness.exe      # Electron 主程序 (215MB)
├── resources\
│   ├── app.asar              # Electron 应用包
│   ├── desktop-resources\    # 托盘图标等
│   └── host\                 # DSH 核心代码
├── chrome_100_percent.pak    # Chromium 资源
├── chrome_200_percent.pak
├── *.dll                     # Chromium/Vulkan 运行时
├── LICENSE.electron.txt
└── Uninstall DeepSeek Harness.exe
```

## 什么是 Electron 壳

打个比方：

**原生版** = 你有一个发动机（Node.js + DSH 核心），自己接电线、接水管、接仪表盘，手动启动。

**桌面版** = 有人把同一个发动机装进了一辆整车里（Electron），你只需要拧钥匙（双击 exe）就能开。

Electron 就是那个"车壳"——它是一个框架，让你用网页技术（HTML/CSS/JS）做出来的程序，能像普通软件一样双击打开、有独立窗口、有托盘图标。VS Code、Discord、Slack 都是 Electron 做的。

所以"Electron 壳"就是：用 Electron 包了一层，把原本需要命令行启动的东西变成了一个双击就能用的桌面程序。

## 桌面版的启动流程

```
双击 DeepSeek Harness.exe
        │
        ▼
    Electron 启动（加载 app.asar）
        │
        ▼
    启动内置的 Node.js 进程
        │
        ▼
    运行 DSH 核心代码（resources\host\）
        │
        ▼
    启动 web 服务器（监听端口 55322）
        │
        ▼
    Electron 打开一个窗口，加载 http://127.0.0.1:55322
```

所以本质上，**桌面版启动的就是一个原生的 DSH 核心**，只不过由 Electron 帮你完成了启动和显示的工作。

## 桌面版 vs 原生版

| 维度 | 桌面版 | 原生版 |
|------|--------|--------|
| 启动方式 | 双击 exe | 命令行 `npx -y @deepseek-ai/dsh web` |
| 运行环境 | Electron 自带 Node.js | 你电脑上已装的 Node.js |
| 窗口 | 独立桌面窗口，有托盘图标 | 浏览器标签页 |
| 标题栏 | 有 Windows 原生标题栏 | 浏览器自己的标题栏 |

**用户配置目录**：两者共用 `C:\Users\Administrator\.dsh\`

**插件安装位置**：两者共用 `C:\Users\Administrator\.dsh\profiles\web\node_modules\dsh-better-sidebar\`

---

后来我又在 GitHub 上发现了一个插件，可以给 DeepSeek Harness 加上侧边栏功能，叫 DSH-better-sidebar。

## DSH-better-sidebar 安装命令

在 PowerShell 中执行以下命令（需要 Node.js 22.19+ 已安装）：

```powershell
irm https://raw.githubusercontent.com/omdsh-dev/DSH-better-sidebar/main/scripts/install.ps1 | iex
```

这条命令会自动完成：检测环境 → 写入 pnpm 构建许可 → 通过 DSH CLI 安装插件到 web profile → 注册 bundle 挂载 → 清理旧版手动挂载行。安装完成后重启 DSH 并硬刷新（Ctrl+Shift+R）即可生效。

如果你遇到 `irm | iex` 报错（Windows 下 UTF-8 BOM 可能导致参数解析异常），可以改用文件方式运行：

```powershell
irm https://raw.githubusercontent.com/omdsh-dev/DSH-better-sidebar/main/scripts/install.ps1 -OutFile install.ps1
powershell -ExecutionPolicy Bypass -File install.ps1
```

## 侧边栏修复（Windows 标题栏重叠 + 底部面板空白）

安装完之后，我发现 DSH-better-sidebar 插件在 Windows 无边框窗口下有两个已知问题：

1. 侧边栏切换按钮和 Windows 最小化/最大化/关闭按钮重叠，点切换会误触窗口放大
2. 点击底部面板切换按钮后，面板打开但内容为空（灰色），没有自动加载终端

把下面这段话发给 AI，让它一次性帮你修复这两个问题：

> 我的 DeepSeek Harness 安装了 DSH-better-sidebar 插件，遇到两个问题：
> 1. 侧边栏右上角的切换按钮和 Windows 窗口的最小化/最大化/关闭按钮重叠了，点切换按钮会误触窗口放大
> 2. 点击底部面板切换按钮后，面板打开了但里面是灰色空白，没有自动加载终端
>
> 请帮我修复，插件安装在 `~/.dsh/profiles/web/node_modules/dsh-better-sidebar/`。
>
> **修复一（标题栏重叠）**：修改以下三个文件中 `titleBarCompat` 的默认值从 `false` 改为 `true`：
> - `lib/client.js`（约第22行）：`titleBarCompat: false` → `titleBarCompat: true`
> - `lib/client-registry.js`（约第22行）：`titleBarCompat: false` → `titleBarCompat: true`
> - `lib/index.js`（约第66行）：`z.boolean().default(false)` → `z.boolean().default(true)`
>
> **修复二（底部面板空白）**：修改以下两个文件中的 `toggleBottomPanel` 函数，让面板关闭时重置 `bottomOpenedOnce` 标志，这样下次打开会重新触发自动终端：
> - `lib/client.js`（约第571行）
> - `lib/client-registry.js`（约第571行）
>
> 把原来的：
> ```javascript
> function toggleBottomPanel(state) {
>     return { ...state, bottomOpen: !state.bottomOpen };
> }
> ```
> 改为：
> ```javascript
> function toggleBottomPanel(state) {
>     const nextOpen = !state.bottomOpen;
>     return {
>         ...state,
>         bottomOpen: nextOpen,
>         bottomOpenedOnce: nextOpen ? state.bottomOpenedOnce : false
>     };
> }
> ```
>
> 修改完成后重启 DSH 并硬刷新页面（Ctrl+Shift+R）即可生效。

另外，我也注意到今天deepseek-harness官方上线了11个skill。
https://github.com/deepseek-ai/deepseek-harness/tree/master/.agents/skills

**这 11 个技能基本都是为「开发 deepseek-harness 这个代码库本身」设计的**——它们的正文大量引用 `../../../AGENTS.md`、`docs/defensive-patterns.md`、`.agents/notes/`、`website/docs.ts`、`gh stack` 等 DSH 仓库专属路径。也就是说：

- 如果你在 DSH 仓库里做开发/审查/文档工作，它们完全能用；
- 如果你只是**日常使用 DSH** 而非开发它，这些技能大多用不上；其中相对通用的可能是 `record-browser-gif`（录浏览器演示 GIF）和 `dsh-translate-docs`（文档中英文互译）。

**技能说明**

| 技能                         | 用途                                           |
| -------------------------- | -------------------------------------------- |
| `dsh-archive-agent-notes`  | 归档 Agent Notes：增删/审计/分类已实现的决策笔记              |
| `dsh-code-review`          | 在 deepseek-harness 仓库里做 PR 代码审查，对齐代码库规范      |
| `dsh-doc-site-sync`        | 同步 DSH 文档站（VitePress docs.ts / docs:check 等） |
| `dsh-doc-standards`        | DSH 文档编写规范（层级/教程/预算/瘦身/审计）                   |
| `dsh-find-simplifications` | 在 DSH 仓库里找可简化的代码面并沉淀为 Agent Notes            |
| `dsh-merging-stacked-prs`  | 用 GitHub 官方 stack 功能合并一叠相互依赖的 PR             |
| `dsh-pre-push-checks`      | push 前选择最小测试/检查集（改动了哪些层跑哪些检查）                |
| `dsh-prose-standard`       | DSH 文案规范（注释/文档/描述该写多少、怎么写）                   |
| `dsh-translate-docs`       | DSH 双语文档翻译工作流（**仅按名称手动调用**，不会被自动触发）          |
| `dsh-trim-cot-leakage`     | 清理泄露推理过程/会话痕迹的文案（CoT leakage）                |
| `record-browser-gif`       | 录制浏览器 UI 交互演示 GIF（含状态化取帧、确定性编码、PR 挂 GIF）     |

另外我还看到了一个非常不错的插件，我也安装了。
它可以让DeepSeek Harness驱动一个真实、可编辑、可交互的设计画布，而不是返回一张生成的图片。
参考地址
https://github.com/ZSeven-W/dsh-openpencil/tree/main

不过，这个我研究了好久，它的编辑画布功能依然不能在右侧出现，所以我最后卸载掉了。


