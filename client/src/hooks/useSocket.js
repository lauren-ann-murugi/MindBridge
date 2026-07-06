'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { io } from 'socket.io-client'

/**
 * Custom hook managing WebSocket communication sessions with the backend server.
 * Handles lifecycle mounts and connection heartbeats securely.
 * * @param {string} customUrl - Alternative server instance destination base mapping (optional)
 */
export default function useSocket(customUrl) {
  const socketRef = useRef(null)
  const [isConnected, setIsConnected] = useState(false)
  
  // Default connection socket cluster path mapping pointing directly to your Flask microservices backend
  const SOCKET_SERVER_URL = customUrl || 'http://127.0.0.1:5000'

  useEffect(() => {
    const token = localStorage.getItem('token') || 
                  localStorage.getItem('authToken') || 
                  localStorage.getItem('jwt')

    // Initialize socket connection mapping instance parameters
    const socketInstance = io(SOCKET_SERVER_URL, {
      auth: { token },
      autoConnect: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
      transports: ['websocket', 'polling']
    })

    socketRef.current = socketInstance

    // Core Lifecycle Event Hooks
    socketInstance.on('connect', () => {
      setIsConnected(true)
      console.log('🔌 WebSocket stream successfully connected to MindBridge Node Router.')
    })

    socketInstance.on('disconnect', () => {
      setIsConnected(false)
      console.log('🔌 WebSocket connection dropped from server engine pipeline.')
    })

    socketInstance.on('connect_error', (err) => {
      console.error('❌ Socket transmission handoff protocol rejected:', err.message)
    })

    // Clean disconnect wrapper upon component unmounting execution calls
    return () => {
      if (socketInstance) {
        socketInstance.disconnect()
      }
    }
  }, [SOCKET_SERVER_URL])

  // Abstracted transmission channel emission macro helper 
  const emitEvent = useCallback((eventName, payload) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit(eventName, payload)
    } else {
      console.warn(`⚠️ Event "${eventName}" dropped. Socket stream currently disconnected.`)
    }
  }, [isConnected])

  // Abstracted downstream target listener setup binding helper
  const listenToEvent = useCallback((eventName, callback) => {
    if (!socketRef.current) return

    socketRef.current.on(eventName, callback)

    // Return custom teardown context wrapper layer to cleanly unbind localized updates
    return () => {
      if (socketRef.current) {
        socketRef.current.off(eventName, callback)
      }
    }
  }, [])

  return {
    socket: socketRef.current,
    isConnected,
    emitEvent,
    listenToEvent
  }
}