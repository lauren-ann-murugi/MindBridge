'use client'

export default function CognitiveMetrics() {
  const metrics = [
    { label: 'Focus Depth', value: '8.4 / 10', pct: 84 },
    { label: 'Retention Rate', value: '92%', pct: 92 },
  ]

  return (
    <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '20px' }}>
      <span style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
        Cognitive Metrics
      </span>
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {metrics.map(m => (
          <div key={m.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)' }}>{m.label}</span>
              <span style={{ fontSize: '12.5px', fontWeight: 500, color: '#fff' }}>{m.value}</span>
            </div>
            <div style={{ height: 2, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
              <div style={{ height: '100%', width: `${m.pct}%`, background: '#fff', borderRadius: 2, transition: 'width 0.8s ease' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}