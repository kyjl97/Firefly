# Static Site Deployment

## What

无服务器博客部署方案：GitHub 托管 + EdgeOne 自动构建。

## Why

- 零服务器成本
- 自动 HTTPS
- CDN 全球加速
- Git 工作流驱动

## Where Used

- [博客工作流](../../content/posts/Workflow/博客工作流.md) — 完整流程说明
- [博客发布bat](../../content/posts/Workflow/博客发布bat.md) — 一键发布脚本
- [博客搭建](../../content/posts/Workflow/博客搭建.md) — 从零搭建教程

## Tradeoffs

| 优势 | 劣势 |
|------|------|
| 零成本 | 动态功能受限 |
| 自动部署 | 构建时间依赖 EdgeOne |
| 版本控制 | 大图片需外部图床 |
