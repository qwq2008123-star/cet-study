/* ========================================
   ⌛ CET Study — 加载/骨架屏组件
   ======================================== */

/* ========== Loading Spinner ========== */

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullPage?: boolean
}

const spinnerSizes = {
  sm: 'w-4 h-4 border',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3',
}

export function Loading({ size = 'md', text, fullPage = false }: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${spinnerSizes[size]} rounded-full border-primary/30 border-t-primary animate-spin`}
        role="status"
        aria-label="加载中"
      />
      {text && <p className="text-sm text-text-tertiary">{text}</p>}
    </div>
  )

  if (fullPage) {
    return <div className="flex items-center justify-center min-h-[60vh]">{content}</div>
  }

  return content
}

/* ========== Skeleton 骨架屏 ========== */

export interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  width?: string | number
  height?: string | number
  count?: number
}

function SkeletonItem({ className = '', variant = 'text', width, height }: SkeletonProps) {
  const base = 'animate-pulse bg-bg-tertiary rounded-md'

  const variants = {
    text: 'h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'w-full',
    card: 'h-32 w-full rounded-xl',
  }

  return (
    <div
      className={`${base} ${variants[variant]} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}

export function Skeleton({ count = 1, ...props }: SkeletonProps) {
  return (
    <div className="space-y-3" role="status" aria-label="内容加载中">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonItem key={i} {...props} />
      ))}
      <span className="sr-only">内容加载中...</span>
    </div>
  )
}
