/* ========================================
   📖 CET Study — 单词详情页
   完整的单词信息 + 学习记录
   ======================================== */

import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button, GlassCard, Badge, Tag, Skeleton } from '@/components'
import { mockWords } from '@/features/vocabulary/mockData'
import { ROUTES } from '@/constants'

export default function WordDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const word = useMemo(() => mockWords.find((w) => w.id === id), [id])

  if (!word) {
    return (
      <div className="max-w-3xl mx-auto pt-12 text-center">
        <Skeleton count={5} />
        <p className="text-text-tertiary mt-4">单词未找到</p>
        <Button variant="ghost" onClick={() => navigate(ROUTES.VOCABULARY)} className="mt-4">
          返回词库
        </Button>
      </div>
    )
  }

  const diffColor = word.difficulty === 'easy' ? 'success'
    : word.difficulty === 'medium' ? 'warning' : 'error' as const
  const levelColor = word.level === 'cet4' ? 'primary' : 'accent' as const

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* 返回导航 */}
      <button
        onClick={() => navigate(ROUTES.VOCABULARY)}
        className="flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary transition-colors focus-ring rounded-lg px-2 py-1"
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        返回词库
      </button>

      {/* 单词主卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <GlassCard variant="glow" padding="lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge size="sm" color={levelColor}>{word.level === 'cet4' ? 'CET-4' : 'CET-6'}</Badge>
                <Badge size="sm" color={diffColor} dot>
                  {word.difficulty === 'easy' ? '简单' : word.difficulty === 'medium' ? '中等' : '困难'}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-text-primary">{word.word}</h1>
              <p className="text-text-tertiary mt-1 font-mono">/ {word.phonetic} /</p>
            </div>

            {/* 掌握度 */}
            <div className="text-right">
              <p className="text-xs text-text-tertiary mb-1">掌握度</p>
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < word.masterLevel ? 'bg-primary shadow-glow-primary' : 'bg-bg-tertiary'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="text-lg font-medium text-primary-light mb-3">{word.translation}</p>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">{word.definition}</p>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2">
            {word.tags.map((tag) => (
              <Tag key={tag} color="neutral">{tag}</Tag>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* 例句 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <GlassCard variant="default" padding="lg">
          <h2 className="text-lg font-semibold text-text-primary mb-4">📝 例句</h2>
          <div className="space-y-4">
            {word.examples.map((ex, i) => (
              <div key={i} className="p-4 rounded-xl bg-bg-tertiary/50">
                <p className="text-text-secondary leading-relaxed">{ex.en}</p>
                <p className="text-text-tertiary text-sm mt-1">{ex.zh}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* 学习记录 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <GlassCard variant="default" padding="lg">
          <h2 className="text-lg font-semibold text-text-primary mb-4">📊 学习记录</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: '连续正确', value: String((word as any).repetition ?? 0) },
              { label: '易难度', value: ((word as any).easiness ?? 1.5).toFixed(1) },
              { label: '复习间隔', value: `${(word as any).interval ?? 0} 天` },
              { label: '下次复习', value: (word as any).nextReviewDate ?? '-' },
            ].map((item) => (
              <div key={item.label} className="text-center p-3 rounded-lg bg-bg-tertiary/50">
                <p className="text-sm font-medium text-text-primary">{item.value}</p>
                <p className="text-xs text-text-tertiary mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* 操作按钮 */}
      <motion.div
        className="flex gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <Button variant="primary" size="lg" glow className="flex-1" onClick={() => navigate(`/vocabulary/study?mode=all`)}>
          开始学习
        </Button>
        <Button variant="glass" size="lg" onClick={() => navigate(ROUTES.VOCABULARY)}>
          返回词库
        </Button>
      </motion.div>
    </div>
  )
}
