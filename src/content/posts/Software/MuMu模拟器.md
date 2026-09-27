---
title: MuMu模拟器
published: 2024-08-22T14:20:00.000Z
tags:
  - 软件推荐
category: Software
draft: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20251130144036028.webp
---

MuMu模拟器作为市面上兼容性和稳定性极佳的安卓模拟器，一直是玩手游、刷视频及跑脚本用户的首选。不过默认设置下它会有一些开屏广告、桌面广告，本文将手把手教你：**最新版 MuMu 5.9 下载、广告屏蔽、壁纸自定义、快捷技巧等。**建议收藏转发.

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20251130144036028.webp)

## 一.软件下载

MuMu模拟器官网：
 https://mumu.163.com/



## 二.广告屏蔽

### 1.屏蔽开屏广告

在系统 Host 文件中添加如下规则👇

```
114.115.116.117 mumu.nie.netease.com
```

或者在文件添加如下代码

C:\Users\Administrator\AppData\Roaming\Netease\MuMuPlayer\data\startupImage\imageManager.json

```
{
"status": "PERMANENTLY_DISABLED",
"disableReason": "DEACTIVATED_BY_ADMIN",
"disableTimestamp": 9999999999,
"reEnableAllowed": false,
"originalData": { /* 保留原始数据但不使用 */ },
"display": false,
"enabled": false
}
```

### 2.删除桌面广告

直接替换系统镜像文件:**[点此下载](https://pan.xunlei.com/x/VOfIXk-qqm-IpJmek_9iba1DA1?pwd=2wqi#)**

Listary直接搜索system.vdi就会看到路径，路径为：

```
.\nx_device\12.0\vms\MuMuPlayer-12.0-base\system.vdi
```

3. ### 禁止自动更新

在系统 Host 文件中添加如下规则

```
127.0.0.1 mumu.nie.netease.com  #屏蔽mumu更新服务
```

设置出站规则即可，[参考视频](https://www.bilibili.com/video/BV1St411U7FU/?vd_source=206031f494850e57fd6c92ace02b1bed)

## 三.使用技巧

### 快捷启动

在桌面建立启动直达图标,双击即可直接启动指定的模拟器实例

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20251130144131759.webp)

### 壁纸更换

先打开电脑端共享文件夹,将你喜欢的壁纸拖进去

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20251130144134739.webp)

点击模拟器桌面的设置-壁纸，然后更换即可

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20251130144137855.webp)

经过这些配置之后，MuMu 就会变成一个干净优雅的虚拟空间，使用 MuMu 的过程中遇到任何问题，或者有更好用的优化技巧，欢迎在评论区交流分享。