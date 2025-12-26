"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, CheckCircle, Clock, Target } from "lucide-react"

export function Roadmap() {
  const [activePhase, setActivePhase] = useState(0)

  const roadmapData = [
    {
      phase: "Foundation",
      period: "Oct - Dec 2025",
      milestones: [
        {
          month: "Oct 2025",
          title: "Concept Validation",
          status: "planning",
          highlights: [
            "Brand identity finalized → DAGChain.network hub",
            "Research on existing L2 limitations completed",
            "Whitepaper drafted with AI-native primitives",
            "Strategic advisor discussions initiated"
          ]
        },
        {
          month: "Nov 2025", 
          title: "Architecture Design",
          status: "planning",
          highlights: [
            "Ethereum fork baseline setup",
            "Rollup design aligned with Ethereum settlement",
            "Smart contract security review",
            "Developer workflow pipeline established"
          ]
        },
        {
          month: "Dec 2025",
          title: "Consensus Finalization", 
          status: "planning",
          highlights: [
            "PoS consensus parameters finalized",
            "Devnet environment launched",
            "Tokenomics framework tested",
            "Smart contracts moved to audit cycle"
          ]
        },
        {
          month: "Oct 2025 - Aug 2026",
          title: "Node Key Sale & Validator Onboarding",
          status: "planning",
          highlights: [
            "Node Key Sale: Onboarding 10k Node validators for TestNet",
            "Node Key Pricing: Phased from $750 - $1500",
            "Validator Requirements: Minimum hardware specs published",
            "Early Validator Incentives: Bonus rewards for first 1000 nodes"
          ]
        }
      ]
    },
    {
      phase: "Launch",
      period: "Feb - May 2026", 
      milestones: [
        {
          month: "Feb 2026",
          title: "Public Testnet Launch",
          status: "development",
          highlights: [
            "Explorer, wallet UI, faucet go live",
            "Testnet tokens distributed to developers",
            "Developer documentation published",
            "AI builders onboarding campaign"
          ]
        },
        {
          month: "Mar 2026",
          title: "Agent Registry Alpha",
          status: "development", 
          highlights: [
            "AI Agent Identity System launched",
            "Basic reputation system introduced",
            "First AI Agent Builders hackathon",
            "Research partnerships with AI tools"
          ]
        },
        {
          month: "Apr 2026",
          title: "Provenance Stamp Prototype",
          status: "development",
          highlights: [
            "Provenance framework for AI assets",
            "IPFS/Arweave integration",
            "Creator verification workflows",
            "Content marketplace pilots"
          ]
        },
        {
          month: "May 2026",
          title: "Micro-Payment Rails",
          status: "development",
          highlights: [
            "Sub-cent AI-to-AI transactions",
            "Streaming payment prototype",
            "Multi-agent workflow simulations", 
            "Decentralized compute partnerships"
          ]
        }
      ]
    },
    {
      phase: "Growth",
      period: "June - Sep 2026",
      milestones: [
        {
          month: "June 2026",
          title: "SDK Alpha Release",
          status: "upcoming",
          highlights: [
            "SDK for no-code platforms released",
            "Agent-to-chain API documentation",
            "Wallet abstraction support",
            "Developer feedback integration"
          ]
        },
        {
          month: "Jul 2026", 
          title: "Early Integrations",
          status: "upcoming",
          highlights: [
            "First AI-native projects deployed",
            "Provenance demos showcased",
            "Real-world micro-payment testing",
            "Ecosystem grant selections"
          ]
        },
        {
          month: "Aug 2026",
          title: "DevHub & Hackathons", 
          status: "upcoming",
          highlights: [
            "DAGChain DevHub launched",
            "Global hackathon announced",
            "$500K ecosystem grants",
            "Community governance experiments"
          ]
        },
        {
          month: "Sep 2026",
          title: "Mainnet Beta Launch",
          status: "upcoming", 
          highlights: [
            "Mainnet Beta with validator staking",
            "$DGC token activated",
            "5K+ validators targeted",
            "Genesis governance council"
          ]
        }
      ]
    },
    {
      phase: "Scale",
      period: "Sep 2026 - 2027+",
      milestones: [
        {
          month: "Sep-Dec 2026",
          title: "Ecosystem Expansion",
          status: "future",
          highlights: [
            "Provenance Marketplaces launched",
            "Agent Discovery Service deployed", 
            "Enterprise pilots initiated",
            "Tier-1 exchange listings"
          ]
        },
        {
          month: "2027+",
          title: "Global Expansion", 
          status: "future",
          highlights: [
            "Cross-chain interoperability",
            "Enterprise AI integration",
            "50K+ global node network",
            "Default AI economy layer"
          ]
        }
      ]
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning': return Clock
      case 'development': return Target
      case 'upcoming': return Calendar
      case 'future': return CheckCircle
      default: return Clock
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <section id="roadmap" className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="bg-white p-3 shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200 rounded-2xl inline-block mb-8"
          >
            <span className="text-sm font-semibold text-gray-700 tracking-wider uppercase">ROADMAP</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-nasalization leading-tight"
          >
            Development Timeline
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-inter"
          >
            Our strategic roadmap from concept to global AI economy infrastructure, with clear milestones and deliverables.
          </motion.p>
        </motion.div>

        {/* Phase Navigation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {roadmapData.map((phase, index) => (
            <motion.button
              key={index}
              variants={itemVariants}
              onClick={() => setActivePhase(index)}
              className={`px-6 py-3 font-medium transition-all duration-300 rounded-2xl ${
                activePhase === index
                  ? 'bg-white shadow-[inset_-8px_-8px_16px_rgba(255,255,255,0.7),inset_8px_8px_16px_rgba(163,177,198,0.3)] border border-gray-200 text-gray-900'
                  : 'bg-gray-50 shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] hover:shadow-[8px_8px_16px_rgba(163,177,198,0.4),-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200 text-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-lg font-bold font-nasalization">{phase.phase}</div>
              <div className="text-sm opacity-80">{phase.period}</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Active Phase Content */}
        <motion.div
          key={activePhase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 shadow-[30px_30px_60px_rgba(163,177,198,0.4),-30px_-30px_60px_rgba(255,255,255,0.9)] border border-gray-200 rounded-3xl mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2 font-nasalization">
              {roadmapData[activePhase].phase} Phase
            </h3>
            <p className="text-xl text-gray-600 font-inter">
              {roadmapData[activePhase].period}
            </p>
          </div>

          {/* Milestones Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {roadmapData[activePhase].milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-50 p-6 shadow-[inset_12px_12px_24px_rgba(163,177,198,0.2),inset_-12px_-12px_24px_rgba(255,255,255,0.8)] border border-gray-200 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-[6px_6px_12px_rgba(163,177,198,0.3),-6px_-6px_12px_rgba(255,255,255,0.9)] border border-gray-200 flex items-center justify-center">
                    {React.createElement(getStatusIcon(milestone.status), { className: "w-6 h-6 text-gray-700" })}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">{milestone.month}</div>
                    <h4 className="text-lg font-bold text-gray-900 font-nasalization">{milestone.title}</h4>
                  </div>
                </div>

                <div className="space-y-2">
                  {milestone.highlights.map((highlight, highlightIndex) => (
                    <div
                      key={highlightIndex}
                      className="group bg-white p-3 rounded-xl shadow-[4px_4px_8px_rgba(163,177,198,0.3),-4px_-4px_8px_rgba(255,255,255,0.9)] border border-gray-200 hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.1)] hover:border-blue-900/20 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                      style={{
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #123CFE 0%, #FFE5F5 100%)'
                        const span = e.currentTarget.querySelector('span')
                        if (span) span.style.color = 'white'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white'
                        const span = e.currentTarget.querySelector('span')
                        if (span) span.style.color = '#374151'
                      }}
                    >
                      <span className="text-sm text-gray-700 font-medium transition-colors duration-300">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Status Badge */}
                <div className="mt-4 flex justify-end">
                  <span className="px-3 py-1 text-xs font-semibold bg-white shadow-[4px_4px_8px_rgba(163,177,198,0.3),-4px_-4px_8px_rgba(255,255,255,0.9)] border border-gray-200 rounded-full text-gray-700 capitalize">
                    {milestone.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white p-8 shadow-[24px_24px_48px_rgba(163,177,198,0.4),-24px_-24px_48px_rgba(255,255,255,0.9)] border border-gray-200 rounded-3xl"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-bold text-gray-900 mb-6 text-center font-nasalization"
          >
            Complete Timeline Overview
          </motion.h3>

          <div className="grid md:grid-cols-4 gap-4">
            {roadmapData.map((phase, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onClick={() => setActivePhase(index)}
                className={`p-4 cursor-pointer transition-all duration-300 rounded-2xl text-center ${
                  activePhase === index
                    ? 'bg-gray-50 shadow-[inset_-6px_-6px_12px_rgba(255,255,255,0.7),inset_6px_6px_12px_rgba(163,177,198,0.3)] border border-gray-300'
                    : 'bg-gray-100 shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[6px_6px_12px_rgba(163,177,198,0.4),-6px_-6px_12px_rgba(255,255,255,0.9)] border border-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-lg font-bold text-gray-900 mb-1 font-nasalization">{phase.phase}</div>
                <div className="text-sm text-gray-600 mb-2">{phase.period}</div>
                <div className="text-xs text-gray-500">{phase.milestones.length} milestones</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
