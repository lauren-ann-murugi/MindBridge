// 'use client'

// import { Lightbulb } from 'lucide-react'

// export default function MindBridgeSuggestion({ suggestion = null }) {
//   const defaultSuggestion = {
//     title: 'AI Suggestion',
//     text: 'Try explaining with a real-world example to clarify the concept better.',
//   }

//   const currentSuggestion = suggestion || defaultSuggestion

//   return (
//     <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: 12, padding: '16px' }}>
//       <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
//         <Lightbulb size={16} style={{ color: 'rgba(255,255,255,0.6)', marginTop: 2, flexShrink: 0 }} />
//         <div>
//           <p style={{ margin: 0, fontSize: '12px', fontWeight: 500, color: '#fff', marginBottom: 4 }}>
//             {currentSuggestion.title}
//           </p>
//           <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
//             {currentSuggestion.text}
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }






'use client'

import { useState } from 'react'
import { Lightbulb, Sparkles, ThumbsUp, ThumbsDown, Check, Copy } from 'lucide-react'

export default function MindBridgeSuggestion({ 
  suggestion = null, 
  onApplySuggestion = null, // Callback to insert text/action into workspace
  onFeedback = null         // Callback to train/log AI accuracy
}) {
  const [feedback, setFeedback] = useState(null) // 'up' | 'down' | null
  const [copied, setCopied] = useState(false)

  const defaultSuggestion = {
    title: 'AI Study Twin Hint',
    text: 'Try breaking this core concept down into a real-world analogy or a structural chess opening strategy to map the logic pathways clearer.',
  }

  const currentSuggestion = suggestion || defaultSuggestion

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentSuggestion.text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text matrix', err)
    }
  }

  const handleFeedback = (type) => {
    setFeedback(type)
    if (onFeedback) onFeedback(currentSuggestion.id || 'default', type)
  }

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, rgba(0, 34, 68, 0.6) 0%, rgba(99, 102, 241, 0.08) 100%)', 
      border: '1px solid rgba(99, 102, 241, 0.25)', 
      borderRadius: 12, 
      padding: '16px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.2s ease-in-out',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Visual Sub-layer Background Glow Effect */}
      <div style={{ position: 'absolute', top: -20, right: -20, width: 60, height: 60, background: 'rgba(99, 102, 241, 0.15)', filter: 'blur(20px)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        {/* Swapped to a layered spark icon if custom AI content is pushed */}
        <div style={{ 
          padding: 6, 
          background: 'rgba(99, 102, 241, 0.15)', 
          borderRadius: 8, 
          color: '#818cf8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          {suggestion ? <Sparkles size={14} /> : <Lightbulb size={14} />}
        </div>
        
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4, gap: 8 }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#f4f4f5', letterSpacing: '-0.01em' }}>
              {currentSuggestion.title}
            </span>
            <span style={{ fontSize: '10px', background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', padding: '1px 6px', borderRadius: 4, fontWeight: 500 }}>
              AI Active
            </span>
          </div>
          
          <p style={{ margin: 0, fontSize: '11px', color: '#cbd5e1', lineHeight: 1.5, wordBreak: 'break-word' }}>
            {currentSuggestion.text}
          </p>

          {/* Interactive Utility Action Rows */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, pt: 4, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            
            {/* Left Hand: Workspace Insertion Hooks */}
            <div style={{ display: 'flex', gap: 6 }}>
              {onApplySuggestion && (
                <button 
                  onClick={() => onApplySuggestion(currentSuggestion.text)}
                  style={{ background: '#3b82f6', border: 'none', borderRadius: 5, padding: '4px 10px', color: '#fff', fontSize: '10px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.1s' }}
                >
                  Apply to Board
                </button>
              )}
              <button 
                onClick={handleCopy}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 5, padding: '4px 8px', color: '#a1a1aa', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                {copied ? <Check size={10} style={{ color: '#10b981' }} /> : <Copy size={10} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            {/* Right Hand: AI Optimization Evaluation Metrics */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <button 
                onClick={() => handleFeedback('up')}
                style={{ background: 'transparent', border: 'none', padding: 4, cursor: 'pointer', color: feedback === 'up' ? '#10b981' : '#52525b', display: 'flex', alignItems: 'center' }}
                title="Helpful hint"
              >
                <ThumbsUp size={11} fill={feedback === 'up' ? 'currentColor' : 'transparent'} />
              </button>
              <button 
                onClick={() => handleFeedback('down')}
                style={{ background: 'transparent', border: 'none', padding: 4, cursor: 'pointer', color: feedback === 'down' ? '#ef4444' : '#52525b', display: 'flex', alignItems: 'center' }}
                title="Irrelevant hint"
              >
                <ThumbsDown size={11} fill={feedback === 'down' ? 'currentColor' : 'transparent'} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}