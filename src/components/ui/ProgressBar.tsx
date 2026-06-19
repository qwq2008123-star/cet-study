/* ========================================
   📊 CET Study — 进度条组件
   可复用 · 渐变主题色
   ======================================== */

export interface ProgressBarProps {
  label: string
  current: number
  total: number
  showRatio?: boolean
  color?: 'primary' | 'secondary' | 'accent' | 'success'
  className?: string
}

const colorMap = {
  primary: 'from-primary to-accent',
  secondary: 'from-secondary to-primary',
  accent: 'from-accent to-primary',
  success: 'from-success to-emerald-400',
}

export default function ProgressBar({
  label,
  current,
  total,
  showRatio = true,
  color = 'primary',
  className = '',
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="w-20 text-sm text-text-secondary flex-shrink-0">
        {label}
      </span>
      <div className="flex-1 h-2 rounded-full bg-bg-tertiary overflow-hidden" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total} aria-label={label}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorMap[color]} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showRatio && (
        <span className="text-xs text-text-tertiary w-16 text-right tabular-nums">
          {current}/{total}
        </span>
      )}
    </div>
  )
}
