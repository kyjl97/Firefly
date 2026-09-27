# Home Console — 技术设计文档

## 一、技术架构

```
obsidian-home-console/
├── manifest.json              # Obsidian 插件清单
├── package.json               # 依赖管理
├── tsconfig.json              # TypeScript 配置
├── esbuild.config.mjs         # 构建配置
├── src/
│   ├── main.ts                # 插件入口
│   ├── HomeConsoleView.ts     # 主视图（Leaf）
│   ├── modules/
│   │   ├── StatsBar.ts        # 顶部统计栏
│   │   ├── SkillBar.ts        # Skill 按钮栏
│   │   ├── TabPanel.ts        # Tab 面板容器
│   │   ├── InputPool.ts       # Tab1: 输入池
│   │   ├── LibraryHealth.ts   # Tab2: 知识库
│   │   ├── WritingDesk.ts     # Tab3: 创作台
│   │   └── PublishBoard.ts    # Tab4: 发布看板
│   ├── skills/
│   │   ├── SkillRegistry.ts   # Skill 注册表
│   │   └── SkillRunner.ts     # Skill 执行器（终端集成）
│   ├── data/
│   │   ├── StatsCollector.ts  # 统计数据收集器
│   │   ├── FrontmatterParser.ts # Frontmatter 解析
│   │   └── WikiLinkChecker.ts  # 死链检测
│   └── utils/
│       ├── DateUtils.ts       # 日期工具
│       ├── PathConstants.ts   # 路径常量
│       └── CacheManager.ts    # 缓存管理
├── styles/
│   └── console.css            # 仪表盘样式
└── .gitignore
```

---

## 二、核心模块设计

### 2.1 插件入口 (main.ts)

```typescript
import { Plugin, WorkspaceLeaf } from 'obsidian';
import { HomeConsoleView, VIEW_TYPE_CONSOLE } from './HomeConsoleView';

export default class HomeConsolePlugin extends Plugin {
  async onload() {
    // 注册视图
    this.registerView(VIEW_TYPE_CONSOLE, (leaf) => new HomeConsoleView(leaf));
    
    // 添加 Ribbon 图标
    this.addRibbonIcon('layout-dashboard', 'Home Console', () => {
      this.activateView();
    });
    
    // 添加命令
    this.addCommand({
      id: 'open-home-console',
      name: 'Open Home Console',
      callback: () => this.activateView(),
    });
  }
  
  async activateView() {
    const { workspace } = this;
    let leaf: WorkspaceLeaf;
    const existing = workspace.getLeavesOfType(VIEW_TYPE_CONSOLE);
    if (existing.length) {
      leaf = existing[0];
    } else {
      leaf = workspace.getLeftLeaf(false);
      await leaf.setViewState({
        type: VIEW_TYPE_CONSOLE,
        active: true,
      });
    }
    workspace.revealLeaf(leaf);
  }
}
```

### 2.2 主视图 (HomeConsoleView.ts)

布局结构：

```
┌─────────────────────────────────────────────────┐
│  StatsBar                                        │
├─────────────────────────────────────────────────┤
│  SkillBar                                        │
├─────────────────────────────────────────────────┤
│  TabPanel                                        │
│  ┌─────────────────────────────────────────┐    │
│  │  [Tab1] [Tab2] [Tab3] [Tab4]            │    │
│  ├─────────────────────────────────────────┤    │
│  │  ModuleA          │  ModuleB             │    │
│  │                   │                     │    │
│  ├───────────────────┼─────────────────────┤    │
│  │  ModuleC          │  ModuleD             │    │
│  └───────────────────┴─────────────────────┘    │
└─────────────────────────────────────────────────┘
```

### 2.3 StatsBar — 统计数据收集

```typescript
interface StatsData {
  inbox: number;       // 收件箱未处理数
  drafts: number;      // 草稿数
  publishedWeek: number; // 本周发布数
  libraryPages: number;  // Library 总页面
  deadLinks: number;     // 死链数
}

class StatsCollector {
  constructor(private vault: Vault, private metadataCache: MetadataCache) {}
  
  async collect(): Promise<StatsData> {
    const [inbox, drafts, publishedWeek, libraryPages, deadLinks] = 
      await Promise.all([
        this.countInbox(),
        this.countDrafts(),
        this.countPublishedThisWeek(),
        this.countLibraryPages(),
        this.countDeadLinks(),
      ]);
    return { inbox, drafts, publishedWeek, libraryPages, deadLinks };
  }
  
  private async countInbox(): Promise<number> {
    const folders = [
      '01-输入/01-Clipings',
      '01-输入/02-get笔记',
      '01-输入/03-微信',
      '01-输入/04-选题',
      '01-输入/05-口喷稿',
      '01-输入/06-微信读书',
    ];
    let count = 0;
    for (const folder of folders) {
      const files = this.vault.getMarkdownFiles()
        .filter(f => f.path.startsWith(folder));
      count += files.length;
    }
    return count;
  }
  
  private async countDrafts(): Promise<number> {
    return this.getPostsFiles()
      .filter(f => {
        const meta = this.metadataCache.getFileCache(f);
        return meta?.frontmatter?.draft === true;
      }).length;
  }
  
  private async countPublishedThisWeek(): Promise<number> {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    
    return this.getPostsFiles()
      .filter(f => {
        const meta = this.metadataCache.getFileCache(f);
        const fm = meta?.frontmatter;
        if (!fm || fm.draft !== false) return false;
        const pub = new Date(fm.published);
        return pub >= weekStart && pub <= now;
      }).length;
  }
  
  private getPostsFiles(): TFile[] {
    return this.vault.getMarkdownFiles()
      .filter(f => f.path.startsWith('posts/'));
  }
}
```

### 2.4 SkillBar — Skill 执行

```typescript
// Skill 注册表
interface SkillDef {
  name: string;         // 显示名
  icon: string;         // emoji 图标
  command: string;      // 终端命令
  group: 'daily' | 'knowledge' | 'production' | 'data';
  description: string;  // 悬浮提示
}

// 执行器
class SkillRunner {
  async run(skill: SkillDef): Promise<void> {
    // 方案 A: 剪贴板桥接（Phase 1）
    await navigator.clipboard.writeText(skill.command);
    new Notice(
      `✅ 已复制: ${skill.command}\n去 Claude Code 粘贴执行`,
      5000
    );
    
    // 方案 C: 终端直连（Phase 2）
    // await this.executeInTerminal(skill.command);
  }
  
  private async executeInTerminal(command: string): void {
    // 打开终端面板并执行命令
    // 依赖 Obsidian Terminal 插件的 API
  }
}
```

### 2.5 TabPanel — 面板内容

每个 Tab 的模块用 HTML 渲染，数据从 StatsCollector 获取：

| Tab | 模块 | 数据获取方式 |
|-----|------|------------|
| 输入池 | 收件箱统计 + 最新输入列表 | `vault.getMarkdownFiles()` 过滤路径 |
| 知识库 | Library 概览 + 分类分布 + 健康度 | 同上 + wikilink 解析 |
| 创作台 | 草稿列表 + 分类分布 | `metadataCache` 读 frontmatter |
| 发布看板 | 发布统计 + 标签云 | 同上 |

---

## 三、终端集成方案

### Phase 1: 剪贴板桥接

```
点击按钮 → clipboard.writeText(command) → Notice 提示
```

### Phase 2: 终端直连

```typescript
// 通过 Obsidian 的 internal APIs 或 Terminal 插件的 API
async executeInTerminal(command: string) {
  // 方式 1: 使用 child_process
  const { exec } = require('child_process');
  exec(command, { cwd: vaultRoot }, (err, stdout, stderr) => {
    // 输出到面板
  });
  
  // 方式 2: 使用 Obsidian Terminal 插件的 registerCommand API
  // 方式 3: 发送自定义事件
}
```

---

## 四、样式方案

暗色主题，使用 CSS 变量与 Obsidian 主题融合：

```css
/* 利用 Obsidian 内置 CSS 变量 */
.home-console {
  --console-bg: var(--background-primary);
  --console-card-bg: var(--background-secondary);
  --console-border: var(--background-modifier-border);
  --console-text: var(--text-normal);
  --console-accent: var(--interactive-accent);
  --console-success: #4caf50;
  --console-warning: #ff9800;
  --console-danger: #f44336;
}
```

布局: CSS Grid + Flexbox，响应式。

---

## 五、配置项

```typescript
interface HomeConsoleSettings {
  // 目录路径
  inboxFolders: string[];     // 收件箱目录列表
  libraryFolders: string[];   // Library 子目录
  postsFolder: string;        // 文章目录
  wikiFolder: string;         // Wiki 目录
  dailyFolder: string;        // Daily Note 目录
  
  // Skill 映射
  skills: SkillDef[];
  
  // UI 设置
  statsVisible: boolean;      // 是否显示统计栏
  skillBarGroups: string[];   // 显示哪些 Skill 组
  activeTab: string;          // 默认 Tab
}
```

默认值基于用户的实际目录结构。
