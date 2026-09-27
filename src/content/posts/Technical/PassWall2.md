---
title: PassWall2使用指南
published: 2026-03-17
tags:
  - Openwrt
category: Technical
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/Gemini_Generated_Image_fehtoyfehtoyfeht.webp
---



在OpenWrt 路由器上部署科学上网工具时，许多用户都希望实现一套“最省心”的方案：既能彻底杜绝 DNS 泄露与污染，又能完美兼容 IPv4/IPv6 双栈环境，同时自带可靠的去广告功能，PassWall2 正是目前最接近这一理想状态的插件之一。它基于 Xray/Sing-box 核心，内置强大的分流引擎和 DNS 处理能力，经过合理配置后，能在不关闭 IPv6、不强制禁用 AAAA 记录的前提下，实现干净、稳定、高效的上网体验。



本文将详细分享一套经过实践验证的 PassWall2 配置流程，按照此方案配置完成后，你将获得：

- 无 DNS 泄露、无明显污染
- IPv4 与 IPv6 真正双栈共存
- 内置高效广告屏蔽
- 全程无需额外插件辅助

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/Gemini_Generated_Image_fehtoyfehtoyfeht.webp)

## 规则管理

> 删除默认的所有规则，然后添加Reject规则、Direct规则、Proxy规则
>
> - geosite:category-ads-all  去广告
> - xn–ngstr-lra8j.com        谷歌商店
> - geosite:private             内网地址
> - geosite:cn                   国内域名
> - geoip:private               内网IP
> - geoip:cn                     国内IP
> - geosite:geolocation-!cn   国外域名



1. **Reject规则**

```
域名：geosite:category-ads-all
```



2. **Direct规则**

```
域名：
xn-ngstr-lra8j.com
geosite:private
geosite:cn

Ip
geoip:private
geoip:cn
```

3. **Proxy规则**

```
域名：
geosite:geolocation-!cn
```

## 高级设置

> 1.如果不使用UDP代理，就把UDP不转发端口改成-所有，即可
> 2.设置TCP转发端口为：仅网页 ，也就是仅允许代理80、443这两个端口
> 3.TCP代理方式可以改成TPROXY，也可以默认REDIRECT（勾选IPv6透明代理(TProxy)后，会自动变更为TPROXY）
> 4.如果你的节点支持IPv4/IPv6互通或者有IPv6的出口IP，可以勾选IPv6透明代理(TProxy)，反之不勾选

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/PixPin_2026-03-17_12-54-47.webp)

## 基本设置

### DNS

> 走分流模式的话：
> 1.“远程 DNS 协议”建议选择 DoH
> 2.“远程 DNS DoH”选择 CloudFlare
> 3.“远程 DNS EDNS Client Subnet”选择你节点地区的一个 IP （比如新加坡）到这里选一个 ip ，对应新加坡{https://public-dns.info/nameserver/sg.html}填进去，比如 58.185.92.216 。
> 4.“远程 DNS 出站”选择远程
> 5.“FakeDNS”不要勾选，否则可能导致 DNS leak
> 6.“远程查询策略”，看你的线路，如果不想远程查询 ipv6 ，那选择 UseIPv4 就行了，损失是你可能没法解析外部网站的 ipv6 了
> 7.“域名重写”，默认就好，除非你有特殊需求
> 8.“直连 DNS 解析结果写入到 IPSet”默认就好，除非有问题再改
> 设置好保存，建议执行一次“清空 IPSet”。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260317130009116.webp)

### 主要

节点选择-Xray 分流，有个编辑点击，进入进行如下设置

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/PixPin_2026-03-17_13-13-17.webp)



上述都配置完成后，就能够解决DNS泄露、污染问题和去广告，并且支持双栈IPv4+IPv6，不需要再去套任何插件和关闭或禁止解析 IPv6 DNS 记录等。

## 常见问题

1. **passwall2更新节点后，我的分流选项消失了**

分流节点可能更新时被删了；在passwall中，节点列表>添加>类型：xray/sing-box>传输协议：分流，后面依据个人用途选择后添加即可



**2. 电脑打开油管正常，手机能打开youtube网站/APP，但是看不了视频怎么回事**

高级设置里，TCP转发端口，确保开启了 **UDP 转发**





## 相关来源

[passwall2完美配置](https://macin.top/posts/9fc528b9/index.html)

[Pass Wall2解决DNS泄露IPv4+IPv6双栈共存配置](https://mtom.top/archives/Pass-Wall2%E8%A7%A3%E5%86%B3DNS%E6%B3%84%E9%9C%B2IPv4-IPv6%E5%8F%8C%E6%A0%88%E5%85%B1%E5%AD%98%E9%85%8D%E7%BD%AE%E6%95%99%E7%A8%8B/?highlight=%E5%8F%8C)

[关于passwall2更新节点后分流消失的问题](https://github.com/Openwrt-Passwall/openwrt-passwall2/discussions/234)

[Geo规则的问题，导致无法正常访问Gemini](https://github.com/Openwrt-Passwall/openwrt-passwall2/issues/965)



