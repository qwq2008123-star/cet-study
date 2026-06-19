/* ========================================
   🔧 CET Study — 全局常量配置
   ======================================== */

/** 平台名称 */
export const APP_NAME = 'CET Study'
export const APP_SLOGAN = '英语四六级 · 智能学习平台'

/** 学习等级 */
export const STUDY_LEVELS = {
  CET4: 'cet4' as const,
  CET6: 'cet6' as const,
} as const

export type StudyLevel = (typeof STUDY_LEVELS)[keyof typeof STUDY_LEVELS]

export const LEVEL_LABELS: Record<StudyLevel, string> = {
  cet4: '大学英语四级',
  cet6: '大学英语六级',
}

/** 单词掌握等级 */
export const MASTER_LEVELS = [
  { level: 0, label: '未学习', color: 'var(--color-text-disabled)' },
  { level: 1, label: '刚认识', color: 'var(--color-error)' },
  { level: 2, label: '模糊', color: 'var(--color-warning)' },
  { level: 3, label: '有印象', color: 'var(--color-info)' },
  { level: 4, label: '较熟悉', color: 'var(--color-secondary)' },
  { level: 5, label: '已掌握', color: 'var(--color-success)' },
] as const

/** 听力板块 */
export const LISTENING_SECTIONS = {
  'short-conversation': '短对话',
  'long-conversation': '长对话',
  passage: '短文理解',
  dictation: '听写填空',
} as const

/** 阅读板块 */
export const READING_SECTIONS = {
  skimming: '快速阅读',
  close: '选词填空',
  'careful-reading': '仔细阅读',
} as const

/** 写作类型 */
export const WRITING_TYPES = {
  argumentative: '议论文',
  expository: '说明文',
  letter: '书信',
  graph: '图表作文',
} as const

/** API 基础路径 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

/** 请求超时时间 */
export const REQUEST_TIMEOUT = 10000

/** 分页默认值 */
export const PAGE_SIZE = 20

/** 学习目标（每日） */
export const DAILY_GOAL = {
  newWords: 20,
  reviewWords: 50,
  listeningMinutes: 15,
  readingMinutes: 15,
  totalMinutes: 30,
} as const

/** 路由路径 */
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  VOCABULARY: '/vocabulary',
  WORD_DETAIL: '/vocabulary/:id',
  LISTENING: '/listening',
  LISTENING_DETAIL: '/listening/:id',
  READING: '/reading',
  READING_DETAIL: '/reading/:id',
  WRITING: '/writing',
  WRITING_DETAIL: '/writing/:id',
  EXAM: '/exam',
  EXAM_DETAIL: '/exam/:id',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const
