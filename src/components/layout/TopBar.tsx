/* ========================================
   🎯 CET Study — 顶部导航栏
   毛玻璃效果 · 搜索 / 通知 / 用户
   ======================================== */

import { useAppStore } from '@/store/useAppStore'

export default function TopBar() {
  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed)

  return (
    <header
      className={`sticky top-0 z-dropdown h-14 flex items-center justify-between px-6 glass
        transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'}
      `}
      role="banner"
    >
      {/* 左侧：页面标题区 */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-text-tertiary">
          <span className="hidden sm:inline">CET Study</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-text-primary font-medium">学习概览</span>
        </div>
      </div>

      {/* 右侧：操作区 */}
      <div className="flex items-center gap-2">
        {/* 搜索按钮 */}
        <button
          className="w-9 h-9 rounded-lg flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-glass-hover transition-all focus-ring"
          aria-label="搜索"
          type="button"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M16 16L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* 通知按钮 */}
        <button
          className="relative w-9 h-9 rounded-lg flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-glass-hover transition-all focus-ring"
          aria-label="通知"
          type="button"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 13 21.7295C12.6981 21.9047 12.358 21.9965 12 22C11.642 21.9965 11.3019 21.9047 11 21.7295C10.6981 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {/* 通知红点 */}
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error shadow-glow-primary" aria-label="有未读通知" />
        </button>

        {/* 分隔线 */}
        <div className="w-px h-6 mx-1 bg-border" aria-hidden="true" />

        {/* 用户头像 */}
        <button
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-glass-hover transition-all focus-ring"
          aria-label="用户菜单"
          type="button"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white text-xs font-medium">
            U
          </div>
          <span className="hidden sm:inline text-sm text-text-primary font-medium">用户昵称</span>
        </button>
      </div>
    </header>
  )
}
