"use client"

import React, { useState } from "react"
import { m } from "framer-motion"
import { Code, Zap, Shield, Globe, Users, Cpu, Network } from "lucide-react"

export function About() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: Code,
      title: "AI Agent Registry",
      description: "Seamless registration and discovery system for autonomous AI agents with built-in verification and reputation scoring.",
      details: [
        "Agent identity verification",
        "Capability assessment",
        "Performance tracking",
        "Reputation scoring"
      ]
    },
    {
      icon: Zap,
      title: "Micro Payment Rails",
      description: "Ultra-low cost payment infrastructure designed for AI-to-AI transactions and micro-services.",
      details: [
        "Sub-cent transactions",
        "Instant settlement",
        "Batch processing",
        "Gas optimization"
      ]
    },
    {
      icon: Shield,
      title: "Provenance System",
      description: "Cryptographic proof system ensuring data integrity and ownership verification for AI-generated content.",
      details: [
        "Content verification",
        "Ownership tracking",
        "Tamper detection",
        "Audit trails"
      ]
    },
    {
      icon: Network,
      title: "No-Code Integration",
      description: "Visual tools and APIs that make blockchain integration accessible to creators without technical expertise.",
      details: [
        "Drag-drop interface",
        "Template library",
        "One-click deployment",
        "Visual workflows"
      ]
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
    <section className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-white py-20 overflow-hidden">
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
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Section Header */}
          <m.div
            variants={itemVariants}
            className="bg-white p-3 shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200 rounded-2xl inline-block mb-8"
          >
            <span className="text-sm font-semibold text-gray-700 tracking-wider uppercase">ABOUT DAGChain</span>
          </m.div>

          <m.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-nasalization leading-tight"
          >
            Welcome to DAGChain
          </m.h2>

          <m.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-inter"
          >
            The first Layer 1 blockchain purpose-built for autonomous AI agents, no-code creators, and the next generation of decentralized applications.
          </m.p>
        </m.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left Content */}
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <m.div
              variants={itemVariants}
              className="bg-white p-8 shadow-[20px_20px_40px_rgba(163,177,198,0.3),-20px_-20px_40px_rgba(255,255,255,0.9)] border border-gray-200 rounded-3xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-nasalization">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed font-inter mb-4">
                DAGChain is the first AI-Native Layer 1 blockchain, purpose-built to support the next generation of builders - from autonomous AI agents to no-code creators.
              </p>
              <p className="text-gray-700 leading-relaxed font-inter">
                While existing blockchains chase DeFi and gaming, DAGChain delivers micro-payment rails, provenance verification, and agent registries tailored to AI-first use cases.
              </p>
            </m.div>

            <m.div
              variants={itemVariants}
              className="bg-white p-8 shadow-[20px_20px_40px_rgba(163,177,198,0.3),-20px_-20px_40px_rgba(255,255,255,0.9)] border border-gray-200 rounded-3xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-nasalization">The Future</h3>
              <p className="text-gray-700 leading-relaxed font-inter">
                By combining Ethereum compatibility with an AI-centric design, DAGChain establishes itself as the coordination layer where agents transact, creators secure ownership, and builders integrate blockchain invisibly into their workflows.
              </p>
            </m.div>
          </m.div>

          {/* Right Interactive Feature */}
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Feature Navigation */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <m.button
                  key={index}
                  variants={itemVariants}
                  onClick={() => setActiveFeature(index)}
                  className={`p-4 text-left transition-all duration-300 rounded-2xl ${
                    activeFeature === index
                      ? 'bg-white shadow-[inset_-8px_-8px_16px_rgba(255,255,255,0.7),inset_8px_8px_16px_rgba(163,177,198,0.3)] border border-gray-200'
                      : 'bg-gray-50 shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] hover:shadow-[8px_8px_16px_rgba(163,177,198,0.4),-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center ${
                    activeFeature === index
                      ? 'bg-gray-100 shadow-[inset_6px_6px_12px_rgba(163,177,198,0.2),inset_-6px_-6px_12px_rgba(255,255,255,0.8)]'
                      : 'bg-white shadow-[6px_6px_12px_rgba(163,177,198,0.3),-6px_-6px_12px_rgba(255,255,255,0.9)]'
                  } border border-gray-200`}>
                    {React.createElement(feature.icon, { className: "w-6 h-6 text-gray-700" })}
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm font-nasalization">{feature.title}</h4>
                </m.button>
              ))}
            </div>

            {/* Active Feature Details */}
            <m.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 shadow-[20px_20px_40px_rgba(163,177,198,0.3),-20px_-20px_40px_rgba(255,255,255,0.9)] border border-gray-200 rounded-3xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl shadow-[inset_8px_8px_16px_rgba(163,177,198,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.8)] border border-gray-200 flex items-center justify-center">
                  {React.createElement(features[activeFeature].icon, { className: "w-8 h-8 text-gray-700" })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 font-nasalization">{features[activeFeature].title}</h3>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed font-inter mb-6">
                {features[activeFeature].description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {features[activeFeature].details.map((detail, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.1)] border border-pink-200/20"
                    style={{
                      background: 'linear-gradient(135deg, #123CFE 0%, #FFE5F5 100%)',
                    }}
                  >
                    <span className="text-sm text-white font-medium">{detail}</span>
                  </div>
                ))}
              </div>
            </m.div>
          </m.div>
        </div>

        {/* Bottom Stats Section */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            { number: "5K+", label: "AI Agents", sublabel: "Ready to deploy" },
            { number: "20k+", label: "Transactions", sublabel: "Per second capacity" },
            { number: "100.0%", label: "Uptime", sublabel: "Network reliability" }
          ].map((stat, index) => (
            <m.div
              key={index}
              variants={itemVariants}
              className="bg-white p-8 text-center shadow-[20px_20px_40px_rgba(163,177,198,0.3),-20px_-20px_40px_rgba(255,255,255,0.9)] border border-gray-200 rounded-3xl"
            >
              <div className="text-4xl font-bold text-gray-900 mb-2 font-nasalization">{stat.number}</div>
              <div className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.sublabel}</div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  )
}
