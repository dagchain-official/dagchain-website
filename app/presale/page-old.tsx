"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Home, 
  Trophy, 
  Users, 
  Layers, 
  User, 
  FileText, 
  Bell,
  Wallet,
  TrendingUp,
  Clock,
  Zap,
  Shield,
  Copy,
  ExternalLink,
  ChevronRight,
  LogOut,
  Check
} from "lucide-react"
import { HomeContent } from "./components/HomeContent"
import { useWallet } from "./hooks/useWallet"
import { ClientOnlyWeb3Provider } from "./components/ClientOnlyWeb3Provider"

function PresaleContent() {
  const [activeMenu, setActiveMenu] = useState("home")
  const [showWalletMenu, setShowWalletMenu] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState(false)
  
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
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 42,
    seconds: 18
  })

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "referral", label: "Referral", icon: Users },
    { id: "staking", label: "Staking", icon: Layers },
    { id: "profile", label: "Profile", icon: User },
    { id: "rules", label: "Rules", icon: FileText },
    { id: "notifications", label: "Notifications", icon: Bell }
  ]

  const saleStats = [
    { label: "Current Price", value: "$0.25", change: "+12%", icon: TrendingUp },
    { label: "Total Raised", value: "$2.4M", change: "48%", icon: Zap },
    { label: "Participants", value: "1,247", change: "+89", icon: Users },
    { label: "Your Balance", value: "0 DGC", change: "Connect", icon: Wallet }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 overflow-hidden relative">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-200/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-300/30 rounded-full blur-[120px] animate-pulse delay-1000" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Left Sidebar Menu */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-24 bg-white border-r border-gray-200 flex flex-col items-center py-8 gap-6 relative z-50"
          style={{
            boxShadow: `
              20px 0 40px rgba(163,177,198,0.3),
              -10px 0 20px rgba(255,255,255,0.9),
              inset -2px 0 4px rgba(163,177,198,0.1)
            `
          }}
        >
          {/* Logo */}
          <motion.div 
            className="mb-8"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center relative"
              style={{
                boxShadow: `
                  8px 8px 16px rgba(163,177,198,0.4),
                  -8px -8px 16px rgba(255,255,255,0.9),
                  inset 2px 2px 4px rgba(255,255,255,0.5)
                `
              }}
            >
              <img src="/assets/logo.png" alt="DGC" className="w-10 h-10" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-200/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>

          {/* Menu Items */}
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeMenu === item.id
            
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveMenu(item.id)}
                className={`relative w-14 h-14 rounded-xl flex items-center justify-center group transition-all duration-300 ${
                  isActive ? 'bg-gray-100' : 'bg-white'
                }`}
                style={{
                  boxShadow: isActive 
                    ? `
                        inset 6px 6px 12px rgba(163,177,198,0.3),
                        inset -6px -6px 12px rgba(255,255,255,0.9)
                      `
                    : `
                        6px 6px 12px rgba(163,177,198,0.3),
                        -6px -6px 12px rgba(255,255,255,0.9)
                      `
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className={`w-5 h-5 transition-all duration-300 ${
                  isActive 
                    ? 'text-gray-900' 
                    : 'text-gray-600 group-hover:text-gray-900'
                }`} />
                
                {/* Active Effect */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-200/50 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Tooltip */}
                <div className="absolute left-20 px-3 py-1.5 bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap text-xs font-medium text-gray-900 border border-gray-200"
                  style={{
                    boxShadow: '8px 8px 16px rgba(163,177,198,0.4), -8px -8px 16px rgba(255,255,255,0.9)'
                  }}
                >
                  {item.label}
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Top Bar */}
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="h-20 border-b border-gray-200 flex items-center justify-between px-8 bg-white/95"
            style={{
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(163,177,198,0.2)'
            }}
          >
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent font-nasalization">
                DAGChain PRESALE
              </h1>
              <p className="text-xs text-gray-600 mt-1">Private & Pre-Sale Dashboard</p>
            </div>

            {/* Connect Wallet Button / Account Info */}
            {!isConnected ? (
              <motion.button
                onClick={connectWallet}
                disabled={isConnecting}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold flex items-center gap-2 relative overflow-hidden group border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  boxShadow: `
                    8px 8px 16px rgba(163,177,198,0.4),
                    -8px -8px 16px rgba(255,255,255,0.9),
                    inset 0 1px 0 rgba(255,255,255,0.5)
                  `
                }}
              >
                <Wallet className="w-4 h-4 text-gray-700" />
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                
                {/* Hover Highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating Effect */}
                {!isConnecting && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        '0 4px 20px rgba(163,177,198,0.2)',
                        '0 8px 30px rgba(163,177,198,0.3)',
                        '0 4px 20px rgba(163,177,198,0.2)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ) : (
              <div className="relative">
                <motion.button
                  onClick={() => setShowWalletMenu(!showWalletMenu)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold flex items-center gap-3 border border-gray-200"
                  style={{
                    boxShadow: `
                      8px 8px 16px rgba(163,177,198,0.4),
                      -8px -8px 16px rgba(255,255,255,0.9)
                    `
                  }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-mono text-sm">{formatAddress(account!)}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${showWalletMenu ? 'rotate-90' : ''}`} />
                </motion.button>

                {/* Wallet Dropdown Menu */}
                <AnimatePresence>
                  {showWalletMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-gray-200 overflow-hidden z-50"
                      style={{
                        boxShadow: '12px 12px 24px rgba(163,177,198,0.4), -12px -12px 24px rgba(255,255,255,0.9)'
                      }}
                    >
                      {/* Account Info */}
                      <div className="p-4 border-b border-gray-200">
                        <p className="text-xs text-gray-600 mb-2">Connected Account</p>
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-sm text-gray-900">{formatAddress(account!)}</p>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(account!)
                              setCopiedAddress(true)
                              setTimeout(() => setCopiedAddress(false), 2000)
                            }}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            {copiedAddress ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-600" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Balance */}
                      <div className="p-4 border-b border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">Balance</p>
                        <p className="text-lg font-bold text-gray-900">{parseFloat(balance).toFixed(4)} ETH</p>
                      </div>

                      {/* Network */}
                      <div className="p-4 border-b border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">Network</p>
                        <p className="text-sm text-gray-900">
                          {chainId === 1 ? 'Ethereum Mainnet' : 
                           chainId === 11155111 ? 'Sepolia Testnet' :
                           chainId === 5 ? 'Goerli Testnet' :
                           `Chain ID: ${chainId}`}
                        </p>
                      </div>

                      {/* Disconnect Button */}
                      <button
                        onClick={() => {
                          disconnectWallet()
                          setShowWalletMenu(false)
                        }}
                        className="w-full p-4 flex items-center gap-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-semibold">Disconnect</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* Wallet Error Banner */}
          {walletError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-8 mt-4 p-4 bg-red-50 border border-red-200 rounded-xl"
            >
              <p className="text-red-700 text-sm font-medium">{walletError}</p>
            </motion.div>
          )}

          {/* Dashboard Content */}
          <div className="space-y-8">
            {activeMenu === 'home' && <HomeContent />}
            
            {activeMenu !== 'home' && (
              <div className="p-8">
            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative rounded-3xl bg-white p-8 overflow-hidden border border-gray-200"
              style={{
                boxShadow: `
                  20px 20px 40px rgba(163,177,198,0.3),
                  -20px -20px 40px rgba(255,255,255,0.9)
                `
              }}
            >
              {/* Ambient Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gray-100/50 rounded-full blur-[100px]" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-gray-700" />
                  <h2 className="text-xl font-bold text-gray-900 font-nasalization">SALE ENDS IN</h2>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hours', value: timeLeft.hours },
                    { label: 'Minutes', value: timeLeft.minutes },
                    { label: 'Seconds', value: timeLeft.seconds }
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="relative rounded-2xl bg-gray-50 p-6 text-center border border-gray-200"
                      style={{
                        boxShadow: `
                          inset 6px 6px 12px rgba(163,177,198,0.2),
                          inset -6px -6px 12px rgba(255,255,255,0.9)
                        `
                      }}
                    >
                      <div className="text-4xl font-bold bg-gradient-to-b from-gray-900 to-gray-600 bg-clip-text text-transparent font-nasalization mb-2">
                        {String(item.value).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-gray-600 uppercase tracking-wider">{item.label}</div>
                      
                      {/* Subtle Highlight */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-transparent opacity-50" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {saleStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="relative rounded-2xl bg-white p-6 overflow-hidden group cursor-pointer border border-gray-200"
                    style={{
                      boxShadow: `
                        12px 12px 24px rgba(163,177,198,0.3),
                        -12px -12px 24px rgba(255,255,255,0.9)
                      `
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: `
                        16px 16px 32px rgba(163,177,198,0.4),
                        -16px -16px 32px rgba(255,255,255,0.9)
                      `
                    }}
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 border border-gray-200"
                      style={{
                        boxShadow: `
                          inset 4px 4px 8px rgba(163,177,198,0.2),
                          inset -4px -4px 8px rgba(255,255,255,0.9)
                        `
                      }}
                    >
                      <Icon className="w-5 h-5 text-gray-700" />
                    </div>

                    {/* Content */}
                    <div className="text-xs text-gray-600 mb-2">{stat.label}</div>
                    <div className="text-2xl font-bold text-gray-900 mb-1 font-nasalization">{stat.value}</div>
                    <div className="text-xs text-gray-700 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100/0 to-gray-100/0 group-hover:from-gray-100/50 group-hover:to-transparent transition-all duration-300 rounded-2xl" />
                  </motion.div>
                )
              })}
            </div>

            {/* Token Purchase Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="relative rounded-3xl bg-white p-8 overflow-hidden border border-gray-200"
              style={{
                boxShadow: `
                  20px 20px 40px rgba(163,177,198,0.3),
                  -20px -20px 40px rgba(255,255,255,0.9)
                `
              }}
            >
              {/* Ambient Effects */}
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-100/50 rounded-full blur-[120px]" />
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-nasalization flex items-center gap-3">
                  <Shield className="w-6 h-6 text-gray-700" />
                  PURCHASE TOKENS
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Input Section */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-600 mb-2 block">Amount (USD)</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="0.00"
                          className="w-full px-4 py-4 rounded-xl bg-gray-50 text-gray-900 text-lg font-semibold focus:outline-none border border-gray-200"
                          style={{
                            boxShadow: `
                              inset 6px 6px 12px rgba(163,177,198,0.2),
                              inset -6px -6px 12px rgba(255,255,255,0.9)
                            `
                          }}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm">USD</div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-600 mb-2 block">You Receive</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="0.00"
                          readOnly
                          className="w-full px-4 py-4 rounded-xl bg-gray-50 text-gray-900 text-lg font-semibold border border-gray-200"
                          style={{
                            boxShadow: `
                              inset 6px 6px 12px rgba(163,177,198,0.2),
                              inset -6px -6px 12px rgba(255,255,255,0.9)
                            `
                          }}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm">DGC</div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold flex items-center justify-center gap-2 relative overflow-hidden group"
                      style={{
                        boxShadow: `
                          8px 8px 16px rgba(163,177,198,0.4),
                          -8px -8px 16px rgba(255,255,255,0.9)
                        `
                      }}
                    >
                      <span>BUY NOW</span>
                      <ChevronRight className="w-5 h-5" />
                      
                      {/* Animated Shine */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                    </motion.button>
                  </div>

                  {/* Info Section */}
                  <div className="space-y-4">
                    <div className="rounded-xl bg-gray-50 p-4 border border-gray-200"
                      style={{
                        boxShadow: `
                          inset 6px 6px 12px rgba(163,177,198,0.2),
                          inset -6px -6px 12px rgba(255,255,255,0.9)
                        `
                      }}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-600">Current Price</span>
                        <span className="text-lg font-bold text-gray-900">$0.25</span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-600">Next Price</span>
                        <span className="text-lg font-bold text-gray-900">$0.30</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Min Purchase</span>
                        <span className="text-lg font-bold text-gray-900">$100</span>
                      </div>
                    </div>

                    <div className="rounded-xl bg-gray-100 p-4 border border-gray-300">
                      <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-semibold text-gray-900 mb-1">Early Bird Bonus</div>
                          <div className="text-xs text-gray-600">Get 15% extra tokens during Phase 1</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gray-400/20 rounded-full"
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
      
      {/* Web3Onboard Modal Container */}
      <div id="web3-onboard-modal-container" />
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
