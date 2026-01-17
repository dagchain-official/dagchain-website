"use client"

import React from "react"
import { m } from "framer-motion"

export function NewsTicker() {
  const newsText = "🚨 IMPORTANT - Node Key Sale Coming Up! Join the DAGChain ecosystem as a Validator to strengthen the Network and earn rewards in DAGChain Testnet. Keep watching for more upcoming announcements! 🚀"
  
  return (
    <div className="relative bg-black/10 backdrop-blur-md text-gray-900 overflow-hidden border-b border-white/20 shadow-lg z-30 mt-16 lg:mt-20">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <m.div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
            backgroundSize: '20px 20px'
          }}
          animate={{
            x: [-20, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Glowing Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
      
      {/* Main Ticker Container */}
      <div className="relative z-10 py-3 px-4">
        <div className="flex items-center">
          
          {/* Breaking News Label */}
          <m.div 
            className="flex-shrink-0 flex items-center gap-2 mr-6"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <m.div
              className="w-2 h-2 bg-red-500 rounded-full"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="text-sm font-bold tracking-wider font-mono bg-red-500/90 backdrop-blur-sm px-2 py-1 rounded text-white shadow-lg">
              BREAKING
            </span>
          </m.div>

          {/* Scrolling Text Container */}
          <div className="flex-1 overflow-hidden relative">
            <m.div
              className="flex whitespace-nowrap"
              animate={{
                x: ["100%", "-100%"],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <span className="text-sm font-medium tracking-wide font-inter pr-20">
                {newsText}
              </span>
              {/* Duplicate for seamless loop */}
              <span className="text-sm font-medium tracking-wide font-inter pr-20">
                {newsText}
              </span>
            </m.div>
          </div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
      
      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <m.div
          key={i}
          className="absolute w-1 h-1 bg-purple-500 rounded-full opacity-60"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [-5, 5, -5],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3
          }}
        />
      ))}
    </div>
  )
}
