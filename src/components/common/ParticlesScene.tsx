/* ========================================
   🌌 CET Study — 3D Shape Particle Text
   26000 粒子 3D 形状变形 + 闪电 + 发光 + 地球仪
   ======================================== */

import { useEffect, useState } from 'react'
import { ShapeParticleText } from '3d-shape-particle-text'

export default function ParticlesScene() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className="fixed inset-0 w-full h-full bg-[#02030A]"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <ShapeParticleText
        shape="torusKnot"
        text="CET"
        particleCount={26000}
        particleSize={0.012}
        primaryColor={{ r: 0.4, g: 0.42, b: 0.95 }}
        secondaryColor={{ r: 0.55, g: 0.24, b: 0.82 }}
        backgroundColor="#02030A"
        transparent={false}
        morphDuration={3}
        rotationSpeed={0.08}
        hoverIntensity={0.04}
        lightningIntensity={0.6}
        lightningColor={{ r: 0.6, g: 0.7, b: 1.0 }}
        zapSpread={8}
        zapWidth={0.03}
        cameraDistance={3.2}
        globeOpacity={0.15}
        globeColor={{ r: 0.4, g: 0.42, b: 0.95 }}
        showGlobe={true}
        glowEffect={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
