"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useVisitorTracking } from "@/lib/useVisitorTracking";

const WaitlistModal = dynamic(() => import('@/components/waitlist-modal').then(mod => mod.WaitlistModal), { ssr: false });

export function WaitlistManager() {
  const [showWaitlist, setShowWaitlist] = useState(false);
  useVisitorTracking();

  useEffect(() => {
    const hasSeenWaitlist = localStorage.getItem("hasSeenWaitlist");
    if (!hasSeenWaitlist) {
      const timer = setTimeout(() => setShowWaitlist(true), 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  return showWaitlist ? (
    <WaitlistModal 
      isOpen={showWaitlist} 
      onClose={() => {
        setShowWaitlist(false);
        localStorage.setItem("hasSeenWaitlist", "true");
      }} 
    />
  ) : null;
}