// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import { useRouter, usePathname } from 'next/navigation'
// import {
//   LayoutDashboard, Users, BookOpen, GraduationCap,
//   Swords, Bot, RotateCcw, ShieldAlert, Settings,
//   HelpCircle, LogOut, ChevronLeft, Plus, Menu, X,
// } from 'lucide-react'
// import { useAuth } from '@/context/AuthContext'
// import { initials, avatarColor } from '@/lib/helpers'
// import { ROUTES, SIDEBAR_NAV } from '@/lib/constants'

// const BOTTOM = [
//   { label: 'Settings', path: ROUTES.SETTINGS, icon: Settings },
//   { label: 'Support',  path: ROUTES.SUPPORT,  icon: HelpCircle },
// ]

// export default function Sidebar({ subtitle }) {
//   const { user, logout } = useAuth()
//   const router = useRouter()
//   const pathname = usePathname()
//   const [collapsed, setCollapsed] = useState(false)
//   const [mobileOpen, setMobileOpen] = useState(false)

//   const w = collapsed ? 68 : 240

//   return (
//     <>
//       {/* Mobile hamburger */}
//       <button
//         onClick={() => setMobileOpen(o => !o)}
//         style={{ position:'fixed', top:16, left:16, zIndex:200, display:'none', background:'rgba(255,255,255,0.08)', border:'none', borderRadius:8, padding:8, cursor:'pointer', color:'#fff' }}
//         className="md-hamburger"
//       >
//         {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
//       </button>

//       {/* Overlay on mobile */}
//       {mobileOpen && (
//         <div onClick={() => setMobileOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:90, display:'none' }} className="md-overlay"/>
//       )}

//       {/* Sidebar */}
//       <aside style={{
//         position:'fixed', top:0, bottom:0, left:0,
//         width: w,
//         background:'#0a0a0a',
//         borderRight:'1px solid rgba(255,255,255,0.07)',
//         display:'flex', flexDirection:'column',
//         transition:'width 0.25s cubic-bezier(0.4,0,0.2,1)',
//         overflow:'hidden', zIndex:100,
//       }}>

//         {/* Logo */}
//         <div style={{ padding: collapsed ? '20px 16px' : '20px 20px', borderBottom:'1px solid rgba(255,255,255,0.07)', flexShrink:0 }}>
//           <div onClick={() => router.push(ROUTES.DASHBOARD)} style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', overflow:'hidden' }}>
//             <div style={{ width:30, height:30, background:'#fff', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
//                 <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
//               </svg>
//             </div>
//             {!collapsed && (
//               <div>
//                 <div style={{ fontSize:'13px', fontWeight:600, letterSpacing:'0.06em', color:'#fff', lineHeight:1.2 }}>MindBridge</div>
//                 {subtitle && <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.35)', letterSpacing:'0.08em', textTransform:'uppercase' }}>{subtitle}</div>}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Nav items */}
//         <nav style={{ flex:1, padding:'12px 10px', overflowY:'auto', overflowX:'hidden' }}>
//           {SIDEBAR_NAV.map(({ label, path, icon: IconName }) => {
//             // Dynamically evaluate Icon if it is reference component
//             const Icon = { LayoutDashboard, Users, BookOpen, GraduationCap, Swords, Bot, RotateCcw, ShieldAlert }[IconName] || LayoutDashboard
//             const isActive = pathname === path

//             return (
//               <Link key={path} href={path}
//                 style={{
//                   display:'flex', alignItems:'center', gap:12,
//                   padding: collapsed ? '10px 12px' : '9px 14px',
//                   borderRadius:8, marginBottom:2, textDecoration:'none',
//                   color: isActive ? '#fff' : 'rgba(255,255,255,0.48)',
//                   background: isActive ? 'rgba(255,255,255,0.09)' : 'transparent',
//                   fontSize:'13px', fontWeight: isActive ? 500 : 400,
//                   transition:'all 0.15s', whiteSpace:'nowrap', overflow:'hidden',
//                 }}
//               >
//                 <Icon size={17} style={{ flexShrink:0 }}/>
//                 {!collapsed && label}
//               </Link>
//             )
//           })}
//         </nav>

//         {/* Start New Session */}
//         {!collapsed && (
//           <div style={{ padding:'0 10px 12px' }}>
//             <button
//               onClick={() => router.push(ROUTES.BATTLE)}
//               style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'10px', borderRadius:10, background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', fontSize:'13px', fontWeight:500, cursor:'pointer', transition:'background 0.15s' }}
//               onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.13)'}
//               onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}
//             >
//               <Plus size={15}/> Start New Session
//             </button>
//           </div>
//         )}

//         {/* Bottom nav */}
//         <div style={{ padding:'0 10px 8px', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
//           {BOTTOM.map(({ label, path, icon: Icon }) => {
//             const isActive = pathname === path
//             return (
//               <Link key={path} href={path}
//                 style={{
//                   display:'flex', alignItems:'center', gap:12,
//                   padding: collapsed ? '9px 12px' : '9px 14px',
//                   borderRadius:8, marginTop:2, textDecoration:'none',
//                   color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
//                   background: isActive ? 'rgba(255,255,255,0.09)' : 'transparent',
//                   fontSize:'13px', transition:'all 0.15s', whiteSpace:'nowrap',
//                 }}
//               >
//                 <Icon size={17} style={{ flexShrink:0 }}/>{!collapsed && label}
//               </Link>
//             )
//           })}

//           {/* Logout */}
//           <button
//             onClick={logout}
//             style={{ display:'flex', alignItems:'center', gap:12, padding: collapsed ? '9px 12px':'9px 14px', borderRadius:8, marginTop:2, background:'none', border:'none', color:'rgba(255,255,255,0.45)', fontSize:'13px', cursor:'pointer', width:'100%', transition:'color 0.15s', whiteSpace:'nowrap' }}
//             onMouseEnter={e => e.currentTarget.style.color='#f87171'}
//             onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.45)'}
//           >
//             <LogOut size={17} style={{ flexShrink:0 }}/>{!collapsed && 'Logout'}
//           </button>
//         </div>

//         {/* User + collapse toggle */}
//         <div style={{ padding:'12px 10px 16px', borderTop:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', justifyContent: collapsed ? 'center' : 'space-between' }}>
//           {!collapsed && user && (
//             <div style={{ display:'flex', alignItems:'center', gap:8, overflow:'hidden' }}>
//               <div style={{ width:28, height:28, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:600, color:'#fff', flexShrink:0, background: avatarColor(user.full_name || '') }}>
//                 {initials(user.full_name || 'U')}
//               </div>
//               <div style={{ minWidth:0 }}>
//                 <div style={{ fontSize:'12px', fontWeight:500, color:'#fff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user.full_name}</div>
//                 <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.35)' }}>Student</div>
//               </div>
//             </div>
//           )}
//           <button
//             onClick={() => setCollapsed(c => !c)}
//             style={{ background:'rgba(255,255,255,0.06)', border:'none', borderRadius:6, padding:'5px 7px', cursor:'pointer', color:'rgba(255,255,255,0.45)', display:'flex', alignItems:'center', transition:'all 0.15s', flexShrink:0 }}
//             onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.color='#fff' }}
//             onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.color='rgba(255,255,255,0.45)' }}
//           >
//             <ChevronLeft size={14} style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition:'transform 0.25s' }}/>
//           </button>
//         </div>
//       </aside>

//       {/* Responsive styles injected */}
//       <style>{`
//         @media (max-width: 768px) {
//           .md-hamburger { display: flex !important; }
//           .md-overlay   { display: block !important; }
//         }
//       `}</style>
//     </>
//   )
// }



'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, BookOpen, GraduationCap,
  Swords, Bot, RotateCcw, ShieldAlert, Settings,
  HelpCircle, LogOut, ChevronLeft, Plus, Menu, X,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { initials, avatarColor } from '@/lib/helpers'
import { ROUTES, SIDEBAR_NAV } from '@/lib/constants'

const BOTTOM = [
  { label: 'Settings', path: ROUTES.SETTINGS, icon: Settings },
  { label: 'Support',  path: ROUTES.SUPPORT,  icon: HelpCircle },
]

export default function Sidebar({ subtitle }) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const w = collapsed ? 68 : 240

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(o => !o)}
        style={{ position:'fixed', top:16, left:16, zIndex:200, display:'none', background:'rgba(255,255,255,0.08)', border:'none', borderRadius:8, padding:8, cursor:'pointer', color:'#fff' }}
        className="md-hamburger"
      >
        {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
      </button>

      {/* Overlay on mobile */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:90, display:'none' }} className="md-overlay"/>
      )}

      {/* Sidebar */}
      <aside style={{
        position:'fixed', top:0, bottom:0, left:0,
        width: w,
        background:'#0a0a0a',
        borderRight:'1px solid rgba(255,255,255,0.07)',
        display:'flex', flexDirection:'column',
        transition:'width 0.25s cubic-bezier(0.4,0,0.2,1)',
        overflow:'hidden', zIndex:100,
      }}>

        {/* Logo Container Area */}
        <div style={{ padding: collapsed ? '20px 16px' : '20px 20px', height: '140px', borderBottom:'1px solid rgba(255,255,255,0.07)', flexShrink:0, position: 'relative' }}>
          <div onClick={() => router.push(ROUTES.DASHBOARD)} style={{ display:'flex', flexDirection: 'column', cursor:'pointer', width: '100%', height: '100%' }}>
            
            {/* Embedded Custom Image Asset */}
            <div style={{ position:'absolute', top:10, left: collapsed ? 12 : 28, display:'flex', alignItems:'center', zIndex:10, transition: 'left 0.25s' }}>
              <div style={{ position: 'relative', width: collapsed ? '44px' : '150px', height: '90px' }}>
                <Image 
                  src="/Laura2.png" 
                  alt="MindBridge Logo" 
                  fill
                  priority
                  sizes="150px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>

            {/* Subtitle Tracking Label Metatags */}
            {!collapsed && subtitle && (
              <div style={{ position: 'absolute', bottom: 12, left: 28, fontSize:'10px', color:'rgba(255,255,255,0.35)', letterSpacing:'0.08em', textTransform:'uppercase', fontWeight: 600 }}>
                {subtitle}
              </div>
            )}
          </div>
        </div>

        {/* Nav items */}
        <nav style={{ flex:1, padding:'12px 10px', overflowY:'auto', overflowX:'hidden' }}>
          {SIDEBAR_NAV.map(({ label, path, icon: IconName }) => {
            const Icon = { LayoutDashboard, Users, BookOpen, GraduationCap, Swords, Bot, RotateCcw, ShieldAlert }[IconName] || LayoutDashboard
            const isActive = pathname === path

            return (
              <Link key={path} href={path}
                style={{
                  display:'flex', alignItems:'center', gap:12,
                  padding: collapsed ? '10px 12px' : '9px 14px',
                  borderRadius:8, marginBottom:2, textDecoration:'none',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.48)',
                  background: isActive ? 'rgba(255,255,255,0.09)' : 'transparent',
                  fontSize:'13px', fontWeight: isActive ? 500 : 400,
                  transition:'all 0.15s', whiteSpace:'nowrap', overflow:'hidden',
                }}
              >
                <Icon size={17} style={{ flexShrink:0 }}/>
                {!collapsed && label}
              </Link>
            )
          })}
        </nav>

        {/* Start New Session */}
        {!collapsed && (
          <div style={{ padding:'0 10px 12px' }}>
            <button
              onClick={() => router.push(ROUTES.BATTLE)}
              style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'10px', borderRadius:10, background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', fontSize:'13px', fontWeight:500, cursor:'pointer', transition:'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.13)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}
            >
              <Plus size={15}/> Start New Session
            </button>
          </div>
        )}

        {/* Bottom nav */}
        <div style={{ padding:'0 10px 8px', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
          {BOTTOM.map(({ label, path, icon: Icon }) => {
            const isActive = pathname === path
            return (
              <Link key={path} href={path}
                style={{
                  display:'flex', alignItems:'center', gap:12,
                  padding: collapsed ? '9px 12px' : '9px 14px',
                  borderRadius:8, marginTop:2, textDecoration:'none',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                  background: isActive ? 'rgba(255,255,255,0.09)' : 'transparent',
                  fontSize:'13px', transition:'all 0.15s', whiteSpace:'nowrap',
                }}
              >
                <Icon size={17} style={{ flexShrink:0 }}/>{!collapsed && label}
              </Link>
            )
          })}

          {/* Logout */}
          <button
            onClick={logout}
            style={{ display:'flex', alignItems:'center', gap:12, padding: collapsed ? '9px 12px':'9px 14px', borderRadius:8, marginTop:2, background:'none', border:'none', color:'rgba(255,255,255,0.45)', fontSize:'13px', cursor:'pointer', width:'100%', transition:'color 0.15s', whiteSpace:'nowrap' }}
            onMouseEnter={e => e.currentTarget.style.color='#f87171'}
            onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.45)'}
          >
            <LogOut size={17} style={{ flexShrink:0 }}/>{!collapsed && 'Logout'}
          </button>
        </div>

        {/* User + collapse toggle */}
        <div style={{ padding:'12px 10px 16px', borderTop:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', justifyContent: collapsed ? 'center' : 'space-between' }}>
          {!collapsed && user && (
            <div style={{ display:'flex', alignItems:'center', gap:8, overflow:'hidden' }}>
              <div style={{ width:28, height:28, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:600, color:'#fff', flexShrink:0, background: avatarColor(user.full_name || '') }}>
                {initials(user.full_name || 'U')}
              </div>
              <div style={{ minWidth:0 }}>
                <div style={{ fontSize:'12px', fontWeight:500, color:'#fff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user.full_name}</div>
                <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.35)' }}>Student</div>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(c => !c)}
            style={{ background:'rgba(255,255,255,0.06)', border:'none', borderRadius:6, padding:'5px 7px', cursor:'pointer', color:'rgba(255,255,255,0.45)', display:'flex', alignItems:'center', transition:'all 0.15s', flexShrink:0 }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.color='#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.color='rgba(255,255,255,0.45)' }}
          >
            <ChevronLeft size={14} style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition:'transform 0.25s' }}/>
          </button>
        </div>
      </aside>

      {/* Responsive styles injected */}
      <style>{`
        @media (max-width: 768px) {
          .md-hamburger { display: flex !important; }
          .md-overlay   { display: block !important; }
        }
      `}</style>
    </>
  )
}