"use client";

import dynamic from "next/dynamic";
import { AppWrapper } from "@/components/app-wrapper";
import { useVisitorTracking } from "@/lib/useVisitorTracking";

const SectionSkeleton = () => <div className="h-[400px] w-full bg-slate-900/20 animate-pulse" />;

// Below-the-fold components are loaded dynamically
const Navbar = dynamic(() => import('@/components/navbar').then(mod => ({ ssr: true, loading: () => <SectionSkeleton />, default: mod.Navbar })));
const Hero = dynamic(() => import('@/components/hero').then(mod => ({ ssr: true, loading: () => <SectionSkeleton />, default: mod.Hero })));
const About = dynamic(() => import('@/components/about').then(mod => ({ ssr: false, loading: () => <SectionSkeleton />, default: mod.About })));
const Technology = dynamic(() => import('@/components/technology').then(mod => ({ ssr: false, loading: () => <SectionSkeleton />, default: mod.Technology })));
const LogoLoopSection = dynamic(() => import("@/components/logo-loop").then(mod => ({ ssr: false, loading: () => <SectionSkeleton />, default: mod.LogoLoopSection })));
const Roadmap = dynamic(() => import('@/components/roadmap').then(mod => ({ ssr: false, loading: () => <SectionSkeleton />, default: mod.Roadmap })));
const Tokenomics = dynamic(() => import('@/components/tokenomics').then(mod => ({ ssr: false, loading: () => <SectionSkeleton />, default: mod.Tokenomics })));
const Community = dynamic(() => import('@/components/community').then(mod => ({ ssr: false, loading: () => <SectionSkeleton />, default: mod.Community })));
const Footer = dynamic(() => import('@/components/footer').then(mod => ({ ssr: false, loading: () => <SectionSkeleton />, default: mod.Footer })));
const Ecosystem = dynamic(() => import("@/components/ecosystem").then(mod => ({ ssr: false, loading: () => <SectionSkeleton />, default: mod.Ecosystem })));
const DagArmy = dynamic(() => import("@/components/dag-army").then(mod => ({ ssr: false, loading: () => <SectionSkeleton />, default: mod.DagArmy })));
const RevolutionCTA = dynamic(() => import("@/components/revolution-cta").then(mod => ({ ssr: false, loading: () => <SectionSkeleton />, default: mod.RevolutionCTA })));
const BookMeeting = dynamic(() => import("@/components/book-meeting").then(mod => ({ ssr: false, loading: () => <SectionSkeleton />, default: mod.BookMeeting })));
const WaitlistManager = dynamic(() => import("@/components/WaitlistManager").then(mod => ({ ssr: false, loading: () => <SectionSkeleton />, default: mod.WaitlistManager })));

export default function Home() {

  // Silent tracking
  useVisitorTracking();

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

      {/* Logic for localStorage and timers is isolated here */}
      <WaitlistManager />
    </AppWrapper>
  );
}