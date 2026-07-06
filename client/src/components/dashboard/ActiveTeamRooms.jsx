// "use client"

// import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { ArrowRight } from 'lucide-react'
// import api from '@/services/api'

// export default function ActiveTeamRooms() {
//   const router = useRouter()
//   const [rooms, setRooms] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     let mounted = true
//     const load = async () => {
//       try {
//         const res = await api.get('/team-rooms')
//         if (mounted) setRooms(res.data || [])
//       } catch (err) {
//         console.error('Failed to fetch team rooms', err)
//       } finally {
//         if (mounted) setLoading(false)
//       }
//     }
//     load()
//     return () => { mounted = false }
//   }, [])

//   const MOCK_ROOMS = rooms.length ? rooms.map(r => ({ id: r.id, name: r.name, online: r.member_count || 0, avatars: [] })) : []

//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
//         <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
//           Active Team Rooms
//         </span>
//         <button
//           onClick={() => router.push('/team-rooms')}
//           style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', fontSize: '12.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
//         >
//           View All <ArrowRight size={12} />
//         </button>
//       </div>
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
//         {(loading ? MOCK_ROOMS : MOCK_ROOMS).map(room => (
//           <div
//             key={room.id}
//             onClick={() => router.push('/team-rooms')}
//             style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '20px', cursor: 'pointer', transition: 'all 0.15s' }}
//             onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.background = '#141414'; }}
//             onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = '#111'; }}
//           >
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
//               <div>
//                 <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 500, color: '#fff' }}>{room.name}</h3>
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '11px', color: '#4ade80' }}>
//                 <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
//                 {room.online} Online
//               </div>
//             </div>
//             <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
//               {room.avatars.map(avatar => (
//                 <div key={avatar} style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 600, color: '#fff' }}>
//                   {avatar}
//                 </div>
//               ))}
//               {room.online > room.avatars.length && (
//                 <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>
//                   +{room.online - room.avatars.length}
//                 </div>
//               )}
//             </div>
//             <button
//               onClick={e => { e.stopPropagation(); router.push('/team-rooms'); }}
//               style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 7, padding: '7px', fontSize: '12.5px', cursor: 'pointer', transition: 'all 0.15s' }}
//               onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.13)'}
//               onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
//             >
//               Join Room
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }




"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, MessageSquare } from 'lucide-react'
import api from '@/services/api'
import { ROUTES } from '@/lib/constants'

// Robust structural mock array data injected automatically if network fails
const OFFLINE_FALLBACK_ROOMS = [
  { id: 'mock-1', name: 'Alpha Team Room', member_count: 3, avatars: ['JD', 'AM', 'HK'] },
  { id: 'mock-2', name: 'AI Research Lab', member_count: 5, avatars: ['SK', 'LN'] }
]

export default function ActiveTeamRooms() {
  const router = useRouter()
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasNetworkError, setHasNetworkError] = useState(false)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        setLoading(true)
        const res = await api.get('/team-rooms')
        
        if (res.error) {
          if (mounted) {
            setHasNetworkError(true)
            setRooms([])
          }
        } else if (mounted) {
          setRooms(res.data || [])
          setHasNetworkError(false)
        }
      } catch (err) {
        console.error('Failed to fetch team rooms', err)
        if (mounted) setHasNetworkError(true)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  // Derive display array list cleanly
  const displayRooms = rooms.length > 0 
    ? rooms.map(r => ({ id: r.id, name: r.name, online: r.member_count || 0, avatars: r.avatars || [] }))
    : OFFLINE_FALLBACK_ROOMS

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
            Active Team Rooms
          </span>
          {hasNetworkError && (
            <span style={{ fontSize: '10px', background: 'rgba(239,68,68,0.15)', color: '#f87171', padding: '2px 6px', borderRadius: '4px' }}>
              Offline Mode
            </span>
          )}
        </div>
        <button
          onClick={() => router.push(ROUTES.TEAM_ROOMS)}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', fontSize: '12.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
        >
          View All <ArrowRight size={12} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {loading ? (
          [1, 2].map(n => (
            <div key={n} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, padding: '20px', height: '140px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ width: '60%', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '12px', animation: 'pulse 1.5s infinite' }} />
              <div style={{ width: '40%', height: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }} />
            </div>
          ))
        ) : (
          displayRooms.map(room => (
            <div
              key={room.id}
              onClick={() => router.push(ROUTES.TEAM_ROOMS)}
              style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '20px', cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.background = '#141414'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = '#111'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{ minWidth: 0, flex: 1, paddingRight: 8 }}>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 500, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {room.name}
                  </h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '11px', color: '#4ade80', flexShrink: 0 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
                  {room.online} Online
                </div>
              </div>

              <div style={{ display: 'flex', gap: 4, marginBottom: 14, minHeight: '24px', alignItems: 'center' }}>
                {/* 1. Closed array map explicitly before rendering subsequent sibling properties */}
                {room.avatars.map((avatar, idx) => (
                  <div key={idx} style={{ width: 24, height: 24, borderRadius: '50%', background: '#002244', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 600, color: '#fff' }}>
                    {avatar}
                  </div>
                ))}

                {/* 2. Remainder limits checks now evaluated correctly as standalone sibling elements */}
                {room.online > room.avatars.length && (
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>
                    +{room.online - room.avatars.length}
                  </div>
                )}

                {room.online === 0 && room.avatars.length === 0 && (
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MessageSquare size={11} /> Room quiet
                  </span>
                )}
              </div>

              <button
                onClick={e => { e.stopPropagation(); router.push(ROUTES.TEAM_ROOMS); }}
                style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 7, padding: '7px', fontSize: '12.5px', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.13)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              >
                Join Room
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}