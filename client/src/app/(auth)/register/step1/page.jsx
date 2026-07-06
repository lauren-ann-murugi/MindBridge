


// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import Image from 'next/image'
// import { Eye, EyeOff } from 'lucide-react'
// import { useAuth } from '@/context/AuthContext'

// export default function RegisterStep1() {
//   const { saveRegStep1 } = useAuth()
//   const router = useRouter()
//   const [form, setForm]         = useState({ fullName:'', email:'', password:'' })
//   const [showPw, setShowPw]     = useState(false)
//   const [errors, setErrors]     = useState({})
//   const [loading, setLoading]   = useState(false)

//   const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

//   const validate = () => {
//     const e = {}
//     if (!form.fullName.trim())          e.fullName = 'Full name is required'
//     if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
//     if (form.password.length < 8)       e.password = 'Min 8 characters'
//     setErrors(e)
//     return Object.keys(e).length === 0
//   }

//   const handleSubmit = (ev) => {
//     ev.preventDefault()
//     if (!validate()) return
//     setLoading(true)
//     saveRegStep1({ full_name: form.fullName, email: form.email, password: form.password })
//     setTimeout(() => { 
//       setLoading(false)
//       router.push('/register/academic') 
//     }, 300)
//   }

//   return (
//     <div style={{ minHeight:'100vh', background:'#000', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden', fontFamily:"'DM Sans',sans-serif" }}>
//       {/* Light ray layers */}
//       <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
//         {[
//           { top:'28%', opacity:0.022, height:90  },
//           { top:'43%', opacity:0.018, height:130 },
//           { top:'60%', opacity:0.013, height:55  },
//           { top:'74%', opacity:0.010, height:70  },
//         ].map((r, i) => (
//           <div key={i} style={{ position:'absolute', left:'-10%', width:'130%', top:r.top, height:r.height, background:`linear-gradient(90deg,transparent 10%,rgba(255,255,255,${r.opacity}) 50%,transparent 90%)`, transform:'rotate(32deg)', transformOrigin:'left center' }}/>
//         ))}
//       </div>

//       {/* Header */}
//       <header style={{ position:'relative', zIndex:10, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 28px' }}>
//         {/* Logo */}
//         <div style={{ display:'flex', alignItems:'center', zIndex:10 }}>
//           <div style={{ position: 'relative', width: '150px', height: '100px' }}>
//             <Image 
//               src="/Laura2.png" 
//               alt="MindBridge Logo" 
//               fill
//               priority
//               sizes="100px"
//               style={{ objectFit: 'contain' }}
//             />
//           </div>
//         </div>
//         <span style={{ fontSize:'13px', color:'rgba(255,255,255,0.45)' }}>Step 1 of 2</span>
//       </header>

//       {/* Main */}
//       <main style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem 1.5rem', position:'relative', zIndex:10 }}>
//         <div style={{ textAlign:'center', marginBottom:'3rem' }}>
//           <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,6vw,4.5rem)', fontWeight:400, color:'#fff', margin:0, lineHeight:1.05 }}>
//             Join the Future of<br/>Learning
//           </h1>
//           <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'14.5px', marginTop:'1rem', maxWidth:'32rem', lineHeight:1.65 }}>
//             Create your workspace and begin your journey into collaborative AI intelligence.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} style={{ width:'100%', maxWidth:480, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:14, padding:'2.25rem', backdropFilter:'blur(8px)' }}>
//           {/* Full Name */}
//           <div style={{ marginBottom:'1.5rem' }}>
//             <label style={{ display:'block', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:8, fontWeight:500 }}>Full Name</label>
//             <input value={form.fullName} onChange={set('fullName')} placeholder="Enter your full name"
//               style={{ width:'100%', background:'transparent', border:`1px solid ${errors.fullName ? '#f87171' :'rgba(255,255,255,0.12)'}`, borderRadius:8, padding:'12px 14px', color:'#fff', fontSize:'14px', outline:'none', transition:'border-color 0.15s', boxSizing:'border-box' }}
//               onFocus={e=>e.target.style.borderColor='rgba(255,255,255,0.35)'} onBlur={e=>e.target.style.borderColor=errors.fullName?'#f87171':'rgba(255,255,255,0.12)'}
//             />
//             {errors.fullName && <p style={{ color:'#f87171', fontSize:'11.5px', marginTop:4, marginBottom:0 }}>{errors.fullName}</p>}
//           </div>

//           {/* Email */}
//           <div style={{ marginBottom:'1.5rem' }}>
//             <label style={{ display:'block', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:8, fontWeight:500 }}>Email Address</label>
//             <input value={form.email} onChange={set('email')} type="email" placeholder="name@institution.edu"
//               style={{ width:'100%', background:'transparent', border:`1px solid ${errors.email?'#f87171':'rgba(255,255,255,0.12)'}`, borderRadius:8, padding:'12px 14px', color:'#fff', fontSize:'14px', outline:'none', transition:'border-color 0.15s', boxSizing:'border-box' }}
//               onFocus={e=>e.target.style.borderColor='rgba(255,255,255,0.35)'} onBlur={e=>e.target.style.borderColor=errors.email?'#f87171':'rgba(255,255,255,0.12)'}
//             />
//             {errors.email && <p style={{ color:'#f87171', fontSize:'11.5px', marginTop:4, marginBottom:0 }}>{errors.email}</p>}
//           </div>

//           {/* Password */}
//           <div style={{ marginBottom:'2rem' }}>
//             <label style={{ display:'block', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:8, fontWeight:500 }}>Password</label>
//             <div style={{ position:'relative' }}>
//               <input value={form.password} onChange={set('password')} type={showPw?'text':'password'} placeholder="••••••••"
//                 style={{ width:'100%', background:'transparent', border:`1px solid ${errors.password?'#f87171':'rgba(255,255,255,0.12)'}`, borderRadius:8, padding:'12px 42px 12px 14px', color:'#fff', fontSize:'14px', outline:'none', transition:'border-color 0.15s', boxSizing:'border-box' }}
//                 onFocus={e=>e.target.style.borderColor='rgba(255,255,255,0.35)'} onBlur={e=>e.target.style.borderColor=errors.password?'#f87171':'rgba(255,255,255,0.12)'}
//               />
//               <button type="button" onClick={()=>setShowPw(p=>!p)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.4)', padding:2, display:'flex' }}>
//                 {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
//               </button>
//             </div>
//             {errors.password && <p style={{ color:'#f87171', fontSize:'11.5px', marginTop:4, marginBottom:0 }}>{errors.password}</p>}
//           </div>

//           <button type="submit" disabled={loading}
//             style={{ width:'100%', background: loading?'rgba(255,255,255,0.7)':'#fff', color:'#000', border:'none', borderRadius:9, padding:'13px', fontSize:'14px', fontWeight:500, cursor: loading?'wait':'pointer', transition:'all 0.15s' }}
//           >
//             {loading ? 'Continuing…' : 'Continue to Academic Setup'}
//           </button>

//           <p style={{ textAlign:'center', marginTop:'1.25rem', fontSize:'13px', color:'rgba(255,255,255,0.35)', marginBottom:0 }}>
//             Already have an account? <Link href="/login" style={{ color:'rgba(255,255,255,0.75)', textDecoration:'none' }}>Log in</Link>
//           </p>
//         </form>
//       </main>
//     </div>
//   )
// }



'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function RegisterStep1() {
  const { saveRegStep1 } = useAuth()
  const router = useRouter()
  const [form, setForm]         = useState({ fullName:'', email:'', password:'' })
  const [showPw, setShowPw]     = useState(false)
  const [errors, setErrors]     = useState({})
  const [loading, setLoading]   = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.fullName.trim())          e.fullName = 'Full name is required'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (form.password.length < 8)       e.password = 'Min 8 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    saveRegStep1({ full_name: form.fullName, email: form.email, password: form.password })
    setTimeout(() => { 
      setLoading(false)
      router.push('/register/academic') 
    }, 300)
  }

  return (
    <div style={{ minHeight:'100vh', background:'#000', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden', fontFamily:"'DM Sans',sans-serif" }}>
      {/* Light ray layers */}
      <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
        {[
          { top:'28%', opacity:0.022, height:90  },
          { top:'43%', opacity:0.018, height:130 },
          { top:'60%', opacity:0.013, height:55  },
          { top:'74%', opacity:0.010, height:70  },
        ].map((r, i) => (
          <div key={i} style={{ position:'absolute', left:'-10%', width:'130%', top:r.top, height:r.height, background:`linear-gradient(90deg,transparent 10%,rgba(255,255,255,${r.opacity}) 50%,transparent 90%)`, transform:'rotate(32deg)', transformOrigin:'left center' }}/>
        ))}
      </div>

      {/* Header */}
      <header style={{ position:'relative', zIndex:10, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 28px' }}>
        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', zIndex:10 }}>
          <div style={{ position: 'relative', width: '150px', height: '100px' }}>
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
        <span style={{ fontSize:'13px', color:'rgba(255,255,255,0.45)' }}>Step 1 of 2</span>
      </header>

      {/* Main */}
      <main style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem 1.5rem', position:'relative', zIndex:10 }}>
        <div style={{ textAlign:'center', marginBottom:'3rem' }}>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,6vw,4.5rem)', fontWeight:400, color:'#fff', margin:0, lineHeight:1.05 }}>
            Join the Future of<br/>Learning
          </h1>
          <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'14.5px', marginTop:'1rem', maxWidth:'32rem', lineHeight:1.65 }}>
            Create your workspace and begin your journey into collaborative AI intelligence.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ width:'100%', maxWidth:480, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:14, padding:'2.25rem', backdropFilter:'blur(8px)' }}>
          {/* Full Name */}
          <div style={{ marginBottom:'1.5rem' }}>
            <label style={{ display:'block', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:8, fontWeight:500 }}>Full Name</label>
            <input value={form.fullName} onChange={set('fullName')} placeholder="Enter your full name"
              style={{ width:'100%', background:'transparent', border:`1px solid ${errors.fullName ? '#f87171' :'rgba(255,255,255,0.12)'}`, borderRadius:8, padding:'12px 14px', color:'#fff', fontSize:'14px', outline:'none', transition:'border-color 0.15s', boxSizing:'border-box' }}
              onFocus={e=>e.target.style.borderColor='rgba(255,255,255,0.35)'} onBlur={e=>e.target.style.borderColor=errors.fullName?'#f87171':'rgba(255,255,255,0.12)'}
            />
            {errors.fullName && <p style={{ color:'#f87171', fontSize:'11.5px', marginTop:4, marginBottom:0 }}>{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div style={{ marginBottom:'1.5rem' }}>
            <label style={{ display:'block', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:8, fontWeight:500 }}>Email Address</label>
            <input value={form.email} onChange={set('email')} type="email" placeholder="name@institution.edu"
              style={{ width:'100%', background:'transparent', border:`1px solid ${errors.email?'#f87171':'rgba(255,255,255,0.12)'}`, borderRadius:8, padding:'12px 14px', color:'#fff', fontSize:'14px', outline:'none', transition:'border-color 0.15s', boxSizing:'border-box' }}
              onFocus={e=>e.target.style.borderColor='rgba(255,255,255,0.35)'} onBlur={e=>e.target.style.borderColor=errors.email?'#f87171':'rgba(255,255,255,0.12)'}
            />
            {errors.email && <p style={{ color:'#f87171', fontSize:'11.5px', marginTop:4, marginBottom:0 }}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div style={{ marginBottom:'2rem' }}>
            <label style={{ display:'block', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:8, fontWeight:500 }}>Password</label>
            <div style={{ position:'relative' }}>
              <input value={form.password} onChange={set('password')} type={showPw?'text':'password'} placeholder="••••••••"
                style={{ width:'100%', background:'transparent', border:`1px solid ${errors.password?'#f87171':'rgba(255,255,255,0.12)'}`, borderRadius:8, padding:'12px 42px 12px 14px', color:'#fff', fontSize:'14px', outline:'none', transition:'border-color 0.15s', boxSizing:'border-box' }}
                onFocus={e=>e.target.style.borderColor='rgba(255,255,255,0.35)'} onBlur={e=>e.target.style.borderColor=errors.password?'#f87171':'rgba(255,255,255,0.12)'}
              />
              <button type="button" onClick={()=>setShowPw(p=>!p)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.4)', padding:2, display:'flex' }}>
                {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
            {errors.password && <p style={{ color:'#f87171', fontSize:'11.5px', marginTop:4, marginBottom:0 }}>{errors.password}</p>}
          </div>

          <button type="submit" disabled={loading}
            style={{ width:'100%', background: loading?'rgba(255,255,255,0.7)':'#fff', color:'#000', border:'none', borderRadius:9, padding:'13px', fontSize:'14px', fontWeight:500, cursor: loading?'wait':'pointer', transition:'all 0.15s' }}
          >
            {loading ? 'Continuing…' : 'Continue to Academic Setup'}
          </button>

          <p style={{ textAlign:'center', marginTop:'1.25rem', fontSize:'13px', color:'rgba(255,255,255,0.35)', marginBottom:0 }}>
            Already have an account? <Link href="/login" style={{ color:'rgba(255,255,255,0.75)', textDecoration:'none' }}>Log in</Link>
          </p>
        </form>
      </main>
    </div>
  )
}