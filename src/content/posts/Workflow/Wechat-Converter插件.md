---
title: Wechat-Converter插件
published: 2026-05-04
tags:
  - Obsidian插件
category: Workflow
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260504184445684.png
---
最近使用了一款叫「Wechat Converter」的 Obsidian 插件，觉得挺好用的，支持一键将 Obsidian 中的 Markdown 文档推送至微信公众号草稿箱。

但由于我网络 IP 经常变化，直接请求微信 API 会被拦截，本文将详细拆解配置代理流程，重点解决代理服务部署问题，让你顺利落地插件功能。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260504184445684.png)

### 获取 AppID 与 AppSecret

在**微信开发者平台**获取公众号的核心凭证，用于插件与微信 API 对接：

进入「我的业务与服务 → 公众号 → 基础信息」，就可以看到「AppID」与「AppSecret」。

---

### 部署 CF Worker 服务

#### 第一步：创建 Cloudflare Worker

1. 登录 Cloudflare Dashboard。
2. 左侧菜单 `计算` → `Workers 和 Pages` → `创建应用程序` → `从 Hello World! 开始`。
3. 为服务命名（建议命名为 `wechat-proxy`），点击 `部署` 部署初始版本。
---

#### 第二步：编辑 Worker 代码

1. 前往此页面，点击复制 `Cloudflare Worker` 方案的完整代理代码。
2. 回到 Cloudflare 仪表盘，点击右上角 `编辑代码`，`删除所有原有代码`，粘贴复制的代码。
3. 点击 `部署`。
---
#### 第三步：配置微信 IP 白名单

你需要将 Cloudflare 的出口 IP 添加到微信公众号后台。

1. 登录微信公众号平台
2. 进入 `设置与开发` → `安全中心` → `IP 白名单`。
3. 复制以下 IP 列表，粘贴到输入框中并保存：
```
173.245.48.0/20
103.21.244.0/22
103.22.200.0/22
103.31.4.0/22
141.101.64.0/18
108.162.192.0/18
190.93.240.0/20
188.114.96.0/20
197.234.240.0/22
198.41.128.0/17
162.158.0.0/15
104.16.0.0/13
104.24.0.0/14
172.64.0.0/13
131.0.72.0/22
```

### 最终插件配置

打开 Obsidian，进入本插件设置页。

1. `添加账号`：填写「公众号名字」、「AppID」与「AppSecret」。
2. 找到 `高级设置` → `API 代理地址`，填入你的代理 URL。

注意事项：
Cloudflare 的 IP 列表可能会偶发变动，若出现连接问题，请查阅 Cloudflare 官方 IP 列表，官方页面同时包含 IPv4 和 IPv6 列表，**请仅复制 IPv4 列表**。

另外，Obsidian不要有 WebP 格式图片。如果你使用 PicList 并安装了压缩插件，图片可能会被自动转换为 WebP 格式，导致推送失败。还有就是正文中不要插入微信以外的超链接。

### 相关资料

→ Wechat Converter
https://github.com/DavidLam-oss/obsidian-wechat-converter

→ 微信开发者平台
https://developers.weixin.qq.com/

→ 部署替换代码
https://xiaoweibox.top/chats/wechat-proxy.html

→ Cloudflare 官网
https://dash.cloudflare.com/

→ Cloudflare 官方 IP 列表
https://www.cloudflare.com/ips