/* ========================================
   🗂️ CET Study — 全局应用状态
   使用 Zustand 管理
   ======================================== */

import { create } from 'zustand'
import type { User, StudyStats } from '@/types'

interface AppState {
  /** 侧边栏折叠状态 */
  sidebarCollapsed: boolean
  toggleSidebar: () => void

  /** 用户信息 */
  user: User | null
  setUser: (user: User | null) => void

  /** 学习统计 */
  stats: StudyStats | null
  setStats: (stats: StudyStats) => void

  /** 全局加载状态 */
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  user: null,
  setUser: (user) => set({ user }),

  stats: null,
  setStats: (stats) => set({ stats }),

  loading: false,
  setLoading: (loading) => set({ loading }),
}))
