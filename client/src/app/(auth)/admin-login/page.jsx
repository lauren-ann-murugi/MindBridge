


'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Shield, AlertCircle, Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const errs = {}
    if (!email.trim()) {
      errs.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Enter a valid email address.'
    }
    if (!password) {
      errs.password = 'Password is required.'
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.'
    }
    return errs
  }

  // ── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const errs = validate()
    if (Object.keys(errs).length) { setFieldErrors(errs); return }
    setFieldErrors({})
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Invalid credentials.')
      }

      // Check if user is an admin
      if (data.user && data.user.role === 'admin') {
        localStorage.setItem('admin_token', data.access_token)
        if (rememberMe) localStorage.setItem('admin_session', email)
        router.push('/admin/dashboard')
      } else {
        setError('Access denied. This account does not have administrator privileges.')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // ── Style tokens ─────────────────────────────────────────────────────────────
  const S = {
    bg: '#020b14', surface: '#091d33', surface2: '#0f1f3a', surface3: '#1a2d47',
    accent: '#3b82f6', accent2: '#60a5fa', text: '#f1f5f9', muted: '#94a3b8',
    border: 'rgba(255,255,255,0.07)', danger: '#f87171', success: '#34d399',
  }

  const inputStyle = (hasError) => ({
    width: '100%', background: S.bg, border: `1px solid ${hasError ? S.danger : S.border}`,
    borderRadius: 10, padding: '11px 14px', color: S.text, fontSize: 14, outline: 'none',
    fontFamily: 'Inter, system-ui, sans-serif', transition: 'border-color .2s, box-shadow .2s',
    boxSizing: 'border-box',
  })

  return (
    <div style={{ minHeight: '100vh', background: S.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif', padding: '24px 16px', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 700, height: 700, background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -200, right: -100, width: 500, height: 500, background: 'radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 420, background: S.surface, borderRadius: 18, border: `1px solid ${S.border}`, boxShadow: '0 24px 64px rgba(0,0,0,0.5)', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${S.accent}, ${S.accent2}, transparent)` }} />

        <div style={{ padding: '36px 36px 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: `linear-gradient(135deg, rgba(59,130,246,0.2), rgba(96,165,250,0.1))`, border: `1px solid rgba(59,130,246,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 0 24px rgba(59,130,246,0.15)' }}>
              <Shield size={26} style={{ color: S.accent2 }} />
            </div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: S.text, letterSpacing: '-0.3px' }}>Admin Portal</h1>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: S.muted }}>Sign in to access the dashboard</p>
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: 'rgba(248,113,113,0.08)', border: `1px solid rgba(248,113,113,0.25)`, borderRadius: 10, padding: '11px 14px', marginBottom: 20 }}>
              <AlertCircle size={15} style={{ color: S.danger, flexShrink: 0, marginTop: 1 }} />
              <p style={{ margin: 0, fontSize: 13, color: S.danger, lineHeight: 1.45 }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: S.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email address</label>
              <input type="email" value={email} onChange={e => { setEmail(e.target.value); setFieldErrors(p => ({ ...p, email: undefined })) }} placeholder="admin@example.com" disabled={isLoading} style={inputStyle(!!fieldErrors.email)} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: S.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); setFieldErrors(p => ({ ...p, password: undefined })) }} placeholder="••••••••" disabled={isLoading} style={{ ...inputStyle(!!fieldErrors.password), paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPassword(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: S.muted }} tabIndex={-1}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '12px', borderRadius: 10, border: 'none', background: isLoading ? 'rgba(59,130,246,0.5)' : `linear-gradient(135deg, ${S.accent}, #2563eb)`, color: '#fff', fontSize: 14, fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {isLoading ? <><Loader2 size={16} style={{ animation: 'spin 0.8s linear infinite' }} /> Authenticating...</> : <> <Shield size={15} /> Sign in to Admin </>}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0 20px' }}>
            <div style={{ flex: 1, height: 1, background: S.border }} />
            <span style={{ fontSize: 11, color: S.muted, whiteSpace: 'nowrap' }}>SECURE ACCESS ONLY</span>
            <div style={{ flex: 1, height: 1, background: S.border }} />
          </div>

          <div style={{ background: S.surface2, border: `1px solid ${S.border}`, borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Shield size={14} style={{ color: S.muted, flexShrink: 0, marginTop: 1 }} />
            <p style={{ margin: 0, fontSize: 12, color: S.muted, lineHeight: 1.5 }}>This portal is restricted to authorized administrators. All login attempts are monitored and logged.</p>
          </div>
        </div>

        <div style={{ padding: '14px 36px', borderTop: `1px solid ${S.border}`, background: S.surface2, textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 12, color: S.muted }}>Need access? <button type="button" onClick={() => router.push('/contact')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.accent2, fontSize: 12, padding: 0 }}>Contact your system administrator</button></p>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
