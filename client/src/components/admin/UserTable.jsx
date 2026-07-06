'use client'

import { useState } from 'react'
import { Search, Loader, Ban, CheckCircle } from 'lucide-react'

const GROK_API_URL = process.env.NEXT_PUBLIC_XAI_BASE_URL || process.env.NEXT_PUBLIC_GROQ_BASE_URL || 'https://api.x.ai/v1'

export default function UserTable() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah@college.edu', level: 8, xp: 8500, status: 'active', joined: 'Dec 1, 2024' },
    { id: 2, name: 'John Smith', email: 'john@college.edu', level: 5, xp: 5200, status: 'active', joined: 'Dec 15, 2024' },
    { id: 3, name: 'Emma Davis', email: 'emma@college.edu', level: 3, xp: 3100, status: 'inactive', joined: 'Dec 20, 2024' },
    { id: 4, name: 'Alex Chen', email: 'alex@college.edu', level: 10, xp: 12000, status: 'active', joined: 'Nov 30, 2024' },
    { id: 5, name: 'Maria Lopez', email: 'maria@college.edu', level: 6, xp: 6800, status: 'active', joined: 'Jan 5, 2025' },
  ])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [userAnalysis, setUserAnalysis] = useState('')

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const analyzeUserWithAI = async (user) => {
    setIsAnalyzing(true)
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
              content: 'You are an admin analysis AI. Provide brief insights about user activity. Keep under 100 words. Be constructive.',
            },
            {
              role: 'user',
              content: `Analyze student: ${user.name}, Level ${user.level}, ${user.xp} XP, ${user.status} status. Provide admin insights.`,
            },
          ],
          max_tokens: 150,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setUserAnalysis(data.choices[0]?.message?.content || 'Unable to analyze')
      }
    } catch (error) {
      console.error('AI analysis error:', error)
      setUserAnalysis('Analysis unavailable')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const toggleUserStatus = (userId) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    ))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Search */}
      <div style={{ position: 'relative' }}>
        <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search users..."
          style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px 8px 36px', color: '#fff', fontSize: 12, outline: 'none' }}
        />
      </div>

      {/* Table */}
      <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: 12 }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <th style={{ padding: 12, textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Name</th>
                <th style={{ padding: 12, textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Email</th>
                <th style={{ padding: 12, textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Level</th>
                <th style={{ padding: 12, textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>XP</th>
                <th style={{ padding: 12, textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Status</th>
                <th style={{ padding: 12, textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, i) => (
                <tr key={user.id} style={{ borderBottom: i < filteredUsers.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <td style={{ padding: 12, color: '#fff', fontWeight: 500 }}>{user.name}</td>
                  <td style={{ padding: 12, color: 'rgba(255,255,255,0.6)' }}>{user.email}</td>
                  <td style={{ padding: 12, textAlign: 'center', color: '#fff', fontWeight: 600 }}>Lvl {user.level}</td>
                  <td style={{ padding: 12, textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>{user.xp}</td>
                  <td style={{ padding: 12, textAlign: 'center' }}>
                    <span style={{ background: user.status === 'active' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(248, 113, 113, 0.15)', color: user.status === 'active' ? '#4ade80' : '#f87171', padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 600 }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ padding: 12, textAlign: 'center', display: 'flex', gap: 6, justifyContent: 'center' }}>
                    <button
                      onClick={() => {
                        setSelectedUser(user)
                        analyzeUserWithAI(user)
                      }}
                      style={{ background: 'rgba(99, 102, 241, 0.15)', border: 'none', borderRadius: 6, padding: '4px 8px', color: 'rgba(99, 102, 241, 0.8)', fontSize: 10, cursor: 'pointer', fontWeight: 500 }}
                    >
                      Analyze
                    </button>
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      style={{ background: user.status === 'active' ? 'rgba(248, 113, 113, 0.15)' : 'rgba(74, 222, 128, 0.15)', border: 'none', borderRadius: 6, padding: '4px 8px', color: user.status === 'active' ? '#f87171' : '#4ade80', fontSize: 10, cursor: 'pointer', fontWeight: 500 }}
                    >
                      {user.status === 'active' ? 'Ban' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analysis Modal */}
      {selectedUser && (
        <div style={{ background: '#111', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: 12, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#fff' }}>AI Analysis: {selectedUser.name}</h3>
            <button onClick={() => setSelectedUser(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 18 }}>×</button>
          </div>
          {isAnalyzing ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'rgba(255,255,255,0.6)' }}>
              <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: 12 }}>Analyzing user profile...</span>
            </div>
          ) : (
            <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{userAnalysis}</p>
          )}
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}