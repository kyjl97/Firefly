# Wiki 系统实现总结

## 实现目标
在博客顶部导航栏“画廊”右侧添加“Wiki”菜单，实现三栏布局的知识库展示页面（左侧树形目录 + 中间内容 + 右侧大纲）。

## 文件修改与创建

### 1. 创建的文件

#### `src/layouts/WikiLayout.astro`（新）
- 专门为 Wiki 页面设计的布局
- 不包含左侧边栏（头像、分类、标签等），避免内容挤压
- 包含顶部导航栏、页脚、返回顶部按钮
- 支持右侧大纲显示（xl+ 屏幕）
- 使用正确的 TypeScript 类型（`MarkdownHeading` 替代 `any`）

#### `src/utils/wiki.ts`（新）
- `getWikiTree()` - 读取 wiki 目录并构建树形结构
- `getWikiBySlug(slug)` - 根据 slug 获取 wiki 文章
- `extractHeadings(content)` - 从 markdown 提取标题生成大纲
- `getAllWikiSlugs()` - 获取所有 wiki 文章的 slug 列表

#### `src/components/wiki/WikiTreeNode.astro`（新）
- 递归树形导航组件
- 支持多级目录展开/折叠
- 高亮当前选中的文章
- 响应式设计（lg+ 显示）

### 2. 修改的文件

#### `src/content/config.ts`
- 注册 wiki 集合的 schema
- 定义 `published`、`category`、`tags`、`draft`、`pinned`、`image` 等字段

#### `src/config.ts`
- 在 `navBarConfig.links` 中添加 Wiki 菜单项
- 位置在“画廊”右侧，“友链”左侧

#### `src/pages/wiki/[...slug].astro`（重写）
- 使用新的 `WikiLayout` 替代 `MainGridLayout`
- 三栏布局：左侧树形导航（64px）+ 中间内容（自适应）+ 右侧大纲（56px，xl+）
- 字体优化：正文 1.0625rem，行高 1.875
- 标题优化：H2 1.625rem + 下边框，H3 1.375rem
- 响应式：左侧导航 lg+（1024px+），右侧大纲 xl+（1280px+）

#### `src/pages/wiki/index.astro`（新）
- Wiki 首页重定向到 `/wiki/index/`
- 处理 trailingSlash 配置

### 3. 修复的文件

#### 修复 `.md.md` 双后缀问题
- `src/content/wiki/index.md.md` → `index.md`
- `src/content/wiki/purpose.md.md` → `purpose.md`
- `src/content/wiki/schema.md.md` → `schema.md`

## 技术细节

### 布局设计
- **WikiLayout**: 基础布局，不包含左侧边栏
- **左侧树形导航**: 使用 `WikiTreeNode` 递归组件，sticky 定位
- **中间内容**: Markdown 渲染，使用项目已有的 `markdown-it`
- **右侧大纲**: 从 markdown 提取 h2/h3 标题生成，sticky 定位

### 响应式断点
- `lg` (1024px): 左侧树形导航显示
- `xl` (1280px): 右侧大纲显示

### Markdown 渲染
- 使用 `markdown-it` 渲染
- 自定义样式覆盖默认样式
- 代码块、表格、引用块等均有专门样式

### 路由配置
- 动态路由 `[...slug]` 处理所有 wiki 文章
- `getStaticPaths` 预生成所有页面
- trailingSlash 配置下正确处理重定向

## 构建验证

```bash
pnpm build
# ✓ 197 个页面构建成功
# ✓ 21 个 wiki 页面（包括索引页）
# ✓ 无类型错误
```

```bash
pnpm format
# ✓ 236 个文件格式化完成
```

```bash
pnpm lint
# ⚠ 5 个预存 lint 错误（与 Wiki 功能无关）
# - Profile.astro: 可选链建议
# - TOC.astro: forEach 性能建议
# - ArchivePanel.astro: forEach 性能建议
# - wiki.ts: 表达式赋值警告
# - friends.astro: 非空断言警告
```

## 最终效果

1. **顶部导航**: 新增 Wiki 菜单项
2. **Wiki 首页**: 重定向到 `/wiki/index/` 显示介绍内容
3. **Wiki 文章页**: 
   - 左侧: 树形目录导航（可折叠/展开）
   - 中间: Markdown 内容（大字体、舒适行高）
   - 右侧: 文章大纲（自动生成 h2/h3 目录）
4. **响应式**: 
   - 移动端: 单列内容
   - 平板: 左侧导航 + 内容
   - 桌面: 完整三栏布局

## 设计决策

1. **不使用 MainGridLayout**: 因为它包含左侧边栏，会导致 Wiki 内容被挤压
2. **单独创建 WikiLayout**: 更灵活，避免不必要的组件加载
3. **右侧大纲在布局中**: 所有 Wiki 页面共享，避免重复代码
4. **树形导航递归组件**: 支持无限层级目录，结构清晰
5. **字体大小优化**: 原项目默认字体偏小，Wiki 内容需要更好的可读性
