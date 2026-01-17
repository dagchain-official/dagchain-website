"use client"

import { m, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: () => void
}

export function WalletModal({ isOpen, onClose, onConnect }: WalletModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        {/* Backdrop */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <m.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl p-8 max-w-md w-full mx-4 border border-gray-200"
          style={{
            boxShadow: '20px 20px 60px rgba(163,177,198,0.4), -20px -20px 60px rgba(255,255,255,0.9)'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-nasalization">
            CONNECT WALLET
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Choose how you want to connect
          </p>

          {/* Wallet Options */}
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {/* Browser Wallet (Injected) */}
            <button
              onClick={() => {
                onConnect()
                onClose()
              }}
              className="w-full p-4 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-all flex items-center gap-4 group"
              style={{
                boxShadow: '8px 8px 16px rgba(163,177,198,0.3), -8px -8px 16px rgba(255,255,255,0.9)'
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-200">
                <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
                  <path d="M10 14L20 4L30 14L20 24L10 14Z" fill="#F6851B"/>
                  <path d="M10 26L20 16L30 26L20 36L10 26Z" fill="#E2761B"/>
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-900">Browser Wallet</div>
                <div className="text-xs text-gray-600">MetaMask, Trust Wallet, Brave, etc.</div>
              </div>
              <div className="text-gray-400 group-hover:text-gray-600 transition-colors">→</div>
            </button>

            {/* Info Message */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-xs text-blue-800">
                💡 <strong>Tip:</strong> Make sure you have a Web3 wallet extension installed (like MetaMask, Trust Wallet, or Coinbase Wallet) in your browser.
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-500 text-center mt-6">
            By connecting, you agree to our Terms of Service
          </p>
        </m.div>
      </div>
    </AnimatePresence>
  )
}
