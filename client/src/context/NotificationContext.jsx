// 'use client'

// import { createContext, useContext, useState, useCallback } from 'react'

// const NotificationContext = createContext()

// export function NotificationProvider({ children }) {
//   const [notifications, setNotifications] = useState([])

//   const addNotification = useCallback((message, type = 'info', duration = 3000) => {
//     const id = Date.now()
//     const notification = { id, message, type }
    
//     setNotifications(prev => [...prev, notification])
    
//     if (duration > 0) {
//       setTimeout(() => {
//         removeNotification(id)
//       }, duration)
//     }
    
//     return id
//   }, [])

//   const removeNotification = useCallback((id) => {
//     setNotifications(prev => prev.filter(notif => notif.id !== id))
//   }, [])

//   const markAsRead = useCallback((id) => {
//     setNotifications(prev =>
//       prev.map(notif =>
//         notif.id === id ? { ...notif, read: true } : notif
//       )
//     )
//   }, [])

//   const clearAll = useCallback(() => {
//     setNotifications([])
//   }, [])

//   const value = {
//     notifications,
//     addNotification,
//     removeNotification,
//     markAsRead,
//     clearAll,
//   }

//   return (
//     <NotificationContext.Provider value={value}>
//       {children}
//       <NotificationDisplay />
//     </NotificationContext.Provider>
//   )
// }

// export function useNotification() {
//   const context = useContext(NotificationContext)
//   if (!context) {
//     throw new Error('useNotification must be used within NotificationProvider')
//   }
//   return context
// }

// function NotificationDisplay() {
//   const { notifications, removeNotification } = useNotification()

//   return (
//     <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 12 }}>
//       {notifications.map(notif => (
//         <div
//           key={notif.id}
//           style={{
//             background: notif.type === 'success' ? '#4ade80' : notif.type === 'error' ? '#f87171' : notif.type === 'warning' ? '#fbbf24' : '#60a5fa',
//             color: '#000',
//             padding: '12px 16px',
//             borderRadius: 8,
//             fontSize: '14px',
//             fontWeight: 500,
//             boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
//             animation: 'slideIn 0.3s ease-out',
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             gap: 12,
//             minWidth: 300,
//           }}
//         >
//           <span>{notif.message}</span>
//           <button
//             onClick={() => removeNotification(notif.id)}
//             style={{
//               background: 'none',
//               border: 'none',
//               color: '#000',
//               cursor: 'pointer',
//               fontSize: '18px',
//               padding: 0,
//             }}
//           >
//             ×
//           </button>
//         </div>
//       ))}
//       <style>{`
//         @keyframes slideIn {
//           from {
//             transform: translateX(400px);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   )
// }





'use client'

import { createContext, useContext, useState, useCallback } from 'react'

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  // Balanced default state containing an initial system notice
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'Welcome to MindBridge! Explore your synchronized units dashboard.',
      type: 'info',
      read: false,
      created_at: new Date().toISOString()
    }
  ])

  // 1. Calculate dynamic unread metrics for the bell component icon badge
  const unreadCount = notifications.filter(n => !n.read).length

  // 2. Add an ephemeral alert banner (Toast handler)
  const addNotification = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now()
    const notification = { id, message, type, read: false, created_at: new Date().toISOString() }
    
    setNotifications(prev => [notification, ...prev])
    
    if (duration > 0) {
      setTimeout(() => {
        dismiss(id)
      }, duration)
    }
    
    return id
  }, [])

  // 3. Mark single element item message read state
  const markRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }, [])

  // 4. Mark all items read
  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  // 5. Dismiss/Remove item completely from array loop
  const dismiss = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markRead,
    markAllRead,
    dismiss,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationDisplay />
    </NotificationContext.Provider>
  )
}

// Singular export name used everywhere to stay consistent
export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}

// Toast Display popup engine wrapper logic
function NotificationDisplay() {
  const { notifications, dismiss } = useNotification()
  
  // Only display non-read or unread notifications inside ephemeral toasts stream
  const activeToasts = notifications.slice(0, 3).filter(n => !n.read)

  return (
    <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {activeToasts.map(notif => (
        <div
          key={notif.id}
          style={{
            background: notif.type === 'success' ? '#4ade80' : notif.type === 'error' ? '#f87171' : notif.type === 'warning' ? '#fbbf24' : '#60a5fa',
            color: '#000',
            padding: '12px 16px',
            borderRadius: 8,
            fontSize: '14px',
            fontWeight: 500,
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            animation: 'slideIn 0.3s ease-out',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            gap: 12,
            minWidth: 300,
          }}
        >
          <span>{notif.message}</span>
          <button
            onClick={() => dismiss(notif.id)}
            style={{
              background: 'none',
              border: 'none',
              color: '#000',
              cursor: 'pointer',
              fontSize: '18px',
              padding: 0,
            }}
          >
            ×
          </button>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}