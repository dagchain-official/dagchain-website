"use client"

import React, { useState } from 'react'
import { m } from 'framer-motion'
import { Trophy, TrendingUp, Award } from 'lucide-react'

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState('daily')

  const dailyLeaderboard = [
    { rank: 1, name: 'CryptoKing', points: 15420, change: '+2', avatar: '👑', level: 'Cosmic Master' },
    { rank: 2, name: 'StarTrader', points: 14850, change: '-1', avatar: '⭐', level: 'Star Explorer' },
    { rank: 3, name: 'MoonWalker', points: 14200, change: '+1', avatar: '🌙', level: 'Galaxy Ranger' },
    { rank: 4, name: 'DiamondHands', points: 13750, change: '0', avatar: '💎', level: 'Nebula Scout' },
    { rank: 5, name: 'RocketFuel', points: 13200, change: '+3', avatar: '🚀', level: 'Asteroid Miner' },
    { rank: 6, name: 'CosmicVibe', points: 12800, change: '-2', avatar: '🌌', level: 'Comet Chaser' },
    { rank: 7, name: 'StellarPro', points: 12400, change: '+1', avatar: '✨', level: 'Planet Walker' },
    { rank: 8, name: 'GalaxyMaster', points: 12000, change: '-1', avatar: '🌟', level: 'Moon Jumper' },
    { rank: 9, name: 'NebulaForce', points: 11600, change: '+2', avatar: '🌠', level: 'Space Cadet' },
    { rank: 10, name: 'AstroNinja', points: 11200, change: '0', avatar: '🥷', level: 'Rocket Pilot' },
  ]

  const weeklyLeaderboard = [
    { rank: 1, name: 'StarTrader', points: 89420, change: '+1', avatar: '⭐', level: 'Cosmic Master' },
    { rank: 2, name: 'CryptoKing', points: 87650, change: '-1', avatar: '👑', level: 'Star Explorer' },
    { rank: 3, name: 'DiamondHands', points: 85200, change: '+2', avatar: '💎', level: 'Galaxy Ranger' },
    { rank: 4, name: 'MoonWalker', points: 83750, change: '-1', avatar: '🌙', level: 'Nebula Scout' },
    { rank: 5, name: 'CosmicVibe', points: 82100, change: '+1', avatar: '🌌', level: 'Asteroid Miner' },
    { rank: 6, name: 'RocketFuel', points: 80800, change: '-2', avatar: '🚀', level: 'Comet Chaser' },
    { rank: 7, name: 'GalaxyMaster', points: 79400, change: '+3', avatar: '🌟', level: 'Planet Walker' },
    { rank: 8, name: 'StellarPro', points: 78000, change: '0', avatar: '✨', level: 'Moon Jumper' },
    { rank: 9, name: 'AstroNinja', points: 76600, change: '+1', avatar: '🥷', level: 'Space Cadet' },
    { rank: 10, name: 'NebulaForce', points: 75200, change: '-1', avatar: '🌠', level: 'Rocket Pilot' },
  ]

  const monthlyLeaderboard = [
    { rank: 1, name: 'DiamondHands', points: 342850, change: '+3', avatar: '💎', level: 'Cosmic Master' },
    { rank: 2, name: 'CryptoKing', points: 338420, change: '-1', avatar: '👑', level: 'Star Explorer' },
    { rank: 3, name: 'StarTrader', points: 335200, change: '-1', avatar: '⭐', level: 'Galaxy Ranger' },
    { rank: 4, name: 'CosmicVibe', points: 331750, change: '+2', avatar: '🌌', level: 'Nebula Scout' },
    { rank: 5, name: 'GalaxyMaster', points: 328100, change: '+1', avatar: '🌟', level: 'Asteroid Miner' },
    { rank: 6, name: 'MoonWalker', points: 324800, change: '-3', avatar: '🌙', level: 'Comet Chaser' },
    { rank: 7, name: 'RocketFuel', points: 321400, change: '+1', avatar: '🚀', level: 'Planet Walker' },
    { rank: 8, name: 'StellarPro', points: 318000, change: '-1', avatar: '✨', level: 'Moon Jumper' },
    { rank: 9, name: 'AstroNinja', points: 314600, change: '+2', avatar: '🥷', level: 'Space Cadet' },
    { rank: 10, name: 'NebulaForce', points: 311200, change: '0', avatar: '🌠', level: 'Rocket Pilot' },
  ]

  const getCurrentLeaderboard = () => {
    switch (activeTab) {
      case 'weekly': return weeklyLeaderboard
      case 'monthly': return monthlyLeaderboard
      default: return dailyLeaderboard
    }
  }

  return (
    <div className="space-y-6">
      {/* Leaderboard Header */}
      <m.div 
        className="bg-white shadow-xl p-6 rounded-2xl border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
              <Trophy className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Leaderboard</h2>
              <p className="text-gray-600">Compete with the community and climb the ranks!</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Your Rank</div>
            <div className="text-2xl font-bold text-purple-600">#47</div>
          </div>
        </div>

        {/* Time Period Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
          {['daily', 'weekly', 'monthly'].map((period) => (
            <button
              key={period}
              onClick={() => setActiveTab(period)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === period
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>

        {/* Leaderboard Table */}
        <div className="space-y-3">
          {getCurrentLeaderboard().map((user, index) => (
            <m.div
              key={user.rank}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  user.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                  user.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-white' :
                  user.rank === 3 ? 'bg-gradient-to-r from-orange-300 to-orange-500 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {user.rank <= 3 ? (user.rank === 1 ? '🏆' : user.rank === 2 ? '🥈' : '🥉') : user.rank}
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">{user.avatar}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{user.name}</h4>
                  <p className="text-xs text-gray-500">{user.level}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-purple-600">{user.points.toLocaleString()}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  user.change.startsWith('+') ? 'bg-green-100 text-green-600' :
                  user.change.startsWith('-') ? 'bg-red-100 text-red-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {user.change}
                </span>
              </div>
            </m.div>
          ))}
        </div>
      </m.div>

      {/* Leaderboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <m.div 
          className="bg-white shadow-xl p-6 rounded-2xl text-center border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <TrendingUp className="text-white text-xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Participants</h3>
          <p className="text-3xl font-bold text-blue-600">2,847</p>
          <p className="text-sm text-gray-600 mt-1">Active users</p>
        </m.div>

        <m.div 
          className="bg-white shadow-xl p-6 rounded-2xl text-center border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Trophy className="text-white text-xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Best Rank</h3>
          <p className="text-3xl font-bold text-green-600">#23</p>
          <p className="text-sm text-gray-600 mt-1">All time high</p>
        </m.div>

        <m.div 
          className="bg-white shadow-xl p-6 rounded-2xl text-center border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Award className="text-white text-xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Achievements</h3>
          <p className="text-3xl font-bold text-yellow-600">7</p>
          <p className="text-sm text-gray-600 mt-1">Badges earned</p>
        </m.div>
      </div>
    </div>
  )
}
