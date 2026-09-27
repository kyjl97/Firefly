---
title: WezTerm终端安装与使用
published: 2026-04-06
tags:
  - 终端
category: Software
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260406201347691.webp
---
今天分享一套**颜值高、速度快、功能强**的终端组合：


- **WezTerm**：GPU 加速终端模拟器
- **Nushell**：现代化、结构化、跨平台 Shell
- **Starship**：极简、快速、可定制的命令行提示符

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260406201347691.webp)

## 一、先安装 3 个工具

### 1. WezTerm

    https://wezterm.org/install/windows.html
    Windows (setup.exe)「推荐」
    会自动集成在鼠标右键上下文菜单中
    建议安装默认位置

###  Nushell二进制文件

    https://github.com/nushell/nushell/releases
    下载nu-0.109.1-x86_64-pc-windows-msvc.msi


### Starship

    https://github.com/starship/starship/releases/tag/v1.24.2
    下载starship-x86_64-pc-windows-msvc.msi


**附:winget下载安装命令**

```powershell
winget install wez.wezterm
winget install Nushell.Nushell
winget install Starship.Starship
```



## 二、核心配置

#### 1. WezTerm 配置：默认启动 Nushell

新建：C:\Users\你的用户名.wezterm.lua
自用配置文件：[点此查看](https://github.com/kyjl97/cfg/blob/main/WezTerm/.wezterm.lua)

需要安装 `CaskaydiaCove Nerd Font` 字体才能正常显示图标。



#### 2. Nushell 配置：自动加载 Starship

- C:\Users\Administrator\AppData\Roaming\nushell\config.nu

- 自用配置文件：[点此查看](https://github.com/kyjl97/cfg/blob/main/WezTerm/config.nu)


#### 3. Starship 配置（可选美化）

 我的使用的是[Pastel Powerline Preset](https://starship.rs/zh-CN/presets/pastel-powerline)主题
 一键创建配置文件（C:\Users\Administrator.config\starship.toml）

```
starship preset pastel-powerline -o ~/.config/starship.toml
```

自用配置文件：[点此查看](https://github.com/kyjl97/cfg/blob/main/WezTerm/starship.toml)

## 三、使用说明
#### 最终效果

这是一个高度自定义的 WezTerm 终端配置文件，专门针对日常开发、AI 聊天（如 Qwen Code）和美观体验进行了优化。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260420182653671.webp)


![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260406171739845.webp)

#### **配置说明：**

- 使用 OneHalfDark 配色方案，文字颜色为柔和灰色（#D4D4D4），长时间阅读更护眼。
- 隐藏系统标题栏，仅保留可调整大小的边框，窗口顶部保留 30px 透明区域用于视觉美观。
- 背景使用自定义图片（D:/data/images/meinv.png），并设置了适当的透明度和亮度。
- 默认启动 NuShell，并提供 NuShell、PowerShell、Cmd 的快速启动菜单。
- 字体使用 CaskaydiaCove Nerd Font，大小为 14，适合编程和阅读。
- 启动时窗口自动居中显示，初始大小为 120 列 × 40 行，关闭窗口时不提示确认。
- 该终端工具启动时将自动打开4个标签页并分别运行对应智能体：标签1执行`qwen -y`，标签2执行`claude --dangerously-skip-permissions`，标签3启动`gemini`，标签5为普通Shell。
- 4 个标签页都有清晰标题

**鼠标操作优化：**
- 右键：智能处理，有选中文字时自动复制并清除选中，无选中时直接粘贴。
- 普通左键点击和拖拽：用于正常选中文字。
- Shift + 左键拖拽：安全选中文字模式，推荐在 Qwen Code 等 AI 聊天工具中使用，可有效避免选中时打断输出（Request cancelled）或自动跳回底部的问题。
- Ctrl + 左键拖拽：用于拖动整个窗口，无需按住其他额外按键即可移动窗口。

**快捷键：**
- 支持 Ctrl + t 新建标签页、Ctrl + w 关闭当前面板、Alt + w 关闭当前标签页。
- 支持 Alt + Shift + 方向键进行面板分割，Ctrl + 方向键切换面板。
- 支持 Ctrl + 1~8 快速切换标签页。
- Ctrl + u 清空当前行。

**其他设置：**
- 启用 HTTP 代理（127.0.0.1:7890），便于终端内工具走代理。
- 设置 bypass_mouse_reporting_modifiers 为 SHIFT，进一步提升在支持鼠标报告的程序中的兼容性。

此配置兼顾了美观、实用性和 AI 聊天场景下的稳定性，适合需要高自定义终端的用户使用。

**后续标签增删话术**
```
C:\Users\Administrator\.wezterm.lua把启动区块从 4 个标签改成 3 个，并按顺序：Claude → Qwen → Shell。
```

#### 快捷键总览

| 快捷键               | 功能说明                      |
| ----------------- | ------------------------- |
| `Ctrl + t`        | 新建标签页 (SpawnTab)          |
| `Ctrl + w`        | 关闭整个窗口 (CloseCurrentPane) |
| `Alt + w`         | 关闭当前标签页 (CloseCurrentTab) |
| `Ctrl + u`        | 清空当前行 (Send Ctrl+U)       |
| `Alt + Shift + →` | 水平分割面板 (SplitHorizontal)  |
| `Alt + Shift + ↓` | 垂直分割面板 (SplitVertical)    |
| `Ctrl + ←`        | 切换到左侧面板                   |
| `Ctrl + →`        | 切换到右侧面板                   |
| `Ctrl + ↑`        | 切换到上方面板                   |
| `Ctrl + ↓`        | 切换到下方面板                   |
| `Ctrl + 1`        | 切换到标签页 1                  |
| `Ctrl + 2`        | 切换到标签页 2                  |
| `Ctrl + 3`        | 切换到标签页 3                  |
| `Ctrl + 4`        | 切换到标签页 4                  |
| `Ctrl + 5`        | 切换到标签页 5                  |
| `Ctrl + 6`        | 切换到标签页 6                  |
| `Ctrl + 7`        | 切换到标签页 7                  |
| `Ctrl + 8`        | 切换到标签页 8                  |

#### 鼠标快捷键

| 操作                          | 功能说明                                      |
|-------------------------------|-----------------------------------------------|
| 右键单击                      | 有选中文字 → 复制并清除选中<br>无选中 → 粘贴 |
| 左键点击 + 拖拽               | 正常选中文字                                  |
| **Shift + 左键拖拽**          | 安全选中文字（推荐用于 Qwen 聊天，避免打断输出） |
| **Ctrl + 左键拖拽**           | 拖动窗口                                      |

**提示**：
- 在 Qwen Code 等 AI 聊天界面中，强烈推荐使用 `Shift + 左键拖拽` 来选中历史文字，可大幅减少 “Request cancelled” 问题。
- 需要移动窗口时请使用 `Ctrl + 左键拖拽`。

## 四、常见问题（Q&A）

**Q1：右键为什么有时候复制，有时候粘贴？**
A1：右键采用了智能逻辑。如果当前有选中文字，右键会自动复制并清除选中；如果没有选中文字，右键则直接粘贴剪贴板内容。这样使用更方便。

**Q2：在 Qwen Code 等 AI 聊天时，选中文字经常出现 “Request cancelled” 怎么办？**
A2：这是因为程序开启了鼠标报告模式。解决方法是按住 **Shift** 键，再用左键拖拽选中文字。这样可以绕过鼠标报告，避免打断 AI 输出。

**Q3：如何拖动窗口？**
A3：按住 **Ctrl** 键 + 左键拖拽 即可移动窗口。普通左键拖拽用于选中文字，不会触发窗口移动。

**Q4：为什么我直接左键选中文字还是会打断 AI 输出？**
A4：因为 AI 聊天工具会捕获鼠标事件。推荐始终使用 **Shift + 左键拖拽** 来安全选中历史内容。如果问题依然严重，可以临时按住 Shift 滚动鼠标查看历史。

**Q5：如何快速切换标签页？**
A5：使用快捷键 `Ctrl + 1` 到 `Ctrl + 8` 可以快速切换到对应的标签页。

**Q6：背景图片不显示或太亮/太暗怎么办？**
A6：检查图片路径是否正确（当前路径为 D:/data/images/meinv.png）。可以调整 background 中的 opacity 值（当前为 0.85），数值越小*背景越透明*。

**Q7：配置修改后没有生效怎么办？**
A7：按快捷键 `Ctrl + Shift + R` 重新加载配置。如果仍然无效，请完全关闭 WezTerm 后再重新打开。

**Q8：如何恢复默认设置？**
A8：删除或重命名 `wezterm.lua` 文件，然后重启 WezTerm 即可使用默认配置。

**Q8：codex、gemini正常启动，Claude Code 启动没有响应**
打开wezterm.lua，找到这一行：
```
config.default_prog = { 'nu' }
```
直接替换成：
```
config.default_prog = { 'powershell.exe', '-NoLogo' }
```


### 补充 2026/07/26

Typora 团队出的终端，Mac已上线，Windows没有上线
https://otty.sh/
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260726021102290.webp)

con-terminal  终端
https://github.com/nowledge-co/con-terminal