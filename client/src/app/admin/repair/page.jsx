// 'use client'
// import { useState } from 'react'
// import { AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react'

// export default function Repair() {
//   const [systemHold, setSystemHold] = useState(false)
//   const [diagnostics, setDiagnostics] = useState([
//     { name: 'Database Connection', status: 'healthy', icon: '✓' },
//     { name: 'Redis Cache', status: 'healthy', icon: '✓' },
//     { name: 'Email Service', status: 'warning', icon: '⚠️' },
//     { name: 'Socket.IO', status: 'healthy', icon: '✓' },
//   ])

//   return (
//     <main style={{ padding: '32px 28px', overflow: 'auto' }}>
//       <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.5rem', fontWeight: 400, color: '#fff', margin: '0 0 12px' }}>
//         Repair & Diagnostics
//       </h1>
//       <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, margin: '0 0 28px' }}>
//         System health monitoring
//       </p>

//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
//         {/* Diagnostics */}
//         <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24 }}>
//           <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#fff' }}>System Diagnostics</h2>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//             {diagnostics.map(diag => (
//               <div key={diag.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
//                 <div>
//                   <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: '#fff' }}>{diag.name}</p>
//                 </div>
//                 <span style={{ fontSize: 12, fontWeight: 600, color: diag.status === 'healthy' ? '#4ade80' : '#fbbf24', background: diag.status === 'healthy' ? '#4ade8020' : '#fbbf2420', padding: '4px 12px', borderRadius: 20 }}>
//                   {diag.status.toUpperCase()}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* System Hold */}
//         <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24, height: 'fit-content' }}>
//           <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#fff' }}>System Control</h2>
//           <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(248, 113, 113, 0.1)', borderRadius: 8, cursor: 'pointer' }}>
//             <span style={{ fontSize: 13, fontWeight: 500, color: '#f87171' }}>System Hold</span>
//             <input
//               type="checkbox"
//               checked={systemHold}
//               onChange={e => setSystemHold(e.target.checked)}
//               style={{ width: 18, height: 18, cursor: 'pointer' }}
//             />
//           </label>
//           <p style={{ margin: '12px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Pause all operations</p>
//         </div>
//       </div>
//     </main>
//   )
// }






'use client'

import RepairWizard from '@/components/admin/RepairWizard'
import DiagnosticsPanel from '@/components/admin/DiagnosticsPanel'
import SystemReport from '@/components/admin/SystemReport'

export default function Repair() {
  return (
    <div style={{ padding: '32px 28px' }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.25rem', fontWeight: 400, color: '#fff', margin: '0 0 28px' }}>
        System Repair & Diagnostics
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <RepairWizard />
        <DiagnosticsPanel />
      </div>

      <div style={{ marginTop: 24 }}>
        <SystemReport />
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