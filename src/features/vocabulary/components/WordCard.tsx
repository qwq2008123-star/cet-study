/* ========================================
   🃏 CET Study — 单词卡片组件
   ======================================== */

import { motion } from 'framer-motion'
import { GlassCard, Badge, Button } from '@/components'
import type { Word } from '@/types'

export interface WordCardProps {
  word: Word
  onSelect?: (id: string) => void
  onStudy?: (id: string) => void
  showActions?: boolean
}

const difficultyConfig = {
  easy: { label: '简单', color: 'success' as const },
  medium: { label: '中等', color: 'warning' as const },
  hard: { label: '困难', color: 'error' as const },
}

const levelConfig = {
  cet4: { label: 'CET-4', color: 'primary' as const },
  cet6: { label: 'CET-6', color: 'accent' as const },
}

export default function WordCard({
  word,
  onSelect,
  onStudy,
  showActions = true,
}: WordCardProps) {
  const diff = difficultyConfig[word.difficulty]
  const lvl = levelConfig[word.level]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard
        variant="default"
        hover="glow"
        padding="md"
        className="cursor-pointer"
        onClick={() => onSelect?.(word.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') onSelect?.(word.id) }}
        aria-label={`单词 ${word.word}`}
      >
        {/* 顶部标签行 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge size="sm" color={lvl.color}>{lvl.label}</Badge>
            <Badge size="sm" color={diff.color} dot>{diff.label}</Badge>
          </div>
          {/* 掌握度指示 */}
          <div className="flex items-center gap-1" aria-label={`掌握程度 ${word.masterLevel}/5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i < word.masterLevel
                    ? 'bg-primary shadow-glow-primary'
                    : 'bg-bg-tertiary'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 单词内容 */}
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-text-primary">{word.word}</h3>
          <p className="text-sm text-text-tertiary mt-0.5">
            {word.phonetic && `/ ${word.phonetic} /`}
          </p>
        </div>

        <p className="text-sm text-text-secondary mb-3">{word.translation}</p>

        {/* 例句 */}
        {word.examples.length > 0 && (
          <div className="p-3 rounded-lg bg-bg-tertiary/50 mb-3">
            <p className="text-sm text-text-secondary leading-relaxed">
              {word.examples[0].en}
            </p>
            <p className="text-xs text-text-tertiary mt-1">
              {word.examples[0].zh}
            </p>
          </div>
        )}

        {/* 操作按钮 */}
        {showActions && (
          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <Button
              size="sm"
              variant="primary"
              glow
              onClick={(e) => { e.stopPropagation(); onStudy?.(word.id) }}
            >
              开始学习
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => { e.stopPropagation(); onSelect?.(word.id) }}
            >
              查看详情
            </Button>
          </div>
        )}
      </GlassCard>
    </motion.div>
  )
}
