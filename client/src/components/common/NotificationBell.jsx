// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import { Bell, X, Check } from 'lucide-react'
// import { useNotifications } from '@/context/NotificationContext'
// import { timeAgo } from '@/lib/helpers'

// export default function NotificationBell() {
//   const { notifications = [], unreadCount = 0, markAllRead, markRead, dismiss } = useNotifications() || {}
//   const [open, setOpen] = useState(false)
//   const ref = useRef(null)

//   /* Close on outside click */
//   useEffect(() => {
//     const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
//     document.addEventListener('mousedown', handler)
//     return () => document.removeEventListener('mousedown', handler)
//   }, [])

//   return (
//     <div ref={ref} style={{ position: 'relative' }}>
//       <button
//         onClick={() => setOpen(o => !o)}
//         style={{ position:'relative', background:'transparent', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.6)', padding:'6px', borderRadius:'8px', transition:'color 0.15s', display:'flex', alignItems:'center' }}
//         onMouseEnter={e => e.currentTarget.style.color='#fff'}
//         onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.6)'}
//       >
//         <Bell size={18} />
//         {unreadCount > 0 && (
//           <span style={{ position:'absolute', top:2, right:2, width:14, height:14, background:'#f87171', borderRadius:'50%', fontSize:'9px', fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff' }}>
//             {unreadCount > 9 ? '9+' : unreadCount}
//           </span>
//         )}
//       </button>

//       {open && (
//         <div style={{
//           position:'absolute', right:0, top:'calc(100% + 10px)',
//           width:320, maxHeight:420, overflowY:'auto',
//           background:'#141414', border:'1px solid rgba(255,255,255,0.1)',
//           borderRadius:'12px', boxShadow:'0 20px 60px rgba(0,0,0,0.6)',
//           zIndex:999,
//         }}>
//           {/* Header */}
//           <div style={{ padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.07)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
//             <span style={{ fontSize:'13px', fontWeight:500 }}>Notifications</span>
//             {unreadCount > 0 && (
//               <button onClick={markAllRead} style={{ fontSize:'11px', color:'rgba(255,255,255,0.45)', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
//                 <Check size={12} /> Mark all read
//               </button>
//             )}
//           </div>

//           {/* List */}
//           {notifications.length === 0 ? (
//             <div style={{ padding:'32px 16px', textAlign:'center', color:'rgba(255,255,255,0.35)', fontSize:'13px' }}>No notifications</div>
//           ) : (
//             notifications.slice(0, 20).map(n => (
//               <div key={n.id} onClick={() => markRead && markRead(n.id)}
//                 style={{ padding:'12px 16px', borderBottom:'1px solid rgba(255,255,255,0.05)', display:'flex', gap:'10px', alignItems:'flex-start', background: n.read ? 'transparent' : 'rgba(255,255,255,0.02)', cursor:'pointer', transition:'background 0.15s' }}
//                 onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.04)'}
//                 onMouseLeave={e => e.currentTarget.style.background= n.read ? 'transparent':'rgba(255,255,255,0.02)'}
//               >
//                 {!n.read && <div style={{ width:6, height:6, borderRadius:'50%', background:'#4ade80', marginTop:5, flexShrink:0 }} />}
//                 <div style={{ flex:1, minWidth:0 }}>
//                   <p style={{ margin:0, fontSize:'12.5px', color: n.read ? 'rgba(255,255,255,0.55)':'#fff', lineHeight:1.4 }}>{n.message}</p>
//                   <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)', marginTop:3, display:'block' }}>{timeAgo(n.created_at)}</span>
//                 </div>
//                 <button onClick={e => { e.stopPropagation(); dismiss && dismiss(n.id) }}
//                   style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.3)', padding:2, flexShrink:0 }}>
//                   <X size={12} />
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   )
// }





'use client'

import { useState, useRef, useEffect } from 'react'
import { Bell, X, Check } from 'lucide-react'
import { useNotification } from '@/context/NotificationContext' // Fixed: pointing to useNotification
import { timeAgo } from '@/lib/helpers'

export default function NotificationBell() {
  // Corrected destructured assignments matching the Context keys safely
  const { notifications = [], unreadCount = 0, markAllRead, markRead, dismiss } = useNotification() || {}
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  /* Close on outside click */
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ position:'relative', background:'transparent', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.6)', padding:'6px', borderRadius:'8px', transition:'color 0.15s', display:'flex', alignItems:'center' }}
        onMouseEnter={e => e.currentTarget.style.color='#fff'}
        onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.6)'}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span style={{ position:'absolute', top:2, right:2, width:14, height:14, background:'#f87171', borderRadius:'50%', fontSize:'9px', fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff' }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div style={{
          position:'absolute', right:0, top:'calc(100% + 10px)',
          width:320, maxHeight:420, overflowY:'auto',
          background:'#141414', border:'1px solid rgba(255,255,255,0.1)',
          borderRadius:'12px', boxShadow:'0 20px 60px rgba(0,0,0,0.6)',
          zIndex:999,
        }}>
          {/* Header */}
          <div style={{ padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.07)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:'13px', fontWeight:500, color:'#fff' }}>Notifications</span>
            {unreadCount > 0 && (
              <button onClick={markAllRead} style={{ fontSize:'11px', color:'rgba(255,255,255,0.45)', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
                <Check size={12} /> Mark all read
              </button>
            )}
          </div>

          {/* List Item Queue Render */}
          {notifications.length === 0 ? (
            <div style={{ padding:'32px 16px', textAlign:'center', color:'rgba(255,255,255,0.35)', fontSize:'13px' }}>No notifications</div>
          ) : (
            notifications.slice(0, 20).map(n => (
              <div key={n.id} onClick={() => markRead && markRead(n.id)}
                style={{ padding:'12px 16px', borderBottom:'1px solid rgba(255,255,255,0.05)', display:'flex', gap:'10px', alignItems:'flex-start', background: n.read ? 'transparent' : 'rgba(255,255,255,0.02)', cursor:'pointer', transition:'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background= n.read ? 'transparent':'rgba(255,255,255,0.02)'}
              >
                {!n.read && <div style={{ width:6, height:6, borderRadius:'50%', background:'#4ade80', marginTop:5, flexShrink:0 }} />}
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ margin:0, fontSize:'12.5px', color: n.read ? 'rgba(255,255,255,0.55)':'#fff', lineHeight:1.4 }}>{n.message}</p>
                  <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)', marginTop:3, display:'block' }}>{timeAgo(n.created_at)}</span>
                </div>
                <button onClick={e => { e.stopPropagation(); dismiss && dismiss(n.id) }}
                  style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.3)', padding:2, flexShrink:0 }}>
                  <X size={12} />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}