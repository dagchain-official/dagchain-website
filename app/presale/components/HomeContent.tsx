"use client"

import React, { useState } from "react"
import { m } from "framer-motion"
import { 
  TrendingUp, 
  Clock, 
  Shield, 
  Zap, 
  Users,
  ChevronRight,
  Lock,
  Gift,
  CheckCircle,
  AlertCircle
} from "lucide-react"

export function HomeContent() {
  const [saleTrack, setSaleTrack] = useState<'private' | 'pre'>('pre')
  const [paymentMethod, setPaymentMethod] = useState<'eth' | 'usdt'>('eth')
  const [amount, setAmount] = useState('')
  const [estimatedTokens, setEstimatedTokens] = useState('0')
  const [currentPhase, setCurrentPhase] = useState(1)

  // Calculate sale end date and phases
  const saleEndDate = new Date('2026-08-31T23:59:59')
  const now = new Date()
  const totalDuration = saleEndDate.getTime() - now.getTime()
  const phaseDuration = totalDuration / 4 // Divide into 4 equal phases for Pre-Sale

  // Pre-Sale phase prices
  const preSalePrices = [0.55, 0.60, 0.65, 0.70]
  
  // Calculate current phase based on time
  const getPreSalePhase = () => {
    const elapsed = now.getTime() - now.getTime() // In real implementation, use actual start date
    const phase = Math.floor(elapsed / phaseDuration) + 1
    return Math.min(phase, 4)
  }

  // Mock data - will be replaced with real Web3 data
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
      price: preSalePrices[currentPhase - 1],
      phase: currentPhase,
      totalPhases: 4,
      raised: 1200000,
      participants: 400,
      remaining: 800000
    }
  }

  const currentSale = saleData[saleTrack]

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
    <div className="p-8 space-y-8">
      {/* Sale Track Selector */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4 font-nasalization">SELECT SALE TRACK</h2>
        <div className="grid grid-cols-2 gap-4">
          <m.button
            onClick={() => setSaleTrack('private')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 rounded-2xl transition-all duration-300 border border-gray-200 ${
              saleTrack === 'private' 
                ? 'bg-gray-100' 
                : 'bg-white'
            }`}
            style={{
              boxShadow: saleTrack === 'private'
                ? 'inset 8px 8px 16px rgba(163,177,198,0.3), inset -8px -8px 16px rgba(255,255,255,0.9)'
                : '8px 8px 16px rgba(163,177,198,0.3), -8px -8px 16px rgba(255,255,255,0.9)'
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600 font-semibold">PRIVATE SALE</span>
              {saleTrack === 'private' && <CheckCircle className="w-5 h-5 text-gray-900" />}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2 font-nasalization">
              ${saleData.private.price.toFixed(2)}
            </div>
            <div className="text-xs text-gray-600">per DGC token • Phase 1/1</div>
          </m.button>

          <m.button
            onClick={() => setSaleTrack('pre')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 rounded-2xl transition-all duration-300 border border-gray-200 ${
              saleTrack === 'pre' 
                ? 'bg-gray-100' 
                : 'bg-white'
            }`}
            style={{
              boxShadow: saleTrack === 'pre'
                ? 'inset 8px 8px 16px rgba(163,177,198,0.3), inset -8px -8px 16px rgba(255,255,255,0.9)'
                : '8px 8px 16px rgba(163,177,198,0.3), -8px -8px 16px rgba(255,255,255,0.9)'
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600 font-semibold">PRE-SALE</span>
              {saleTrack === 'pre' && <CheckCircle className="w-5 h-5 text-gray-900" />}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2 font-nasalization">
              ${saleData.pre.price.toFixed(2)}
            </div>
            <div className="text-xs text-gray-600">per DGC token • Phase {currentPhase}/4</div>
          </m.button>
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
      </m.div>

      {/* Stats Grid */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { label: 'Total Raised', value: `$${(currentSale.raised / 1000).toFixed(1)}K`, icon: TrendingUp },
          { label: 'Participants', value: currentSale.participants.toString(), icon: Users },
          { label: 'Remaining', value: `$${(currentSale.remaining / 1000).toFixed(0)}K`, icon: Clock }
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white p-6 rounded-2xl border border-gray-200"
              style={{
                boxShadow: '12px 12px 24px rgba(163,177,198,0.3), -12px -12px 24px rgba(255,255,255,0.9)'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-200"
                  style={{
                    boxShadow: 'inset 4px 4px 8px rgba(163,177,198,0.2), inset -4px -4px 8px rgba(255,255,255,0.9)'
                  }}
                >
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 font-nasalization">{stat.value}</div>
            </div>
          )
        })}
      </m.div>

      {/* Purchase Form */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-8 rounded-3xl border border-gray-200"
        style={{
          boxShadow: '20px 20px 40px rgba(163,177,198,0.3), -20px -20px 40px rgba(255,255,255,0.9)'
        }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-nasalization flex items-center gap-3">
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
                paymentMethod === 'eth' ? 'bg-gray-100' : 'bg-white'
              }`}
              style={{
                boxShadow: paymentMethod === 'eth'
                  ? 'inset 6px 6px 12px rgba(163,177,198,0.3), inset -6px -6px 12px rgba(255,255,255,0.9)'
                  : '6px 6px 12px rgba(163,177,198,0.3), -6px -6px 12px rgba(255,255,255,0.9)'
              }}
            >
              <span className="text-gray-900">Buy with ETH</span>
            </button>
            <button
              onClick={() => setPaymentMethod('usdt')}
              className={`py-3 rounded-xl font-semibold transition-all duration-300 border border-gray-200 ${
                paymentMethod === 'usdt' ? 'bg-gray-100' : 'bg-white'
              }`}
              style={{
                boxShadow: paymentMethod === 'usdt'
                  ? 'inset 6px 6px 12px rgba(163,177,198,0.3), inset -6px -6px 12px rgba(255,255,255,0.9)'
                  : '6px 6px 12px rgba(163,177,198,0.3), -6px -6px 12px rgba(255,255,255,0.9)'
              }}
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
              className="w-full px-6 py-4 rounded-xl bg-gray-50 text-gray-900 text-lg font-semibold focus:outline-none border border-gray-200"
              style={{
                boxShadow: 'inset 6px 6px 12px rgba(163,177,198,0.2), inset -6px -6px 12px rgba(255,255,255,0.9)'
              }}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 text-sm font-semibold">
              {paymentMethod === 'eth' ? 'ETH' : 'USDT'}
            </div>
          </div>
        </div>

        {/* Estimated Tokens */}
        {amount && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200"
            style={{
              boxShadow: 'inset 4px 4px 8px rgba(163,177,198,0.2), inset -4px -4px 8px rgba(255,255,255,0.9)'
            }}
          >
            <p className="text-sm text-gray-600 mb-1">You will receive approximately:</p>
            <p className="text-3xl font-bold text-gray-900 font-nasalization">{estimatedTokens} DGC</p>
            <p className="text-xs text-gray-600 mt-2">
              Token Price: ${currentSale.price.toFixed(2)} per DGC
            </p>
          </div>
        )}

        {/* Buy Button */}
        <m.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold flex items-center justify-center gap-2 relative overflow-hidden group"
          style={{
            boxShadow: '8px 8px 16px rgba(163,177,198,0.4), -8px -8px 16px rgba(255,255,255,0.9)'
          }}
        >
          <span>BUY NOW</span>
          <ChevronRight className="w-5 h-5" />
          
          {/* Animated Shine */}
          <m.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        </m.button>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200"
            style={{
              boxShadow: 'inset 4px 4px 8px rgba(163,177,198,0.2), inset -4px -4px 8px rgba(255,255,255,0.9)'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-gray-700" />
              <span className="text-xs text-gray-600 font-semibold">Vesting Schedule</span>
            </div>
            <p className="text-xs text-gray-600">
              10% TGE, remaining linear over 24-36 months
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200"
            style={{
              boxShadow: 'inset 4px 4px 8px rgba(163,177,198,0.2), inset -4px -4px 8px rgba(255,255,255,0.9)'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-4 h-4 text-gray-700" />
              <span className="text-xs text-gray-600 font-semibold">Early Bird Bonus</span>
            </div>
            <p className="text-xs text-gray-600">
              Get 15% extra tokens during Phase 1
            </p>
          </div>
        </div>
      </m.div>

      {/* Features */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-3 gap-6"
      >
        {[
          { icon: Shield, title: 'Secure', desc: 'Audited smart contracts with multi-layer security' },
          { icon: Zap, title: 'Fast', desc: 'Lightning-fast transactions on Ethereum network' },
          { icon: Lock, title: 'Vesting', desc: 'Fair token distribution with transparent schedule' }
        ].map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-2xl text-center border border-gray-200"
              style={{
                boxShadow: '12px 12px 24px rgba(163,177,198,0.3), -12px -12px 24px rgba(255,255,255,0.9)'
              }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-50 mx-auto mb-4 flex items-center justify-center border border-gray-200"
                style={{
                  boxShadow: 'inset 6px 6px 12px rgba(163,177,198,0.2), inset -6px -6px 12px rgba(255,255,255,0.9)'
                }}
              >
                <Icon className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-nasalization">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          )
        })}
      </m.div>
    </div>
  )
}
