"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Code, Palette, Bot, Building, Shield, Users, ArrowRight, Zap, Globe, Lock } from "lucide-react"

export function Ecosystem() {
  const [activeEcosystem, setActiveEcosystem] = useState(0)

  const ecosystemData = [
    {
      id: "developers",
      title: "Developers & Builders",
      icon: Code,
      description: "Developer-first environment, fully EVM-compatible with invisible blockchain integration",
      features: [
        "EVM-compatible Solidity deployment",
        "SDKs for no-code platforms (Cursor, Windsurf, TRAE, Claude)",
        "Hackathons and ecosystem grants",
        "Invisible blockchain integration"
      ],
      useCase: {
        title: "Provenance Stamp Integration",
        scenario: "A no-code builder uses DAGChain's SDK to integrate a 'Provenance Stamp' button inside a website builder. Every AI-generated image uploaded by users gets a verifiable on-chain ownership record without them ever seeing a wallet or gas fee."
      },
      stats: [
        { label: "Expected SDK Downloads", value: "50K+" },
        { label: "Grant Pool", value: "$20M" },
        { label: "Deploy Time", value: "<1min" }
      ]
    },
    {
      id: "creators",
      title: "Creators & AI Content Producers", 
      icon: Palette,
      description: "Secure and monetize AI-generated content with provenance stamps and micro-payments",
      features: [
        "Provenance Stamps for ownership proofs",
        "Secure marketplaces for AI content",
        "Micro-payment monetization",
        "Integration with MidJourney, Sora, Adobe Firefly"
      ],
      useCase: {
        title: "Real-time Music Royalties",
        scenario: "A musician using Suno AI releases tracks stamped on DAGChain. Fans stream the music on a dApp that pays micro-royalties (fractions of a cent per second) directly to the creator, in real time."
      },
      stats: [
        { label: "Content Stamped", value: "500K+" },
        { label: "Micro-payments", value: "$50K/day" },
        { label: "Creators", value: "25K+" }
      ]
    },
    {
      id: "agents",
      title: "AI Agents & Autonomous Services",
      icon: Bot,
      description: "Independent economic actors with secure identity, reputation, and real-time transactions",
      features: [
        "Agent Registry for verifiable identity",
        "Real-time agent-to-agent payments",
        "Cross-ecosystem interoperability",
        "Autonomous economic coordination"
      ],
      useCase: {
        title: "Autonomous Agent Economy",
        scenario: "A translation AI agent charges $0.0005 per word. A video dubbing agent pays it automatically as it translates a script. Both transactions settle instantly on DAGChain without human involvement."
      },
      stats: [
        { label: "Registered Agents", value: "5K+" },
        { label: "Expected Daily Transactions", value: "10M+" },
        { label: "Avg Settlement", value: "0.3s" }
      ]
    },
    {
      id: "enterprises",
      title: "Enterprises & Institutions",
      icon: Building,
      description: "Trust, security, and scalability for enterprise AI workflows and digital supply chains",
      features: [
        "Provenance networks for data pipelines",
        "Cross-chain bridge compatibility",
        "Custom governance frameworks",
        "Enterprise-grade security"
      ],
      useCase: {
        title: "Film Studio Asset Validation",
        scenario: "A film studio uses DAGChain to validate that all AI-generated assets (scripts, artwork, edits) are timestamped and verifiable. This prevents disputes over originality when licensing globally."
      },
      stats: [
        { label: "Enterprise Clients", value: "50+" },
        { label: "Assets Validated", value: "1M+" },
        { label: "Dispute Rate", value: "0.01%" }
      ]
    },
    {
      id: "validators",
      title: "Validators & Community",
      icon: Shield,
      description: "Decentralized security powered by ~50,000 validator nodes minting 60% of supply over time",
      features: [
        "Node rewards for network security",
        "Delegated staking participation", 
        "Community incentives program",
        "Governance rights distribution"
      ],
      useCase: {
        title: "Student Validator Success",
        scenario: "A student with modest technical resources runs a validator node. Over time, they earn DGC rewards, directly contributing to DAGChain's security while gaining governance rights in the ecosystem."
      },
      stats: [
        { label: "Target Validators", value: "50K" },
        { label: "Network Uptime", value: "99.9%" },
        { label: "Staking APY", value: "8-12%" }
      ]
    }
  ]

  const pillars = [
    { name: "Builders", description: "Developers, no-code creators, AI researchers", icon: Code },
    { name: "Creators", description: "Artists, musicians, video makers, coders", icon: Palette },
    { name: "Agents", description: "Autonomous services and digital workers", icon: Bot },
    { name: "Validators", description: "Nodes and stakers securing the network", icon: Shield }
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
    <section id="ecosystem" className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-white py-20 overflow-hidden">
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
            <span className="text-sm font-semibold text-gray-700 tracking-wider uppercase">ECOSYSTEM</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-nasalization leading-tight"
          >
            DAGChain Ecosystem
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-inter"
          >
            A thriving ecosystem connecting developers, creators, AI agents, enterprises, and validators in the new AI economy.
          </motion.p>
        </motion.div>

        {/* Ecosystem Pillars Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onClick={() => setActiveEcosystem(index)}
              className={`p-6 cursor-pointer transition-all duration-300 rounded-2xl text-center ${
                activeEcosystem === index
                  ? 'bg-white shadow-[inset_-8px_-8px_16px_rgba(255,255,255,0.7),inset_8px_8px_16px_rgba(163,177,198,0.3)] border border-gray-200'
                  : 'bg-white shadow-[16px_16px_32px_rgba(163,177,198,0.3),-16px_-16px_32px_rgba(255,255,255,0.9)] hover:shadow-[20px_20px_40px_rgba(163,177,198,0.4),-20px_-20px_40px_rgba(255,255,255,0.9)] border border-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-16 h-16 rounded-2xl mb-4 flex items-center justify-center mx-auto ${
                activeEcosystem === index
                  ? 'bg-gray-100 shadow-[inset_8px_8px_16px_rgba(163,177,198,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.8)]'
                  : 'bg-gray-100 shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)]'
              } border border-gray-200`}>
                {React.createElement(pillar.icon, { className: "w-8 h-8 text-gray-700" })}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-nasalization">{pillar.name}</h3>
              <p className="text-sm text-gray-600">{pillar.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Active Ecosystem Details */}
        <motion.div
          key={activeEcosystem}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 shadow-[30px_30px_60px_rgba(163,177,198,0.4),-30px_-30px_60px_rgba(255,255,255,0.9)] border border-gray-200 rounded-3xl mb-12"
        >
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl shadow-[inset_10px_10px_20px_rgba(163,177,198,0.2),inset_-10px_-10px_20px_rgba(255,255,255,0.8)] border border-gray-200 flex items-center justify-center">
                  {React.createElement(ecosystemData[activeEcosystem].icon, { className: "w-10 h-10 text-gray-700" })}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2 font-nasalization">
                    {ecosystemData[activeEcosystem].title}
                  </h3>
                  <p className="text-gray-600 font-inter">
                    {ecosystemData[activeEcosystem].description}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4 font-nasalization">Key Features</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {ecosystemData[activeEcosystem].features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-3 rounded-xl shadow-[inset_6px_6px_12px_rgba(163,177,198,0.2),inset_-6px_-6px_12px_rgba(255,255,255,0.8)] border border-gray-200"
                    >
                      <span className="text-sm text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Use Case */}
              <div className="bg-gray-50 p-6 shadow-[inset_12px_12px_24px_rgba(163,177,198,0.2),inset_-12px_-12px_24px_rgba(255,255,255,0.8)] border border-gray-200 rounded-2xl">
                <h4 className="text-lg font-bold text-gray-900 mb-3 font-nasalization">
                  {ecosystemData[activeEcosystem].useCase.title}
                </h4>
                <p className="text-gray-700 leading-relaxed font-inter">
                  {ecosystemData[activeEcosystem].useCase.scenario}
                </p>
              </div>
            </div>

            {/* Stats Sidebar */}
            <div className="bg-gray-50 p-6 shadow-[inset_12px_12px_24px_rgba(163,177,198,0.2),inset_-12px_-12px_24px_rgba(255,255,255,0.8)] border border-gray-200 rounded-2xl">
              <h4 className="text-xl font-bold text-gray-900 mb-6 font-nasalization">Key Metrics</h4>
              <div className="space-y-4">
                {ecosystemData[activeEcosystem].stats.map((stat, index) => (
                  <div
                    key={index}
                    className="group bg-white p-4 rounded-xl shadow-[6px_6px_12px_rgba(163,177,198,0.3),-6px_-6px_12px_rgba(255,255,255,0.9)] border border-gray-200 text-center hover:!bg-gradient-to-r hover:!from-[#123CFE] hover:!to-[#FFE5F5] transition-all duration-300 cursor-pointer"
                  >
                    <div className="text-2xl font-bold text-gray-900 mb-1 font-nasalization group-hover:text-white">{stat.value}</div>
                    <div className="text-sm text-gray-600 group-hover:text-white/90">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ecosystem Flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white p-8 shadow-[24px_24px_48px_rgba(163,177,198,0.4),-24px_-24px_48px_rgba(255,255,255,0.9)] border border-gray-200 rounded-3xl"
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 mb-8 text-center font-nasalization"
          >
            Ecosystem Interaction Flow
          </motion.h3>

          <div className="flex items-center justify-center gap-2 overflow-x-auto">
            {ecosystemData.map((ecosystem, index) => (
              <React.Fragment key={index}>
                <motion.div
                  variants={itemVariants}
                  className="text-center flex-shrink-0"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-xl shadow-[6px_6px_12px_rgba(163,177,198,0.3),-6px_-6px_12px_rgba(255,255,255,0.9)] border border-gray-200 flex items-center justify-center mx-auto mb-2">
                    {React.createElement(ecosystem.icon, { className: "w-6 h-6 text-gray-700" })}
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 mb-1 font-nasalization">{ecosystem.title.split(' & ')[0]}</h4>
                  <p className="text-xs text-gray-600">{ecosystem.title.split(' & ')[1] || ecosystem.title.split(' ')[1]}</p>
                </motion.div>
                
                {index < ecosystemData.length - 1 && (
                  <motion.div
                    variants={itemVariants}
                    className="flex justify-center px-2"
                  >
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="text-center mt-8"
          >
            <p className="text-gray-600 font-inter max-w-3xl mx-auto">
              Each participant in the DAGChain ecosystem contributes unique value while benefiting from the network effects of AI-native infrastructure, creating a self-sustaining economy.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
