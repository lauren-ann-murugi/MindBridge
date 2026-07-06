'use client'

import { Upload, Eye, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'

const MOCK_CONTENT = [
  { id: 1, title: 'Module 1: JavaScript Basics', type: 'Course', status: 'published', views: 2450, date: 'Jan 10' },
  { id: 2, title: 'Quiz: ES6 Features', type: 'Assessment', status: 'draft', views: 0, date: 'Jan 9' },
  { id: 3, title: 'Live Session: React Advanced', type: 'Event', status: 'published', views: 1200, date: 'Jan 8' },
]

export default function ContentManagement() {
  const [content, setContent] = useState(MOCK_CONTENT)

  const deleteContent = (id) => {
    setContent(content.filter(c => c.id !== id))
  }

  return (
    <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#fff' }}>Content Management</h3>
        <button style={{ background: 'rgba(74, 222, 128, 0.2)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: 6, padding: '6px 12px', color: '#4ade80', fontSize: 11, cursor: 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Upload size={12} /> Upload
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {content.map(item => (
          <div key={item.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 600, color: '#fff' }}>{item.title}</h4>
              <div style={{ display: 'flex', gap: 10, fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
                <span>{item.type}</span>
                <span>•</span>
                <span style={{ background: item.status === 'published' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(255,255,255,0.1)', color: item.status === 'published' ? '#4ade80' : 'rgba(255,255,255,0.6)', padding: '2px 6px', borderRadius: 4, fontSize: 9 }}>
                  {item.status}
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Eye size={10} /> {item.views}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={{ background: 'rgba(99, 102, 241, 0.15)', border: 'none', borderRadius: 6, padding: '4px 8px', color: 'rgba(99, 102, 241, 0.8)', fontSize: 10, cursor: 'pointer' }}>
                <Edit size={12} />
              </button>
              <button
                onClick={() => deleteContent(item.id)}
                style={{ background: 'rgba(248, 113, 113, 0.15)', border: 'none', borderRadius: 6, padding: '4px 8px', color: '#f87171', fontSize: 10, cursor: 'pointer' }}
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}