/* ========================================
   💫 CET Study — 交互式粒子背景 V2
   鼠标悬浮交互 + 粒子连线 + 动态吸引
   ======================================== */

import { useRef, useEffect, useCallback } from 'react'
import { prefersReducedMotion } from '@/utils'

/* ========== 配置 ========== */
const CONFIG = {
  particleCount: 80,
  starCount: 60,
  connectionDist: 130,      // 连线最大距离
  mouseRadius: 160,         // 鼠标影响半径
  repelForce: 1.8,          // 鼠标排斥力
  vortexForce: 0.4,         // 漩涡力
  returnForce: 0.008,       // 回归环绕力
  maxSpeed: 3.0,
  trailLen: 5,
}

/* ========== Types ========== */

interface Vec2 {
  x: number; y: number
}

interface Particle {
  pos: Vec2
  vel: Vec2
  size: number
  hue: number
  alpha: number
  trail: Vec2[]
}

/* ========== 主组件 ========== */

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef(0)
  const mouse = useRef<Vec2>({ x: -9999, y: -9999 })
  const mouseOn = useRef(false)
  const particles = useRef<Particle[]>([])
  const stars = useRef<Particle[]>([])
  const time = useRef(0)
  const dims = useRef({ w: 0, h: 0 })
  const rm = prefersReducedMotion()

  const init = useCallback((w: number, h: number) => {
    dims.current = { w, h }
    const n = rm ? Math.floor(CONFIG.particleCount * 0.3) : CONFIG.particleCount

    particles.current = Array.from({ length: n }, () => {
      const a = Math.random() * Math.PI * 2
      const s = 0.3 + Math.random() * 0.7
      return {
        pos: { x: Math.random() * w, y: Math.random() * h },
        vel: { x: Math.cos(a) * s, y: Math.sin(a) * s },
        size: 1.2 + Math.random() * 2.8,
        hue: 210 + Math.random() * 90,
        alpha: 0.5 + Math.random() * 0.5,
        trail: [],
      }
    })

    if (!rm) {
      stars.current = Array.from({ length: CONFIG.starCount }, () => ({
        pos: { x: Math.random() * w, y: Math.random() * h },
        vel: { x: 0, y: 0 },
        size: 0.3 + Math.random() * 1.0,
        hue: 210,
        alpha: 0.2 + Math.random() * 0.4,
        trail: [],
      }))
    }
  }, [rm])

  /* 鼠标 / 触摸 跟踪 */
  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; mouseOn.current = true }
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; mouseOn.current = false }
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        mouseOn.current = true
      }
    }
    const onTouchEnd = () => { mouse.current = { x: -9999, y: -9999 }; mouseOn.current = false }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  /* 渲染 */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rt: ReturnType<typeof setTimeout> | null = null
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth, h = window.innerHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      init(w, h)
    }
    const debounce = () => { if (rt) clearTimeout(rt); rt = setTimeout(resize, 150) }

    resize()
    window.addEventListener('resize', debounce)

    const loop = () => {
      time.current += 0.016
      const t = time.current
      const { w, h } = dims.current
      const mx = mouse.current.x, my = mouse.current.y
      const active = mouseOn.current
      const cx = w / 2, cy = h / 2

      /* ---- 完全清除（保持透明背景） ---- */
      ctx.clearRect(0, 0, w, h)

      /* ---- 星星 ---- */
      for (const s of stars.current) {
        const tw = Math.sin(t * (1.5 + s.size * 2) + s.pos.x * 0.01) * 0.3 + 0.7
        const a = s.alpha * tw * 0.35
        ctx.beginPath()
        ctx.arc(s.pos.x, s.pos.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 200, 255, ${a})`
        ctx.fill()
      }

      /* ---- 更新粒子 ---- */
      for (const p of particles.current) {
        /* 鼠标交互 */
        if (active) {
          const dx = p.pos.x - mx, dy = p.pos.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONFIG.mouseRadius && dist > 0.1) {
            const f = (1 - dist / CONFIG.mouseRadius)
            // 排斥
            const ang = Math.atan2(dy, dx)
            p.vel.x += Math.cos(ang) * f * CONFIG.repelForce * 0.15
            p.vel.y += Math.sin(ang) * f * CONFIG.repelForce * 0.15
            // 漩涡
            p.vel.x += Math.cos(ang + Math.PI / 2) * f * CONFIG.vortexForce * 0.1
            p.vel.y += Math.sin(ang + Math.PI / 2) * f * CONFIG.vortexForce * 0.1
          }
        }

        /* 回归自然环绕运动 */
        const ang2c = Math.atan2(cy - p.pos.y, cx - p.pos.x)
        p.vel.x += Math.cos(ang2c + Math.PI / 2 + Math.sin(p.pos.x * 0.01) * 2) * CONFIG.returnForce
        p.vel.y += Math.sin(ang2c + Math.PI / 2 + Math.sin(p.pos.y * 0.01) * 2) * CONFIG.returnForce

        /* 阻尼 */
        p.vel.x *= 0.98
        p.vel.y *= 0.98

        /* 限速 */
        const spd = Math.sqrt(p.vel.x ** 2 + p.vel.y ** 2)
        if (spd > CONFIG.maxSpeed) {
          p.vel.x = (p.vel.x / spd) * CONFIG.maxSpeed
          p.vel.y = (p.vel.y / spd) * CONFIG.maxSpeed
        }

        /* 位移 */
        p.pos.x += p.vel.x
        p.pos.y += p.vel.y

        /* 边界环绕 */
        const M = 60
        if (p.pos.x < -M) p.pos.x = w + M
        if (p.pos.x > w + M) p.pos.x = -M
        if (p.pos.y < -M) p.pos.y = h + M
        if (p.pos.y > h + M) p.pos.y = -M

        /* 轨迹 */
        p.trail.unshift({ x: p.pos.x, y: p.pos.y })
        if (p.trail.length > CONFIG.trailLen) p.trail.pop()
      }

      /* ---- 绘制连线（先画连线，再画粒子，层次更好） ---- */
      if (!rm) {
        const ps = particles.current
        for (let i = 0; i < ps.length; i++) {
          for (let j = i + 1; j < ps.length; j++) {
            const a = ps[i], b = ps[j]
            const dx = a.pos.x - b.pos.x, dy = a.pos.y - b.pos.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < CONFIG.connectionDist) {
              let brightness = 1
              if (active) {
                const near = Math.abs((a.pos.x + b.pos.x) / 2 - mx) + Math.abs((a.pos.y + b.pos.y) / 2 - my)
                if (near < CONFIG.mouseRadius * 1.5)
                  brightness = 1 + (1 - near / (CONFIG.mouseRadius * 1.5)) * 2.5
              }
              const alpha = (1 - dist / CONFIG.connectionDist) * 0.2 * brightness
              ctx.beginPath()
              ctx.moveTo(a.pos.x, a.pos.y)
              ctx.lineTo(b.pos.x, b.pos.y)
              ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 60%, 65%, ${Math.min(alpha, 0.6)})`
              ctx.lineWidth = 0.6
              ctx.stroke()
            }
          }
        }
      }

      /* ---- 绘制粒子 ---- */
      for (const p of particles.current) {
        /* 轨迹 */
        if (!rm) {
          for (let i = 0; i < p.trail.length; i++) {
            const a = (1 - i / p.trail.length) * p.alpha * 0.2
            const s = p.size * (1 - i / p.trail.length) * 0.5
            ctx.beginPath()
            ctx.arc(p.trail[i].x, p.trail[i].y, s, 0, Math.PI * 2)
            ctx.fillStyle = `hsla(${p.hue + i * 5}, 70%, 70%, ${a})`
            ctx.fill()
          }
        }

        /* 发光光晕 */
        const glow = p.size * 3
        const grad = ctx.createRadialGradient(p.pos.x, p.pos.y, 0, p.pos.x, p.pos.y, glow)
        grad.addColorStop(0, `hsla(${p.hue}, 80%, 80%, ${p.alpha * 0.5})`)
        grad.addColorStop(0.3, `hsla(${p.hue}, 70%, 65%, ${p.alpha * 0.15})`)
        grad.addColorStop(1, `hsla(${p.hue}, 60%, 50%, 0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.pos.x, p.pos.y, glow, 0, Math.PI * 2)
        ctx.fill()

        /* 核心亮点 */
        ctx.beginPath()
        ctx.arc(p.pos.x, p.pos.y, p.size * 0.7, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 100%, 92%, ${p.alpha * 0.9})`
        ctx.fill()
      }

      /* ---- 鼠标周围微光 ---- */
      if (active) {
        const gg = ctx.createRadialGradient(mx, my, 0, mx, my, CONFIG.mouseRadius)
        gg.addColorStop(0, 'rgba(99, 102, 241, 0.05)')
        gg.addColorStop(0.5, 'rgba(99, 102, 241, 0.02)')
        gg.addColorStop(1, 'rgba(99, 102, 241, 0)')
        ctx.fillStyle = gg
        ctx.fillRect(mx - CONFIG.mouseRadius, my - CONFIG.mouseRadius, CONFIG.mouseRadius * 2, CONFIG.mouseRadius * 2)
      }

      animRef.current = requestAnimationFrame(loop)
    }

    animRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', debounce)
      if (rt) clearTimeout(rt)
    }
  }, [init, rm])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none select-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
