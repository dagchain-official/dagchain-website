"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Code, Shield, Zap, Database, Network, Server } from "lucide-react"

export function Technology() {
  const [activeIndex, setActiveIndex] = useState(0)

  const technologies = [
    {
      id: "agent-registry",
      title: "AI Agent Registry",
      icon: Code,
      description: "Decentralized identity protocol for AI agents with cryptographic verification and reputation scoring.",
      techSpecs: ["ECC-256 Encryption", "Zero-Knowledge Proofs", "Reputation Oracle", "Identity Verification"],
      metrics: { agents: "5,000+", uptime: "100.00%", latency: "<12ms" }
    },
    {
      id: "provenance-stamp",
      title: "Provenance System",
      icon: Shield,
      description: "Immutable content authentication using cryptographic fingerprinting and blockchain attestation.",
      techSpecs: ["SHA-3 Hashing", "Merkle Tree Validation", "IPFS Integration", "Content Verification"],
      metrics: { stamps: "1M+", cost: "$0.001", speed: "Instant" }
    },
    {
      id: "micro-payments",
      title: "Micro-Payment Rails",
      icon: Zap,
      description: "High-frequency, sub-cent transaction infrastructure optimized for AI-to-AI commerce.",
      techSpecs: ["State Channels", "Payment Streaming", "Atomic Swaps", "Gas Optimization"],
      metrics: { volume: "$100M+", tps: "20,000", fees: "<0.1¢" }
    },
    {
      id: "ai-sdk",
      title: "AI SDK & API",
      icon: Database,
      description: "Developer-first integration layer abstracting blockchain complexity for AI applications.",
      techSpecs: ["GraphQL API", "WebSocket Streams", "Auto-scaling", "SDK Libraries"],
      metrics: { devs: "10K+", apis: "500+", uptime: "100.0%" }
    },
    {
      id: "ethereum-l2",
      title: "Ethereum L2",
      icon: Network,
      description: "EVM-compatible Layer 1 with optimistic rollups and fraud proof mechanisms.",
      techSpecs: ["Optimistic Rollups", "Fraud Proofs", "EVM Compatibility", "Cross-chain Bridge"],
      metrics: { Node: "50k", gas: "0.01 Gwei", finality: "7 days" }
    },
    {
      id: "consensus",
      title: "PoS Consensus",
      icon: Server,
      description: "Delegated Proof-of-Stake with slashing conditions and validator rotation mechanisms.",
      techSpecs: ["BFT Consensus", "Slashing Conditions", "Validator Rotation", "Staking Rewards"],
      metrics: { validators: "50K", staked: "70%", apy: "12%" }
    }
  ]

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
    <section 
      id="technology"
      className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-white py-20 overflow-hidden"
    >
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
            <span className="text-sm font-semibold text-gray-700 tracking-wider uppercase">TECHNOLOGY STACK</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-nasalization leading-tight"
          >
            AI-Native Infrastructure
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-inter"
          >
            Built on cutting-edge infrastructure designed for the AI economy, delivering unprecedented performance and developer experience.
          </motion.p>
        </motion.div>

        {/* Main Technology Layout - Compact Design (Fixed) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white p-8 shadow-[30px_30px_60px_rgba(163,177,198,0.4),-30px_-30px_60px_rgba(255,255,255,0.9)] border border-gray-200 rounded-3xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Technology Cards Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {technologies.slice(0, 4).map((tech, index) => (
                  <motion.div
                    key={tech.id}
                    onClick={() => setActiveIndex(index)}
                    className={`p-4 cursor-pointer transition-all duration-300 rounded-2xl ${
                      activeIndex === index
                        ? 'bg-gray-50 shadow-[inset_-8px_-8px_16px_rgba(255,255,255,0.7),inset_8px_8px_16px_rgba(163,177,198,0.3)] border border-gray-300'
                        : 'bg-gray-100 shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] hover:shadow-[8px_8px_16px_rgba(163,177,198,0.4),-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center ${
                      activeIndex === index
                        ? 'bg-gray-100 shadow-[inset_6px_6px_12px_rgba(163,177,198,0.2),inset_-6px_-6px_12px_rgba(255,255,255,0.8)]'
                        : 'bg-white shadow-[6px_6px_12px_rgba(163,177,198,0.3),-6px_-6px_12px_rgba(255,255,255,0.9)]'
                    } border border-gray-200`}>
                      {React.createElement(tech.icon, { className: "w-6 h-6 text-gray-700" })}
                    </div>
                    <h3 className="text-lg font-bold font-nasalization mb-2 text-gray-900">{tech.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{tech.description.substring(0, 80)}...</p>
                  </motion.div>
                ))}
              </div>

              {/* Bottom row - 2 more technologies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {technologies.slice(4, 6).map((tech, index) => (
                  <motion.div
                    key={tech.id}
                    onClick={() => setActiveIndex(index + 4)}
                    className={`p-4 cursor-pointer transition-all duration-300 rounded-2xl ${
                      activeIndex === index + 4
                        ? 'bg-gray-50 shadow-[inset_-8px_-8px_16px_rgba(255,255,255,0.7),inset_8px_8px_16px_rgba(163,177,198,0.3)] border border-gray-300'
                        : 'bg-gray-100 shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] hover:shadow-[8px_8px_16px_rgba(163,177,198,0.4),-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center ${
                      activeIndex === index + 4
                        ? 'bg-gray-100 shadow-[inset_6px_6px_12px_rgba(163,177,198,0.2),inset_-6px_-6px_12px_rgba(255,255,255,0.8)]'
                        : 'bg-white shadow-[6px_6px_12px_rgba(163,177,198,0.3),-6px_-6px_12px_rgba(255,255,255,0.9)]'
                    } border border-gray-200`}>
                      {React.createElement(tech.icon, { className: "w-6 h-6 text-gray-700" })}
                    </div>
                    <h3 className="text-lg font-bold font-nasalization mb-2 text-gray-900">{tech.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{tech.description.substring(0, 80)}...</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Active Technology Details */}
            <div className="bg-gray-50 p-6 shadow-[inset_12px_12px_24px_rgba(163,177,198,0.2),inset_-12px_-12px_24px_rgba(255,255,255,0.8)] border border-gray-200 rounded-2xl">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-[6px_6px_12px_rgba(163,177,198,0.3),-6px_-6px_12px_rgba(255,255,255,0.9)] border border-gray-200 flex items-center justify-center">
                    {React.createElement(technologies[activeIndex].icon, { className: "w-6 h-6 text-gray-700" })}
                  </div>
                  <h4 className="text-2xl font-bold font-nasalization text-gray-900">
                    {technologies[activeIndex].title}
                  </h4>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6 font-inter text-sm">
                  {technologies[activeIndex].description}
                </p>

                {/* Tech Specs */}
                <div className="space-y-2 mb-6">
                  <h5 className="text-sm font-semibold text-gray-900 mb-3">Technical Specifications</h5>
                  {technologies[activeIndex].techSpecs.map((spec, i) => (
                    <div key={i} className="bg-white p-2 rounded-lg shadow-[4px_4px_8px_rgba(163,177,198,0.3),-4px_-4px_8px_rgba(255,255,255,0.9)] border border-gray-200">
                      <span className="text-xs text-gray-700 font-medium">{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Performance Metrics */}
                <div>
                  <h5 className="text-sm font-semibold text-gray-900 mb-3">Performance Metrics</h5>
                  <div className="space-y-2">
                    {Object.entries(technologies[activeIndex].metrics).map(([key, value], i) => (
                      <div 
                        key={i} 
                        className={`flex justify-between items-center p-2 rounded-lg ${
                          i === 0 || i === 2
                            ? 'shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.1)] border border-blue-900/20'
                            : 'bg-white shadow-[4px_4px_8px_rgba(163,177,198,0.3),-4px_-4px_8px_rgba(255,255,255,0.9)] border border-gray-200'
                        }`}
                        style={i === 0 || i === 2 ? {
                          background: 'linear-gradient(135deg, #123CFE 0%, #FFE5F5 100%)',
                        } : {}}
                      >
                        <span className={`text-xs capitalize font-medium ${i === 0 || i === 2 ? 'text-white' : 'text-gray-600'}`}>{key}</span>
                        <span className={`text-xs font-bold font-nasalization ${i === 0 || i === 2 ? 'text-gray-900' : 'text-gray-900'}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Compact Performance Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8"
        >
          {[
            { metric: "20,000+", label: "TPS" },
            { metric: "100.00%", label: "Uptime" },
            { metric: "<12ms", label: "Latency" },
            { metric: "50k", label: "validator Nodes" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center bg-white p-3 sm:p-4 shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] border border-gray-200 rounded-2xl"
            >
              <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 font-nasalization break-words">{stat.metric}</div>
              <div className="text-xs sm:text-sm font-semibold text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
