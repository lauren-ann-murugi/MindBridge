// 'use client'

// export default function TypingIndicator({ author = 'Someone' }) {
//   return (
//     <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '8px 0' }}>
//       <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', animation: 'bounce 1.4s infinite' }} />
//       <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', animation: 'bounce 1.4s infinite 0.2s' }} />
//       <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', animation: 'bounce 1.4s infinite 0.4s' }} />
//       <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginLeft: 8 }}>
//         {author} is typing...
//       </span>
//       <style>{`
//         @keyframes bounce {
//           0%, 80%, 100% { transform: translateY(0); }
//           40% { transform: translateY(-8px); }
//         }
//       `}</style>
//     </div>
//   )
// }


'use client'

import React from 'react'

export default function TypingIndicator({ author = '' }) {
  // Clean up the string and determine the exact text to display
  const trimmedAuthor = typeof author === 'string' ? author.trim() : ''
  
  // If no author is provided, look generic but correct, otherwise target the exact user
  const displayName = trimmedAuthor || 'Someone'
  
  // Choose "is" or "are" depending on if there's an "and" or a comma in the typing string
  const isPlural = trimmedAuthor.includes(' and ') || trimmedAuthor.includes(',')
  const statusText = isPlural ? 'are typing...' : 'is typing...'

  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '8px 0' }}>
      {/* Animation Dots */}
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', animation: 'bounce 1.4s infinite' }} />
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', animation: 'bounce 1.4s infinite 0.2s' }} />
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', animation: 'bounce 1.4s infinite 0.4s' }} />
      
      {/* Accurate Text Label */}
      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginLeft: 6, fontFamily: 'sans-serif' }}>
        <strong style={{ color: 'rgba(255,255,255,0.8)', fontWeight: '600' }}>{displayName}</strong> {statusText}
      </span>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  )
}