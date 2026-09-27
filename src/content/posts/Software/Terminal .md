---
title: Terminal安装与使用
published: 2026-02-15
tags:
  - 终端
category: Software
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260419202153089.webp
---

运维工作中高频的命令行操作，向来因 Windows 原生命令提示符、PowerShell 的功能局限受掣肘。而 Windows Terminal 的推出完美解决这一痛点，它的多标签页设计是核心亮点：可以同时打开多个独立会话，像 Claude、OpenCode 这类工具都能在不同标签页中并行运行，无需频繁切换窗口；同时还能无缝集成 Command Prompt、PowerShell、WSL 等各类环境，大幅提升运维终端操作效率，是运维人员打造高效、美观、多功能终端环境的优质选择



![img](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260306070237226.webp)

## 一、下载与安装
### winget方式

```
winget install Microsoft.WindowsTerminal
```

```
winget upgrade Microsoft.WindowsTerminal
```

```
winget uninstall Microsoft.WindowsTerminal
```
### releases方式
1. 下载地址：[点此查看](https://github.com/microsoft/terminal/releases)

2. 解压文件到指定安装目录（示例）：`
D:\software\terminal-1.23.20211.0`

3. （可选）将解压目录添加到**系统环境变量**，实现全局快速调用

双击目录内的 `Wt.exe`，即可启动程序

![img](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260306064800835.webp)

## 二、核心配置

点击界面中的「设置」，选择「打开 JSON 文件」；

实际文件路径（复制即可用）
```
%LOCALAPPDATA%\Microsoft\Windows Terminal\settings.json
```

将原有配置内容全部替换为以下代码（其中背景图`meinv.png`可添加`kyjl97`领取，需自行修改背景图文件路径）：

```
{
    "$help": "https://aka.ms/terminal-documentation",
    "$schema": "https://aka.ms/terminal-profiles-schema",
    "actions": [],
    "alwaysOnTop": false,
    "alwaysShowNotificationIcon": true,
    "centerOnLaunch": true,
    "copyFormatting": "none",
    "copyOnSelect": false,
    "defaultProfile": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
    "initialCols": 90,
    "initialPosition": "100,50",
    "initialRows": 26,
    "keybindings":
    [
        {
            "id": "Terminal.CopyToClipboard",
            "keys": "ctrl+c"
        },
        {
            "id": "Terminal.PasteFromClipboard",
            "keys": "ctrl+v"
        },
        {
            "id": "Terminal.DuplicatePaneAuto",
            "keys": "alt+shift+d"
        }
    ],
    "language": "zh-Hans",
    "launchMode": "default",
    "newTabMenu":
    [
        {
            "type": "remainingProfiles"
        }
    ],
    "profiles":
    {
        "defaults":
        {
            "backgroundImage": "D:/web3/meinv.png",
            "backgroundImageOpacity": 0.45,
            "colorScheme": "One Half Light",
            "font":
            {
                "face": "AdwaitaMono Nerd Font Propo",
                "size": 13
            },
            "foreground": "#DCDFE4",
            "intenseTextStyle": "bold",
            "opacity": 35,
            "useAcrylic": true
        },
        "list":
        [
            {
                "commandline": "powershell.exe -nologo",
                "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
                "hidden": false,
                "name": "Windows PowerShell"
            },
            {
                "colorScheme": "Solarized Dark",
                "commandline": "powershell.exe -nologo",
                "experimental.retroTerminalEffect": false,
                "font":
                {
                    "cellHeight": "1.1",
                    "size": 13
                },
                "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
                "hidden": false,
                "name": "\u547d\u4ee4\u63d0\u793a\u7b26"
            },
            {
                "guid": "{b453ae62-4e3d-5e58-b989-0a998ec441b8}",
                "hidden": false,
                "name": "Azure Cloud Shell",
                "source": "Windows.Terminal.Azure"
            }
        ]
    },
    "schemes": [],
    "themes": []
}
```

## 三、集成右键菜单

将 Windows Terminal 添加到鼠标右键菜单，可实现任意目录下一键打开终端，大幅提升操作便捷性，步骤如下：

> 需将路径修改为你的 Terminal 实际安装路径
> 编码选择**ANSI**

### Terminal右键.reg

```
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\Background\shell\WindowsTerminal]
@="在此处打开Terminal"
"Icon"="D:\\software\\terminal-1.23.20211.0\\WindowsTerminal.exe,0"

[HKEY_CLASSES_ROOT\Directory\Background\shell\WindowsTerminal\command]
@="D:\\software\\terminal-1.23.20211.0\\WindowsTerminal.exe -d ."

[HKEY_CLASSES_ROOT\Directory\shell\WindowsTerminal]
@="在此处打开Terminal"
"Icon"="D:\\software\\terminal-1.23.20211.0\\WindowsTerminal.exe,0"

[HKEY_CLASSES_ROOT\Directory\shell\WindowsTerminal\command]
@="D:\\software\\terminal-1.23.20211.0\\WindowsTerminal.exe -d \"%1\""
```

### 附：cmd右键.reg

```
Windows Registry Editor Version 5.00

; 桌面/文件夹空白右键
[HKEY_CLASSES_ROOT\Directory\Background\shell\OpenCMD]
@="打开Cmd"
"Icon"="cmd.exe,0"

[HKEY_CLASSES_ROOT\Directory\Background\shell\OpenCMD\command]
@="cmd.exe"

; 文件夹本体右键
[HKEY_CLASSES_ROOT\Directory\shell\OpenCMD]
@="打开Cmd"
"Icon"="cmd.exe,0"

[HKEY_CLASSES_ROOT\Directory\shell\OpenCMD\command]
@="cmd.exe /k cd /d \"%1\""
```

### 附：bash右键.reg
```
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\Background\shell\OpenBash]
@="打开Bash"
"Icon"="C:\\Program Files\\Git\\mingw64\\share\\git\\git-for-windows.ico"

[HKEY_CLASSES_ROOT\Directory\Background\shell\OpenBash\command]
@="\"C:\\Program Files\\Git\\git-bash.exe\" --cd=\"%V\""

[HKEY_CLASSES_ROOT\Directory\shell\OpenBash]
@="打开Bash"
"Icon"="C:\\Program Files\\Git\\mingw64\\share\\git\\git-for-windows.ico"

[HKEY_CLASSES_ROOT\Directory\shell\OpenBash\command]
@="\"C:\\Program Files\\Git\\git-bash.exe\" --cd=\"%1\""
```

一键删除注册表示例：

```
Windows Registry Editor Version 5.00

[-HKEY_CLASSES_ROOT\Directory\Background\shell\OpenCMD]
[-HKEY_CLASSES_ROOT\Directory\shell\OpenCMD]
```

## 四、美化配置

需要借助Oh My Posh实现，这是是一个用来美化终端界面的工具，它能让你的命令行看起来更漂亮，同时还能显示 Git 状态、系统资源等实用信息。

### 1. 下载安装

下载地址：[Oh My Posh 官方发布页](https://github.com/JanDeDobbeleer/oh-my-posh/releases)，根据自身系统选择对应安装包完成安装。

### 2. 配置系统变量

将 Oh My Posh 的 bin 目录路径（示例：`C:\Users\Administrator\AppData\Local\Programs\oh-my-posh\bin`）添加到系统环境变量，确保全局可调用。

### 3. 配置主题生效

- 按下`win+R`，输入`wt`打开 Windows Terminal；

- 在终端中输入以下命令，创建并编辑 PowerShell 配置文件：

```
notepad $PROFILE
```

- 在打开的记事本中，粘贴以下配置代码，保存并关闭文件：

```
oh-my-posh init pwsh --config $env:POSH_THEMES_PATH\M365Princess.omp.json | Invoke-Expression
```

- 重启 Windows Terminal，主题即可生效。


### 4.设置启动大小

启动窗口大小可在**设置-启动-启动大小**处调整，

2K分辨率，缩放124%，设置为**100、35**

**启动大小（窗口）&启动参数（位置）**

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260419202153089.webp)

### 隐藏启动提示信息

在Terminal设置-配置文件，分别在命令提示符/PowerShel

命令行输入下面命令，可隐藏默认的启动提示信息，让终端界面更简洁。

```
powershell.exe -nologo
```

![img](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260306070410108.webp)

### 安装专属字体

终端配置中需用到 AdwaitaMono Nerd Font 字体，下载地址：[Nerd Fonts 官方下载页](https://www.nerdfonts.com/font-downloads?utm_source=chatgpt.com)，下载后解压安装即可。

###  代码自动补全

打开 Windows Terminal

输入这 2 条命令（复制粘贴）：

```
Install-Module PSReadLine -Force -SkipPublisherCheck
notepad $PROFILE
```

在打开的文件里粘贴这段：

```
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle InlineView
Set-PSReadLineOption -EditMode Windows
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete
```

### 手动添加 Git Bash 配置

Windows Terminal → 下拉箭头 →「设置」→「添加新配置文件」→「新建空配置文件」

> 填写：
>
> 名称：Git Bash
>
> 命令行：C:\Program Files\Git\bin\bash.exe --login -i
>
> 起始目录：%USERPROFILE%
>
> 图标：C:\Program Files\Git\mingw64\share\git\git-for-windows.ico
>
> 保存，重启终端即可。

## 五.常见问题

### 拖动文件形成目录形成不了文件目录

解决办法：MFCMouseEffect中添加手势映射：左键拖拽向→=复制

操作的时间，左键选中一个文件，向右拖拽在后右键单击

###  Ctrl+V 无法在粘贴图片

在 Windows Terminal 中使用 Kimi Code CLI 时，Ctrl+V 快捷键无法粘贴剪贴板中的图片。这是因为 Windows Terminal 默认会拦截 Ctrl+V 用于自身的粘贴操作，导致该快捷键无法传递给 Kimi CLI。



可以使用 `Alt+V` 粘贴图片。 `M-V`也可以需绑定 [参照](https://github.com/MoonshotAI/kimi-cli/issues/781)

```
# 同时绑定两个快捷键
@_kb.add("c-v", eager=True)
@_kb.add("escape", "v", eager=True)  # Alt+V
```

### 启动Claude code 右键不能自动粘贴

开启  NO_FLICKER 模式（无闪烁模式）会造成这种情况，编辑 Claude Code 的配置文件夹 -/.claude/settings.json，找到

```
    "CLAUDE_CODE_NO_FLICKER": "1"
```

改成

```
    "CLAUDE_CODE_NO_FLICKER": "0"
```

## 类似的工具
### warp：
https://www.warp.dev/

### WezTerm
https://jieliu.me/posts/software/wezterm/