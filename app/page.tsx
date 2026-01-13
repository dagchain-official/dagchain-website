"use client";

import { useState, useEffect } from "react";
import { AppWrapper } from "@/components/app-wrapper";
import { Navbar } from "@/components/navbar";
import { NewsTicker } from "@/components/news-ticker";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { LogoLoopSection } from "@/components/logo-loop";
import { Technology } from "@/components/technology";
import { DagArmy } from "@/components/dag-army";
import { Roadmap } from "@/components/roadmap";
import { Tokenomics } from "@/components/tokenomics";
import { Ecosystem } from "@/components/ecosystem";
import { Developers } from "@/components/developers";
// import { Team } from "@/components/team"
import { Community } from "@/components/community";
import { RevolutionCTA } from "@/components/revolution-cta";
import { BookMeeting } from "@/components/book-meeting";
import { Footer } from "@/components/footer";
import { WaitlistModal } from "@/components/waitlist-modal";
import { useVisitorTracking } from "@/lib/useVisitorTracking";

export default function Home() {
  const [showWaitlist, setShowWaitlist] = useState(false);

  // Track visitor silently
  useVisitorTracking();

  useEffect(() => {
    // Check if user has already seen the waitlist modal
    const hasSeenWaitlist = localStorage.getItem("hasSeenWaitlist");

    if (!hasSeenWaitlist) {
      // Show modal after 2 seconds on first visit
      const timer = setTimeout(() => {
        setShowWaitlist(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseWaitlist = () => {
    setShowWaitlist(false);
    // Mark as seen so it doesn't show again
    localStorage.setItem("hasSeenWaitlist", "true");
  };

  return (
    <AppWrapper>
      <main className="relative">
        <Navbar />
        <Hero />
        <About />
        <LogoLoopSection />
        <Technology />
        <Roadmap />
        <Tokenomics />
        <Ecosystem />
        {/* <Developers /> */}
        {/* <Team /> */}
        <Community />
        <DagArmy />
        <RevolutionCTA />
        <BookMeeting />
        <Footer />
      </main>

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={showWaitlist} onClose={handleCloseWaitlist} />
    </AppWrapper>
  );
}
