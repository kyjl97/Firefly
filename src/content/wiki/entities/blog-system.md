# Blog System

## Purpose

博客系统的技术架构与部署流程。

## Architecture

```
写作 (Typora/Obsidian)
    ↓
Markdown 文件 (posts/*.md)
    ↓
GitHub 仓库 (git push)
    ↓
EdgeOne 自动构建
    ↓
CDN 分发 (静态站点)
```

## Key Components

| 组件 | 作用 | 相关文档 |
|------|------|----------|
| Fuwari | 静态站点生成器 (Astro 基础) | - |
| GitHub | 代码托管 + Git 版本控制 | - |
| EdgeOne | 自动构建 + CDN 分发 | [博客工作流](../../content/posts/Workflow/博客工作流.md) |
| Gitee 图床 | 图片资源托管 | [Piclist图床](../../content/posts/Workflow/Piclist图床.md) |

## Deployment Workflow

1. 本地写作 (Typora/Obsidian)
2. 图片上传至 Gitee 图床
3. Git commit + push 到 GitHub
4. EdgeOne 检测变更，自动构建
5. CDN 缓存刷新，内容上线

## Related Files

- [博客工作流](../../content/posts/Workflow/博客工作流.md)
- [博客发布bat](../../content/posts/Workflow/博客发布bat.md)
- [博客搭建](../../content/posts/Workflow/博客搭建.md)
