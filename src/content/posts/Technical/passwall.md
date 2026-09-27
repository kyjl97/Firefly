---
title: passwall插件使用指南
published: 2026-03-16
tags:
  - Openwrt
category: Technical
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/passw.webp
---

网传passwall删库跑路，实则是换库而已。目前passwall2还是可以用之前的方式升级安装，但也可以用下面的方式升级。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/passw.webp)

## 一、登录软路由后台

如果你软路由有终端，也可以直接在终端登录，效果一样。

1. 方式1：软路由后台终端
2. 方式2：电脑本地终端（ssh root@192.168.5.2）
3. 方式3：ssh工具[MobaXterm汉化版](https://github.com/RipplePiam/MobaXterm-Chinese-Simplified/releases)

## 二、添加opkg key

```
wget -O passwall.pub https://master.dl.sourceforge.net/project/openwrt-passwall-build/passwall.pub
opkg-key add passwall.pub
```

## 三、添加opkg repository

```
read release arch << EOF
$(. /etc/openwrt_release ; echo ${DISTRIB_RELEASE%.*} $DISTRIB_ARCH)
EOF
for feed in passwall_luci passwall_packages passwall2; do
  echo "src/gz $feed https://master.dl.sourceforge.net/project/openwrt-passwall-build/releases/packages-$release/$arch/$feed" >> /etc/opkg/customfeeds.conf
done
```

## 四、安装最新的passwall

```
opkg update
opkg install luci-app-passwall
```

**如果是安装passwall2，执行以下代码**

```
opkg update
opkg install luci-app-passwall2
```

## 五、安装中文包

如果你打开是英文版的，可继续执行如下代码，安装中文包

```
opkg install luci-i18n-passwall-zh-cn
opkg install luci-i18n-passwall2-zh-cn
```

PS.如果你之前passwall的版本太老，或是不能正常使用，可重启软路由或者执行下面的代码

```
/etc/init.d/uhttpd restart
```

## **相关来源**

> - passwall最新的github地址： [ 点此查看](https://github.com/Openwrt-Passwall/openwrt-passwall)
> - passwall2的github地址： [点此查看](https://github.com/Openwrt-Passwall/openwrt-passwall2/releases)
>
> - 官方安装教程：[点此查看](https://github.com/moetayuko/openwrt-passwall-build)