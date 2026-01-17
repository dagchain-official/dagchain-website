"use client"

import React, { useState } from "react"
import { m, AnimatePresence } from "framer-motion"
import { 
  Building2, 
  Globe2, 
  Server, 
  Cpu, 
  HardDrive, 
  Wifi,
  CheckCircle,
  ArrowRight,
  DollarSign,
  Calendar,
  Target,
  Award,
  Shield,
  TrendingUp,
  Users,
  Lock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

export function Funding() {
  const [activeTab, setActiveTab] = useState(0)

  const fundingRounds = [
    {
      id: "private",
      title: "Private Sale",
      subtitle: "Institutional & Strategic Investors",
      phases: [
        { phase: "Single Phase", price: "$0.40", status: "Fixed Price" }
      ],
      minTicket: "$5,000 USDT",
      timeline: "Sale ends August 31, 2026",
      unlock: "10% at TGE (Token Generation Event)",
      vesting: "90% linear over 18 months",
      icon: Building2,
      audience: "Strategic investors, VCs, and institutional backers committed to DAGChain's long-term vision.",
      purposes: [
        "Final TestNet development and launch (Jan 2026)",
        "Node validator incentive programs",
        "Early ecosystem grants for AI-native projects",
        "Global marketing and branding campaigns"
      ],
      narrative: "The Private Sale secures long-term strategic backers who will play a key role in shaping DAGChain's governance, validator community, and early adoption ecosystem."
    },
    {
      id: "presale",
      title: "Pre-Sale",
      subtitle: "Global Community Access",
      phases: [
        { phase: "Phase 1", price: "$0.55", status: "Early Bird" },
        { phase: "Phase 2", price: "$0.60", status: "Standard" },
        { phase: "Phase 3", price: "$0.65", status: "Advanced" },
        { phase: "Phase 4", price: "$0.70", status: "Final" }
      ],
      minTicket: "$50 USDT",
      timeline: "Sale ends August 31, 2026",
      unlock: "20% at TGE (Token Generation Event)",
      vesting: "80% linear over 16 months",
      icon: Globe2,
      audience: "Open to community members, creators, no-code builders, and AI enthusiasts.",
      purposes: [
        "Onboarding of grassroots community validators",
        "Incentivizing early adoption of provenance and micro-payment tools",
        "Developer bounties and hackathon rewards"
      ],
      narrative: "The Pre-Sale ensures fair participation for the global community, giving AI creators and small-scale investors early access to DAGChain tokens before Mainnet."
    },
    {
      id: "nodekey",
      title: "Node Key Sale",
      subtitle: "Validator Network Access",
      phases: [
        { phase: "Phase 1", price: "$750", status: "Early Bird" },
        { phase: "Phase 2", price: "$1000", status: "Standard" },
        { phase: "Phase 3", price: "$1,250", status: "Final" },
        { phase: "Phase 4", price: "$1,500", status: "Last Call" }
      ],
      minTicket: "1 Node Key",
      
      unlock: "Immediate validator access at TestNet Launch",
      vesting: "Test tokens swapped 1:1 at MainNet",
      icon: Server,
      audience: "Community members who want to become validators and secure the network.",
      purposes: [
        "Secure validator position in TestNet",
        "Earn Test Tokens during validation",
        "Establish foundation of DAGChain governance",
        "Direct participation in network decentralization"
      ],
      narrative: "Becoming a validator through Node Key Sale is the most direct way to participate in DAGChain's decentralization. Early node operators not only secure the network but also establish themselves as the foundation of DAGChain governance."
    }
  ]

  const systemRequirements = {
    minimum: {
      cpu: "4 cores (x86_64 or ARM64)",
      ram: "8 GB",
      storage: "250 GB SSD",
      network: "50 Mbps upload/download",
      os: "Ubuntu 22.04 LTS"
    },
    recommended: {
      cpu: "8 cores (dedicated server)",
      ram: "16 GB",
      storage: "1 TB NVMe SSD",
      network: "200 Mbps+, static IP",
      os: "Ubuntu 22.04 LTS, Docker"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl lg:text-7xl font-bold mb-8 font-nasalization text-gray-900 leading-tight">
              Investment
              <br />
              Opportunity
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-inter mb-12">
              DAGChain represents the first AI-Native Layer 1 blockchain infrastructure. 
              We offer strategic investment opportunities through Private Sale, Pre-Sale, 
              and Validator Node Key Sale for qualified investors and community participants.
            </p>
            
            <div className="flex justify-center gap-8 mb-16">
              <div className="text-center">
                
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">50K</div>
                <div className="text-gray-600">Validator Nodes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">Q3 2026</div>
                <div className="text-gray-600">MainNet Launch</div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Investment Rounds */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 font-nasalization text-gray-900">
              Investment Rounds
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three distinct opportunities to participate in DAGChain's growth
            </p>
          </m.div>

          {/* Tab Navigation */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center gap-4 mb-16"
          >
            {fundingRounds.map((round, index) => (
              <m.button
                key={round.id}
                onClick={() => setActiveTab(index)}
                className={`px-8 py-4 font-semibold transition-all duration-300 rounded-2xl ${
                  activeTab === index
                    ? 'bg-white text-gray-800 shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.7),inset_4px_4px_8px_rgba(0,0,0,0.15)] border border-gray-200'
                    : 'bg-gray-50 text-gray-700 shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[6px_6px_12px_rgba(163,177,198,0.4),-6px_-6px_12px_rgba(255,255,255,0.9)] border border-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-lg font-nasalization">{round.title}</div>
                <div className="text-sm opacity-80">{round.subtitle}</div>
              </m.button>
            ))}
          </m.div>

          {/* Active Tab Content */}
          <AnimatePresence mode="wait">
            <m.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-12 shadow-[20px_20px_40px_rgba(163,177,198,0.4),-20px_-20px_40px_rgba(255,255,255,0.9)] border border-gray-200 rounded-3xl"
            >
              <div className="grid lg:grid-cols-2 gap-16">
                {/* Left: Key Details */}
                <div>
                  <div className="mb-8">
                    <h3 className="text-4xl font-bold text-gray-900 font-nasalization mb-2">
                      {fundingRounds[activeTab].title}
                    </h3>
                    <p className="text-xl text-gray-600">
                      {fundingRounds[activeTab].subtitle}
                    </p>
                  </div>

                  {/* Phased Pricing Display */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <DollarSign className="w-6 h-6 text-gray-700" />
                      <span className="text-xl font-semibold text-gray-900">Phased Pricing</span>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {fundingRounds[activeTab].phases.map((phase, index) => (
                        <m.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="bg-white p-4 shadow-[8px_8px_16px_rgba(163,177,198,0.25),-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200 rounded-xl text-center"
                        >
                          <div className="text-sm font-medium text-gray-600 mb-1">{phase.phase}</div>
                          <div className="text-2xl font-bold text-gray-900 mb-1">{phase.price}</div>
                          <div className="text-xs text-gray-500">{phase.status}</div>
                        </m.div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] border border-gray-200 rounded-2xl mb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <Target className="w-6 h-6 text-gray-700" />
                      <span className="font-semibold text-gray-900">Minimum Investment</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {fundingRounds[activeTab].minTicket}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {fundingRounds[activeTab].id === 'nodekey' ? 'per validator key' : 'investment size'}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Calendar className="w-6 h-6 text-gray-700 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Timeline</div>
                        <div className="text-gray-600">{fundingRounds[activeTab].timeline}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Lock className="w-6 h-6 text-gray-700 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Vesting Schedule</div>
                        <div className="text-gray-600 mb-1">{fundingRounds[activeTab].unlock}</div>
                        <div className="text-gray-600">{fundingRounds[activeTab].vesting}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Investment Details */}
                <div>
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Investor Profile</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {fundingRounds[activeTab].audience}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Fund Allocation</h4>
                    <div className="space-y-3">
                      {fundingRounds[activeTab].purposes.map((purpose, i) => (
                        <m.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-gray-700 mt-0.5" />
                          <span className="text-gray-700">{purpose}</span>
                        </m.div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] border border-gray-200 rounded-2xl mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Investment Thesis</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {fundingRounds[activeTab].narrative}
                    </p>
                  </div>

                  <button className="w-full bg-white text-gray-800 shadow-[8px_8px_16px_rgba(163,177,198,0.4),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[inset_6px_6px_12px_rgba(163,177,198,0.3),inset_-6px_-6px_12px_rgba(255,255,255,0.8)] border border-gray-200 py-4 text-lg font-semibold rounded-xl transition-all duration-300 flex items-center justify-center">
                    Request Investment Information
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Technical Requirements */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 font-nasalization text-gray-900">
              Validator Infrastructure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Technical specifications for network participants
            </p>
          </m.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Minimum Requirements */}
            <m.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 shadow-[20px_20px_40px_rgba(163,177,198,0.4),-20px_-20px_40px_rgba(255,255,255,0.9)] border border-gray-200 rounded-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-700 flex items-center justify-center rounded-xl shadow-[6px_6px_12px_rgba(163,177,198,0.3),-6px_-6px_12px_rgba(255,255,255,0.9)]">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-nasalization">Minimum Specifications</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] border border-gray-200">
                  <Cpu className="w-6 h-6 text-gray-700" />
                  <div>
                    <div className="font-semibold text-gray-900">CPU</div>
                    <div className="text-gray-600">{systemRequirements.minimum.cpu}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] border border-gray-200">
                  <Server className="w-6 h-6 text-gray-700" />
                  <div>
                    <div className="font-semibold text-gray-900">RAM</div>
                    <div className="text-gray-600">{systemRequirements.minimum.ram}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] border border-gray-200">
                  <HardDrive className="w-6 h-6 text-gray-700" />
                  <div>
                    <div className="font-semibold text-gray-900">Storage</div>
                    <div className="text-gray-600">{systemRequirements.minimum.storage}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] border border-gray-200">
                  <Wifi className="w-6 h-6 text-gray-700" />
                  <div>
                    <div className="font-semibold text-gray-900">Network</div>
                    <div className="text-gray-600">{systemRequirements.minimum.network}</div>
                  </div>
                </div>
              </div>
            </m.div>

            {/* Recommended Requirements */}
            <m.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 shadow-[20px_20px_40px_rgba(163,177,198,0.4),-20px_-20px_40px_rgba(255,255,255,0.9)] border border-gray-200 rounded-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-900 flex items-center justify-center rounded-xl shadow-[6px_6px_12px_rgba(163,177,198,0.3),-6px_-6px_12px_rgba(255,255,255,0.9)]">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-nasalization">Recommended Specifications</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] border border-gray-200">
                  <Cpu className="w-6 h-6 text-gray-700" />
                  <div>
                    <div className="font-semibold text-gray-900">CPU</div>
                    <div className="text-gray-600">{systemRequirements.recommended.cpu}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] border border-gray-200">
                  <Server className="w-6 h-6 text-gray-700" />
                  <div>
                    <div className="font-semibold text-gray-900">RAM</div>
                    <div className="text-gray-600">{systemRequirements.recommended.ram}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] border border-gray-200">
                  <HardDrive className="w-6 h-6 text-gray-700" />
                  <div>
                    <div className="font-semibold text-gray-900">Storage</div>
                    <div className="text-gray-600">{systemRequirements.recommended.storage}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] border border-gray-200">
                  <Wifi className="w-6 h-6 text-gray-700" />
                  <div>
                    <div className="font-semibold text-gray-900">Network</div>
                    <div className="text-gray-600">{systemRequirements.recommended.network}</div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Investment Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 font-nasalization text-gray-900">
              Investment Value Proposition
            </h2>
          </m.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 text-center shadow-[16px_16px_32px_rgba(163,177,198,0.3),-16px_-16px_32px_rgba(255,255,255,0.9)] border border-gray-200 rounded-2xl"
            >
              <div className="w-16 h-16 bg-gray-900 rounded-xl shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-nasalization">
                Early Access Pricing
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Secure tokens at significant discount before public markets
              </p>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 text-center shadow-[16px_16px_32px_rgba(163,177,198,0.3),-16px_-16px_32px_rgba(255,255,255,0.9)] border border-gray-200 rounded-2xl"
            >
              <div className="w-16 h-16 bg-gray-900 rounded-xl shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-nasalization">
                Network Security
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Participate in securing the first AI-native blockchain infrastructure
              </p>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 text-center shadow-[16px_16px_32px_rgba(163,177,198,0.3),-16px_-16px_32px_rgba(255,255,255,0.9)] border border-gray-200 rounded-2xl"
            >
              <div className="w-16 h-16 bg-gray-900 rounded-xl shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-nasalization">
                Governance Rights
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Shape the future of AI-blockchain coordination layer
              </p>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-8 text-center shadow-[16px_16px_32px_rgba(163,177,198,0.3),-16px_-16px_32px_rgba(255,255,255,0.9)] border border-gray-200 rounded-2xl"
            >
              <div className="w-16 h-16 bg-gray-900 rounded-xl shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] flex items-center justify-center mx-auto mb-6">
                <Server className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-nasalization">
                Validator Rewards
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Earn ongoing rewards through network validation
              </p>
            </m.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-12 shadow-[24px_24px_48px_rgba(163,177,198,0.4),-24px_-24px_48px_rgba(255,255,255,0.9)] border border-gray-200 rounded-3xl"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-nasalization text-gray-900">
              Ready to Invest in the Future?
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              DAGChain represents the coordination layer of the AI economy. 
              Join us in building the infrastructure that will power the next generation of AI applications.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="bg-gray-50 text-gray-900 shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] hover:shadow-[inset_8px_8px_16px_rgba(163,177,198,0.3),inset_-8px_-8px_16px_rgba(255,255,255,0.8)] border border-gray-200 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300">
                Request Investment Deck
              </button>
              <button className="bg-gray-900 text-white shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] hover:shadow-[inset_8px_8px_16px_rgba(0,0,0,0.3),inset_-8px_-8px_16px_rgba(255,255,255,0.1)] border border-gray-700 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300">
                Schedule Due Diligence Call
              </button>
            </div>
          </m.div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
