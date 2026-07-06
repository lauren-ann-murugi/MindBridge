'use client'

import { useState } from 'react'
import { Send, Loader, Users, Clock } from 'lucide-react'

const GROK_API_URL = process.env.NEXT_PUBLIC_XAI_BASE_URL || process.env.NEXT_PUBLIC_GROQ_BASE_URL || 'https://api.x.ai/v1'

export default function Notifications() {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    target: 'all',
    priority: 'normal',
  })
  const [isSending, setIsSending] = useState(false)
  const [aiDraft, setAiDraft] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const generateAIDraft = async () => {
    setIsSending(true)
    try {
      const token = localStorage.getItem('access_token') || process.env.NEXT_PUBLIC_XAI_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY

      const response = await fetch(`${GROK_API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          model: 'grok-3',
          messages: [
            {
              role: 'system',
              content: 'Write a professional, engaging notification message for students. Be concise and clear.',
            },
            {
              role: 'user',
              content: `Create notification about: "${formData.title}". Keep it under 150 words.`,
            },
          ],
          max_tokens: 200,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setAiDraft(data.choices[0]?.message?.content || '')
        setFormData(prev => ({ ...prev, message: data.choices[0]?.message?.content || '' }))
      }
    } catch (error) {
      console.error('AI draft error:', error)
    } finally {
      setIsSending(false)
    }
  }

  const handleSend = () => {
    if (!formData.title || !formData.message) {
      alert('Please fill in title and message')
      return
    }
    alert(`Notification sent to ${formData.target}!`)
    setFormData({ title: '', message: '', target: 'all', priority: 'normal' })
    setAiDraft('')
  }

  return (
    <div style={{ padding: '32px 28px' }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.25rem', fontWeight: 400, color: '#fff', margin: '0 0 28px' }}>
        Send Notifications
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
        {/* Form */}
        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 6, textTransform: 'uppercase' }}>Notification Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., New Course Available"
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 6, textTransform: 'uppercase' }}>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Notification content..."
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, outline: 'none', minHeight: 120, resize: 'vertical', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 6, textTransform: 'uppercase' }}>Target</label>
              <select
                name="target"
                value={formData.target}
                onChange={handleInputChange}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14 }}
              >
                <option value="all">All Users</option>
                <option value="students">Students Only</option>
                <option value="active">Active Only</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 6, textTransform: 'uppercase' }}>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14 }}
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <button
            onClick={generateAIDraft}
            disabled={isSending || !formData.title}
            style={{ background: 'rgba(99, 102, 241, 0.2)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 8, padding: '10px 16px', color: 'rgba(99, 102, 241, 0.8)', fontSize: 12, cursor: isSending ? 'not-allowed' : 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          >
            {isSending ? <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> : '✨'} Generate with AI
          </button>

          <button
            onClick={handleSend}
            style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          >
            <Send size={16} /> Send Notification
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Users size={14} style={{ color: 'rgba(255,255,255,0.6)' }} />
              <h3 style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#fff' }}>Recipients</h3>
            </div>
            <p style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#fff' }}>2,450</p>
            <p style={{ margin: '4px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>active users</p>
          </div>

          <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Clock size={14} style={{ color: 'rgba(255,255,255,0.6)' }} />
              <h3 style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#fff' }}>Recent</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11 }}>
              <div style={{ color: 'rgba(255,255,255,0.6)' }}>🔔 Course opened</div>
              <div style={{ color: 'rgba(255,255,255,0.4)' }}>2 hours ago</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}