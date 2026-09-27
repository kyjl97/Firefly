---
title: API key管理网站
published: 2026-08-19
tags:
  - Codex
  - API
  - 网站搭建
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260819000329659.webp
---
如果你跟我一样，自己有多台设备需要使用智能体，但是突然用着有一个智能体配置的 API 额度用完了，想换一个，但它又存在另外一台电脑上。这个时候就要去开机另外一台电脑，很麻烦。

于是我让 AI 帮我做了一个能在线的网站项目，用来统一储存和管理所有的 API Key。

## 项目预览

后台界面
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260819000329659.webp)

登录界面
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260819000533279.webp)

## 用到了哪些工具

- **GitHub** — 托管项目代码
- **Vercel** — 部署项目（可以用 Vercel CLI 一键部署）
- **Neon PostgreSQL** — 云数据库，serverless 架构，按用量付费，有自己cli工具
免费套餐：单项目 0.5G 存储、每月 100CU 时、5G 出网流量
> 延伸：其他SQLite 赛道
> Cloudflare D1→免费总计 5GB 存储，日 500 万读 / 10 万写，适配 Cloudflare Workers 边缘项目 
> Neon→单项目 0.5G 存储、月 100CU 算力，适合 Postgres 开发 Demo 与低频后台 
> Supabase→免费 500MB 数据库，自带登录实时 API，适合快速搭建带用户系统应用 
> Turso→免费 5GB 总存储、海量读写额度，SQLite 兼容，边缘项目首选

## API Key 怎么存的？安全吗？

这是我最关心的问题。方案是这样的：

```
明文 API Key → AES-256-GCM 加密 → 密文存数据库
```

数据库里存的都是加密后的密文，就算有人把整个数据库拖走了，也还原不出真正的 API Key。解密密钥存在环境变量里，只有服务端能访问。

密码方面用的是 bcrypt 哈希存储，登录验证用的是 JWT session token，存在 httpOnly + secure cookie 里，前端拿不到。

## 踩过的坑

### 1. Vercel 构建时报 DATABASE_URL 未设置

Next.js 在构建阶段会预渲染 API 路由，如果代码里直接导入了数据库连接，构建时就会因为没有 `DATABASE_URL` 环境变量而报错。

**解决**：把数据库连接的导入改成懒加载（在函数内部 import），避免构建时触发。

### 2. GitHub OAuth 按钮不显示

前端用 `fetch` 去请求 `/api/auth/github`，但这个接口返回的是 302 重定向到 GitHub，浏览器自动跟随后被 CORS 策略拦截，导致 `Failed to fetch` 报错，按钮状态一直为 false。

**解决**：新增一个 `/api/auth/github/status` 接口，只返回 JSON 状态，不触发重定向，前端改用这个接口检测 GitHub 登录是否可用。

### 3. 弹窗内容被截断

点击"添加"按钮弹出的表单，内容被截在顶部看不见，需要滚动才能操作。

**解决**：把弹窗的 flex 对齐方式从 `items-center` 改成 `items-start`，加上顶部偏移，同时在打开时自动滚动到弹窗顶部。

## 后续注意事项

- **环境变量安全**：`ENCRYPTION_KEY`、`AUTH_SECRET`、`GITHUB_CLIENT_SECRET` 都存在 Vercel 环境变量里，不要泄露
- **定期备份**：Neon 数据库建议开启自动备份
- **GitHub OAuth App 权限**：只申请了 `read:user` 最小权限，不要随意扩大
- **域名**：目前用 Cloudflare 管理 DNS，SSL 证书由 Let's Encrypt 自动续期

## 后续优化方向

- [ ] 支持分组/标签分类管理 API Key
- [ ] 密钥过期提醒
- [ ] 使用记录审计日志
- [ ] 多用户/团队协作
