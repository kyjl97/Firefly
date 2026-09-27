---
title: 网站CF加速配置指南
published: 2026-05-04
tags:
  - 博客
category: Technical
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260504162956507.webp
---
本文为通过 EdgeOne 部署的静态网站，提供一套完整、可直接落地的 Cloudflare（CF）优选配置方案，兼顾全球 CDN 加速、国内三网访问稳定性与安全防护，高效解决海外托管常见的延迟高、丢包问题。

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260504162956507.webp)

### 一、基础 DNS 解析配置
Cloudflare 后台添加域名后，按如下方式配置 DNS 记录，开启 CF 代理模式：

> 关键：务必开启「橙色云」代理状态，使流量经过 CF CDN 节点。

| 类型    | 名称              | 目标                             | 代理状态     |
| :---- | :-------------- | :----------------------------- | :------- |
| CNAME | `www`           | `kyjl97.github.io.pages.dnsoe9.com` | 已代理（橙色云） |
| CNAME | `@`（或`kyjl97.github.io`） | `kyjl97.github.io.pages.dnsoe9.com`     | 已代理（橙色云） |
### 二、核心优化配置

1. **性能加速**：进入「速度 - 设置 - 站点建议」，一键开启自动压缩、Brotli、HTTP/3 等优化项。
2. **安全与 HTTPS**：在「SSL/TLS」中设置加密模式为「完整」，并开启「始终使用 HTTPS」。
3. **缓存规则**：创建页面规则，匹配`*.kyjl97.github.io/*`，设置缓存级别为「标准」，静态资源缓存 30 天，平衡更新与加载速度。
4. **优化 Astro 构建**：针对 Astro 静态站的性能损耗模式，做了以下优化：

| 优化项 | 改动 | 预期效果 |
|--------|------|----------|
| 图片服务 | `passthroughImageService()` → sharp（默认） | 新图片自动 AVIF/WebP，体积减 50-80% |
| Swup 移除 | 删掉 swup + 4个插件，清理所有相关代码 | JS 减少 ~48K，消除页面切换开销 |
| 字体本地化 | CDN link → npm 本地 import | 消除外部 DNS + 跨域请求 |
| KaTeX 移除 | 全局 CSS import 删除 | 每页减少一个 CSS 请求 |
| Icon 按需 | 6个集合全量 → 40个具体 icon | 减少无用 icon 数据 |
| 代码清理 | 移除注释代码、dead code | HTML 体积微减 |

> **注意事项**：CSS 600K 偏大（Tailwind 输出未充分 purge），swup 移除后页面导航为全量刷新但无交互异常，sharp 图片优化仅对新构建图片生效。

### 三、验证生效
配置完成后，在本地终端执行
```
nslookup kyjl97.github.io
```

解析结果若返回 Cloudflare 节点 IP，即代表 CDN 已成功启用。此时用户访问流程为「用户→CF 节点→源站」，网站访问速度、稳定性与安全性均得到全面提升。