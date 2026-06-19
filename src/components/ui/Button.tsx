/* ========================================
   🎯 CET Study — 按钮组件
   科技风 · 渐变/发光/毛玻璃多变体
   ======================================== */

import { type ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'glass'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  glow?: boolean
  as?: 'button'
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-glow-primary',
  secondary:
    'bg-gradient-to-r from-secondary to-primary text-white hover:opacity-90 shadow-glow-secondary',
  ghost:
    'bg-primary-bg text-primary-light hover:bg-primary/20',
  outline:
    'border border-primary/40 text-primary-light hover:bg-primary-bg hover:border-primary',
  glass:
    'glass text-text-primary hover:bg-glass-hover hover:border-border-hover',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-md',
  md: 'h-10 px-5 text-sm gap-2 rounded-lg',
  lg: 'h-12 px-7 text-base gap-2.5 rounded-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      glow = false,
      className = '',
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center font-medium
          transition-all duration-200
          disabled:opacity-40 disabled:cursor-not-allowed
          focus-ring
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${glow && variant === 'primary' ? 'shadow-glow-primary' : ''}
          ${glow && variant === 'glass' ? 'hover:shadow-glow-primary hover:border-primary/30' : ''}
          ${className}
        `}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
