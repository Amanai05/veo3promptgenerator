"use client"

import { useState, useEffect, useRef } from 'react'
import { X, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ToastNotificationProps {
  isVisible: boolean
  onClose: () => void
}

export function ToastNotification({ isVisible, onClose }: ToastNotificationProps) {
  const [isCopied, setIsCopied] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [hasPlayedSound, setHasPlayedSound] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const audioRef = useRef<HTMLAudioElement>(null)

  // Check if desktop and handle resize
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 768)
    }
    
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  // Auto-dismiss after 10 seconds
  useEffect(() => {
    if (isVisible && isDesktop) {
      // Play notification sound only once per session
      if (audioRef.current && !hasPlayedSound) {
        // Set volume to 50% for better user experience
        audioRef.current.volume = 0.5
        
        // Try to play the sound
        const playSound = async () => {
          try {
            await audioRef.current!.play()
            setHasPlayedSound(true)
            console.log('Toast notification sound played successfully')
          } catch (error) {
            console.log('Audio autoplay blocked or failed:', error)
            // Continue without sound if autoplay is blocked
          }
        }
        
        playSound()
      }

      timeoutRef.current = setTimeout(() => {
        onClose()
      }, 10000) // 10 seconds duration

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }
  }, [isVisible, isDesktop, onClose, hasPlayedSound])

  // Copy link functionality
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setIsCopied(true)
      
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  // Don't render on mobile/tablet
  if (!isDesktop) {
    return null
  }

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  return (
    <>
      {/* Audio element for notification sound */}
      <audio ref={audioRef} preload="auto" muted={false}>
        <source src="/sounds/toastnotifications.wav" type="audio/wav" />
        <source src="/sounds/toastnotifications.mp3" type="audio/mpeg" />
      </audio>

      {/* Toast Notification */}
      <div
        className={`fixed top-0 left-0 z-[9999] p-4 transition-all duration-500 ${
          isVisible 
            ? 'translate-x-0 opacity-100' 
            : '-translate-x-full opacity-0 pointer-events-none'
        }`}
        style={{
          top: 'calc(var(--header-height, 64px) + 5px)',
          left: '20px',
          maxWidth: '320px',
          transform: prefersReducedMotion ? 'none' : undefined,
          transition: prefersReducedMotion ? 'none' : undefined
        }}
        onKeyDown={handleKeyDown}
        role="alert"
        aria-live="polite"
      >
        <div className="bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-800 dark:to-purple-900 rounded-xl p-4 shadow-xl border-2 border-purple-300 dark:border-purple-600 relative overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 to-transparent pointer-events-none"></div>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-purple-200 dark:hover:bg-purple-700 transition-colors z-20"
            aria-label="Dismiss toast"
            tabIndex={0}
          >
            <X className="h-4 w-4 text-purple-700 dark:text-purple-300 font-semibold" />
          </button>

          {/* Content */}
          <div className="pr-6 space-y-3 relative z-10">
            {/* Bookmark Message */}
            <div className="flex items-start space-x-2">
              <span className="text-lg">🔥</span>
              <p className="text-sm text-purple-900 dark:text-purple-100 leading-relaxed font-semibold font-poppins">
                Liked your prompt? Press{' '}
                <kbd className="px-2 py-1 bg-purple-300 dark:bg-purple-600 rounded-md text-xs font-mono font-bold text-purple-900 dark:text-purple-100 border border-purple-400 dark:border-purple-500">
                  {navigator.platform.includes('Mac') ? 'Cmd' : 'Ctrl'}+D
                </kbd>{' '}
                to bookmark!
              </p>
            </div>

            {/* Share Message */}
            <div className="flex items-start space-x-2">
              <span className="text-lg">📎</span>
              <p className="text-sm text-purple-800 dark:text-purple-200 leading-relaxed font-semibold font-poppins">
                Want to share? Copy this link.
              </p>
            </div>

            {/* Copy Link Button */}
            <Button
              onClick={copyLink}
              variant="outline"
              size="sm"
              className="w-full justify-center space-x-2 h-8 text-sm border-purple-400 dark:border-purple-500 text-purple-800 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-700 font-semibold font-poppins"
              disabled={isCopied}
            >
              {isCopied ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 text-sm font-semibold">✅ Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span className="text-sm font-semibold">Copy Link</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
} 