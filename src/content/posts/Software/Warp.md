---
title: Warp终端测评记录
published: 2026-05-07
tags:
  - 终端
category: Software
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260510004653994.webp
---
10小时GitHub狂揽3万星，OpenAI亲自下场成为Founding Sponsor，由Rust原生打造的Warp终端，正在以颠覆性的方式，彻底改写开发者对命令行工具的认知。

### 安装
- 官网：warp.dev
- winget安装命令安装
```
winget install Warp.Warp
```


![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260510004653994.webp)



### 更好主题
在 Warp 里按 `Ctrl + ,`  搜索→ Themes

### 关闭启动提示
1. 右下角有个 **"Don't show again"** 按钮，直接点它就行。
2. 如果点了还弹，设置搜索Warp Agent ，关闭Include agent-executed commands in history

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260510001737774.webp)



### cc启动Claude

在 Warp里执行命令

```
notepad $PROFILE
```

然后把这段代码粘贴进去
```
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/M365Princess.omp.json" | Invoke-Expression

function cc { claude --dangerously-skip-permissions }
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260510005702430.webp)


### 一键右键粘贴
1. 安装 **AutoHotkey**
2. 新建 `Warp_RightClick_Paste.ahk`：
```
#IfWinActive ahk_exe warp.exe
~RButton::
    SendInput ^+v  ; 发送 Ctrl+Shift+V
    return
#IfWinActive
```

3. 运行脚本 → **右键 = 直接粘贴**

### 常用快捷键

| 快捷键                  | 功能说明       |
| ---------------------- | ------------- |
| `Ctrl + ,`             | 打开设置       |
| `Ctrl + P`             | 查看历史输入命令 |
| `Ctrl + Shift + T`     | 新建终端会话   |
| `Ctrl + Shift + V`     | 粘贴          |
| `Ctrl + Shift + D`     | 右拆分窗格     |
| `Ctrl + Alt + ↑ / ↓`   | 切换光标       |
| `Ctrl + Shift + B`     | 显示/隐藏左侧栏 |

体验下来，Warp 的垂直侧边标签体验格外出色，多开 AI Agent 会话一目了然，批量切换工作流也十分顺手。

唯一小小的遗憾就是，软件默认右键无法直接一键粘贴，稍微影响日常操作的流畅度。

即便有这点小瑕疵，也完全不影响它作为终端工具的综合实力，侧边标签加持下的多会话管理，依旧是重度多开、常驻 AI Agent 用户的绝佳选择。


