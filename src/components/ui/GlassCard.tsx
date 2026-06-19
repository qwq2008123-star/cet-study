/* ========================================
   🃏 CET Study — 毛玻璃卡片组件
   多种预设效果
   ======================================== */

import { type HTMLAttributes, forwardRef } from 'react'

type GlassVariant = 'default' | 'glow' | 'elevated' | 'bordered'

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: GlassVariant
  hover?: 'glow' | 'lift' | 'none'
  padding?: 'sm' | 'md' | 'lg'
}

const variantStyles: Record<GlassVariant, string> = {
  default: 'bg-bg-card border border-border',
  glow: 'bg-bg-card border border-primary/20 shadow-glow-primary',
  elevated: 'bg-bg-elevated border border-border shadow-lg',
  bordered: 'glass',
}

const hoverStyles = {
  glow: 'hover:border-primary/30 hover:shadow-glow-primary',
  lift: 'hover:-translate-y-0.5 hover:shadow-lg',
  none: '',
}

const paddingStyles = {
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      variant = 'default',
      hover = 'glow',
      padding = 'md',
      className = '',
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`
          rounded-xl transition-all duration-250
          ${variantStyles[variant]}
          ${hoverStyles[hover]}
          ${paddingStyles[padding]}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    )
  },
)

GlassCard.displayName = 'GlassCard'
