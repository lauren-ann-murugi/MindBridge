// 'use client'

// import { useState, useEffect } from 'react'
// import { Users, LogOut, Phone, Video } from 'lucide-react'
// import ChatPanel from '@/components/teamrooms/ChatPanel'
// import Whiteboard from '@/components/teamrooms/Whiteboard'
// import LiveSession from '@/components/teamrooms/LiveSession'
// import RoomCard from '@/components/teamrooms/RoomCard'
// import MindBridgeSuggestion from '@/components/teamrooms/MindBridgeSuggestion'
// import TypingIndicator from '@/components/teamrooms/TypingIndicator'

// const MOCK_ROOMS = [
//   { id: 1, name: 'Web Development Masters', members: 12, online: 8, icon: '🌐' },
//   { id: 2, name: 'Advanced Algorithms', members: 6, online: 4, icon: '🔢' },
//   { id: 3, name: 'Database Design', members: 9, online: 5, icon: '🗄️' },
//   { id: 4, name: 'Python Fundamentals', members: 15, online: 10, icon: '🐍' },
// ]

// const MOCK_PARTICIPANTS = [
//   { id: 1, name: 'Sarah L.', initials: 'SL', online: true },
//   { id: 2, name: 'John M.', initials: 'JM', online: true },
//   { id: 3, name: 'Emma K.', initials: 'EK', online: false },
//   { id: 4, name: 'Alex R.', initials: 'AR', online: true },
// ]

// export default function TeamRooms() {
//   const [activeRoom, setActiveRoom] = useState(MOCK_ROOMS[0])
//   const [showWhiteboard, setShowWhiteboard] = useState(false)
//   const [someoneTyping, setSomeoneTyping] = useState(false)

//   useEffect(() => {
//     const typingTimer = setTimeout(() => {
//       setSomeoneTyping(true)
//     }, 2000)

//     return () => clearTimeout(typingTimer)
//   }, [])

//   return (
//     <div style={{ padding: '32px 28px', display: 'grid', gridTemplateColumns: '260px 1fr 280px', gap: 24, minHeight: 'calc(100vh - 56px)' }}>

//       {/* Left Sidebar - Rooms List */}
//       <div style={{ display: 'flex', flexDirection: 'column', background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden' }}>
//         <div style={{ padding: 16, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
//           <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>TEAM ROOMS</h2>
//         </div>
//         <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
//           {MOCK_ROOMS.map(room => (
//             <RoomCard
//               key={room.id}
//               room={room}
//               isActive={activeRoom.id === room.id}
//               onClick={() => setActiveRoom(room)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Center - Chat & Whiteboard */}
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//         <ChatPanel roomName={activeRoom.name} roomId={activeRoom.id} />
        
//         {showWhiteboard ? (
//           <Whiteboard />
//         ) : (
//           <div style={{ background: '#111', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', padding: 16, minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
//             onClick={() => setShowWhiteboard(true)}
//           >
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ fontSize: 40, marginBottom: 10 }}>✏️</div>
//               <p style={{ margin: '0 0 4px', color: '#fff', fontSize: 14, fontWeight: 500 }}>Click to open Whiteboard</p>
//               <p style={{ margin: 0, color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Collaborate and sketch together</p>
//             </div>
//           </div>
//         )}

//         {showWhiteboard && (
//           <button
//             onClick={() => setShowWhiteboard(false)}
//             style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8, padding: '10px', color: 'rgba(255,255,255,0.6)', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}
//           >
//             Close Whiteboard
//           </button>
//         )}
//       </div>

//       {/* Right Sidebar - Participants & Info */}
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//         {/* Live Session */}
//         <LiveSession />

//         {/* Participants */}
//         <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
//             <Users size={16} style={{ color: 'rgba(255,255,255,0.6)' }} />
//             <h3 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#fff' }}>Participants ({activeRoom.online})</h3>
//           </div>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//             {MOCK_PARTICIPANTS.map(p => (
//               <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
//                 <div style={{ position: 'relative' }}>
//                   <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: '#fff' }}>
//                     {p.initials}
//                   </div>
//                   {p.online && (
//                     <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: '#4ade80', border: '2px solid #111' }} />
//                   )}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <p style={{ margin: 0, fontSize: 12, fontWeight: 500, color: '#fff' }}>{p.name}</p>
//                   <p style={{ margin: 0, fontSize: 11, color: p.online ? '#4ade80' : 'rgba(255,255,255,0.3)' }}>
//                     {p.online ? 'Online' : 'Away'}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* AI Suggestion */}
//         <MindBridgeSuggestion
//           suggestion={{
//             title: 'Learning Tip',
//             text: 'Use the whiteboard to visualize your ideas. Visual explanations help group understanding!',
//           }}
//         />

//         {/* Room Info */}
//         <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: 14, padding: 14 }}>
//           <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Room Info</p>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.6)' }}>
//               <span>Topic:</span>
//               <span style={{ color: '#fff', fontWeight: 500 }}>Web Development</span>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.6)' }}>
//               <span>Instructor:</span>
//               <span style={{ color: '#fff', fontWeight: 500 }}>Kyle Simpson</span>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.6)' }}>
//               <span>Session:</span>
//               <span style={{ color: '#fff', fontWeight: 500 }}>Active Now</span>
//             </div>
//           </div>
//         </div>

//         {/* Leave Room */}
//         <button
//           style={{
//             width: '100%',
//             background: 'rgba(248, 113, 113, 0.1)',
//             border: '1px solid rgba(248, 113, 113, 0.2)',
//             borderRadius: 8,
//             padding: '12px',
//             color: 'rgba(248, 113, 113, 0.8)',
//             fontSize: 12,
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: 6,
//             transition: 'all 0.15s',
//             fontWeight: 500,
//           }}
//           onMouseEnter={e => {
//             e.currentTarget.style.background = 'rgba(248, 113, 113, 0.2)'
//           }}
//           onMouseLeave={e => {
//             e.currentTarget.style.background = 'rgba(248, 113, 113, 0.1)'
//           }}
//         >
//           <LogOut size={14} /> Leave Room
//         </button>
//       </div>

//       {/* Typing Indicator - Floating */}
//       {someoneTyping && (
//         <div style={{ position: 'fixed', bottom: 20, left: 280, padding: '0 20px' }}>
//           <TypingIndicator author="Emma K." />
//         </div>
//       )}
//     </div>
//   )
// }




'use client'

import { useState, useEffect } from 'react'
import { Users, LogOut, ShieldAlert } from 'lucide-react'
import ChatPanel from '@/components/teamrooms/ChatPanel'
import Whiteboard from '@/components/teamrooms/Whiteboard'
import LiveSession from '@/components/teamrooms/LiveSession'
import RoomCard from '@/components/teamrooms/RoomCard'
import MindBridgeSuggestion from '@/components/teamrooms/MindBridgeSuggestion'
import TypingIndicator from '@/components/teamrooms/TypingIndicator'

const MOCK_ROOMS = [
  { id: 1, name: 'Web Development Masters', members: 12, online: 8, icon: '🌐' },
  { id: 2, name: 'Advanced Algorithms', members: 6, online: 4, icon: '🔢' },
  { id: 3, name: 'Database Design', members: 9, online: 5, icon: '🗄️' },
  { id: 4, name: 'Python Fundamentals', members: 15, online: 10, icon: '🐍' },
]

const MOCK_PARTICIPANTS = [
  { id: 1, name: 'Sarah L.', initials: 'SL', online: true },
  { id: 2, name: 'John M.', initials: 'JM', online: true },
  { id: 3, name: 'Emma K.', initials: 'EK', online: false },
  { id: 4, name: 'Alex R.', initials: 'AR', online: true },
]

export default function TeamRooms() {
  // Start with the first room default selected, allow null states upon leaving
  const [activeRoom, setActiveRoom] = useState(MOCK_ROOMS[0])
  const [showWhiteboard, setShowWhiteboard] = useState(false)
  const [someoneTyping, setSomeoneTyping] = useState(false)

  useEffect(() => {
    // Only fire simulation timers if an active node is currently set
    if (!activeRoom) {
      setSomeoneTyping(false)
      return
    }

    const typingTimer = setTimeout(() => {
      setSomeoneTyping(true)
    }, 2000)

    return () => clearTimeout(typingTimer)
  }, [activeRoom?.id]) // <-- FIXED: Tracking the primitive ID prevents shape mismatch errors when activeRoom becomes null

  const handleLeaveRoom = () => {
    setActiveRoom(null)
    setShowWhiteboard(false)
  }

  return (
    <div style={{ padding: '32px 28px', display: 'grid', gridTemplateColumns: '260px 1fr 280px', gap: 24, minHeight: 'calc(100vh - 56px)' }}>

      {/* Left Sidebar - Rooms List (Always Interactive) */}
      <div style={{ display: 'flex', flexDirection: 'column', background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: 16, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <h2 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>TEAM ROOMS</h2>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
          {MOCK_ROOMS.map(room => (
            <RoomCard
              key={room.id}
              room={room}
              isActive={activeRoom?.id === room.id}
              onClick={() => setActiveRoom(room)}
            />
          ))}
        </div>
      </div>

      {/* Conditional Layout Routing Module Based on Active State */}
      {!activeRoom ? (
        <>
          {/* Unjoined Hub Centerpiece View State Layout */}
          <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', borderRadius: 14, border: '1px solid rgba(255,255,255,0.03)', padding: 40 }}>
            <div style={{ textAlign: 'center', maxWidth: 400 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#818cf8' }}>
                <ShieldAlert size={28} />
              </div>
              <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 600, color: '#fff' }}>No Active Workspace Session</h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                You have disconnected from the studio ecosystem channels. Select an entry array from the left navigation panel to synchronize metrics and join your collaborative team.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Center Column - Active Chat & Whiteboard Matrix */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ChatPanel roomName={activeRoom.name} roomId={activeRoom.id} />
            
            {showWhiteboard ? (
              <Whiteboard />
            ) : (
              <div style={{ background: '#111', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', padding: 16, minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                onClick={() => setShowWhiteboard(true)}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>✏️</div>
                  <p style={{ margin: '0 0 4px', color: '#fff', fontSize: 13, fontWeight: 500 }}>Open Project Canvas</p>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Collaborate and sketch architectural traces</p>
                </div>
              </div>
            )}

            {showWhiteboard && (
              <button
                onClick={() => setShowWhiteboard(false)}
                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 8, padding: '10px', color: 'rgba(255,255,255,0.5)', fontSize: 11, cursor: 'pointer', fontWeight: 500 }}
              >
                Collapse Canvas Engine
              </button>
            )}
          </div>

          {/* Right Sidebar - Participants & Context Analytics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <LiveSession />

            {/* Live Participants Grid */}
            <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <Users size={15} style={{ color: 'rgba(255,255,255,0.5)' }} />
                <h3 style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#fff' }}>Participants ({activeRoom.online})</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {MOCK_PARTICIPANTS.map(p => (
                  <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.03)' }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#fff' }}>
                        {p.initials}
                      </div>
                      {p.online && (
                        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, borderRadius: '50%', background: '#4ade80', border: '2px solid #111' }} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: 12, fontWeight: 500, color: '#fff' }}>{p.name}</p>
                      <p style={{ margin: 0, fontSize: 10, color: p.online ? '#4ade80' : 'rgba(255,255,255,0.3)' }}>
                        {p.online ? 'Online' : 'Away'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <MindBridgeSuggestion
              suggestion={{
                title: 'Learning Hint',
                text: 'Map visual concept branches on the whiteboard workspace to align collaborative workflows structural logic pathways.',
              }}
            />

            {/* Room Analytics Strip */}
            <div style={{ background: 'rgba(0, 34, 68, 0.4)', border: '1px solid rgba(99, 102, 241, 0.15)', borderRadius: 14, padding: 14 }}>
              <p style={{ margin: '0 0 10px', fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Room Manifest</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 11 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.5)' }}>
                  <span>Topic:</span>
                  <span style={{ color: '#fff', fontWeight: 500 }}>Web Engineering</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.5)' }}>
                  <span>Status:</span>
                  <span style={{ color: '#4ade80', fontWeight: 500 }}>Connected Stream</span>
                </div>
              </div>
            </div>

            {/* Action Trigger - Terminate Connection */}
            <button
              onClick={handleLeaveRoom}
              style={{
                width: '100%',
                background: 'rgba(248, 113, 113, 0.06)',
                border: '1px solid rgba(248, 113, 113, 0.15)',
                borderRadius: 8,
                padding: '11px',
                color: 'rgba(248, 113, 113, 0.8)',
                fontSize: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                transition: 'all 0.15s ease',
                fontWeight: 600,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248, 113, 113, 0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(248, 113, 113, 0.06)' }}
            >
              <LogOut size={13} /> Leave Room
            </button>
          </div>
        </>
      )}

      {/* Floating System Real-time Input Monitor Stack */}
      {someoneTyping && activeRoom && (
        <div style={{ position: 'fixed', bottom: 24, left: 300, zIndex: 100 }}>
          <TypingIndicator author="Emma K." />
        </div>
      )}
    </div>
  )
}