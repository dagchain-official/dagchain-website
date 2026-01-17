"use client"

import React from "react"
import { LazyMotion, domMax } from "framer-motion";
// import { WelcomeScreen } from "./welcome-screen"

interface AppWrapperProps {
  children: React.ReactNode
}

export function AppWrapper({ children }: AppWrapperProps) {
  // WELCOME SCREEN DISABLED - Uncomment below to re-enable
  // const [showWelcome, setShowWelcome] = useState(true)
  // const [showMainSite, setShowMainSite] = useState(false)

  // // Temporarily disable localStorage check to always show welcome
  // useEffect(() => {
  //   console.log('AppWrapper mounted, showWelcome:', showWelcome)
  //   // Clear localStorage to always show welcome for testing
  //   localStorage.removeItem('DAGChain-welcome-seen')
  //   // const hasSeenWelcome = localStorage.getItem('DAGChain-welcome-seen')
  //   // if (hasSeenWelcome === 'true') {
  //   //   setShowWelcome(false)
  //   //   setShowMainSite(true)
  //   // }
  // }, [])

  // const handleWelcomeComplete = () => {
  //   setShowWelcome(false)
  //   // Small delay before showing main site for smooth transition
  //   setTimeout(() => {
  //     setShowMainSite(true)
  //     // Remember that user has seen welcome screen
  //     localStorage.setItem('DAGChain-welcome-seen', 'true')
  //   }, 200)
  // }

  return (
    <>
      {/* WELCOME SCREEN DISABLED - Uncomment below to re-enable */}
      {/* <AnimatePresence>
        {showWelcome && (
          <WelcomeScreen onComplete={handleWelcomeComplete} />
        )}
      </AnimatePresence> */}

      {/* Main Website - Now shows directly without welcome screen */}
      <LazyMotion features={domMax}>
        {children}
      </LazyMotion>
      
      {/* ORIGINAL CODE WITH ANIMATION - Uncomment to restore fade-in effect */}
      {/* <AnimatePresence>
        {showMainSite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  )
}
