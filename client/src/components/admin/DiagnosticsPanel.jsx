'use client'

import { Activity, HardDrive, Zap, Network } from 'lucide-react'

export default function DiagnosticsPanel() {
  const diagnostics = [
    { label: 'CPU Usage', value: '32%', icon: Zap, status: 'healthy' },
    { label: 'Memory Usage', value: '67%', icon: HardDrive, status: 'warning' },
    { label: 'Disk Space', value: '45 GB free', icon: HardDrive, status: 'healthy' },
    { label: 'Network Status', value: 'Optimal', icon: Network, status: 'healthy' },
  ]

  return (
    <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <Activity size={16} style={{ color: 'rgba(255,255,255,0.6)' }} />
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#fff' }}>System Diagnostics</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {diagnostics.map((diag, i) => {
          const Icon = diag.icon
          const statusColor = diag.status === 'healthy' ? '#4ade80' : '#ffc107'

          return (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 12, display: 'flex', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={14} style={{ color: statusColor }} />
              </div>
              <div>
                <p style={{ margin: '0 0 2px', fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{diag.label}</p>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#fff' }}>{diag.value}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}