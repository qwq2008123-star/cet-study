/* ========================================
   🃏 CET Study — 翻转单词卡片
   3D 翻转动画 · 科技风
   ======================================== */

import { type HTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components'
import type { StudyCard } from '../store/studyStore'

export interface FlashcardProps extends HTMLAttributes<HTMLDivElement> {
  card: StudyCard
  flipped: boolean
  onFlip: () => void
}

export default function Flashcard({ card, flipped, onFlip, ...props }: FlashcardProps) {
  const diffColor = card.difficulty === 'easy' ? 'success'
    : card.difficulty === 'medium' ? 'warning' : 'error' as const

  const levelLabel = card.level === 'cet4' ? 'CET-4' : 'CET-6'
  const levelColor = card.level === 'cet4' ? 'primary' : 'accent' as const

  return (
    <div
      className="relative w-full max-w-lg mx-auto [perspective:1000px] cursor-pointer select-none"
      onClick={onFlip}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onFlip() }}}
      role="button"
      tabIndex={0}
      aria-label={flipped ? `${card.word} 的释义` : `点击翻转查看 ${card.word} 的释义`}
      {...props}
    >
      <motion.div
        className="relative w-full [transform-style:preserve-3d]"
        style={{ minHeight: '340px' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* ====== 正面 ====== */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="glass-strong rounded-2xl p-8 flex flex-col items-center justify-center min-h-[340px]">
            <div className="flex items-center gap-2 mb-6">
              <Badge size="sm" color={levelColor}>{levelLabel}</Badge>
              <Badge size="sm" color={diffColor} dot>
                {card.difficulty === 'easy' ? '简单' : card.difficulty === 'medium' ? '中等' : '困难'}
              </Badge>
            </div>

            <h2 className="text-3xl font-bold text-text-primary mb-3">{card.word}</h2>
            {card.phonetic && (
              <p className="text-sm text-text-tertiary font-mono mb-2">/ {card.phonetic} /</p>
            )}

            <div className="flex items-center gap-2 text-text-tertiary text-sm mt-8">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>点击翻转查看释义</span>
            </div>
          </div>
        </div>

        {/* ====== 背面 ====== */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="glass-strong rounded-2xl p-8 flex flex-col min-h-[340px]">
            <h3 className="text-xl font-semibold text-text-primary mb-1">{card.word}</h3>
            <p className="text-sm text-text-tertiary mb-5">{card.phonetic && `/ ${card.phonetic} /`}</p>

            <div className="flex-1 space-y-4">
              <div>
                <p className="text-xs text-text-tertiary uppercase tracking-wider mb-1">释义</p>
                <p className="text-base font-medium text-primary-light">{card.translation}</p>
              </div>
              <div>
                <p className="text-xs text-text-tertiary uppercase tracking-wider mb-1">英文解释</p>
                <p className="text-sm text-text-secondary leading-relaxed">{card.definition}</p>
              </div>
              {card.examples.length > 0 && (
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider mb-1">例句</p>
                  <div className="p-3 rounded-lg bg-bg-tertiary/50">
                    <p className="text-sm text-text-secondary leading-relaxed">{card.examples[0].en}</p>
                    <p className="text-xs text-text-tertiary mt-1">{card.examples[0].zh}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-glass-border text-center">
              <p className="text-xs text-text-tertiary">掌握度 {card.masterLevel}/5</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
