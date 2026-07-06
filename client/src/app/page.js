
'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import './globals.css'; // Ensure this file exists and is imported

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4'

// ── Twinkling star canvas ────────────────────────────────────────────────────
function StarCanvas() {
  const ref = useRef(null)
  
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf
    let stars = []

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      const n = Math.floor((canvas.width * canvas.height) / 4800)
      stars = Array.from({ length: n }, () => ({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        r:  Math.random() * 1.4 + 0.2,
        op: Math.random() * 0.55 + 0.05,
        target: Math.random() * 0.55 + 0.05,
        spd: Math.random() * 0.006 + 0.002,
      }))
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        if (Math.abs(s.op - s.target) < 0.008) s.target = Math.random() * 0.55 + 0.05
        s.op += (s.target - s.op) * s.spd
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${s.op})`
        ctx.fill()
      })
      raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    tick()
    
    return () => { 
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize) 
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
    />
  )
}

// ── Word-by-word animated headline ──────────────────────────────────────────
const HEADLINE_LINES = [
  [
    { text: 'Where ', muted: false },
    { text: 'dreams ', muted: true },
    { text: 'rise', muted: false },
  ],
  [
    { text: 'through ', muted: true },
    { text: 'the ', muted: true },
    { text: 'silence.', muted: true },
  ],
]

const wordVariant = {
  hidden:  { opacity: 0, y: 36, filter: 'blur(10px)', rotateX: -20 },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',  rotateX: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}
const containerVariant = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.4 } },
}

// ── Animated Headline Component ─────────────────────────────────────────────
function AnimatedHeadline() {
  return (
    <motion.h1
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      style={{
        fontFamily: "'Instrument Serif', serif",
        fontSize: 'clamp(3rem, 9.5vw, 7.75rem)',
        lineHeight: 0.93,
        letterSpacing: '-0.025em',
        fontWeight: 400,
        margin: 0,
        perspective: 1200,
      }}
    >
      {HEADLINE_LINES.map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {line.map((w, wi) => (
            <motion.span
              key={wi}
              variants={wordVariant}
              style={{
                display: 'inline-block',
                color: w.muted ? 'hsl(240,4%,66%)' : '#fff',
                transformOrigin: 'bottom center',
              }}
            >
              {w.text}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  )
}

// ── Feature cards ────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>,
    title: 'Neural-Twin Simulations',
    desc:  'Personalized AI mirrors of your learning path, predicting obstacles before you face them.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'Live Study Rooms',
    desc:  'Real-time collaborative environments where shared focus generates exponential progress.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>,
    title: 'Smart Library',
    desc:  'Intelligent synthesis of your academic assets into a living, searchable knowledge graph.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
    title: 'Cognitive Metrics',
    desc:  'Deep-dive tracking of focus and retention to optimize your peak performance hours.',
  },
]

const cardVariant = {
  hidden:  { opacity: 0, y: 48 },
  visible: i => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.11 },
  }),
}

// ── Global Custom Styles ──────────────────────────────────────────────────────
const LIQUID_GLASS_STYLE = {
  background:       'rgba(255,255,255,0.01)',
  backdropFilter:   'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
  boxShadow:        'inset 0 1px 1px rgba(255,255,255,0.10)',
}

// ── Core Landing Module ───────────────────────────────────────────────────────
export default function Landing() {
  const router = useRouter()
  const { scrollY } = useScroll()

  // Scroll-driven transforms
  const videoY   = useTransform(scrollY, [0, 800], ['0%', '30%'])
  const heroOp   = useTransform(scrollY, [0, 450], [1, 0])
  const heroY    = useTransform(scrollY, [0, 450], [0, 50])
  const navBg    = useTransform(scrollY, [0, 80], ['rgba(0,22,44,0)', 'rgba(0,22,44,0.72)'])
  const navBlur  = useTransform(scrollY, [0, 80], [0, 16])

  // Mouse parallax
  const rawX  = useMotionValue(0)
  const rawY  = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 60, damping: 20 })
  const springY = useSpring(rawY, { stiffness: 60, damping: 20 })
  const h1X  = useTransform(springX, v => v * 0.5)
  const h1Y  = useTransform(springY, v => v * 0.3)
  const subX = useTransform(springX, v => v * 0.3)
  const subY = useTransform(springY, v => v * 0.2)

  const handleMouse = useCallback((e) => {
    if (typeof window !== 'undefined') {
      rawX.set((e.clientX / window.innerWidth  - 0.5) * 22)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 22)
    }
  }, [rawX, rawY])

  // Scroll indicator state configuration
  const [showScroll, setShowScroll] = useState(true)
  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setShowScroll(v < 60))
    return () => unsub()
  }, [scrollY])

  // Nav active link state
  const [activeNav, setActiveNav] = useState(0)
  const NAV = [
    { name: 'Home', id: 'home' },
    { name: 'Features', id: 'features' },
    { name: 'Contact', id: 'contact' }
  ]

  // Clipboard Copied State Indicator
  const [copied, setCopied] = useState(false)
  
  const handleCopyPhone = (e) => {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText('0748172516')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleNavClick = (e, index, targetId) => {
    e.preventDefault()
    setActiveNav(index)
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500&display=swap');

        /* ── Liquid glass border trick ── */
        .lg-border::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg,
            rgba(255,255,255,.45) 0%, rgba(255,255,255,.15) 20%,
            rgba(255,255,255,0)  40%, rgba(255,255,255,0)  60%,
            rgba(255,255,255,.15) 80%, rgba(255,255,255,.45) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          pointer-events: none;
        }

        /* ── Scroll line ── */
        @keyframes scroll-line {
          0%    { transform: scaleY(0); transform-origin: top;    opacity: 1; }
          49% { transform: scaleY(1); transform-origin: top;    opacity: 1; }
          50% { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
          100%{ transform: scaleY(0); transform-origin: bottom; opacity: 0.3; }
        }
        .scroll-line { animation: scroll-line 1.8s ease-in-out infinite; }

        /* ── CTA pulse glow ── */
        @keyframes cta-glow {
          0%,100% { box-shadow: 0 0 0   rgba(255,255,255,.0),   inset 0 1px 1px rgba(255,255,255,.10); }
          50%      { box-shadow: 0 0 32px rgba(255,255,255,.10), inset 0 1px 1px rgba(255,255,255,.16); }
        }
        .cta-pulse { animation: cta-glow 3s ease-in-out infinite; }

        /* ── Feature icon spin on hover ── */
        .feat-icon { transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1); }
        .feat-card:hover .feat-icon { transform: rotate(15deg) scale(1.15); }

        /* ── Grain noise overlay ── */
        .grain::after {
          content:'';
          position:absolute; inset:0; z-index:3;
          pointer-events:none;
          opacity:0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
          background-repeat: repeat;
        }
      `}} />

      <div
        onMouseMove={handleMouse}
        style={{ minHeight: '100vh', background: 'hsl(201,100%,13%)', color: '#fff', fontFamily: "'Inter',sans-serif", overflowX: 'hidden' }}
      >
       { /* ══ HERO ══════════════════════════════════════════════════════ */}
        <section id="home" className="grain" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Stars canvas */}
          <StarCanvas />

          {/* Video — parallax via framer-motion */}
          <motion.video
            autoPlay loop muted playsInline
            style={{ position:'absolute', inset:0, width:'100%', height:'90%', objectFit:'cover', zIndex:0, y: videoY }}
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </motion.video>

          {/* Gradient overlay */}
          <div style={{ position:'absolute', inset:0, zIndex:2, background:'linear-gradient(to bottom,rgba(0,22,44,.25) 0%,rgba(0,22,44,.12) 50%,rgba(0,22,44,.65) 100%)' }} />

          {/* ── Navbar ────────────────────────────────────── */}
          <motion.nav
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
              background: navBg,
              backdropFilter: useTransform(navBlur, v => `blur(${v}px)`),
              WebkitBackdropFilter: useTransform(navBlur, v => `blur(${v}px)`),
            }}
          >
            <div style={{ maxWidth:'80rem', margin:'0 auto', padding:'1.6rem 2.5rem', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <motion.div
                initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
                transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
                style={{ fontFamily:"'Instrument Serif',serif", fontSize:'1.25rem', letterSpacing:'.07em', display:'flex', alignItems:'center', gap:'12px', userSelect:'none', cursor: 'pointer' }}
                onClick={(e) => handleNavClick(e, 0, 'home')}
              >
                {/* ── NEW LOGO WRAPPER ── */}
                <div style={{ position: 'relative', width: '150px', height: '90px' }}>
                  <Image 
                    src="/Laura.png" 
                    alt="MindBridge Logo" 
                    fill
                    priority
                    sizes="100px"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                
              </motion.div>

              <motion.div
                initial={{ opacity:0 }} animate={{ opacity:1 }}
                transition={{ duration:0.6, delay:0.2 }}
                style={{ display:'flex', gap:'2.25rem', alignItems:'center' }}
              >
                {NAV.map((link, i) => (
                  <a key={link.name} href={`#${link.id}`} onClick={(e) => handleNavClick(e, i, link.id)}
                    style={{
                      fontSize:'.8125rem', textDecoration:'none', transition:'color .18s',
                      color: activeNav===i ? '#fff' : 'hsl(240,4%,66%)',
                      borderBottom: activeNav===i ? '1px solid rgba(255,255,255,.5)' : 'none',
                      paddingBottom: activeNav===i ? '2px' : '0',
                    }}
                  >
                    {link.name}
                  </a>
                ))}
              </motion.div>

              <motion.button
                initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
                transition={{ duration:0.6, delay:0.15 }}
                whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                className="lg-border cta-pulse"
                style={{ ...LIQUID_GLASS_STYLE, borderRadius:'9999px', padding:'.6rem 1.5rem', fontSize:'.8125rem', color:'#fff', background:'transparent', border:'none', cursor:'pointer', position:'relative', overflow:'hidden', fontFamily:"'Inter',sans-serif" }}
                onClick={() => router.push('/login')}
              >
                Begin Journey
              </motion.button>
            </div>
          </motion.nav>

          {/* ── Hero Copy ─────────────────────────────────── */}
          <motion.div
            style={{ position:'relative', zIndex:10, flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'8rem 1.5rem 11rem', opacity: heroOp, y: heroY }}
          >
            {/* Headline with mouse parallax */}
            <motion.div style={{ x: h1X, y: h1Y }}>
              <AnimatedHeadline />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              style={{ x: subX, y: subY }}
              initial={{ opacity:0, y:28, filter:'blur(8px)' }}
              animate={{ opacity:1, y:0,  filter:'blur(0px)' }}
              transition={{ duration:0.85, ease:[0.16,1,0.3,1], delay:1.0 }}
            >
              <span style={{ color:'hsl(240,4%,66%)', fontSize:'clamp(.9375rem,1.4vw,1.125rem)', maxWidth:'37rem', display:'block', margin:'2.1rem auto 0', lineHeight:1.75 }}>
                A sanctuary for collaborative intelligence. Bridge the gap between deep focus and collective discovery with neural-twin simulations and advanced cognitive tracking.
              </span>
            </motion.p>

            {/* CTA */}
            <motion.button
              initial={{ opacity:0, y:24, filter:'blur(6px)' }}
              animate={{ opacity:1, y:0,  filter:'blur(0px)' }}
              transition={{ duration:0.85, ease:[0.16,1,0.3,1], delay:1.25 }}
              whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
              className="lg-border cta-pulse"
              style={{ ...LIQUID_GLASS_STYLE, marginTop:'3rem', borderRadius:'9999px', padding:'1.2rem 3.75rem', fontSize:'1rem', color:'#fff', background:'transparent', border:'none', cursor:'pointer', position:'relative', overflow:'hidden', fontFamily:"'Inter',sans-serif" }}
              onClick={() => router.push('/login')}
            >
              Begin Journey →
            </motion.button>
          </motion.div>

          {/* ── Scroll indicator ──────────────────────────── */}
          <AnimatePresence>
            {showScroll && (
              <motion.div
                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                transition={{ duration:0.4, delay:1.6 }}
                style={{ position:'absolute', bottom:'2.5rem', left:'50%', transform:'translateX(-50%)', zIndex:20, display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', color:'rgba(255,255,255,.35)', fontSize:'.6875rem', letterSpacing:'.14em', userSelect:'none' }}
              >
                <div className="scroll-line" style={{ width:'1px', height:'44px', background:'linear-gradient(to bottom, transparent, rgba(255,255,255,.45))' }} />
                SCROLL
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ══ FEATURES ══════════════════════════════════════════════════ */}
        <section id="features" style={{ scrollMarginTop: '5rem', padding:'7.5rem 2.5rem 9rem', textAlign:'center', background:'linear-gradient(to bottom,hsl(201,100%,13%) 0%,hsl(201,80%,7%) 100%)' }}>
          <div style={{ maxWidth:'72rem', margin:'0 auto' }}>
            <motion.h2
              initial={{ opacity:0, y:32 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:0.5 }}
              transition={{ duration:0.75, ease:[0.16,1,0.3,1] }}
              style={{ fontFamily:"'Instrument Serif',serif", fontSize:'clamp(2.25rem,5vw,3.75rem)', fontWeight:400, marginBottom:'1rem', letterSpacing:'-.01em' }}
            >
              Designed for Depth
            </motion.h2>
            <motion.p
              initial={{ opacity:0, y:20 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:0.5 }}
              transition={{ duration:0.7, ease:[0.16,1,0.3,1], delay:0.15 }}
              style={{ color:'hsl(240,4%,66%)', fontSize:'1rem', maxWidth:'32rem', margin:'0 auto 4.5rem', lineHeight:1.75 }}
            >
              Explore how MindBridge reshapes the learning experience through cinematic intelligence.
            </motion.p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))', gap:'1rem' }}>
              {FEATURES.map((f, i) => (
                <motion.div
                  key={i} custom={i}
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once:true, amount:0.3 }}
                  whileHover={{ y:-7, transition:{ duration:0.25 } }}
                  className="feat-card lg-border"
                  style={{
                    ...LIQUID_GLASS_STYLE,
                    background:'rgba(255,255,255,0.04)',
                    borderRadius:'1rem', padding:'2rem 1.75rem', textAlign:'left',
                    position:'relative', overflow:'hidden', cursor:'default',
                  }}
                >
                  <div className="feat-icon" style={{ color:'hsl(240,4%,66%)', marginBottom:'1.5rem', opacity:.85 }}>{f.icon}</div>
                  <h3 style={{ fontFamily:"'Instrument Serif',serif", fontSize:'1.3rem', fontWeight:400, color:'#fff', marginBottom:'.8rem', lineHeight:1.25 }}>{f.title}</h3>
                  <p style={{ color:'hsl(240,4%,66%)', fontSize:'.875rem', lineHeight:1.65, margin:0 }}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ ABOUT THE CEO & CREATOR SECTION ══════════════════════════ */}
        <section id="contact" style={{ scrollMarginTop: '5rem', padding: '6rem 2.5rem 8rem', background: 'hsl(201,80%,7%)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: '44rem', margin: '0 auto' }}>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '2.5rem' }}
            >
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: '#fff', letterSpacing: '0.05em', margin: 0, textTransform: 'uppercase' }}>
                THE CEO
              </h2>
              <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', margin: '0.75rem auto 0' }} />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg-border"
              style={{
                ...LIQUID_GLASS_STYLE,
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '1.5rem',
                padding: '3rem 2rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <div style={{ position: 'relative', width: '110px', height: '110px', marginBottom: '1.5rem' }}>
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  padding: '1.5px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
                  zIndex: 2, pointerEvents: 'none',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude', WebkitMaskComposite: 'xor'
                }} />
                
                <div style={{ 
                  width: '100%', height: '100%', borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.05)', overflow: 'hidden',
                  position: 'relative'
                }}>
                  <Image 
                    src="/Ceo.png" 
                    alt="CEO Portrait" 
                    fill
                    priority
                    sizes="110px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>

              <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '2.25rem', fontWeight: 400, margin: '0 0 0.25rem 0', letterSpacing: '0.01em' }}>
                Lauren
              </h3>
              <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 1.5rem 0' }}>
                CEO • Full-Stack Developer • UI/UX Designer
              </p>

              <p style={{ color: 'hsl(240,4%,75%)', fontSize: '0.9375rem', lineHeight: 1.7, maxWidth: '34rem', margin: '0 0 2.5rem 0' }}>
                "Building MindBridge has been a journey of reimagining how humans connect, focus, and grow collectively. My deepest hope is that this platform becomes a true sanctuary for your mind—serving your academic and collaborative endeavors with absolute precision and elegance."
              </p>

              <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2rem' }}>
                
                <a href="mailto:MindBridge2026@gmail.com" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '0.7rem', background: 'rgba(255,255,255,0.01)', transition: 'background 0.2s' }}
                   onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                   onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'rgba(255,255,255,0.4)' }}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>EMAIL CHANNELS</div>
                    <div style={{ fontSize: '0.8125rem', color: '#fff' }}>MindBridge2026@gmail.com</div>
                  </div>
                </a>

                <button onClick={handleCopyPhone} style={{ background: 'rgba(255,255,255,0.01)', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '0.7rem', transition: 'background 0.2s', width: '100%' }}
                   onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                   onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'rgba(255,255,255,0.4)' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.625rem', color: copied ? '#10b981' : 'rgba(255,255,255,0.35)', letterSpacing: '0.05em', fontWeight: copied ? 600 : 400, transition: 'color 0.2s' }}>
                      {copied ? '✓ COPIED TO CLIPBOARD' : 'DIRECT LINE (CLICK TO COPY)'}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: '#fff' }}>0748172516</div>
                  </div>
                </button>

                <a href="https://instagram.com/Mind.Bridge-2026" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '0.7rem', background: 'rgba(255,255,255,0.01)', transition: 'background 0.2s', gridColumn: '1 / -1' }}
                   onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                   onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'rgba(255,255,255,0.4)' }}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/></svg>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>INSTAGRAM profile</div>
                    <div style={{ fontSize: '0.8125rem', color: '#fff' }}>@Mind.Bridge-2026</div>
                  </div>
                </a>

              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ FOOTER ══════════════════════════════════════════════════ */}
        <footer style={{ borderTop:'1px solid rgba(255,255,255,.07)', background:'hsl(201,80%,7%)' }}>
          <div style={{ maxWidth:'72rem', margin:'0 auto', padding:'2rem 2.5rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem', fontSize:'.6875rem', letterSpacing:'.065em', color:'hsl(240,4%,66%)' }}>
            <span>© 2026 MINDBRIDGE. ALL RIGHTS RESERVED.</span>
            <div style={{ display:'flex', gap:'2rem' }}>
              {['PRIVACY POLICY','TERMS OF SERVICE'].map(l => (
                <a key={l} href="#" style={{ color:'hsl(240,4%,66%)', textDecoration:'none', transition:'color .18s' }}
                  onMouseEnter={e=>e.target.style.color='#fff'} onMouseLeave={e=>e.target.style.color='hsl(240,4%,66%)'}
                >{l}</a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}