'use client'

import { Users, Clock, Play } from 'lucide-react'

const MOCK_SESSIONS = [
  { id: 1, name: 'Web Development 101', instructor: 'Kyle Simpson', capacity: '8/12', duration: '2h', status: 'active' },
  { id: 2, name: 'React Advanced', instructor: 'Dan Abramov', capacity: '5/10', duration: '1.5h', status: 'waiting' },
  { id: 3, name: 'Python Basics', instructor: 'Guido van Rossum', capacity: '10/15', duration: '1h', status: 'active' },
]

export default function ActiveQueues() {
  return (
    <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
      <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#fff' }}>Active Learning Sessions</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {MOCK_SESSIONS.map(session => (
          <div key={session.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 600, color: '#fff' }}>{session.name}</h4>
              <p style={{ margin: '0 0 6px', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{session.instructor}</p>
              <div style={{ display: 'flex', gap: 12, fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Users size={12} />
                  {session.capacity}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={12} />
                  {session.duration}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
              <span style={{ background: session.status === 'active' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(255, 193, 7, 0.15)', color: session.status === 'active' ? '#4ade80' : '#ffc107', padding: '3px 8px', borderRadius: 5, fontSize: 9, fontWeight: 600 }}>
                {session.status}
              </span>
              <button style={{ background: 'rgba(99, 102, 241, 0.2)', border: 'none', borderRadius: 6, padding: '4px 10px', color: 'rgba(99, 102, 241, 0.8)', fontSize: 10, cursor: 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Play size={10} /> Start
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}