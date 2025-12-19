"use client"

import { motion } from "framer-motion"
import { Server, CheckCircle, Cpu, HardDrive, Wifi, Shield, Zap, Lock, Star, HelpCircle, Calculator, TrendingUp } from "lucide-react"
import { useState } from "react"

export function DagNode() {
  const [validatorCount, setValidatorCount] = useState(100)
  
  // Network Constants
  const BLOCKS_PER_DAY = 8640
  const BLOCK_SIZE_MB = 2
  const BLOCK_TIMING_SECONDS = 10
  const REWARDS_PER_BLOCK = 10
  const TOTAL_REWARDS_PER_DAY = 86400
  const MAX_VALIDATORS = 50000

  // Calculate rewards based on validator count
  const calculateRewards = (validators: number) => {
    const dailyRewards = TOTAL_REWARDS_PER_DAY / validators
    const monthlyRewards = dailyRewards * 30
    const yearlyRewards = dailyRewards * 365
    return {
      daily: dailyRewards.toFixed(2),
      monthly: monthlyRewards.toFixed(2),
      yearly: yearlyRewards.toFixed(2)
    }
  }

  const rewards = calculateRewards(validatorCount)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const nodePhases = [
    {
      phase: 'Phase 1',
      price: 750,
      status: 'Early Bird',
      availableKeys: 500,
      active: true
    },
    {
      phase: 'Phase 2',
      price: 1000,
      status: 'Standard',
      availableKeys: 2000,
      active: false
    },
    {
      phase: 'Phase 3',
      price: 1250,
      status: 'Final',
      availableKeys: 5000,
      active: false
    },
    {
      phase: 'Phase 4',
      price: 1500,
      status: 'Last Call',
      availableKeys: 7500,
      active: false
    }
  ]

  const benefits = [
    'Secure validator position in TestNet',
    'Earn Test Tokens during validation',
    'Establish foundation of DAGChain governance',
    'Direct participation in network decentralization',
    'Test tokens swapped 1:1 at MainNet',
    'Immediate validator access at TestNet Launch'
  ]

  const whyRunNode = [
    {
      title: 'Earn Validation Rewards',
      description: 'Generate passive income by validating transactions and securing the network. Validators earn test tokens that convert 1:1 to mainnet tokens.',
      icon: Zap
    },
    {
      title: 'Network Governance',
      description: 'Participate in key decisions about protocol upgrades, parameter changes, and the future direction of DAGChain.',
      icon: Shield
    },
    {
      title: 'Early Adopter Benefits',
      description: 'Be among the first validators on the network. Early validators receive priority in governance and additional reward multipliers.',
      icon: Star
    },
    {
      title: 'Technical Expertise',
      description: 'Gain hands-on experience with cutting-edge blockchain technology and build your reputation in the DAGChain ecosystem.',
      icon: Server
    }
  ]

  const setupSteps = [
    {
      step: 'Purchase Node Key',
      description: 'Select your preferred phase and complete the purchase with USDT',
      details: 'Keys are unique and non-transferable. Each key grants one validator slot.'
    },
    {
      step: 'Prepare Hardware',
      description: 'Set up your server with the recommended specifications',
      details: 'Cloud hosting (AWS, DigitalOcean) or dedicated hardware both work.'
    },
    {
      step: 'Install Software',
      description: 'Download and install the DAGChain validator node software',
      details: 'Full documentation and support provided before TestNet launch.'
    },
    {
      step: 'Configure & Launch',
      description: 'Configure your node with your unique key and start validating',
      details: 'TestNet launches February 2026. Setup assistance available.'
    }
  ]

  const faq = [
    {
      q: 'What happens to my test tokens?',
      a: 'All test tokens earned during TestNet validation will be swapped 1:1 for mainnet tokens when MainNet launches. There is no loss of value.'
    },
    {
      q: 'Can I run multiple nodes?',
      a: 'Yes! You can purchase multiple node keys and run multiple validators. Each validator operates independently and earns rewards separately.'
    },
    {
      q: 'What if I miss the TestNet launch?',
      a: 'You can join at any time after TestNet launch. However, early validators accumulate more test tokens and have priority in governance decisions.'
    },
    {
      q: 'Do I need technical knowledge?',
      a: 'Basic server management skills are helpful. We provide comprehensive documentation, video tutorials, and community support to help you get started.'
    },
    {
      q: 'What are the ongoing costs?',
      a: 'Main costs are your existing computer/Laptop and electricity. You can also run the Validator Node on a cloud server which typically costs around $40/month. Validation rewards typically exceed these costs significantly.'
    },
    {
      q: 'Can I sell my node key?',
      a: 'Node keys are tied to your wallet address and are non-transferable. However, you can always stop validating if needed.'
    }
  ]

  const systemRequirements = {
    minimum: {
      cpu: '4 cores (x86_64 or ARM64)',
      ram: '8 GB',
      storage: '250 GB SSD',
      network: '50 Mbps upload/download'
    },
    recommended: {
      cpu: '8 cores (dedicated server)',
      ram: '16 GB',
      storage: '1 TB NVMe SSD',
      network: '200 Mbps+, static IP'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.div
              variants={itemVariants}
              className="inline-block mb-8"
            >
              <div className="w-24 h-24 mx-auto rounded-3xl bg-gray-100 shadow-[20px_20px_40px_rgba(163,177,198,0.5),-20px_-20px_40px_rgba(255,255,255,0.9)] flex items-center justify-center">
                <Server className="w-12 h-12 text-gray-900" />
              </div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-6xl lg:text-7xl font-bold mb-8 font-nasalization text-gray-900 leading-tight"
            >
              DAG Node
              <br />
              Validator Keys
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-12"
            >
              Secure your position as a validator in the DAGChain TestNet. Purchase your node key and participate in network consensus from day one.
            </motion.p>

            {/* Network Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-10"
            >
              <div className="bg-gray-100 rounded-3xl p-6 shadow-[20px_20px_40px_rgba(163,177,198,0.5),-20px_-20px_40px_rgba(255,255,255,0.9)] text-center">
                <div className="text-5xl font-black text-gray-900 mb-3">{BLOCKS_PER_DAY.toLocaleString()}</div>
                <div className="text-sm font-bold text-gray-600">Blocks/Day</div>
              </div>

              <div className="bg-gray-100 rounded-3xl p-6 shadow-[20px_20px_40px_rgba(163,177,198,0.5),-20px_-20px_40px_rgba(255,255,255,0.9)] text-center">
                <div className="text-5xl font-black text-gray-900 mb-3">{BLOCK_SIZE_MB} MB</div>
                <div className="text-sm font-bold text-gray-600">Block Size</div>
              </div>

              <div className="bg-gray-100 rounded-3xl p-6 shadow-[20px_20px_40px_rgba(163,177,198,0.5),-20px_-20px_40px_rgba(255,255,255,0.9)] text-center">
                <div className="text-5xl font-black text-gray-900 mb-3">{BLOCK_TIMING_SECONDS}s</div>
                <div className="text-sm font-bold text-gray-600">Block Time</div>
              </div>

              <div className="bg-gray-100 rounded-3xl p-6 shadow-[20px_20px_40px_rgba(163,177,198,0.5),-20px_-20px_40px_rgba(255,255,255,0.9)] text-center">
                <div className="text-5xl font-black text-gray-900 mb-3">{REWARDS_PER_BLOCK}</div>
                <div className="text-sm font-bold text-gray-600">DAG/Block</div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-6 text-sm text-gray-700"
            >
              <div className="flex items-center gap-3 bg-gray-100 px-6 py-4 rounded-2xl shadow-[12px_12px_24px_rgba(163,177,198,0.4),-12px_-12px_24px_rgba(255,255,255,0.9)]">
                <div className="w-10 h-10 rounded-xl bg-white shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2)] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-gray-900" />
                </div>
                <span className="font-bold text-gray-900">Secure Validator Position</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 px-6 py-4 rounded-2xl shadow-[12px_12px_24px_rgba(163,177,198,0.4),-12px_-12px_24px_rgba(255,255,255,0.9)]">
                <div className="w-10 h-10 rounded-xl bg-white shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2)] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-gray-900" />
                </div>
                <span className="font-bold text-gray-900">Earn Test Tokens</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 px-6 py-4 rounded-2xl shadow-[12px_12px_24px_rgba(163,177,198,0.4),-12px_-12px_24px_rgba(255,255,255,0.9)]">
                <div className="w-10 h-10 rounded-xl bg-white shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2)] flex items-center justify-center">
                  <Lock className="w-5 h-5 text-gray-900" />
                </div>
                <span className="font-bold text-gray-900">1:1 MainNet Swap</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Node Key Sale Phases */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl font-bold mb-6 font-nasalization text-gray-900"
            >
              🔑 Node Key Sale Phases
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Four phases with increasing prices. Secure your validator position early for the best value.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {nodePhases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: phase.active ? 1.03 : 1 }}
                className={`bg-gray-100 rounded-3xl p-8 shadow-[20px_20px_40px_rgba(163,177,198,0.5),-20px_-20px_40px_rgba(255,255,255,0.9)] text-center transition-all duration-300 ${!phase.active ? 'opacity-50' : ''}`}
              >
                <div className="text-lg font-black text-gray-700 mb-3 font-nasalization">{phase.phase}</div>
                <div className="text-5xl font-black text-gray-900 mb-3">${phase.price}</div>
                <div className="text-sm font-bold text-gray-600 mb-6">{phase.status}</div>
                
                <div className="mb-6 py-4 px-5 bg-white rounded-2xl shadow-[inset_8px_8px_16px_rgba(163,177,198,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.9)]">
                  <div className="text-xs font-bold text-gray-500 mb-2">Available Keys</div>
                  <div className="text-3xl font-black text-gray-900">{phase.availableKeys.toLocaleString()}</div>
                </div>
                
                <div className={`w-full py-4 px-6 rounded-2xl font-black text-base transition-all duration-300 ${
                  phase.active 
                    ? 'bg-gray-900 text-white shadow-[12px_12px_24px_rgba(163,177,198,0.4),-12px_-12px_24px_rgba(255,255,255,0.9)] hover:shadow-[inset_8px_8px_16px_rgba(0,0,0,0.3)] cursor-pointer' 
                    : 'bg-gray-300 text-gray-500 shadow-[inset_8px_8px_16px_rgba(163,177,198,0.3)] cursor-not-allowed'
                }`}>
                  {!phase.active ? 'Locked' : 'Available'}
                </div>
              </motion.div>
            ))}
          </div>

          {/* What You Get */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="bg-gray-100 rounded-3xl p-10 shadow-[20px_20px_40px_rgba(163,177,198,0.5),-20px_-20px_40px_rgba(255,255,255,0.9)]"
          >
            <h3 className="text-3xl font-black text-gray-900 mb-8 text-center font-nasalization">What You Get</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-100 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2)] flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-gray-900" />
                  </div>
                  <span className="text-sm text-gray-800 font-bold leading-relaxed">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Network Explanation & Rewards Calculator */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl font-bold mb-6 font-nasalization text-gray-900"
            >
              ⚡ Validator Rewards Calculator
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Calculate your potential validator rewards based on network participation
            </motion.p>
          </motion.div>

          {/* How It Works Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-100 rounded-3xl p-10 shadow-[20px_20px_40px_rgba(163,177,198,0.5),-20px_-20px_40px_rgba(255,255,255,0.9)] mb-12"
          >
            <h3 className="text-2xl font-black text-gray-900 mb-6 text-center">How Validator Rewards Work</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)]">
                <div className="text-5xl font-black text-gray-900 mb-3">{TOTAL_REWARDS_PER_DAY.toLocaleString()}</div>
                <div className="text-sm font-bold text-gray-700 mb-4">Total DAG Rewards Per Day</div>
                <div className="text-xs text-gray-600 font-semibold leading-relaxed">
                  The network generates {BLOCKS_PER_DAY.toLocaleString()} blocks daily, each rewarding {REWARDS_PER_BLOCK} DAG to validators
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)]">
                <div className="text-5xl font-black text-gray-900 mb-3">÷</div>
                <div className="text-sm font-bold text-gray-700 mb-4">Shared Among Validators</div>
                <div className="text-xs text-gray-600 font-semibold leading-relaxed">
                  Daily rewards are distributed equally among all active validators in the network
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)]">
                <div className="text-5xl font-black text-gray-900 mb-3">=</div>
                <div className="text-sm font-bold text-gray-700 mb-4">Your Daily Earnings</div>
                <div className="text-xs text-gray-600 font-semibold leading-relaxed">
                  Fewer validators = Higher rewards per validator. Maximum {MAX_VALIDATORS.toLocaleString()} validators allowed
                </div>
              </div>
            </div>
          </motion.div>

          {/* Rewards Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-10 shadow-[20px_20px_40px_rgba(163,177,198,0.5),-20px_-20px_40px_rgba(255,255,255,0.9)]"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gray-100 shadow-[12px_12px_24px_rgba(163,177,198,0.4),-12px_-12px_24px_rgba(255,255,255,0.9)] flex items-center justify-center">
                <Calculator className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="text-3xl font-black text-gray-900">Validator Rewards Calculator</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Input */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4">
                  Number of Validators in Network
                </label>
                <input
                  type="range"
                  min="1"
                  max={MAX_VALIDATORS}
                  value={validatorCount}
                  onChange={(e) => setValidatorCount(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-4"
                  style={{
                    background: `linear-gradient(to right, #374151 0%, #374151 ${(validatorCount / MAX_VALIDATORS) * 100}%, #e5e7eb ${(validatorCount / MAX_VALIDATORS) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between items-center text-xs text-gray-600 font-semibold mb-6">
                  <span>1</span>
                  <input
                    type="number"
                    min="1"
                    max={MAX_VALIDATORS}
                    value={validatorCount}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      if (val >= 1 && val <= MAX_VALIDATORS) {
                        setValidatorCount(val)
                      }
                    }}
                    className="text-3xl font-black text-gray-900 text-center bg-gray-100 rounded-xl px-4 py-2 w-48 shadow-[inset_8px_8px_16px_rgba(163,177,198,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.9)] focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <span>{MAX_VALIDATORS.toLocaleString()}</span>
                </div>

                {/* Quick Presets */}
                <div className="grid grid-cols-4 gap-2">
                  {[1, 100, 1000, 10000].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setValidatorCount(preset)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-2 px-3 rounded-xl text-xs shadow-[8px_8px_16px_rgba(163,177,198,0.4),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3)] transition-all"
                    >
                      {preset.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Results */}
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-2xl p-6 shadow-[inset_12px_12px_24px_rgba(163,177,198,0.3),inset_-12px_-12px_24px_rgba(255,255,255,0.9)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-700">Daily Rewards</span>
                    <TrendingUp className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="text-4xl font-black text-gray-900">{rewards.daily} <span className="text-xl text-gray-600">DAG</span></div>
                </div>

                <div className="bg-gray-100 rounded-2xl p-6 shadow-[inset_12px_12px_24px_rgba(163,177,198,0.3),inset_-12px_-12px_24px_rgba(255,255,255,0.9)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-700">Monthly Rewards</span>
                    <TrendingUp className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="text-4xl font-black text-gray-900">{rewards.monthly} <span className="text-xl text-gray-600">DAG</span></div>
                </div>

                <div className="bg-gray-100 rounded-2xl p-6 shadow-[inset_12px_12px_24px_rgba(163,177,198,0.3),inset_-12px_-12px_24px_rgba(255,255,255,0.9)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-700">Yearly Rewards</span>
                    <TrendingUp className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="text-4xl font-black text-gray-900">{rewards.yearly} <span className="text-xl text-gray-600">DAG</span></div>
                </div>
              </div>
            </div>

            {/* Example Scenarios */}
            <div className="mt-8 pt-8 border-t-2 border-gray-200">
              <h4 className="text-lg font-black text-gray-900 mb-4">Example Scenarios:</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-100 rounded-xl p-4 shadow-[12px_12px_24px_rgba(163,177,198,0.4),-12px_-12px_24px_rgba(255,255,255,0.9)]">
                  <div className="text-xs font-bold text-gray-600 mb-2">Only 1 Validator</div>
                  <div className="text-2xl font-black text-gray-900">{TOTAL_REWARDS_PER_DAY.toLocaleString()} <span className="text-sm text-gray-600">DAG/day</span></div>
                  <div className="text-xs text-gray-500 mt-2 font-semibold">Takes all network rewards</div>
                </div>

                <div className="bg-gray-100 rounded-xl p-4 shadow-[12px_12px_24px_rgba(163,177,198,0.4),-12px_-12px_24px_rgba(255,255,255,0.9)]">
                  <div className="text-xs font-bold text-gray-600 mb-2">100 Validators</div>
                  <div className="text-2xl font-black text-gray-900">864 <span className="text-sm text-gray-600">DAG/day</span></div>
                  <div className="text-xs text-gray-500 mt-2 font-semibold">Early adopter advantage</div>
                </div>

                <div className="bg-gray-100 rounded-xl p-4 shadow-[12px_12px_24px_rgba(163,177,198,0.4),-12px_-12px_24px_rgba(255,255,255,0.9)]">
                  <div className="text-xs font-bold text-gray-600 mb-2">Max 50k Validators</div>
                  <div className="text-2xl font-black text-gray-900">1.728 <span className="text-sm text-gray-600">DAG/day</span></div>
                  <div className="text-xs text-gray-500 mt-2 font-semibold">Network at full capacity</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Run a Validator Node */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl font-bold mb-6 font-nasalization text-gray-900"
            >
              🚀 Why Run a Validator Node?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Become a core part of the DAGChain network and enjoy exclusive benefits
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyRunNode.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-3xl p-8 shadow-[20px_20px_40px_rgba(163,177,198,0.5),-20px_-20px_40px_rgba(255,255,255,0.9)] transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 shadow-[12px_12px_24px_rgba(163,177,198,0.4),-12px_-12px_24px_rgba(255,255,255,0.9)] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-gray-900" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 font-semibold leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Setup Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl font-bold mb-6 font-nasalization text-gray-900"
            >
              ⚙️ How to Get Started
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Simple 4-step process to become a DAGChain validator
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {setupSteps.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-100 rounded-3xl p-8 shadow-[20px_20px_40px_rgba(163,177,198,0.5),-20px_-20px_40px_rgba(255,255,255,0.9)] text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gray-900 shadow-[12px_12px_24px_rgba(0,0,0,0.4),-12px_-12px_24px_rgba(255,255,255,0.1)] flex items-center justify-center">
                  <span className="text-3xl font-black text-white">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{item.step}</h3>
                <p className="text-sm text-gray-700 font-semibold mb-4">{item.description}</p>
                <div className="pt-4 border-t border-gray-300">
                  <p className="text-xs text-gray-500 font-semibold">{item.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl font-bold mb-6 font-nasalization text-gray-900"
            >
              💻 System Requirements
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Ensure your hardware meets the requirements to run a DAGChain validator node
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Minimum Requirements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-100 rounded-3xl p-10 shadow-[20px_20px_40px_rgba(163,177,198,0.5),-20px_-20px_40px_rgba(255,255,255,0.9)]"
            >
              <h3 className="text-3xl font-black text-gray-900 mb-8 font-nasalization">Minimum Specs</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-[inset_8px_8px_16px_rgba(163,177,198,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.9)]">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-gray-900">CPU</div>
                    <div className="text-sm text-gray-600 font-semibold">{systemRequirements.minimum.cpu}</div>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-[inset_8px_8px_16px_rgba(163,177,198,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.9)]">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] flex items-center justify-center">
                    <Server className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-gray-900">RAM</div>
                    <div className="text-sm text-gray-600 font-semibold">{systemRequirements.minimum.ram}</div>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-[inset_8px_8px_16px_rgba(163,177,198,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.9)]">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] flex items-center justify-center">
                    <HardDrive className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-gray-900">Storage</div>
                    <div className="text-sm text-gray-600 font-semibold">{systemRequirements.minimum.storage}</div>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-[inset_8px_8px_16px_rgba(163,177,198,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.9)]">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] flex items-center justify-center">
                    <Wifi className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-gray-900">Network</div>
                    <div className="text-sm text-gray-600 font-semibold">{systemRequirements.minimum.network}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recommended Requirements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-100 rounded-3xl p-10 shadow-[20px_20px_40px_rgba(163,177,198,0.5),-20px_-20px_40px_rgba(255,255,255,0.9)]"
            >
              <h3 className="text-3xl font-black text-gray-900 mb-8 font-nasalization">Recommended</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-5 p-5 bg-gray-900 rounded-2xl shadow-[12px_12px_24px_rgba(0,0,0,0.4),-12px_-12px_24px_rgba(255,255,255,0.1)]">
                  <div className="w-12 h-12 rounded-xl bg-gray-800 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-white">CPU</div>
                    <div className="text-sm text-gray-300 font-semibold">{systemRequirements.recommended.cpu}</div>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-5 bg-gray-900 rounded-2xl shadow-[12px_12px_24px_rgba(0,0,0,0.4),-12px_-12px_24px_rgba(255,255,255,0.1)]">
                  <div className="w-12 h-12 rounded-xl bg-gray-800 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] flex items-center justify-center">
                    <Server className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-white">RAM</div>
                    <div className="text-sm text-gray-300 font-semibold">{systemRequirements.recommended.ram}</div>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-5 bg-gray-900 rounded-2xl shadow-[12px_12px_24px_rgba(0,0,0,0.4),-12px_-12px_24px_rgba(255,255,255,0.1)]">
                  <div className="w-12 h-12 rounded-xl bg-gray-800 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] flex items-center justify-center">
                    <HardDrive className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-white">Storage</div>
                    <div className="text-sm text-gray-300 font-semibold">{systemRequirements.recommended.storage}</div>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-5 bg-gray-900 rounded-2xl shadow-[12px_12px_24px_rgba(0,0,0,0.4),-12px_-12px_24px_rgba(255,255,255,0.1)]">
                  <div className="w-12 h-12 rounded-xl bg-gray-800 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] flex items-center justify-center">
                    <Wifi className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-white">Network</div>
                    <div className="text-sm text-gray-300 font-semibold">{systemRequirements.recommended.network}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="bg-gray-100 rounded-3xl p-10 shadow-[20px_20px_40px_rgba(163,177,198,0.5),-20px_-20px_40px_rgba(255,255,255,0.9)]"
          >
            <h3 className="text-3xl font-black text-gray-900 mb-10 text-center font-nasalization">⏱️ Timeline</h3>
            <div className="space-y-6">
              <motion.div 
                variants={itemVariants}
                className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)]"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-900 shadow-[8px_8px_16px_rgba(0,0,0,0.4),-8px_-8px_16px_rgba(255,255,255,0.1)] flex items-center justify-center flex-shrink-0 text-white font-black text-lg">1</div>
                <div>
                  <div className="font-black text-gray-900 mb-2 text-lg">Purchase Node Key</div>
                  <div className="text-sm text-gray-600 font-semibold leading-relaxed">Secure your validator position by purchasing a node key in any available phase</div>
                </div>
              </motion.div>
              <motion.div 
                variants={itemVariants}
                className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)]"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-900 shadow-[8px_8px_16px_rgba(0,0,0,0.4),-8px_-8px_16px_rgba(255,255,255,0.1)] flex items-center justify-center flex-shrink-0 text-white font-black text-lg">2</div>
                <div>
                  <div className="font-black text-gray-900 mb-2 text-lg">TestNet Launch (February 2026)</div>
                  <div className="text-sm text-gray-600 font-semibold leading-relaxed">Immediate validator access at TestNet launch. Start earning test tokens through validation</div>
                </div>
              </motion.div>
              <motion.div 
                variants={itemVariants}
                className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)]"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-900 shadow-[8px_8px_16px_rgba(0,0,0,0.4),-8px_-8px_16px_rgba(255,255,255,0.1)] flex items-center justify-center flex-shrink-0 text-white font-black text-lg">3</div>
                <div>
                  <div className="font-black text-gray-900 mb-2 text-lg">MainNet Launch</div>
                  <div className="text-sm text-gray-600 font-semibold leading-relaxed">Test tokens swapped 1:1 at MainNet. Continue as a validator on the main network</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl font-bold mb-6 font-nasalization text-gray-900"
            >
              ❓ Frequently Asked Questions
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Everything you need to know about running a DAGChain validator node
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {faq.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-[20px_20px_40px_rgba(163,177,198,0.5),-20px_-20px_40px_rgba(255,255,255,0.9)]"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2)] flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 leading-tight pt-1">{item.q}</h3>
                </div>
                <p className="text-sm text-gray-600 font-semibold leading-relaxed pl-14">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-12 shadow-[20px_20px_40px_rgba(163,177,198,0.5),-20px_-20px_40px_rgba(255,255,255,0.9)]"
          >
            <h2 className="text-5xl font-black mb-6 font-nasalization text-gray-900">
              Ready to Become a Validator?
            </h2>
            <p className="text-xl text-gray-600 font-semibold mb-10">
              Connect your wallet and purchase your node key in the user dashboard
            </p>
            <motion.a 
              href="https://dashboard.DAGChain.network/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gray-900 text-white px-12 py-5 rounded-2xl font-black text-xl shadow-[16px_16px_32px_rgba(0,0,0,0.5),-16px_-16px_32px_rgba(255,255,255,0.1)] hover:shadow-[inset_12px_12px_24px_rgba(0,0,0,0.4)] transition-all duration-300"
            >
              Go to Dashboard
            </motion.a>
            <p className="mt-8 text-sm text-gray-500 font-semibold">
              * Validator access begins at TestNet Launch (February 2026). Test tokens will be swapped 1:1 at MainNet.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
