
// import { AuthProvider } from '@/context/AuthContext'
// import { Toaster } from 'react-hot-toast'
// import '@/app/globals.css' // Adjust this path if you kept your CSS elsewhere

// export const metadata = {
//   title: 'MindBridge',
//   description: 'AI-Powered Collaborative Learning Platform',
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         {/* Pre-fetching the typography styling sheets defined in your UI rules */}
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
//       </head>
//       <body>
//         <AuthProvider>
//           {/* This renders your notifications alert layers across the platform */}
//           <Toaster position="top-right" reverseOrder={false} />
          
//           {children}
//         </AuthProvider>
//       </body>
//     </html>
//   )
// }






// import { AuthProvider } from '@/context/AuthContext'
// import { Toaster } from 'react-hot-toast'
// import '@/app/globals.css' // Adjust this path if you kept your CSS elsewhere

// export const metadata = {
//   title: 'MindBridge',
//   description: 'AI-Powered Collaborative Learning Platform',
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         {/* Pre-fetching the typography styling sheets defined in your UI rules */}
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
//       </head>
//       <body suppressHydrationWarning>
//         <AuthProvider>
//           {/* This renders your notifications alert layers across the platform */}
//           <Toaster position="top-right" reverseOrder={false} />
          
//           {children}
//         </AuthProvider>
//       </body>
//     </html>
//   )
// }









import { AuthProvider } from '@/context/AuthContext'
import { WorkspaceProvider } from '@/context/WorkspaceContext'
import { Toaster } from 'react-hot-toast'
import '@/app/globals.css'

export const metadata = {
  title: 'MindBridge',
  description: 'AI-Powered Collaborative Learning Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>
          <WorkspaceProvider>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
          </WorkspaceProvider>
        </AuthProvider>
      </body>
    </html>
  )
}