/* ========================================
   🧬 CET Study — 工具函数：CSS Token 读取
   ======================================== */

/**
 * 从 :root 读取 CSS 自定义属性的当前值
 * 用于需要在 JS 中同步设计系统变量的场景
 */
export function getCSSToken(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

/**
 * 判断用户是否开启了「减少动画」偏好
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * 生成 0 到 max-1 的随机整数
 */
export function randomInt(max: number): number {
  return Math.floor(Math.random() * max)
}

/**
 * 格式化数字（千分位）
 */
export function formatNumber(n: number): string {
  return n.toLocaleString('zh-CN')
}

/**
 * 延迟工具
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
