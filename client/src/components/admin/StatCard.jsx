'use client'

import { ArrowUp, ArrowDown } from 'lucide-react'

export default function StatCard({ label, value, trend, icon, color = '#fff' }) {
  const isPositive = trend >= 0

  return (
    <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {label}
          </p>
          <p style={{ margin: '8px 0 0', fontSize: 28, fontWeight: 700, color: color }}>
            {value}
          </p>
        </div>
        {icon && <div style={{ fontSize: 28 }}>{icon}</div>}
      </div>
      
      {trend !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: isPositive ? '#4ade80' : '#f87171' }}>
          {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
          <span style={{ fontSize: 11, fontWeight: 500 }}>
            {Math.abs(trend)}% {isPositive ? 'increase' : 'decrease'} this week
          </span>
        </div>
      )}
    </div>
  )
}