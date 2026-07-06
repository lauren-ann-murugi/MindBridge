'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Users, Bell, Settings, Wrench, HelpCircle, Menu, X } from 'lucide-react'

const ADMIN_MENU = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: BarChart3 },
  { name: 'Sessions', path: '/admin/session', icon: Users },
  { name: 'Notifications', path: '/admin/notifications', icon: Bell },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
  { name: 'Repair', path: '/admin/repair', icon: Wrench },
  { name: 'Support', path: '/admin/support', icon: HelpCircle },
]

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

  return (
    <>
      <aside style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: 200,
        background: '#080808',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        transition: 'transform 0.3s ease',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', color: '#fff', lineHeight: 1.2 }}>MindBridge</div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>Admin Suite</div>
        </div>

        {/* Menu */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '16px 8px' }}>
          {ADMIN_MENU.map(item => {
            const Icon = item.icon
            const isActive = pathname === item.path

            return (
              <Link 
                key={item.name} 
                href={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  marginBottom: 6,
                  borderRadius: 10,
                  background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                  fontSize: '13px',
                  fontWeight: isActive ? 500 : 400,
                  cursor: 'pointer',
                }}
              >
                <Icon size={16} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '16px 8px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 8, textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>v1.0.0</p>
          </div>
        </div>
      </aside>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: '#fff',
          border: 'none',
          cursor: 'pointer',
          zIndex: 99,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </>
  )
}