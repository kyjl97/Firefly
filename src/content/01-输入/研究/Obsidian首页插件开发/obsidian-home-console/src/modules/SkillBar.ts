/**
 * Skill 按钮栏模块
 * 三行按钮，点击触发 Claude CLI 命令
 */

import { SKILLS, GROUP_LABELS, type SkillGroup, type SkillDef } from '../skills/SkillRegistry';
import { SkillRunner } from '../skills/SkillRunner';
import type { Workspace, Plugin } from 'obsidian';

const GROUP_ORDER: SkillGroup[] = ['daily', 'knowledge', 'production', 'data'];

let runner: SkillRunner;

export function renderSkillBar(container: HTMLElement, workspace: Workspace, plugin: Plugin): void {
  if (!runner) {
    runner = new SkillRunner(workspace, plugin);
  }
  container.empty();
  container.addClass('hc-skill-bar');

  for (const group of GROUP_ORDER) {
    const skills = SKILLS.filter((s) => s.group === group);
    if (skills.length === 0) continue;

    const row = container.createDiv({ cls: 'hc-skill-row' });

    // 组标签（可选显示）
    // row.createSpan({ cls: 'hc-skill-group-label', text: GROUP_LABELS[group] });

    for (const skill of skills) {
      const btn = row.createEl('button', {
        cls: 'hc-skill-btn',
        attr: {
          'data-skill-id': skill.id,
          'aria-label': skill.description,
        },
      });

      btn.createSpan({ cls: 'hc-skill-icon', text: skill.icon });
      btn.createSpan({ cls: 'hc-skill-name', text: skill.name });

      // 悬浮提示
      btn.title = `${skill.name}: ${skill.description}\n命令: ${skill.command}`;

      // 点击执行
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        btn.addClass('hc-skill-active');
        await runner.run(skill);
        setTimeout(() => btn.removeClass('hc-skill-active'), 300);
      });
    }
  }
}
