/* ========================================
   🏗️ CET Study — Landing 布局
   Three.js 3D 粒子 + 无侧边栏
   ======================================== */

import { Outlet } from 'react-router-dom'
import ParticlesScene from '@/components/common/ParticlesScene'

export default function LandingLayout() {
  return (
    <div className="relative min-h-screen bg-[#02030A] overflow-hidden">
      {/* ninja-canvas-bg 粒子场景 */}
      <ParticlesScene />

      {/* 内容层 */}
      <div className="relative z-[2]">
        <Outlet />
      </div>
    </div>
  )
}
