'use client'

import { useState, useEffect } from 'react'
import { BarChart3, Users, TrendingUp, Zap, ArrowUp, ArrowDown } from 'lucide-react'

const GROK_API_URL = process.env.NEXT_PUBLIC_XAI_BASE_URL || process.env.NEXT_PUBLIC_GROQ_BASE_URL || 'https://api.x.ai/v1'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 2450,
    activeSessions: 156,
    platformHealth: 98,
    avgScore: 7250,
  })
  const [trends, setTrends] = useState({
    users: 12,
    sessions: 8,
    engagement: 15,
  })
  const [users, setUsers] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah@college.edu', status: 'active', level: 8 },
    { id: 2, name: 'John Smith', email: 'john@college.edu', status: 'active', level: 5 },
    { id: 3, name: 'Emma Davis', email: 'emma@college.edu', status: 'inactive', level: 3 },
    { id: 4, name: 'Alex Chen', email: 'alex@college.edu', status: 'active', level: 10 },
    { id: 5, name: 'Maria Lopez', email: 'maria@college.edu', status: 'active', level: 6 },
  ])

  useEffect(() => {
    getAIInsights()
  }, [])

  const getAIInsights = async () => {
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
              content: 'You are an admin insights AI. Provide brief, actionable insights about platform health. Keep response under 150 words.',
            },
            {
              role: 'user',
              content: 'Platform has 2450 users, 156 active sessions, 98% health. Give insights.',
            },
          ],
          max_tokens: 150,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('AI Insights:', data.choices[0]?.message?.content)
      }
    } catch (error) {
      console.error('AI insights error:', error)
    }
  }

  return (
    <div style={{ padding: '32px 28px' }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.25rem', fontWeight: 400, color: '#fff', margin: '0 0 28px' }}>
        Admin Dashboard
      </h1>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total Users', value: stats.totalUsers, trend: trends.users, icon: '👥' },
          { label: 'Active Sessions', value: stats.activeSessions, trend: trends.sessions, icon: '⚡' },
          { label: 'Platform Health', value: `${stats.platformHealth}%`, trend: -2, icon: '💚' },
          { label: 'Avg Score', value: stats.avgScore, trend: trends.engagement, icon: '📊' },
        ].map((stat, i) => (
          <div key={i} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{stat.label}</p>
                <p style={{ margin: '6px 0 0', fontSize: 24, fontWeight: 700, color: '#fff' }}>{stat.value}</p>
              </div>
              <div style={{ fontSize: 24 }}>{stat.icon}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: stat.trend > 0 ? '#4ade80' : '#f87171' }}>
              {stat.trend > 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
              <span style={{ fontSize: 12, fontWeight: 500 }}>{Math.abs(stat.trend)}% vs last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 20, marginBottom: 28 }}>
        <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#fff' }}>Recent Users</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <th style={{ padding: '12px 0', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Name</th>
                <th style={{ padding: '12px 0', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Email</th>
                <th style={{ padding: '12px 0', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '12px 0', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Level</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 0', color: '#fff', fontWeight: 500 }}>{user.name}</td>
                  <td style={{ padding: '12px 0', color: 'rgba(255,255,255,0.6)' }}>{user.email}</td>
                  <td style={{ padding: '12px 0' }}>
                    <span style={{ background: user.status === 'active' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255,255,255,0.08)', color: user.status === 'active' ? '#4ade80' : 'rgba(255,255,255,0.6)', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 500 }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 0', color: '#fff', fontWeight: 600 }}>Lvl {user.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {[
          { title: 'User Growth', icon: '📈' },
          { title: 'Engagement Rate', icon: '📊' },
        ].map((chart, i) => (
          <div key={i} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>{chart.icon}</div>
            <h3 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 600, color: '#fff' }}>{chart.title}</h3>
            <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Chart visualization</p>
          </div>
        ))}
      </div>
    </div>
  )
}