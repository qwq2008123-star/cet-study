/* ========================================
   🏠 CET Study — 学习概览 Dashboard
   组合可复用组件 · 不含复杂 UI 逻辑
   ======================================== */

import { motion } from 'framer-motion'
import StatsCard from '@/components/ui/StatsCard'
import ProgressBar from '@/components/ui/ProgressBar'
import QuickActionCard from '@/components/ui/QuickActionCard'
import { statsCards, quickActions, dailyGoals } from './mockData'

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* 头部区域 */}
      <motion.header
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-text-primary">
          欢迎回来，<span className="gradient-text">同学</span>
        </h1>
        <p className="text-text-secondary">
          保持节奏，今天也要继续进步 💪
        </p>
      </motion.header>

      {/* 统计卡片网格 */}
      <section aria-label="学习统计">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((card, index) => (
            <StatsCard
              key={card.label}
              {...card}
              delay={0.1 * index}
            />
          ))}
        </div>
      </section>

      {/* 快捷入口 */}
      <motion.section
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        aria-label="快捷学习入口"
      >
        <h2 className="section-title">快捷学习</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <QuickActionCard
              key={action.label}
              icon={action.icon}
              label={action.label}
              description={action.description}
            />
          ))}
        </div>
      </motion.section>

      {/* 今日目标 */}
      <motion.section
        className="card p-6 card-glow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        aria-label="今日学习目标"
      >
        <h2 className="section-title">今日目标</h2>
        <div className="space-y-3">
          {dailyGoals.map((goal) => (
            <ProgressBar
              key={goal.label}
              label={goal.label}
              current={goal.current}
              total={goal.total}
              color={goal.label === '新单词' ? 'primary' : goal.label === '复习单词' ? 'accent' : 'secondary'}
            />
          ))}
        </div>
      </motion.section>
    </div>
  )
}
