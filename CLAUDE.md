# CLAUDE.md

## 项目概述
基于 Astro 5.x 的静态博客，Svelte 交互组件，Tailwind CSS 3.x 样式，霞鹜文楷中文字体。

## 导航栏架构
- `Navbar.astro`: 导航栏组件，使用 `flex justify-between` 三栏布局
- `Search.svelte`: 搜索组件，`client:only="svelte"`（跳过 SSR，仅客户端渲染）
- `Layout.astro`: 全局布局，主题初始化脚本在 `<head>` 内联

## 已知问题与修复记录

### 导航栏点击抖动
- **根因**: Search 组件 `client:only` 导致 SSR 产物与客户端 DOM 宽度不一致
- **修复**: 固定宽度容器包裹 Search，nav 链接用系统字体
- **详情**: 见 memory/navbar-flicker-fix.md

## 关键文件
- `src/styles/main.css`: 全局样式，包含 Tailwind `@layer components` 和自定义 CSS
- `src/components/Navbar.astro`: 导航栏
- `src/components/Search.svelte`: 搜索组件
- `src/layouts/Layout.astro`: 根布局
- `tailwind.config.cjs`: Tailwind 配置
