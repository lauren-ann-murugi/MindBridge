// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Image from 'next/image'
// import { useAuth } from '@/context/AuthContext'
// import { ACADEMIC_LEVELS } from '@/lib/constants' // Updated alias path to match your constants file location

// export default function RegisterStep2() {
//   const { getRegStep1, register } = useAuth()
//   const router = useRouter()
//   const [form, setForm] = useState({ institution:'', course:'', level:'' })
//   const [errors, setErrors] = useState({})
//   const [loading, setLoading] = useState(false)

//   const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

//   const validate = () => {
//     const e = {}
//     if (!form.institution.trim()) e.institution = 'Institution name is required'
//     if (!form.course.trim())      e.course      = 'Course / field of study is required'
//     if (!form.level)              e.level       = 'Please select your academic level'
//     setErrors(e)
//     return Object.keys(e).length === 0
//   }

//   const handleSubmit = async (ev) => {
//     ev.preventDefault()
//     if (!validate()) return
//     const step1 = getRegStep1()
//     if (!step1.email) { 
//       router.push('/register/step1') 
//       return 
//     }
//     setLoading(true)
//     try {
//       await register(step1, { institution: form.institution, course: form.course, academic_level: form.level })
//     } catch { 
//       setLoading(false) 
//     }
//   }

//   const inputStyle = (hasErr) => ({
//     width:'100%', background:'transparent',
//     border:`1px solid ${hasErr?'#f87171':'rgba(255,255,255,0.12)'}`,
//     borderRadius:8, padding:'12px 14px', color:'#fff',
//     fontSize:'14px', outline:'none', transition:'border-color 0.15s', boxSizing:'border-box',
//   })

//   return (
//     <div style={{ minHeight:'100vh', background:'#000', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden', fontFamily:"'DM Sans',sans-serif" }}>
//       {/* Same light ray bg as Step 1 */}
//       <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
//         {[{ top:'25%',opacity:.022,height:90 },{ top:'42%',opacity:.016,height:130 },{ top:'62%',opacity:.012,height:55 }].map((r,i)=>(
//           <div key={i} style={{ position:'absolute', left:'-10%', width:'130%', top:r.top, height:r.height, background:`linear-gradient(90deg,transparent 10%,rgba(255,255,255,${r.opacity}) 50%,transparent 90%)`, transform:'rotate(32deg)' }}/>
//         ))}
//       </div>

//       <header style={{ position:'relative', zIndex:10, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 28px' }}>
//         {/* Logo Wrapper */}
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
//         <span style={{ fontSize:'13px', color:'rgba(255,255,255,0.45)' }}>Step 2 of 2</span>
//       </header>

//       <main style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem 1.5rem', position:'relative', zIndex:10 }}>
//         <div style={{ textAlign:'center', marginBottom:'3rem' }}>
//           <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,6vw,4rem)', fontWeight:400, color:'#fff', margin:0, lineHeight:1.05 }}>
//             Academic Setup
//           </h1>
//           <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'14.5px', marginTop:'1rem', maxWidth:'32rem', lineHeight:1.65 }}>
//             Tailor your collaborative environment to your specific field of study.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} style={{ width:'100%', maxWidth:480, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:14, padding:'2.25rem', backdropFilter:'blur(8px)' }}>
//           {/* Institution */}
//           <div style={{ marginBottom:'1.5rem' }}>
//             <label style={{ display:'block', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:8, fontWeight:500 }}>Institution Name</label>
//             <input value={form.institution} onChange={set('institution')} placeholder="e.g. Stanford University"
//               style={inputStyle(errors.institution)}
//               onFocus={e=>e.target.style.borderColor='rgba(255,255,255,0.35)'} onBlur={e=>e.target.style.borderColor=errors.institution?'#f87171':'rgba(255,255,255,0.12)'}
//             />
//             {errors.institution && <p style={{ color:'#f87171', fontSize:'11.5px', marginTop:4, marginBottom:0 }}>{errors.institution}</p>}
//           </div>

//           {/* Course */}
//           <div style={{ marginBottom:'1.5rem' }}>
//             <label style={{ display:'block', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:8, fontWeight:500 }}>Major / Field of Study / Course</label>
//             <input value={form.course} onChange={set('course')} placeholder="e.g. Computer Science"
//               style={inputStyle(errors.course)}
//               onFocus={e=>e.target.style.borderColor='rgba(255,255,255,0.35)'} onBlur={e=>e.target.style.borderColor=errors.course?'#f87171':'rgba(255,255,255,0.12)'}
//             />
//             {errors.course && <p style={{ color:'#f87171', fontSize:'11.5px', marginTop:4, marginBottom:0 }}>{errors.course}</p>}
//           </div>

//           {/* Academic Level */}
//           <div style={{ marginBottom:'2rem' }}>
//             <label style={{ display:'block', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:8, fontWeight:500 }}>Academic Level</label>
//             <div style={{ position:'relative' }}>
//               <select value={form.level} onChange={set('level')}
//                 style={{ ...inputStyle(errors.level), appearance:'none', cursor:'pointer', paddingRight:38 }}
//                 onFocus={e=>e.target.style.borderColor='rgba(255,255,255,0.35)'} onBlur={e=>e.target.style.borderColor=errors.level?'#f87171':'rgba(255,255,255,0.12)'}
//               >
//                 <option value="" style={{ background:'#141414' }}>Select Level</option>
//                 {ACADEMIC_LEVELS.map(l => <option key={l} value={l} style={{ background:'#141414' }}>{l}</option>)}
//               </select>
//               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}><path d="M6 9l6 6 6-6"/></svg>
//             </div>
//             {errors.level && <p style={{ color:'#f87171', fontSize:'11.5px', marginTop:4, marginBottom:0 }}>{errors.level}</p>}
//           </div>

//           <button type="submit" disabled={loading}
//             style={{ width:'100%', background: loading?'rgba(255,255,255,0.7)':'#fff', color:'#000', border:'none', borderRadius:9, padding:'13px', fontSize:'14px', fontWeight:500, cursor: loading?'wait':'pointer', transition:'all 0.15s' }}
//           >
//             {loading ? 'Creating account…' : 'Complete Registration'}
//           </button>

//           <p style={{ textAlign:'center', marginTop:'1.25rem', fontSize:'13px', color:'rgba(255,255,255,0.35)', marginBottom:0 }}>
//             <button type="button" onClick={() => router.push('/register/step1')} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.6)', cursor:'pointer', fontSize:'13px' }}>← Back to Step 1</button>
//           </p>
//         </form>
//       </main>
//     </div>
//   )
// }




'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'
import { ACADEMIC_LEVELS } from '@/lib/constants'

export default function RegisterStep2() {
  const { getRegStep1, register } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState({ institution:'', course:'', level:'' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.institution.trim()) e.institution = 'Institution name is required'
    if (!form.course.trim())      e.course      = 'Course / field of study is required'
    if (!form.level)              e.level       = 'Please select your academic level'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    const step1 = getRegStep1()
    if (!step1?.email) { 
      router.push('/register') 
      return 
    }
    setLoading(true)
    try {
      await register(step1, { institution: form.institution, course: form.course, academic_level: form.level })
    } catch { 
      setLoading(false) 
    }
  }

  const inputStyle = (hasErr) => ({
    width:'100%', background:'transparent',
    border:`1px solid ${hasErr?'#f87171':'rgba(255,255,255,0.12)'}`,
    borderRadius:8, padding:'12px 14px', color:'#fff',
    fontSize:'14px', outline:'none', transition:'border-color 0.15s', boxSizing:'border-box',
  })

  return (
    <div style={{ minHeight:'100vh', background:'#000', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden', fontFamily:"'DM Sans',sans-serif" }}>
      {/* Same light ray bg as Step 1 */}
      <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
        {[{ top:'25%',opacity:.022,height:90 },{ top:'42%',opacity:.016,height:130 },{ top:'62%',opacity:.012,height:55 }].map((r,i)=>(
          <div key={i} style={{ position:'absolute', left:'-10%', width:'130%', top:r.top, height:r.height, background:`linear-gradient(90deg,transparent 10%,rgba(255,255,255,${r.opacity}) 50%,transparent 90%)`, transform:'rotate(32deg)' }}/>
        ))}
      </div>

      <header style={{ position:'relative', zIndex:10, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 28px' }}>
        {/* Logo Wrapper */}
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
        <span style={{ fontSize:'13px', color:'rgba(255,255,255,0.45)' }}>Step 2 of 2</span>
      </header>

      <main style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem 1.5rem', position:'relative', zIndex:10 }}>
        <div style={{ textAlign:'center', marginBottom:'3rem' }}>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,6vw,4rem)', fontWeight:400, color:'#fff', margin:0, lineHeight:1.05 }}>
            Academic Setup
          </h1>
          <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'14.5px', marginTop:'1rem', maxWidth:'32rem', lineHeight:1.65 }}>
            Tailor your collaborative environment to your specific field of study.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ width:'100%', maxWidth:480, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:14, padding:'2.25rem', backdropFilter:'blur(8px)' }}>
          {/* Institution */}
          <div style={{ marginBottom:'1.5rem' }}>
            <label style={{ display:'block', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:8, fontWeight:500 }}>Institution Name</label>
            <input value={form.institution} onChange={set('institution')} placeholder="e.g. Stanford University"
              style={inputStyle(errors.institution)}
              onFocus={e=>e.target.style.borderColor='rgba(255,255,255,0.35)'} onBlur={e=>e.target.style.borderColor=errors.institution?'#f87171':'rgba(255,255,255,0.12)'}
            />
            {errors.institution && <p style={{ color:'#f87171', fontSize:'11.5px', marginTop:4, marginBottom:0 }}>{errors.institution}</p>}
          </div>

          {/* Course */}
          <div style={{ marginBottom:'1.5rem' }}>
            <label style={{ display:'block', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:8, fontWeight:500 }}>Major / Field of Study / Course</label>
            <input value={form.course} onChange={set('course')} placeholder="e.g. Computer Science"
              style={inputStyle(errors.course)}
              onFocus={e=>e.target.style.borderColor='rgba(255,255,255,0.35)'} onBlur={e=>e.target.style.borderColor=errors.course?'#f87171':'rgba(255,255,255,0.12)'}
            />
            {errors.course && <p style={{ color:'#f87171', fontSize:'11.5px', marginTop:4, marginBottom:0 }}>{errors.course}</p>}
          </div>

          {/* Academic Level */}
          <div style={{ marginBottom:'2rem' }}>
            <label style={{ display:'block', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:8, fontWeight:500 }}>Academic Level</label>
            <div style={{ position:'relative' }}>
              <select value={form.level} onChange={set('level')}
                style={{ ...inputStyle(errors.level), appearance:'none', cursor:'pointer', paddingRight:38 }}
                onFocus={e=>e.target.style.borderColor='rgba(255,255,255,0.35)'} onBlur={e=>e.target.style.borderColor=errors.level?'#f87171':'rgba(255,255,255,0.12)'}
              >
                <option value="" style={{ background:'#141414' }}>Select Level</option>
                {ACADEMIC_LEVELS.map(l => <option key={l} value={l} style={{ background:'#141414' }}>{l}</option>)}
              </select>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}><path d="M6 9l6 6 6-6"/></svg>
            </div>
            {errors.level && <p style={{ color:'#f87171', fontSize:'11.5px', marginTop:4, marginBottom:0 }}>{errors.level}</p>}
          </div>

          <button type="submit" disabled={loading}
            style={{ width:'100%', background: loading?'rgba(255,255,255,0.7)':'#fff', color:'#000', border:'none', borderRadius:9, padding:'13px', fontSize:'14px', fontWeight:500, cursor: loading?'wait':'pointer', transition:'all 0.15s' }}
          >
            {loading ? 'Creating account…' : 'Complete Registration'}
          </button>

          <p style={{ textAlign:'center', marginTop:'1.25rem', fontSize:'13px', color:'rgba(255,255,255,0.35)', marginBottom:0 }}>
            <button type="button" onClick={() => router.push('/register')} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.6)', cursor:'pointer', fontSize:'13px' }}>← Back to Step 1</button>
          </p>
        </form>
      </main>
    </div>
  )
}