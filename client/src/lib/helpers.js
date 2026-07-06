// 'use client'
// import { useState } from 'react'

// const STATS = [
//   { label: 'Total Users', value: '12,450', change: '+450', icon: '👥', color: '#60a5fa' },
//   { label: 'Active Sessions', value: '3,240', change: '+128', icon: '⚡', color: '#fbbf24' },
//   { label: 'Platform Health', value: '98.5%', change: '+2.1%', icon: '❤️', color: '#4ade80' },
//   { label: 'Avg. Score', value: '7,450 XP', change: '+340', icon: '🏆', color: '#f87171' },
// ]

// const MOCK_USERS = [
//   { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active' },
//   { id: 2, name: 'Sarah L.', email: 'sarah@example.com', role: 'Student', status: 'Active' },
//   { id: 3, name: 'Emma K.', email: 'emma@example.com', role: 'Instructor', status: 'Inactive' },
// ]

// export default function AdminDashboard() {
//   const [selectedTab, setSelectedTab] = useState('overview')

//   return (
//     <div style={{ display: 'flex', minHeight: '100vh', background: '#080808', fontFamily: "'DM Sans',sans-serif" }}>
//       {/* Admin Sidebar */}
//       <aside style={{ position: 'fixed', top: 0, bottom: 0, left: 0, width: 200, background: '#080808', borderRight: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', zIndex: 100 }}>
//         <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
//           <div style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', color: '#fff', lineHeight: 1.2 }}>MindBridge</div>
//           <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>Admin Suite</div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div style={{ marginLeft: 200, flex: 1, display: 'flex', flexDirection: 'column' }}>
//         {/* Topbar */}
//         <header style={{ position: 'fixed', top: 0, right: 0, left: 200, height: 56, background: 'rgba(8,8,8,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16, zIndex: 80 }} />

//         <main style={{ marginTop: 56, flex: 1, padding: '32px 28px', overflow: 'auto' }}>
//           <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.5rem', fontWeight: 400, color: '#fff', margin: '0 0 12px' }}>
//             Admin Dashboard
//           </h1>
//           <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, margin: '0 0 28px' }}>
//             Platform overview and management
//           </p>

//           {/* Stats Grid */}
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 28 }}>
//             {STATS.map(stat => (
//               <div key={stat.label} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20 }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
//                   <div style={{ fontSize: 32 }}>{stat.icon}</div>
//                   <span style={{ fontSize: 11, fontWeight: 600, color: stat.color, background: `${stat.color}20`, padding: '4px 10px', borderRadius: 20 }}>
//                     {stat.change}
//                   </span>
//                 </div>
//                 <h3 style={{ margin: 0, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>
//                   {stat.label}
//                 </h3>
//                 <p style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#fff' }}>{stat.value}</p>
//               </div>
//             ))}
//           </div>

//           {/* Tabs */}
//           <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: 24, paddingBottom: 14 }}>
//             {[['overview', '📊 Overview'], ['users', '👥 Users'], ['content', '📚 Content']].map(([tab, label]) => (
//               <button
//                 key={tab}
//                 onClick={() => setSelectedTab(tab)}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   color: selectedTab === tab ? '#fff' : 'rgba(255,255,255,0.45)',
//                   fontSize: 14,
//                   fontWeight: selectedTab === tab ? 500 : 400,
//                   cursor: 'pointer',
//                   paddingBottom: 14,
//                   borderBottom: selectedTab === tab ? '2px solid #fff' : '2px solid transparent',
//                   transition: 'all 0.15s',
//                 }}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>

//           {/* Users Table */}
//           {selectedTab === 'users' && (
//             <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden' }}>
//               <div style={{ overflowX: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead>
//                     <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
//                       <th style={{ padding: '16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Name</th>
//                       <th style={{ padding: '16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Email</th>
//                       <th style={{ padding: '16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Role</th>
//                       <th style={{ padding: '16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Status</th>
//                       <th style={{ padding: '16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {MOCK_USERS.map(user => (
//                       <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
//                         <td style={{ padding: '16px', fontSize: 13, color: '#fff', fontWeight: 500 }}>{user.name}</td>
//                         <td style={{ padding: '16px', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{user.email}</td>
//                         <td style={{ padding: '16px', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{user.role}</td>
//                         <td style={{ padding: '16px' }}>
//                           <span style={{ fontSize: 11, fontWeight: 600, color: user.status === 'Active' ? '#4ade80' : '#f87171', background: user.status === 'Active' ? '#4ade8020' : '#f8717120', padding: '4px 12px', borderRadius: 20 }}>
//                             {user.status}
//                           </span>
//                         </td>
//                         <td style={{ padding: '16px' }}>
//                           <button style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 6, padding: '6px 12px', color: 'rgba(255,255,255,0.6)', fontSize: 12, cursor: 'pointer' }}>
//                             View
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {selectedTab !== 'users' && (
//             <div style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: 14, padding: 40, textAlign: 'center' }}>
//               <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>📊 {selectedTab === 'overview' ? 'Analytics Dashboard' : 'Content Management'}</p>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   )
// }


import { formatDistanceToNow, format } from 'date-fns'

/* ── Time ── */
export const timeAgo    = (d) => formatDistanceToNow(new Date(d), { addSuffix: true })
export const fmtDate    = (d, fmt = 'MMM d, yyyy') => format(new Date(d), fmt)
export const fmtTime    = (d) => format(new Date(d), 'h:mm a')
export const fmtSeconds = (s) => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`

/* ── Strings ── */
export const initials   = (name = '') => name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
export const truncate   = (str = '', n = 60) => str.length > n ? str.slice(0, n) + '…' : str
export const capitalize = (s = '') => s.charAt(0).toUpperCase() + s.slice(1)

/* ── Numbers ── */
export const fmtXP      = (n) => n >= 1000 ? `${(n/1000).toFixed(1)}k` : String(n)
export const fmtPct     = (n) => `${Math.round(n)}%`
export const clamp      = (val, min, max) => Math.min(Math.max(val, min), max)

/* ── File size ── */
export const fmtSize = (bytes) => {
  if (bytes < 1024)        return `${bytes} B`
  if (bytes < 1024 ** 2)   return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 ** 3)   return `${(bytes / 1024 ** 2).toFixed(1)} MB`
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`
}

/* ── File icon helper ── */
export const fileIcon = (name = '') => {
  const ext = name.split('.').pop().toLowerCase()
  const map = { pdf: '📄', doc: '📝', docx: '📝', ppt: '📊', pptx: '📊', xls: '📈', xlsx: '📈', jpg: '🖼', png: '🖼', mp4: '🎬' }
  return map[ext] || '📎'
}

/* ── Colour avatar ── */
const avatarColors = [
  'bg-purple-800', 'bg-blue-800', 'bg-teal-800', 'bg-indigo-800',
  'bg-rose-800',   'bg-amber-800','bg-emerald-800','bg-cyan-800',
]
export const avatarColor = (name = '') => {
  const idx = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % avatarColors.length
  return avatarColors[idx]
}

/* ── JWT decode (no verify) ── */
export const decodeJWT = (token) => {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
  } catch { return null }
}

/* ── Debounce ── */
export const debounce = (fn, ms = 300) => {
  let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms) }
}

/* ── Deep merge ── */
export const deepMerge = (a, b) => {
  const out = { ...a }
  for (const key in b) {
    out[key] = (b[key] && typeof b[key] === 'object' && !Array.isArray(b[key]))
      ? deepMerge(a[key] || {}, b[key])
      : b[key]
  }
  return out
}