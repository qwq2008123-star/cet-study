/* ========================================
   🏗️ CET Study — 根布局
   Three.js 3D 粒子 + 侧边栏 + 顶栏 + 主内容区
   ======================================== */

import { Outlet } from 'react-router-dom'
import Sidebar from '@/layouts/Sidebar'
import TopBar from '@/components/layout/TopBar'
import ParticlesScene from '@/components/common/ParticlesScene'
import { useAppStore } from '@/store/useAppStore'

export default function RootLayout() {
  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed)

  return (
    <div className="relative min-h-screen bg-[#02030A] overflow-hidden">
      {/* ninja-canvas-bg 粒子场景 */}
      <ParticlesScene />

      {/* ===== 侧边栏 ===== */}
      <div className="relative z-[2]">
        <Sidebar />
      </div>

      {/* ===== 右侧内容区域 ===== */}
      <div
        className={`relative z-[2] transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'
        }`}
      >
        <TopBar />

        <main className="relative p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
