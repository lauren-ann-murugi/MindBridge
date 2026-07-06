// 'use client'
// import { useState } from 'react'
// import { Save } from 'lucide-react'

// export default function AdminSettings() {
//   const [settings, setSettings] = useState({
//     apiProvider: 'grok',
//     maxUsers: '50000',
//     maintenanceMode: false,
//     emailNotifications: true,
//   })

//   const handleSave = () => {
//     console.log('Settings saved:', settings)
//   }

//   return (
//     <main style={{ padding: '32px 28px', overflow: 'auto', maxWidth: 800 }}>
//       <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.5rem', fontWeight: 400, color: '#fff', margin: '0 0 12px' }}>
//         Admin Settings
//       </h1>
//       <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, margin: '0 0 28px' }}>
//         Configure platform behavior
//       </p>

//       <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
//         {/* General Settings */}
//         <div>
//           <h2 style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 600, color: '#fff' }}>General</h2>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
//             <div>
//               <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>
//                 API Provider
//               </label>
//               <select
//                 value={settings.apiProvider}
//                 onChange={e => setSettings({ ...settings, apiProvider: e.target.value })}
//                 style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14 }}
//               >
//                 <option>grok</option>
//                 <option>openai</option>
//                 <option>claude</option>
//               </select>
//             </div>

//             <div>
//               <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>
//                 Max Users
//               </label>
//               <input
//                 type="number"
//                 value={settings.maxUsers}
//                 onChange={e => setSettings({ ...settings, maxUsers: e.target.value })}
//                 style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14 }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Features */}
//         <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 20 }}>
//           <h2 style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 600, color: '#fff' }}>Features</h2>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//             {[{ label: 'Maintenance Mode', key: 'maintenanceMode' }, { label: 'Email Notifications', key: 'emailNotifications' }].map(feature => (
//               <label key={feature.key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, cursor: 'pointer' }}>
//                 <input
//                   type="checkbox"
//                   checked={settings[feature.key]}
//                   onChange={e => setSettings({ ...settings, [feature.key]: e.target.checked })}
//                   style={{ width: 18, height: 18, cursor: 'pointer' }}
//                 />
//                 <span style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>{feature.label}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <button
//           onClick={handleSave}
//           style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12 }}
//         >
//           <Save size={16} /> Save Settings
//         </button>
//       </div>
//     </main>
//   )
// }






'use client'

import { useState } from 'react'
import { Save, AlertCircle, Toggle2 } from 'lucide-react'

export default function Settings() {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    emailNotifications: true,
    autoBackup: true,
    maxSessionDuration: '120',
    maxUsersPerSession: '30',
  })
  const [saved, setSaved] = useState(false)

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleInputChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ padding: '32px 28px' }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.25rem', fontWeight: 400, color: '#fff', margin: '0 0 28px' }}>
        System Settings
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
        {/* Settings */}
        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Maintenance Mode */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#fff' }}>Maintenance Mode</h3>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Disable access for maintenance</p>
              </div>
              <button
                onClick={() => handleToggle('maintenanceMode')}
                style={{
                  background: settings.maintenanceMode ? 'rgba(248, 113, 113, 0.2)' : 'rgba(74, 222, 128, 0.2)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 16px',
                  color: settings.maintenanceMode ? '#f87171' : '#4ade80',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 12,
                }}
              >
                {settings.maintenanceMode ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>

          {settings.maintenanceMode && (
            <div style={{ background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.2)', borderRadius: 10, padding: 12, display: 'flex', gap: 10 }}>
              <AlertCircle size={16} style={{ color: '#f87171', flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: 12, color: 'rgba(248, 113, 113, 0.8)' }}>Platform is currently in maintenance mode. Users cannot access the system.</p>
            </div>
          )}

          {/* Email Notifications */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#fff' }}>Email Notifications</h3>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Send notification emails to users</p>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                style={{
                  background: settings.emailNotifications ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 16px',
                  color: settings.emailNotifications ? '#4ade80' : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 12,
                }}
              >
                {settings.emailNotifications ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>

          {/* Auto Backup */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#fff' }}>Auto Backup</h3>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Daily database backup at 2 AM</p>
              </div>
              <button
                onClick={() => handleToggle('autoBackup')}
                style={{
                  background: settings.autoBackup ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 16px',
                  color: settings.autoBackup ? '#4ade80' : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 12,
                }}
              >
                {settings.autoBackup ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>

          {/* Max Session Duration */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 8, textTransform: 'uppercase' }}>Max Session Duration (minutes)</label>
            <input
              type="number"
              value={settings.maxSessionDuration}
              onChange={(e) => handleInputChange('maxSessionDuration', e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, outline: 'none' }}
            />
          </div>

          {/* Max Users Per Session */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 8, textTransform: 'uppercase' }}>Max Users Per Session</label>
            <input
              type="number"
              value={settings.maxUsersPerSession}
              onChange={(e) => handleInputChange('maxUsersPerSession', e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, outline: 'none' }}
            />
          </div>

          <button
            onClick={handleSave}
            style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12 }}
          >
            <Save size={16} /> {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>

        {/* Info */}
        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
          <h3 style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 600, color: '#fff' }}>System Info</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12 }}>
            <div>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Version:</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>1.0.0</span>
            </div>
            <div>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Status:</span>
              <span style={{ color: '#4ade80', fontWeight: 600 }}>Healthy</span>
            </div>
            <div>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Last Backup:</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}