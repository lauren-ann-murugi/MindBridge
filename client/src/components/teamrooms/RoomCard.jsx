

// 'use client'

// import { Users, Video, Calendar, ShieldCheck } from 'lucide-react'

// export default function RoomCard({ room, isActive, onClick }) {
//   // Graceful fallback values for standard safety schemas
//   const { 
//     name = "General Briefing", 
//     icon = "♟️", 
//     online = 0, 
//     members = 0,
//     isLiveCallActive = false,
//     startTime = null,
//     topicTags = [],
//     activeParticipantAvatars = [] 
//   } = room || {}

//   return (
//     <button
//       onClick={onClick}
//       style={{
//         width: '100%',
//         background: isActive 
//           ? 'linear-gradient(135deg, #002244 0%, #001122 100%)' 
//           : 'rgba(255, 255, 255, 0.02)',
//         border: isActive 
//           ? '1px solid rgba(0, 102, 204, 0.4)' 
//           : '1px solid rgba(255, 255, 255, 0.05)',
//         borderRadius: 12,
//         padding: '14px 16px',
//         marginBottom: 8,
//         cursor: 'pointer',
//         textAlign: 'left',
//         transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 12,
//         boxShadow: isActive ? '0 4px 20px rgba(0, 34, 68, 0.4)' : 'none',
//         position: 'relative',
//         overflow: 'hidden'
//       }}
//       onMouseEnter={e => {
//         if (!isActive) {
//           e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
//           e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
//         }
//       }}
//       onMouseLeave={e => {
//         if (!isActive) {
//           e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
//           e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
//         } else {
//           e.currentTarget.style.background = 'linear-gradient(135deg, #002244 0%, #001122 100%)'
//           e.currentTarget.style.borderColor = 'rgba(0, 102, 204, 0.4)'
//         }
//       }}
//     >
//       {/* Decorative Branding Line for Active Channel focus */}
//       {isActive && (
//         <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: '#0066cc' }} />
//       )}

//       {/* Top Meta Details Row */}
//       <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', gap: 12 }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
//           <div style={{ 
//             fontSize: '18px', 
//             background: isActive ? 'rgba(0, 102, 204, 0.2)' : 'rgba(255,255,255,0.04)', 
//             padding: '8px', 
//             borderRadius: 8,
//             border: '1px solid rgba(255,255,255,0.05)',
//             flexShrink: 0,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center'
//           }}>
//             {icon}
//           </div>
          
//           <div style={{ minWidth: 0 }}>
//             <h4 style={{ margin: '0 0 2px 0', fontSize: '13.5px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '-0.01em' }}>
//               {name}
//             </h4>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>
//               <Users size={12} style={{ flexShrink: 0 }} />
//               <span>{online} / {members} Active</span>
//             </div>
//           </div>
//         </div>

//         {/* Status Indicators Layer */}
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
//           {isLiveCallActive ? (
//             <div style={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: 4, 
//               background: 'rgba(239, 68, 68, 0.15)', 
//               border: '1px solid rgba(239, 68, 68, 0.25)',
//               padding: '3px 8px', 
//               borderRadius: 6,
//               color: '#ef4444',
//               fontSize: '10px',
//               fontWeight: 600,
//               letterSpacing: '0.05em',
//               textTransform: 'uppercase'
//             }}>
//               <Video size={11} /> LIVE
//             </div>
//           ) : startTime ? (
//             <div style={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: 4, 
//               color: 'rgba(255,255,255,0.4)',
//               fontSize: '11px'
//             }}>
//               <Calendar size={11} />
//               <span>{startTime}</span>
//             </div>
//           ) : null}
//         </div>
//       </div>

//       {/* Dynamic Content Divider Rule */}
//       <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', width: '100%', margin: '2px 0' }} />

//       {/* Bottom Sub-properties Row: Tags & Profile Clusters */}
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 10 }}>
//         {/* Classification Tags Stack */}
//         <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', minWidth: 0 }}>
//           {topicTags.slice(0, 2).map((tag, idx) => (
//             <span 
//               key={idx} 
//               style={{ 
//                 background: 'rgba(255,255,255,0.04)', 
//                 color: 'rgba(255,255,255,0.5)', 
//                 fontSize: '10px', 
//                 padding: '2px 6px', 
//                 borderRadius: 4,
//                 border: '1px solid rgba(255,255,255,0.02)',
//                 whiteSpace: 'nowrap',
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//                 maxWidth: '90px'
//               }}
//             >
//               {tag}
//             </span>
//           ))}
//           {topicTags.length > 2 && (
//             <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', alignSelf: 'center' }}>
//               +{topicTags.length - 2}
//             </span>
//           )}
//         </div>

//         {/* Overlapping Participant Avatar Cluster */}
//         {activeParticipantAvatars.length > 0 && (
//           <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', justifyContent: 'flex-end' }}>
//             {activeParticipantAvatars.slice(0, 3).map((avatarUrl, index) => (
//               <img
//                 key={index}
//                 src={avatarUrl}
//                 alt="Meeting Participant"
//                 style={{
//                   width: 20,
//                   height: 20,
//                   borderRadius: '50%',
//                   border: '2px solid ' + (isActive ? '#001122' : '#141414'),
//                   marginLeft: index === 0 ? 0 : -6,
//                   objectFit: 'cover',
//                   background: '#222'
//                 }}
//                 onError={(e) => {
//                   e.currentTarget.style.display = 'none' // Safely hide dead asset requests
//                 }}
//               />
//             ))}
//             {activeParticipantAvatars.length > 3 && (
//               <div style={{
//                 width: 20,
//                 height: 20,
//                 borderRadius: '50%',
//                 background: 'rgba(255,255,255,0.08)',
//                 border: '2px solid ' + (isActive ? '#001122' : '#141414'),
//                 color: '#fff',
//                 fontSize: '8px',
//                 fontWeight: 600,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 marginLeft: -6,
//                 zIndex: 4
//               }}>
//                 +{activeParticipantAvatars.length - 3}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </button>
//   )
// }




'use client'

import React, { useState } from 'react'
import { Users, Video, Clock, Lock, LogOut, XCircle } from 'lucide-react'

export default function RoomCard({ room, isActive, onClick, onJoinRoom, onLeaveRoom, onUpdateStatus }) {
  const { 
    id,
    courseName = "Introduction to Computer Science", 
    onlineCount = 0, 
    totalMembers = 0,
    isLiveCallActive = false,
    topicTags = [],
    membershipStatus = "none" // "none" | "pending" | "member" | "denied"
  } = room || {}

  const [isProcessing, setIsProcessing] = useState(false)

  // Explicit Admission Flow Engine Simulation
  const handleAdmissionFlow = async (e) => {
    e.stopPropagation()
    
    if (membershipStatus === "pending") {
      alert("Please wait until you are admitted by an instructor.")
      return
    }

    if (membershipStatus === "denied") {
      alert("Admission Denied: You do not have permissions to access this course workspace.")
      return
    }

    if (membershipStatus === "none") {
      setIsProcessing(true)
      // Fire parent callback hook if available to update database/parent state
      if (onJoinRoom) onJoinRoom(id)

      // Alert immediate pending status
      alert("Registration request sent! Please wait until you are admitted.")
      
      if (onUpdateStatus) {
        onUpdateStatus(id, "pending")
      }

      // Simulate real-time automated approval/denial system callback hook after 4 seconds
      setTimeout(() => {
        const isApproved = Math.random() > 0.3 // 70% chance approval simulation
        if (isApproved) {
          alert("Admission Accepted! Taking you to the Chat, Live Studio, and Whiteboard space...")
          if (onUpdateStatus) onUpdateStatus(id, "member")
          if (onClick) onClick(id)
        } else {
          alert("Admission Denied: Access request was rejected by the room administrator.")
          if (onUpdateStatus) onUpdateStatus(id, "denied")
        }
        setIsProcessing(false)
      }, 4000)
    }
  }

  const handleLeaveClick = (e) => {
    e.stopPropagation()
    if (onLeaveRoom) onLeaveRoom(id)
    if (onUpdateStatus) onUpdateStatus(id, "none")
    alert("You have left the workspace. Access to chat, live studios, and whiteboards revoked.")
  }

  const handleCardSelection = (e) => {
    if (membershipStatus === "member") {
      if (onClick) onClick(id)
    } else {
      // If not an admitted member, clicking the entire card triggers the admission engine
      handleAdmissionFlow(e)
    }
  }

  return (
    <div
      onClick={handleCardSelection}
      style={{
        width: '100%',
        background: isActive 
          ? 'linear-gradient(135deg, #002244 0%, #001122 100%)' 
          : 'rgba(255, 255, 255, 0.02)',
        border: isActive 
          ? '1px solid rgba(0, 102, 204, 0.7)' 
          : membershipStatus === 'denied'
          ? '1px solid rgba(239, 68, 68, 0.2)'
          : '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: 12,
        padding: '16px',
        marginBottom: 10,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        boxShadow: isActive ? '0 6px 24px rgba(0, 34, 68, 0.45)' : 'none',
        position: 'relative',
        overflow: 'hidden',
        opacity: membershipStatus === "denied" ? 0.6 : 1
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = isActive 
          ? 'linear-gradient(135deg, #002c5c 0%, #00162e 100%)' 
          : 'rgba(255, 255, 255, 0.05)'
      }}
      onMouseLeave={e => {
        if (!isActive) {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
        } else {
          e.currentTarget.style.background = 'linear-gradient(135deg, #002244 0%, #001122 100%)'
        }
      }}
    >
      {/* Sidebar Accent Indicator for active rooms */}
      {isActive && membershipStatus === "member" && (
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: '#0066cc' }} />
      )}

      {/* Top Section: Course Info & Dynamic Multi-State Gate Button */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', gap: 12 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <h4 style={{ 
            margin: '0 0 6px 0', 
            fontSize: '14.5px', 
            fontWeight: 600, 
            color: '#fff', 
            wordBreak: 'break-word',
            lineHeight: '1.4',
            letterSpacing: '-0.01em' 
          }}>
            {courseName}
          </h4>
          
          {/* Real-time Member Sync Counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.45)', fontSize: '11px' }}>
            <Users size={12} style={{ flexShrink: 0, color: isLiveCallActive && membershipStatus === "member" ? '#ef4444' : 'rgba(255,255,255,0.45)' }} />
            <span style={{ fontWeight: isLiveCallActive && membershipStatus === "member" ? '500' : 'normal', color: isLiveCallActive && membershipStatus === "member" ? '#ef4444' : 'inherit' }}>
              {onlineCount} / {totalMembers} Active
            </span>
          </div>
        </div>

        {/* Dynamic State Control Center Container */}
        <div style={{ flexShrink: 0, paddingTop: 2 }}>
          {membershipStatus === "none" && (
            <button
              onClick={handleAdmissionFlow}
              disabled={isProcessing}
              style={{
                background: isProcessing ? '#1e293b' : '#0066cc',
                color: isProcessing ? 'rgba(255,255,255,0.4)' : '#fff',
                border: 'none',
                padding: '6px 14px',
                borderRadius: 6,
                fontSize: '11px',
                fontWeight: 600,
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <Lock size={11} /> {isProcessing ? "Requesting..." : "Join Room"}
            </button>
          )}

          {membershipStatus === "pending" && (
            <div 
              onClick={handleAdmissionFlow}
              style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '5px 10px', borderRadius: 6, color: '#f59e0b', fontSize: '11px', fontWeight: 500 }}
            >
              <Clock size={12} style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} /> Waiting Admission
            </div>
          )}

          {membershipStatus === "denied" && (
            <div 
              onClick={handleAdmissionFlow}
              style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '5px 10px', borderRadius: 6, color: '#ef4444', fontSize: '11px', fontWeight: 500 }}
            >
              <XCircle size={12} /> Denied Admission
            </div>
          )}

          {membershipStatus === "member" && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {isLiveCallActive && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 4, 
                  background: 'rgba(239, 68, 68, 0.15)', 
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  padding: '4px 8px', 
                  borderRadius: 6,
                  color: '#ef4444',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.03em'
                }}>
                  <Video size={12} /> LIVE STUDIO
                </div>
              )}
              <button
                onClick={handleLeaveClick}
                title="Leave Room & Revoke Access"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
              >
                <LogOut size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Structural Divider Line */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', width: '100%' }} />

      {/* Bottom Sub-properties: Meta Context Tags */}
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', minWidth: 0 }}>
          {membershipStatus === "member" ? (
            topicTags.length > 0 ? (
              topicTags.slice(0, 3).map((tag, idx) => (
                <span 
                  key={idx} 
                  style={{ 
                    background: 'rgba(255,255,255,0.04)', 
                    color: 'rgba(255,255,255,0.45)', 
                    fontSize: '10px', 
                    padding: '3px 7px', 
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.02)'
                  }}
                >
                  {tag}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '11px', color: 'rgba(0, 102, 204, 0.8)', fontWeight: 500 }}>
                Connected to Chat, Live Studio & Whiteboard
              </span>
            )
          ) : (
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>
              {membershipStatus === "denied" 
                ? "Access denied. Contact course instructor." 
                : "Admission required for Chat, Live Studio, and Whiteboard access."
              }
            </span>
          )}
        </div>
      </div>
    </div>
  )
}