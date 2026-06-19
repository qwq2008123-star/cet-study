/* ========================================
   📖 CET Study — 单词学习页
   ======================================== */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, GlassCard, Badge, Tag, StatsCard } from '@/components'
import { useVocabularyStore } from '@/features/vocabulary/store'
import WordList from '@/features/vocabulary/components/WordList'
import { mockWords, mockVocabularyStats } from '@/features/vocabulary/mockData'
import type { StudyMode } from '@/features/vocabulary/types'

const studyModes: { key: StudyMode; label: string; icon: string }[] = [
  { key: 'all', label: '全部单词', icon: '📚' },
  { key: 'new', label: '今日新词', icon: '🆕' },
  { key: 'review', label: '待复习', icon: '🔄' },
]

const levelOptions = [
  { key: 'all' as const, label: '全部词库' },
  { key: 'cet4' as const, label: 'CET-4' },
  { key: 'cet6' as const, label: 'CET-6' },
]

export default function VocabularyPage() {
  const { studyMode, setStudyMode, filter, setFilter } = useVocabularyStore()
  const [loading, setLoading] = useState(false)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-text-primary">
          单词<span className="gradient-text">系统</span>
        </h1>
        <p className="text-text-secondary mt-1">掌握词汇，从今天开始</p>
      </motion.div>

      {/* 统计卡片行 */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <StatsCard icon="📖" label="总词量" value={String(mockVocabularyStats.totalWords)} />
        <StatsCard icon="✅" label="已掌握" value={String(mockVocabularyStats.mastered)} trend="up" change={`${Math.round(mockVocabularyStats.mastered / mockVocabularyStats.totalWords * 100)}%`} />
        <StatsCard icon="🔄" label="待复习" value={String(mockVocabularyStats.reviewDue)} trend="neutral" />
        <StatsCard icon="🔥" label="连续学习" value={`${mockVocabularyStats.streakDays} 天`} trend="up" change="+1" />
      </motion.div>

      {/* 学习模式切换 */}
      <motion.div
        className="flex flex-wrap items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {studyModes.map((mode) => (
          <Button
            key={mode.key}
            variant={studyMode === mode.key ? 'primary' : 'glass'}
            size="sm"
            glow={studyMode === mode.key}
            onClick={() => setStudyMode(mode.key)}
          >
            <span aria-hidden="true">{mode.icon}</span>
            {mode.label}
          </Button>
        ))}
      </motion.div>

      {/* 筛选项 */}
      <motion.div
        className="flex flex-wrap items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        {levelOptions.map((opt) => (
          <Tag
            key={opt.key}
            color={filter.level === opt.key ? 'primary' : 'neutral'}
            className={`cursor-pointer transition-all ${
              filter.level === opt.key ? 'ring-1 ring-primary/30' : ''
            }`}
            onClick={() => setFilter({ level: opt.key })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setFilter({ level: opt.key }) }}
          >
            {opt.label}
          </Tag>
        ))}
      </motion.div>

      {/* 单词列表 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <WordList
          words={mockWords}
          loading={loading}
          onSelectWord={(id) => console.log('select', id)}
          onStudyWord={(id) => console.log('study', id)}
        />
      </motion.div>

      {/* 底部提示 */}
      <div className="text-center py-6">
        <p className="text-xs text-text-tertiary">
          共 {mockWords.length} 个单词 · 掌握率 {Math.round(mockVocabularyStats.mastered / mockVocabularyStats.totalWords * 100)}%
        </p>
      </div>
    </div>
  )
}
