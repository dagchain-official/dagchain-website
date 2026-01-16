"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Users, Video } from "lucide-react"

export function BookMeeting() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let scriptLoaded = false

    const loadCalendly = () => {
      if (scriptLoaded) return
      scriptLoaded = true

      const script = document.createElement("script")
      script.src = "https://assets.calendly.com/assets/external/widget.js"
      script.async = true
      document.body.appendChild(script)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadCalendly()
          observer.disconnect()
        }
      },
      { rootMargin: "200px" }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    { icon: Calendar, text: "Flexible Scheduling" },
    { icon: Video, text: "Virtual Meetings" },
    { icon: Users, text: "Expert Team" },
    { icon: Clock, text: "Quick Response" }
  ]

  return (
    <section
      ref={sectionRef}
      id="meeting-section"
      className="relative py-24 bg-gray-50 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-gray-50 shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] flex items-center justify-center border border-gray-200">
              <Calendar className="w-8 h-8 text-gray-800" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 font-nasalization text-gray-900"
            style={{
              textShadow: '4px 4px 8px rgba(0,0,0,0.1), -2px -2px 4px rgba(255,255,255,0.8)'
            }}
          >
            BOOK A MEETING WITH DAGChain
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-gray-700 font-semibold mb-3"
          >
            Let's Talk About Building Tomorrow.
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-sm text-gray-600 max-w-3xl mx-auto"
          >
            Connect with our core team - explore collaborations, investments, and partnerships.
          </motion.p>
        </motion.div>

        {/* Features Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-[6px_6px_12px_rgba(163,177,198,0.25),-6px_-6px_12px_rgba(255,255,255,0.9)] border border-gray-200"
              >
                <Icon className="w-4 h-4 text-gray-700" />
                <span className="text-xs text-gray-700 font-medium">{feature.text}</span>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Main Meeting Frame - Neumorphic Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* 3D Neumorphic Container */}
          <div className="relative bg-gray-50 rounded-3xl p-8 shadow-[20px_20px_60px_rgba(163,177,198,0.5),-20px_-20px_60px_rgba(255,255,255,0.9)] border border-gray-200">

            {/* Calendly Embed Container */}
            <div className="relative min-h-[700px] rounded-2xl overflow-hidden bg-white shadow-[inset_12px_12px_24px_rgba(163,177,198,0.2),inset_-12px_-12px_24px_rgba(255,255,255,0.9)] border border-gray-200">
              {/* Embedded Calendly Widget */}
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/meetings-DAGChain/30min?primary_color=008aeb"
                style={{ minWidth: '320px', height: '700px' }}
              ></div>
            </div>

            {/* Bottom Info Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
              className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                <span>Available Now</span>
              </div>
              <span className="text-gray-400">•</span>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>30 min sessions</span>
              </div>
              <span className="text-gray-400">•</span>
              <div className="flex items-center gap-2">
                <Video className="w-3 h-3" />
                <span>Virtual or In-Person</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-xs text-gray-500">
            All meetings are confidential and NDA-protected. We respect your time and privacy.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
