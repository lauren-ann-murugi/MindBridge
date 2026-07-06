'use client'

import { TrendingUp, AlertCircle } from 'lucide-react'

export default function SystemReport({ stats }) {
  const metrics = [
    { label: 'Server Response Time', value: '45ms', status: 'healthy' },
    { label: 'Database Load', value: '62%', status: 'warning' },
    { label: 'Cache Hit Rate', value: '92%', status: 'healthy' },
    { label: 'API Availability', value: '99.8%', status: 'healthy' },
  ]

  return (
    <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <TrendingUp size={16} style={{ color: 'rgba(255,255,255,0.6)' }} />
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#fff' }}>System Health Report</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {metrics.map((metric, i) => (
          <div key={i} style={{ padding: 12, background: 'rgba(255,255,255,0.03)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{metric.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{metric.value}</span>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: metric.status === 'healthy' ? '#4ade80' : '#ffc107' }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, padding: 12, background: 'rgba(255, 193, 7, 0.08)', border: '1px solid rgba(255, 193, 7, 0.2)', borderRadius: 8, display: 'flex', gap: 8 }}>
        <AlertCircle size={14} style={{ color: '#ffc107', flexShrink: 0 }} />
        <p style={{ margin: 0, fontSize: 11, color: 'rgba(255, 193, 7, 0.8)' }}>Database load trending high. Monitor for potential bottlenecks.</p>
      </div>
    </div>
  )
}