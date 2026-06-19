/* ========================================
   🌌 CET Study — Three.js 3D 粒子场景
   严格参照 Signal System 参考实现
   ∞ 粒子流 + Bloom 泛光 + 能量核 + 鼠标/滚动视差
   ======================================== */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    /* ====== 场景 ====== */
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.z = 12

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    /* ====== Bloom 泛光 ====== */
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      2.2,  // strength
      1.2,  // radius
      0.1,  // threshold
    )
    composer.addPass(bloomPass)

    /* ====== 能量核 ====== */
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
    )
    scene.add(core)

    /* 光晕 */
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(3.5, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x6ea8ff, transparent: true, opacity: 0.12 }),
    )
    scene.add(glow)

    /* ====== ∞ 粒子系统 (2500) ====== */
    const COUNT = 2500
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      const t = i * 0.01  // spacing = 0.01 (参考: 0.02 但 2500 粒子需要更多间距)
      // 更新: 用 i * 0.02 匹配参考
      // 实际上参考用了 0.02，但因为只有 2500 个，i*0.02=50 覆盖 ~8 个周期
      // 让我用 i * 0.02
      const ti = i * 0.02
      pos[i * 3]     = Math.sin(ti) * 5
      pos[i * 3 + 1] = Math.sin(ti) * Math.cos(ti) * 3
      pos[i * 3 + 2] = Math.cos(ti) * 2
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))

    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03,
      transparent: true,
      opacity: 0.9,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    /* ====== 鼠标 / 滚动事件 ====== */
    let mouseX = 0, mouseY = 0, scrollY = 0

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onScroll = () => { scrollY = window.scrollY }
    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      composer.setSize(w, h)
    }

    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    /* ====== 动画循环 ====== */
    let time = 0
    let animId: number

    const animate = () => {
      time += 0.01

      /* 能量核呼吸 */
      const s = 1 + Math.sin(time) * 0.08
      core.scale.setScalar(s)
      glow.scale.setScalar(s)

      /* 鼠标视差 (lerp) */
      scene.rotation.x += (mouseY * 0.25 - scene.rotation.x) * 0.05
      scene.rotation.y += (mouseX * 0.3 - scene.rotation.y) * 0.05

      /* 滚动视差 */
      camera.position.y += (-scrollY * 0.0015 - camera.position.y) * 0.1

      /* 更新粒子位置 */
      const p = geo.attributes.position.array as Float32Array
      for (let i = 0; i < COUNT; i++) {
        const t = i * 0.02 + time
        p[i * 3]     = Math.sin(t) * 5
        p[i * 3 + 1] = Math.sin(t) * Math.cos(t) * 3
        p[i * 3 + 2] = Math.cos(t) * 2
      }
      geo.attributes.position.needsUpdate = true

      composer.render()
      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    /* ====== 清理 ====== */
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)

      renderer.dispose()
      composer.renderTarget1.dispose()
      composer.renderTarget2.dispose()
      geo.dispose()
      mat.dispose()

      if (container.contains(renderer.domElement))
        container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none select-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
