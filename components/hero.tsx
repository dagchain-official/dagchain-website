"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import React, { useRef, useEffect } from "react"

export function Hero() {

  const videoRef = useRef<HTMLVideoElement | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const video = videoRef.current
      if (video) {
        video.load()          // force load
        video.play().catch(() => { }) // play safely
      }
    }, 800)

    return () => clearTimeout(timer)
  }, [])


  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">

          {/* LCP Banner Image (priority) */}
          <Image
            src="/assets/hero-dagchain.webp"
            alt="DAGChain Hero Banner"
            sizes="100vw"
            width={1440}
            height={900}
            priority
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Video (unchanged) */}
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            title="dagchain in action"
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectFit: "cover" }}
          >
            <source src="/assets/dagchain-hero.mp4" type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>


        {/* Centered DAGChain Title */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pb-96 sm:pb-80 md:pb-72 lg:pb-64">
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold font-nasalization leading-tight"
          >
            <span className="text-white drop-shadow-2xl">
              DAG
            </span>
            <span className="drop-shadow-2xl dagchain-gradient-text">
              CHAIN
            </span>
          </motion.h1>
        </div>

        {/* Bottom Content - Ultra Minimal */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-6 sm:pb-8 pt-16 sm:pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Subtitle */}
              <motion.h2
                variants={itemVariants}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold font-sora text-white mb-3 sm:mb-4 leading-relaxed drop-shadow-lg"
              >
                Powering Agentic AI with Layer 1 Blockchain
              </motion.h2>

              {/* Description */}
              <motion.div
                variants={itemVariants}
                className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-8 font-inter drop-shadow-lg max-w-2xl mx-auto"
              >
                <div className="mb-3 sm:mb-4 text-center px-2 sm:px-4">
                  <span className="block leading-6 sm:leading-7 text-white/90">
                    The first blockchain designed for{" "}
                  </span>
                  <span className="block leading-6 sm:leading-7 text-white font-semibold">
                    no-code builders and vibe coders.
                  </span>
                </div>
                <div className="text-center px-2 sm:px-4">
                  <span className="block leading-6 sm:leading-7 text-white/90">
                    Deploy AI agents, build dApps, and scale
                  </span>
                  <span className="block leading-6 sm:leading-7 text-white/90">
                    your ideas without the complexity.
                  </span>
                </div>
              </motion.div>

              {/* CTA Buttons - No Container */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-4 sm:mb-6"
              >
                <button
                  onClick={() => {
                    const developersSection = document.getElementById('developers');
                    if (developersSection) {
                      developersSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                  className="bg-white/20 backdrop-blur-sm text-white px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-semibold hover:bg-white/30 border border-white/20 rounded-xl transition-all duration-300 flex items-center group"
                >
                  Start Building
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => window.open('/whitepaper', '_blank')}
                  className="whitepaper-button relative inline-block overflow-hidden z-10 text-gray-900 px-6 sm:px-7 py-2.5 sm:py-3 cursor-pointer text-base sm:text-lg font-semibold rounded-lg bg-gray-200 border border-gray-200 transition-all duration-200 ease-in hover:text-white hover:border-purple-600"
                >
                  Whitepaper
                </button>
              </motion.div>

              {/* News Ticker - No Container */}
              <motion.div
                variants={itemVariants}
                className="bg-black/20 backdrop-blur-sm p-2 sm:p-3 rounded-lg border border-white/10"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 flex items-center gap-2 mr-3">
                    <motion.div
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
                    <span className="text-xs font-bold tracking-wider font-mono bg-red-500/90 text-white px-2 py-1 rounded">
                      BREAKING
                    </span>
                  </div>

                  <div className="flex-1 overflow-hidden">
                    <motion.div
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
                      <span className="text-sm font-medium tracking-wide text-white/90 pr-20">
                        🚨 IMPORTANT - Node Key Sale Coming Up! Join the DAGChain ecosystem as a Validator to strengthen the Network and earn rewards in DAGChain Testnet. Keep watching for more upcoming announcements! 🚀
                      </span>
                      <span className="text-sm font-medium tracking-wide text-white/90 pr-20">
                        🚨 IMPORTANT - Node Key Sale Coming Up! Join the DAGChain ecosystem as a Validator to strengthen the Network and earn rewards in DAGChain Testnet. Keep watching for more upcoming announcements! 🚀
                      </span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
