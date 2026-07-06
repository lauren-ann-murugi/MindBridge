// 'use client'
// import { useState } from 'react'
// import { Mail, Phone } from 'lucide-react'

// export default function AdminSupport() {
//   const [selectedTicket, setSelectedTicket] = useState(0)
//   const tickets = [
//     { id: 1, subject: 'User account locked', status: 'open', priority: 'high' },
//     { id: 2, subject: 'Payment issue', status: 'resolved', priority: 'medium' },
//     { id: 3, subject: 'Course access problem', status: 'open', priority: 'medium' },
//   ]

//   return (
//     <main style={{ padding: '32px 28px', overflow: 'auto' }}>
//       <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.5rem', fontWeight: 400, color: '#fff', margin: '0 0 12px' }}>
//         Admin Support
//       </h1>
//       <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, margin: '0 0 28px' }}>
//         User support and ticket management
//       </p>

//       <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr 280px', gap: 24 }}>
//         {/* Tickets List */}
//         <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
//           {tickets.map((ticket, i) => (
//             <button
//               key={ticket.id}
//               onClick={() => setSelectedTicket(i)}
//               style={{ background: selectedTicket === i ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', borderRadius: 10, padding: '12px', textAlign: 'left', cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: selectedTicket === i ? 500 : 400, transition: 'all 0.15s' }}
//             >
//               <p style={{ margin: 0, fontSize: 12 }}>{ticket.subject}</p>
//               <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{ticket.status}</span>
//             </button>
//           ))}
//         </div>

//         {/* Ticket Details */}
//         <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24 }}>
//           <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#fff' }}>
//             {tickets[selectedTicket].subject}
//           </h2>
//           <p style={{ margin: '8px 0 20px', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
//             Status: <span style={{ color: tickets[selectedTicket].status === 'open' ? '#f87171' : '#4ade80' }}>{tickets[selectedTicket].status.toUpperCase()}</span>
//           </p>
//           <textarea
//             placeholder="Ticket details and resolution notes..."
//             style={{ width: '100%', height: 200, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '12px', color: '#fff', fontSize: 13, outline: 'none', fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box' }}
//           />
//           <button style={{ marginTop: 12, background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 600, cursor: 'pointer' }}>
//             Resolve
//           </button>
//         </div>

//         {/* Contact Info */}
//         <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20, height: 'fit-content' }}>
//           <h2 style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>
//             SUPPORT CONTACT
//           </h2>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//             <a href="mailto:support@mindbridge.com" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
//               <Mail size={16} />
//               <span style={{ fontSize: 12 }}>support@mindbridge.com</span>
//             </a>
//             <a href="tel:+1234567890" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
//               <Phone size={16} />
//               <span style={{ fontSize: 12 }}>+1 (234) 567-890</span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }






'use client'

import TicketTable from '@/components/admin/TicketTable'
import ModerationCard from '@/components/admin/ModerationCard'
import ContentManagement from '@/components/admin/ContentManagement'

export default function Support() {
  return (
    <div style={{ padding: '32px 28px' }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.25rem', fontWeight: 400, color: '#fff', margin: '0 0 28px' }}>
        Support & Moderation
      </h1>

      {/* Tickets */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 600, color: '#fff' }}>Support Tickets</h2>
        <TicketTable />
      </div>

      {/* Moderation & Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <ModerationCard />
        <ContentManagement />
      </div>
    </div>
  )
}