/* ========================================
   🚀 CET Study — 首页 Landing
   粒子背景主视觉 + 品牌 + 功能预览
   ======================================== */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button, GlassCard, Badge } from '@/components'
import { ROUTES, APP_NAME, APP_SLOGAN } from '@/constants'

/* ========== 特性数据 ========== */
const features = [
  {
    icon: '📚',
    title: '智能词库',
    desc: 'CET-4/6 分频词库 · SM-2 遗忘曲线 · 卡片刷词',
    gradient: 'from-primary/20 to-accent/20',
  },
  {
    icon: '🎧',
    title: '听力训练',
    desc: '真题听力 · 逐句精听 · 听写模式 · 变速播放',
    gradient: 'from-secondary/20 to-primary/20',
  },
  {
    icon: '📖',
    title: '阅读精练',
    desc: '选词填空 · 长篇阅读 · 仔细阅读 · 全文翻译',
    gradient: 'from-accent/20 to-secondary/20',
  },
  {
    icon: '📝',
    title: '模拟考试',
    desc: '完整考试流程 · 自动计时 · 智能评分 · 错题分析',
    gradient: 'from-primary/20 to-secondary/20',
  },
]

/* ========== 动画变体 ========== */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  }),
}

/* ========== 打字机效果 Hook ========== */
function useTypewriter(text: string, speed = 60) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const timer = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(timer)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])

  return { displayed, done }
}

/* ========== 计数动画 Hook ========== */
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (now: number) => {
      if (!startTime) startTime = now
      const progress = Math.min((now - startTime) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])

  return count
}

/* ========== 统计项组件 ========== */
function StatItem({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.3 },
    )
    obs.observe(ref)
    return () => obs.disconnect()
  }, [ref])

  const count = useCountUp(value, 2000, inView)

  return (
    <div ref={setRef} className="text-center">
      <p className="text-3xl md:text-4xl font-bold gradient-text tabular-nums">
        {count}{suffix}
      </p>
      <p className="text-sm text-text-tertiary mt-1">{label}</p>
    </div>
  )
}

/* ========== 特性卡片组件 ========== */
function FeatureCard({
  icon, title, desc, gradient, index,
}: typeof features[0] & { index: number }) {
  return (
    <motion.div
      className="group"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      custom={index}
      viewport={{ once: true, margin: '-50px' }}
    >
      <GlassCard variant="default" hover="glow" padding="lg" className="h-full">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <span aria-hidden="true">{icon}</span>
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
      </GlassCard>
    </motion.div>
  )
}

/* ==========================================
   🏠 主页面
   ========================================== */

export default function LandingPage() {
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])
  const { displayed, done } = useTypewriter('大学英语四六级 · 智能学习平台', 55)

  return (
    <div className="relative">
      {/* ========================================
          HERO 区域 — 全屏粒子主视觉
      ======================================== */}
      <motion.section
        className="relative min-h-screen flex flex-col items-center justify-center px-6"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* 品牌徽标 */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl shadow-glow-primary">
              C
            </div>
            <div className="absolute -inset-2 rounded-2xl bg-primary/20 blur-xl animate-glow-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary tracking-tight">{APP_NAME}</h1>
          </div>
        </motion.div>

        {/* 主标题 */}
        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center leading-tight max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="text-text-primary">用</span>{' '}
          <span className="gradient-text">智能科技</span>
          <br />
          <span className="text-text-primary">征服英语四六级</span>
        </motion.h2>

        {/* 打字机副标题 */}
        <motion.div
          className="mt-6 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <p className="text-lg md:text-xl text-text-secondary font-mono">
            {displayed}
            {!done && <span className="animate-pulse text-primary">|</span>}
          </p>
        </motion.div>

        {/* CTA 按钮组 */}
        <motion.div
          className="flex flex-wrap items-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button
            variant="primary"
            size="lg"
            glow
            className="px-8 text-base"
            onClick={() => navigate(ROUTES.DASHBOARD)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
            </svg>
            开始学习
          </Button>
          <Button
            variant="glass"
            size="lg"
            className="px-8 text-base"
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            了解功能
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Button>
        </motion.div>

        {/* 底部滚动提示 */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-xs text-text-tertiary">了解更多</span>
          <motion.div
            className="w-5 h-8 rounded-full border border-border flex justify-center pt-1.5"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ==========================================
          统计区域 — 数据背书
      ========================================== */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <GlassCard variant="elevated" padding="lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <StatItem value={1284} label="收录单词" />
              <StatItem value={47} label="听力真题" />
              <StatItem value={23} label="阅读文章" />
              <StatItem value={92} label="正确率" suffix="%" />
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ==========================================
          功能特性区域
      ========================================== */}
      <section id="features" className="relative px-6 py-10 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge color="primary" size="md" className="mb-4">四大核心模块</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              全方位<span className="gradient-text">备考</span>方案
            </h2>
            <p className="text-text-secondary mt-3 max-w-xl mx-auto">
              从单词到考试，覆盖四六级备考全流程
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          CTA 底部 — 引导进入
      ========================================== */}
      <section className="relative px-6 pb-24">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard variant="glow" padding="lg">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              准备好开始了吗？
            </h2>
            <p className="text-text-secondary mb-6">
              加入数千名备考同学，开启高效学习之旅
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" size="lg" glow onClick={() => navigate(ROUTES.DASHBOARD)}>
                免费开始学习
              </Button>
              <Button variant="ghost" size="lg">
                了解更多
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      {/* ==========================================
          Footer
      ========================================== */}
      <footer className="relative px-6 pb-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />
          <p className="text-xs text-text-tertiary">
            {APP_NAME} · {APP_SLOGAN}
          </p>
        </div>
      </footer>
    </div>
  )
}
