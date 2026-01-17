"use client"

import React from "react"
import { m } from "framer-motion"
import { Shield, Award, TrendingUp, Users, CheckCircle, Zap, Trophy, Target, Gift, Star } from "lucide-react"

export function DagArmy() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const medals = [
    {
      title: "DAG Soldier",
      subtitle: "DAG Soldier",
      contribution: "$0 (Free)",
      medal: "🛡️ DAG Soldier Medal",
      reward: "20% Monthly Community Reward Share Pool (DAG ARMY)",
      commission: "5% from Direct Referral Sales",
      points: {
        direct: "500 DAG Points per Direct DAG Soldier Referral",
        directSR: "3,000 DAG Points per Direct DAG Lieutenant Referral",
        downline: "200 DAG Points per Downline DAG Soldier",
        downlineSR: "2,400 DAG Points per Downline DAG Lieutenant"
      },
      description: "Start your journey in the DAGChain ecosystem with partner benefits.",
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      shadow: "shadow-[0_8px_32px_rgba(59,130,246,0.5)]",
      glow: "shadow-[0_0_50px_rgba(59,130,246,0.4),inset_0_0_30px_rgba(255,255,255,0.15)]",
      featured: false
    },
    {
      title: "DAG Lieutenant",
      subtitle: "DAG Lieutenant",
      contribution: "$149 USDT",
      medal: "👑 DAG Lieutenant Medal",
      reward: "50% Monthly Community Reward Share Pool (Exclusive)",
      commission: "15% from Direct Referral Sales",
      points: {
        direct: "500 DAG Points per Direct DAG Soldier Referral",
        directSR: "3,000 DAG Points per Direct DAG Lieutenant Referral",
        downline: "200 DAG Points per Downline DAG Soldier",
        downlineSR: "2,400 DAG Points per Downline DAG Lieutenant"
      },
      description: "Lead the community's expansion, represent DAGChain on a Global scale.",
      gradient: "from-gray-600 via-gray-700 to-gray-900",
      shadow: "shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
      glow: "shadow-[0_0_50px_rgba(0,0,0,0.4),inset_0_0_30px_rgba(255,255,255,0.15)]",
      featured: true
    },
    {
      title: "DAG Commander",
      subtitle: "Elite Status",
      contribution: "50,000+ DAG Points or $1,000+ Sales",
      medal: "🏆 DAG Commander Badge",
      reward: "30% Monthly Community Reward Share Pool",
      requirement: "Must be DAG Lieutenant Member",
      points: {
        requirement: "50,000 DAG Points OR $1,000 Business Sales",
        benefit: "Shared among DAG Commander Members",
        status: "Elite Recognition & Governance",
        note: "Only DAG Lieutenant members eligible"
      },
      description: "Join the elite circle of DAG Commander Members who shape DAGChain's future.",
      gradient: "from-yellow-400 via-yellow-500 to-yellow-600",
      shadow: "shadow-[0_8px_32px_rgba(234,179,8,0.5)]",
      glow: "shadow-[0_0_60px_rgba(234,179,8,0.4),inset_0_0_40px_rgba(255,255,255,0.2)]",
      isPresidential: true
    }
  ]

  const benefits = [
    { icon: TrendingUp, title: "Rewards Participation", desc: "Receive your share of DAGChain's success every reward cycle" },
    { icon: Target, title: "Weekly Missions", desc: "Simple social media and community tasks sent to your dashboard weekly" },
    { icon: Zap, title: "7 Days to Complete", desc: "Flexible engagement window for each mission" },
    { icon: Trophy, title: "Reputation System", desc: "Earn badges, medals, and ranks as you complete missions" },
    { icon: Star, title: "Early Access", desc: "Get early insights into DAGChain launches, updates, and ecosystem products" },
    { icon: Gift, title: "Exclusive Rewards", desc: "Airdrops, Medals, and merchandise reserved only for DAG ARMY" }
  ]

  const steps = [
    { number: "1", title: "Enroll", desc: "Contribute 149 USDT to join as Super Representative" },
    { number: "2", title: "Receive Your Medal", desc: "Instantly earn your SR Medal in your Dashboard" },
    { number: "3", title: "Access Dashboard", desc: "Unlock your DAG ARMY control panel with weekly missions" },
    { number: "4", title: "Complete Tasks", desc: "Earn performance points and boost your reputation level" },
    { number: "5", title: "Claim Rewards", desc: "Withdraw reward shares and bonuses directly from your dashboard" }
  ]

  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <m.div variants={itemVariants} className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 blur-2xl opacity-20"></div>
              <Shield className="w-20 h-20 text-gray-800 relative z-10 mx-auto drop-shadow-2xl" />
            </div>
          </m.div>

          <m.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 font-nasalization text-gray-900 tracking-tight"
            style={{
              textShadow: '4px 4px 8px rgba(0,0,0,0.1), -2px -2px 4px rgba(255,255,255,0.8)'
            }}
          >
            DAG ARMY
          </m.h2>
          
          <m.p 
            variants={itemVariants}
            className="text-base md:text-lg text-gray-700 font-semibold mb-6"
          >
            The Chain is Only as Strong as Its ARMY
          </m.p>

          <m.div 
            variants={itemVariants}
            className="max-w-4xl mx-auto space-y-3"
          >
            <p className="text-sm md:text-base text-gray-800 leading-relaxed font-medium">
              Join the Movement. Power the Revolution. Earn with DAGChain.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              DAG ARMY isn't just a community - it's a digital battalion of pioneers, creators, and believers building the next generation of decentralized AI-powered blockchain infrastructure. Every mission, every task, every contribution brings us one step closer to the future.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed font-semibold">
              Become a Super Representative (S.R) and secure your position in the DAGChain ecosystem - for rewards, purpose, and prestige.
            </p>
          </m.div>
        </m.div>

        {/* Two Paths Section */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-20"
        >
          <m.div variants={itemVariants} className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-nasalization">
              🏅 Three Tiers. One Mission.
            </h3>
            <p className="text-sm md:text-base text-gray-700 font-semibold">Choose your role. Earn points. Shape the network.</p>
          </m.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {medals.map((medal, index) => (
              <m.div
                key={medal.subtitle}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative group"
              >
                {/* Featured Badge */}
                {medal.featured && (
                  <div className="absolute -top-3 right-6 z-10">
                    <div className="bg-gray-900 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                      RECOMMENDED
                    </div>
                  </div>
                )}

                {/* Neumorphic Card */}
                <div className={`
                  relative p-8 rounded-3xl bg-gray-50
                  shadow-[20px_20px_60px_rgba(163,177,198,0.5),-20px_-20px_60px_rgba(255,255,255,0.9)]
                  border border-gray-200
                  transition-all duration-500
                  group-hover:shadow-[25px_25px_70px_rgba(163,177,198,0.6),-25px_-25px_70px_rgba(255,255,255,1)]
                  min-h-[700px] flex flex-col
                `}>
                  {/* Medal Badge */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className={`
                      w-20 h-20 rounded-full bg-gradient-to-br ${medal.gradient}
                      flex items-center justify-center text-4xl
                      shadow-[8px_8px_24px_rgba(0,0,0,0.3),-8px_-8px_24px_rgba(255,255,255,0.8)]
                      ${medal.glow}
                      border-4 border-gray-100
                      group-hover:scale-110 transition-transform duration-500
                    `}>
                      {medal.medal.split(' ')[0]}
                    </div>
                  </div>

                  <div className="pt-8 flex-1 flex flex-col">
                    {/* Title */}
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2 text-center font-nasalization">
                      {medal.title}
                    </h4>
                    <p className="text-center text-gray-600 font-bold text-sm mb-5">({medal.subtitle})</p>

                    {/* Contribution */}
                    <div className="mb-5 p-3 rounded-2xl bg-white shadow-[inset_8px_8px_16px_rgba(163,177,198,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1 font-semibold">Membership Pass</p>
                      <p className={`font-bold text-gray-900 ${medal.isPresidential ? 'text-base' : 'text-xl'}`}>{medal.contribution}</p>
                    </div>

                    {/* Medal Info */}
                    <div className="mb-5 p-3 rounded-2xl bg-white shadow-[inset_8px_8px_16px_rgba(163,177,198,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1 font-semibold">Medal Earned</p>
                      <p className="text-base font-bold text-gray-900">{medal.medal}</p>
                    </div>

                    {/* Reward */}
                    <div className="mb-5 p-3 rounded-2xl bg-white shadow-[inset_8px_8px_16px_rgba(163,177,198,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1 font-semibold">Reward Share</p>
                      <p className="text-sm font-bold text-gray-900">{medal.reward}</p>
                    </div>

                    {/* Commission (for S.R.P and S.R) */}
                    {medal.commission && (
                      <div className="mb-5 p-3 rounded-2xl bg-white shadow-[inset_8px_8px_16px_rgba(163,177,198,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1 font-semibold">Direct Referral Commission</p>
                        <p className="text-sm font-bold text-green-600">{medal.commission}</p>
                      </div>
                    )}

                    {/* Requirement (for Presidential Club) */}
                    {medal.requirement && (
                      <div className="mb-5 p-3 rounded-2xl bg-white shadow-[inset_8px_8px_16px_rgba(163,177,198,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1 font-semibold">Requirement</p>
                        <p className="text-sm font-bold text-red-600">{medal.requirement}</p>
                      </div>
                    )}

                    {/* DAG Points System */}
                    <div className="mb-5 p-3 rounded-2xl bg-white shadow-[inset_8px_8px_16px_rgba(163,177,198,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200">
                      <p className="text-xs text-gray-600 mb-2 font-semibold">DAG Points</p>
                      <div className="space-y-1">
                        {Object.entries(medal.points).map(([key, value]) => (
                          <div key={key} className="flex items-start gap-1">
                            <CheckCircle className="w-3 h-3 text-gray-700 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-gray-800">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mt-auto">
                      <p className="text-gray-700 text-center leading-relaxed font-medium text-sm">
                        {medal.description}
                      </p>
                    </div>
                  </div>
                </div>
              </m.div>
            ))}
          </div>

          <m.div 
            variants={itemVariants}
            className="mt-6 text-center p-5 rounded-2xl bg-white shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] border border-gray-200 max-w-4xl mx-auto"
          >
            <CheckCircle className="w-6 h-6 text-gray-800 mx-auto mb-3" />
            
            <p className="text-gray-700 text-xs mb-2">
              Each contribution boosts your reward share and accelerates your path to become DAG Commander.
            </p>
            <p className="text-gray-800 font-bold text-sm">
              🏆 Accumulate 50,000+ DAG Points or $1,000+ in Sales to become exclusive DAG Commander!
            </p>
          </m.div>
        </m.div>

        {/* Benefits Section */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-20"
        >
          <m.h3 
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center font-nasalization"
          >
            💼 Your Benefits as a DAG ARMY Member
          </m.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <m.div
                  key={benefit.title}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="p-6 rounded-2xl bg-gray-50 shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] border border-gray-200 hover:shadow-[16px_16px_32px_rgba(163,177,198,0.4),-16px_-16px_32px_rgba(255,255,255,1)] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] flex items-center justify-center mb-3 border border-gray-200">
                    <Icon className="w-5 h-5 text-gray-800" />
                  </div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-gray-700 text-xs leading-relaxed">{benefit.desc}</p>
                </m.div>
              )
            })}
          </div>
        </m.div>

        {/* How It Works */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-20"
        >
          <m.h3 
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center font-nasalization"
          >
            ⚙️ How It Works
          </m.h3>

          <div className="max-w-4xl mx-auto space-y-6">
            {steps.map((step, index) => (
              <m.div
                key={step.number}
                variants={itemVariants}
                whileHover={{ x: 10, transition: { duration: 0.3 } }}
                className="group flex items-start gap-6 p-6 rounded-2xl bg-gray-50 shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] border border-gray-200 hover:!bg-gradient-to-r hover:!from-[#123CFE] hover:!to-[#FFE5F5] hover:!shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-base shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(255,255,255,0.1)] border-2 border-gray-600 group-hover:from-white group-hover:to-white group-hover:text-gray-900 group-hover:border-white">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-bold text-gray-900 mb-1 group-hover:text-white">{step.title}</h4>
                  <p className="text-gray-700 text-sm group-hover:text-white/90">{step.desc}</p>
                </div>
              </m.div>
            ))}
          </div>
        </m.div>

        {/* Profit Distribution */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-20"
        >
          <m.h3 
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center font-nasalization"
          >
            🪙 Reward Distribution
          </m.h3>

          <m.div 
            variants={itemVariants}
            className="max-w-4xl mx-auto p-8 rounded-3xl bg-gray-50 shadow-[20px_20px_40px_rgba(163,177,198,0.4),-20px_-20px_40px_rgba(255,255,255,0.9)] border border-gray-200"
          >
            <p className="text-gray-800 text-sm mb-5 font-semibold text-center">
              DAGChain's rewards are distributed monthly to the DAG ARMY pool.
            </p>

            <div className="p-5 rounded-2xl bg-white shadow-[inset_12px_12px_24px_rgba(163,177,198,0.2),inset_-12px_-12px_24px_rgba(255,255,255,0.9)] border border-gray-200 mb-5">
              <p className="text-gray-700 font-semibold mb-3 text-sm">Example:</p>
              <p className="text-gray-800 mb-3 text-sm">If DAGChain allocates <span className="font-bold text-lg">1,000,000 USDT</span> as community rewards:</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-gray-700 font-semibold text-xs">DAG ARMY - S.R.P + S.R (20%)</span>
                  <span className="text-gray-900 font-bold text-base">200,000 USDT</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-gray-700 font-semibold text-xs">S.R Exclusive (50%)</span>
                  <span className="text-gray-900 font-bold text-base">500,000 USDT</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-gray-700 font-semibold text-xs">Presidential Club (30%)</span>
                  <span className="text-gray-900 font-bold text-base">300,000 USDT</span>
                </div>
              </div>
            </div>

            <p className="text-gray-800 text-center font-semibold text-sm">
              The more medals you hold, the larger your share of the reward pool.
            </p>
          </m.div>
        </m.div>

        {/* CTA Button */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center"
        >
          <m.button
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-4 rounded-2xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white font-bold text-base shadow-[12px_12px_24px_rgba(0,0,0,0.4),-12px_-12px_24px_rgba(255,255,255,0.1)] hover:shadow-[16px_16px_32px_rgba(0,0,0,0.5),-16px_-16px_32px_rgba(255,255,255,0.15)] transition-all duration-300 border-2 border-gray-600 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Join the DAG ARMY
              <Award className="w-5 h-5" />
            </span>
            
            {/* Animated glow effect */}
            <m.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "linear"
              }}
            />
          </m.button>

          <p className="mt-6 text-gray-600 text-sm">
            Limited positions available. Secure your medal today.
          </p>
        </m.div>
      </div>
    </section>
  )
}
