/* ========================================
   🏷️ CET Study — 快捷入口卡片组件
   ======================================== */

import { motion } from 'framer-motion'

export interface QuickActionCardProps {
  icon: string
  label: string
  description: string
  onClick?: () => void
}

export default function QuickActionCard({
  icon,
  label,
  description,
  onClick,
}: QuickActionCardProps) {
  return (
    <motion.div
      className="card p-5 glass-hover cursor-pointer group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.() }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      aria-label={`${label}：${description}`}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
          <span role="img" aria-hidden="true">{icon}</span>
        </div>
        <div>
          <p className="font-medium text-text-primary group-hover:text-primary-light transition-colors">
            {label}
          </p>
          <p className="text-sm text-text-tertiary">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}
