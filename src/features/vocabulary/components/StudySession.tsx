/* ========================================
   📚 CET Study — 刷词会话组件
   翻转 → 自评 → 下一张 完整流程
   ======================================== */

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, GlassCard, Loading } from '@/components'
import Flashcard from './Flashcard'
import { useStudyStore, nextCard } from '../store/studyStore'
import type { StudyCard } from '../store/studyStore'
import type { ReviewQuality } from '../utils/sm2'
import { QUALITY_LABELS } from '../utils/sm2'

export interface StudySessionProps {
  cards: StudyCard[]
  onComplete: (results: import('../store/studyStore').StudyResult[]) => void
  onExit: () => void
}

const qualityOptions: { quality: ReviewQuality; label: string; emoji: string }[] = [
  { quality: 1, label: '记错了', emoji: '😅' },
  { quality: 3, label: '想起来了', emoji: '🤔' },
  { quality: 4, label: '比较顺利', emoji: '😊' },
  { quality: 5, label: '轻松掌握', emoji: '🔥' },
]

export default function StudySession({ cards, onComplete, onExit }: StudySessionProps) {
  const navigate = useNavigate()
  const {
    currentIndex, flipped, rated, stats,
    initSession, flipCard, rateCard,
  } = useStudyStore()

  useEffect(() => {
    initSession(cards)
  }, [cards, initSession])

  const currentCard = cards[currentIndex]
  const isLastCard = currentIndex >= cards.length - 1
  const progress = cards.length > 0 ? ((currentIndex + (rated ? 1 : 0)) / cards.length) * 100 : 0

  const handleRate = (quality: ReviewQuality) => {
    if (rated) return
    rateCard(quality)

    // 延迟后自动进入下一张
    setTimeout(() => {
      if (isLastCard) {
        // 完成所有卡片
        setTimeout(() => {
          const results = useStudyStore.getState().results
          onComplete(results)
        }, 600)
      } else {
        nextCard()
      }
    }, 500)
  }

  if (!currentCard) {
    return <Loading fullPage text="准备卡片中..." />
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* ===== 顶部进度 + 统计 ===== */}
      <div className="flex items-center justify-between">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors focus-ring rounded-lg px-2 py-1"
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          退出
        </button>

        <div className="flex items-center gap-4 text-sm">
          <span className="text-text-tertiary">
            <span className="text-text-primary font-medium">{currentIndex + 1}</span> / {cards.length}
          </span>
          <span className="text-text-tertiary">
            正确 <span className="text-success font-medium">{stats.correct}</span>
          </span>
          {stats.streak >= 3 && (
            <span className="text-warning font-medium">🔥 {stats.streak}连</span>
          )}
        </div>
      </div>

      {/* ===== 进度条 ===== */}
      <div className="h-1 rounded-full bg-bg-tertiary overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* ===== 翻转卡片 ===== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCard.id}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.3 }}
        >
          <Flashcard
            card={currentCard}
            flipped={flipped}
            onFlip={() => !rated && flipCard()}
          />
        </motion.div>
      </AnimatePresence>

      {/* ===== 自评按钮（翻面后显示） ===== */}
      <AnimatePresence>
        {flipped && !rated && (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-center text-sm text-text-tertiary">你记住了吗？</p>
            <div className="grid grid-cols-2 gap-3">
              {qualityOptions.slice(0, 2).map((opt) => (
                <Button
                  key={opt.quality}
                  variant="glass"
                  size="lg"
                  glow
                  className="w-full"
                  onClick={() => handleRate(opt.quality)}
                >
                  <span className="text-lg" aria-hidden="true">{opt.emoji}</span>
                  <span>{opt.label}</span>
                </Button>
              ))}
              {qualityOptions.slice(2).map((opt) => (
                <Button
                  key={opt.quality}
                  variant="primary"
                  size="lg"
                  glow
                  className="w-full"
                  onClick={() => handleRate(opt.quality)}
                >
                  <span className="text-lg" aria-hidden="true">{opt.emoji}</span>
                  <span>{opt.label}</span>
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== 评分反馈 ===== */}
      <AnimatePresence>
        {rated && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm text-text-tertiary">
              {isLastCard ? '🎉 已完成所有卡片！' : '准备下一张...'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
