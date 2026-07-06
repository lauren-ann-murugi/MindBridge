// 'use client'

// import { Brain, Download, Share2, Loader } from 'lucide-react'
// import { useState } from 'react'

// export default function MaterialCard({ material, onSummarize }) {
//   const [isSummarizing, setIsSummarizing] = useState(false)

//   const getIcon = (type) => {
//     if (type === 'PDF') return '📕'
//     if (type === 'Video') return '🎥'
//     if (type === 'Document') return '📄'
//     return '📌'
//   }

//   const handleSummarize = async () => {
//     setIsSummarizing(true)
//     try {
//       await onSummarize(material)
//     } finally {
//       setIsSummarizing(false)
//     }
//   }

//   return (
//     <div
//       style={{
//         background: '#111',
//         border: '1px solid rgba(255,255,255,0.08)',
//         borderRadius: 12,
//         padding: 16,
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         cursor: 'pointer',
//         transition: 'all 0.15s',
//       }}
//       onMouseEnter={e => {
//         e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
//         e.currentTarget.style.background = '#141414'
//       }}
//       onMouseLeave={e => {
//         e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
//         e.currentTarget.style.background = '#111'
//       }}
//     >
//       <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
//         <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
//           {getIcon(material.type)}
//         </div>
//         <div>
//           <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: '#fff' }}>{material.title}</h3>
//           <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
//             {material.size} • {material.uploaded} • {material.author}
//           </p>
//         </div>
//       </div>
//       <div style={{ display: 'flex', gap: 8 }}>
//         <button
//           onClick={handleSummarize}
//           disabled={isSummarizing}
//           title="AI Summarize"
//           style={{
//             background: 'rgba(99, 102, 241, 0.15)',
//             border: '1px solid rgba(99, 102, 241, 0.3)',
//             borderRadius: 8,
//             width: 36,
//             height: 36,
//             cursor: isSummarizing ? 'not-allowed' : 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             color: isSummarizing ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.8)',
//             opacity: isSummarizing ? 0.7 : 1,
//           }}
//         >
//           {isSummarizing ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Brain size={16} />}
//         </button>
//         <button
//           style={{
//             background: 'rgba(255,255,255,0.08)',
//             border: '1px solid rgba(255,255,255,0.1)',
//             borderRadius: 8,
//             width: 36,
//             height: 36,
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             color: 'rgba(255,255,255,0.6)',
//             transition: 'all 0.15s',
//           }}
//           onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
//           onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
//           title="Download"
//         >
//           <Download size={16} />
//         </button>
//         <button
//           style={{
//             background: 'rgba(255,255,255,0.08)',
//             border: '1px solid rgba(255,255,255,0.1)',
//             borderRadius: 8,
//             width: 36,
//             height: 36,
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             color: 'rgba(255,255,255,0.6)',
//             transition: 'all 0.15s',
//           }}
//           onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
//           onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
//           title="Share"
//         >
//           <Share2 size={16} />
//         </button>
//       </div>
//       <style>{`
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   )
// }







'use client'

import { Brain, Download, Share2, Loader, FileText, Video, File } from 'lucide-react'
import { useState } from 'react'

export default function MaterialCard({ material, onSummarize }) {
  const [isSummarizing, setIsSummarizing] = useState(false)

  // Professional color-coded icon maps instead of standard emojis
  const getIcon = (type) => {
    if (type === 'PDF') return <FileText className="text-red-400 w-5 h-5" />
    if (type === 'Video') return <Video className="text-amber-400 w-5 h-5" />
    if (type === 'Document') return <File className="text-blue-400 w-5 h-5" />
    return <File className="text-indigo-400 w-5 h-5" />
  }

  const handleSummarize = async (e) => {
    e.stopPropagation() // Prevents clicking the action from triggering card-level clicks
    if (isSummarizing) return
    setIsSummarizing(true)
    try {
      await onSummarize(material)
    } catch (error) {
      console.error("Inference execution fault:", error)
    } finally {
      setIsSummarizing(false)
    }
  }

  const handleDownload = (e) => {
    e.stopPropagation()
    try {
      const payloadString = `Asset Document Record\nTitle: ${material.title}\nType: ${material.type}\nSize: ${material.size}\nAuthor: ${material.author}`
      const blob = new Blob([payloadString], { type: 'text/plain;charset=utf-8' })
      const element = document.createElement('a')
      element.href = URL.createObjectURL(blob)
      element.download = `${material.title.replace(/\s+/g, '_')}_metadata.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    } catch (err) {
      console.error("Local client asset download loop failed:", err)
    }
  }

  const handleShare = (e) => {
    e.stopPropagation()
    const textContext = `Review structural document node details for: ${material.title} (${material.type}) compiled by ${material.author}.`
    if (navigator.share) {
      navigator.share({
        title: 'Smart Library Hub Shared Asset',
        text: textContext,
      }).catch(console.error)
    } else {
      navigator.clipboard.writeText(textContext)
      alert('Asset index context link mapped to clipboard!')
    }
  }

  return (
    <div className="bg-[#111114] border border-white/[0.06] hover:border-white/15 rounded-xl p-4 flex justify-between items-center transition-all duration-200 group shadow-sm hover:shadow-md">
      
      {/* Left Info Column */}
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        <div className="w-11 h-11 rounded-lg bg-white/[0.03] border border-white/[0.04] group-hover:bg-white/[0.06] group-hover:border-white/[0.08] flex items-center justify-center transition-all shrink-0">
          {getIcon(material.type)}
        </div>
        <div className="min-w-0">
          <h3 className="margin-0 text-xs font-semibold text-white tracking-wide truncate pr-2">
            {material.title}
          </h3>
          <p className="margin-0 mt-1 text-[11px] text-white/40 font-mono tracking-tight">
            {material.type} • {material.size} • {material.author}
          </p>
        </div>
      </div>

      {/* Right Actions Cluster Column */}
      <div className="flex items-center gap-2 shrink-0">
        
        {/* AI SUMMARISER TRIGGER */}
        <button
          onClick={handleSummarize}
          disabled={isSummarizing}
          title="AI Summarize Document"
          className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-150 cursor-pointer ${
            isSummarizing
              ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400/50 cursor-not-allowed opacity-60'
              : 'bg-indigo-500/10 hover:bg-indigo-500/20 border-indigo-500/20 hover:border-indigo-500/40 text-indigo-400'
          }`}
        >
          {isSummarizing ? (
            <Loader size={15} className="animate-spin" />
          ) : (
            <Brain size={15} className="group-hover:scale-105 transition-transform" />
          )}
        </button>

        {/* NATIVE DOWNLOAD TRIGGER */}
        <button
          onClick={handleDownload}
          title="Download Material Asset"
          className="w-9 h-9 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-white/60 hover:text-white flex items-center justify-center transition-all duration-150 cursor-pointer"
        >
          <Download size={15} />
        </button>

        {/* WEB SHARE ROUTER TRIGGER */}
        <button
          onClick={handleShare}
          title="Share Context Pointer"
          className="w-9 h-9 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-white/60 hover:text-white flex items-center justify-center transition-all duration-150 cursor-pointer"
        >
          <Share2 size={15} />
        </button>
      </div>
    </div>
  )
}