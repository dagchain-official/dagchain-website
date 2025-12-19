"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { PieChart, BarChart3, TrendingUp, Users, Lock, Coins } from "lucide-react"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

export function Tokenomics() {
  const [activeView, setActiveView] = useState<'overview' | 'preminted' | 'mintable'>('overview')

  const tokenomicsData = {
    totalSupply: 4000000000,
    preminted: {
      total: 400000000,
      percentage: 10,
      allocations: [
        {
          name: "Private Sale & Pre-Sale",
          amount: 0,
          percentage: 0,
          icon: Users,
          details: {
            privateSale: "Price: $0.40 per DGC token",
            preSale: "4 Phases: $0.55, $0.60, $0.65, $0.70 per DGC",
            timeline: "Sale ends August 31, 2026",
            vesting: "Private: TBD | Pre-Sale: 10% TGE, linear 24-36 months",
            participants: "Strategic VCs, early backers, ecosystem partners"
          }
        },
        {
          name: "Public Sale", 
          amount: 0,
          percentage: 0,
          icon: TrendingUp,
          details: {
            timeline: "TBD (To Be Decided)",
            price: "TBD (To Be Decided)",
            vesting: "25% TGE, 75% linear over 12 months",
            participants: "Community via launchpads + whitelist"
          }
        },
        {
          name: "Team",
          amount: 280000000, 
          percentage: 7,
          icon: Users,
          details: {
            vesting: "1-year cliff, then linear over 4 years",
            role: "Long-term alignment of founding team",
            narrative: "Multi-year delivery incentives"
          }
        },
        {
          name: "Advisors",
          amount: 120000000,
          percentage: 3,
          icon: Users,
          details: {
            vesting: "6-month cliff, then linear over 2 years", 
            role: "Strategic guidance from AI, Web3, enterprise",
            narrative: "Industry expertise without oversizing"
          }
        },
        {
          name: "Liquidity Provision",
          amount: 0,
          percentage: 0,
          icon: BarChart3,
          details: {
            locked: "DEX + CEX liquidity pools at launch",
            role: "Healthy token trading and user access",
            narrative: "Controlled price discovery"
          }
        },
        {
          name: "Reserves & Contingency", 
          amount: 0,
          percentage: 0,
          icon: Lock,
          details: {
            management: "Treasury-managed, time-locked",
            role: "Buffer for expenses, listings, emergencies",
            narrative: "Financial resilience for governance"
          }
        }
      ]
    },
    mintable: {
      total: 3600000000,
      percentage: 90,
      allocations: [
        {
          name: "Liquidity Provision",
          amount: 240000000,
          percentage: 6,
          icon: BarChart3,
          details: {
            locked: "DEX + CEX liquidity pools at launch",
            role: "Healthy token trading and user access",
            narrative: "Controlled price discovery"
          }
        },
        {
          name: "Reserves & Contingency",
          amount: 400000000,
          percentage: 10,
          icon: Lock,
          details: {
            management: "Treasury-managed, time-locked",
            role: "Buffer for expenses, listings, emergencies",
            narrative: "Financial resilience for governance"
          }
        },
        {
          name: "Node Rewards (Validators)",
          amount: 2000000000,
          percentage: 50,
          icon: Coins,
          details: {
            timeline: "Minted over 10–12 years by ~50,000 nodes",
            curve: "Higher early emissions, declining curve",
            role: "Incentivizes node uptime & validation",
            narrative: "Community-owned, validator-powered blockchain"
          }
        },
        {
          name: "Staking & Delegator Rewards",
          amount: 240000000,
          percentage: 6,
          icon: Lock,
          details: {
            incentives: "Token holders who delegate to validators",
            effect: "Encourages liquidity locking",
            role: "Rewards for stakers/delegators",
            narrative: "Beyond direct validators"
          }
        },
        {
          name: "Ecosystem Development Fund",
          amount: 400000000,
          percentage: 10,
          icon: TrendingUp,
          details: {
            grants: "AI-native projects, hackathons, integrations",
            distribution: "Via governance over time", 
            role: "For R&D, grants, partnerships, and ecosystem expansion",
            narrative: "Fuels ecosystem growth"
          }
        },
        {
          name: "Community Incentives & Airdrops",
          amount: 320000000,
          percentage: 8,
          icon: Users,
          details: {
            recipients: "Early Testnet users, contributors, AI creators",
            role: "Fair distribution and broad participation",
            narrative: "Rewards contributors, not speculators"
          }
        }
      ]
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`
    if (num >= 1000000) return `${(num / 1000000).toFixed(0)}M`
    return num.toLocaleString()
  }

  // Chart data for donut chart
  const chartData = [
    ...tokenomicsData.preminted.allocations.filter(item => item.percentage > 0).map(item => ({
      name: item.name,
      value: item.percentage,
      tokens: formatNumber(item.amount),
      color: '#6b7280'
    })),
    ...tokenomicsData.mintable.allocations.map(item => ({
      name: item.name,
      value: item.percentage,
      tokens: formatNumber(item.amount),
      color: '#374151'
    }))
  ]

  // Colors for chart segments
  const COLORS = ['#9ca3af', '#d1d5db', '#e5e7eb', '#f3f4f6', '#f9fafb', '#fafafa', '#374151', '#4b5563', '#6b7280', '#9ca3af']

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-sm text-gray-600">{data.value}% ({data.tokens} DGC)</p>
        </div>
      )
    }
    return null
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
    <section id="tokenomics" className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-white py-20 overflow-hidden">
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
            <span className="text-sm font-semibold text-gray-700 tracking-wider uppercase">TOKENOMICS</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-nasalization leading-tight"
          >
            DAGChain Token Economics
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-inter"
          >
            Sustainable tokenomics designed for long-term ecosystem growth with fair distribution and strong incentive alignment.
          </motion.p>
        </motion.div>

        {/* Total Supply Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white p-8 shadow-[30px_30px_60px_rgba(163,177,198,0.4),-30px_-30px_60px_rgba(255,255,255,0.9)] border border-gray-200 rounded-3xl mb-12"
        >
          <div className="text-center mb-8">
            <motion.h3
              variants={itemVariants}
              className="text-3xl font-bold text-gray-900 mb-4 font-nasalization"
            >
              Total Supply: {formatNumber(tokenomicsData.totalSupply)} DGC
            </motion.h3>
            
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
              {/* Preminted Box */}
              <motion.div
                variants={itemVariants}
                className="bg-gray-50 p-6 shadow-[inset_12px_12px_24px_rgba(163,177,198,0.2),inset_-12px_-12px_24px_rgba(255,255,255,0.8)] border border-gray-200 rounded-2xl text-center"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200 flex items-center justify-center mx-auto mb-4">
                  <PieChart className="w-8 h-8 text-gray-700" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2 font-nasalization">
                  {formatNumber(tokenomicsData.preminted.total)}
                </h4>
                <p className="text-lg text-gray-600 mb-1">Preminted ({tokenomicsData.preminted.percentage}%)</p>
                <p className="text-sm text-gray-500">Initial distribution & operations</p>
              </motion.div>

              {/* Donut Chart */}
              <motion.div
                variants={itemVariants}
                className="bg-gray-50 p-6 shadow-[inset_12px_12px_24px_rgba(163,177,198,0.2),inset_-12px_-12px_24px_rgba(255,255,255,0.8)] border border-gray-200 rounded-2xl"
              >
                <ResponsiveContainer width="100%" height={280}>
                  <RechartsPieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <p className="text-xs text-gray-500 text-center mt-2">Hover to see Tokenomics details</p>
              </motion.div>

              {/* Mintable Box */}
              <motion.div
                variants={itemVariants}
                className="bg-gray-50 p-6 shadow-[inset_12px_12px_24px_rgba(163,177,198,0.2),inset_-12px_-12px_24px_rgba(255,255,255,0.8)] border border-gray-200 rounded-2xl text-center"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200 flex items-center justify-center mx-auto mb-4">
                  <Coins className="w-8 h-8 text-gray-700" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2 font-nasalization">
                  {formatNumber(tokenomicsData.mintable.total)}
                </h4>
                <p className="text-lg text-gray-600 mb-1">Mintable ({tokenomicsData.mintable.percentage}%)</p>
                <p className="text-sm text-gray-500">Network rewards & incentives</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* View Toggle */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { key: 'overview', label: 'Overview', icon: PieChart },
            { key: 'preminted', label: 'Preminted Allocation', icon: Lock },
            { key: 'mintable', label: 'Mintable Rewards', icon: Coins }
          ].map((view) => (
            <motion.button
              key={view.key}
              variants={itemVariants}
              onClick={() => setActiveView(view.key as any)}
              className={`px-6 py-3 font-medium transition-all duration-300 rounded-2xl border border-gray-200 ${
                activeView === view.key
                  ? 'bg-white shadow-[inset_-8px_-8px_16px_rgba(255,255,255,0.7),inset_8px_8px_16px_rgba(163,177,198,0.3)] text-gray-900'
                  : 'bg-gray-50 shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] text-gray-700 hover:!bg-gradient-to-r hover:!from-[#123CFE] hover:!to-[#FFE5F5] hover:!text-white hover:!shadow-lg'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {React.createElement(view.icon, { className: "w-5 h-5 inline mr-2" })}
              {view.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Active View Content */}
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 shadow-[30px_30px_60px_rgba(163,177,198,0.4),-30px_-30px_60px_rgba(255,255,255,0.9)] border border-gray-200 rounded-3xl"
        >
          {activeView === 'overview' && (
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center font-nasalization">
                Complete Token Distribution
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Preminted Overview */}
                <div className="bg-gray-50 p-6 shadow-[inset_12px_12px_24px_rgba(163,177,198,0.2),inset_-12px_-12px_24px_rgba(255,255,255,0.8)] border border-gray-200 rounded-2xl">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 font-nasalization">Preminted (10%)</h4>
                  <div className="space-y-3">
                    {tokenomicsData.preminted.allocations.filter(a => a.percentage > 0).map((allocation, index) => (
                      <div 
                        key={index} 
                        className="group bg-white p-3 rounded-xl shadow-[4px_4px_8px_rgba(163,177,198,0.3),-4px_-4px_8px_rgba(255,255,255,0.9)] border border-gray-200 hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.1)] hover:border-pink-200/30 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                        style={{ transition: 'all 0.3s ease' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #123CFE 0%, #FFE5F5 100%)'
                          const nameSpan = e.currentTarget.querySelector('span:first-child') as HTMLElement
                          const percentSpan = e.currentTarget.querySelector('span:last-child') as HTMLElement
                          if (nameSpan) nameSpan.style.color = 'white'
                          if (percentSpan) percentSpan.style.color = '#111827'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'white'
                          const nameSpan = e.currentTarget.querySelector('span:first-child') as HTMLElement
                          const percentSpan = e.currentTarget.querySelector('span:last-child') as HTMLElement
                          if (nameSpan) nameSpan.style.color = '#374151'
                          if (percentSpan) percentSpan.style.color = '#111827'
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 transition-colors duration-300">{allocation.name}</span>
                          <span className="text-sm font-bold text-gray-900 transition-colors duration-300">{allocation.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mintable Overview */}
                <div className="bg-gray-50 p-6 shadow-[inset_12px_12px_24px_rgba(163,177,198,0.2),inset_-12px_-12px_24px_rgba(255,255,255,0.8)] border border-gray-200 rounded-2xl">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 font-nasalization">Mintable (90%)</h4>
                  <div className="space-y-3">
                    {tokenomicsData.mintable.allocations.map((allocation, index) => (
                      <div 
                        key={index} 
                        className="group bg-white p-3 rounded-xl shadow-[4px_4px_8px_rgba(163,177,198,0.3),-4px_-4px_8px_rgba(255,255,255,0.9)] border border-gray-200 hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.1)] hover:border-pink-200/30 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                        style={{ transition: 'all 0.3s ease' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #123CFE 0%, #FFE5F5 100%)'
                          const nameSpan = e.currentTarget.querySelector('span:first-child') as HTMLElement
                          const percentSpan = e.currentTarget.querySelector('span:last-child') as HTMLElement
                          if (nameSpan) nameSpan.style.color = 'white'
                          if (percentSpan) percentSpan.style.color = '#111827'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'white'
                          const nameSpan = e.currentTarget.querySelector('span:first-child') as HTMLElement
                          const percentSpan = e.currentTarget.querySelector('span:last-child') as HTMLElement
                          if (nameSpan) nameSpan.style.color = '#374151'
                          if (percentSpan) percentSpan.style.color = '#111827'
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 transition-colors duration-300">{allocation.name}</span>
                          <span className="text-sm font-bold text-gray-900 transition-colors duration-300">{allocation.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'preminted' && (
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center font-nasalization">
                Preminted Allocation ({tokenomicsData.preminted.percentage}%)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {tokenomicsData.preminted.allocations.filter(a => a.percentage > 0).map((allocation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gray-50 p-6 shadow-[inset_12px_12px_24px_rgba(163,177,198,0.2),inset_-12px_-12px_24px_rgba(255,255,255,0.8)] border border-gray-200 rounded-2xl"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-[6px_6px_12px_rgba(163,177,198,0.3),-6px_-6px_12px_rgba(255,255,255,0.9)] border border-gray-200 flex items-center justify-center">
                        {React.createElement(allocation.icon, { className: "w-6 h-6 text-gray-700" })}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 font-nasalization">{allocation.name}</h4>
                        <p className="text-sm text-gray-600">{allocation.percentage}% • {formatNumber(allocation.amount)}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {Object.entries(allocation.details).map(([key, value], detailIndex) => (
                        <div key={detailIndex} className="group bg-white p-2 rounded-lg shadow-[4px_4px_8px_rgba(163,177,198,0.3),-4px_-4px_8px_rgba(255,255,255,0.9)] border border-gray-200 hover:!bg-gradient-to-r hover:!from-[#123CFE] hover:!to-[#FFE5F5] transition-all duration-300 cursor-pointer">
                          <div className="text-xs font-semibold text-gray-600 capitalize mb-1 group-hover:text-white">{key}</div>
                          <div className="text-xs text-gray-700 group-hover:text-white">{value}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'mintable' && (
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center font-nasalization">
                Mintable Rewards ({tokenomicsData.mintable.percentage}%)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {tokenomicsData.mintable.allocations.map((allocation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gray-50 p-6 shadow-[inset_12px_12px_24px_rgba(163,177,198,0.2),inset_-12px_-12px_24px_rgba(255,255,255,0.8)] border border-gray-200 rounded-2xl"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-[6px_6px_12px_rgba(163,177,198,0.3),-6px_-6px_12px_rgba(255,255,255,0.9)] border border-gray-200 flex items-center justify-center">
                        {React.createElement(allocation.icon, { className: "w-6 h-6 text-gray-700" })}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 font-nasalization">{allocation.name}</h4>
                        <p className="text-sm text-gray-600">{allocation.percentage}% • {formatNumber(allocation.amount)}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {Object.entries(allocation.details).map(([key, value], detailIndex) => (
                        <div key={detailIndex} className="group bg-white p-2 rounded-lg shadow-[4px_4px_8px_rgba(163,177,198,0.3),-4px_-4px_8px_rgba(255,255,255,0.9)] border border-gray-200 hover:!bg-gradient-to-r hover:!from-[#123CFE] hover:!to-[#FFE5F5] transition-all duration-300 cursor-pointer">
                          <div className="text-xs font-semibold text-gray-600 capitalize mb-1 group-hover:text-white">{key}</div>
                          <div className="text-xs text-gray-700 group-hover:text-white">{value}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
