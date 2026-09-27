# kyjl97 Blog

> [!NOTE]
> 基于 [Fuwari](https://github.com/saicaca/fuwari) 深度二次开发的个人博客项目，集成 Obsidian + PicList + Gitee 图床工作流，专为技术博客打造。

一个基于 Astro 5.7+ 构建的现代化个人博客主题，专注于技术分享与实践。

---

## ✨ 特性

### 核心功能
- 🚀 **Astro 5.7+** - 卓越的性能表现
- 📱 **完全响应式** - 完美适配移动端
- 🌙 **主题切换** - 深色/浅色模式
- 📝 **Markdown 支持** - 完整的 Markdown 语法
- 🔍 **内置搜索** - 快速查找文章
- 📊 **阅读时间** - 自动统计文章阅读时长
- 🎨 **霞鹜文楷字体** - 优雅的中文手写风格

### 内容管理
- 🏷️ **标签系统** - 灵活的文章标签，支持标签云展示
- 📂 **分类管理** - Software / Technical / AIHacks / Workflow / Xenia
- 🖼️ **画廊展示** - 全新画廊页面，封面图网格展示
- 🖼️ **自动封面** - 首张图片自动作为封面（BAT 脚本自动提取）
- 📄 **智能摘要** - 开头段落自动作为描述（文章页隐藏）

### 交互功能
- 💬 **Giscus 评论** - GitHub Discussions 驱动的评论系统
- 📡 **RSS 订阅** - 支持 RSS/Atom 订阅
- 🎥 **视频装饰** - 独特的视频装饰组件
- 🔄 **页面切换** - Swup 平滑过渡动画
- 💜 **冷紫蓝渐变** - 独特的视觉标识系统
- 🔝 **浮动按钮** - 评论/回到顶部快捷操作
- 📊 **表格样式** - 表头浅色/数据行深色

### 新增功能（2026-04）
- 🏷️ **3D 标签云** - 侧边栏 3D 旋转星球标签云
- 🖼️ **画廊页面** - `/gallery/` 封面图网格展示
- 📅 **归档增强** - 年份+月份分组，显示每月发文量
- 📱 **移动端优化** - 侧边栏移动端隐藏

### SEO 优化
- 📈 **SEO 友好** - 自动生成 sitemap
- 🔗 **结构化数据** - 搜索引擎优化
- 📱 **社交分享** - Open Graph 支持

### 性能优化
- ⚡ **快速加载** - 优先加载首屏图片
- 🎯 **字体优化** - CDN 加载霞鹜文楷字体
- 🚀 **无抖动导航** - 优化的页面切换体验

---

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Astro | 5.7.9 | 静态站点生成器 |
| Tailwind CSS | 3.4+ | 样式框架 |
| Svelte | 5.28+ | 交互组件 |
| Vite | - | 构建工具 |
| pnpm | 9.14+ | 包管理器 |

---

## 📁 项目结构

```
fuwari/
├── public/                          # 静态资源目录
│   ├── avatar.jpg                   # 网站头像 / Favicon
│   ├── gzh-qrcode.webp              # 公众号二维码
│   ├── qq-qrcode.png               # 微信二维码
│   ├── icons/                       # 图标资源
│   ├── sponsors/                    # 赞助收款码
│   └── js/                          # JavaScript 脚本
│
├── src/
│   ├── components/                  # 组件目录
│   │   ├── widget/                  # 侧边栏组件
│   │   │   ├── Profile.astro        # 个人信息卡片
│   │   │   ├── CategoryList.astro   # 分类列表（Hacker 风格，英文显示）
│   │   │   └── VideoDecoration.astro # 微信公众号装饰
│   │   ├── PostCard.astro           # 文章卡片组件
│   │   └── PostPage.astro           # 文章列表页（含自动封面/描述提取）
│   │
│   ├── content/                     # 内容目录
│   │   ├── posts/                   # 博客文章
│   │   │   ├── 软件安利/            # 软件推荐分类
│   │   │   ├── 技术教程/            # 技术文章分类
│   │   │   ├── AI新鲜玩法/          # AI 相关分类
│   │   │   └── *.md                 # 文章文件
│   │   ├── assets/                  # 本地图片资源
│   │   │   └── images/              # 图片文件
│   │   └── config.ts                # 内容集合配置
│   │
│   ├── data/                        # 数据目录
│   │   └── friends/                 # 友链数据（147个）
│   │
│   ├── layouts/                     # 布局文件
│   │   ├── Layout.astro             # 主布局（霞鹜文楷字体）
│   │   └── MainGridLayout.astro     # 网格布局（微信二维码弹窗）
│   │
│   ├── pages/                       # 页面文件
│   │   ├── index.astro              # 首页
│   │   ├── posts/                   # 文章相关页面
│   │   │   ├── [...slug].astro      # 文章详情页（含 Giscus 评论）
│   │   │   └── [page].astro         # 文章列表分页
│   │   ├── categories/              # 分类页面（英文 URL）
│   │   │   └── [category].astro     # 分类文章列表
│   │   ├── archive.astro            # 归档页面
│   │   ├── sponsors.astro           # 赞助页面（无赞助者名单）
│   │   └── friends.astro            # 友链页面
│   │
│   ├── styles/                      # 样式文件
│   │   ├── main.css                  # 主样式文件
│   │   ├── transition.css           # 页面切换动画（含 fallback）
│   │   ├── scrollbar.css             # 滚动条样式
│   │   └── markdown.css             # Markdown 样式
│   │
│   ├── utils/                       # 工具函数
│   └── config.ts                    # 站点配置
│
├── scripts/                         # 脚本工具
│   ├── add-frontmatter.cjs          # 自动添加 frontmatter 模板
│   ├── organize-posts.cjs           # 按分类组织文章
│   ├── clean-unused-images.js       # 清理未使用的图片
│   ├── del-space.js                 # 删除文件名空格
│   ├── new-post.js                  # 创建新文章
│   ├── import-posts.cjs             # 批量导入文章
│   └── update-categories.cjs        # 批量更新分类
│
├── package.json                     # 项目配置
├── astro.config.mjs                 # Astro 配置
├── tailwind.config.cjs              # Tailwind 配置（霞鹜文楷字体）
└── README.md                        # 项目说明
```

---

## 🚀 快速开始

### 环境要求

- **Node.js**: 18.0 或更高版本
- **包管理器**: pnpm（推荐）或 npm

### 安装步骤

#### 1. 克隆项目

```bash
git clone https://github.com/kyjl97/Firefly.git
cd Firefly
```

#### 2. 安装依赖

```bash
# 推荐：使用 pnpm
pnpm install

# 或使用 npm
npm install
```

#### 3. 启动开发服务器

```bash
# pnpm
pnpm dev

# npm
npm run dev
```

访问 [http://localhost:4321/](http://localhost:4321/) 查看效果

> **💡 提示**: 开发服务器端口固定为 4321，无需担心端口冲突。

#### 4. 构建生产版本

```bash
# pnpm
pnpm build

# npm
npm run build
```

构建产物位于 `dist/` 目录

### 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览构建结果 |
| `npm run new-post` | 创建新文章 |
| `npm run add-frontmatter` | 添加 frontmatter 模板 |
| `npm run organize-posts` | 按分类组织文章 |
| `npm run clean` | 清理未使用的图片 |

---

## 📦 部署指南

### EdgeOne（腾讯云）- 推荐

#### 1. 创建静态网站

1. 登录 [EdgeOne 控制台](https://console.cloud.tencent.com/edgeone)
2. 选择「静态网站」→「新建站点」
3. 连接 GitHub 仓库，选择分支：`main`

#### 2. 配置构建设置

```
框架预设: Astro
根目录: ./
输出目录: dist
编译命令: pnpm run build
安装命令: pnpm install
```

#### 3. 开始部署

- 点击「开始部署」
- 等待构建完成（约 1-2 分钟）
- 配置自定义域名（可选）

---

## 🎨 自定义配置

### 站点配置

编辑 `src/config.ts` 文件：

```typescript
// 站点基本信息
export const siteConfig: SiteConfig = {
  title: "kyjl97 Blog",
  subtitle: "技术分享与实践",
  lang: "zh_CN",
  url: "https://jieliu.me",
  author: "得救之道",
};

// 个人信息卡片
export const profileConfig: ProfileConfig = {
  name: "得救之道",
  bio: "人间忽晚，山河已秋。",
  avatar: "/avatar.jpg",
  email: "your-email@example.com",
  socialLinks: {
    github: "https://github.com/kyjl97",
    bilibili: "https://space.bilibili.com/xxx",
    telegram: "https://t.me/xxx",
  },
};

// 导航栏链接
export const navBarConfig: NavBarConfig = {
  links: [
    { name: "电视喵", url: "https://kyjl97.github.io/Tvfree/" },
    { name: "工坊", url: "https://kyjl97.github.io/Shopping/" },
    { name: "远程", url: "https://github.com/kyjl97/" },
  ],
};
```

### 主题颜色

```typescript
themeColor: {
  hue: 268,        // 主色调 (0-360) - 冷紫蓝系
  fixed: true,     // 固定颜色
}
```

**配色特色**:
- 冷紫蓝渐变（#0ea5e9 → #8b5cf6）作为唯一签名色
- 深色背景营造冷静编辑部氛围
- 分类悬停时亮绿色（#b7f605）点缀
- 极致色彩克制，创造可记忆的视觉身份

### Giscus 评论配置

编辑 `src/pages/posts/[...slug].astro` 中的 Giscus 配置：

```astro
<div id="giscus-container"
    data-repo="你的用户名/仓库名"
    data-repo-id="R_kgDOxxxxxxxxx"
    data-category="Announcements"
    data-category-id="DIC_kwDOxxxxxxxxx"
    data-mapping="pathname"
    data-strict="0"
    data-reactions-enabled="1"
    data-emit-metadata="0"
    data-input-position="bottom"
    data-theme="preferred_color_scheme"
    data-lang="zh-CN"
    data-loading="lazy"
></div>
```

获取配置：访问 [giscus.app](https://giscus.app)

---

## 📋 文章分类

| 英文名称 | 中文名称 | URL 路径 |
|----------|----------|----------|
| Software | 软件安利 | /categories/Software/ |
| Technical | 技术教程 | /categories/Technical/ |
| AIHacks | AI新鲜玩法 | /categories/AIHacks/ |

---

## 🔧 工作流

### 使用 BAT 脚本（推荐）

运行 `博客升级版bat.bat`，可选择：

1. **移动文章并打开封面生成** - 从知识库移动文章到博客，自动提取封面图
2. **生成文章 YAML 模板** - 为没有 frontmatter 的文章自动添加模板
3. **启动本地构建预览** - 运行 `pnpm dev`
4. **Git 提交并推送代码** - 自动提交并推送到 GitHub

### 手动脚本

```bash
npm run add-frontmatter
```

自动为没有 frontmatter 的文章添加模板，包含：
- title（从文件名或内容提取）
- published（当前日期）
- tags（根据内容关键词）
- category（根据文件夹名称）
- draft（设置为 false）
- image（自动提取文章第一张图片）

---

## 📝 Frontmatter 详解

### 完整模板

```yaml
---
title: 文章标题
published: 2026-02-04
description: 文章描述（可选，留空则自动提取第一段）
tags: [标签1, 标签2, 标签3]
category: Software
draft: false
image: https://图片URL（可选，留空则自动提取第一张）
---

文章开头段落（自动作为摘要）...

文章正文...
```

### 字段说明

| 字段 | 必填 | 说明 | 示例 |
|------|:----:|------|------|
| `title` | ✅ | 文章标题 | `如何使用 Astro 构建博客` |
| `published` | ✅ | 发布日期（ISO 格式） | `2026-02-04` |
| `description` | ❌ | 文章描述（留空自动提取） | `这是一篇关于 Astro 的教程...` |
| `tags` | ❌ | 文章标签（数组格式） | `[Astro, 教程, 前端]` |
| `category` | ✅ | 文章分类 | `软件安利` / `技术教程` / `AI新鲜玩法` |
| `draft` | ✅ | 是否为草稿 | `true` / `false` |
| `image` | ❌ | 封面图 URL（留空自动提取） | `https://xxx.com/image.webp` |

### 分类说明

| 分类 | 适用内容 | 示例 |
|------|----------|------|
| **Software** | 软件推荐、工具介绍 | 浏览器插件、效率工具 |
| **Technical** | 技术教程、部署指南 | 服务器部署、内网穿透 |
| **AIHacks** | AI 相关内容 | ChatGPT、Claude 使用技巧 |
| **Workflow** | 工作流、自动化 | 脚本、效率方法 |
| **Xenia** | 碎碎念、日常 | 生活记录、随想 |

### ⚠️ 重要注意事项

#### 1. YAML 语法：冒号后必须有空格

**❌ 错误写法：**
```yaml
title:文章标题
published:2026-02-04
category:软件安利
```

**✅ 正确写法：**
```yaml
title: 文章标题
published: 2026-02-04
category: 软件安利
```

#### 2. 日期格式：必须使用 ISO 格式（连字符）

**❌ 错误格式：** `published: 2026/02/04`

**✅ 正确格式：** `published: 2026-02-04`

#### 3. 标签格式：必须使用数组格式

**❌ 错误写法：** `tags: 标签1, 标签2`

**✅ 正确写法：** `tags: [标签1, 标签2]`

#### 4. 布尔值：必须用小写

**❌ 错误写法：** `draft: True` / `draft: FALSE`

**✅ 正确写法：** `draft: true` / `draft: false`

---

## 🤝 鸣谢

- **Fuwari 原项目**: [https://github.com/saicaca/fuwari](https://github.com/saicaca/fuwari)
- **AcoFork 的 Fork**: [https://github.com/afoim/fuwari](https://github.com/afoim/fuwari)

感谢原作者和贡献者的优秀工作！

---

## 📄 许可证

[MIT License](LICENSE)

---

**博客地址**: [https://kyjl97.github.io](https://jieliu.me)

**GitHub 仓库**: [https://github.com/kyjl97/Firefly](https://github.com/kyjl97/Firefly)

---

*最后更新: 2026-04-22*
