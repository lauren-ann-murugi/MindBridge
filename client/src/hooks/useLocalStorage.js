'use client'

import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook to manage state synchronized with window.localStorage.
 * Safe for Next.js SSR configurations.
 * * @param {string} key - The key string used for storage registration mapping
 * @param {any} initialValue - Fallback initialization value if key is empty
 */
export default function useLocalStorage(key, initialValue) {
  
  // Safe extraction logic running exclusively once client window hits readiness
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`⚠️ Error reading key "${key}" from localStorage:`, error)
      return initialValue
    }
  }, [key, initialValue])

  const [storedValue, setStoredValue] = useState(() => readValue())

  // Set value abstraction method supporting primitive or functional updates
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      setStoredValue(valueToStore)

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(`❌ Error setting key "${key}" into localStorage:`, error)
    }
  }, [key, storedValue])

  useEffect(() => {
    setStoredValue(readValue())
  }, [key, readValue])

  return [storedValue, setValue]
}