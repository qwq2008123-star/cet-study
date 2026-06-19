/* ========================================
   📚 CET Study — 刷词学习页
   入口条件：待复习 / 今日新词 / 全部词库
   ======================================== */

import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GlassCard, Badge, Button } from '@/components'
import StudySession from '@/features/vocabulary/components/StudySession'
import { mockWords } from '@/features/vocabulary/mockData'
import { useStudyStore, type StudyResult } from '@/features/vocabulary/store/studyStore'

type StudyMode = 'review' | 'new' | 'all'

const modeConfig = {
  review: { title: '📖 复习模式', desc: '到期需要复习的单词', key: 'review' as StudyMode },
  new: { title: '🆕 学习新词', desc: '尚未学习的单词', key: 'new' as StudyMode },
  all: { title: '📚 全部单词', desc: '浏览词库中所有单词', key: 'all' as StudyMode },
}

export default function StudyPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const mode = (searchParams.get('mode') as StudyMode) || 'all'
  const [sessionActive, setSessionActive] = useState(false)
  const [sessionComplete, setSessionComplete] = useState<StudyResult[] | null>(null)

  const config = modeConfig[mode]

  const filteredCards = useMemo(() => {
    const today = '2026-06-17'
    switch (mode) {
      case 'review':
        return mockWords.filter((w) => w.nextReviewDate <= today).map(toStudyCard)
      case 'new':
        return mockWords.filter((w) => w.masterLevel === 0).map(toStudyCard)
      default:
        return mockWords.map(toStudyCard)
    }
  }, [mode])

  const handleComplete = (results: StudyResult[]) => {
    setSessionComplete(results)
    setSessionActive(false)
  }

  if (sessionActive) {
    return (
      <div className="py-6">
        <StudySession
          cards={filteredCards}
          onComplete={handleComplete}
          onExit={() => setSessionActive(false)}
        />
      </div>
    )
  }

  if (sessionComplete) {
    const correctCount = sessionComplete.filter((r) => r.quality >= 3).length
    const accuracy = sessionComplete.length > 0
      ? Math.round((correctCount / sessionComplete.length) * 100)
      : 0

    return (
      <div className="max-w-lg mx-auto pt-12">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto">
            <span className="text-4xl">🎉</span>
          </div>

          <h2 className="text-2xl font-bold text-text-primary">学习完成！</h2>

          <GlassCard variant="glow" padding="lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary-light">{sessionComplete.length}</p>
                <p className="text-xs text-text-tertiary mt-1">总卡片</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{correctCount}</p>
                <p className="text-xs text-text-tertiary mt-1">正确</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{accuracy}%</p>
                <p className="text-xs text-text-tertiary mt-1">正确率</p>
              </div>
            </div>
          </GlassCard>

          <div className="flex gap-3 justify-center">
            <Button variant="glass" onClick={() => { setSessionComplete(null); navigate('/vocabulary') }}>
              返回词库
            </Button>
            <Button variant="primary" glow onClick={() => { setSessionComplete(null); setSessionActive(true) }}>
              再来一轮
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto pt-8">
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-5xl mb-2">{config.title.split(' ')[0]}</div>
        <h1 className="text-2xl font-bold text-text-primary">{config.title}</h1>
        <p className="text-text-secondary">{config.desc}</p>

        <GlassCard variant="glow" padding="lg" className="text-left">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-text-secondary">本次学习</span>
            <Badge color="primary">{filteredCards.length} 张卡片</Badge>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {filteredCards.slice(0, 10).map((c) => (
              <span key={c.id} className="text-sm px-2 py-1 rounded-md bg-bg-tertiary text-text-secondary">
                {c.word}
              </span>
            ))}
            {filteredCards.length > 10 && (
              <span className="text-sm px-2 py-1 rounded-md bg-bg-tertiary text-text-tertiary">
                +{filteredCards.length - 10}
              </span>
            )}
          </div>

          <Button
            variant="primary"
            size="lg"
            glow
            className="w-full"
            onClick={() => setSessionActive(true)}
            disabled={filteredCards.length === 0}
          >
            开始学习 ({filteredCards.length})
          </Button>
        </GlassCard>

        <Button variant="ghost" onClick={() => navigate('/vocabulary')}>
          返回词库
        </Button>
      </motion.div>
    </div>
  )
}

function toStudyCard(w: typeof mockWords[0]) {
  return {
    id: w.id,
    word: w.word,
    translation: w.translation,
    phonetic: w.phonetic || '',
    definition: w.definition,
    examples: w.examples,
    difficulty: w.difficulty,
    level: w.level,
    masterLevel: w.masterLevel || 0,
    repetition: (w as any).repetition || 0,
    easiness: (w as any).easiness || 1.5,
    interval: (w as any).interval || 0,
  }
}
