# SEO 优化记录

目标关键词：得救之道、得救之道博客、kyjl97

## 已完成（代码层面，2026-05-26）

### config.ts 改动
- **subtitle** → `"得救之道｜AI 探索与技术分享"`
- **description** → 以 `"得救之道(kyjl97)的个人技术博客..."` 开头
- **keywords** → `["得救之道博客", "得救之道", "kyjl97", "kyjl97", "技术博客"]`
- **bio** → `"得救之道 kyjl97<br>Build in Public 践行者..."`

### Layout.astro 改动
- **canonical URL** → 每个页面 `<link rel="canonical" href={Astro.url}>`
- **首页 JSON-LD Schema** → `WebSite + Person` 结构化数据，含站点名、作者、描述

## 待完成

### Google Search Console 验证
- **方式**：Cloudflare DNS TXT 记录（域名验证，非 HTML 文件上传）
- **URL**：`https://search.google.com/search-console`
- **resource_id**：`sc-domain:kyjl97.github.io`
- **步骤**：
  1. Search Console 添加资源 → 选"域名"方式 → 输入 `kyjl97.github.io`
  2. 拿到 TXT 记录值 → Cloudflare DNS 面板添加
  3. 验证通过后提交 sitemap：`sitemap-index.xml`

### 外链建设
- Telegram、B站、知乎 等平台简介放网站链接
- 外链锚文本用"得救之道博客"、"得救之道"
