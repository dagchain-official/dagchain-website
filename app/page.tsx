"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AppWrapper } from "@/components/app-wrapper";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { useVisitorTracking } from "@/lib/useVisitorTracking";

// Below-the-fold components are loaded dynamically
const About = dynamic(() => import('@/components/about').then(mod => ({ ssr: false, loading: () => null, default: mod.About })));
const Technology = dynamic(() => import('@/components/technology').then(mod => ({ ssr: false, loading: () => null, default: mod.Technology })));
const LogoLoopSection = dynamic(() => import("@/components/logo-loop").then(mod => ({ ssr: false, loading: () => null, default: mod.LogoLoopSection })));
const Roadmap = dynamic(() => import('@/components/roadmap').then(mod => ({ ssr: false, loading: () => null, default: mod.Roadmap })));
const Tokenomics = dynamic(() => import('@/components/tokenomics').then(mod => ({ ssr: false, loading: () => null, default: mod.Tokenomics })));
const Community = dynamic(() => import('@/components/community').then(mod => ({ ssr: false, loading: () => null, default: mod.Community })));
const Footer = dynamic(() => import('@/components/footer').then(mod => ({ ssr: false, loading: () => null, default: mod.Footer })));
const Ecosystem = dynamic(() => import("@/components/ecosystem").then(mod => ({ ssr: false, default: mod.Ecosystem })));
const DagArmy = dynamic(() => import("@/components/dag-army").then(mod => ({ ssr: false, loading: () => null, default: mod.DagArmy })));
const RevolutionCTA = dynamic(() => import("@/components/revolution-cta").then(mod => ({ ssr: false, loading: () => null, default: mod.RevolutionCTA })));
const BookMeeting = dynamic(() => import("@/components/book-meeting").then(mod => ({ ssr: false, loading: () => null, default: mod.BookMeeting })));

// Modals should always be dynamic (0kb on initial load)
const WaitlistModal = dynamic(() => import('@/components/waitlist-modal').then(mod => ({ ssr: false, loading: () => null, default: mod.WaitlistModal })));

export default function Home() {
  const [showWaitlist, setShowWaitlist] = useState(false);

  // Silent tracking
  useVisitorTracking();

  useEffect(() => {
    const hasSeenWaitlist = localStorage.getItem("hasSeenWaitlist");
    if (!hasSeenWaitlist) {
      // Delaying the modal helps keep the initial thread clear
      const timer = setTimeout(() => {
        setShowWaitlist(true);
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseWaitlist = () => {
    setShowWaitlist(false);
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
        <Community />
        <DagArmy />
        <RevolutionCTA />
        <BookMeeting />
        <Footer />
      </main>

      <WaitlistModal isOpen={showWaitlist} onClose={handleCloseWaitlist} />
    </AppWrapper>
  );
}