









// 'use client'

// import { useState, useMemo } from 'react'
// import { useRouter } from 'next/navigation'
// import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, X, CheckCircle2, Lock, PlayCircle, BookOpen, Swords, HelpCircle, Trophy } from 'lucide-react'
// import Sidebar from '@/components/common/Sidebar'
// import Topbar from '@/components/common/Topbar'


// const MOCK_COURSES = {
//   active: [
//     { 
//       id: 1, 
//       title: 'Neural Architectures & Cognition', 
//       tag: 'ADVANCED AI',
//       module: 'MODULE 4: TRANSFORMER DYNAMICS', 
//       progress: 68, 
//       lastAccessed: '2 hours ago',
//       image: 'linear-gradient(135deg, #1e1e24 0%, #0f0f12 100%)'
//     },
//     { 
//       id: 2, 
//       title: 'Quantum Cryptography Fundamentals', 
//       tag: 'CYBERSECURITY',
//       module: 'MODULE 2: LATTICE-BASED SECURITY', 
//       progress: 12, 
//       lastAccessed: 'Yesterday',
//       image: 'linear-gradient(135deg, #0d1b1e 0%, #081012 100%)'
//     },
//     { 
//       id: 3, 
//       title: 'Applied Astrophysics & Chaos Theory', 
//       tag: 'PHYSICS',
//       module: 'MODULE 7: EVENT HORIZON METRICS', 
//       progress: 89, 
//       lastAccessed: '3 days ago',
//       image: 'linear-gradient(135deg, #251818 0%, #120c0c 100%)'
//     },
//   ],
//   completed: [
//     {
//       id: 101,
//       title: 'Discrete Structures & Graph Logic',
//       tag: 'MATHEMATICS',
//       module: 'COMPLETED ALL 12 MODULES',
//       progress: 100,
//       lastAccessed: '2 weeks ago',
//       image: 'linear-gradient(135deg, #142214 0%, #0a0f0a 100%)'
//     }
//   ],
//   wishlist: [
//     {
//       id: 201,
//       title: 'Neuromorphic Hardware Engineering',
//       tag: 'HARDWARE AI',
//       module: 'PRE-ENROLLED IN QUEUE',
//       progress: 0,
//       lastAccessed: 'Not started',
//       image: 'linear-gradient(135deg, #221a30 0%, #110d18 100%)'
//     }
//   ],
// }

// // Interactive Curriculum roadmap dataset configuration
// const MOCK_CURRICULUM_ROADMAP = [
//   {
//     phaseId: 'p1',
//     phase: 'PHASE 1: CHOICE ARCHITECTURE FOUNDATIONS',
//     status: 'completed',
//     modules: [
//       { id: 'm1', title: 'Bounded Rationality Frameworks', type: 'Lecture', duration: '45 mins' },
//       { id: 'm2', title: 'Heuristics & Systematic Cognitive Biases', type: 'Sandbox Interactive', duration: '1 hr 15 mins' },
//     ]
//   },
//   {
//     phaseId: 'p2',
//     phase: 'PHASE 2: LIVE SIMULATION & DYNAMICS',
//     status: 'active',
//     modules: [
//       { id: 'm3', title: 'Hyperbolic Discounting Protocols', type: 'Core Session', duration: '2 hrs', current: true },
//       { id: 'm4', title: 'Study Battle Arena: Real-time Predictive Modeling', type: 'Collaborative Lab', duration: '1 hr 30 mins', isArena: true },
//     ]
//   },
//   {
//     phaseId: 'p3',
//     phase: 'PHASE 3: STRATEGIC MEMETIC MODELS',
//     status: 'locked',
//     modules: [
//       { id: 'm5', title: 'Asymmetric Information Equilibrium', type: 'Advanced Theory', duration: '3 hrs' },
//       { id: 'm6', title: 'Neuro-Economic Game Theory Foundations', type: 'Thesis Defense Prep', duration: '2 hrs' },
//     ]
//   }
// ]

// // Real-world content curated assessment dataset mapping to Phase 1 & 2 items
// const ARENA_QUESTIONS = [
//   {
//     id: 1,
//     topic: 'BOUNDED RATIONALITY',
//     question: 'According to Herbert Simon\'s framework, when agents "satisfice" instead of optimizing, what primary constraint are they responding to?',
//     options: [
//       'Incomplete institutional cryptographic validation metrics',
//       'Cognitive limitations and finite information-processing capacity',
//       'Symmetric game-theoretic Nash equilibrium failures',
//       'Linear reward mechanics within multi-agent environments'
//     ],
//     correctIndex: 1
//   },
//   {
//     id: 2,
//     topic: 'HYPERBOLIC DISCOUNTING',
//     question: 'How does hyperbolic discounting alter preference values across temporary horizons compared to exponential models?',
//     options: [
//       'It enforces perfect mathematical consistency over longitudinal baselines',
//       'It creates an immediate surge in valuation preference for near-term rewards over distant ones',
//       'It prioritizes secondary long-term resource allocation channels exclusively',
//       'It completely removes risk factors across asymmetric game structures'
//     ],
//     correctIndex: 1
//   }
// ]

// export default function MyCourses() {
//   const router = useRouter()
  
//   // App Core States
//   const [activeTab, setActiveTab] = useState('active') 
//   const [searchQuery, setSearchQuery] = useState('')
//   const [sortByAsc, setSortByAsc] = useState(true)
//   const [currentPage, setCurrentPage] = useState(1)
  
//   // View Triggers State Controls
//   const [isCurriculumOpen, setIsCurriculumOpen] = useState(false)
//   const [isArenaActive, setIsArenaActive] = useState(false)

//   // Arena Quiz Tracking Engine State System
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState(null)
//   const [arenaScore, setArenaScore] = useState(0)
//   const [arenaComplete, setArenaComplete] = useState(false)

//   // Search & Filter Mechanics
//   const processedCourses = useMemo(() => {
//     let list = MOCK_COURSES[activeTab] || []
//     if (searchQuery.trim() !== '') {
//       list = list.filter(course => 
//         course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         course.tag.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     }
//     return [...list].sort((a, b) => (sortByAsc ? a.progress - b.progress : b.progress - a.progress))
//   }, [activeTab, searchQuery, sortByAsc])

//   // Custom Selection Actions
//   const handleElementSelect = (type, targetId) => {
//     if (targetId === 'm4') {
//       setIsArenaActive(true)
//       setCurrentQuestionIndex(0)
//       setSelectedAnswer(null)
//       setArenaScore(0)
//       setArenaComplete(false)
//     } else {
//       alert(`Initializing execution interface sequence context for selection pointer [${type.toUpperCase()}]: ID -> ${targetId}`)
//     }
//   }

//   const handleAnswerSubmit = (optionIndex) => {
//     setSelectedAnswer(optionIndex)
//     if (optionIndex === ARENA_QUESTIONS[currentQuestionIndex].correctIndex) {
//       setArenaScore(prev => prev + 1)
//     }
    
//     setTimeout(() => {
//       if (currentQuestionIndex + 1 < ARENA_QUESTIONS.length) {
//         setCurrentQuestionIndex(prev => prev + 1)
//         setSelectedAnswer(null)
//       } else {
//         setArenaComplete(true)
//       }
//     }, 1200)
//   }

//   return (
//     <div style={{ display: 'flex', width: '100%', height: '150vh', background: '#07070a', fontFamily: "'Inter', sans-serif", overflow: 'hidden', position: 'relative' }}>
      
//       <Sidebar />
      
//       <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100%' }}>
//         <Topbar />

//         <main style={{ flex: 1, padding: '40px 48px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
//           <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.6rem', fontWeight: 400, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
//             My Courses
//           </h1>
//           <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13.5px', margin: '0 0 24px', fontWeight: 300 }}>
//             Continue your intellectual journey through curated AI-enhanced learning paths.
//           </p>

//           {/* Search Box Component Layout */}
//           <div style={{ position: 'relative', width: '100%', maxWidth: 360, marginBottom: 32 }}>
//             <Search size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
//             <input 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search your courses or tags..." 
//               style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '10px 14px 10px 40px', fontSize: 13, color: '#fff', outline: 'none' }}
//             />
//           </div>

//           {/* Filter Navigation Row */}
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: 12 }}>
//             <div style={{ display: 'flex', gap: 8 }}>
//               {[{ label: 'In Progress', key: 'active' }, { label: 'Completed', key: 'completed' }, { label: 'Wishlist', key: 'wishlist' }].map((tab) => (
//                 <button
//                   key={tab.key}
//                   onClick={() => { setActiveTab(tab.key); setCurrentPage(1); }}
//                   style={{ background: activeTab === tab.key ? '#fff' : 'transparent', border: 'none', color: activeTab === tab.key ? '#000' : 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 500, padding: '6px 14px', borderRadius: 6, cursor: 'pointer' }}
//                 >
//                   {tab.label}
//                 </button>
//               ))}
//             </div>
//             <button onClick={() => setSortByAsc(prev => !prev)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#fff', fontSize: 11, fontWeight: 500, cursor: 'pointer' }}>
//               SORT BY: {sortByAsc ? 'PROGRESS LOW' : 'PROGRESS HIGH'} <SlidersHorizontal size={12} style={{ color: 'rgba(255,255,255,0.4)' }} />
//             </button>
//           </div>

//           {/* Course View Segment Matrix */}
//           {processedCourses.length === 0 ? (
//             <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
//               No matching courses found in this partition.
//             </div>
//           ) : (
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28, marginBottom: 40 }}>
//               {processedCourses.map((course) => (
//                 <div key={course.id} style={{ background: '#0b0b0e', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
//                   <div style={{ height: 130, background: course.image, padding: 16, display: 'flex', alignItems: 'flex-start' }}>
//                     <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.06em', border: '1px solid rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: 4, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
//                       {course.tag}
//                     </span>
//                   </div>
//                   <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
//                     <div>
//                       <h3 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 500, color: '#fff', lineHeight: 1.35, fontFamily: "'Cormorant Garamond', serif" }}>{course.title}</h3>
//                       <p style={{ margin: '0 0 20px', fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}>{course.module}</p>
//                     </div>
//                     <div>
//                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
//                         <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Overall Progress</span>
//                         <span style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>{course.progress}%</span>
//                       </div>
//                       <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 1, marginBottom: 20 }}>
//                         <div style={{ height: '100%', width: `${course.progress}%`, background: '#fff', borderRadius: 1 }} />
//                       </div>
//                       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: 14 }}>
//                         <div>
//                           <span style={{ display: 'block', fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>LAST ACCESSED</span>
//                           <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{course.lastAccessed}</span>
//                         </div>
//                         <button onClick={() => alert(`Resuming session execution payload ID: ${course.id}`)} style={{ background: '#fff', color: '#000', border: 'none', padding: '6px 14px', borderRadius: 4, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Resume</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Dashboard Premium Feature Action Ribbon Block */}
//           <div style={{ background: '#0b0b0e', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16, display: 'grid', gridTemplateColumns: '240px 1fr', overflow: 'hidden', minHeight: 180, marginTop: 'auto' }}>
//             <div style={{ background: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.03)' }}>
//               <span style={{ fontSize: 72, opacity: 0.85, filter: 'grayscale(100%)' }}>♔</span>
//             </div>
//             <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//               <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>RECOMMENDED AI TWIN ACTIVITY</span>
//               <h2 style={{ margin: '0 0 10px', fontSize: 24, fontWeight: 400, color: '#fff', fontFamily: "'Cormorant Garamond', serif" }}>Masterclass: Behavioral Economic Modeling</h2>
//               <p style={{ margin: '0 0 24px', color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.5, maxWidth: 600 }}>You have reached 40% in your prerequisites. Join the current &apos;Study Battle&apos; session to accelerate your module mastery with real-time collaborative feedback.</p>
//               <div style={{ display: 'flex', gap: 12 }}>
//                 <button onClick={() => { setIsCurriculumOpen(true); setIsArenaActive(true); }} style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 6, padding: '8px 20px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Join Session Now</button>
//                 <button onClick={() => { setIsCurriculumOpen(true); setIsArenaActive(false); }} style={{ background: 'rgba(255,255,255,0.03)', color: '#fff', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '8px 20px', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>View Full Curriculum</button>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Footer Pagination Track Panel */}
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 32, borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: 20 }}>
//             <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>SHOWING PAGE {currentPage} OVERVIEW</span>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
//               <button onClick={() => currentPage > 1 && setCurrentPage(p => p - 1)} style={{ background: 'none', border: 'none', color: currentPage > 1 ? '#fff' : 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, cursor: 'pointer' }}><ChevronLeft size={14} /> Previous</button>
//               <button onClick={() => alert('Further multi-tier pagination blocks are locked inside local scope.')} style={{ background: 'none', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, cursor: 'pointer' }}>Next <ChevronRight size={14} /></button>
//             </div>
//           </div>

//         </main>
//       </div>

//       {/* SYLLABUS ROADMAP SLIDE OUT INTERACTION ELEMENT PANEL */}
//       <div 
//         style={{
//           position: 'absolute',
//           top: 0,
//           right: isCurriculumOpen ? 0 : '-460px',
//           width: '440px',
//           height: '100vh',
//           background: '#09090c',
//           borderLeft: '1px solid rgba(255,255,255,0.06)',
//           boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
//           zIndex: 100,
//           transition: 'right 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
//           display: 'flex',
//           flexDirection: 'column',
//           padding: '32px'
//         }}
//       >
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
//           <div>
//             <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>COURSE ROADMAP</span>
//             <h3 style={{ margin: '4px 0 0', color: '#fff', fontSize: 18, fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
//               {isArenaActive ? 'Study Battle Arena' : 'Full Syllabus Overview'}
//             </h3>
//           </div>
//           <button onClick={() => setIsCurriculumOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 4 }}><X size={18} /></button>
//         </div>

//         {/* CONDITION A: SHOW LIVE STUDY BATTLE MODULE INTERFACE */}
//         {isArenaActive ? (
//           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', color: '#fff' }}>
//             {!arenaComplete ? (
//               <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', gap: 8, background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.05)', marginBottom: 24 }}>
//                   <Swords size={14} style={{ color: 'rgba(255,255,255,0.6)' }} />
//                   <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.5)' }}>
//                     TOPIC: {ARENA_QUESTIONS[currentQuestionIndex].topic}
//                   </span>
//                   <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Q: {currentQuestionIndex + 1}/{ARENA_QUESTIONS.length}</span>
//                 </div>

//                 <p style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.5, color: '#fff', marginBottom: 24, fontFamily: "'Cormorant Garamond', serif" }}>
//                   {ARENA_QUESTIONS[currentQuestionIndex].question}
//                 </p>

//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//                   {ARENA_QUESTIONS[currentQuestionIndex].options.map((option, idx) => {
//                     const isPicked = selectedAnswer === idx;
//                     const isCorrect = idx === ARENA_QUESTIONS[currentQuestionIndex].correctIndex;
//                     let bg = 'rgba(255,255,255,0.01)';
//                     let border = '1px solid rgba(255,255,255,0.04)';
                    
//                     if (selectedAnswer !== null) {
//                       if (isCorrect) { bg = 'rgba(40, 167, 69, 0.15)'; border = '1px solid #28a745'; }
//                       else if (isPicked) { bg = 'rgba(220, 53, 69, 0.15)'; border = '1px solid #dc3545'; }
//                     }

//                     return (
//                       <button
//                         key={idx}
//                         disabled={selectedAnswer !== null}
//                         onClick={() => handleAnswerSubmit(idx)}
//                         style={{ width: '100%', background: bg, border: border, borderRadius: 8, padding: '14px', textAlignment: 'left', color: '#fff', fontSize: 12, cursor: selectedAnswer === null ? 'pointer' : 'default', transition: 'all 0.15s ease', display: 'flex', alignItems: 'center', gap: 10 }}
//                       >
//                         <HelpCircle size={12} style={{ opacity: 0.3, flexShrink: 0 }} />
//                         <span style={{ textAlign: 'left' }}>{option}</span>
//                       </button>
//                     )
//                   })}
//                 </div>
//               </div>
//             ) : (
//               <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 16px' }}>
//                 <Trophy size={48} style={{ color: '#fff', marginBottom: 16, opacity: 0.9 }} />
//                 <h4 style={{ margin: '0 0 6px', fontSize: 20, fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>Session Assessment Terminated</h4>
//                 <p style={{ margin: '0 0 28px', fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>You completed the Phase 1 & 2 validation tracking. Concept comprehension parameters have updated.</p>
//                 <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '14px 28px', marginBottom: 32 }}>
//                   <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 2 }}>FINAL METRIC SCORE</span>
//                   <span style={{ fontSize: 24, fontWeight: 600 }}>{arenaScore} / {ARENA_QUESTIONS.length} Correct</span>
//                 </div>
//                 <button onClick={() => setIsArenaActive(false)} style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 6, padding: '10px 24px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Return to Syllabus Tree</button>
//               </div>
//             )}
//           </div>
//         ) : (
//           /* CONDITION B: SHOW STANDARD FULL SYLLABUS LIST VIEW */
//           <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
//             {MOCK_CURRICULUM_ROADMAP.map((phase) => (
//               <div key={phase.phaseId} style={{ marginBottom: 28, opacity: phase.status === 'locked' ? 0.45 : 1 }}>
                
//                 {/* Pressable Phase Node Wrapper Layout Header */}
//                 <button 
//                   onClick={() => handleElementSelect('phase', phase.phaseId)}
//                   style={{ width: '100%', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, cursor: 'pointer', padding: 0, textAlign: 'left' }}
//                 >
//                   {phase.status === 'completed' && <CheckCircle2 size={13} style={{ color: '#fff' }} />}
//                   {phase.status === 'active' && <PlayCircle size={13} style={{ color: '#fff' }} />}
//                   {phase.status === 'locked' && <Lock size={12} style={{ color: 'rgba(255,255,255,0.3)' }} />}
//                   <span style={{ fontSize: 10, fontWeight: 600, color: '#fff', letterSpacing: '0.04em' }}>{phase.phase}</span>
//                 </button>

//                 {/* Sub-lesson elements rendered into independent pressable interaction card containers */}
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 18, borderLeft: '1px solid rgba(255,255,255,0.04)' }}>
//                   {phase.modules.map((mod) => (
//                     <button 
//                       key={mod.id} 
//                       onClick={() => handleElementSelect('module', mod.id)}
//                       style={{ 
//                         width: '100%',
//                         textAlign: 'left',
//                         background: mod.current ? 'rgba(255,255,255,0.02)' : '#0d0d11', 
//                         border: mod.current ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.02)', 
//                         borderRadius: 8, 
//                         padding: '12px 14px',
//                         cursor: 'pointer',
//                         transition: 'transform 0.15s ease, border-color 0.15s ease'
//                       }}
//                     >
//                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
//                         <h4 style={{ margin: 0, fontSize: 13, fontWeight: 500, color: mod.current || mod.isArena ? '#fff' : 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>{mod.title}</h4>
//                       </div>
//                       <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                         <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 4 }}>
//                           <BookOpen size={10} /> {mod.type}
//                         </span>
//                         <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>• {mod.duration}</span>
//                         {mod.isArena && (
//                           <span style={{ fontSize: 8, fontWeight: 700, color: '#000', background: '#fff', padding: '2px 6px', borderRadius: 3, letterSpacing: '0.04em', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 3 }}>
//                             <Swords size={10} /> ENGAGE ARENA
//                           </span>
//                         )}
//                       </div>
//                     </button>
//                   ))}
//                 </div>

//               </div>
//             ))}
//           </div>
//         )}

//         {/* Persistent Action Footer Box Layout */}
//         {!isArenaActive && (
//           <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 20, marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
//               <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Total Track Complete</span>
//               <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>40%</span>
//             </div>
//             <button 
//               onClick={() => handleElementSelect('module', 'm4')}
//               style={{ width: '100%', background: '#fff', color: '#000', border: 'none', padding: '10px 0', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}
//             >
//               Launch Collaborative Study Battle
//             </button>
//           </div>
//         )}

//       </div>

//     </div>
//   )
// }













'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, X, CheckCircle2, Lock, PlayCircle, BookOpen, Swords, HelpCircle, Trophy } from 'lucide-react';
import Sidebar from '@/components/common/Sidebar';
import Topbar from '@/components/common/Topbar';
import AIRecommendBanner from '@/components/courses/AIRecommendBanner';
import CourseCard from '@/components/courses/CourseCard';

const MOCK_COURSES = {
  active: [
    { 
      id: 1, 
      title: 'Neural Architectures & Cognition', 
      tag: 'ADVANCED AI',
      module: 'MODULE 4: TRANSFORMER DYNAMICS', 
      progress: 68, 
      lastAccessed: '2 hours ago',
      image: 'linear-gradient(135deg, #1e1e24 0%, #0f0f12 100%)'
    },
    { 
      id: 2, 
      title: 'Quantum Cryptography Fundamentals', 
      tag: 'CYBERSECURITY',
      module: 'MODULE 2: LATTICE-BASED SECURITY', 
      progress: 12, 
      lastAccessed: 'Yesterday',
      image: 'linear-gradient(135deg, #0d1b1e 0%, #081012 100%)'
    },
    { 
      id: 3, 
      title: 'Applied Astrophysics & Chaos Theory', 
      tag: 'PHYSICS',
      module: 'MODULE 7: EVENT HORIZON METRICS', 
      progress: 89, 
      lastAccessed: '3 days ago',
      image: 'linear-gradient(135deg, #251818 0%, #120c0c 100%)'
    },
  ],
  completed: [
    {
      id: 101,
      title: 'Discrete Structures & Graph Logic',
      tag: 'MATHEMATICS',
      module: 'COMPLETED ALL 12 MODULES',
      progress: 100,
      lastAccessed: '2 weeks ago',
      image: 'linear-gradient(135deg, #142214 0%, #0a0f0a 100%)'
    }
  ],
  wishlist: [
    {
      id: 201,
      title: 'Neuromorphic Hardware Engineering',
      tag: 'HARDWARE AI',
      module: 'PRE-ENROLLED IN QUEUE',
      progress: 0,
      lastAccessed: 'Not started',
      image: 'linear-gradient(135deg, #221a30 0%, #110d18 100%)'
    }
  ],
};

const BANNER_RECOMMENDATION = {
  title: 'Masterclass: Behavioral Economic Modeling',
  description: "You have reached 40% in your prerequisites. Join the current 'Study Battle' session to accelerate your module mastery with real-time collaborative feedback.",
  image: '',
};

const MOCK_CURRICULUM_ROADMAP = [
  {
    phaseId: 'p1',
    phase: 'PHASE 1: CHOICE ARCHITECTURE FOUNDATIONS',
    status: 'completed',
    modules: [
      { id: 'm1', title: 'Bounded Rationality Frameworks', type: 'Lecture', duration: '45 mins' },
      { id: 'm2', title: 'Heuristics & Systematic Cognitive Biases', type: 'Sandbox Interactive', duration: '1 hr 15 mins' },
    ]
  },
  {
    phaseId: 'p2',
    phase: 'PHASE 2: LIVE SIMULATION & DYNAMICS',
    status: 'active',
    modules: [
      { id: 'm3', title: 'Hyperbolic Discounting Protocols', type: 'Core Session', duration: '2 hrs', current: true },
      { id: 'm4', title: 'Study Battle Arena: Real-time Predictive Modeling', type: 'Collaborative Lab', duration: '1 hr 30 mins', isArena: true },
    ]
  },
  {
    phaseId: 'p3',
    phase: 'PHASE 3: STRATEGIC MEMETIC MODELS',
    status: 'locked',
    modules: [
      { id: 'm5', title: 'Asymmetric Information Equilibrium', type: 'Advanced Theory', duration: '3 hrs' },
      { id: 'm6', title: 'Neuro-Economic Game Theory Foundations', type: 'Thesis Defense Prep', duration: '2 hrs' },
    ]
  }
];

const ARENA_QUESTIONS = [
  {
    id: 1,
    topic: 'BOUNDED RATIONALITY (PHASE 1)',
    question: 'According to Herbert Simon\'s framework, when agents "satisfice" instead of optimizing, what primary constraint are they responding to?',
    options: [
      'Incomplete institutional cryptographic validation metrics',
      'Cognitive limitations and finite information-processing capacity',
      'Symmetric game-theoretic Nash equilibrium failures',
      'Linear reward mechanics within multi-agent environments'
    ],
    correctIndex: 1
  },
  {
    id: 2,
    topic: 'COGNITIVE BIASES (PHASE 1)',
    question: 'Which systemic layout bias causes an over-reliance on the first piece of information encountered when making choices?',
    options: [
      'Anchoring Bias',
      'Hyperbolic Decay',
      'Asymmetric Information Gap',
      'Status Quo Fallacy'
    ],
    correctIndex: 0
  },
  {
    id: 3,
    topic: 'HYPERBOLIC DISCOUNTING (PHASE 2)',
    question: 'How does hyperbolic discounting alter preference values across temporary horizons compared to exponential models?',
    options: [
      'It enforces perfect mathematical consistency over longitudinal baselines',
      'It creates an immediate surge in valuation preference for near-term rewards over distant ones',
      'It prioritizes secondary long-term resource allocation channels exclusively',
      'It completely removes risk factors across asymmetric game structures'
    ],
    correctIndex: 1
  }
];

export default function MyCourses() {
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState('active'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [sortByAsc, setSortByAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);
  const [isArenaActive, setIsArenaActive] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [arenaScore, setArenaScore] = useState(0);
  const [arenaComplete, setArenaComplete] = useState(false);

  const processedCourses = useMemo(() => {
    let list = MOCK_COURSES[activeTab] || [];
    if (searchQuery.trim() !== '') {
      list = list.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return [...list].sort((a, b) => (sortByAsc ? a.progress - b.progress : b.progress - a.progress));
  }, [activeTab, searchQuery, sortByAsc]);

  const handleElementSelect = (type, targetId) => {
    if (targetId === 'm4' || type === 'arena-shortcut' || type === 'phase') {
      setIsArenaActive(true);
      setIsCurriculumOpen(true);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setArenaScore(0);
      setArenaComplete(false);
    } else {
      alert(`Initializing execution interface sequence context for selection pointer [${type.toUpperCase()}]: ID -> ${targetId}`);
    }
  };

  const handleAnswerSubmit = (optionIndex) => {
    setSelectedAnswer(optionIndex);
    if (optionIndex === ARENA_QUESTIONS[currentQuestionIndex].correctIndex) {
      setArenaScore(prev => prev + 1);
    }
    
    setTimeout(() => {
      if (currentQuestionIndex + 1 < ARENA_QUESTIONS.length) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setArenaComplete(true);
      }
    }, 1200);
  };

  return (
    <div className="flex w-full h-[150vh] bg-[#07070a] font-['Inter'] relative">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Topbar />

        <main className="flex-1 px-12 py-10 flex flex-col">
          <h1 className="font-['Cormorant_Garamond'] text-[2.6rem] font-light text-white m-0 mb-2 tracking-[-0.01em]">
            My Courses
          </h1>
          <p className="text-[rgba(255,255,255,0.45)] text-[13.5px] m-0 mb-6 font-light">
            Continue your intellectual journey through curated AI-enhanced learning paths.
          </p>

          <div className="relative w-full max-w-[360px] mb-8">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.3)]" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your courses or tags..." 
              className="w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg px-3.5 py-2.5 pl-10 text-[13px] text-white outline-none"
            />
          </div>

          <div className="flex items-center justify-between mb-8 border-b border-[rgba(255,255,255,0.04)] pb-3">
            <div className="flex gap-2">
              {[{ label: 'In Progress', key: 'active' }, { label: 'Completed', key: 'completed' }, { label: 'Wishlist', key: 'wishlist' }].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => { setActiveTab(tab.key); setCurrentPage(1); }}
                  className={`bg-transparent border-none text-[rgba(255,255,255,0.4)] text-xs font-medium px-3.5 py-1.5 rounded-md cursor-pointer transition-all duration-150 ${
                    activeTab === tab.key ? 'bg-white text-black' : ''
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button onClick={() => setSortByAsc(prev => !prev)} className="flex items-center gap-1.5 bg-none border-none text-white text-[11px] font-medium cursor-pointer">
              SORT BY: {sortByAsc ? 'PROGRESS LOW' : 'PROGRESS HIGH'} <SlidersHorizontal size={12} className="text-[rgba(255,255,255,0.4)]" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto mb-6 pr-1 custom-scrollbar">
            {processedCourses.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-[rgba(255,255,255,0.3)] text-sm">
                No matching courses found in this partition.
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-7">
                {processedCourses.map((course) => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    onResume={(c) => alert(`Resuming session execution payload ID: ${c.id}`)} 
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mb-6 flex-shrink-0">
            <AIRecommendBanner 
              recommendation={BANNER_RECOMMENDATION}
              onJoin={() => handleElementSelect('arena-shortcut', 'm4')}
              onViewCurriculum={() => { setIsCurriculumOpen(true); setIsArenaActive(false); }}
            />
          </div>

          <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.03)] pt-5 flex-shrink-0">
            <span className="text-[11px] text-[rgba(255,255,255,0.3)]">SHOWING PAGE {currentPage} OVERVIEW</span>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => currentPage > 1 && setCurrentPage(p => p - 1)} 
                className={`bg-none border-none text-white flex items-center gap-1 text-xs cursor-pointer ${
                  currentPage === 1 ? 'text-[rgba(255,255,255,0.25)] cursor-default' : ''
                }`}
              >
                <ChevronLeft size={14} /> Previous
              </button>
              <button 
                onClick={() => alert('Further multi-tier pagination blocks are locked inside local scope.')} 
                className="bg-none border-none text-white flex items-center gap-1 text-xs cursor-pointer"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* CURRICULUM OVERLAY PANEL DRAWER */}
      <div className={`absolute top-0 h-screen bg-[#09090c] border-l border-[rgba(255,255,255,0.06)] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-[100] transition-[right] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col p-8 ${
        isCurriculumOpen ? 'right-0 w-[440px]' : 'right-[-460px] w-[440px]'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[9px] font-bold text-[rgba(255,255,255,0.4)] tracking-[0.08em]">COURSE ROADMAP</span>
            <h3 className="mt-1 text-white text-lg font-['Cormorant_Garamond'] font-light">
              {isArenaActive ? 'Study Battle Arena' : 'Full Syllabus Overview'}
            </h3>
          </div>
          <button onClick={() => setIsCurriculumOpen(false)} className="bg-none border-none text-[rgba(255,255,255,0.4)] cursor-pointer p-1">
            <X size={18} />
          </button>
        </div>

        {isArenaActive ? (
          <div className="flex-1 flex flex-col text-white">
            {!arenaComplete ? (
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.02)] px-3.5 py-2.5 rounded-md border border-[rgba(255,255,255,0.05)] mb-6">
                  <Swords size={14} className="text-[rgba(255,255,255,0.6)]" />
                  <span className="text-[9px] font-bold tracking-[0.04em] text-[rgba(255,255,255,0.5)]">
                    TOPIC: {ARENA_QUESTIONS[currentQuestionIndex].topic}
                  </span>
                  <span className="ml-auto text-[10px] text-[rgba(255,255,255,0.4)]">
                    Q: {currentQuestionIndex + 1}/{ARENA_QUESTIONS.length}
                  </span>
                </div>

                <p className="font-['Cormorant_Garamond'] text-[15px] font-light leading-[1.5] text-white m-0 mb-6">
                  {ARENA_QUESTIONS[currentQuestionIndex].question}
                </p>

                <div className="flex flex-col gap-3">
                  {ARENA_QUESTIONS[currentQuestionIndex].options.map((option, idx) => {
                    const isPicked = selectedAnswer === idx;
                    const isCorrect = idx === ARENA_QUESTIONS[currentQuestionIndex].correctIndex;
                    let optionClass = 'bg-[rgba(255,255,255,0.01)] border-[rgba(255,255,255,0.04)]';
                    
                    if (selectedAnswer !== null) {
                      if (isCorrect) optionClass = 'bg-[rgba(40,167,69,0.15)] border-[#28a745]';
                      else if (isPicked) optionClass = 'bg-[rgba(220,53,69,0.15)] border-[#dc3545]';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedAnswer !== null}
                        onClick={() => handleAnswerSubmit(idx)}
                        className={`w-full border rounded-lg p-3.5 text-left text-white text-xs cursor-pointer transition-all duration-150 flex items-center gap-2.5 ${optionClass} ${
                          selectedAnswer === null ? 'hover:border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.02)]' : ''
                        }`}
                      >
                        <HelpCircle size={12} className="opacity-30 flex-shrink-0" />
                        <span className="text-left leading-[1.4]">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <Trophy size={48} className="text-white mb-4 opacity-90" />
                <h4 className="m-0 mb-1.5 text-xl font-['Cormorant_Garamond'] font-light">Assessment Terminated</h4>
                <p className="m-0 mb-7 text-[13px] text-[rgba(255,255,255,0.4)] leading-[1.5]">
                  You completed the Phase 1 & 2 validation tracking. Concept comprehension parameters have updated.
                </p>
                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-lg px-7 py-3.5 mb-8">
                  <span className="text-[10px] text-[rgba(255,255,255,0.4)] block mb-0.5">FINAL METRIC SCORE</span>
                  <span className="text-2xl font-semibold">{arenaScore} / {ARENA_QUESTIONS.length} Correct</span>
                </div>
                <button 
                  onClick={() => setIsArenaActive(false)} 
                  className="bg-white text-black border-none rounded-md px-6 py-2.5 text-xs font-semibold cursor-pointer transition-colors duration-150 hover:bg-[#e0e0e0]"
                >
                  Return to Syllabus Tree
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
            {MOCK_CURRICULUM_ROADMAP.map((phase) => (
              <div key={phase.phaseId} className={`mb-7 transition-opacity duration-200 ${phase.status === 'locked' ? 'opacity-35' : ''}`}>
                <button 
                  onClick={() => handleElementSelect('phase', phase.phaseId)}
                  className="w-full bg-none border-none flex items-center gap-2 mb-3.5 cursor-pointer p-0 text-left"
                >
                  {phase.status === 'completed' && <CheckCircle2 size={13} className="text-white" />}
                  {phase.status === 'active' && <PlayCircle size={13} className="text-white" />}
                  {phase.status === 'locked' && <Lock size={12} className="text-[rgba(255,255,255,0.3)]" />}
                  <span className="text-[10px] font-semibold text-white tracking-[0.04em]">{phase.phase}</span>
                </button>

                <div className="flex flex-col gap-2.5 pl-[18px] border-l border-[rgba(255,255,255,0.04)]">
                  {phase.modules.map((mod) => (
                    <button 
                      key={mod.id} 
                      onClick={() => handleElementSelect('module', mod.id)}
                      className={`w-full text-left bg-[#0d0d11] border border-[rgba(255,255,255,0.02)] rounded-lg p-3 cursor-pointer transition-all duration-150 ${
                        mod.current ? 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)]' : ''
                      } hover:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.01)]`}
                    >
                      <div>
                        <h4 className="m-0 text-[13px] font-medium text-[rgba(255,255,255,0.85)] leading-[1.4]">{mod.title}</h4>
                      </div>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[9px] text-[rgba(255,255,255,0.3)] flex items-center gap-1">
                          <BookOpen size={10} /> {mod.type}
                        </span>
                        <span className="text-[9px] text-[rgba(255,255,255,0.3)]">• {mod.duration}</span>
                        {mod.isArena && (
                          <span className="text-[8px] font-bold text-black bg-white px-1.5 py-0.5 rounded-[3px] tracking-[0.04em] ml-auto flex items-center gap-0.5">
                            <Swords size={10} /> ENGAGE ARENA
                          </span>
                        )}
                        {!mod.isArena && mod.current && (
                          <span className="text-[8px] font-bold text-[rgba(255,255,255,0.4)] border border-[rgba(255,255,255,0.1)] px-1.5 py-0.5 rounded-[3px] tracking-[0.04em] ml-auto">
                            RESUME POINTER
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {!isArenaActive && (
          <div className="border-t border-[rgba(255,255,255,0.04)] pt-5 mt-auto flex flex-col gap-2.5">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[rgba(255,255,255,0.4)]">Total Track Complete</span>
              <span className="text-xs font-semibold text-white">40%</span>
            </div>
            <button 
              onClick={() => handleElementSelect('module', 'm4')} 
              className="w-full bg-white text-black border-none py-2.5 rounded-md text-xs font-semibold cursor-pointer text-center transition-colors duration-150 hover:bg-[#e0e0e0]"
            >
              Launch Collaborative Study Battle
            </button>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.05);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}