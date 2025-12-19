"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Shield, Palette, Vote, Gift, Globe, Heart, MessageCircle, Share2, Trophy, Star, Zap, ArrowRight, UserPlus, Award, Target } from "lucide-react"

// Official Social Media Logo Components
const DiscordLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
)

const XLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
)

const TikTokLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

const TelegramLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472c-.18 1.898-.962 6.502-1.36 8.627c-.168.9-.499 1.201-.82 1.23c-.696.065-1.225-.46-1.9-.902c-1.056-.693-1.653-1.124-2.678-1.8c-1.185-.78-.417-1.21.258-1.91c.177-.184 3.247-2.977 3.307-3.23c.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345c-.48.33-.913.49-1.302.48c-.428-.008-1.252-.241-1.865-.44c-.752-.245-1.349-.374-1.297-.789c.027-.216.325-.437.893-.663c3.498-1.524 5.83-2.529 6.998-3.014c3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

const MediumLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
)

const InstagramLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const YouTubeLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const FacebookLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const LinkedInLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const CoinMarketCapLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.25 4.5c-1.79 0-3.25 1.46-3.25 3.25v8.5c0 1.79 1.46 3.25 3.25 3.25h11.5c1.79 0 3.25-1.46 3.25-3.25v-8.5c0-1.79-1.46-3.25-3.25-3.25H6.25zm5.75 2.75c2.07 0 3.75 1.68 3.75 3.75s-1.68 3.75-3.75 3.75S8.25 13.07 8.25 11s1.68-3.75 3.75-3.75zm0 1.5c-1.24 0-2.25 1.01-2.25 2.25s1.01 2.25 2.25 2.25 2.25-1.01 2.25-2.25-1.01-2.25-2.25-2.25z"/>
  </svg>
)

export function Community() {
  const [activeCard, setActiveCard] = useState(0)
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  const communityStats = [
    { number: "50K+", label: "Validator Nodes", icon: Shield, color: "text-gray-700" },
    { number: "5K+", label: "AI Creators", icon: Palette, color: "text-gray-700" },
    { number: "10K+", label: "Community Members", icon: Users, color: "text-gray-700" },
    { number: "60M", label: "DGC Incentives", icon: Gift, color: "text-gray-700" }
  ]

  const communityPillars = [
    {
      id: "validators",
      title: "Validators & Stakers",
      icon: Shield,
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-50",
      members: "50,000+",
      description: "The heart of DAGChain's decentralized security and governance",
      features: [
        "~50,000 validator nodes securing the network",
        "60% of supply minted through validation rewards",
        "Delegated staking for non-technical participation",
        "Direct governance voting rights",
        "First beneficiaries of emission rewards"
      ],
      impact: "Every validator is a network shareholder, directly rewarded for securing DAGChain",
      socialProof: [
        { avatar: "👨‍💻", name: "Alex Chen", role: "Validator", message: "Running 5 nodes, earning consistent rewards!" },
        { avatar: "👩‍🔬", name: "Sarah Kim", role: "Delegator", message: "Staking made simple, great returns" },
        { avatar: "🧑‍💼", name: "Mike Torres", role: "Node Operator", message: "Best validator experience I've had" }
      ]
    },
    {
      id: "creators",
      title: "AI Creators & Builders", 
      icon: Palette,
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-50",
      members: "5,000+",
      description: "AI-native creators proving provenance and building the future",
      features: [
        "Artists using MidJourney, Sora, Leonardo",
        "Developers with Cursor, Windsurf, TRAE",
        "Hackathon teams building AI workflows",
        "Provenance stamping for all creations",
        "Micro-payment integration builders"
      ],
      impact: "Creators don't just consume DAGChain — they drive demand for its primitives",
      socialProof: [
        { avatar: "🎨", name: "Luna Martinez", role: "AI Artist", message: "Finally, proof of ownership for my AI art!" },
        { avatar: "⚡", name: "Dev Patel", role: "Builder", message: "SDK integration was seamless" },
        { avatar: "🚀", name: "Emma Wilson", role: "Founder", message: "Built our entire platform on DAGChain" }
      ]
    },
    {
      id: "governance",
      title: "Open Governance",
      icon: Vote,
      color: "from-gray-500 to-gray-600", 
      bgColor: "bg-gray-50",
      members: "All Holders",
      description: "Community-driven decision making from day one",
      features: [
        "On-chain governance for protocol upgrades",
        "Treasury use and ecosystem grants voting",
        "Governance council at Mainnet launch",
        "Representation from all stakeholder groups",
        "Treasury-backed community innovation"
      ],
      impact: "Governance ensures DAGChain evolves as a shared network, not a centralized company",
      socialProof: [
        { avatar: "🗳️", name: "Jordan Lee", role: "Governance Lead", message: "Democracy in action, every vote counts" },
        { avatar: "📊", name: "Priya Singh", role: "Proposal Author", message: "My grant proposal got funded!" },
        { avatar: "🏛️", name: "Carlos Rodriguez", role: "Council Member", message: "Proud to represent the community" }
      ]
    },
    {
      id: "incentives",
      title: "Incentives & Rewards",
      icon: Gift,
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-50", 
      members: "Everyone",
      description: "1.5% of supply (60M DGC) allocated for community rewards",
      features: [
        "Testnet airdrops for early testers",
        "Creator rewards for provenance stamping",
        "Referral bonuses for project onboarding",
        "DAO participation rewards",
        "Multi-level incentive programs"
      ],
      impact: "Participation is rewarded at every level, from running a node to stamping your first AI asset",
      socialProof: [
        { avatar: "🎁", name: "Aisha Johnson", role: "Early Tester", message: "Testnet airdrop was amazing!" },
        { avatar: "💎", name: "Tom Zhang", role: "Creator", message: "Earning rewards for my AI content" },
        { avatar: "🔗", name: "Lisa Brown", role: "Referrer", message: "Onboarded 10 projects, great bonuses!" }
      ]
    },
    {
      id: "global",
      title: "Global Presence",
      icon: Globe,
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-50",
      members: "Worldwide",
      description: "Borderless community fostering global AI innovation",
      features: [
        "Hackathons at AI + blockchain conferences",
        "Discord, Twitter, TikTok, Telegram hubs",
        "Regional ambassador programs",
        "Multi-language support",
        "Local creator and developer support"
      ],
      impact: "The network is inclusive, ensuring adoption across AI communities worldwide",
      socialProof: [
        { avatar: "🌍", name: "Hiroshi Tanaka", role: "Ambassador JP", message: "Building amazing community in Tokyo!" },
        { avatar: "🇪🇺", name: "Marie Dubois", role: "Ambassador EU", message: "European creators love DAGChain" },
        { avatar: "🌎", name: "Roberto Silva", role: "Ambassador LATAM", message: "Growing fast in Latin America" }
      ]
    }
  ]

  const socialChannels = [
    { name: "Discord", members: "Tracked", icon: DiscordLogo, color: "bg-gray-100 text-gray-700", href: "https://discord.gg/fKpUQxDdyG" },
    { name: "X (Twitter)", members: "Tracked", icon: XLogo, color: "bg-gray-100 text-gray-700", href: "https://x.com/dagchain_ai" },
    { name: "TikTok", members: "Tracked", icon: TikTokLogo, color: "bg-gray-100 text-gray-700", href: "https://www.tiktok.com/@dagchain" },
    { name: "Telegram", members: "Tracked", icon: TelegramLogo, color: "bg-gray-100 text-gray-700", href: "https://t.me/dagchain_network" },
    { name: "Medium", members: "Tracked", icon: MediumLogo, color: "bg-gray-100 text-gray-700", href: "https://medium.com/@dagchain" },
    { name: "Instagram", members: "Tracked", icon: InstagramLogo, color: "bg-gray-100 text-gray-700", href: "https://www.instagram.com/dagchain.network/" },
    { name: "YouTube", members: "Tracked", icon: YouTubeLogo, color: "bg-gray-100 text-gray-700", href: "https://www.youtube.com/@dagchain.network" },
    { name: "Facebook", members: "Tracked", icon: FacebookLogo, color: "bg-gray-100 text-gray-700", href: "https://www.facebook.com/people/DagChain/61584495032870/" },
    { name: "LinkedIn", members: "Tracked", icon: LinkedInLogo, color: "bg-gray-100 text-gray-700", href: "https://www.linkedin.com/company/dag-chain" },
    { name: "CoinMarketCap", members: "Tracked", icon: CoinMarketCapLogo, color: "bg-gray-100 text-gray-700", href: "https://coinmarketcap.com/community/profile/dagchain/" }
  ]

  return (
    <section id="community" className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-white py-20 overflow-hidden">
      
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
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          {/* Section Header */}
          <motion.div
            className="bg-white p-3 shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200 rounded-2xl inline-block mb-8"
          >
            <span className="text-sm font-semibold text-gray-700 tracking-wider uppercase">COMMUNITY</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-nasalization leading-tight">
            Our Community
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-inter">
            More than an audience — the foundation of decentralization, adoption, and governance. 
            From 50,000 validators to AI creators, our community powers every layer of growth.
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-16"
        >
          {communityStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                className={`bg-white rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer ${
                  hoveredStat === index
                    ? 'shadow-[20px_20px_40px_rgba(163,177,198,0.4),-20px_-20px_40px_rgba(255,255,255,0.9)] scale-105'
                    : 'shadow-[16px_16px_32px_rgba(163,177,198,0.3),-16px_-16px_32px_rgba(255,255,255,0.9)]'
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center shadow-[inset_8px_8px_16px_rgba(163,177,198,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.8)] border border-gray-200">
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2 font-nasalization">{stat.number}</div>
                <div className="text-gray-600 font-inter">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Community Pillars Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {communityPillars.map((pillar, index) => {
              const IconComponent = pillar.icon
              return (
                <motion.button
                  key={pillar.id}
                  onClick={() => setActiveCard(index)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${
                    activeCard === index
                      ? 'bg-white text-gray-900 shadow-[inset_-8px_-8px_16px_rgba(255,255,255,0.7),inset_8px_8px_16px_rgba(163,177,198,0.3)] border border-gray-200'
                      : 'bg-gray-50 text-gray-600 hover:bg-white shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] hover:shadow-[8px_8px_16px_rgba(163,177,198,0.4),-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200'
                  }`}
                  whileHover={{ scale: activeCard === index ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm font-nasalization hidden sm:inline">{pillar.title.split(' ')[0]}</span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] border border-gray-200">
                    {pillar.members}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Active Community Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white rounded-3xl shadow-[30px_30px_60px_rgba(163,177,198,0.4),-30px_-30px_60px_rgba(255,255,255,0.9)] border border-gray-200 overflow-hidden"
            >
              <div className="grid lg:grid-cols-3 gap-0">
                
                {/* Left: Community Info */}
                <div className="lg:col-span-2 p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center shadow-[inset_8px_8px_16px_rgba(163,177,198,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.8)] border border-gray-200">
                      {React.createElement(communityPillars[activeCard].icon, { className: "w-8 h-8 text-gray-700" })}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 font-nasalization">
                        {communityPillars[activeCard].title}
                      </h2>
                      <p className="text-gray-600 font-inter">
                        {communityPillars[activeCard].description}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 font-nasalization flex items-center gap-2">
                      <Star className="w-5 h-5 text-gray-700" />
                      Key Features
                    </h3>
                    <div className="space-y-3">
                      {communityPillars[activeCard].features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-2 h-2 rounded-full bg-gray-400" />
                          <span className="text-gray-700 font-inter">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Community Impact */}
                  <div className="bg-gray-50 rounded-2xl p-6 shadow-[inset_12px_12px_24px_rgba(163,177,198,0.2),inset_-12px_-12px_24px_rgba(255,255,255,0.8)] border border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-5 h-5 text-gray-700" />
                      <h4 className="font-semibold text-gray-900 font-nasalization">Community Impact</h4>
                    </div>
                    <p className="text-gray-700 font-inter leading-relaxed">
                      {communityPillars[activeCard].impact}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Social Channels */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-nasalization">Join Our Global Community</h2>
            <p className="text-gray-600 max-w-3xl mx-auto font-inter">
              Connect with fellow validators, creators, and builders across our social platforms
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {socialChannels.map((channel, index) => {
              const IconComponent = channel.icon
              return (
                <motion.a
                  key={channel.name}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-4 text-center shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] hover:shadow-[16px_16px_32px_rgba(163,177,198,0.4),-16px_-16px_32px_rgba(255,255,255,0.9)] transition-all duration-300 cursor-pointer group border border-gray-200 block w-[140px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-100 flex items-center justify-center shadow-[inset_6px_6px_12px_rgba(163,177,198,0.2),inset_-6px_-6px_12px_rgba(255,255,255,0.8)] border border-gray-200">
                    <IconComponent className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1 font-nasalization truncate">{channel.name}</h3>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${channel.color}`}>
                    {channel.members}
                  </div>
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 mx-auto text-gray-600" />
                  </div>
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
