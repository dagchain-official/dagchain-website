"use client"

import React, { useState, useEffect, useMemo } from "react"
import dynamic from "next/dynamic"
import { m } from "framer-motion"
import { 
  Home as HomeIcon, Trophy, Users, Wallet, User, Scale, LogOut, ChevronRight, Shield, Zap, Lock, Gift, Star, TrendingUp, AlertCircle, Clock, CheckCircle 
} from "lucide-react"

const CountdownCard = ({ targetDate, label, icon: Icon, color }: any) => {
  const [timeLeft, setTimeLeft] = useState({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference <= 0) return;
      
      setTimeLeft({
        months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44)),
        days: Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={`bg-white shadow-xl p-6 rounded-2xl bg-gradient-to-br ${color} border border-opacity-20`}>
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg">
          <Icon className="w-6 h-6 text-gray-800" />
        </div>
      </div>
      <h3 className="text-xs sm:text-sm text-gray-500 mb-2 font-semibold">{label}</h3>
      <div className="flex justify-center items-center space-x-1 sm:space-x-2">
        <span className="text-lg font-bold text-gray-800">{timeLeft.months}M {timeLeft.days}D {timeLeft.hours}H</span>
        <span className="text-xs font-semibold text-blue-600">{timeLeft.minutes}m {timeLeft.seconds}s</span>
      </div>
    </div>
  );
};

// Dynamic Imports for heavy libraries
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });

import { useWallet } from "./hooks/useWallet"
import { ClientOnlyWeb3Provider } from "./components/ClientOnlyWeb3Provider"
import { Leaderboard } from "./components/Leaderboard"

const COSMIC_LEVELS = [
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
];

const REFERRAL_DATA = [
  { month: 'Jan', referrals: 45 }, { month: 'Feb', referrals: 78 }, { month: 'Mar', referrals: 125 },
  { month: 'Apr', referrals: 189 }, { month: 'May', referrals: 267 }, { month: 'Jun', referrals: 356 },
  { month: 'Jul', referrals: 445 }, { month: 'Aug', referrals: 578 }, { month: 'Sep', referrals: 689 },
  { month: 'Oct', referrals: 834 }, { month: 'Nov', referrals: 1056 }, { month: 'Dec', referrals: 1247 }
];

function PresaleContent() {
  const [activeSection, setActiveSection] = useState('Home')
  const [saleTrack, setSaleTrack] = useState('pre')
  const [amount, setAmount] = useState('')
  const [estimatedTokens, setEstimatedTokens] = useState('0')
  const [userXP] = useState(1250) // Logic: preserved state

  const { account, isConnecting, error: walletError, connectWallet, disconnectWallet, formatAddress } = useWallet()

  // Optimization: Memoize Level Logic (Zero Inference Rule)
  const levelData = useMemo(() => {
    const currentLevel = [...COSMIC_LEVELS].reverse().find(l => userXP >= l.requiredXP) || COSMIC_LEVELS[0];
    const currentIndex = COSMIC_LEVELS.findIndex(l => l.id === currentLevel.id);
    const nextLevel = currentIndex < COSMIC_LEVELS.length - 1 ? COSMIC_LEVELS[currentIndex + 1] : null;
    
    let progress = 100;
    if (nextLevel) {
      progress = Math.min(((userXP - currentLevel.requiredXP) / (nextLevel.requiredXP - currentLevel.requiredXP)) * 100, 100);
    }

    return { currentLevel, nextLevel, progress };
  }, [userXP]);

  // Pricing Logic (Preserved)
  const currentSale = useMemo(() => {
    const prices = [0.55, 0.60, 0.65, 0.70];
    return {
      private: { price: 0.40, phase: 1, raised: 1200000, participants: 847, remaining: 300000 },
      pre: { price: prices[0], phase: 1, totalPhases: 4, raised: 1200000, participants: 400, remaining: 800000 }
    }[saleTrack as 'private' | 'pre'];
  }, [saleTrack]);

  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      setEstimatedTokens((parseFloat(value) / currentSale.price).toFixed(2));
    } else {
      setEstimatedTokens('0');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 flex flex-col lg:flex-row">
      {/* Sidebar - Memoized logic ensures no re-renders from timer */}
      <aside className="hidden lg:flex w-64 bg-white shadow-2xl p-6 flex-col m-4 rounded-3xl border-r-4 border-gray-200">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center"><span className="text-white text-xl font-bold">D</span></div>
          <h1 className="ml-3 text-xl font-bold text-gray-900">DAGChain</h1>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {[
              { icon: HomeIcon, label: 'Home', id: 'Home' },
              { icon: Trophy, label: 'Leaderboard', id: 'Leaderboard' },
              { icon: Users, label: 'Referrals', id: 'Referral' },
              { icon: Wallet, label: 'Purchase', id: 'Purchase' },
              { icon: Scale, label: 'Rules', id: 'Rules' }
            ].map((item) => (
              <button 
                key={item.id}
                aria-label={`Maps to ${item.label}`}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center p-3 rounded-lg w-full transition-all ${activeSection === item.id ? 'bg-blue-100 text-purple-800 shadow-inner' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <item.icon className="mr-3 w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </ul>
        </nav>
        <button onClick={account ? disconnectWallet : connectWallet} className="mt-auto p-3 bg-gray-900 text-white rounded-xl text-sm font-bold">
          {account ? 'Disconnect' : 'Connect Wallet'}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        {activeSection === 'Home' && (
          <div className="space-y-8">
            {/* Level Progress */}
            <div className="bg-white shadow-xl p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${levelData.currentLevel.color} flex items-center justify-center text-2xl shadow-lg`}>{levelData.currentLevel.icon}</div>
                  <div><h3 className="font-bold">{levelData.currentLevel.name}</h3><p className="text-sm text-gray-600">{levelData.currentLevel.description}</p></div>
                </div>
                {levelData.nextLevel && <p className="text-xs text-gray-500">Next: {levelData.nextLevel.name}</p>}
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <m.div className={`h-full bg-gradient-to-r ${levelData.currentLevel.color}`} initial={{ width: 0 }} animate={{ width: `${levelData.progress}%` }} />
              </div>
            </div>

            {/* Optimized Countdown Section (Only these cards re-render) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100">
                <Users className="w-6 h-6 mb-2 text-blue-500" />
                <p className="text-xs text-gray-500">Ecosystem Users</p>
                <p className="text-2xl font-bold">127,543</p>
              </div>
              <CountdownCard label="Airdrop Delivery" targetDate="2026-03-15" icon={Clock} color="from-purple-50 to-pink-50" />
              <CountdownCard label="TestNet Launch" targetDate="2026-08-31" icon={Zap} color="from-orange-50 to-red-50" />
            </div>

            {/* Charts - Dynamic Load avoids First Load JS bloat */}
            
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 h-64">
              <h2 className="text-lg font-bold mb-4">Referral Growth</h2>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={REFERRAL_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="referrals" stroke="#4f46e5" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeSection === 'Purchase' && (
          <div className="max-w-4xl mx-auto space-y-6">
             <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Purchase Tokens</h2>
                <div className="space-y-4">
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => handleAmountChange(e.target.value)} 
                    placeholder="Enter Amount"
                    className="w-full p-4 bg-gray-50 rounded-xl border focus:ring-2 ring-purple-500 outline-none font-bold"
                  />
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <p className="text-sm text-purple-600">You Receive: <span className="font-bold text-lg">{estimatedTokens} DGC</span></p>
                  </div>
                  <button className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors">BUY NOW</button>
                </div>
             </div>
          </div>
        )}

        {activeSection === 'Leaderboard' && <Leaderboard />}
      </main>
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