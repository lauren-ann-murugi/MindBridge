'use client'

import { Search, MessageSquare } from 'lucide-react'
import { useState } from 'react'

const MOCK_TICKETS = [
  { id: 'TK001', subject: 'Login Issue', user: 'Sarah Johnson', priority: 'high', status: 'open', date: 'Jan 10' },
  { id: 'TK002', subject: 'Missing Course Material', user: 'John Smith', priority: 'medium', status: 'in-progress', date: 'Jan 9' },
  { id: 'TK003', subject: 'Certificate Not Generated', user: 'Emma Davis', priority: 'high', status: 'open', date: 'Jan 8' },
  { id: 'TK004', subject: 'App Crash on Mobile', user: 'Alex Chen', priority: 'critical', status: 'open', date: 'Jan 7' },
  { id: 'TK005', subject: 'Payment Failed', user: 'Maria Lopez', priority: 'high', status: 'resolved', date: 'Jan 6' },
]

export default function TicketTable() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTicket, setSelectedTicket] = useState(null)

  const filteredTickets = MOCK_TICKETS.filter(t =>
    t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }
      case 'high':
        return { bg: 'rgba(248, 113, 113, 0.15)', color: '#f87171' }
      case 'medium':
        return { bg: 'rgba(255, 193, 7, 0.15)', color: '#ffc107' }
      default:
        return { bg: 'rgba(74, 222, 128, 0.15)', color: '#4ade80' }
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return { bg: 'rgba(248, 113, 113, 0.15)', color: '#f87171' }
      case 'in-progress':
        return { bg: 'rgba(255, 193, 7, 0.15)', color: '#ffc107' }
      case 'resolved':
        return { bg: 'rgba(74, 222, 128, 0.15)', color: '#4ade80' }
      default:
        return { bg: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ position: 'relative' }}>
        <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search tickets..."
          style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px 8px 36px', color: '#fff', fontSize: 12, outline: 'none' }}
        />
      </div>

      <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: 12 }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <th style={{ padding: 12, textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>ID</th>
                <th style={{ padding: 12, textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Subject</th>
                <th style={{ padding: 12, textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>User</th>
                <th style={{ padding: 12, textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Priority</th>
                <th style={{ padding: 12, textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Status</th>
                <th style={{ padding: 12, textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket, i) => {
                const priorityColor = getPriorityColor(ticket.priority)
                const statusColor = getStatusColor(ticket.status)
                return (
                  <tr key={ticket.id} style={{ borderBottom: i < filteredTickets.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <td style={{ padding: 12, color: '#fff', fontWeight: 600 }}>{ticket.id}</td>
                    <td style={{ padding: 12, color: 'rgba(255,255,255,0.8)' }}>{ticket.subject}</td>
                    <td style={{ padding: 12, color: 'rgba(255,255,255,0.6)' }}>{ticket.user}</td>
                    <td style={{ padding: 12, textAlign: 'center' }}>
                      <span style={{ background: priorityColor.bg, color: priorityColor.color, padding: '3px 8px', borderRadius: 5, fontSize: 10, fontWeight: 600 }}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td style={{ padding: 12, textAlign: 'center' }}>
                      <span style={{ background: statusColor.bg, color: statusColor.color, padding: '3px 8px', borderRadius: 5, fontSize: 10, fontWeight: 600 }}>
                        {ticket.status}
                      </span>
                    </td>
                    <td style={{ padding: 12, textAlign: 'center' }}>
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        style={{ background: 'rgba(99, 102, 241, 0.15)', border: 'none', borderRadius: 6, padding: '4px 8px', color: 'rgba(99, 102, 241, 0.8)', fontSize: 10, cursor: 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4, margin: '0 auto' }}
                      >
                        <MessageSquare size={12} /> Reply
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTicket && (
        <div style={{ background: '#111', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: 12, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#fff' }}>Ticket {selectedTicket.id}: {selectedTicket.subject}</h3>
            <button onClick={() => setSelectedTicket(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 18 }}>×</button>
          </div>
          <textarea
            placeholder="Type your response..."
            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 12, color: '#fff', fontSize: 12, minHeight: 80, outline: 'none', resize: 'none', fontFamily: "'DM Sans',sans-serif" }}
          />
          <button style={{ marginTop: 10, background: '#fff', color: '#000', border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            Send Reply
          </button>
        </div>
      )}
    </div>
  )
}