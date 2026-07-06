//PATHETIC CODE

// 'use client'

// import { useState, useEffect } from 'react'
// import { ChevronRight, Trophy, Zap, Target } from 'lucide-react'
// import Sidebar from '@/components/common/Sidebar'
// import Topbar from '@/components/common/Topbar'

// const MOCK_BATTLE = {
//   id: 'battle_001',
//   topic: 'Advanced JavaScript',
//   competitors: [
//     { rank: 1, name: 'Sarah L.', score: 8500, correct: 8, avatar: '🏆' },
//     { rank: 2, name: 'You', score: 7200, correct: 7, avatar: '👤' },
//     { rank: 3, name: 'John M.', score: 6800, correct: 6, avatar: '💻' },
//   ],
//   currentQuestion: {
//     number: 5,
//     total: 10,
//     text: 'What does the "this" keyword refer to in an arrow function?',
//     options: [
//       { id: 'a', text: 'The global object' },
//       { id: 'b', text: 'The object that calls the function' },
//       { id: 'c', text: 'The enclosing function\'s "this"', correct: true },
//       { id: 'd', text: 'Undefined' },
//     ],
//   },
//   timeLeft: 45,
//   globalStats: {
//     totalPlayers: 2450,
//     avgScore: 6200,
//     yourPercentile: 78,
//   },
// }

// export default function StudyBattle() {
//   const [selected, setSelected] = useState(null)
//   const [answered, setAnswered] = useState(false)
//   const [timeLeft, setTimeLeft] = useState(MOCK_BATTLE.timeLeft)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(t => (t > 0 ? t - 1 : 0))
//     }, 1000)
//     return () => clearInterval(timer)
//   }, [])

//   const handleAnswer = (optionId) => {
//     if (answered) return
//     setSelected(optionId)
//     setAnswered(true)
//   }

//   return (
//     <div style={{ display: 'flex', minHeight: '100vh', background: '#080808', fontFamily: "'DM Sans',sans-serif" }}>
//       <Sidebar />
//       <div style={{ marginLeft: 240, flex: 1, display: 'flex', flexDirection: 'column' }}>
//         <Topbar sidebarWidth={240} />
//         <main style={{ marginTop: 56, flex: 1, padding: '32px 28px', display: 'grid', gridTemplateColumns: '260px 1fr 280px', gap: 24, overflow: 'hidden' }}>
          
//           {/* Left - Competitors */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//             <h3 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>LEADERBOARD</h3>
//             {MOCK_BATTLE.competitors.map(comp => (
//               <div key={comp.rank} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
//                 <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifycontent: 'center', fontSize: 16, fontWeight: 600, color: '#fff', textAlign: 'center', lineHeigh: '32px' }}>
//                   {comp.rank === 1 ? '🥇' : comp.rank === 2 ? '🥈' : '🥉'}
//                 </div>
//                 <div style={{ flex: 1, minWidth: 0 }}>
//                   <p style={{ margin: 0, fontSize: 12, fontWeight: 500, color: '#fff' }}>{comp.name}</p>
//                   <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{comp.score.toLocaleString()} pts</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Center - Question */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
//             {/* Timer & Progress */}
//             <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 16 }}>
//               <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
//                 <div>
//                   <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Question {MOCK_BATTLE.currentQuestion.number}/{MOCK_BATTLE.currentQuestion.total}</p>
//                   <h2 style={{ margin: '4px 0 0', fontSize: 18, fontWeight: 600, color: '#fff' }}>Advanced JavaScript</h2>
//                 </div>
//                 <div style={{ textAlign: 'center', padding: '10px 20px', background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.3)', borderRadius: 10 }}>
//                   <p style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#f87171' }}>{timeLeft}s</p>
//                   <p style={{ margin: 0, fontSize: 10, color: 'rgba(248, 113, 113, 0.6)' }}>Time Left</p>
//                 </div>
//               </div>
              
//               {/* Progress bar */}
//               <div style={{ height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
//                 <div style={{ height: '100%', width: `${(MOCK_BATTLE.currentQuestion.number / MOCK_BATTLE.currentQuestion.total) * 100}%`, background: '#fff' }} />
//               </div>
//             </div>

//             {/* Question Card */}
//             <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 28 }}>
//               <h3 style={{ margin: '0 0 28px', fontSize: 20, fontWeight: 500, color: '#fff', lineHeight: 1.6 }}>
//                 {MOCK_BATTLE.currentQuestion.text}
//               </h3>
              
//               {/* Options */}
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
//                 {MOCK_BATTLE.currentQuestion.options.map(opt => (
//                   <button
//                     key={opt.id}
//                     onClick={() => handleAnswer(opt.id)}
//                     disabled={answered}
//                     style={{
//                       background: !answered ? 'rgba(255,255,255,0.05)' : selected === opt.id ? (opt.correct ? 'rgba(74, 222, 128, 0.2)' : 'rgba(248, 113, 113, 0.2)') : opt.correct ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255,255,255,0.05)',
//                       border: !answered ? '1px solid rgba(255,255,255,0.1)' : selected === opt.id ? (opt.correct ? '1px solid #4ade80' : '1px solid #f87171') : opt.correct ? '1px solid rgba(74, 222, 128, 0.3)' : '1px solid rgba(255,255,255,0.08)',
//                       borderRadius: 10,
//                       padding: '16px',
//                       cursor: answered ? 'default' : 'pointer',
//                       textAlign: 'left',
//                       transition: 'all 0.15s',
//                       opacity: answered && selected !== opt.id && !opt.correct ? 0.5 : 1,
//                       width: '100%'
//                     }}
//                     onMouseEnter={e => !answered && (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
//                     onMouseLeave={e => !answered && (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
//                   >
//                     <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                       <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifycontent: 'center', fontSize: 13, fontWeight: 600, color: '#fff' }}>
//                         {opt.id.toUpperCase()}
//                       </div>
//                       <span style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>{opt.text}</span>
//                       {answered && opt.correct && <span style={{ marginLeft: 'auto', color: '#4ade80', fontWeight: 600 }}>✓ Correct</span>}
//                       {answered && selected === opt.id && !opt.correct && <span style={{ marginLeft: 'auto', color: '#f87171', fontWeight: 600 }}>✗ Incorrect</span>}
//                     </div>
//                   </button>
//                 ))}
//               </div>

//               {answered && (
//                 <button style={{ width: '100%', marginTop: 24, background: '#fff', color: '#000', border: 'none', borderRadius: 10, padding: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifycontent: 'center', gap: 8 }}>
//                   Next Question <ChevronRight size={18} />
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Right - Global Stats */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//             <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 16 }}>
//               <h3 style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>GLOBAL STATS</h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//                 <div style={{ padding: 12, background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
//                   <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Total Players</p>
//                   <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#fff' }}>{MOCK_BATTLE.globalStats.totalPlayers.toLocaleString()}</p>
//                 </div>
//                 <div style={{ padding: 12, background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
//                   <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Average Score</p>
//                   <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#fff' }}>{MOCK_BATTLE.globalStats.avgScore.toLocaleString()}</p>
//                 </div>
//                 <div style={{ padding: 12, background: 'rgba(74, 222, 128, 0.1)', borderRadius: 8, border: '1px solid rgba(74, 222, 128, 0.2)' }}>
//                   <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Your Percentile</p>
//                   <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#4ade80' }}>{MOCK_BATTLE.globalStats.yourPercentile}th</p>
//                 </div>
//               </div>
//             </div>

//             {/* Rewards */}
//             <div style={{ background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(248, 113, 113, 0.15) 100%)', border: '1px solid rgba(251, 191, 36, 0.2)', borderRadius: 14, padding: 16 }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
//                 <Trophy size={16} style={{ color: '#fbbf24' }} />
//                 <h3 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#fff' }}>Rewards</h3>
//               </div>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
//                 <div style={{ display: 'flex', justifycontent: 'space-between' }}>
//                   <span style={{ color: 'rgba(255,255,255,0.6)' }}>XP Earned</span>
//                   <span style={{ fontWeight: 600, color: '#fbbf24' }}>+250 XP</span>
//                 </div>
//                 <div style={{ display: 'flex', justifycontent: 'space-between' }}>
//                   <span style={{ color: 'rgba(255,255,255,0.6)' }}>Streak Bonus</span>
//                   <span style={{ fontWeight: 600, color: '#4ade80' }}>+50 XP</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </main>
//       </div>
//     </div>
//   )
// }






// 'use client'

// import { useState, useEffect } from 'react'
// import Sidebar from '@/components/common/Sidebar'
// import Topbar from '@/components/common/Topbar'

// export default function StudyBattle() {
//   const [selected, setSelected] = useState(null)
//   const [answered, setAnswered] = useState(false)
//   const [timeLeft, setTimeLeft] = useState(3)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(t => (t > 0 ? t - 1 : 0))
//     }, 1000)
//     return () => clearInterval(timer)
//   }, [])

//   return (
//     <div style={{ display: 'flex', minHeight: '100vh', background: '#09090b', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
//       {/* Shared Modular Navigation Sidebar */}
//       <Sidebar />
      
//       {/* CORE INTERACTION MAIN HUB BOUNDS AREA */}
//       <div style={{ marginLeft: 240, flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
//         {/* Upper Platform Arena Topbar Metadata Subheader */}
//         <Topbar sidebarWidth={240} />
        
//         <div style={{ padding: '24px 40px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <div>
//             <span style={{ fontSize: 9, background: 'rgba(255,255,255,0.04)', padding: '4px 10px', borderRadius: 20, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
//               LIVE MATCH: QUANTUM PHYSICS
//             </span>
//             <h1 style={{ margin: '6px 0 0', fontSize: 32, fontWeight: 400, fontFamily: "'Cormorant Garamond', serif" }}>
//               Arena <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.4)' }}>04</span>
//             </h1>
//           </div>
          
//           <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
//             <span>⏱</span> <span style={{ fontFamily: 'monospace' }}>12:05</span>
//           </div>
//         </div>

//         {/* Triple Column Layout Container Frame */}
//         <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '280px 1fr 280px', gap: 40, padding: 40, overflow: 'hidden' }}>
          
//           {/* COLUMN 1: LIVE ENGAGED COMPETITORS ROW PANEL */}
//           <div>
//             <h4 style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', margin: '0 0 16px' }}>COMPETITORS</h4>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              
//               {/* Profile Card User Item 1 */}
//               <div style={{ background: '#121215', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
//                 <div style={{ width: 36, height: 36, borderRadius: 6, background: '#1c1c22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>
//                 <div style={{ flex: 1 }}>
//                   <div style={{ fontSize: 13, fontWeight: 500 }}>Alex Thorne <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>(You)</span></div>
//                   <div style={{ height: 2, width: 60, background: '#fff', marginTop: 6 }} />
//                   <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', display: 'block', marginTop: 4 }}>840 XP</span>
//                 </div>
//               </div>

//               {/* Profile Card Competitor Item 2 */}
//               <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 10, padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
//                 <div style={{ width: 36, height: 36, borderRadius: 6, background: 'rgba(255,255,255,0.03)' }} />
//                 <div>
//                   <div style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}>Sarah Jenkins</div>
//                   <div style={{ height: 2, width: 40, background: 'rgba(255,255,255,0.2)', marginTop: 6 }} />
//                   <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', display: 'block', marginTop: 4 }}>720 XP</span>
//                 </div>
//               </div>

//               {/* Profile Card Competitor Item 3 */}
//               <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 10, padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
//                 <div style={{ width: 36, height: 36, borderRadius: 6, background: 'rgba(255,255,255,0.03)' }} />
//                 <div>
//                   <div style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}>Leo Valenti</div>
//                   <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', display: 'block', marginTop: 4 }}>510 XP</span>
//                 </div>
//               </div>

//             </div>

//             <h4 style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', margin: '32px 0 16px' }}>EARNED REWARDS</h4>
//             <div style={{ display: 'flex', gap: 8 }}>
//               {['🏅', '⚡', '✨', '🔒'].map((icon, idx) => (
//                 <div key={idx} style={{ width: 36, height: 36, borderRadius: 6, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, opacity: icon === '🔒' ? 0.3 : 1 }}>
//                   {icon}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* COLUMN 2: CENTER PIECE QUESTION DISPLAY ARENA INTERACTION AREA */}
//           <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
//             <div style={{ background: '#131316', border: '1px solid rgba(255,255,255,0.02)', borderRadius: 16, padding: '48px 40px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
              
//               <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', textAlign: 'center', display: 'block', marginBottom: 16 }}>
//                 QUESTION 07 OF 20
//               </span>
              
//               <h2 style={{ margin: '0 0 40px', fontSize: 32, fontWeight: 400, textAlign: 'center', lineHeight: 1.4, fontFamily: "'Cormorant Garamond', serif", padding: '0 20px' }}>
//                 Which particle is responsible for the theoretical mechanism of the Higgs field?
//               </h2>

//               {/* Grid Option Layout Structure Frame */}
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
//                 <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 10, padding: 20, position: 'relative' }}>
//                   <span style={{ display: 'block', fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Option A</span>
//                   <span style={{ fontSize: 14, fontWeight: 500 }}>The Gluon</span>
//                   <div style={{ position: 'absolute', bottom: -12, left: 12, background: '#1a1a22', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '2px 6px', fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>Leo V. Selecting...</div>
//                 </div>

//                 <div style={{ background: '#fff', color: '#000', borderRadius: 10, padding: 20 }}>
//                   <span style={{ display: 'block', fontSize: 10, color: 'rgba(0,0,0,0.4)', marginBottom: 4 }}>Option B</span>
//                   <span style={{ fontSize: 14, fontWeight: 600 }}>The Higgs Boson</span>
//                 </div>

//                 <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 10, padding: 20 }}>
//                   <span style={{ display: 'block', fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Option C</span>
//                   <span style={{ fontSize: 14, fontWeight: 500 }}>The Photon</span>
//                 </div>

//                 <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 10, padding: 20 }}>
//                   <span style={{ display: 'block', fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Option D</span>
//                   <span style={{ fontSize: 14, fontWeight: 500 }}>The Muon</span>
//                 </div>
//               </div>

//               {/* Status Tooltip Marker Anchor */}
//               <div style={{ position: 'absolute', right: -24, top: '42%', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '4px 8px', fontSize: 9, color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>
//                 Sarah J. Thinking...
//               </div>

//             </div>

//             {/* Bottom Global Timer Progress Bar Segment Footer */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 24 }}>
//               <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 2, position: 'relative' }}>
//                 <div style={{ height: '100%', width: '30%', background: '#f87171', borderRadius: 2 }} />
//               </div>
//               <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)' }}>3s</span>
//             </div>

//           </div>

//           {/* COLUMN 3: RIGHT PANEL STATISTICS MONITOR MATRIX */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
//             <div>
//               <h4 style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', margin: '0 0 16px' }}>REAL-TIME RANK</h4>
//               <div style={{ background: '#0b0b0e', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 12, padding: '12px 4px' }}>
//                 {[
//                   { rank: 1, name: 'Alex Thorne', val: '840', desc: 'LEVEL 42 ARCHITECT TOTAL XP' },
//                   { rank: 2, name: 'Sarah Jenkins', val: '720' },
//                   { rank: 3, name: 'Leo Valenti', val: '510' },
//                   { rank: 4, name: 'Maria Ross', val: '495' },
//                   { rank: 5, name: 'Keiji Satou', val: '320' },
//                 ].map((item, idx) => (
//                   <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: item.rank === 1 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
//                     <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
//                       <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', width: 10 }}>{item.rank}</span>
//                       <div>
//                         <span style={{ fontSize: 13, fontWeight: item.rank === 1 ? 500 : 400, color: item.rank === 1 ? '#fff' : 'rgba(255,255,255,0.6)' }}>{item.name}</span>
//                         {item.desc && <span style={{ display: 'block', fontSize: 8, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.02em', marginTop: 2 }}>{item.desc}</span>}
//                       </div>
//                     </div>
//                     <span style={{ fontSize: 13, fontFamily: 'monospace', fontWeight: 500 }}>{item.val}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h4 style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', margin: '0 0 16px' }}>GLOBAL STATS</h4>
//               <div style={{ background: '#0b0b0e', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
//                   <span style={{ color: 'rgba(255,255,255,0.4)' }}>Avg. Accuracy</span>
//                   <span style={{ fontWeight: 500 }}>94%</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
//                   <span style={{ color: 'rgba(255,255,255,0.4)' }}>Quickest Resp.</span>
//                   <span style={{ fontWeight: 500 }}>0.4s</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, alignItems: 'center' }}>
//                   <span style={{ color: 'rgba(255,255,255,0.4)' }}>Active Battle</span>
//                   <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>
//                     <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f87171' }} /> 124
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }





'use client'

import { useState, useEffect, useCallback } from 'react'
import Sidebar from '@/components/common/Sidebar'
import Topbar from '@/components/common/Topbar'

export default function StudyBattle() {
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [score, setScore] = useState(840)

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0 || answered) return
    const timer = setInterval(() => {
      setTimeLeft(t => t - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft, answered])

  // Selection Handler
  const handleOptionClick = useCallback((optionKey) => {
    if (answered) return
    setSelected(optionKey)
    setAnswered(true)
    
    // Simulate scoring logic
    if (optionKey === 'B') {
      setScore(s => s + 50)
    }

    // Reset for next question after 2 seconds
    setTimeout(() => {
      setSelected(null)
      setAnswered(false)
      setTimeLeft(15)
    }, 2000)
  }, [answered])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#09090b', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
      <Sidebar />
      
      <div style={{ marginLeft: 24, flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar sidebarWidth={240} />
        
        <div style={{ padding: '24px 40px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: 9, background: 'rgba(255,255,255,0.04)', padding: '4px 10px', borderRadius: 20, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
              LIVE MATCH: QUANTUM PHYSICS
            </span>
            <h1 style={{ margin: '6px 0 0', fontSize: 32, fontWeight: 400, fontFamily: "'Cormorant Garamond', serif" }}>
              Arena <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.4)' }}>04</span>
            </h1>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
            <span>⏱</span> <span style={{ fontFamily: 'monospace' }}>{timeLeft}s</span>
          </div>
        </div>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '280px 1fr 280px', gap: 40, padding: 40, overflow: 'hidden' }}>
          
          {/* COMPETITORS */}
          <div>
            <h4 style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', margin: '0 0 16px' }}>COMPETITORS</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: '#121215', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 6, background: '#1c1c22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Alex Thorne <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>(You)</span></div>
                  <div style={{ height: 2, width: '60%', background: '#fff', marginTop: 6 }} />
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', display: 'block', marginTop: 4 }}>{score} XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* QUESTION AREA */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#131316', border: '1px solid rgba(255,255,255,0.02)', borderRadius: 16, padding: '48px 40px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', textAlign: 'center', display: 'block', marginBottom: 16 }}>QUESTION 07 OF 20</span>
              <h2 style={{ margin: '0 0 40px', fontSize: 32, fontWeight: 400, textAlign: 'center', lineHeight: 1.4, fontFamily: "'Cormorant Garamond', serif" }}>
                Which particle is responsible for the theoretical mechanism of the Higgs field?
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { key: 'A', text: 'The Gluon' },
                  { key: 'B', text: 'The Higgs Boson' },
                  { key: 'C', text: 'The Photon' },
                  { key: 'D', text: 'The Muon' }
                ].map((opt) => (
                  <button 
                    key={opt.key}
                    onClick={() => handleOptionClick(opt.key)}
                    style={{ 
                      background: selected === opt.key ? '#fff' : 'rgba(255,255,255,0.01)', 
                      color: selected === opt.key ? '#000' : '#fff',
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: 10, padding: 20, cursor: 'pointer', textAlign: 'left' 
                    }}
                  >
                    <span style={{ display: 'block', fontSize: 10, opacity: 0.5, marginBottom: 4 }}>Option {opt.key}</span>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 24, height: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 2 }}>
              <div style={{ height: '100%', width: `${(timeLeft / 15) * 100}%`, background: '#f87171', borderRadius: 2, transition: 'width 1s linear' }} />
            </div>
          </div>

          {/* RANKING */}
          <div>
            <h4 style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', margin: '0 0 16px' }}>REAL-TIME RANK</h4>
            <div style={{ background: '#0b0b0e', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 12, padding: '12px 4px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px' }}>
                  <span style={{ fontSize: 13 }}>Alex Thorne</span>
                  <span style={{ fontSize: 13, fontFamily: 'monospace' }}>{score}</span>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}








// 'use client';
// import { useState, useEffect, useCallback, useRef } from 'react';
// import Sidebar from '@/components/common/Sidebar';
// import Topbar from '@/components/common/Topbar';
// import QuestionCard from '@/components/battle/QuestionCard';
// import Leaderboard from '@/components/battle/Leaderboard';
// import CompetitorCard from '@/components/battle/CompetitorCard';
// import TimerBar from '@/components/battle/TimerBar';
// import EarnedRewards from '@/components/battle/EarnedRewards';
// import GlobalStats from '@/components/battle/GlobalStats';
// import {
//   fetchBattleQuestions,
//   fetchBattleParticipants,
//   submitAnswer,
//   getBattleLeaderboard,
//   getGlobalBattleStats,
//   getUserBattleRewards,
//   getCompetitorSelections,
// } from '@/services/battleService';

// export default function StudyBattle() {
//   // ─────────────── State Management ──────────────────────────────────────────
//   const [questions, setQuestions] = useState([]);
//   const [qIndex, setQIndex] = useState(0);
//   const [players, setPlayers] = useState([]);
//   const [rewards, setRewards] = useState([]);
//   const [globalStats, setGlobalStats] = useState(null);
//   const [competitorSelections, setCompetitorSelections] = useState({});

//   const [timerRunning, setTimerRunning] = useState(true);
//   const [answered, setAnswered] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(15);
//   const [answerResult, setAnswerResult] = useState(null);
//   const [totalXpEarned, setTotalXpEarned] = useState(0);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [battleEnded, setBattleEnded] = useState(false);

//   const timerIntervalRef = useRef(null);
//   const leaderboardIntervalRef = useRef(null);

//   // ─────────────── Initial Load ──────────────────────────────────────────────
//   useEffect(() => {
//     const loadBattleData = async () => {
//       try {
//         setLoading(true);
//         const [qs, parts, rews, stats] = await Promise.all([
//           fetchBattleQuestions('Quantum Physics'),
//           fetchBattleParticipants(),
//           getUserBattleRewards(),
//           getGlobalBattleStats(),
//         ]);
//         setQuestions(qs.slice(0, 20));
//         setPlayers(parts);
//         setRewards(rews);
//         setGlobalStats(stats);
//       } catch (err) {
//         setError('Failed to load battle data');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadBattleData();
//   }, []);

//   // ─────────────── Timer Management ──────────────────────────────────────────
//   useEffect(() => {
//     if (!timerRunning || answered) {
//       clearInterval(timerIntervalRef.current);
//       return;
//     }

//     timerIntervalRef.current = setInterval(() => {
//       setTimeLeft((t) => {
//         if (t <= 1) {
//           clearInterval(timerIntervalRef.current);
//           setTimerRunning(false);
//           return 0;
//         }
//         return t - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timerIntervalRef.current);
//   }, [timerRunning, answered]);

//   // Auto-expire question when timer hits 0
//   useEffect(() => {
//     if (timeLeft === 0 && !answered && timerRunning) {
//       setTimerRunning(false);
//       handleTimeExpire();
//     }
//   }, [timeLeft, answered, timerRunning]);

//   // ─────────────── Competitor Selections Simulation ─────────────────────────
//   useEffect(() => {
//     const interval = setInterval(async () => {
//       const selections = await getCompetitorSelections(1);
//       setCompetitorSelections(selections);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   // ─────────────── Leaderboard Updates ───────────────────────────────────────
//   useEffect(() => {
//     const interval = setInterval(async () => {
//       const lb = await getBattleLeaderboard();
//       setPlayers(lb);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   // ─────────────── Answer Submission ─────────────────────────────────────────
//   const handleAnswer = useCallback(
//     async (optionKey) => {
//       if (answered || !questions.length) return;

//       setAnswered(true);
//       setTimerRunning(false);
//       clearInterval(timerIntervalRef.current);

//       try {
//         const currentQ = questions[qIndex];
//         const result = await submitAnswer(currentQ.id, optionKey, 15 - timeLeft);

//         setAnswerResult({
//           ...result,
//           selectedOption: optionKey,
//         });

//         if (result.isCorrect && result.xpReward) {
//           setTotalXpEarned((prev) => prev + result.xpReward);
//           setPlayers((prev) =>
//             prev.map((p) =>
//               p.isYou ? { ...p, xp: p.xp + result.xpReward } : p
//             )
//           );
//         }

//         // Auto-advance to next question
//         setTimeout(() => {
//           if (qIndex + 1 < questions.length) {
//             setQIndex((i) => i + 1);
//             setAnswered(false);
//             setAnswerResult(null);
//             setTimeLeft(15);
//             setTimerRunning(true);
//           } else {
//             setBattleEnded(true);
//           }
//         }, 2000);
//       } catch (err) {
//         console.error('Failed to submit answer:', err);
//         setAnswerResult({
//           success: false,
//           message: 'Failed to submit answer',
//         });
//       }
//     },
//     [qIndex, timeLeft, answered, questions]
//   );

//   const handleTimeExpire = useCallback(() => {
//     if (!answered) {
//       setAnswered(true);
//       setAnswerResult({
//         success: false,
//         message: 'Time expired!',
//       });
//       setTimeout(() => {
//         if (qIndex + 1 < questions.length) {
//           setQIndex((i) => i + 1);
//           setAnswered(false);
//           setAnswerResult(null);
//           setTimeLeft(15);
//           setTimerRunning(true);
//         } else {
//           setBattleEnded(true);
//         }
//       }, 1500);
//     }
//   }, [answered, qIndex, questions.length]);

//   const handleRewardClick = (reward) => {
//     console.log('Reward clicked:', reward);
//   };

//   const handleQuit = () => {
//     setBattleEnded(true);
//   };

//   // ─────────────── Render ────────────────────────────────────────────────────
//   if (loading) {
//     return (
//       <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0f0f' }}>
//         <Sidebar />
//         <div style={{ marginLeft: 240, flex: 1, display: 'flex', flexDirection: 'column' }}>
//           <Topbar sidebarWidth={240} />
//           <div style={{
//             flex: 1,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             color: '#888',
//           }}>
//             <div style={{ textAlign: 'center' }}>
//               <div style={{
//                 width: '40px',
//                 height: '40px',
//                 border: '2px solid #333',
//                 borderTop: '2px solid #fff',
//                 borderRadius: '50%',
//                 margin: '0 auto 20px',
//                 animation: 'spin 0.8s linear infinite',
//               }} />
//               <p>Joining battle...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !questions.length) {
//     return (
//       <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0f0f' }}>
//         <Sidebar />
//         <div style={{ marginLeft: 240, flex: 1, display: 'flex', flexDirection: 'column' }}>
//           <Topbar sidebarWidth={240} />
//           <div style={{
//             flex: 1,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             color: '#ff6b6b',
//           }}>
//             <p>{error || 'Failed to load battle'}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (battleEnded) {
//     const you = players.find((p) => p.isYou);
//     const rank = players.findIndex((p) => p.isYou) + 1;
//     return (
//       <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0f0f' }}>
//         <Sidebar />
//         <div style={{ marginLeft: 240, flex: 1, display: 'flex', flexDirection: 'column' }}>
//           <Topbar sidebarWidth={240} />
//           <div style={{
//             flex: 1,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             padding: '20px',
//           }}>
//             <div style={{
//               background: '#1a1a1a',
//               border: '1px solid #2a2a2a',
//               borderRadius: '8px',
//               padding: '48px 32px',
//               maxWidth: '500px',
//               textAlign: 'center',
//               color: '#fff',
//             }}>
//               <h1 style={{ margin: '0 0 32px', fontFamily: "'Georgia', serif", fontSize: '36px' }}>
//                 Battle Complete!
//               </h1>
//               <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '20px',
//                 marginBottom: '32px',
//               }}>
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   padding: '16px',
//                   background: '#111',
//                   borderRadius: '4px',
//                 }}>
//                   <span style={{ fontSize: '12px', color: '#666' }}>Final Rank</span>
//                   <span style={{ fontSize: '18px', fontWeight: '700' }}>
//                     {rank}/{players.length}
//                   </span>
//                 </div>
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   padding: '16px',
//                   background: '#111',
//                   borderRadius: '4px',
//                 }}>
//                   <span style={{ fontSize: '12px', color: '#666' }}>Total XP Earned</span>
//                   <span style={{ fontSize: '18px', fontWeight: '700', color: '#5edc6f' }}>
//                     +{totalXpEarned}
//                   </span>
//                 </div>
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   padding: '16px',
//                   background: '#111',
//                   borderRadius: '4px',
//                 }}>
//                   <span style={{ fontSize: '12px', color: '#666' }}>Current XP</span>
//                   <span style={{ fontSize: '18px', fontWeight: '700' }}>
//                     {you?.xp || 0}
//                   </span>
//                 </div>
//               </div>
//               <button
//                 style={{
//                   padding: '10px 24px',
//                   background: '#5edc6f',
//                   color: '#000',
//                   border: 'none',
//                   borderRadius: '4px',
//                   fontSize: '12px',
//                   fontWeight: '600',
//                   cursor: 'pointer',
//                 }}
//                 onClick={() => (window.location.href = '/study-battle')}
//               >
//                 Join Another Arena
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const currentQ = questions[qIndex] || questions[0];
//   const you = players.find((p) => p.isYou);
//   const competitors = players.filter((p) => !p.isYou);

//   return (
//     <div style={{ display: 'flex', minHeight: '100vh', background: '#09090b', color: '#fff' }}>
//       <Sidebar />
//       <div style={{ marginLeft: 240, flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
//         <Topbar sidebarWidth={240} />

//         <div style={{ padding: '24px 40px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <div>
//             <span style={{ fontSize: 9, background: 'rgba(255,255,255,0.04)', padding: '4px 10px', borderRadius: 20, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
//               LIVE MATCH: QUANTUM PHYSICS
//             </span>
//             <h1 style={{ margin: '6px 0 0', fontSize: 32, fontWeight: 400, fontFamily: "'Cormorant Garamond', serif" }}>
//               Arena <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.4)' }}>04</span>
//             </h1>
//           </div>
//           <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
//             <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
//               <span>⏱</span> <span style={{ fontFamily: 'monospace' }}>12:05</span>
//             </div>
//             <button
//               onClick={handleQuit}
//               style={{
//                 background: 'transparent',
//                 border: '1px solid #333',
//                 color: '#666',
//                 width: '32px',
//                 height: '32px',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//                 fontSize: '18px',
//                 transition: 'all 0.2s',
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.borderColor = '#555';
//                 e.target.style.color = '#fff';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.borderColor = '#333';
//                 e.target.style.color = '#666';
//               }}
//             >
//               ✕
//             </button>
//           </div>
//         </div>

//         {/* Progress Bar */}
//         <div style={{ padding: '24px 40px 0' }}>
//           <div style={{ marginBottom: '28px' }}>
//             <div style={{ width: '100%', height: '3px', background: '#1a1a1a', borderRadius: '2px', overflow: 'hidden', marginBottom: '8px' }}>
//               <div
//                 style={{
//                   height: '100%',
//                   background: 'linear-gradient(90deg, #5edc6f, #4dd55f)',
//                   transition: 'width 0.5s ease',
//                   width: `${((qIndex + 1) / questions.length) * 100}%`,
//                 }}
//               />
//             </div>
//             <span style={{ fontSize: '10px', color: '#555', letterSpacing: '0.05em' }}>
//               Question {qIndex + 1} of {questions.length}
//             </span>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '280px 1fr 280px', gap: 40, padding: 40, overflow: 'hidden' }}>
//           {/* Left Column - Competitors */}
//           <div>
//             <h4 style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', margin: '0 0 16px' }}>COMPETITORS</h4>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//               {you && <CompetitorCard competitor={you} isYou />}
//               {competitors.slice(0, 4).map((c) => (
//                 <CompetitorCard key={c.id} competitor={c} />
//               ))}
//             </div>

//             <h4 style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', margin: '32px 0 16px' }}>EARNED REWARDS</h4>
//             <EarnedRewards rewards={rewards} onRewardClick={handleRewardClick} />
//           </div>

//           {/* Center - Question */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
//             <QuestionCard
//               question={currentQ.text}
//               questionNumber={qIndex + 1}
//               totalQuestions={questions.length}
//               options={currentQ.options}
//               onAnswer={handleAnswer}
//               competitorSelections={competitorSelections}
//               timeLeft={timeLeft}
//             />

//             {answerResult && (
//               <div
//                 style={{
//                   padding: '16px 32px',
//                   textAlign: 'center',
//                   fontWeight: '700',
//                   background: answerResult.isCorrect ? 'rgba(94, 220, 111, 0.1)' : 'rgba(224, 82, 82, 0.1)',
//                   color: answerResult.isCorrect ? '#5edc6f' : '#e05252',
//                 }}
//               >
//                 <p style={{ margin: 0, fontSize: '14px' }}>
//                   {answerResult.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
//                 </p>
//                 {answerResult.isCorrect && (
//                   <p style={{ fontSize: '12px', margin: '4px 0 0' }}>
//                     +{answerResult.xpReward} XP
//                   </p>
//                 )}
//               </div>
//             )}

//             <div style={{ padding: '16px 32px 20px' }}>
//               <TimerBar
//                 key={`timer-${qIndex}`}
//                 duration={15}
//                 running={timerRunning}
//                 onExpire={handleTimeExpire}
//               />
//             </div>
//           </div>

//           {/* Right - Stats */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//             <Leaderboard players={players} />
//             {globalStats && <GlobalStats stats={globalStats} />}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           to {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }