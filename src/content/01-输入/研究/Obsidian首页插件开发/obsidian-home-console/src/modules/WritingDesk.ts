/**
 * Tab3: 创作台
 * 展示草稿状态和文章统计
 */

import type { TFile } from 'obsidian';
import type { StatsData, StatsCollector } from '../data/StatsCollector';
import { POSTS_CATEGORIES } from '../utils/PathConstants';
import { relativeTime } from '../utils/DateUtils';

const CATEGORY_LABELS: Record<string, string> = {
  AIHacks: 'AIHacks',
  Software: 'Software',
  Technical: 'Technical',
  Workflow: 'Workflow',
};

export function renderWritingDesk(
  container: HTMLElement,
  stats: StatsData,
  collector: StatsCollector
): void {
  container.empty();
  container.addClass('hc-tab-content');

  const grid = container.createDiv({ cls: 'hc-grid-2col' });

  // 左列: 草稿箱
  const leftCol = grid.createDiv({ cls: 'hc-grid-col' });
  renderDraftBox(leftCol, collector);

  // 右列: 分类分布 + 发布计划
  const rightCol = grid.createDiv({ cls: 'hc-grid-col' });
  renderCategoryStats(rightCol, stats);
  renderPublishSummary(rightCol, stats);
}

/** 草稿箱列表 */
function renderDraftBox(container: HTMLElement, collector: StatsCollector): void {
  const card = container.createDiv({ cls: 'hc-card' });

  const header = card.createDiv({ cls: 'hc-card-header' });
  header.createSpan({ cls: 'hc-card-title', text: '草稿箱' });

  const files = collector.getDraftFiles();

  if (files.length === 0) {
    card.createDiv({ cls: 'hc-empty', text: '没有草稿，状态良好 ✨' });
    return;
  }

  header.createSpan({
    cls: 'hc-card-badge hc-badge-warning',
    text: String(files.length),
  });

  const list = card.createDiv({ cls: 'hc-card-list' });

  for (const file of files) {
    const meta = collector['metadataCache'].getFileCache(file);
    const fm = meta?.frontmatter;
    const item = list.createDiv({ cls: 'hc-list-item hc-draft-item' });

    // 草稿标题
    const titleRow = item.createDiv({ cls: 'hc-draft-title' });
    titleRow.createSpan({ cls: 'hc-list-icon', text: '📝' });
    titleRow.createSpan({
      cls: 'hc-list-label',
      text: fm?.title || file.name.replace('.md', ''),
    });

    // 元信息行
    const metaRow = item.createDiv({ cls: 'hc-draft-meta' });
    if (fm?.category) {
      metaRow.createSpan({
        cls: `hc-tag hc-tag-cat-${fm.category.toLowerCase()}`,
        text: fm.category,
      });
    }
    metaRow.createSpan({
      cls: 'hc-list-time',
      text: relativeTime(new Date(file.stat.mtime)),
    });

    item.addEventListener('click', () => {
      const event = new CustomEvent('hc:open-file', { detail: file.path });
      document.dispatchEvent(event);
    });
    item.addClass('hc-clickable');
  }
}

/** 分类统计 */
function renderCategoryStats(container: HTMLElement, stats: StatsData): void {
  const card = container.createDiv({ cls: 'hc-card' });

  const header = card.createDiv({ cls: 'hc-card-header' });
  header.createSpan({ cls: 'hc-card-title', text: '文章分类分布' });
  header.createSpan({
    cls: 'hc-card-subtitle',
    text: `总计 ${stats.totalPosts} 篇`,
  });

  const bars = card.createDiv({ cls: 'hc-card-bars' });
  const maxCount = Math.max(...Object.values(stats.categoryBreakdown), 1);

  const categoryColors: Record<string, string> = {
    AIHacks: '#4caf50',
    Software: '#2196f3',
    Technical: '#ff9800',
    Workflow: '#9c27b0',
  };

  for (const [category, label] of Object.entries(CATEGORY_LABELS)) {
    const count = stats.categoryBreakdown[category] || 0;
    const pct = (count / maxCount) * 100;

    const row = bars.createDiv({ cls: 'hc-bar-row' });
    row.createSpan({ cls: 'hc-bar-label', text: label });

    const barTrack = row.createDiv({ cls: 'hc-bar-track' });
    const barFill = barTrack.createDiv({ cls: 'hc-bar-fill' });
    barFill.style.width = `${pct}%`;
    barFill.style.backgroundColor = categoryColors[category] || 'var(--console-accent)';

    row.createSpan({ cls: 'hc-bar-value', text: `${count} 篇` });
  }
}

/** 发布概况 */
function renderPublishSummary(container: HTMLElement, stats: StatsData): void {
  const card = container.createDiv({ cls: 'hc-card' });

  const header = card.createDiv({ cls: 'hc-card-header' });
  header.createSpan({ cls: 'hc-card-title', text: '发布概况' });

  const grid = card.createDiv({ cls: 'hc-stat-grid' });

  const items = [
    { label: '已发布', value: stats.totalPosts, icon: '📊' },
    { label: '草稿中', value: stats.drafts, icon: '📝' },
    { label: '本周发布', value: stats.publishedWeek, icon: '✅' },
    { label: '标签种类', value: Object.keys(stats.tagBreakdown).length, icon: '🏷️' },
  ];

  for (const item of items) {
    const cell = grid.createDiv({ cls: 'hc-stat-cell' });
    cell.createSpan({ cls: 'hc-stat-cell-icon', text: item.icon });
    cell.createSpan({ cls: 'hc-stat-cell-value', text: String(item.value) });
    cell.createSpan({ cls: 'hc-stat-cell-label', text: item.label });
  }
}
