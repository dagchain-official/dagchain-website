"use client"

import React, { useState, useEffect } from "react"
import { m, AnimatePresence } from "framer-motion"
import { Cookie, X, Check, Settings } from "lucide-react"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: true,
    marketing: true,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("cookie-consent", JSON.stringify(consent))
    setShowBanner(false)
  }

  const handleRejectAll = () => {
    const consent = {
      necessary: true, // Necessary cookies cannot be rejected
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("cookie-consent", JSON.stringify(consent))
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("cookie-consent", JSON.stringify(consent))
    setShowBanner(false)
    setShowSettings(false)
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl shadow-[20px_20px_60px_rgba(163,177,198,0.5),-20px_-20px_60px_rgba(255,255,255,0.9)] border border-gray-200 p-6 md:p-8">
              {!showSettings ? (
                <>
                  {/* Main Banner */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center shadow-[inset_8px_8px_16px_rgba(163,177,198,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.8)] border border-gray-200">
                        <Cookie className="w-6 h-6 text-gray-700" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 font-nasalization">
                        We Value Your Privacy
                      </h3>
                      <p className="text-sm text-gray-600 font-inter leading-relaxed">
                        We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                        By clicking "Accept All", you consent to our use of cookies. You can customize your preferences or reject non-essential cookies.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <button
                        onClick={() => setShowSettings(true)}
                        className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-all shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] border border-gray-200 font-inter flex items-center justify-center gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        Customize
                      </button>
                      <button
                        onClick={handleRejectAll}
                        className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-all shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] border border-gray-200 font-inter flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Reject All
                      </button>
                      <button
                        onClick={handleAcceptAll}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold text-sm hover:from-gray-800 hover:to-black transition-all shadow-[12px_12px_24px_rgba(0,0,0,0.3),-12px_-12px_24px_rgba(255,255,255,0.1)] border border-gray-800 font-inter flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Accept All
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Settings Panel */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900 font-nasalization">
                        Cookie Preferences
                      </h3>
                      <button
                        onClick={() => setShowSettings(false)}
                        className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all shadow-[4px_4px_8px_rgba(163,177,198,0.3),-4px_-4px_8px_rgba(255,255,255,0.9)] border border-gray-200"
                      >
                        <X className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>

                    {/* Necessary Cookies */}
                    <div className="p-4 rounded-2xl bg-gray-50 shadow-[inset_8px_8px_16px_rgba(163,177,198,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.8)] border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 font-inter">Necessary Cookies</h4>
                        <div className="px-3 py-1 rounded-full bg-gray-200 text-gray-600 text-xs font-semibold">
                          Always Active
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 font-inter">
                        Essential for the website to function properly. Cannot be disabled.
                      </p>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="p-4 rounded-2xl bg-white shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 font-inter">Analytics Cookies</h4>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences.analytics}
                            onChange={(e) =>
                              setPreferences({ ...preferences, analytics: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-700"></div>
                        </label>
                      </div>
                      <p className="text-xs text-gray-600 font-inter">
                        Help us understand how visitors interact with our website.
                      </p>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="p-4 rounded-2xl bg-white shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 font-inter">Marketing Cookies</h4>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences.marketing}
                            onChange={(e) =>
                              setPreferences({ ...preferences, marketing: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-700"></div>
                        </label>
                      </div>
                      <p className="text-xs text-gray-600 font-inter">
                        Used to deliver personalized advertisements relevant to you.
                      </p>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => setShowSettings(false)}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-all shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200 font-inter"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSavePreferences}
                        className="flex-1 px-6 py-2.5 rounded-xl bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold text-sm hover:from-gray-800 hover:to-black transition-all shadow-[12px_12px_24px_rgba(0,0,0,0.3)] border border-gray-800 font-inter"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
