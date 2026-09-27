---
title: Codex皮肤指南
published: 2026-07-20
tags:
- ai
- codex
category: AIHacks
draft: false
pinned: false
image: 
---
⚠️此教程仅针适用于Windows 离线安装Codex

## 安装

进入项目目录，运行安装脚本：

```powershell
cd D:\zed-workspace\tools\Codex-Dream-Skin
powershell -ExecutionPolicy Bypass -File .\install-portable.ps1 -CodexExe "D:\zed-workspace\tools\Codex-Dream-Skin\start-portable.ps1"
```

安装后会在桌面创建一个快捷方式，但目前创建的快捷方式打开有点问题。

## 启动 Codex（带皮肤）

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "D:\zed-workspace\tools\Codex-Dream-Skin\start-portable.ps1"
```

> 或者直接双击桌面上的 **Codex Dream Skin** 快捷方式。

## 启动托盘换皮肤工具

```powershell
powershell -NoProfile -STA -WindowStyle Hidden -ExecutionPolicy Bypass -File "D:\zed-workspace\tools\Codex-Dream-Skin\windows\scripts\tray-dream-skin.ps1"
```

> 启动后在右下角系统托盘出现图标，**右键点击**弹出菜单。

## 托盘菜单功能

| 菜单项 | 作用 |
|--------|------|
| 应用或重新应用 | 重新加载皮肤 |
| 暂停皮肤 / 继续显示皮肤 | 临时关闭/恢复皮肤 |
| 更换背景图 | 导入自己的图片作为皮肤 |
| 保存当前主题 | 把当前背景存为一个新主题 |
| 已保存主题 | 切换到已保存的某个主题 |
| 打开图片文件夹 | 查看所有导入过的背景图 |
| 完全恢复 Codex | 还原成 Codex 原始外观 |
| 退出托盘 | 关闭托盘（不影响 Codex） |

## 换皮肤流程

1. 启动 Codex（用上面的命令）
2. 启动托盘（用上面的命令）
3. 右键点击右下角托盘图标
4. 点「更换背景图」选一张你喜欢的图片（推荐 2560×1440）
5. 自动生效，Codex 界面立刻变化

## 恢复原始外观

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "D:\zed-workspace\tools\Codex-Dream-Skin\windows\scripts\restore-dream-skin.ps1"
```

## 注意事项

- 每次打开 Codex 都要通过命令或快捷方式启动，直接双击 Codex 图标不会带皮肤
- 皮肤本质是注入背景图，不会修改 Codex 程序本身
- 换的背景图会保存在 `%LOCALAPPDATA%\CodexDreamSkin\images` 目录


### 参考资料
https://mp.weixin.qq.com/s/KDL0cDQhyTB8Js6CMTseZA