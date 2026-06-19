/* ========================================
   🧭 CET Study — 路由配置
   首页 Landing（无侧边栏）+ App（侧边栏）
   ======================================== */

import { lazy, Suspense } from 'react'
import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { ROUTES } from '@/constants'
import RootLayout from '@/layouts/RootLayout'
import LandingLayout from '@/layouts/LandingLayout'
import { Loading } from '@/components'

/* ========== 懒加载页面 ========== */
const Landing = lazy(() => import('@/pages/Landing'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Vocabulary = lazy(() => import('@/pages/Vocabulary'))
const WordDetail = lazy(() => import('@/pages/Vocabulary/WordDetail'))
const StudyPage = lazy(() => import('@/pages/Vocabulary/StudyPage'))

/* 后续业务模块 */
// const Listening = lazy(() => import('@/pages/Listening'))

function SW({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loading fullPage text="页面加载中..." />}>{children}</Suspense>
}

const routes: RouteObject[] = [
  /* ========================================
     首页 Landing — 无侧边栏，全屏粒子
  ========================================= */
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      { index: true, element: <SW><Landing /></SW> },
    ],
  },

  /* ========================================
     App 主程序 — 侧边栏 + 顶栏
  ========================================= */
  {
    path: '/',
    element: <RootLayout />,
    children: [
      /* 学习概览 */
      {
        path: ROUTES.DASHBOARD.slice(1), // 'dashboard'
        element: <SW><Dashboard /></SW>,
      },

      /* 📚 单词系统 */
      {
        path: ROUTES.VOCABULARY.slice(1), // 'vocabulary'
        element: <SW><Vocabulary /></SW>,
      },
      {
        path: ROUTES.WORD_DETAIL.slice(1), // 'vocabulary/:id'
        element: <SW><WordDetail /></SW>,
      },
      {
        path: 'vocabulary/study',
        element: <SW><StudyPage /></SW>,
      },

      /* 🎧 听力训练（占位）*/
      // { path: ROUTES.LISTENING.slice(1), element: <SW><Listening /></SW> },
    ],
  },
]

export const router = createBrowserRouter(routes, {
  basename: '/cet-study',
})
