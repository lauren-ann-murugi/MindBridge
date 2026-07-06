'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingSpinner from './LoadingSpinner'
import { API_URL } from '@/lib/constants'

export default function AdminRoute({ children }) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const token = localStorage.getItem('access_token')
        const adminToken = localStorage.getItem('admin_token')
        
        if (!token && !adminToken) {
          router.push('/admin/login')
          return
        }

        const authToken = adminToken || token
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        })

        if (response.ok) {
          const user = await response.json()
          
          if (user.role !== 'admin') {
            router.push('/unauthorized')
            return
          }
          
          setIsAuthorized(true)
        } else {
          localStorage.removeItem('access_token')
          localStorage.removeItem('admin_token')
          router.push('/admin/login')
        }
      } catch (error) {
        console.error('Admin auth check failed:', error)
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAdminAuth()
  }, [router])

  if (isLoading) {
    return <LoadingSpinner fullScreen />
  }

  if (!isAuthorized) {
    return null
  }

  return children
}