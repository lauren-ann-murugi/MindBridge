'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Zap, Trophy } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import NotificationBell from './NotificationBell'
import { initials, avatarColor } from '@/lib/helpers'
import { ROUTES } from '@/lib/constants'

export default function Topbar({ sidebarWidth = 240 }) {
  const { user } = useAuth()
  const router = useRouter()
  const [query, setQuery] = useState('')

  const streak = user?.streak    || 0
  const level  = user?.level     || 1

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`${ROUTES.LIBRARY}?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <header style={{
      position:'fixed', top:0, right:0,
      left: sidebarWidth,
      height:56,
      background:'rgba(8,8,8,0.9)',
      backdropFilter:'blur(12px)',
      borderBottom:'1px solid rgba(255,255,255,0.07)',
      display:'flex', alignItems:'center',
      padding:'0 24px', gap:16,
      zIndex:80,
      transition:'left 0.25s',
    }}>

      {/* Search */}
      <form onSubmit={handleSearch} style={{ flex:1, maxWidth:380, position:'relative' }}>
        <Search size={14} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'rgba(255,255,255,0.35)', pointerEvents:'none' }}/>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search knowledge base…"
          style={{ width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:8, padding:'7px 12px 7px 34px', color:'#fff', fontSize:'13px', outline:'none', transition:'border-color 0.15s' }}
          onFocus={e => e.target.style.borderColor='rgba(255,255,255,0.25)'}
          onBlur={e  => e.target.style.borderColor='rgba(255,255,255,0.09)'}
        />
      </form>

      {/* Spacer */}
      <div style={{ flex:1 }}/>

      {/* Streak */}
      <div style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 10px', background:'rgba(251,191,36,0.1)', borderRadius:8, border:'1px solid rgba(251,191,36,0.2)' }}>
        <Zap size={13} style={{ color:'#fbbf24' }}/>
        <span style={{ fontSize:'12px', fontWeight:500, color:'#fbbf24', whiteSpace:'nowrap' }}>{streak} Day Streak</span>
      </div>

      {/* Level */}
      <div style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 10px', background:'rgba(255,255,255,0.06)', borderRadius:8 }}>
        <Trophy size={13} style={{ color:'rgba(255,255,255,0.6)' }}/>
        <span style={{ fontSize:'12px', fontWeight:500, color:'rgba(255,255,255,0.8)', whiteSpace:'nowrap' }}>Level {level}</span>
      </div>

      {/* Notifications */}
      <NotificationBell />

      {/* Avatar */}
      <button
        onClick={() => router.push(ROUTES.SETTINGS)}
        style={{ width:32, height:32, borderRadius:'50%', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:600, color:'#fff', background: avatarColor(user?.full_name || ''), flexShrink:0 }}
        title={user?.full_name}
      >
        {initials(user?.full_name || 'U')}
      </button>
    </header>
  )
}