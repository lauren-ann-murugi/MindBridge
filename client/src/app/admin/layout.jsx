// 'use client'

// import AdminRoute from '@/components/common/AdminRoute'
// import AdminSidebar from '@/components/common/AdminSidebar'
// import Topbar from '@/components/common/Topbar'

// export default function AdminLayout({ children }) {
//   return (
//     <AdminRoute>
//       <div style={{ display: 'flex', minHeight: '100vh', background: '#080808', fontFamily: "'DM Sans',sans-serif" }}>
//         <AdminSidebar />
//         <div style={{ marginLeft: 200, flex: 1, display: 'flex', flexDirection: 'column' }}>
//           <Topbar sidebarWidth={200} />
//           <main style={{ marginTop: 56, flex: 1, overflow: 'auto' }}>
//             {children}
//           </main>
//         </div>
//       </div>
//     </AdminRoute>
//   )
// }







'use client'

import AdminRoute from '@/components/common/AdminRoute'
import AdminSidebar from '@/components/common/AdminSidebar'
import Topbar from '@/components/common/Topbar'
// Import your Provider here
import { NotificationProvider } from '@/context/NotificationContext' 

export default function AdminLayout({ children }) {
  return (
    <AdminRoute>
      <NotificationProvider>
        <div style={{ display: 'flex', minHeight: '100vh', background: '#080808', fontFamily: "'DM Sans', sans-serif" }}>
          <AdminSidebar />
          <div style={{ marginLeft: 200, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Topbar sidebarWidth={200} />
            <main style={{ marginTop: 56, flex: 1, overflow: 'auto' }}>
              {children}
            </main>
          </div>
        </div>
      </NotificationProvider>
    </AdminRoute>
  )
}