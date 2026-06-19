/* ========================================
   📌 CET Study — 侧边栏导航
   毛玻璃效果 + 科技风 · 无障碍优化
   ======================================== */

import { useNavigate, useLocation, Link } from 'react-router-dom'
import { ROUTES, APP_NAME } from '@/constants'
import { useAppStore } from '@/store/useAppStore'

interface NavItem {
  path: string
  label: string
  icon: string
  ariaLabel: string
}

const navItems: NavItem[] = [
  { path: '/', label: '首页', icon: '🏠', ariaLabel: '回到首页' },
  { path: ROUTES.DASHBOARD, label: '学习概览', icon: '📊', ariaLabel: '学习概览仪表盘' },
  { path: ROUTES.VOCABULARY, label: '单词系统', icon: '📚', ariaLabel: '单词学习系统' },
  { path: ROUTES.LISTENING, label: '听力训练', icon: '🎧', ariaLabel: '听力训练模块' },
  { path: ROUTES.READING, label: '阅读训练', icon: '📖', ariaLabel: '阅读训练模块' },
  { path: ROUTES.WRITING, label: '写作训练', icon: '✍️', ariaLabel: '写作训练模块' },
  { path: ROUTES.EXAM, label: '模拟考试', icon: '📝', ariaLabel: '模拟考试模块' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { sidebarCollapsed, toggleSidebar } = useAppStore()

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    if (path === ROUTES.DASHBOARD) return location.pathname === path
    return location.pathname.startsWith(path)
  }

  return (
    <aside
      className={`fixed left-0 top-0 h-screen z-sticky flex flex-col
        transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? 'w-[72px]' : 'w-[260px]'}
      `}
      aria-label="主导航"
    >
      {/* 毛玻璃背景 */}
      <div className="absolute inset-0 glass-strong pointer-events-none" />

      {/* 左侧光效装饰 */}
      <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-primary/40 via-accent/20 to-transparent" />

      <div className="relative flex flex-col h-full">
        {/* Logo 区域 */}
        <div className="flex items-center h-16 px-6 border-b border-glass-border">
          <Link to="/" className="flex items-center gap-3 no-underline" aria-label="回到首页">
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                C
              </div>
              <div className="absolute -inset-1 rounded-lg bg-primary/20 blur-sm" />
            </div>

            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-text-primary">
                  {APP_NAME}
                </span>
                <span className="text-[10px] text-text-tertiary leading-none mt-0.5">
                  四六级学习平台
                </span>
              </div>
            )}
          </Link>

          {/* 折叠按钮 */}
          {!sidebarCollapsed && (
            <button
              onClick={toggleSidebar}
              className="ml-auto w-6 h-6 rounded-md flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-glass-hover transition-all focus-ring"
              aria-label="收起侧边栏"
              type="button"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M7 2L4 6L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto" aria-label="学习模块导航">
          {navItems.map((item) => {
            const active = isActive(item.path)

            return (
              <Link
                key={item.path}
                to={item.path}
                aria-label={item.ariaLabel}
                aria-current={active ? 'page' : undefined}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg no-underline
                  transition-all duration-200 text-sm
                  ${active
                    ? 'bg-primary-bg text-primary-light shadow-glow-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-glass-hover'
                  }
                  focus-ring
                `}
              >
                <span className="text-lg flex-shrink-0" aria-hidden="true">{item.icon}</span>
                {!sidebarCollapsed && (
                  <span className="font-medium truncate">{item.label}</span>
                )}

                {/* 激活指示器 */}
                {active && !sidebarCollapsed && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-glow-primary" aria-hidden="true" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* 底部用户区域 */}
        <div className="p-4 border-t border-glass-border">
          {sidebarCollapsed ? (
            <button
              className="w-full flex justify-center focus-ring rounded-lg"
              aria-label="用户菜单"
              type="button"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white text-xs font-medium">
                U
              </div>
            </button>
          ) : (
            <button
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-glass-hover transition-all cursor-pointer focus-ring"
              aria-label="用户菜单"
              type="button"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white text-xs font-medium">
                U
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-text-primary truncate">
                  用户昵称
                </p>
                <p className="text-xs text-text-tertiary truncate">
                  学习 0 天
                </p>
              </div>
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
