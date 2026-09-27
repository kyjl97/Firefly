---
title: Deskflow键盘鼠标共享工具
published: 2026-05-26
tags:
  - tool
  - keyboard-mouse
category: Software
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-deskflow-keyboard-sharing-20260529-202419.webp
---
多台电脑同时干活，桌上摆几套键鼠又占地方又割裂。最近找到一款**Deskflow**软件，支持 Windows 和 macOS，一套键鼠就能控制多台设备，局域网即连即用。

鼠标移动到屏幕边缘自动滑到另一台电脑，就像多显示器一样自然。同时支持**剪贴板共享**，在一台设备复制文字、图片，另一台直接粘贴。

开源地址
https://github.com/deskflow/deskflow/releases

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-deskflow-keyboard-sharing-20260529-202419.webp)

### 配置步骤

**前置条件**：所有设备连在同一个局域网。

一、在**常用键鼠的那台电脑**上，选择 默认项目，点启动。记下界面显示的 IP 地址。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/1780123005581_d.webp)

二、在**被控制的电脑**上，选择 第个项目 模式，输入刚才的 IP，点连接。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/2026-05-30-14-39.webp)


三、连接成功后，鼠标就能在两台设备间自由移动了，剪贴板也自动共享。

注意  被控右边出 主控左边进
如果你想上下移动，只需在主控配置服务器，将计算机显示器拖动到所需位置来配置布局。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/1780123261423_d.webp)

*Tips*：若遇网络问题，可通过公众号：**得救之道** 后台回复 **Deskflow**，领取最新安装包下载地址。

### 常见问题

**连不上？** 两个检查点：
- 确保两个计算机名字不要唯一
- 关闭防火墙试试
- 在编译 → 首选项里关闭 TLS 加密

工具自带简体中文，在编辑-首选项-高级-语言，唯一的短板是不支持文件拖拽传输，但这属于锦上添花，日常操作已经够用了。

---
\>>>**延伸阅读**
- [1套键盘鼠标控制2台电脑](https://mp.weixin.qq.com/s/Pb6wnycAxgDxZmvj4cfx9Q)
- [MFCMouseEffect鼠标映射](https://mp.weixin.qq.com/s/YuyO7YIVx4XkCgxjaBJ22Q)
---
以上，既然看到这里了，如果觉得不错，随手**点个赞、在看、转发**三连吧！想第一时间收到推送，可以给我个星标⭐️～

谢谢你看我的文章，我们，下次再见。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/未命名的设计.webp)
*\>/ 作者：得救之道*
*\>/ 更多干货，请访问：[kyjl97.github.io](https://kyjl97.github.io/)*


**参考教程**
https://www.cnblogs.com/zjw-blog/p/18930736