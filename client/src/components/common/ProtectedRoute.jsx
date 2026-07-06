'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingSpinner from './LoadingSpinner'
import { API_URL } from '@/lib/constants'

export default function ProtectedRoute({ children, requiredRole = 'student' }) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('access_token')
        
        if (!token) {
          router.push('/login')
          return
        }

        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const user = await response.json()
          
          if (requiredRole && user.role !== requiredRole) {
            router.push('/unauthorized')
            return
          }
          
          setIsAuthorized(true)
        } else {
          localStorage.removeItem('access_token')
          router.push('/login')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, requiredRole])

  if (isLoading) {
    return <LoadingSpinner fullScreen />
  }

  if (!isAuthorized) {
    return null
  }

  return children
}