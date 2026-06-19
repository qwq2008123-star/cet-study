/* ========================================
   📋 CET Study — 单词列表组件
   ======================================== */

import { Skeleton } from '@/components'
import WordCard from './WordCard'
import type { Word } from '@/types'

export interface WordListProps {
  words: Word[]
  loading?: boolean
  onSelectWord?: (id: string) => void
  onStudyWord?: (id: string) => void
}

export default function WordList({
  words,
  loading = false,
  onSelectWord,
  onStudyWord,
}: WordListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="card p-5">
            <Skeleton variant="text" className="w-1/3 mb-3" />
            <Skeleton variant="text" className="w-2/3 mb-2" />
            <Skeleton variant="text" className="w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (words.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-bg-tertiary flex items-center justify-center mb-4">
          <span className="text-3xl">📭</span>
        </div>
        <h3 className="text-lg font-medium text-text-primary mb-1">没有找到单词</h3>
        <p className="text-sm text-text-tertiary">尝试调整筛选条件或切换词库</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {words.map((word) => (
        <WordCard
          key={word.id}
          word={word}
          onSelect={onSelectWord}
          onStudy={onStudyWord}
        />
      ))}
    </div>
  )
}
