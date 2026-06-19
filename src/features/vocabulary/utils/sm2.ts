/* ========================================
   🧠 CET Study — SM-2 遗忘曲线算法
   基于 SuperMemo SM-2 简化实现
   ======================================== */

export interface SM2Result {
  repetition: number   // 连续正确次数
  easiness: number     // 易难度（EF）
  interval: number     // 下次复习间隔（天）
  nextReviewDate: string
}

/**
 * 用户自评等级
 * 0 = 完全忘记  |  1 = 错误但回忆起来了  |  2 = 错误但感觉熟悉
 * 3 = 正确但困难  |  4 = 正确且较轻松  |  5 = 完全正确且迅速
 */
export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5

/**
 * SM-2 核心算法
 * @param quality 用户自评质量 (0-5)
 * @param prev 上次复习参数
 * @returns 新的复习参数
 */
export function calculateSM2(
  quality: ReviewQuality,
  prev: { repetition: number; easiness: number; interval: number },
): SM2Result {
  let { repetition, easiness, interval } = prev

  // 1. 计算新的 Easiness Factor
  easiness = easiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  if (easiness < 1.3) easiness = 1.3
  if (easiness > 2.5) easiness = 2.5

  // 2. 根据质量决定是否重置
  if (quality < 3) {
    // 回答错误 → 重置
    repetition = 0
    interval = 0
  } else {
    // 回答正确 → 更新间隔
    repetition += 1
    if (repetition === 1) {
      interval = 1
    } else if (repetition === 2) {
      interval = 3
    } else {
      interval = Math.round(interval * easiness)
    }
  }

  // 3. 计算下次复习日期
  const next = new Date()
  next.setDate(next.getDate() + interval)
  const nextReviewDate = next.toISOString().split('T')[0]

  return { repetition, easiness, interval, nextReviewDate }
}

/**
 * 根据质量等级映射到掌握度 (0-5)
 */
export function qualityToMasterLevel(quality: ReviewQuality, currentLevel: number): number {
  if (quality <= 1) return Math.max(0, currentLevel - 2)
  if (quality === 2) return Math.max(0, currentLevel - 1)
  if (quality === 3) return currentLevel
  if (quality === 4) return Math.min(5, currentLevel + 1)
  return Math.min(5, currentLevel + 2) // quality === 5
}

/**
 * 质量等级中文描述
 */
export const QUALITY_LABELS: Record<ReviewQuality, { label: string; color: string }> = {
  0: { label: '完全忘记', color: 'var(--color-error)' },
  1: { label: '记错了', color: 'var(--color-error)' },
  2: { label: '有点印象', color: 'var(--color-warning)' },
  3: { label: '想起来了', color: 'var(--color-info)' },
  4: { label: '比较顺利', color: 'var(--color-secondary)' },
  5: { label: '轻松掌握', color: 'var(--color-success)' },
}
