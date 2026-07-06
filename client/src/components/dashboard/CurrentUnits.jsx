'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

const MOCK_UNITS = [
  { id: 1, title: 'Web Development', module: 'Module 4: Advanced CSS Layouts', progress: 75 },
  { id: 2, title: 'Database Systems', module: 'Module 2: Relational Schema', progress: 42 },
]

function CircleProgress({ pct, size = 52 }) {
  const r = 20
  const c = 2 * Math.PI * r
  const dash = c * (pct / 100)

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
      <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
      <circle
        cx="24"
        cy="24"
        r={r}
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeDasharray={`${dash} ${c}`}
        strokeLinecap="round"
        transform="rotate(-90 24 24)"
        style={{ transition: 'stroke-dasharray 0.8s ease' }}
      />
      <text x="24" y="28" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="'DM Sans',sans-serif" fontWeight="500">
        {pct}%
      </text>
    </svg>
  )
}

export default function CurrentUnits() {
  const router = useRouter()

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
          Current Units
        </span>
        <button
          onClick={() => router.push('/courses')}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', fontSize: '12.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
        >
          View All <ArrowRight size={12} />
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {MOCK_UNITS.map(u => (
          <div
            key={u.id}
            onClick={() => router.push('/courses')}
            style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '20px', cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.background = '#141414'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = '#111'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#fff' }}>{u.title}</h3>
              </div>
              <CircleProgress pct={u.progress} />
            </div>
            <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>{u.module}</p>
          </div>
        ))}
      </div>
    </div>
  )
}