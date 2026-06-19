/* ========================================
   📦 CET Study — 全局类型定义
   ======================================== */

/** 用户信息 */
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  joinDate: string
  studyDays: number
  todayGoal: number
  todayProgress: number
}

/** 学习统计 */
export interface StudyStats {
  totalWords: number
  masteredWords: number
  learningWords: number
  totalListening: number
  totalReading: number
  streakDays: number
  todayStudyMinutes: number
}

/** 单词 */
export interface Word {
  id: string
  word: string
  translation: string
  definition: string
  phonetic: string
  audioUrl?: string
  examples: WordExample[]
  difficulty: 'easy' | 'medium' | 'hard'
  level: 'cet4' | 'cet6'
  masterLevel: number // 0-5 掌握程度
  nextReviewDate: string
  tags: string[]
}

/** 单词例句 */
export interface WordExample {
  en: string
  zh: string
}

/** 听力题目 */
export interface ListeningQuestion {
  id: string
  audioUrl: string
  transcript: string
  questions: Question[]
  level: 'cet4' | 'cet6'
  section: 'short-conversation' | 'long-conversation' | 'passage' | 'dictation'
}

/** 阅读题目 */
export interface ReadingQuestion {
  id: string
  title: string
  content: string
  questions: Question[]
  level: 'cet4' | 'cet6'
  section: 'skimming' | 'close' | 'careful-reading'
  wordCount: number
}

/** 通用题目 */
export interface Question {
  id: string
  type: 'single-choice' | 'multiple-choice' | 'fill-blank' | 'matching'
  stem: string
  options?: string[]
  answer: string | string[]
  explanation?: string
  score: number
}

/** 写作题目 */
export interface WritingQuestion {
  id: string
  title: string
  description: string
  requirements: string[]
  wordLimit: [number, number]
  level: 'cet4' | 'cet6'
  type: 'argumentative' | 'expository' | 'letter' | 'graph'
}

/** 模拟考试 */
export interface MockExam {
  id: string
  title: string
  level: 'cet4' | 'cet6'
  duration: number // minutes
  totalScore: number
  sections: ExamSection[]
}

/** 考试板块 */
export interface ExamSection {
  id: string
  name: string
  type: 'writing' | 'listening' | 'reading' | 'translation'
  questions: Question[]
  duration: number
  score: number
}

/** 学习记录 */
export interface StudyRecord {
  id: string
  userId: string
  type: 'vocabulary' | 'listening' | 'reading' | 'writing' | 'exam'
  date: string
  duration: number
  score?: number
  detail: Record<string, unknown>
}

/** 路由配置 */
export interface RouteConfig {
  path: string
  name: string
  component: React.LazyExoticComponent<React.ComponentType>
  meta?: {
    title: string
    icon?: string
    requiresAuth?: boolean
  }
}
