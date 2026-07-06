'use client'

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: "'DM Sans',sans-serif" }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{ fontSize: '120px', fontWeight: 700, color: 'rgba(255,255,255,0.08)', lineHeight: 1 }}>
          404
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.5rem', fontWeight: 400, color: '#fff', margin: '1rem 0' }}>
          Page Not Found
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.7, margin: '0 0 2rem' }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={() => window.location.href = '/dashboard'} style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '11px 24px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            Go to Dashboard
          </button>
          <button onClick={() => window.location.href = '/'} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 24px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            Home
          </button>
        </div>
      </div>
    </div>
  )
}
