'use client'

import { Wrench, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function RepairWizard() {
  const [step, setStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const steps = [
    { title: 'Database Integrity Check', status: 'completed' },
    { title: 'Cache Validation', status: 'completed' },
    { title: 'Session Cleanup', status: 'running' },
    { title: 'Log Rotation', status: 'pending' },
    { title: 'Performance Optimization', status: 'pending' },
  ]

  const runRepair = () => {
    setIsRunning(true)
    let current = 0
    const interval = setInterval(() => {
      current++
      if (current >= steps.length) {
        clearInterval(interval)
        setIsRunning(false)
      } else {
        setStep(current)
      }
    }, 800)
  }

  return (
    <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <Wrench size={16} style={{ color: 'rgba(255,255,255,0.6)' }} />
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#fff' }}>System Repair Wizard</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: s.status === 'completed' ? 'rgba(74, 222, 128, 0.2)' : s.status === 'running' ? 'rgba(255, 193, 7, 0.2)' : 'rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
            }}>
              {s.status === 'completed' ? <CheckCircle size={14} style={{ color: '#4ade80' }} /> : s.status === 'running' ? '⟳' : i + 1}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 500, color: '#fff' }}>{s.title}</p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: s.status === 'completed' ? '#4ade80' : s.status === 'running' ? '#ffc107' : 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
                {s.status}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={runRepair}
        disabled={isRunning}
        style={{
          width: '100%',
          background: isRunning ? 'rgba(255,255,255,0.1)' : 'rgba(99, 102, 241, 0.2)',
          border: '1px solid ' + (isRunning ? 'rgba(255,255,255,0.1)' : 'rgba(99, 102, 241, 0.3)'),
          borderRadius: 8,
          padding: '10px',
          color: isRunning ? 'rgba(255,255,255,0.4)' : 'rgba(99, 102, 241, 0.8)',
          fontSize: 12,
          cursor: isRunning ? 'not-allowed' : 'pointer',
          fontWeight: 600,
        }}
      >
        {isRunning ? 'Running repair...' : 'Start System Repair'}
      </button>
    </div>
  )
}