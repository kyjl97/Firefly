---
title: Cloudflare推出Agent钱包
published: 2026-08-04
tags:
  - ai
  - agent
  - api
  - cloudflare
  - wallet
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260804234020861.webp
---
Cloudflare 推出了一个专门给 Agent 用的钱包，它有一个唯一的地址和用户名，这个有意思啊！ 领了以后，你的 Agent 就可以用这个钱包来支付 API 和内容的费用。 可以先申请一个自己名字的，以防被人抢注。

### 注册步骤


打开后cloudflare.pay，输入一个自己的名字。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260804234020861.webp)

点击授权Authorize

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260804233951220.webp)

至此，这张卡片就成为你的了。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260804234049640.webp)


### 钱包类型

钱包账户：是你作为人类拥有的钱包，可以充值、提现，也可以把支出权限委托出去

虚拟钱包：是专门为 Agent 设计的，通过 API Key 运行

关于虚拟钱包的支出控制和使用场景：

• 支出上限和规则：你可以给它设置支出上限，也可以通过允许列表（白名单）和规则进行控制

• 受控预算与自主探索：这样的设计可以让 Agent 在受控的预算内，自主探索各种服务

• 免去实时监控：我们人类没必要时刻监控它的支出，也不用担心它直接把卡刷爆


此外，它还通过 Cloudflare Pay 把钱包和账户身份关联起来。Agent 可以选择性地表明自己代表哪个组织，从而解决了 Agent 的身份认证问题（身份证明是可选的，也可以选择匿名）。

### 其他

Cloudflare 出品，给 AI agent 配了一台"电脑"

给 Agent 一个永不消失的工作区。SQLite 存文件,三种环境(完整容器 / shell / JS)随时开,换环境不换文件。

https://github.com/cloudflare/computer