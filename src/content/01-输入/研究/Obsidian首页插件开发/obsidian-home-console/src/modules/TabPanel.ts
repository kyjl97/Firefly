/**
 * Tab 面板容器
 * 管理 4 个 Tab 的切换和内容渲染
 */

import type { StatsCollector, StatsData } from '../data/StatsCollector';
import { renderInputPool } from './InputPool';
import { renderLibraryHealth } from './LibraryHealth';
import { renderWritingDesk } from './WritingDesk';
import { renderPublishBoard } from './PublishBoard';

export interface TabDef {
  id: string;
  label: string;
  icon: string;
}

const TABS: TabDef[] = [
  { id: 'input-pool', label: '输入池', icon: '📥' },
  { id: 'library', label: '知识库', icon: '📚' },
  { id: 'writing', label: '创作台', icon: '✍️' },
  { id: 'publish', label: '发布看板', icon: '🌐' },
];

export class TabPanel {
  private container: HTMLElement;
  private tabBar: HTMLElement;
  private contentArea: HTMLElement;
  private activeTab: string = 'input-pool';
  private stats: StatsData;
  private collector: StatsCollector;

  constructor(
    container: HTMLElement,
    stats: StatsData,
    collector: StatsCollector
  ) {
    this.container = container;
    this.stats = stats;
    this.collector = collector;

    this.container.addClass('hc-tab-panel');

    // Tab 栏
    this.tabBar = this.container.createDiv({ cls: 'hc-tab-bar' });

    // 内容区
    this.contentArea = this.container.createDiv({ cls: 'hc-tab-content-area' });

    this.renderTabs();
    this.renderContent();

    // 监听 Tab 切换事件（来自 StatsBar 的点击）
    document.addEventListener('hc:switch-tab', ((e: CustomEvent) => {
      this.switchTab(e.detail);
    }) as EventListener);
  }

  /** 更新数据并重新渲染 */
  updateStats(stats: StatsData): void {
    this.stats = stats;
    this.renderContent();
  }

  /** 切换 Tab */
  switchTab(tabId: string): void {
    this.activeTab = tabId;

    // 更新 Tab 栏高亮
    this.tabBar.querySelectorAll('.hc-tab-item').forEach((el) => {
      el.toggleClass('hc-tab-active', el.getAttribute('data-tab') === tabId);
    });

    this.renderContent();
  }

  /** 渲染 Tab 栏 */
  private renderTabs(): void {
    this.tabBar.empty();

    for (const tab of TABS) {
      const item = this.tabBar.createDiv({
        cls: `hc-tab-item ${tab.id === this.activeTab ? 'hc-tab-active' : ''}`,
        attr: { 'data-tab': tab.id },
      });

      item.createSpan({ cls: 'hc-tab-icon', text: tab.icon });
      item.createSpan({ cls: 'hc-tab-label', text: tab.label });

      item.addEventListener('click', () => this.switchTab(tab.id));
    }
  }

  /** 渲染当前 Tab 内容 */
  private renderContent(): void {
    this.contentArea.empty();

    switch (this.activeTab) {
      case 'input-pool':
        renderInputPool(this.contentArea, this.stats, this.collector);
        break;
      case 'library':
        renderLibraryHealth(this.contentArea, this.stats, this.collector);
        break;
      case 'writing':
        renderWritingDesk(this.contentArea, this.stats, this.collector);
        break;
      case 'publish':
        renderPublishBoard(this.contentArea, this.stats);
        break;
    }
  }
}
