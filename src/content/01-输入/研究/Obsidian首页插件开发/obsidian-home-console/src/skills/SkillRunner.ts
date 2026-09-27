/**
 * Skill 执行器
 * 自动打开 Obsidian Terminal 插件并写入命令
 *
 * polyipseity Terminal 插件的命令格式:
 *   - open-terminal.default       (默认 profile 终端)
 *   - open-terminal.developerConsole
 *   - open-terminal.{type}        (按 profile 类型)
 */

import { Notice, Workspace, WorkspaceLeaf, Plugin } from 'obsidian';
import type { SkillDef } from './SkillRegistry';

/** polyipseity Terminal 的已知命令 ID 前缀 */
const TERMINAL_CMD_PREFIX = 'open-terminal.';

export class SkillRunner {
  private workspace: Workspace;
  private plugin: Plugin;

  constructor(workspace: Workspace, plugin: Plugin) {
    this.workspace = workspace;
    this.plugin = plugin;
  }

  /**
   * 执行 Skill 命令
   * 1. 找已有终端 → 写入
   * 2. 没有 → 执行命令打开终端 → 写入
   * 3. 都不行 → 剪贴板
   */
  async run(skill: SkillDef): Promise<void> {
    // 1. 尝试找已打开的终端
    let termLeaf = this.findTerminalLeaf();

    // 2. 没有 → 打开终端
    if (!termLeaf) {
      termLeaf = await this.openTerminalViaCommand();
      if (termLeaf) {
        // 等终端渲染完成
        await this.sleep(1000);
      }
    }

    // 3. 写入终端
    if (termLeaf) {
      const ok = this.writeToTerminal(termLeaf, skill);
      if (ok) {
        new Notice(`${skill.icon} 已发送到终端: ${skill.command}`, 3000);
        return;
      }
    }

    // 4. 降级: 剪贴板
    await this.copyToClipboard(skill);
  }

  /** 扫描所有 leaf 找终端 */
  private findTerminalLeaf(): WorkspaceLeaf | null {
    const allLeaves = this.workspace.getLeavesOfType('leaf');

    for (const leaf of allLeaves) {
      if (this.looksLikeTerminal(leaf)) {
        return leaf;
      }
    }
    return null;
  }

  /** 判断一个 leaf 是否是终端 */
  private looksLikeTerminal(leaf: WorkspaceLeaf): boolean {
    try {
      const view: any = leaf.view;
      if (!view) return false;

      // DOM 中有 xterm 元素（最可靠）
      const el = view.containerEl;
      if (el && (el.querySelector('.xterm') || el.querySelector('.xterm-viewport'))) {
        return true;
      }

      // view type 包含 terminal
      const viewType = view.getViewType?.() || '';
      if (viewType.includes('terminal')) return true;

      // view 有 terminal 属性
      if (view.terminal && typeof view.terminal === 'object') return true;

      return false;
    } catch {
      return false;
    }
  }

  /** 通过 Obsidian 命令系统打开终端 */
  private async openTerminalViaCommand(): Promise<WorkspaceLeaf | null> {
    try {
      const commands: Record<string, any> = (this.app as any).commands?.commands || {};

      // 找到所有 terminal: 开头的命令
      const termCmdIds = Object.keys(commands)
        .filter(id => id.startsWith(TERMINAL_CMD_PREFIX))
        .sort();

      if (termCmdIds.length === 0) {
        console.warn('Home Console: 未找到 terminal 插件命令');
        return null;
      }

      // 优先选 default，否则选第一个
      const targetCmd = termCmdIds.find(id => id.includes('default')) || termCmdIds[0];

      console.log(`Home Console: 执行命令 ${targetCmd}`);
      await (this.app as any).commands.executeCommandById(targetCmd);

      // 等待终端创建
      await this.sleep(600);

      // 再次查找终端
      return this.findTerminalLeaf();
    } catch (err) {
      console.error('Home Console: 打开终端失败', err);
      return null;
    }
  }

  /** 向终端写入命令 */
  private writeToTerminal(leaf: WorkspaceLeaf, skill: SkillDef): boolean {
    try {
      const view: any = leaf.view;

      // 聚焦终端面板
      this.workspace.revealLeaf(leaf);

      // 查找 xterm 实例
      const term = this.findXtermInstance(view);
      if (term) {
        // 聚焦
        if (typeof term.focus === 'function') term.focus();

        // 写入命令文本
        if (typeof term.write === 'function') {
          // write() 直接写入终端输入
          term.write(skill.command);
          return true;
        }

        // 备选: 通过 textarea 模拟输入
        const textarea = term.element?.querySelector('textarea')
                      || view.containerEl?.querySelector('.xterm textarea');
        if (textarea) {
          textarea.focus();
          // 用 execCommand 模拟输入（兼容性好）
          document.execCommand('insertText', false, skill.command);
          return true;
        }
      }

      // 备选: 直接在 xterm DOM 的 textarea 输入
      const xtermTextarea = view.containerEl?.querySelector('.xterm textarea') as HTMLTextAreaElement;
      if (xtermTextarea) {
        xtermTextarea.focus();
        document.execCommand('insertText', false, skill.command);
        return true;
      }

      return false;
    } catch (err) {
      console.error('Home Console: 终端写入失败', err);
      return false;
    }
  }

  /** 从 view 中查找 xterm.js 实例 */
  private findXtermInstance(view: any): any {
    // 直接属性
    if (view.terminal) return view.terminal;
    if (view.term) return view.term;
    if (view._terminal) return view._terminal;

    // emulator 内的 terminal
    if (view.emulator?.terminal) return view.emulator.terminal;

    // 遍历子对象查找
    for (const key of Object.keys(view)) {
      const val = view[key];
      if (val && typeof val === 'object' && typeof val.write === 'function' && val.element) {
        return val;
      }
    }

    return null;
  }

  /** 复制到剪贴板 */
  private async copyToClipboard(skill: SkillDef): Promise<void> {
    try {
      await navigator.clipboard.writeText(skill.command);
      new Notice(
        `${skill.icon} 已复制到剪贴板\n在终端中 Ctrl+V 粘贴执行`,
        5000
      );
    } catch {
      new Notice(`${skill.icon} 命令: ${skill.command}`, 8000);
    }
  }

  private get app() { return this.plugin.app; }
  private sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }
}
