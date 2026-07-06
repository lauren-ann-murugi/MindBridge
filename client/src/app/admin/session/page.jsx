// 'use client'
// import { useState } from 'react'
// import { Plus } from 'lucide-react'

// export default function AddSession() {
//   const [formData, setFormData] = useState({
//     name: '',
//     topic: '',
//     date: '',
//     maxParticipants: ''
//   })

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     console.log('Session created:', formData)
//   }

//   return (
//     <main style={{ padding: '32px 28px', overflow: 'auto', maxWidth: 900 }}>
//       <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.5rem', fontWeight: 400, color: '#fff', margin: '0 0 12px' }}>
//         Add New Session
//       </h1>
//       <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, margin: '0 0 28px' }}>
//         Create a new learning session
//       </p>

//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
//         {/* Form */}
//         <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24 }}>
//           <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
//             {[
//               { label: 'Session Name', name: 'name', type: 'text', placeholder: 'e.g., JavaScript Advanced' },
//               { label: 'Topic', name: 'topic', type: 'text', placeholder: 'e.g., Closures & Prototypes' },
//               { label: 'Date', name: 'date', type: 'date' },
//               { label: 'Max Participants', name: 'maxParticipants', type: 'number', placeholder: '100' },
//             ].map(field => (
//               <div key={field.name}>
//                 <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
//                   {field.label}
//                 </label>
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   value={formData[field.name]}
//                   onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
//                   placeholder={field.placeholder}
//                   style={{
//                     width: '100%',
//                     background: 'rgba(255,255,255,0.05)',
//                     border: '1px solid rgba(255,255,255,0.1)',
//                     borderRadius: 8,
//                     padding: '10px 14px',
//                     color: '#fff',
//                     fontSize: 14,
//                     outline: 'none',
//                     boxSizing: 'border-box',
//                   }}
//                 />
//               </div>
//             ))}

//             <button
//               type="submit"
//               style={{
//                 background: '#fff',
//                 color: '#000',
//                 border: 'none',
//                 borderRadius: 8,
//                 padding: '12px 24px',
//                 fontWeight: 600,
//                 cursor: 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 gap: 8,
//                 marginTop: 12,
//               }}
//             >
//               <Plus size={18} /> Create Session
//             </button>
//           </form>
//         </div>

//         {/* Active Queues */}
//         <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24 }}>
//           <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#fff' }}>Active Queues</h2>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//             {[
//               { name: 'JavaScript Advanced', active: 45, max: 100, load: 45 },
//               { name: 'React Mastery', active: 82, max: 100, load: 82 },
//               { name: 'Database Design', active: 28, max: 80, load: 35 },
//             ].map(queue => (
//               <div key={queue.name} style={{ padding: 12, background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//                   <span style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>{queue.name}</span>
//                   <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{queue.active}/{queue.max}</span>
//                 </div>
//                 <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
//                   <div
//                     style={{
//                       height: '100%',
//                       width: `${queue.load}%`,
//                       background: queue.load > 80 ? '#f87171' : '#4ade80',
//                       borderRadius: 2,
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }







'use client'

import { useState } from 'react'
import { Calendar, Users, Clock, Save, Loader } from 'lucide-react'
import ActiveQueues from '@/components/admin/ActiveQueues'

const GROK_API_URL = process.env.NEXT_PUBLIC_XAI_BASE_URL || process.env.NEXT_PUBLIC_GROQ_BASE_URL || 'https://api.x.ai/v1'

export default function AddSession() {
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    date: '',
    time: '',
    duration: '1',
    capacity: '10',
    description: '',
  })
  const [isCreating, setIsCreating] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const generateAISuggestion = async () => {
    if (!formData.title) return

    setIsCreating(true)
    try {
      const token = localStorage.getItem('access_token') || process.env.NEXT_PUBLIC_XAI_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY

      const response = await fetch(`${GROK_API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          model: 'grok-3',
          messages: [
            {
              role: 'system',
              content: 'You are an education session advisor. Suggest best practices for the learning session.',
            },
            {
              role: 'user',
              content: `Session: ${formData.title}, Duration: ${formData.duration}h, Capacity: ${formData.capacity}. Suggest tips.`,
            },
          ],
          max_tokens: 150,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setAiSuggestion(data.choices[0]?.message?.content || '')
      }
    } catch (error) {
      console.error('AI suggestion error:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleCreateSession = () => {
    if (!formData.title || !formData.instructor) {
      alert('Please fill in all required fields')
      return
    }
    alert(`Session "${formData.title}" created successfully!`)
    setFormData({ title: '', instructor: '', date: '', time: '', duration: '1', capacity: '10', description: '' })
    setAiSuggestion('')
  }

  return (
    <div style={{ padding: '32px 28px' }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.25rem', fontWeight: 400, color: '#fff', margin: '0 0 28px' }}>
        Create Learning Session
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Form */}
        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 6, textTransform: 'uppercase' }}>Session Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Advanced React Patterns"
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 6, textTransform: 'uppercase' }}>Instructor *</label>
            <input
              type="text"
              name="instructor"
              value={formData.instructor}
              onChange={handleInputChange}
              placeholder="Instructor name"
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 6, textTransform: 'uppercase' }}>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 6, textTransform: 'uppercase' }}>Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 6, textTransform: 'uppercase' }}>Duration (hours)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="0.5"
                max="8"
                step="0.5"
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 6, textTransform: 'uppercase' }}>Capacity</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                min="1"
                max="100"
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 6, textTransform: 'uppercase' }}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Session details and learning objectives..."
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, outline: 'none', minHeight: 100, resize: 'vertical' }}
            />
          </div>

          <button
            onClick={generateAISuggestion}
            disabled={isCreating || !formData.title}
            style={{ background: 'rgba(99, 102, 241, 0.2)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 8, padding: '10px 16px', color: 'rgba(99, 102, 241, 0.8)', fontSize: 12, cursor: isCreating ? 'not-allowed' : 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: isCreating ? 0.6 : 1 }}
          >
            {isCreating ? <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> : '💡'} Get AI Suggestions
          </button>

          <button
            onClick={handleCreateSession}
            style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          >
            <Save size={16} /> Create Session
          </button>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <ActiveQueues />

          {aiSuggestion && (
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: 12, padding: 16 }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 600, color: '#fff' }}>AI Suggestions</h3>
              <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{aiSuggestion}</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}