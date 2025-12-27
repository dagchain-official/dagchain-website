"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

interface WelcomeScreenProps {
  onComplete: () => void
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [showCurtain, setShowCurtain] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [animationLoaded, setAnimationLoaded] = useState(true) // Force to true for now
  const [shouldZoom, setShouldZoom] = useState(false)
  const [startTime] = useState(Date.now())
  const lottieRef = useRef<any>(null)

  console.log('WelcomeScreen rendered, showCurtain:', showCurtain, 'isComplete:', isComplete)

  useEffect(() => {
    // Force animation to show after 2 seconds if not loaded
    const forceShowTimer = setTimeout(() => {
      if (!animationLoaded) {
        console.log('Force showing animation after timeout')
        setAnimationLoaded(true)
      }
    }, 2000)

    // Start zoom effect after 5 seconds (give animation time to render properly)
    const zoomTimer = setTimeout(() => {
      console.log('Starting zoom effect')
      setShouldZoom(true)
    }, 5000)

    // Complete and go to main site after zoom (5s + 1s zoom = 6s total)
    const completeTimer = setTimeout(() => {
      console.log('Welcome screen completed')
      setIsComplete(true)
      onComplete()
    }, 6000)

    return () => {
      clearTimeout(forceShowTimer)
      clearTimeout(zoomTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  if (isComplete) return null

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">

      {/* Lottie Animation */}
      <div className="w-full h-full flex items-center justify-center relative z-10">
        <motion.div 
          className="w-[600px] h-[600px] flex items-center justify-center"
          animate={{
            scale: shouldZoom ? 3 : 1
          }}
          transition={{
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <DotLottieReact
            ref={lottieRef}
            src="https://lottie.host/4a49f33e-46a6-4f0e-bb9c-c3fb438163c0/JQKvjHaMMM.lottie"
            loop={true}
            autoplay
            speed={1}
            style={{ 
              width: '600px', 
              height: '600px'
            }}
            onLoad={() => {
              console.log('Lottie animation loaded successfully')
              setAnimationLoaded(true)
            }}
            onError={(error) => {
              console.error('Lottie animation failed to load:', error)
              // Force show as loaded to proceed
              setAnimationLoaded(true)
            }}
          />
        </motion.div>
      </div>

      {/* Fallback - show a simple animation if Lottie fails */}
      {!animationLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-5 px-4">
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-800 text-lg sm:text-xl font-bold font-nasalization">DAGChain</p>
            <p className="text-gray-600 text-sm sm:text-base">Initializing...</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {!animationLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-20 px-4">
          <div className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-800 font-medium text-sm sm:text-base">Loading Welcome Experience...</p>
          </div>
        </div>
      )}



      {/* Welcome Text */}
      <div className="absolute bottom-24 sm:bottom-32 left-1/2 transform -translate-x-1/2 z-20 px-4 w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: shouldZoom ? 0 : 1, 
            y: shouldZoom ? -20 : 0 
          }}
          transition={{ 
            delay: shouldZoom ? 0 : 1.5, 
            duration: shouldZoom ? 0.5 : 0.8 
          }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 text-center font-sora"
        >
          Welcome to <span className="font-nasalization">DAGChain</span>
        </motion.h1>
      </div>

      {/* Loading Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: shouldZoom ? 0 : 1 
          }}
          transition={{ 
            delay: shouldZoom ? 0 : 2, 
            duration: shouldZoom ? 0.5 : 0.8 
          }}
          className="flex items-center justify-center space-x-2 text-gray-600"
        >
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              background: 'linear-gradient(135deg, #123CFE 0%, #FFE5F5 100%)'
            }}
          ></div>
          <span className="text-xs sm:text-sm font-medium">Loading Experience...</span>
        </motion.div>
      </div>
    </div>
  )
}
