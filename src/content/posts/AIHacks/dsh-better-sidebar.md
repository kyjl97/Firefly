---
title: DSH侧边栏插件
published: 2026-08-19
tags:
  - DeepSeek Harness
  - DSH Desktop
  - 插件
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260820023734629.webp
---
 [DSH Desktop ](https://github.com/anywhere-labs/deepseek-harness-desktop)安装 dsh-better-sidebar 侧边栏插件，一条命令就能搞定。

DSH Desktop 是一个 Electron 桌面封装版，它的核心分三层：Electron 壳（`D:\software\DSH Desktop\`，只读，每次更新会覆盖）、DSH 核心依赖（`resources\app.asar.unpacked\node_modules\`，也是只读的）、用户 profile 目录（`C:\Users\你的用户名\.dsh\profiles\desktop\`，这才是装第三方插件的地方）。桌面版启动时读的是 `desktop` profile，不是 `web` profile。

项目地址
https://github.com/omdsh-dev/DSH-better-sidebar

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260820023734629.webp)

### 一条命令安装

打开 PowerShell，执行：

```powershell
dsh plugin --profile desktop add dsh-better-sidebar@latest
```

等安装完成，再批准一下终端依赖的构建脚本：

```powershell
cd "$env:USERPROFILE\.dsh\profiles\desktop"
pnpm approve-builds --all
```

然后关闭 DSH Desktop 重新打开，按 `Ctrl+Shift+R` 硬刷新页面，右侧就会出现侧边栏。

### 如果 `dsh` 命令没找到

桌面版用户可能没有把 `dsh` 加到系统 PATH 上。可以用桌面版自带的 CLI，路径在 `app.asar.unpacked` 里：

```powershell
node "D:\software\DSH Desktop\resources\app.asar.unpacked\node_modules\@deepseek-ai\dsh\lib\bin.js" plugin --profile desktop add dsh-better-sidebar@latest
```

如果不知道 DSH Desktop 装在哪，也可以让 npx 临时下载一个 DSH 来执行（会多等一两分钟下载时间）：

```powershell
npx -y @deepseek-ai/dsh plugin --profile desktop add dsh-better-sidebar@latest
```

然后同样执行 `pnpm approve-builds --all` 并重启。

### 这条命令做了什么

`dsh plugin add` 会做三件事：

1. 在 `C:\Users\你的用户名\.dsh\profiles\desktop\package.json` 的 `dependencies` 里添加 `"dsh-better-sidebar": "^0.13.1"`
2. 运行 `pnpm install` 下载插件和它的依赖
3. 读取插件自带的 `cordis.patch.yml` 中的 bundle 声明，自动把 `"dsh-better-sidebar"` 加入 `dsh.profile.bundles` 数组

不需要手动改任何配置文件。

### 验证安装

检查插件文件是否齐全：

```powershell
ls "$env:USERPROFILE\.dsh\profiles\desktop\node_modules\dsh-better-sidebar\lib\"
```

应该能看到以下文件：

```
client.js
client-editor.js
client-mermaid.js
client-registry.js
client-terminal.js
index.js
invariant.js
types\
```

### 常见问题

**装完重启没看到侧边栏**

先确认安装是否成功：

```powershell
cat "$env:USERPROFILE\.dsh\profiles\desktop\package.json"
```

确认 `dependencies` 里有 `dsh-better-sidebar`，并且 `bundles` 数组包含 `dsh-better-sidebar`。如果 `bundles` 里没有，手动加上去：

```json
"bundles": [
  "@deepseek-ai/dsh-base",
  "@deepseek-ai/dsh-web-app",
  "dsh-better-sidebar"
]
```

**报错 `missing peer` 警告**

安装时会看到一堆 peer 依赖缺失的警告，比如 `@deepseek-ai/cordis`、`react` 等。这些包由 DSH Desktop 自带的 `app.asar.unpacked` 在运行时提供，不会出现在 profile 的 `node_modules` 里，属于正常现象，不影响使用。

**终端用不了**

确认执行了 `pnpm approve-builds --all`，让 `node-pty` 的构建脚本能运行。如果已经装了但终端还是不能用，可以手动重建：

```powershell
cd "$env:USERPROFILE\.dsh\profiles\desktop"
pnpm rebuild node-pty
```

**侧边栏按钮和窗口关闭按钮重叠**

这是 DSH-better-sidebar 在 Windows 无边框窗口下的已知问题，表现为侧边栏切换按钮和窗口最小化/最大化/关闭按钮重叠。目前官方没有默认修复，需要手动修改插件文件中的 `titleBarCompat` 配置项。如果遇到这个问题，再单独处理。

**不想用桌面版了怎么卸载**

```powershell
dsh plugin --profile desktop remove dsh-better-sidebar
```

或者手动操作：

```powershell
cd "$env:USERPROFILE\.dsh\profiles\desktop"
pnpm remove dsh-better-sidebar
```

然后打开 `package.json`，把 `bundles` 数组中的 `"dsh-better-sidebar"` 删掉，重启 DSH Desktop 即可。

