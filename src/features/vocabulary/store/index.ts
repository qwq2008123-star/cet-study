/* ========================================
   🗂️ CET Study — 单词系统状态管理
   ======================================== */

import { create } from 'zustand'
import type { WordFilter, WordSort, VocabularyStats, StudyMode } from '../types'

interface VocabularyState {
  /** 筛选条件 */
  filter: WordFilter
  setFilter: (filter: Partial<WordFilter>) => void

  /** 排序方式 */
  sort: WordSort
  setSort: (sort: WordSort) => void

  /** 学习模式 */
  studyMode: StudyMode
  setStudyMode: (mode: StudyMode) => void

  /** 学习统计 */
  stats: VocabularyStats | null
  setStats: (stats: VocabularyStats) => void

  /** 当前页码 */
  page: number
  setPage: (page: number) => void

  /** 选中单词 ID */
  selectedWordId: string | null
  setSelectedWordId: (id: string | null) => void
}

export const useVocabularyStore = create<VocabularyState>((set) => ({
  filter: {
    level: 'all',
    difficulty: 'all',
    masterLevel: 0,
    search: '',
  },
  setFilter: (partial) =>
    set((state) => ({ filter: { ...state.filter, ...partial }, page: 1 })),

  sort: 'default',
  setSort: (sort) => set({ sort }),

  studyMode: 'all',
  setStudyMode: (studyMode) => set({ studyMode }),

  stats: null,
  setStats: (stats) => set({ stats }),

  page: 1,
  setPage: (page) => set({ page }),

  selectedWordId: null,
  setSelectedWordId: (id) => set({ selectedWordId: id }),
}))
