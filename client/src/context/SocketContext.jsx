'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext()

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    
    if (!token) return

    // Initialize Socket.IO connection
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000', {
      auth: {
        token: token,
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    })

    // Connection events
    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id)
      setIsConnected(true)
    })

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected')
      setIsConnected(false)
    })

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error)
    })

    // Room events
    newSocket.on('room_list', (roomList) => {
      setRooms(roomList)
    })

    newSocket.on('user_joined', (data) => {
      console.log('User joined:', data)
    })

    newSocket.on('user_left', (data) => {
      console.log('User left:', data)
    })

    newSocket.on('new_message', (message) => {
      console.log('New message:', message)
    })

    newSocket.on('typing', (data) => {
      console.log('User typing:', data)
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  const joinRoom = (roomId) => {
    if (socket) {
      socket.emit('join_room', { room_id: roomId })
    }
  }

  const leaveRoom = (roomId) => {
    if (socket) {
      socket.emit('leave_room', { room_id: roomId })
    }
  }

  const sendMessage = (roomId, message) => {
    if (socket) {
      socket.emit('send_message', {
        room_id: roomId,
        message: message,
        timestamp: new Date().toISOString(),
      })
    }
  }

  const setTyping = (roomId, isTyping) => {
    if (socket) {
      socket.emit('typing', {
        room_id: roomId,
        is_typing: isTyping,
      })
    }
  }

  const startBattle = (battleData) => {
    if (socket) {
      socket.emit('start_battle', battleData)
    }
  }

  const answerQuestion = (battleId, answer) => {
    if (socket) {
      socket.emit('answer_question', {
        battle_id: battleId,
        answer: answer,
        timestamp: new Date().toISOString(),
      })
    }
  }

  const onNewMessage = (callback) => {
    if (socket) {
      socket.on('new_message', callback)
      return () => socket.off('new_message', callback)
    }
  }

  const onOpponentAnswered = (callback) => {
    if (socket) {
      socket.on('opponent_answered', callback)
      return () => socket.off('opponent_answered', callback)
    }
  }

  const onBattleEnded = (callback) => {
    if (socket) {
      socket.on('battle_ended', callback)
      return () => socket.off('battle_ended', callback)
    }
  }

  const onAchievementUnlocked = (callback) => {
    if (socket) {
      socket.on('achievement_unlocked', callback)
      return () => socket.off('achievement_unlocked', callback)
    }
  }

  const value = {
    socket,
    isConnected,
    rooms,
    joinRoom,
    leaveRoom,
    sendMessage,
    setTyping,
    startBattle,
    answerQuestion,
    onNewMessage,
    onOpponentAnswered,
    onBattleEnded,
    onAchievementUnlocked,
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider')
  }
  return context
}