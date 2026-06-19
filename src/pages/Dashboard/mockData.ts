/* ========================================
   🏠 CET Study — Dashboard Mock 数据
   集中管理，后续替换为真实 API 请求
   ======================================== */

import type { StatsCardProps } from '@/components/ui/StatsCard'

export const statsCards: StatsCardProps[] = [
  {
    icon: '📚',
    label: '已学单词',
    value: '1,284',
    change: '+12',
    trend: 'up',
  },
  {
    icon: '🎧',
    label: '听力练习',
    value: '47',
    change: '+3',
    trend: 'up',
  },
  {
    icon: '📖',
    label: '阅读文章',
    value: '23',
    change: '+1',
    trend: 'up',
  },
  {
    icon: '🔥',
    label: '连续学习',
    value: '7 天',
    change: '最高 12',
    trend: 'neutral',
  },
]

export interface QuickAction {
  icon: string
  label: string
  description: string
}

export const quickActions: QuickAction[] = [
  { icon: '🔤', label: '背单词', description: '今日新词 20 个' },
  { icon: '🎧', label: '听力练习', description: '短对话 × 10' },
  { icon: '📝', label: '模拟考试', description: 'CET-4 真题卷' },
]

export interface DailyGoal {
  label: string
  current: number
  total: number
  progress: number
}

export const dailyGoals: DailyGoal[] = [
  { label: '新单词', current: 12, total: 20, progress: 60 },
  { label: '复习单词', current: 30, total: 50, progress: 60 },
  { label: '听力训练', current: 10, total: 15, progress: 67 },
  { label: '阅读训练', current: 8, total: 15, progress: 53 },
]
