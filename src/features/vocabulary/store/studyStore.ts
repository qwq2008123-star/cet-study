/* ========================================
   🗂️ CET Study — 刷词会话状态管理
   ======================================== */

import { create } from 'zustand'
import type { ReviewQuality } from '../utils/sm2'
import { calculateSM2, qualityToMasterLevel } from '../utils/sm2'

export interface StudyCard {
  id: string
  word: string
  translation: string
  phonetic: string
  definition: string
  examples: { en: string; zh: string }[]
  difficulty: string
  level: string
  masterLevel: number
  repetition: number
  easiness: number
  interval: number
}

export interface StudyResult {
  wordId: string
  word: string
  quality: ReviewQuality
  masterLevel: number
  nextReviewDate: string
}

interface StudySessionState {
  /** 本次会话的卡片队列 */
  cards: StudyCard[]
  /** 当前卡片索引 */
  currentIndex: number
  /** 是否已翻面（展示答案） */
  flipped: boolean
  /** 是否已评分 */
  rated: boolean
  /** 已完成的结果 */
  results: StudyResult[]

  /** 会话统计 */
  stats: {
    total: number
    completed: number
    correct: number   // quality >= 3
    streak: number
  }

  /** 初始化会话 */
  initSession: (cards: StudyCard[]) => void
  /** 翻面 */
  flipCard: () => void
  /** 评分并进入下一张 */
  rateCard: (quality: ReviewQuality) => void
  /** 结束会话 */
  endSession: () => StudyResult[]
  /** 重置会话 */
  resetSession: () => void
}

export const useStudyStore = create<StudySessionState>((set, get) => ({
  cards: [],
  currentIndex: 0,
  flipped: false,
  rated: false,
  results: [],
  stats: { total: 0, completed: 0, correct: 0, streak: 0 },

  initSession: (cards) =>
    set({
      cards,
      currentIndex: 0,
      flipped: false,
      rated: false,
      results: [],
      stats: { total: cards.length, completed: 0, correct: 0, streak: 0 },
    }),

  flipCard: () => {
    const { rated } = get()
    if (!rated) set({ flipped: true })
  },

  rateCard: (quality) => {
    const { cards, currentIndex, results, stats } = get()
    const card = cards[currentIndex]
    if (!card || card.id === undefined) return

    // SM-2 计算
    const sm2Result = calculateSM2(quality, {
      repetition: card.repetition,
      easiness: card.easiness,
      interval: card.interval,
    })

    const newMasterLevel = qualityToMasterLevel(quality, card.masterLevel)

    const result: StudyResult = {
      wordId: card.id,
      word: card.word,
      quality,
      masterLevel: newMasterLevel,
      nextReviewDate: sm2Result.nextReviewDate,
    }

    const isCorrect = quality >= 3
    const newStreak = isCorrect ? stats.streak + 1 : 0

    set({
      rated: true,
      results: [...results, result],
      stats: {
        ...stats,
        completed: stats.completed + 1,
        correct: stats.correct + (isCorrect ? 1 : 0),
        streak: newStreak,
      },
    })
  },

  endSession: () => {
    const { results } = get()
    return results
  },

  resetSession: () =>
    set({
      cards: [],
      currentIndex: 0,
      flipped: false,
      rated: false,
      results: [],
      stats: { total: 0, completed: 0, correct: 0, streak: 0 },
    }),
}))

/* 自动翻到下一张（供外部调用） */
export function nextCard() {
  const state = useStudyStore.getState()
  const { currentIndex, cards } = state

  if (currentIndex < cards.length - 1) {
    useStudyStore.setState({
      currentIndex: currentIndex + 1,
      flipped: false,
      rated: false,
    })
    return true
  }
  return false
}
