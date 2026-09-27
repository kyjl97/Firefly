---
title: OBS录频跟随插件
published: 2026-07-01
tags:
  - 软件推荐
  - OBS
  - 直播
category: Software
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260817224506806.webp
---
录屏、直播、教程视频里最尴尬的事：观众根本看不到鼠标在哪。操作一晃就丢，观众盯着画面看空气。

最近发现一个 OBS 插件 **Zoominator** 专门治这个问题：它会自动缩放整个场景，让画面中心始终跟着鼠标走，观众永远不会错过正在操作的位置。

它工作在**场景级别**，也就是说不用对每个源单独配置，任何来源的画面都能自动跟随，装上就能用。

开源地址： mmlTools/zoominator

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260817224506806.webp)

## 功能亮点

- **场景级缩放跟随**：整个场景平滑缩放平移，以鼠标位置为中心，操作到哪看到哪。
- **智能裁剪**：缩放时画面永远盖满画布，不会露出黑边，裁切过的源也有效。
- **鼠标驱动聚焦**：注意力始终跟着光标走，适合演示操作细节。
- **超宽屏边缘追踪**：可选开启，让光标保持居中，直到画面碰到边缘。
- **空闲冻结**：鼠标停一段时间自动暂停跟随，画面稳定不晃，一动又恢复。
- **点击高亮光环**：可选的点击视觉反馈，观众能看清每次点击的位置。
- **灵活激活**：支持切换或按住模式，可自定义按键组合。

## 下载

GitHub 搜索 mmlTools/zoominator，进入 releases 页面下载即可。

如下载不便，公众号回复关键词 **260817** 获取资源！

迅雷链接：https://pan.xunlei.com/s/VP-FGNuGQPpJraewvAMtgbtXA1?pwd=9cbe#

## 安装

**Windows**
下载最新 release，解压后把 `zoominator.dll` 放进 OBS 插件目录，重启 OBS：

```
C:\Program Files\obs-studio\obs-plugins\64bit
```

**macOS**
下载 `.pkg` 或 `.dmg`，安装后重启 OBS。需要给 OBS 开启**辅助功能权限**才能追踪鼠标。

**Linux（X11）**
从源码构建或安装包，把插件文件放进：

```
~/.config/obs-studio/plugins/
```

重启 OBS。

## 使用说明

插件位置放在
```
C:\Program Files\obs-studio\obs-plugins\64bit
```

插件位置：顶部的标题栏里面→工具（最下面）
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260817223322314.webp)

进入插件后，我们需要配置一下触发器，点击【Dialog.Tab.Trigger】
- Dialog.Trigger.Keyboard（键盘）→你只需要设置一个快捷键就可以控制。
- Dialog.Trigger.MouseButton（鼠标）→你可以通过鼠标的左键、右键、中键以及侧边栏的上键、下键。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260817223703571.webp)


## 兼容性说明

- **Windows**：完整支持，全局输入加平滑跟随。
- **macOS**：需要辅助功能权限。
- **Linux（X11）**：通过 XInput2 支持。
- **Wayland**：能识别原生会话并自动禁用 X11 钩子，快捷键走 Global Shortcuts portal；但目前 Wayland 没有标准的全局光标位置方案，完整鼠标跟随还需要合成器级别的输入捕获支持，用 Wayland 的朋友注意。

## 适用场景

- 教程、直播写代码
- 产品演示
- 游戏分析与复盘
- 竖屏 / 短视频内容

以上就是本期内容，安装使用有任何问题，我提供一对一远程服务，手把手帮你解决，高效上手不踩坑。咱们下期见！

得救之道远程技术支持：fix.kyjl97.github.io
