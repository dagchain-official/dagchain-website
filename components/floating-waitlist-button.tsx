"use client"

import React, { useState } from "react"
import { m } from "framer-motion"
import { Mail } from "lucide-react"

interface FloatingWaitlistButtonProps {
  onClick: () => void
}

export function FloatingWaitlistButton({ onClick }: FloatingWaitlistButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <m.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-40 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        {/* Pulse effect */}
        <m.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-75"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.75, 0.5, 0.75],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Main button */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Mail size={24} />
        </div>

        {/* Tooltip */}
        <m.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : 10
          }}
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium pointer-events-none"
        >
          Join Waitlist
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-l-8 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
        </m.div>
      </div>
    </m.button>
  )
}
