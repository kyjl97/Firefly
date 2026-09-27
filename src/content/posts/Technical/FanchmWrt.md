---
title: FanchmWrt系统刷机
published: 2026-03-16
tags:
  - Openwrt
  - 技术教程
category: Technical
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/Gemini_Generated_Image_qp609cqp609cqp60.webp
---

FanchmWrt是一款完全开源的家庭防火墙系统，基于官方 OpenWrt 同源开发（代码已全开源，GitHub 可查），但它在内核层做了大量针对家用场景的深度优化，内置了许多原本只有企业级软路由或专业防火墙才有的功能。简单来说，它把 OpenWrt 的极致可玩性 + 企业级网络管控能力，塞进了一套对普通家庭用户更友好的界面和体验。

FanchmWrt官网：www.fanchmwrt.com/


最近闲来无事，给自己的 360T7从现有OpenWrt直接刷了 FanchmWrt，实际体验非常不错——配置简单、功能齐全、稳定性高。下面分享完整刷机步骤（以 Breed 不死 Uboot 方式为主，最安全、零变砖风险）。

（以 Breed 不死 Uboot 方式为主，最安全、零变砖风险）。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/Gemini_Generated_Image_qp609cqp609cqp60.webp)



## 一、准备工作

### 1. 下载对应固件

访问 http://download.ttcoder.cn/

找到360T7对应的**supgrade.itb**格式固件下载

三个文件的区别和选择建议（按OpenWrt通用命名规则）

| 文件名结尾           | 用途                                                         | 适合你的场景吗                |
| -------------------- | ------------------------------------------------------------ | ----------------------------- |
| factory.bin          | 工厂固件，专门用来从路由器官方原版系统第一次刷入第三方固件时使用 | ❌ 你已经是OpenWrt系统，不需要 |
| sysupgrade.bin       | 系统升级固件，用来在现有OpenWrt/第三方固件基础上直接升级，或者在Breed不死uboot中刷入 | ✅ 你现在就下这个！            |
| initramfs-kernel.bin | 临时测试固件，刷入后不会保存配置，重启就还原，一般用来救砖或者临时测试系统用 | ❌ 正常刷机不需要              |



## 二、刷机方法

### Breed不死uboot刷入（最安全，变砖风险为0）

> &#x20; 适合已经刷了Breed不死uboot的用户

1. 拔掉进入路由器的网线

2. 路由器关机状态下按住reset键不松开，插上电源，等待10秒后松开reset键

3. 电脑浏览器访问192.168.1.1进入Breed后台

4. 选择「固件更新」→「固件」，上传下载好的FanchmWrt固件

5) 点击「更新」，等待2-3分钟重启完成即可

## 三、初始配置

进入http://192.168.1.1/cgi-bin/luci/

账号 root  密码password

> 路由器密码：Ip+/cgi-bin/luci/admin/system/admin
>
> 主题模式：Ip+/cgi-bin/luci/admin/fwx_advance/system
>
> 高级设置：Ip+cgi-bin/luci/admin/status/overview

**旁路由配置参考**：https://kyjl97.github.io/op/

**最新passwall安装**：https://jieliu.me/posts/technical/passwall/



以上，如刷机过程中遇到任何问题欢迎评论区留言

得救之道远程技术支持→[fix.kyjl97.github.io](fix.kyjl97.github.io)

