
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail]     = useState('')
  const [password, setPw]     = useState('')
  const [showPw, setShowPw]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { 
      setError('Please fill in all fields')
      return 
    }
    setLoading(true)
    try { 
      await login(email, password) 
    } catch (err) { 
      setError(err.response?.data?.message || 'Invalid credentials')
      setLoading(false) 
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#000', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden', fontFamily:"'DM Sans',sans-serif", padding:'2rem 1.5rem' }}>
      {/* Rays */}
      <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
        {[{ top:'30%',o:.022,h:90 },{ top:'50%',o:.016,h:120 },{ top:'68%',o:.012,h:55 }].map((r,i)=>(
          <div key={i} style={{ position:'absolute', left:'-10%', width:'130%', top:r.top, height:r.h, background:`linear-gradient(90deg,transparent 10%,rgba(255,255,255,${r.o}) 50%,transparent 90%)`, transform:'rotate(32deg)' }}/>
        ))}
      </div>

      {/* Logo */}
      <div style={{ position:'absolute', top:20, left:28, display:'flex', alignItems:'center', zIndex:10 }}>
        <div style={{ position: 'relative', width: '150px', height: '100px' }}>
          <Image 
            src="/Laura2.png" 
            alt="MindBridge Logo" 
            fill
            priority
            sizes="100px"
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>

      <div style={{ position:'relative', zIndex:10, width:'100%', maxWidth:420, animation:'slideUp 0.4s ease both' }}>
        <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}`}</style>

        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.25rem,5vw,3.5rem)', fontWeight:400, color:'#fff', margin:0 }}>Welcome back</h1>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'14px', marginTop:'0.6rem' }}>Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:14, padding:'2.25rem', backdropFilter:'blur(8px)' }}>
          {error && (
            <div style={{ background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.3)', borderRadius:8, padding:'10px 14px', fontSize:'13px', color:'#f87171', marginBottom:'1.5rem' }}>{error}</div>
          )}

          <div style={{ marginBottom:'1.5rem' }}>
            <label style={{ display:'block', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:8, fontWeight:500 }}>Email Address</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="name@institution.edu" autoComplete="email"
              style={{ width:'100%', background:'transparent', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, padding:'12px 14px', color:'#fff', fontSize:'14px', outline:'none', boxSizing:'border-box', transition:'border-color 0.15s' }}
              onFocus={e=>e.target.style.borderColor='rgba(255,255,255,0.35)'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.12)'}
            />
          </div>

          <div style={{ marginBottom:'2rem' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
              <label style={{ fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', fontWeight:500 }}>Password</label>
              <a href="#" style={{ fontSize:'11.5px', color:'rgba(255,255,255,0.4)', textDecoration:'none' }}
                onMouseEnter={e=>e.target.style.color='#fff'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.4)'}
              >Forgot password?</a>
            </div>
            <div style={{ position:'relative' }}>
              <input value={password} onChange={e=>setPw(e.target.value)} type={showPw?'text':'password'} placeholder="••••••••" autoComplete="current-password"
                style={{ width:'100%', background:'transparent', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, padding:'12px 40px 12px 14px', color:'#fff', fontSize:'14px', outline:'none', boxSizing:'border-box', transition:'border-color 0.15s' }}
                onFocus={e=>e.target.style.borderColor='rgba(255,255,255,0.35)'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.12)'}
              />
              <button type="button" onClick={()=>setShowPw(p=>!p)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.4)', display:'flex' }}>
                {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            style={{ width:'100%', background: loading?'rgba(255,255,255,0.7)':'#fff', color:'#000', border:'none', borderRadius:9, padding:'13px', fontSize:'14px', fontWeight:500, cursor: loading?'wait':'pointer', transition:'all 0.15s' }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          <p style={{ textAlign:'center', marginTop:'1.25rem', fontSize:'13px', color:'rgba(255,255,255,0.35)', marginBottom:0 }}>
            New to MindBridge? <Link href="/register/step1" style={{ color:'rgba(255,255,255,0.75)', textDecoration:'none' }}>Create account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}