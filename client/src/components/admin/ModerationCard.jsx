'use client'

import { AlertTriangle, CheckCircle, Flag } from 'lucide-react'

const MOCK_FLAGS = [
  { id: 1, user: 'User comment by John', reason: 'Inappropriate content', severity: 'high', date: 'Jan 10' },
  { id: 2, user: 'Quiz answer from Sarah', reason: 'Potential cheating', severity: 'medium', date: 'Jan 9' },
  { id: 3, user: 'Chat message from Alex', reason: 'Spam', severity: 'low', date: 'Jan 8' },
]

export default function ModerationCard() {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return { bg: 'rgba(248, 113, 113, 0.15)', color: '#f87171' }
      case 'medium':
        return { bg: 'rgba(255, 193, 7, 0.15)', color: '#ffc107' }
      default:
        return { bg: 'rgba(74, 222, 128, 0.15)', color: '#4ade80' }
    }
  }

  return (
    <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <Flag size={16} style={{ color: 'rgba(255,255,255,0.6)' }} />
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#fff' }}>Moderation Queue</h3>
        <span style={{ marginLeft: 'auto', background: 'rgba(248, 113, 113, 0.15)', color: '#f87171', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
          {MOCK_FLAGS.length} pending
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {MOCK_FLAGS.map(flag => {
          const color = getSeverityColor(flag.severity)
          return (
            <div key={flag.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 2px', fontSize: 11, fontWeight: 500, color: '#fff' }}>{flag.user}</p>
                  <p style={{ margin: '0 0 4px', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{flag.reason}</p>
                </div>
                <span style={{ background: color.bg, color: color.color, padding: '2px 6px', borderRadius: 4, fontSize: 9, fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {flag.severity}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={{ flex: 1, background: 'rgba(74, 222, 128, 0.15)', border: 'none', borderRadius: 6, padding: '4px', color: '#4ade80', fontSize: 9, cursor: 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                  <CheckCircle size={10} /> Approve
                </button>
                <button style={{ flex: 1, background: 'rgba(248, 113, 113, 0.15)', border: 'none', borderRadius: 6, padding: '4px', color: '#f87171', fontSize: 9, cursor: 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                  <AlertTriangle size={10} /> Reject
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}