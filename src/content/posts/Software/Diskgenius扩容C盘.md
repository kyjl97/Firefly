---
title: Diskgenius扩容C盘
published: 2026-05-16
tags:
  - 软件推荐
category: Software
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260515150349299.webp
---
日常使用电脑过程中，C 盘空间告急早已成为多数用户的常见困扰，系统运行卡顿、软件安装失败、更新无法完成等一系列问题接踵而至，严重影响整机使用体验。想要高效扩充 C 盘存储空间，无需重装系统、不用复杂分区命令，借助 DiskGenius 这款实用磁盘分区工具，便能轻松完成无损扩容操作。

### Diskgenius扩容
扩容前
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260515150349299.webp)

扩容后
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260515155140523.webp)

点击C盘，右键扩容分区

![844](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260515150429913.webp)

弹出对话框，需要把哪个盘的容量划给C盘，就点击哪个盘。看个人需求划盘可以是E.F
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260515150529269.webp)

**可以拉动中间位置，调整容量，也可以在分区前部的空间输出数字。**

> ⚠️注意：分区前部的空间输出的数字，是不包含原有容量的。
> D 盘分区前部划出 100.00GB，并选择合并到系统 (C:)。
> 合并后的C盘容量直接相加：150 GB + 100 GB = 250 GB
> 调整后 D 盘的总容量会从 781.1GB 减少到 681.09GB

**扩容后 C 盘「剩余可用空间」公式：**
扩容后C盘可用空间=扩容后C盘总容量−扩容前C盘已用空间
250-（150−12.5）=112.5 GB（实际使用中，可能会因为系统保留空间、文件系统元数据占用，有 1-5GB 的微小误差，属于正常现象）
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260515151832790.webp)


精简系统会提示如下

> 由于某些系统精简过度或丢失相关组件导致无法直接创建DiskGenius的Windows PE环境，此时就需要下载Windows AIK或[ADK工具](https://www.diskgenius.cn/help/windows_aik_adk_installnotes.php?Version=0A000000&Build=26200&Lang=936)包来完成创建Windows PE环境。**不过ADK安装比较慢，我习惯直接安装个PE环境操作很快。**

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260515152359368.webp)



### 手动扩容 

适用场景：你只有一个C盘，但需要一个D盘。

压缩卷-大小（NX1024）新建简单卷-D

### 命令



### 参考资料
360清理ProSysCleanPro
https://qltc.lanzoue.com/i7S3e19fu89i

Diskgenius
```
D:\software\图吧工具箱\图吧工具箱202502\tools\硬盘工具
```

参考视频
https://www.bilibili.com/video/BV1AY4y1Y7wB/?spm_id_from=333.337.search-card.all.click&vd_source=206031f494850e57fd6c92ace02b1bed)

