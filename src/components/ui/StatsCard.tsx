/* ========================================
   🃏 CET Study — 统计卡片组件
   可复用 · 全局统一风格
   ======================================== */

import { motion } from 'framer-motion'

export interface StatsCardProps {
  icon: string
  label: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  delay?: number
}

const trendConfig = {
  up: { bg: 'bg-success/10', text: 'text-success', arrow: '↑' },
  down: { bg: 'bg-error/10', text: 'text-error', arrow: '↓' },
  neutral: { bg: 'bg-text-disabled/10', text: 'text-text-tertiary', arrow: '—' },
}

export default function StatsCard({
  icon,
  label,
  value,
  change,
  trend = 'neutral',
  delay = 0,
}: StatsCardProps) {
  const tc = trendConfig[trend]

  return (
    <motion.div
      className="card p-5 card-glow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl" role="img" aria-hidden="true">{icon}</span>
        {change && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${tc.bg} ${tc.text}`}
            aria-label={`${trend === 'up' ? '增长' : trend === 'down' ? '下降' : '持平'} ${change}`}
          >
            {tc.arrow} {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
      <p className="text-sm text-text-tertiary mt-1">{label}</p>
    </motion.div>
  )
}
