/**
 * Home Console 主视图
 * 整合 StatsBar + SkillBar + TabPanel
 */

import { ItemView, WorkspaceLeaf, Vault, MetadataCache, Plugin } from 'obsidian';
import { renderStatsBar } from './modules/StatsBar';
import { renderSkillBar } from './modules/SkillBar';
import { TabPanel } from './modules/TabPanel';
import { StatsCollector } from './data/StatsCollector';

export const VIEW_TYPE_CONSOLE = 'home-console-view';

/** 全局插件引用，用于视图创建时注入 */
let pluginRef: Plugin | null = null;

export function setPluginRef(plugin: Plugin): void {
  pluginRef = plugin;
}

export class HomeConsoleView extends ItemView {
  private collector: StatsCollector;
  private tabPanel: TabPanel | null = null;
  private statsBarEl: HTMLElement | null = null;
  private skillBarEl: HTMLElement | null = null;
  private refreshInterval: number | null = null;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
    this.collector = new StatsCollector(
      this.app.vault,
      this.app.metadataCache
    );
  }

  getViewType(): string {
    return VIEW_TYPE_CONSOLE;
  }

  getDisplayText(): string {
    return 'Home Console';
  }

  getIcon(): string {
    return 'layout-dashboard';
  }

  async onOpen(): Promise<void> {
    const container = this.containerEl.children[1]; // 跳过标题
    container.empty();
    container.addClass('hc-container');

    // ===== 头部区域 =====
    const header = container.createDiv({ cls: 'hc-header' });

    // 标题
    const titleRow = header.createDiv({ cls: 'hc-title-row' });
    titleRow.createEl('h2', { text: 'Home Console', cls: 'hc-title' });

    // 刷新按钮
    const refreshBtn = titleRow.createEl('button', {
      cls: 'hc-refresh-btn',
      text: '🔄 刷新',
    });
    refreshBtn.addEventListener('click', () => this.refresh());

    // ===== 统计栏 =====
    this.statsBarEl = container.createDiv({ cls: 'hc-stats-section' });

    // ===== Skill 按钮栏 =====
    this.skillBarEl = container.createDiv({ cls: 'hc-skills-section' });
    renderSkillBar(this.skillBarEl, this.app.workspace, pluginRef!);

    // ===== Tab 面板 =====
    const tabContainer = container.createDiv({ cls: 'hc-tab-section' });

    // 初始加载数据
    const stats = await this.collector.collect();

    // 渲染统计栏
    renderStatsBar(this.statsBarEl, stats);

    // 渲染 Tab 面板
    this.tabPanel = new TabPanel(tabContainer, stats, this.collector);

    // 监听文件变化自动刷新
    this.registerEvent(
      this.app.vault.on('create', () => this.scheduleRefresh())
    );
    this.registerEvent(
      this.app.vault.on('delete', () => this.scheduleRefresh())
    );
    this.registerEvent(
      this.app.vault.on('modify', () => this.scheduleRefresh())
    );
    this.registerEvent(
      this.app.vault.on('rename', () => this.scheduleRefresh())
    );

    // 监听打开文件事件
    document.addEventListener('hc:open-file', ((e: CustomEvent) => {
      const path = e.detail;
      const file = this.app.vault.getAbstractFileByPath(path);
      if (file) {
        this.app.workspace.openLinkText(path, '', false);
      }
    }) as EventListener);
  }

  async onClose(): Promise<void> {
    if (this.refreshInterval) {
      window.clearTimeout(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  /** 刷新数据 */
  async refresh(): Promise<void> {
    this.collector.invalidateCache();
    const stats = await this.collector.collect(true);

    if (this.statsBarEl) {
      renderStatsBar(this.statsBarEl, stats);
    }
    if (this.tabPanel) {
      this.tabPanel.updateStats(stats);
    }
  }

  /** 防抖刷新（文件变化时） */
  private scheduleRefresh(): void {
    if (this.refreshInterval) {
      window.clearTimeout(this.refreshInterval);
    }
    this.refreshInterval = window.setTimeout(() => {
      this.refresh();
      this.refreshInterval = null;
    }, 2000); // 2 秒防抖
  }
}
