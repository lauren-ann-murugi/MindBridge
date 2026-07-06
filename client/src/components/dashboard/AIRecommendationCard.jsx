'use client'

import { ArrowRight, Brain } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AIRecommendationCard() {
  const router = useRouter()

  return (
    <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: 24, top: 24, opacity: 0.12 }}>
        <Brain size={64} />
      </div>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.07)', padding: '4px 10px', borderRadius: 20, marginBottom: 16, fontWeight: 500 }}>
        AI Recommendation
      </span>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.75rem', fontWeight: 400, color: '#fff', margin: '0 0 8px', maxWidth: 500 }}>
        Based on your last quiz, let's review Recursion in your syllabus.
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 600 }}>
          SL
        </div>
        <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.5)' }}>
          Sarah L. <span style={{ color: 'rgba(255,255,255,0.3)' }}>(Researching)</span>
        </span>
      </div>
      <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.55)', margin: '0 0 20px', maxWidth: 480, lineHeight: 1.6 }}>
        We noticed a slight delay in your response time during the 'Base Case' section. A 15-minute interactive deep-dive is ready for you.
      </p>
      <button
        onClick={() => router.push('/revision')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', transition: 'opacity 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        Launch Adaptive Session <ArrowRight size={14} />
      </button>
    </div>
  )
}