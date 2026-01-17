"use client"

import React from "react"
import { m } from "framer-motion"
import { Users, Shield, Gift, Vote } from "lucide-react"

export function RevolutionCTA() {
  return (
    <section className="relative py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Community CTA */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-100 rounded-3xl p-8 lg:p-12 text-gray-800 text-center shadow-[20px_20px_40px_rgba(163,177,198,0.4),-20px_-20px_40px_rgba(255,255,255,0.9)] border border-gray-200"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Users className="w-8 h-8 text-gray-700" />
            <h3 className="text-2xl lg:text-3xl font-bold font-nasalization">Be Part of the Revolution</h3>
          </div>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-inter mb-8">
            Join 15,000+ community members building the future of AI and blockchain. 
            Whether you're a validator, creator, or builder - there's a place for you in DAGChain.
          </p>
          
          <m.div
            className="flex flex-wrap justify-center gap-6 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 bg-white text-gray-700 shadow-[6px_6px_12px_rgba(163,177,198,0.25),-6px_-6px_12px_rgba(255,255,255,0.9)] px-4 py-2 rounded-full border border-gray-200">
              <Shield className="w-4 h-4 text-gray-700" />
              <span>Secure & Decentralized</span>
            </div>
            <div className="flex items-center gap-2 bg-white text-gray-700 shadow-[6px_6px_12px_rgba(163,177,198,0.25),-6px_-6px_12px_rgba(255,255,255,0.9)] px-4 py-2 rounded-full border border-gray-200">
              <Gift className="w-4 h-4 text-gray-700" />
              <span>Rewarded Participation</span>
            </div>
            <div className="flex items-center gap-2 bg-white text-gray-700 shadow-[6px_6px_12px_rgba(163,177,198,0.25),-6px_-6px_12px_rgba(255,255,255,0.9)] px-4 py-2 rounded-full border border-gray-200">
              <Vote className="w-4 h-4 text-gray-700" />
              <span>Community Governed</span>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  )
}
