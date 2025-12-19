"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { 
  Home, 
  Trophy, 
  Users, 
  Wallet,
  User,
  Bell,
  TrendingUp,
  Clock,
  Zap,
  Shield,
  Copy,
  ChevronRight,
  LogOut,
  Check,
  Lock,
  Gift,
  CheckCircle,
  Scale,
  Gem,
  Star,
  Award,
  AlertCircle
} from "lucide-react"
import { useWallet } from "./hooks/useWallet"
import { ClientOnlyWeb3Provider } from "./components/ClientOnlyWeb3Provider"
import { Leaderboard } from "./components/Leaderboard"

function PresaleContent() {
  const [activeSection, setActiveSection] = useState('Home')
  const [showWalletMenu, setShowWalletMenu] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [saleTrack, setSaleTrack] = useState('pre')
  const [paymentMethod, setPaymentMethod] = useState('eth')
  const [amount, setAmount] = useState('')
  const [estimatedTokens, setEstimatedTokens] = useState('0')
  const [currentPhase, setCurrentPhase] = useState(1)
  
  const {
    account,
    balance,
    isConnecting,
    error: walletError,
    connectWallet,
    disconnectWallet,
    formatAddress,
    isConnected,
    chainId
  } = useWallet()

  // Cosmic Level System
  const cosmicLevels = [
    { id: 1, name: 'Spark', description: 'The ignition of energy', requiredXP: 0, color: 'from-yellow-400 to-orange-500', icon: '⚡' },
    { id: 2, name: 'Flare', description: 'A burst of power, first expansion', requiredXP: 100, color: 'from-orange-400 to-red-500', icon: '🔥' },
    { id: 3, name: 'Pulse', description: 'Steady rhythm, gaining momentum', requiredXP: 250, color: 'from-red-400 to-pink-500', icon: '💓' },
    { id: 4, name: 'Orbit', description: 'Finding stability in motion', requiredXP: 500, color: 'from-blue-400 to-cyan-500', icon: '🌀' },
    { id: 5, name: 'Lunar', description: 'First celestial milestone', requiredXP: 1000, color: 'from-gray-300 to-blue-400', icon: '🌙' },
    { id: 6, name: 'Solar', description: 'Harnessing the power of a star', requiredXP: 2000, color: 'from-yellow-300 to-orange-400', icon: '☀️' },
    { id: 7, name: 'Stellar', description: 'Entering the world of stars', requiredXP: 4000, color: 'from-purple-400 to-pink-500', icon: '⭐' },
    { id: 8, name: 'Nebula', description: 'Birthplace of stars', requiredXP: 8000, color: 'from-purple-500 to-indigo-600', icon: '🌌' },
    { id: 9, name: 'Cluster', description: 'Collection of stars forming unity', requiredXP: 15000, color: 'from-indigo-500 to-purple-600', icon: '✨' },
    { id: 10, name: 'Galaxy', description: 'Massive structure, building dominance', requiredXP: 30000, color: 'from-purple-600 to-pink-600', icon: '🌠' },
    { id: 11, name: 'Quasar', description: 'Radiant beacon of immense energy', requiredXP: 60000, color: 'from-cyan-400 to-blue-600', icon: '💫' },
    { id: 12, name: 'Nova', description: 'Explosive transformation', requiredXP: 120000, color: 'from-blue-500 to-purple-700', icon: '💥' },
    { id: 13, name: 'Supernova', description: 'Peak burst of stellar force', requiredXP: 250000, color: 'from-purple-600 to-pink-700', icon: '🌟' },
    { id: 14, name: 'Cosmos', description: 'Grasping the vastness of the universe', requiredXP: 500000, color: 'from-indigo-600 to-purple-800', icon: '🌍' },
    { id: 15, name: 'Singularity', description: 'The ultimate state of infinite potential', requiredXP: 1000000, color: 'from-black to-purple-900', icon: '🕳️' }
  ]

  const [userXP, setUserXP] = useState(1250)

  const getCurrentLevel = () => {
    for (let i = cosmicLevels.length - 1; i >= 0; i--) {
      if (userXP >= cosmicLevels[i].requiredXP) {
        return cosmicLevels[i]
      }
    }
    return cosmicLevels[0]
  }

  const getNextLevel = () => {
    const currentLevel = getCurrentLevel()
    const currentIndex = cosmicLevels.findIndex(level => level.id === currentLevel.id)
    return currentIndex < cosmicLevels.length - 1 ? cosmicLevels[currentIndex + 1] : null
  }

  const getProgressPercentage = () => {
    const currentLevel = getCurrentLevel()
    const nextLevel = getNextLevel()
    
    if (!nextLevel) return 100
    
    const currentLevelXP = currentLevel.requiredXP
    const nextLevelXP = nextLevel.requiredXP
    const progressXP = userXP - currentLevelXP
    const totalXPNeeded = nextLevelXP - currentLevelXP
    
    return Math.min((progressXP / totalXPNeeded) * 100, 100)
  }

  const ecosystemStats = {
    totalUsers: 127543,
    airdropPool: 2500000,
  }

  const [countdowns, setCountdowns] = useState({
    airdropDelivery: { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 },
    testnetLaunch: { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  })

  const calculateCountdown = (targetDate: Date) => {
    const now = new Date()
    const difference = targetDate.getTime() - now.getTime()

    if (difference <= 0) {
      return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44))
    const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return { months, days, hours, minutes, seconds }
  }

  useEffect(() => {
    const updateCountdowns = () => {
      const airdropDeliveryDate = new Date('2026-03-15T18:00:00.000Z')
      const testnetLaunchDate = new Date('2026-08-31T18:00:00.000Z')

      setCountdowns({
        airdropDelivery: calculateCountdown(airdropDeliveryDate),
        testnetLaunch: calculateCountdown(testnetLaunchDate)
      })
    }

    updateCountdowns()
    const interval = setInterval(updateCountdowns, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const referralGrowthData = [
    { month: 'Jan', referrals: 45 },
    { month: 'Feb', referrals: 78 },
    { month: 'Mar', referrals: 125 },
    { month: 'Apr', referrals: 189 },
    { month: 'May', referrals: 267 },
    { month: 'Jun', referrals: 356 },
    { month: 'Jul', referrals: 445 },
    { month: 'Aug', referrals: 578 },
    { month: 'Sep', referrals: 689 },
    { month: 'Oct', referrals: 834 },
    { month: 'Nov', referrals: 1056 },
    { month: 'Dec', referrals: 1247 }
  ]

  const saleData = {
    private: {
      price: 0.40,
      phase: 1,
      totalPhases: 1,
      raised: 1200000,
      participants: 847,
      remaining: 300000
    },
    pre: {
      price: [0.55, 0.60, 0.65, 0.70][currentPhase - 1],
      phase: currentPhase,
      totalPhases: 4,
      raised: 1200000,
      participants: 400,
      remaining: 800000
    }
  }

  const currentSale = saleData[saleTrack as keyof typeof saleData]

  const handleAmountChange = (value: string) => {
    setAmount(value)
    if (value && !isNaN(parseFloat(value))) {
      const tokens = parseFloat(value) / currentSale.price
      setEstimatedTokens(tokens.toFixed(2))
    } else {
      setEstimatedTokens('0')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-lg m-2 mb-0 p-4 rounded-b-none rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-lg font-bold bg-gradient-to-r from-purple-700 via-pink-600 to-red-600 bg-clip-text text-transparent">
              DAGChain Presale
            </h1>
          </div>
          {account && (
            <div className="flex items-center p-2 bg-gray-100 rounded-lg shadow-inner">
              <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-700 font-mono">{formatAddress(account)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <motion.div 
        className="hidden lg:flex w-64 bg-white shadow-2xl p-6 flex-col m-4 mr-0 rounded-r-none rounded-3xl border-r-4 border-gray-200"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-bold">D</span>
          </div>
          <h1 className="ml-3 text-xl font-bold text-gray-900">DAGChain</h1>
        </div>

        {/* User Info */}
        {account && (
          <div className="flex items-center mb-8 p-3 bg-gray-50 rounded-lg shadow-inner">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-3"></div>
            <span className="text-sm text-gray-700 font-mono">{formatAddress(account)}</span>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {[
              { icon: Home, label: 'Home', id: 'Home' },
              { icon: Trophy, label: 'Leaderboard', id: 'Leaderboard' },
              { icon: Users, label: 'Referrals', id: 'Referral' },
              { icon: Wallet, label: 'Purchase', id: 'Purchase' },
              { icon: User, label: 'Profile', id: 'Profile' },
              { icon: Scale, label: 'Rules', id: 'Rules' }
            ].map((item) => (
              <li key={item.label}>
                <motion.button
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center p-3 rounded-lg transition-colors w-full text-left ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-purple-800 shadow-inner' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className="mr-3 w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="mt-auto space-y-2">
          {account ? (
            <motion.button 
              onClick={disconnectWallet}
              className="flex items-center w-full p-3 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
              whileHover={{ x: 5 }}
            >
              <LogOut className="mr-3 w-5 h-5" />
              <span className="text-sm font-medium">Disconnect</span>
            </motion.button>
          ) : (
            <motion.button 
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-sm hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <motion.div 
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
              {activeSection === 'Home' ? 'Dashboard Overview' : `${activeSection} Dashboard`}
            </h1>
            {account ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm sm:text-base text-gray-600 font-mono">{formatAddress(account)}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <p className="text-sm sm:text-base text-gray-600">Welcome back</p>
                <button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-sm disabled:opacity-50"
                >
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Wallet Error Banner */}
        {walletError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700 text-sm font-medium">{walletError}</p>
          </motion.div>
        )}

        {/* Conditional Content Based on Active Section */}
        {activeSection === 'Home' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Cosmic Level Progress Bar */}
            <motion.div 
              className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${getCurrentLevel().color} flex items-center justify-center text-xl sm:text-2xl shadow-lg`}>
                    {getCurrentLevel().icon}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-800">{getCurrentLevel().name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{getCurrentLevel().description}</p>
                  </div>
                </div>
                
                {getNextLevel() && (
                  <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                    <div className="text-left sm:text-right flex-1 sm:flex-none">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-700">Next: {getNextLevel()?.name}</h4>
                      <p className="text-xs text-gray-500">{userXP.toLocaleString()} / {getNextLevel()?.requiredXP.toLocaleString()} XP</p>
                    </div>
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r ${getNextLevel()?.color} flex items-center justify-center text-sm sm:text-lg opacity-60`}>
                      {getNextLevel()?.icon}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full h-2 sm:h-3 bg-gray-200 rounded-full shadow-inner">
                  <motion.div 
                    className={`h-full bg-gradient-to-r ${getCurrentLevel().color} rounded-full relative overflow-hidden`}
                    initial={{ width: 0 }}
                    animate={{ width: `${getProgressPercentage()}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                  </motion.div>
                </div>
                
                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  <span>{getCurrentLevel().requiredXP.toLocaleString()} XP</span>
                  <span className="font-semibold">{Math.round(getProgressPercentage())}% Complete</span>
                  <span>{getNextLevel()?.requiredXP.toLocaleString() || 'MAX'} XP</span>
                </div>
              </div>
            </motion.div>

            {/* Ecosystem Stats Section */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Total Users */}
              <motion.div
                className="bg-white shadow-xl p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm text-gray-500 mb-2 font-semibold">Total Users in Ecosystem</h3>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{formatNumber(ecosystemStats.totalUsers)}</p>
                <p className="text-xs sm:text-sm text-green-600 font-medium mt-1">+2.3% this week</p>
              </motion.div>

              {/* Airdrop Pool */}
              <motion.div
                className="bg-white shadow-xl p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm text-gray-500 mb-2 font-semibold">Airdrop Pool</h3>
                <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">${formatNumber(ecosystemStats.airdropPool)}</p>
                <motion.button
                  className="w-full py-2 px-4 bg-gray-200 text-gray-400 rounded-lg font-medium text-xs sm:text-sm cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Claim Airdrop
                </motion.button>
              </motion.div>

              {/* Airdrop Delivery Countdown */}
              <motion.div
                className="bg-white shadow-xl p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm text-gray-500 mb-2 font-semibold">Airdrop Delivery</h3>
                <div className="flex justify-center items-center space-x-1 sm:space-x-2 md:space-x-3 mb-1 flex-wrap">
                  <div className="text-center">
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">{countdowns.airdropDelivery.months}</span>
                    <span className="text-xs text-gray-600 ml-0.5 sm:ml-1 hidden sm:inline">M</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">{countdowns.airdropDelivery.days}</span>
                    <span className="text-xs text-gray-600 ml-0.5 sm:ml-1 hidden sm:inline">D</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">{countdowns.airdropDelivery.hours}</span>
                    <span className="text-xs text-gray-600 ml-0.5 sm:ml-1 hidden sm:inline">H</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs sm:text-sm font-semibold text-blue-600">{countdowns.airdropDelivery.minutes}m</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs sm:text-sm font-semibold text-blue-600">{countdowns.airdropDelivery.seconds}s</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">March 15, 2026</p>
              </motion.div>

              {/* TestNet Launch Countdown */}
              <motion.div
                className="bg-white shadow-xl p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm text-gray-500 mb-2 font-semibold">TestNet Launch</h3>
                <div className="flex justify-center items-center space-x-1 sm:space-x-2 md:space-x-3 mb-1 flex-wrap">
                  <div className="text-center">
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">{countdowns.testnetLaunch.months}</span>
                    <span className="text-xs text-gray-600 ml-0.5 sm:ml-1 hidden sm:inline">M</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">{countdowns.testnetLaunch.days}</span>
                    <span className="text-xs text-gray-600 ml-0.5 sm:ml-1 hidden sm:inline">D</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">{countdowns.testnetLaunch.hours}</span>
                    <span className="text-xs text-gray-600 ml-0.5 sm:ml-1 hidden sm:inline">H</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs sm:text-sm font-semibold text-orange-600">{countdowns.testnetLaunch.minutes}m</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs sm:text-sm font-semibold text-orange-600">{countdowns.testnetLaunch.seconds}s</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">August 31, 2026</p>
              </motion.div>
            </motion.div>

            {/* My Referral Section */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              {/* My Referral Growth Chart */}
              <motion.div 
                className="lg:col-span-2 bg-white shadow-xl p-4 sm:p-6 rounded-2xl border border-gray-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">My Referral Growth</h2>
                <div className="h-48 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={referralGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#6b7280"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        stroke="#6b7280"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="referrals" 
                        stroke="#7c3aed"
                        strokeWidth={3}
                        dot={{ fill: '#7c3aed', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#7c3aed' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* My Referral Stats */}
              <div className="space-y-3 sm:space-y-4">
                {/* XP Points */}
                <motion.div 
                  className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl border border-gray-200"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                >
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-medium text-gray-600">My XP Points</h3>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">2,856</p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm">
                    <span className="text-purple-600 font-semibold">+245</span>
                    <span className="text-gray-500 ml-2">this week</span>
                  </div>
                </motion.div>

                {/* Total Referrals */}
                <motion.div 
                  className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl border border-gray-200"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-medium text-gray-600">My Referrals</h3>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">1,247</p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm">
                    <span className="text-green-600 font-semibold">+12.5%</span>
                    <span className="text-gray-500 ml-2">this month</span>
                  </div>
                </motion.div>

                {/* Airdrop Opportunity */}
                <motion.div 
                  className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl border border-gray-200"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                >
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                      <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-medium text-gray-600">My Airdrop Opportunity</h3>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">$8,450</p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm">
                    <span className="text-orange-600 font-semibold">USDT</span>
                    <span className="text-gray-500 ml-2">estimated value</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}

        {activeSection === 'Leaderboard' && <Leaderboard />}

        {activeSection === 'Purchase' && (
          <div className="space-y-6">
            {/* Sale Track Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">SELECT SALE TRACK</h2>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  onClick={() => setSaleTrack('private')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-2xl transition-all duration-300 border border-gray-200 ${
                    saleTrack === 'private' ? 'bg-gray-100 shadow-inner' : 'bg-white shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600 font-semibold">PRIVATE SALE</span>
                    {saleTrack === 'private' && <CheckCircle className="w-5 h-5 text-gray-900" />}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    ${saleData.private.price.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-600">per DGC token • Phase 1/1</div>
                </motion.button>

                <motion.button
                  onClick={() => setSaleTrack('pre')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-2xl transition-all duration-300 border border-gray-200 ${
                    saleTrack === 'pre' ? 'bg-gray-100 shadow-inner' : 'bg-white shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600 font-semibold">PRE-SALE</span>
                    {saleTrack === 'pre' && <CheckCircle className="w-5 h-5 text-gray-900" />}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    ${saleData.pre.price.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-600">per DGC token • Phase {currentPhase}/4</div>
                </motion.button>
              </div>

              {/* Phase Info for Pre-Sale */}
              {saleTrack === 'pre' && (
                <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-700 font-semibold">Pre-Sale Phase Progress</span>
                    <span className="text-xs text-gray-600">Phase {currentPhase} of 4</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[1, 2, 3, 4].map((phase) => (
                      <div
                        key={phase}
                        className={`h-2 rounded-full ${
                          phase <= currentPhase ? 'bg-gray-900' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs text-gray-600">
                    <div>$0.55</div>
                    <div>$0.60</div>
                    <div>$0.65</div>
                    <div>$0.70</div>
                  </div>
                </div>
              )}

              {/* Warning */}
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-800">
                    <strong>Important:</strong> You must use the same sale track for all purchases. 
                    Switching between Private and Pre-Sale after your first purchase will cause an error.
                  </p>
                </div>
              </div>

              {/* Sale End Date */}
              <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-700" />
                    <span className="text-sm text-gray-700 font-semibold">Sale Ends:</span>
                  </div>
                  <span className="text-sm text-gray-900 font-bold">August 31, 2026</span>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { label: 'Total Raised', value: `$${(currentSale.raised / 1000).toFixed(1)}K`, icon: TrendingUp },
                { label: 'Participants', value: currentSale.participants.toString(), icon: Users },
                { label: 'Remaining', value: `$${(currentSale.remaining / 1000).toFixed(0)}K`, icon: Clock }
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xl"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-200 shadow-inner">
                        <Icon className="w-5 h-5 text-gray-700" />
                      </div>
                      <span className="text-sm text-gray-600">{stat.label}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  </div>
                )
              })}
            </motion.div>

            {/* Purchase Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white shadow-xl p-8 rounded-3xl border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-gray-700" />
                PURCHASE TOKENS
              </h2>

              {/* Payment Method Selector */}
              <div className="mb-6">
                <label className="text-sm text-gray-600 mb-3 block font-semibold">Payment Method</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('eth')}
                    className={`py-3 rounded-xl font-semibold transition-all duration-300 border border-gray-200 ${
                      paymentMethod === 'eth' ? 'bg-gray-100 shadow-inner' : 'bg-white shadow-lg'
                    }`}
                  >
                    <span className="text-gray-900">Buy with ETH</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('usdt')}
                    className={`py-3 rounded-xl font-semibold transition-all duration-300 border border-gray-200 ${
                      paymentMethod === 'usdt' ? 'bg-gray-100 shadow-inner' : 'bg-white shadow-lg'
                    }`}
                  >
                    <span className="text-gray-900">Buy with USDT</span>
                  </button>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="text-sm text-gray-600 mb-2 block font-semibold">
                  Amount ({paymentMethod === 'eth' ? 'ETH' : 'USDT'})
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-6 py-4 rounded-xl bg-gray-50 text-gray-900 text-lg font-semibold focus:outline-none border border-gray-200 shadow-inner"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 text-sm font-semibold">
                    {paymentMethod === 'eth' ? 'ETH' : 'USDT'}
                  </div>
                </div>
              </div>

              {/* Estimated Tokens */}
              {amount && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-inner">
                  <p className="text-sm text-gray-600 mb-1">You will receive approximately:</p>
                  <p className="text-3xl font-bold text-gray-900">{estimatedTokens} DGC</p>
                  <p className="text-xs text-gray-600 mt-2">
                    Token Price: ${currentSale.price.toFixed(2)} per DGC
                  </p>
                </div>
              )}

              {/* Buy Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold flex items-center justify-center gap-2 relative overflow-hidden group shadow-xl"
              >
                <span>BUY NOW</span>
                <ChevronRight className="w-5 h-5" />
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              </motion.button>

              {/* Info Grid */}
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-inner">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-gray-700" />
                    <span className="text-xs text-gray-600 font-semibold">Vesting Schedule</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    10% TGE, remaining linear over 24-36 months
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-inner">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-4 h-4 text-gray-700" />
                    <span className="text-xs text-gray-600 font-semibold">Early Bird Bonus</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Get 15% extra tokens during Phase 1
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {[
                { icon: Shield, title: 'Secure', desc: 'Audited smart contracts with multi-layer security' },
                { icon: Zap, title: 'Fast', desc: 'Lightning-fast transactions on Ethereum network' },
                { icon: Lock, title: 'Vesting', desc: 'Fair token distribution with transparent schedule' }
              ].map((feature) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="bg-white p-6 rounded-2xl text-center border border-gray-200 shadow-xl"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 mx-auto mb-4 flex items-center justify-center border border-gray-200 shadow-inner">
                      <Icon className="w-8 h-8 text-gray-700" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                )
              })}
            </motion.div>
          </div>
        )}

        {activeSection !== 'Home' && activeSection !== 'Leaderboard' && activeSection !== 'Purchase' && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">COMING SOON</h2>
              <p className="text-gray-600">This section is under development</p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gray-400/20 rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

export default function PresalePage() {
  return (
    <ClientOnlyWeb3Provider>
      <PresaleContent />
    </ClientOnlyWeb3Provider>
  )
}
