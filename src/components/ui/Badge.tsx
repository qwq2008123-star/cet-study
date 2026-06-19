/* ========================================
   🏷️ CET Study — 徽标 / 标签组件
   ======================================== */

import { type HTMLAttributes } from 'react'

type BadgeColor =
  | 'primary' | 'secondary' | 'accent'
  | 'success' | 'warning' | 'error' | 'info'
  | 'neutral'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor
  dot?: boolean
  size?: 'sm' | 'md'
}

const colorStyles: Record<BadgeColor, string> = {
  primary: 'bg-primary-bg text-primary-light border-primary/20',
  secondary: 'bg-secondary-bg text-secondary-light border-secondary/20',
  accent: 'bg-accent-bg text-accent-light border-accent/20',
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  error: 'bg-error/10 text-error border-error/20',
  info: 'bg-info/10 text-info border-info/20',
  neutral: 'bg-bg-tertiary text-text-secondary border-border',
}

const dotColorMap: Record<BadgeColor, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-info',
  neutral: 'bg-text-tertiary',
}

export function Badge({
  color = 'primary',
  dot = false,
  size = 'sm',
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium border
        ${colorStyles[color]}
        ${size === 'sm' ? 'text-xs px-2 py-0.5 rounded-full' : 'text-sm px-2.5 py-1 rounded-md'}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColorMap[color]}`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}

/* ========== Tag 标签（更轻量） ========== */

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor
  closable?: boolean
  onClose?: () => void
}

export function Tag({
  color = 'neutral',
  closable = false,
  onClose,
  className = '',
  children,
  ...props
}: TagProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md
        ${colorStyles[color]}
        ${className}
      `}
      {...props}
    >
      {children}
      {closable && (
        <button
          onClick={onClose}
          className="ml-0.5 hover:opacity-70 transition-opacity focus-ring rounded-sm"
          aria-label="移除标签"
          type="button"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  )
}
