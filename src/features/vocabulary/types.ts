/* ========================================
   📖 CET Study — 单词系统类型定义
   ======================================== */

/** 单词筛选条件 */
export interface WordFilter {
  level: 'cet4' | 'cet6' | 'all'
  difficulty: 'easy' | 'medium' | 'hard' | 'all'
  masterLevel: number // 0-5, 0 表示全部
  search: string
}

/** 单词列表排序 */
export type WordSort = 'default' | 'alphabetical' | 'masterLevel' | 'nextReview'

/** 单词列表查询参数 */
export interface WordQuery {
  page: number
  pageSize: number
  filter: WordFilter
  sort: WordSort
}

/** 学习模式 */
export type StudyMode = 'new' | 'review' | 'all'

/** 每日学习统计 */
export interface VocabularyStats {
  totalWords: number
  mastered: number
  learning: number
  newToday: number
  reviewDue: number
  streakDays: number
}
