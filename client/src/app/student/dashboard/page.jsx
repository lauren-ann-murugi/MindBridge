//ORIGINAL

// 'use client'

// import React, { useState, useEffect } from 'react'
// import AIRecommendationCard from '@/components/dashboard/AIRecommendationCard'
// import ActiveTeamRooms from '@/components/dashboard/ActiveTeamRooms'
// import CurrentUnits from '@/components/dashboard/CurrentUnits'
// import CognitiveMetrics from '@/components/dashboard/CognitiveMetrics'
// import StreakBadge from '@/components/dashboard/StreakBadge'
// import { useAuth } from '@/context/AuthContext'

// // Static data structure matching your student ecosystem metrics
// const MOCK_PORTAL_DATA = {
//   streak: 12,
//   recommendation: {
//     title: 'Recommended Team Focus',
//     text: 'Review relational query schemas inside Database Design node or sync up layout paradigms with Web Engineering track matches.',
//   },
//   activeRooms: [
//     { id: 1, name: 'Web Development Masters', online: 8 },
//     { id: 3, name: 'Database Design', online: 5 }
//   ],
//   currentUnits: [
//     { id: 'MIT-301', title: 'Advanced Web Engineering', progress: 75 },
//     { id: 'MIT-304', title: 'Distributed Systems & Architecture', progress: 40 }
//   ],
//   cognitiveMetrics: {
//     focusScore: 88,
//     retentionRate: 92,
//   },
//   progressOverview: {
//     coursesCount: 3
//   }
// }

// export default function Dashboard() {
//   const { user, loading: authLoading } = useAuth()
//   const [portalData, setPortalData] = useState(null)
//   const [dataLoading, setDataLoading] = useState(true)

//   useEffect(() => {
//     // Simulates a smooth synchronization loop with your core dashboard states
//     function loadDashboardMetrics() {
//       if (!user) return
      
//       try {
//         // Hydrates the dashboard fields smoothly without hitting an external server route
//         setPortalData(MOCK_PORTAL_DATA)
//       } catch (err) {
//         console.error('Error hydrating data profiles:', err)
//       } finally {
//         setDataLoading(false)
//       }
//     }

//     if (!authLoading) {
//       loadDashboardMetrics()
//     }
//   }, [user, authLoading])

//   if (authLoading || dataLoading) {
//     return (
//       <div style={{ padding: '32px 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 56px)' }}>
//         <p style={{ color: 'rgba(255,255,255,0.5)' }}>Loading...</p>
//       </div>
//     )
//   }

//   return (
//     <div style={{ padding: '32px 28px' }}>
//       {/* Header */}
//       <div style={{ marginBottom: 28 }}>
//         <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.25rem', fontWeight: 400, color: '#fff', margin: '0 0 8px' }}>
//           Welcome, {user?.full_name?.split(' ')[0] || 'Student'}
//         </h1>
//         <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', margin: '0 0 20px' }}>
//           Continue your learning journey
//         </p>
//         <StreakBadge streak={portalData?.streak || user?.streak || 8} />
//       </div>

//       {/* AI Recommendation */}
//       <AIRecommendationCard recommendation={portalData?.recommendation} />

//       {/* Main Grid */}
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
//         <div>
//           <ActiveTeamRooms rooms={portalData?.activeRooms} />
//         </div>
//         <div>
//           <CurrentUnits units={portalData?.currentUnits} />
//         </div>
//       </div>

//       {/* Metrics */}
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
//         <CognitiveMetrics metrics={portalData?.cognitiveMetrics} />
//         <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
//           <span style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
//             Progress Overview
//           </span>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//             <div style={{ fontSize: 32 }}>📊</div>
//             <div>
//               <p style={{ margin: 0, fontSize: '13px', color: '#fff', fontWeight: 500 }}>Learning Progress</p>
//               <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
//                 {portalData?.progressOverview?.coursesCount || 3} courses in progress
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }








'use client'

import React, { useState, useEffect } from 'react'
import AIRecommendationCard from '@/components/dashboard/AIRecommendationCard'
import ActiveTeamRooms from '@/components/dashboard/ActiveTeamRooms'
import CurrentUnits from '@/components/dashboard/CurrentUnits'
import CognitiveMetrics from '@/components/dashboard/CognitiveMetrics'
import StreakBadge from '@/components/dashboard/StreakBadge'
import { useAuth } from '@/context/AuthContext'

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth()
  const [portalData, setPortalData] = useState(null)
  const [dataLoading, setDataLoading] = useState(true)
  const [syncError, setSyncError] = useState(null)

  useEffect(() => {
    async function loadDashboardMetrics() {
      if (authLoading) return
      
      try {
        setDataLoading(true)
        setSyncError(null)
        
        // Extract validation key directly matching internal configuration schemas
        const token = typeof window !== 'undefined' ? localStorage.getItem('mb_token') : null

        const headers = { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }

        if (token) {
          headers['Authorization'] = `Bearer ${token}`
        }

        const BACKEND_BASE = 'http://127.0.0.1:5000/api'
        
        // Initializing decoupled local memory caches
        let stats = {}
        let courses = []
        let activeTrack = {}

        // Phase 1: Request Profile Stats Data Stream
        try {
          const statsRes = await fetch(`${BACKEND_BASE}/student/profile-stats/`, { headers, method: 'GET' })
          if (statsRes.ok) stats = await statsRes.json()
        } catch (e) {
          console.warn('⚠️ Profile stats microservice pipeline unreachable:', e.message)
        }

        // Phase 2: Request Course Mapping Track Data Stream
        try {
          const coursesRes = await fetch(`${BACKEND_BASE}/student/courses/`, { headers, method: 'GET' })
          if (coursesRes.ok) {
            const parsedCourses = await coursesRes.json()
            courses = Array.isArray(parsedCourses) ? parsedCourses : []
          }
        } catch (e) {
          console.warn('⚠️ Course listing microservice pipeline unreachable:', e.message)
        }

        // Phase 3: Request Active Core Focus Track Data Stream
        try {
          const activeTrackRes = await fetch(`${BACKEND_BASE}/student/courses/active/`, { headers, method: 'GET' })
          if (activeTrackRes.ok) activeTrack = await activeTrackRes.json()
        } catch (e) {
          console.warn('⚠️ Active tracking stream returned a preflight validation rejection or network fault:', e.message)
        }

        // Phase 4: Construct and bind component state models safely using reliable fallbacks
        setPortalData({
          streak: stats?.loginStreak ?? user?.streak_count ?? 0,
          recommendation: {
            title: activeTrack?.courseName ? 'Dynamic Twin Priority Focus' : 'Workspace Initialized',
            text: activeTrack?.courseName && activeTrack.courseName !== 'No Enrolled Core Tracks Found'
              ? `Your AI Twin recommends shifting focus depth back to "${activeTrack.courseName}" to optimize your learning velocity and offset retention decay.`
              : 'Review relational query schemas or coordinate with peers inside active Team Rooms to establish a structural learning track.',
          },
          activeRooms: courses.length > 0 ? courses.slice(0, 2).map((c, idx) => ({
            id: c.id,
            name: c.title,
            online: idx === 0 ? (stats?.currentFocusDepth || 6) : 3
          })) : [],
          currentUnits: courses.length > 0 ? courses.map(c => ({
            id: c.id,
            title: c.title,
            progress: c.progress || 0
          })) : [],
          cognitiveMetrics: {
            focusScore: (stats?.currentFocusDepth || 6) * 10, 
            retentionRate: stats?.aggregateRetentionRate || 75,
          },
          progressOverview: {
            coursesCount: courses.length
          }
        })

      } catch (err) {
        console.error('Critical Layout Exception Block Caught:', err)
        setSyncError(err.message)
      } finally {
        setDataLoading(false)
      }
    }

    loadDashboardMetrics()
  }, [user, authLoading])

  if (authLoading || dataLoading) {
    return (
      <div style={{ padding: '32px 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 56px)' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', letterSpacing: '0.05em' }}>
          Synchronizing Neural Matrix State...
        </p>
      </div>
    )
  }

  return (
    <div style={{ padding: '32px 28px' }}>
      {/* Header Layout */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.25rem', fontWeight: 400, color: '#fff', margin: '0 0 8px' }}>
          Welcome, {user?.full_name?.split(' ')[0] || 'Student'}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', margin: '0 0 20px' }}>
          Continue your learning journey
        </p>
        <StreakBadge streak={portalData?.streak} />
      </div>

      {/* AI Intelligence Target Panel */}
      <AIRecommendationCard recommendation={portalData?.recommendation} />

      {/* Split Component Grid Matrix Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div>
          <ActiveTeamRooms rooms={portalData?.activeRooms} />
        </div>
        <div>
          <CurrentUnits units={portalData?.currentUnits} />
        </div>
      </div>

      {/* Analytics Evaluation Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <CognitiveMetrics metrics={portalData?.cognitiveMetrics} />
        
        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
            Progress Overview
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 32 }}>📊</div>
            <div>
              <p style={{ margin: 0, fontSize: '13px', color: '#fff', fontWeight: 500 }}>Learning Progress</p>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                {portalData?.progressOverview?.coursesCount || 0} courses in progress
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}