// 'use client'

// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import Sidebar from '@/components/common/Sidebar'
// import Topbar from '@/components/common/Topbar'

// export default function StudentLayout({ children }) {
//   const router = useRouter()

//   useEffect(() => {
//     const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
//     if (!token) {
//       router.push('/login')
//     }
//   }, [router])

//   return (
//     <div style={{ display: 'flex', minHeight: '100vh', background: '#080808', fontFamily: "'DM Sans',sans-serif" }}>
//       <Sidebar />
//       <div style={{ marginLeft: 240, flex: 1, display: 'flex', flexDirection: 'column' }}>
//         <Topbar sidebarWidth={240} />
//         <main style={{ marginTop: 56, flex: 1, overflow: 'auto' }}>
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }



// 'use client'

// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import Sidebar from '@/components/common/Sidebar'
// import Topbar from '@/components/common/Topbar'
// import { ROUTES } from '@/lib/constants'

// export default function StudentLayout({ children }) {
//   const router = useRouter()

//   useEffect(() => {
//     // Synchronized storage key item check from 'access_token' to 'mb_token'
//     const token = typeof window !== 'undefined' ? localStorage.getItem('mb_token') : null
//     if (!token) {
//       router.push(ROUTES.LOGIN)
//     }
//   }, [router])

//   return (
//     <div style={{ display: 'flex', minHeight: '100vh', background: '#080808', fontFamily: "'DM Sans',sans-serif" }}>
//       <Sidebar />
//       <div style={{ marginLeft: 240, flex: 1, display: 'flex', flexDirection: 'column' }}>
//         <Topbar sidebarWidth={240} />
//         <main style={{ marginTop: 56, flex: 1, overflow: 'auto' }}>
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }    AUTHENTICATION GOOOOOOOOOOD



'use client'

import { NotificationProvider } from '@/context/NotificationContext'
import Sidebar from '@/components/common/Sidebar'
import Topbar from '@/components/common/Topbar'

export default function StudentLayout({ children }) {
  // Maintaining your dynamic layout width configuration tracking
  const sidebarWidth = 240 

  return (
    <NotificationProvider> {/* 🛟 WRAP THE ENTIRE LAYOUT FRAME HERE */}
      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
        
        {/* Navigation Sidebar Drawer Shell */}
        <Sidebar subtitle="Student Portal" />

        {/* Core Layout Interface Panel Viewport wrapper */}
        <div style={{ 
          marginLeft: sidebarWidth, 
          paddingTop: 56, // Pushes main content view frame down below the fixed topbar height
          transition: 'margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1)' 
        }}>
          
          {/* Header Utilities Dashboard Control Panel */}
          <Topbar sidebarWidth={sidebarWidth} />

          {/* Dynamic Page Components Mounting Node Slot */}
          <main style={{ padding: '24px' }}>
            {children}
          </main>
          
        </div>
      </div>
    </NotificationProvider>
  )
}


