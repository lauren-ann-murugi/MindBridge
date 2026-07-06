
// 'use client'

// import { createContext, useContext, useState, useEffect, useCallback } from 'react'
// import { useRouter } from 'next/navigation'
// import toast from 'react-hot-toast'
// import api from '@/services/api'
// import { decodeJWT } from '@/lib/helpers'
// import { ROUTES, ROLES } from '@/lib/constants'

// const AuthContext = createContext(null)

// export function AuthProvider({ children }) {
//   const [user, setUser]       = useState(null)
//   const [token, setToken]     = useState(() => {
//     // SSR Safe Check for Server-Side compilation execution layers
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem('mb_token')
//     }
//     return null
//   })
//   const [loading, setLoading] = useState(true)
//   const router = useRouter()

//   /* ── Rehydrate on mount ── */
//   useEffect(() => {
//     const stored = localStorage.getItem('mb_token')
//     if (stored) {
//       const decoded = decodeJWT(stored)
//       if (decoded && decoded.exp * 1000 > Date.now()) {
//         setToken(stored)
//         setUser(decoded)
//         if (api.defaults?.headers?.common) {
//           api.defaults.headers.common['Authorization'] = `Bearer ${stored}`
//         }
//       } else {
//         localStorage.removeItem('mb_token')
//       }
//     }
//     setLoading(false)
//   }, [])

//   /* ── Persist token changes ── */
//   useEffect(() => {
//     if (token) {
//       localStorage.setItem('mb_token', token)
//       if (api.defaults?.headers?.common) {
//         api.defaults.headers.common['Authorization'] = `Bearer ${token}`
//       }
//     } else {
//       localStorage.removeItem('mb_token')
//       if (api.defaults?.headers?.common) {
//         delete api.defaults.headers.common['Authorization']
//       }
//     }
//   }, [token])

//   /* ── Register Step 1 data temp storage ── */
//   const saveRegStep1 = useCallback((data) => {
//     if (typeof window !== 'undefined') {
//       sessionStorage.setItem('mb_reg', JSON.stringify(data))
//     }
//   }, [])

//   const getRegStep1 = useCallback(() => {
//     if (typeof window === 'undefined') return {}
//     try { return JSON.parse(sessionStorage.getItem('mb_reg') || '{}') }
//     catch { return {} }
//   }, [])

//   /* ── Student Register ── */
//   const register = useCallback(async (step1Data, step2Data) => {
//     setLoading(true)
//     try {
//       const payload = { ...step1Data, ...step2Data }
//       const { data } = await api.post('/auth/register', payload)
      
//       const registrationToken = data.access_token || data.token
      
//       if (registrationToken) {
//         setToken(registrationToken)
//         setUser(decodeJWT(registrationToken))
//       }
      
//       if (typeof window !== 'undefined') {
//         sessionStorage.removeItem('mb_reg')
//       }
      
//       toast.success(data.message || 'Welcome to MindBridge!')
      
//       if (!registrationToken) {
//         router.push(ROUTES.LOGIN)
//       } else {
//         router.push(ROUTES.DASHBOARD)
//       }
//     } catch (err) {
//       const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Registration failed'
//       toast.error(errorMsg)
//       throw err
//     } finally {
//       setLoading(false)
//     }
//   }, [router])

//   /* ── Student Login ── */
//   const login = useCallback(async (email, password) => {
//     setLoading(true)
//     try {
//       const { data } = await api.post('/auth/login', { email, password })
      
//       const activeToken = data.access_token || data.token
//       setToken(activeToken)
//       setUser(decodeJWT(activeToken))
      
//       toast.success(`Welcome back, ${data.user?.full_name?.split(' ')[0] || ''}!`)
//       router.push(ROUTES.DASHBOARD)
//     } catch (err) {
//       const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Invalid credentials'
//       toast.error(errorMsg)
//       throw err
//     } finally {
//       setLoading(false)
//     }
//   }, [router])

//   /* ── Admin Login ── */
//   const adminLogin = useCallback(async (adminId, securityKey) => {
//     setLoading(true)
//     try {
//       const { data } = await api.post('/auth/admin/login', { admin_id: adminId, password: securityKey })
      
//       const activeToken = data.access_token || data.token
//       setToken(activeToken)
//       setUser(decodeJWT(activeToken))
      
//       router.push(ROUTES.ADMIN)
//     } catch (err) {
//       const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Access denied'
//       toast.error(errorMsg)
//       throw err
//     } finally {
//       setLoading(false)
//     }
//   }, [router])

//   /* ── Logout ── */
//   const logout = useCallback(() => {
//     setToken(null)
//     setUser(null)
//     router.push(ROUTES.LOGIN)
//     toast.success('Logged out successfully')
//   }, [router])

//   /* ── Derived states ── */
//   const isAuthenticated = !!token && !!user
//   const isAdmin = user?.role === ROLES.ADMIN
//   const isStudent = user?.role === ROLES.STUDENT

//   return (
//     <AuthContext.Provider value={{
//       user, token, loading,
//       isAuthenticated, isAdmin, isStudent,
//       login, adminLogin, logout, register,
//       saveRegStep1, getRegStep1,
//       setUser,
//     }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => {
//   const ctx = useContext(AuthContext)
//   if (!ctx) throw new Error('useAuth must be inside AuthProvider')
//   return ctx
// }










'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import api from '@/services/api'
import { decodeJWT } from '@/lib/helpers'
import { ROUTES, ROLES } from '@/lib/constants'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [token, setToken]     = useState(() => {
    // SSR Safe Check for Server-Side compilation execution layers
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mb_token')
    }
    return null
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  /* ── Rehydrate on mount ── */
  useEffect(() => {
    const stored = localStorage.getItem('mb_token')
    if (stored) {
      const decoded = decodeJWT(stored)
      // Check expiration block bounds cleanly
      if (decoded && decoded.exp * 1000 > Date.now()) {
        setToken(stored)
        setUser(decoded)
        if (api.defaults?.headers?.common) {
          api.defaults.headers.common['Authorization'] = `Bearer ${stored}`
        }
      } else {
        localStorage.removeItem('mb_token')
        setToken(null)
        setUser(null)
      }
    }
    setLoading(false)
  }, [])

  /* ── Persist token changes ── */
  useEffect(() => {
    if (token) {
      localStorage.setItem('mb_token', token)
      if (api.defaults?.headers?.common) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    } else {
      localStorage.removeItem('mb_token')
      if (api.defaults?.headers?.common) {
        delete api.defaults.headers.common['Authorization']
      }
    }
  }, [token])

  /* ── Register Step 1 data temp storage ── */
  const saveRegStep1 = useCallback((data) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('mb_reg', JSON.stringify(data))
    }
  }, [])

  const getRegStep1 = useCallback(() => {
    if (typeof window === 'undefined') return {}
    try { return JSON.parse(sessionStorage.getItem('mb_reg') || '{}') }
    catch { return {} }
  }, [])

  /* ── Student Register ── */
  const register = useCallback(async (step1Data, step2Data) => {
    setLoading(true)
    try {
      const payload = { ...step1Data, ...step2Data }
      const { data } = await api.post('/auth/register', payload)
      
      const registrationToken = data.access_token || data.token
      
      if (registrationToken) {
        setToken(registrationToken)
        setUser(decodeJWT(registrationToken))
      }
      
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('mb_reg')
      }
      
      toast.success(data.message || 'Welcome to MindBridge!')
      
      if (!registrationToken) {
        router.push(ROUTES.LOGIN)
      } else {
        router.push(ROUTES.DASHBOARD)
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Registration failed'
      toast.error(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [router])

  /* ── Student Login ── */
  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      
      const activeToken = data.access_token || data.token
      setToken(activeToken)
      setUser(decodeJWT(activeToken))
      
      toast.success(`Welcome back, ${data.user?.full_name?.split(' ')[0] || ''}!`)
      router.push(ROUTES.DASHBOARD)
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Invalid credentials'
      toast.error(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [router])

  /* ── Admin Login ── */
  const adminLogin = useCallback(async (adminId, securityKey) => {
    setLoading(true)
    try {
      const { data } = await api.post('/auth/admin/login', { admin_id: adminId, password: securityKey })
      
      const activeToken = data.access_token || data.token
      setToken(activeToken)
      setUser(decodeJWT(activeToken))
      
      router.push(ROUTES.ADMIN)
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Access denied'
      toast.error(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [router])

  /* ── Logout ── */
  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    router.push(ROUTES.LOGIN)
    toast.success('Logged out successfully')
  }, [router])

  /* ── Derived states ── */
  const isAuthenticated = !!token && !!user
  const isAdmin = user?.role === ROLES.ADMIN
  const isStudent = user?.role === ROLES.STUDENT

  return (
    <AuthContext.Provider value={{
      user, token, loading,
      isAuthenticated, isAdmin, isStudent,
      login, adminLogin, logout, register,
      saveRegStep1, getRegStep1,
      setUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}