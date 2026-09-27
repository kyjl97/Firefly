/**
 * Skill 注册表
 * 定义所有可用的 Skill 按钮
 */

export type SkillGroup = 'daily' | 'knowledge' | 'production' | 'data';

export interface SkillDef {
  id: string;
  name: string;
  icon: string;
  command: string;
  group: SkillGroup;
  description: string;
}

/** 所有 Skill 定义 */
export const SKILLS: SkillDef[] = [
  // ===== 每日运转 =====
  {
    id: 'task-mgmt',
    name: '任务',
    icon: '📋',
    command: "claude '$任务管理'",
    group: 'daily',
    description: '打开任务看板视图',
  },
  {
    id: 'quick-idea',
    name: '想法',
    icon: '💡',
    command: "claude '$快速想法'",
    group: 'daily',
    description: '快速捕获一个想法到选题池',
  },
  {
    id: 'topic-mgmt',
    name: '选题',
    icon: '📝',
    command: "claude '$选题规划'",
    group: 'daily',
    description: '查看/管理选题池',
  },
  {
    id: 'inspiration',
    name: '灵感',
    icon: '💎',
    command: "claude '$灵感记录'",
    group: 'daily',
    description: '记录灵感碎片',
  },
  {
    id: 'daily-log',
    name: '日志',
    icon: '📅',
    command: "claude '$日常-每日开场'",
    group: 'daily',
    description: '创建/编辑今日 Daily Note',
  },

  // ===== 知识管理 =====
  {
    id: 'note-triage',
    name: '笔记分诊',
    icon: '🧹',
    command: "claude '$笔记分诊'",
    group: 'knowledge',
    description: '扫描未归类笔记，自动分发到正确目录',
  },
  {
    id: 'ingest',
    name: '收件箱归档',
    icon: '📥',
    command: "claude '/up-Library-ingest'",
    group: 'knowledge',
    description: '读取 01-输入/ 素材，提炼到 Library/，源文件归档',
  },
  {
    id: 'query',
    name: '查知识库',
    icon: '🔍',
    command: "claude '/Library-query'",
    group: 'knowledge',
    description: '检索 Library 索引，综合回答并用 [[]] 标注来源',
  },
  {
    id: 'lint',
    name: '知识库体检',
    icon: '🧪',
    command: "claude '/Library-lint'",
    group: 'knowledge',
    description: '检查死链、孤儿页面、索引遗漏、知识冲突',
  },
  {
    id: 'full-sync',
    name: '全量同步',
    icon: '🔄',
    command: "claude '/Update'",
    group: 'knowledge',
    description: '同时更新 index + Library + wiki',
  },
  {
    id: 'index-sync',
    name: '索引同步',
    icon: '📋',
    command: "claude '/up-index'",
    group: 'knowledge',
    description: '同步 index.md 与 6 个目录的文件索引',
  },
  {
    id: 'wiki-sync',
    name: 'Wiki同步',
    icon: '🌐',
    command: "claude '/up-blog-Wiki'",
    group: 'knowledge',
    description: '同步 posts 文章元数据到 wiki/，校验外链有效性',
  },

  // ===== 内容生产 =====
  {
    id: 'topic-gen',
    name: '选题生成',
    icon: '💡',
    command: "claude '/huashu-topic-gen'",
    group: 'production',
    description: '基于素材生成选题角度',
  },
  {
    id: 'write',
    name: '写文章',
    icon: '✍️',
    command: "claude '/khazix-writer'",
    group: 'production',
    description: '通用写作',
  },
  {
    id: 'write-tutorial',
    name: '写教程',
    icon: '📖',
    command: "claude '/kyjl97-tutorial'",
    group: 'production',
    description: '教程类专用写作',
  },
  {
    id: 'traffic',
    name: '引流文案',
    icon: '🎯',
    command: "claude '/article-traffic-writer'",
    group: 'production',
    description: '引流型文案',
  },
  {
    id: 'humanize',
    name: '去AI味',
    icon: '🤖',
    command: "claude '/humanizer'",
    group: 'production',
    description: '降低 AI 痕迹',
  },
  {
    id: 'proofread',
    name: '审校',
    icon: '📝',
    command: "claude '/huashu-proofreading'",
    group: 'production',
    description: '三遍审校降 AI 味',
  },
  {
    id: 'illustrate',
    name: '文章配图',
    icon: '📸',
    command: "claude '/baoyu-article-illustrator'",
    group: 'production',
    description: '自动文内配图',
  },
  {
    id: 'pack',
    name: '内容打包',
    icon: '📦',
    command: "claude '/article-pack'",
    group: 'production',
    description: '配图+封面+标题+短文案+PPT',
  },

  // ===== 数据分析 =====
  {
    id: 'hot-radar',
    name: '热点雷达',
    icon: '🔥',
    command: "claude '/aihot'",
    group: 'data',
    description: 'AI 领域热点捕捉与选题推荐',
  },
  {
    id: 'video-data',
    name: '视频数据分析',
    icon: '📊',
    command: "claude '$视频数据分析'",
    group: 'data',
    description: '分析过往视频数据表现',
  },
];

/** 按分组获取 Skills */
export function getSkillsByGroup(group: SkillGroup): SkillDef[] {
  return SKILLS.filter((s) => s.group === group);
}

/** 通过 ID 获取 Skill */
export function getSkillById(id: string): SkillDef | undefined {
  return SKILLS.find((s) => s.id === id);
}

/** 分组显示名 */
export const GROUP_LABELS: Record<SkillGroup, string> = {
  daily: '每日运转',
  knowledge: '知识管理',
  production: '内容生产',
  data: '数据分析',
};
