/* ========================================
   📦 CET Study — 组件库统一导出入口
   所有可复用组件在此集中导出
   ======================================== */

/* UI 基础组件 */
export { Button } from './ui/Button'
export type { ButtonProps } from './ui/Button'

export { GlassCard } from './ui/GlassCard'
export type { GlassCardProps } from './ui/GlassCard'

export { Badge, Tag } from './ui/Badge'
export type { BadgeProps, TagProps } from './ui/Badge'

export { Loading, Skeleton } from './ui/Loading'
export type { LoadingProps, SkeletonProps } from './ui/Loading'

export { default as StatsCard } from './ui/StatsCard'
export type { StatsCardProps } from './ui/StatsCard'

export { default as ProgressBar } from './ui/ProgressBar'
export type { ProgressBarProps } from './ui/ProgressBar'

export { default as QuickActionCard } from './ui/QuickActionCard'
export type { QuickActionCardProps } from './ui/QuickActionCard'

/* 通用组件 */
export { default as ErrorBoundary } from './common/ErrorBoundary'
export { default as Scene3D } from './common/Scene3D'
export { default as ParticlesScene } from './common/ParticlesScene'
export { default as ParticleBackground } from './common/ParticleBackground'

/* 布局组件 */
export { default as TopBar } from './layout/TopBar'
export { default as Sidebar } from '../layouts/Sidebar'
export { default as RootLayout } from '../layouts/RootLayout'
