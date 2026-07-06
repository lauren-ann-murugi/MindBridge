// 'use client'

// import { Star } from 'lucide-react'

// export default function BookCard({ book, onSelect }) {
//   return (
//     <div
//       onClick={onSelect}
//       style={{
//         background: '#111',
//         border: '1px solid rgba(255,255,255,0.08)',
//         borderRadius: 12,
//         padding: 14,
//         cursor: 'pointer',
//         transition: 'all 0.15s',
//         textAlign: 'center',
//       }}
//       onMouseEnter={e => {
//         e.currentTarget.style.transform = 'translateY(-4px)'
//         e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
//       }}
//       onMouseLeave={e => {
//         e.currentTarget.style.transform = 'translateY(0)'
//         e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
//       }}
//     >
//       <div style={{ fontSize: 64, textAlign: 'center', marginBottom: 12 }}>{book.cover}</div>
//       <h3 style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: 500, color: '#fff' }}>{book.title}</h3>
//       <p style={{ margin: '0 0 10px', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{book.author}</p>
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
//         <Star size={14} style={{ color: '#fbbf24' }} fill="#fbbf24" />
//         <span style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 500 }}>{book.rating}</span>
//       </div>
//     </div>
//   )
// }





'use client'

import { Star, BookOpen, User } from 'lucide-react'

export default function BookCard({ book, onSelect }) {
  // Graceful fallbacks for missing context metrics
  const coverEmoji = book?.cover || '📚'
  const titleText = book?.title || 'Untitled Asset'
  const authorText = book?.author || 'Unknown Author'
  const ratingValue = book?.rating || '0.0'
  const pagesCount = book?.pages || book?.pageCount || null

  return (
    <div
      onClick={onSelect}
      className="group relative bg-[#0e0e12] border border-white/[0.06] rounded-xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-[#121217] flex flex-col justify-between overflow-hidden shadow-lg select-none"
    >
      {/* Decorative localized ambient glowing element */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/[0.01] group-hover:bg-indigo-500/[0.03] rounded-full blur-xl transition-all duration-300 pointer-events-none" />

      <div>
        {/* Visual Cover Header Node */}
        <div className="w-12 h-12 rounded-lg bg-white/[0.02] border border-white/[0.04] group-hover:border-white/10 group-hover:bg-white/[0.04] flex items-center justify-center text-2xl transition-all duration-300 mb-4 shadow-inner">
          {coverEmoji}
        </div>

        {/* Structural Text Frame Meta Metadata */}
        <h3 className="m-0 text-sm font-semibold text-white/90 group-hover:text-white tracking-wide line-clamp-1 transition-colors duration-200">
          {titleText}
        </h3>
        
        <div className="flex items-center gap-1.5 mt-1 mb-4 text-white/40 group-hover:text-white/50 transition-colors">
          <User size={11} className="shrink-0" />
          <p className="m-0 text-xs font-normal truncate max-w-[180px]">
            {authorText}
          </p>
        </div>
      </div>

      {/* Bottom Context Metrics Row Alignment */}
      <div className="flex items-center justify-between border-t border-white/[0.03] pt-3 mt-2 text-[11px] font-mono tracking-tight">
        
        {/* Rating Node Segment */}
        <div className="flex items-center gap-1 bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded text-amber-400 font-medium">
          <Star size={11} fill="currentColor" className="text-amber-400 shrink-0" />
          <span>{Number(ratingValue).toFixed(1)}</span>
        </div>

        {/* Optional Page Count Node Matrix */}
        {pagesCount && (
          <div className="flex items-center gap-1 text-white/30 group-hover:text-white/40 transition-colors">
            <BookOpen size={10} />
            <span>{pagesCount} pages</span>
          </div>
        )}
      </div>

    </div>
  )
}