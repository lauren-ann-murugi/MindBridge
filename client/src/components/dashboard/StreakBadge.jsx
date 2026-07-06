'use client'

import { Zap } from 'lucide-react'

export default function StreakBadge({ streak = 8 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', background: 'rgba(251,191,36,0.1)', borderRadius: 8, border: '1px solid rgba(251,191,36,0.2)', width: 'fit-content' }}>
      <Zap size={13} style={{ color: '#fbbf24' }} />
      <span style={{ fontSize: '12px', fontWeight: 500, color: '#fbbf24', whiteSpace: 'nowrap' }}>{streak} Day Streak</span>
    </div>
  )
}