"use client"

import React from "react"
import { motion } from "framer-motion"

const TEAM = [
  {
    name: "Jose Knutson",
    role: "Chief Executive Officer",
    img: "/assets/team/Jose Knutson.jpg",
  },
  {
    name: "Bernard Ramos",
    role: "Chief Marketing Officer",
    img: "/assets/team/Bernard Ramos.jpg",
  },
  {
    name: "Michael Alexander",
    role: "Chief Technology Officer",
    img: "/assets/team/Michael Alexander.jpg",
  },
  {
    name: "Frank Smith",
    role: "Infrastructure Lead",
    img: "/assets/team/Frank Smith.jpg",
  },
  {
    name: "Annie Johnson",
    role: "Creative Head",
    img: "/assets/team/Annie Johnson.jpg",
  },
  {
    name: "Harman Aziz",
    role: "Lead Programmer",
    img: "/assets/team/Harman Aziz.jpg",
  },
  {
    name: "Kimberly Wagner",
    role: "Graphic Designer",
    img: "/assets/team/Kimberly Wagner.jpg",
  },
]

export function Team() {
  return (
    <section id="team" className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Subtle technical grid background to stay consistent */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(107,114,128,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(107,114,128,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-6 py-2 bg-gray-100 rounded-full text-gray-700 text-sm font-mono tracking-wider mb-6 shadow-[4px_4px_8px_rgba(163,177,198,0.2),-4px_-4px_8px_rgba(255,255,255,0.8)]">
            OUR TEAM
          </span>
          <h2 className="text-4xl md:text-6xl font-bold font-nasalization bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            Our Team
          </h2>
          <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto font-inter leading-relaxed">
            Our people are our greatest asset and biggest differentiator. <br className="hidden sm:block" />
            They also believe in having a lot of fun along the way.
          </p>
        </motion.div>

        {/* Team Grid - 4 + 3 Layout */}
        <div className="space-y-8">
          {/* First Row - 4 members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {TEAM.slice(0, 4).map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group relative bg-white rounded-2xl p-4 border border-gray-200 shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] hover:shadow-[20px_20px_40px_rgba(163,177,198,0.4),-20px_-20px_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer w-full max-w-[280px]"
              >
                {/* Embossed frame */}
                <div className="rounded-xl overflow-hidden bg-white neumorphic-inset">
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <img
                      src={member.img}
                      alt={`${member.name} portrait`}
                      className="w-full h-full object-cover filter grayscale contrast-110 brightness-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="mt-5 text-center">
                  <h3 className="text-xl text-gray-900 font-nasalization tracking-wide group-hover:text-gray-700 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 font-inter group-hover:text-gray-500 transition-colors duration-300">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Second Row - 3 members (centered) */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-4xl">
              {TEAM.slice(4, 7).map((member, idx) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: (idx + 4) * 0.05 }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="group relative bg-white rounded-2xl p-4 border border-gray-200 shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] hover:shadow-[20px_20px_40px_rgba(163,177,198,0.4),-20px_-20px_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer w-full max-w-[280px]"
                >
                  {/* Embossed frame */}
                  <div className="rounded-xl overflow-hidden bg-white neumorphic-inset">
                    <div className="aspect-[4/5] w-full overflow-hidden">
                      <img
                        src={member.img}
                        alt={`${member.name} portrait`}
                        className="w-full h-full object-cover filter grayscale contrast-110 brightness-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="mt-5 text-center">
                    <h3 className="text-xl text-gray-900 font-nasalization tracking-wide group-hover:text-gray-700 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 font-inter group-hover:text-gray-500 transition-colors duration-300">
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
