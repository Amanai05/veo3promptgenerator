import { useState, useEffect } from 'react'

const BOOKMARK_TOAST_KEY = 'bookmarkToastShown'

export function useToastNotification() {
  const [showToast, setShowToast] = useState(false)
  const [hasShownToast, setHasShownToast] = useState(false)

  // Check localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasShown = localStorage.getItem(BOOKMARK_TOAST_KEY) === 'true'
      setHasShownToast(hasShown)
    }
  }, [])

  // Show toast after successful prompt generation with 4-second delay
  const showToastAfterSuccess = () => {
    if (typeof window !== 'undefined' && !hasShownToast) {
      // Check if desktop
      if (window.innerWidth > 768) {
        // Delay toast by 4 seconds
        setTimeout(() => {
          setShowToast(true)
          setHasShownToast(true)
          localStorage.setItem(BOOKMARK_TOAST_KEY, 'true')
        }, 4000) // 4-second delay
      }
    }
  }

  // Close toast
  const closeToast = () => {
    setShowToast(false)
  }

  return {
    showToast,
    showToastAfterSuccess,
    closeToast,
    hasShownToast
  }
} 