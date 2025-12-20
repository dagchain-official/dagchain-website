'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, ChevronDown, ChevronRight, Menu, X, ExternalLink, Home, Calendar, CheckCircle, Clock, Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { generateWhitepaperPDF, generateSimplePDF } from '@/utils/pdfGenerator';
import { Footer } from '@/components/footer';

export default function WhitepaperPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [expandedAccordions, setExpandedAccordions] = useState<string[]>([]);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Chart data for interactive donut chart - All allocations
  const preminedData = [
    // Preminted (80%)
    { name: 'Team', value: 5, tokens: '200M DGC', color: '#6b7280' },
    { name: 'Advisor', value: 2, tokens: '80M DGC', color: '#9ca3af' },
    { name: 'Marketing & Community Airdrop', value: 6, tokens: '240M DGC', color: '#d1d5db' },
    { name: 'Ecosystem Growth/ Grants', value: 5, tokens: '200M DGC', color: '#e5e7eb' },
    { name: 'Contingency Reserves', value: 8, tokens: '320M DGC', color: '#4b5563' },
    { name: 'Scalable Growth', value: 2, tokens: '80M DGC', color: '#f3f4f6' },
    { name: 'Private Sale', value: 40, tokens: '1.6B DGC', color: '#374151' },
    { name: 'DEX Liquidity', value: 2, tokens: '80M DGC', color: '#f9fafb' },
    { name: 'Storage Node', value: 10, tokens: '400M DGC', color: '#6b7280' },
    // Mintable (20%)
    { name: 'Validator Node', value: 20, tokens: '800M DGC', color: '#9ca3af' }
  ];

  // State for active/selected chart segment
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-sm text-gray-600">{data.value}% ({data.tokens})</p>
        </div>
      );
    }
    return null;
  };

  const sections = [
    { id: 'executive-summary', title: 'Executive Summary' },
    { id: 'introduction', title: 'Introduction' },
    { id: 'market-landscape', title: 'Market Landscape' },
    { id: 'core-principles', title: 'Core Principles' },
    { id: 'architecture', title: 'Architecture' },
    { id: 'nodes', title: 'Nodes' },
    { id: 'tokenomics', title: 'Tokenomics' },
    { id: 'governance', title: 'Governance' },
    { id: 'roadmap', title: 'Roadmap' },
    { id: 'appendix', title: 'Appendix' },
  ];

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean);

      const currentSection = sectionElements.find(element => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const toggleAccordion = (id: string) => {
    setExpandedAccordions(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await generateWhitepaperPDF();
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      // Fallback to simple PDF if complex generation fails
      try {
        await generateSimplePDF('AquaChain Whitepaper', 'Whitepaper content');
      } catch (fallbackError) {
        console.error('Failed to generate fallback PDF:', fallbackError);
        alert('Sorry, there was an error generating the PDF. Please try again.');
      }
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => setIsTocOpen(!isTocOpen)}
                className="lg:hidden neuro-button p-2 sm:p-3 text-gray-600 hover:text-blockchain-primary transition-colors duration-300"
              >
                {isTocOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Table of Contents - Sticky Sidebar */}
        <AnimatePresence>
          {isTocOpen && (
            <motion.div 
              className="fixed top-16 sm:top-20 left-0 z-40 w-72 sm:w-80 lg:w-80 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] bg-white/95 backdrop-blur-md border-r border-gray-200/50 overflow-y-auto shadow-[16px_16px_32px_rgba(163,177,198,0.4),-16px_-16px_32px_rgba(255,255,255,0.9)] lg:block"
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 sm:p-6 lg:pt-12">
                <div className="neuro-base p-4 sm:p-6 rounded-2xl">
                  <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6 font-nasalization">
                    <span>Table of Contents</span>
                  </h2>
                  <nav className="space-y-1 sm:space-y-2">
                    {sections.map((section, index) => {
                      const isActive = activeSection === section.id;
                      return (
                        <motion.button
                          key={section.id}
                          onClick={() => {
                            scrollToSection(section.id);
                            setIsTocOpen(false);
                          }}
                          className={`w-full flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-xl text-left transition-all duration-300 group ${
                            isActive 
                              ? 'bg-gray-100 text-gray-900 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] border border-gray-200' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50 neuro-button'
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-xs sm:text-sm font-medium">{section.title}</span>
                          {isActive && (
                            <motion.div
                              className="ml-auto w-2 h-2 bg-gray-700 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </motion.button>
                      );
                    })}
                    
                    {/* Go to Home Button */}
                    <motion.button
                      onClick={() => window.location.href = '/'}
                      className="w-full flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-xl text-left transition-all duration-300 group text-gray-600 hover:text-gray-900 hover:bg-white/50 neuro-button mt-3 sm:mt-4 border-t border-gray-200/50 pt-4 sm:pt-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: sections.length * 0.1 + 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Home size={14} />
                      <span className="text-xs sm:text-sm font-medium">Go to Home</span>
                    </motion.button>
                  </nav>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar - Always Visible */}
        <div className="hidden lg:block fixed top-16 sm:top-20 left-0 z-40 w-80 h-[calc(100vh-5rem)] bg-white/95 backdrop-blur-md border-r border-gray-200/50 overflow-y-auto shadow-[16px_16px_32px_rgba(163,177,198,0.4),-16px_-16px_32px_rgba(255,255,255,0.9)]">
          <div className="p-6 lg:pt-12">
            <div className="neuro-base p-6 rounded-2xl">
              <h2 className="text-lg font-bold text-gray-800 mb-6 font-nasalization">
                <span>Table of Contents</span>
              </h2>
              <nav className="space-y-2">
                {sections.map((section, index) => {
                  const isActive = activeSection === section.id;
                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center space-x-3 p-4 rounded-xl text-left transition-all duration-300 group ${
                        isActive 
                          ? 'bg-gray-100 text-gray-900 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] border border-gray-200' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/50 neuro-button'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-sm font-medium">{section.title}</span>
                      {isActive && (
                        <motion.div
                          className="ml-auto w-2 h-2 bg-gray-700 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
                
                {/* Go to Home Button */}
                <motion.button
                  onClick={() => window.location.href = '/'}
                  className="w-full flex items-center space-x-3 p-4 rounded-xl text-left transition-all duration-300 group text-gray-600 hover:text-gray-900 hover:bg-white/50 neuro-button mt-4 border-t border-gray-200/50 pt-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: sections.length * 0.1 + 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Home size={14} />
                  <span className="text-sm font-medium">Go to Home</span>
                </motion.button>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div id="whitepaper-content" className="w-full px-4 sm:px-6 py-8 sm:py-12 lg:ml-80 lg:pr-8 xl:pr-12 max-w-none lg:max-w-[70%] mx-auto">
            {/* Hero Section */}
            <motion.div 
              className="text-center py-12 sm:py-16 lg:py-20 mb-8 sm:mb-12 lg:mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 leading-tight font-nasalization"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                  DAGChain
                </span>
              </motion.h1>

              <motion.h2 
                className="text-xl sm:text-2xl md:text-3xl text-gray-800 font-semibold mb-6 sm:mb-8 font-nasalization"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                A Comprehensive Whitepaper
              </motion.h2>

              <motion.div 
                className="text-base sm:text-lg text-gray-600 space-y-1 sm:space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <p><strong>Version:</strong> v1.0</p>
                <p><strong>Last Updated:</strong> 27th June 2025</p>
              </motion.div>

              {/* Download PDF Button */}
              <motion.div
                className="mt-6 sm:mt-8 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <button 
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                  className="neuro-button px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download size={14} className={isGeneratingPDF ? 'animate-spin' : ''} />
                  <span>
                    {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
                  </span>
                </button>
              </motion.div>
            </motion.div>

            {/* Content Sections */}
            <div className="space-y-8 sm:space-y-12 lg:space-y-16">
              {/* Executive Summary */}
              <motion.section 
                id="executive-summary"
                className="neuro-base p-4 sm:p-6 lg:p-8 xl:p-12 rounded-2xl sm:rounded-3xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent font-nasalization">
                        Executive Summary
                      </h2>
                </div>
                
                <div className="prose prose-base max-w-none text-gray-700 leading-relaxed space-y-4 sm:space-y-6">
                  <p className="text-sm sm:text-base text-gray-600 font-medium mb-3 sm:mb-4">
                    DAGChain is an innovative Layer 1 blockchain designed to expand the horizons of decentralized finance (DeFi), Real World Assets (Ai Projects) tokenization, and autonomous agentic AI applications.
                  </p>
                  
                  <p className="text-sm sm:text-base">
                      DAGChain is an innovative Layer 1 blockchain designed to expand the horizons of decentralized finance (DeFi), 
                    Real World Assets (Ai Projects) tokenization, and autonomous agentic AI applications, all while maintaining full 
                    compatibility with the Ethereum Virtual Machine (EVM). Built to solve the scalability and interoperability 
                    limitations inherent in Layer 1 blockchains like Ethereum, DAGChain leverages cutting-edge optimistic rollup 
                    technology to deliver enterprise-grade throughput, near-instant finality, and cost-efficient transactions. 
                    Its modular and developer-centric architecture sets the foundation for a new era of financial applications 
                    that are secure, compliant, and interoperable.
                  </p>

                  <p className="text-xs sm:text-sm text-gray-700">
                    The global financial market is undergoing significant transformation as trillions of dollars of traditionally 
                    illiquid real-world assets—ranging from real estate, private equity, commodity-backed securities to fine art—transition 
                    into tokenized digital forms on blockchain platforms. With projected tokenization of Ai Projectss expected to surpass 
                    $1 trillion within the next few years, DAGChain uniquely positions itself at the intersection of regulated 
                    finance and decentralized protocols, lowering barriers for institutions and developers alike by providing 
                    comprehensive compliance frameworks through the adoption of ERC-3643 permissioned tokens and on-chain KYC/AML enforcement.
                  </p>

                  <p className="text-xs sm:text-sm text-gray-700">
                    DAGChain's core innovation lies in its layered system architecture that separates execution, sequencing, 
                    and settlement functionalities, enabling scalable and modular development workflows. Transactions originate 
                    on the Layer 1 execution environment, where the EVM runs smart contracts natively without modification. 
                    Sequencers package these transactions into batches and commit compressed state roots periodically to Ethereum's 
                    Layer 1, enabling security inheritance and data availability verification. The optimistic nature of these 
                    rollups assumes transactions are valid but allows for fraud proofs, where challengers can detect and prove 
                    invalid state transitions within a predefined challenge window, incentivizing honest behavior through staking, 
                    slashing, and rewards.
                  </p>

                  <p className="text-xs sm:text-sm text-gray-700">
                    To ensure robust security and trust, DAGChain embraces economic game-theoretic models backed by cryptographic 
                    primitives such as verifiable random functions (VRFs) for sequencer elections, and standardized fraud proof 
                    challenges. The intricate balance of these protocols guarantees liveness and safety under partial synchrony 
                    assumptions, thus maintaining network integrity and fault tolerance even amidst adversarial conditions.
                  </p>

                  <p className="text-xs sm:text-sm text-gray-700">
                    Integral to DAGChain's design is seamless integration with DeFi protocols and agentic AI systems. Developers 
                    can build complex financial instruments, automated portfolio managers, and intelligent agents that interact 
                    autonomously with on-chain data and off-chain machine learning models. These agents include reinforcement 
                    learning policies governing asset allocation, risk management, and liquidity provisioning — expanding the 
                    frontier of decentralized autonomous finance.
                  </p>

                  <p className="text-xs sm:text-sm text-gray-700">
                    Tokenomics centers on the native utility token, AQT, which fuels transaction fees, staking, governance, 
                    and economic incentives ensuring sustained network security and active participation. A capped supply schedule 
                    with inflationary emission halving models supports a balanced ecosystem rewarding users and contributors alike, 
                    complemented by a decentralized autonomous organization (DAO) enabling quadratic voting mechanisms for 
                    community-driven upgrades and parameter tuning.
                  </p>

                  <p className="text-xs sm:text-sm text-gray-700">
                    DAGChain implements formal verification methodologies on all critical smart contract modules, employing 
                    state-of-the-art mathematical modeling and symbolic execution to preemptively identify and mitigate vulnerabilities. 
                    Multi-sourced oracle networks furnish real-time and reliable price feeds essential for Ai Projects valuation and 
                    DeFi operations. Additionally, cross-chain bridges facilitate interoperability, enabling movement of assets 
                    and data between DAGChain and other blockchain ecosystems.
                  </p>

                  <p className="text-xs sm:text-sm text-gray-700">
                    With an inclusive developer ecosystem providing comprehensive documentation, SDKs, APIs, and grant programs, 
                    DAGChain accelerates adoption and innovation. Its roadmap includes public testnet release, mainnet launch, 
                    institutional Ai Projects onboarding, agentic AI SDK deployment, and advanced governance mechanisms, positioning 
                    DAGChain as a premier blockchain platform designed to bridge traditional finance and the digital decentralized future.
                  </p>

                  <p className="text-xs sm:text-sm text-gray-600 font-medium">
                    In summary, DAGChain is not simply a Layer 1 blockchain but a comprehensive infrastructure poised to 
                    revolutionize the way real-world assets, DeFi protocols, and intelligent agents interact, transact, 
                    and govern on-chain — delivering a secure, scalable, compliant, and programmable platform for the next 
                    generation of decentralized financial systems.
                  </p>

                  {/* Key Statistics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 my-8 sm:my-12">
                    <div className="neuro-inset p-4 sm:p-6 rounded-xl sm:rounded-2xl text-center">
                      <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2 font-nasalization">
                        $1T+
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Projected Ai Projects Tokenization Market</div>
                    </div>
                    <div className="neuro-inset p-4 sm:p-6 rounded-xl sm:rounded-2xl text-center">
                      <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2 font-nasalization">
                        20k+
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Enterprise-Grade TPS</div>
                    </div>
                    <div className="neuro-inset p-4 sm:p-6 rounded-xl sm:rounded-2xl text-center sm:col-span-2 md:col-span-1">
                      <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2 font-nasalization">
                        EVM
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Full Compatibility</div>
                    </div>
                  </div>

                  {/* Key Features Highlight */}
                  <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 font-nasalization">Core Innovations</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm text-gray-700">Optimistic Rollup Technology</span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-2 h-2 bg-gray-700 rounded-full flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm text-gray-700">ERC-3643 Compliance Framework</span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-2 h-2 bg-gray-800 rounded-full flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm text-gray-700">Agentic AI Integration</span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-2 h-2 bg-gray-900 rounded-full flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm text-gray-700">Cross-Chain Interoperability</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2 font-nasalization">Ready to Build on DAGChain?</h3>
                      <p className="text-gray-600 text-xs sm:text-sm">Explore our developer documentation and start building today.</p>
                    </div>
                    <button className="neuro-button px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-gray-700 hover:text-gray-900 transition-all duration-300 flex items-center space-x-2 flex-shrink-0">
                      <span>Start Building</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              </motion.section>

              {/* Introduction */}
              <motion.section 
                id="introduction"
                className="neuro-base p-4 sm:p-6 lg:p-8 xl:p-12 rounded-2xl sm:rounded-3xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent font-nasalization">
                        Introduction
                      </h2>
                </div>
                
                <div className="prose prose-base max-w-none text-gray-700 leading-relaxed space-y-4 sm:space-y-6">
                  {/* Vision Section */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                      <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent font-nasalization">
                        Vision
                      </h3>
                    </div>
                    
                    <p className="text-sm sm:text-base text-gray-600 font-medium mb-3 sm:mb-4">
                      DAGChain envisions a future where programmable finance seamlessly integrates with the tangible real economy, 
                      unlocking unprecedented opportunities for individuals, developers, institutions, and decentralized autonomous organizations (DAOs).
                    </p>
                    
                    <p className="text-xs sm:text-sm text-gray-700">
                      At its core, DAGChain aims to provide a secure, scalable, and compliant Layer 1 blockchain optimized specifically 
                      for Real World Assets (Ai Projectss), decentralized finance (DeFi), and intelligent agentic automation. This vision is 
                      driven by the recognition that trillions of dollars of assets reside off-chain in opaque, illiquid markets, 
                      limiting global access and innovation.
                    </p>

                    <p className="text-xs sm:text-sm text-gray-700">
                      DAGChain bridges this critical gap by enabling developers to build with confidence on a platform that natively 
                      supports regulated asset tokenization standards such as ERC-3643, ensuring legal compliance without sacrificing 
                      decentralization or programmability. By harmonizing cutting-edge blockchain technology with regulatory frameworks, 
                      DAGChain empowers a new generation of smart contracts to interact with real-world financial instruments—be it 
                      real estate, commodities, or private credit.
                    </p>

                    <p className="text-xs sm:text-sm text-gray-700">
                      Moreover, DAGChain pioneers the integration of agentic AI into blockchain, enabling autonomous, adaptive smart 
                      contracts that can execute complex, rule-based financial operations independently. This blending of decentralized 
                      finance and artificial intelligence aims to catalyze the emergence of fully autonomous asset managers, digital 
                      fiduciaries, and self-optimizing financial protocols.
                    </p>

                    <p className="font-medium text-gray-800 text-sm sm:text-base">
                      In essence, DAGChain's mission is to be the foundational Layer 1 blockchain where real-world value and 
                      programmable trust coalesce, providing unparalleled accessibility, composability, and scalability to anyone 
                      looking to build the future of finance.
                    </p>

                    {/* Vision Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                      <div className="neuro-inset p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                        <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
                          </div>
                          <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Real-World Integration</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Seamless bridge between traditional finance and decentralized protocols through regulated tokenization standards.
                        </p>
                      </div>
                      
                      <div className="neuro-inset p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                        <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
                          </div>
                          <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Agentic AI Innovation</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Autonomous smart contracts powered by AI for self-optimizing financial protocols and asset management.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center space-x-4 my-12">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    <div className="w-3 h-3 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full shadow-[2px_2px_4px_rgba(163,177,198,0.3),-2px_-2px_4px_rgba(255,255,255,0.8)]"></div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  </div>

                  {/* Why Layer 1 Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent font-nasalization">
                        Why Layer 1? Why EVM Compatibility?
                      </h3>
                    </div>
                    
                    <p className="text-sm text-gray-700">
                      Ethereum has emerged as the foremost decentralized platform globally, buoyed by its robust security guarantees, 
                      vast developer ecosystem, deep liquidity pools, and composability via the Ethereum Virtual Machine (EVM). 
                      These strengths make it the natural base layer on which to build next-generation applications. Yet, Ethereum's 
                      Layer 1 is increasingly constrained by network congestion, high gas fees, and limited throughput—factors that 
                      stifle developer innovation and user adoption for mainstream financial applications.
                    </p>

                    <p className="text-sm text-gray-700">
                      Layer 1 scaling solutions address these limitations by shifting transaction execution off-chain while periodically 
                      anchoring state commitments on Ethereum to retain its security model. Among these, optimistic rollups like 
                      DAGChain strike a compelling balance by offering transaction finality and scalability without the computational 
                      overhead of zero-knowledge proofs. This approach reduces transaction costs drastically—from tens of dollars to 
                      mere pennies—and achieves throughput levels capable of supporting a high volume of Ai Projects transactions and complex 
                      DeFi interactions.
                    </p>

                    <p className="text-sm text-gray-700">
                      Furthermore, DAGChain's full EVM compatibility ensures that developers can effortlessly port existing 
                      Ethereum-based smart contracts and development toolchains (such as Solidity, Hardhat, and Remix). This reduces 
                      onboarding friction enormously and accelerates ecosystem growth, unlocking composable financial primitives that 
                      integrate Ai Projectss and AI agents with existing DeFi protocols.
                    </p>

                    <p className="font-medium text-gray-800 text-base">
                      By standing on the shoulders of Ethereum while addressing its scalability and cost challenges, DAGChain empowers 
                      developers and institutions to innovate freely, delivering a Layer 1 solution designed for the practical 
                      complexities of real-world finance.
                    </p>

                    {/* Technical Advantages */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                      <h4 className="text-lg font-semibold text-gray-800 mb-6 font-nasalization">Technical Advantages</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center mt-1 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800 mb-1">Cost Efficiency</h5>
                              <p className="text-sm text-gray-600">Reduce transaction costs from $10-50 to $0.01-0.10</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center mt-1 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800 mb-1">High Throughput</h5>
                              <p className="text-sm text-gray-600">Support 100k+ transactions per second</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center mt-1 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800 mb-1">Developer Experience</h5>
                              <p className="text-sm text-gray-600">Full compatibility with existing Ethereum tools</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center mt-1 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800 mb-1">Security Inheritance</h5>
                              <p className="text-sm text-gray-600">Leverage Ethereum's proven security model</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Technical Deep Dive */}
                    <div className="my-8">
                      <button
                        onClick={() => toggleAccordion('layer2-technical')}
                        className="w-full neuro-button p-4 rounded-xl flex items-center justify-between text-left group"
                      >
                        <span className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 font-nasalization">
                          Layer 1 Architecture Deep Dive
                        </span>
                        <ChevronDown 
                          className={`transition-transform duration-300 ${
                            expandedAccordions.includes('layer2-technical') ? 'rotate-180' : ''
                          }`} 
                          size={20} 
                        />
                      </button>
                      
                      <AnimatePresence>
                        {expandedAccordions.includes('layer2-technical') && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="neuro-inset p-6 mt-4 rounded-2xl bg-white text-gray-800 border border-gray-200 font-mono text-sm shadow-[inset_8px_8px_16px_rgba(0,0,0,0.3),inset_-8px_-8px_16px_rgba(255,255,255,0.1)]">
                              <div className="mb-4 text-gray-600">// Optimistic Rollup Architecture</div>
                              <div>contract DAGChainRollup &#123;</div>
                              <div className="ml-4">mapping(uint256 =&gt; bytes32) public stateRoots;</div>
                              <div className="ml-4">uint256 public challengePeriod = 7 days;</div>
                              <div className="ml-4 mt-2 text-gray-600">// Fraud proof mechanism</div>
                              <div className="ml-4">function submitBatch(bytes32 _stateRoot) external &#123;</div>
                              <div className="ml-8">require(msg.sender == sequencer, "Unauthorized");</div>
                              <div className="ml-8">stateRoots[block.number] = _stateRoot;</div>
                              <div className="ml-4">&#125;</div>
                              <div>&#125;</div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="mt-12 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                  <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2 font-nasalization">Ready to Explore DAGChain's Architecture?</h3>
                      <p className="text-gray-600 text-sm">Dive deeper into our technical implementation and design principles.</p>
                    </div>
                    <button 
                      onClick={() => scrollToSection('architecture')}
                      className="mt-4 sm:mt-0 neuro-button px-6 py-3 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-all duration-300 flex items-center space-x-2"
                    >
                      <span>View Architecture</span>
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </motion.section>

              {/* Market Landscape */}
              <motion.section 
                id="market-landscape"
                className="neuro-base p-8 lg:p-12 rounded-3xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-4 mb-8">
                  <div className="neuro-inset p-4 rounded-2xl">
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent font-nasalization">
                        Market Landscape
                      </h2>
                </div>
                
                <div className="prose prose-base max-w-none text-gray-700 leading-relaxed space-y-6">
                  <p className="text-base text-gray-600 font-medium mb-6">
                    The global real-world asset (Ai Projects) market is immense and rapidly evolving, representing a vast reservoir 
                    of value traditionally locked within legacy financial systems.
                  </p>
                  
                  {/* Market Size Overview */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-12">
                    <div className="neuro-inset p-6 rounded-2xl text-center bg-gradient-to-br from-gray-50 to-gray-100">
                      <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2 font-nasalization">
                        $500T+
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Total Global Ai Projects Holdings</div>
                      <div className="text-xs text-gray-500 mt-1">Real estate, credit, commodities, securities</div>
                    </div>
                    <div className="neuro-inset p-6 rounded-2xl text-center bg-gradient-to-br from-gray-50 to-gray-100">
                      <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2 font-nasalization">
                        $24B
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Tokenized Ai Projects Market 2025</div>
                      <div className="text-xs text-gray-500 mt-1">Institutional-scale ecosystem</div>
                    </div>
                    <div className="neuro-inset p-6 rounded-2xl text-center bg-gradient-to-br from-gray-50 to-gray-100">
                      <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2 font-nasalization">
                        $30T
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Projected Market by 2034</div>
                      <div className="text-xs text-gray-500 mt-1">Exponential growth trajectory</div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700">
                    With total asset holdings exceeding $500 trillion, encompassing real estate, private credit, commodities, 
                    and securities, this market represents a vast reservoir of value traditionally locked within legacy financial 
                    systems. The advent of blockchain technology is revolutionizing access to this capital by enabling the 
                    tokenization of Ai Projectss—transforming tangible assets into tradeable digital tokens on decentralized ledgers.
                  </p>

                  <p className="text-sm text-gray-700">
                    According to recent industry reports, the tokenized Ai Projects market has surged from niche pilot projects to a 
                    burgeoning institutional-scale ecosystem valued at over $24 billion in 2025, with projections estimating 
                    it could surpass $1 trillion within the next few years and potentially reach $30 trillion by 2034.
                  </p>

                  {/* Tokenization Benefits */}
                  <div className="my-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 text-center font-nasalization">Transformative Benefits of Tokenization</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] rounded-xl flex items-center justify-center flex-shrink-0">
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Enhanced Liquidity</h4>
                            <p className="text-sm text-gray-600">Fractional ownership enables previously illiquid assets to be traded 24/7 on global markets</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] rounded-xl flex items-center justify-center flex-shrink-0">
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Faster Settlement</h4>
                            <p className="text-sm text-gray-600">Reduce settlement cycles from days or weeks to minutes through automated smart contracts</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] rounded-xl flex items-center justify-center flex-shrink-0">
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Immutable Transparency</h4>
                            <p className="text-sm text-gray-600">Complete audit trail and provenance tracking on immutable blockchain ledgers</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] rounded-xl flex items-center justify-center flex-shrink-0">
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Global Accessibility</h4>
                            <p className="text-sm text-gray-600">Cross-border access without traditional intermediaries, democratizing investment opportunities</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700">
                    This development responds to institutional demands for compliant and interoperable platforms capable of 
                    bridging traditional finance with DeFi protocols, addressing long-standing inefficiencies around asset 
                    provenance, custody, and regulatory compliance.
                  </p>

                  <p className="font-medium text-gray-800 text-base">
                    DAGChain is engineered to capitalize on this shift by providing a Layer 1 blockchain optimized for 
                    efficient, compliant Ai Projects tokenization utilizing standards like ERC-3643. It facilitates seamless 
                    integration with decentralized finance protocols, opening avenues for lending, automated market-making, 
                    and yield optimization on tangible assets.
                  </p>

                  {/* AI Integration Highlight */}
                  <div className="my-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-2xl flex items-center justify-center">
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 font-nasalization">Agentic AI Innovation</h3>
                        <p className="text-gray-600 text-sm">Autonomous Financial Intelligence</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 text-sm">
                      Furthermore, DAGChain innovates by integrating agentic AI—autonomous smart contracts powered by machine 
                      learning and decision logic—which autonomously manage portfolios, monitor risk, and execute complex 
                      financial operations on-chain.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="neuro-inset p-4 rounded-xl bg-white/50">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                          <span className="font-medium text-gray-800 text-sm">Portfolio Management</span>
                        </div>
                        <p className="text-xs text-gray-600">Autonomous asset allocation and rebalancing</p>
                      </div>
                      
                      <div className="neuro-inset p-4 rounded-xl bg-white/50">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                          <span className="font-medium text-gray-800 text-sm">Risk Monitoring</span>
                        </div>
                        <p className="text-xs text-gray-600">Real-time risk assessment and mitigation</p>
                      </div>
                      
                      <div className="neuro-inset p-4 rounded-xl bg-white/50">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                          <span className="font-medium text-gray-800 text-sm">Smart Execution</span>
                        </div>
                        <p className="text-xs text-gray-600">Complex financial operations automation</p>
                      </div>
                    </div>
                  </div>

                  <p className="font-medium text-gray-800 text-base">
                    This fusion of blockchain, Ai Projectss, DeFi, and AI redefines decentralized asset management and paves the way 
                    for scalable, intelligent financial ecosystems.
                  </p>

                  {/* Expandable Technical Deep Dive */}
                  <div className="my-8">
                    <button
                      onClick={() => toggleAccordion('market-technical')}
                      className="w-full neuro-button p-4 rounded-xl flex items-center justify-between text-left group"
                    >
                      <span className="font-semibold text-gray-800 group-hover:text-blockchain-primary transition-colors duration-300">
                        Ai Projects Tokenization Technical Framework
                      </span>
                      <ChevronDown 
                        className={`transition-transform duration-300 ${
                          expandedAccordions.includes('market-technical') ? 'rotate-180' : ''
                        }`} 
                        size={20} 
                      />
                    </button>
                    
                    <AnimatePresence>
                      {expandedAccordions.includes('market-technical') && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="neuro-inset p-6 mt-4 rounded-2xl bg-white text-gray-800 border border-gray-200 font-mono text-sm">
                            <div className="mb-4 text-gray-600">// ERC-3643 Compliant Ai Projects Token Implementation</div>
                            <div>contract DAGChainAi ProjectsToken is ERC3643 &#123;</div>
                            <div className="ml-4">mapping(address =&gt; bool) public verifiedInvestors;</div>
                            <div className="ml-4">mapping(uint256 =&gt; AssetMetadata) public assets;</div>
                            <div className="ml-4">uint256 public totalAssetValue;</div>
                            <div className="ml-4 mt-2 text-gray-600">// Compliance & AI integration</div>
                            <div className="ml-4">function transfer(address to, uint256 amount) &#123;</div>
                            <div className="ml-8">require(verifiedInvestors[to], "KYC required");</div>
                            <div className="ml-8">aiAgent.assessRisk(to, amount);</div>
                            <div className="ml-8">super.transfer(to, amount);</div>
                            <div className="ml-4">&#125;</div>
                            <div>&#125;</div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="mt-12 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                  <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2 font-nasalization">Explore DAGChain's Core Principles</h3>
                      <p className="text-gray-600 text-sm">Discover the foundational principles that drive our Ai Projects tokenization platform.</p>
                    </div>
                    <button 
                      onClick={() => scrollToSection('core-principles')}
                      className="mt-4 sm:mt-0 neuro-button px-6 py-3 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-all duration-300 flex items-center space-x-2"
                    >
                      <span>View Principles</span>
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </motion.section>

              {/* Core Principles */}
              <motion.section 
                id="core-principles"
                className="neuro-base p-8 lg:p-12 rounded-3xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-4 mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent font-nasalization">
                        Core Principles
                      </h2>
                </div>
                
                <div className="prose prose-base max-w-none text-gray-700 leading-relaxed space-y-6">
                  <p className="text-base text-gray-600 font-medium mb-6">
                    DAGChain is founded on a set of core principles that drive its design as a next-generation Layer 1 solution, 
                    optimized to seamlessly integrate Real World Assets (Ai Projects), decentralized finance (DeFi), decentralized physical 
                    infrastructure networks (DePIN), and intelligent agentic AI.
                  </p>

                  <p className="font-medium text-gray-800 text-base">
                    These principles ensure the platform is scalable, secure, compliant, and developer-friendly, unlocking 
                    transformative possibilities.
                  </p>

                  {/* Principle 1: Blockchain Layer 1 Architecture */}
                  <div className="my-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-2xl flex items-center justify-center">
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">Blockchain Layer 1 Architecture</h3>
                        <p className="text-gray-600 text-sm">Optimistic Rollup Foundation</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 text-sm">
                      At DAGChain's heart lies a Layer 1 optimistic rollup architecture deployed atop Ethereum. This approach 
                      batches transactions off-chain, reducing congestion and lowering fees by orders of magnitude while publishing 
                      periodic state commitments to Ethereum Layer 1 for security and finality.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="neuro-inset p-4 rounded-xl bg-white/50">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                          <span className="font-medium text-gray-800 text-sm">Massive Throughput</span>
                        </div>
                        <p className="text-xs text-gray-600">Thousands of TPS with near-instant experiences</p>
                      </div>
                      
                      <div className="neuro-inset p-4 rounded-xl bg-white/50">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                          <span className="font-medium text-gray-800 text-sm">Modular Design</span>
                        </div>
                        <p className="text-xs text-gray-600">Sequencer, execution, and settlement layers</p>
                      </div>
                      
                      <div className="neuro-inset p-4 rounded-xl bg-white/50">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                          <span className="font-medium text-gray-800 text-sm">Interoperability</span>
                        </div>
                        <p className="text-xs text-gray-600">Flexibility and upgradeability</p>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm">
                      Layer 1 decouples execution from consensus, enabling massive throughput with its modular design that 
                      splits the protocol into sequencer, execution, and settlement layers, promoting flexibility, 
                      upgradeability, and interoperability.
                    </p>
                  </div>

                  {/* Principle 2: Real World Asset Tokenization */}
                  <div className="my-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-2xl flex items-center justify-center">
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">Real World Asset Tokenization</h3>
                        <p className="text-gray-600 text-sm">ERC-3643 Compliance & Regulatory Integration</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 text-sm">
                      Tokenizing Ai Projectss on blockchain is a fundamental DAGChain use case. By adopting ERC-3643 permissioned tokens 
                      and integrating regulatory controls such as automated KYC/AML checks and transfer restrictions, DAGChain 
                      bridges legal compliance with decentralization.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-xs font-bold">1</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-1 text-sm">Real Estate</h4>
                            <p className="text-xs text-gray-600">Fractional property ownership and investment</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-xs font-bold">2</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-1 text-sm">Private Credit</h4>
                            <p className="text-xs text-gray-600">Institutional lending and debt instruments</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-xs font-bold">3</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-1 text-sm">Commodities</h4>
                            <p className="text-xs text-gray-600">Gold, oil, agricultural products tokenization</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-xs font-bold">4</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-1 text-sm">Infrastructure</h4>
                            <p className="text-xs text-gray-600">Physical infrastructure and utility assets</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 font-medium text-sm">
                      Assets can be fractionalized and transformed into tradeable, programmable digital tokens. This unlocks 
                      liquidity from around the globe, reduces settlement friction and accelerates capital formation.
                    </p>
                  </div>

                  {/* Principle 3: DeFi & DePIN Synergy */}
                  <div className="my-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">DeFi & DePIN Synergy</h3>
                        <p className="text-gray-600 text-sm">Financial Protocols & Physical Infrastructure</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 text-sm">
                      DAGChain supports a full suite of native DeFi protocols – lending, automated market makers, synthetic 
                      assets – optimized to collateralize Ai Projectss and accelerated by secure, real-time price oracles.
                    </p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                      <div className="neuro-inset p-4 rounded-2xl bg-white/50">
                        <h4 className="text-base font-bold text-gray-800 mb-3 flex items-center">
                          DeFi Protocols
                        </h4>
                        <ul className="space-y-2 text-xs text-gray-600">
                          <li className="flex items-center"><span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>Lending & Borrowing</li>
                          <li className="flex items-center"><span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>Automated Market Makers</li>
                          <li className="flex items-center"><span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>Synthetic Assets</li>
                          <li className="flex items-center"><span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>Real-time Price Oracles</li>
                        </ul>
                      </div>
                      
                      <div className="neuro-inset p-4 rounded-2xl bg-white/50">
                        <h4 className="text-base font-bold text-gray-800 mb-3 flex items-center">
                          DePIN Networks
                        </h4>
                        <ul className="space-y-2 text-xs text-gray-600">
                          <li className="flex items-center"><span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>Energy Grids</li>
                          <li className="flex items-center"><span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>Telecommunications</li>
                          <li className="flex items-center"><span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>Supply Chains</li>
                          <li className="flex items-center"><span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>Physical Infrastructure</li>
                        </ul>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm">
                      Beyond financial assets, DAGChain pioneers Decentralized Physical Infrastructure Networks (DePINs), 
                      enabling decentralized ownership and monetization of physical infrastructure. This expands blockchain's 
                      reach into tangible infrastructure, generating economic synergies.
                    </p>
                  </div>

                  {/* Principle 4: Agentic AI Integration */}
                  <div className="my-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-2xl flex items-center justify-center">
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">Agentic AI Integration</h3>
                        <p className="text-gray-600 text-sm">Autonomous Smart Contract Intelligence</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 text-sm">
                      DAGChain integrates agentic AI – autonomous smart contracts empowered by machine learning, decision trees, 
                      and reinforcement learning. These AI agents dynamically manage portfolios, optimize liquidity, enforce 
                      compliance, and proactively respond to market conditions without human intervention.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="neuro-inset p-4 rounded-2xl bg-white/50 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-xl flex items-center justify-center mx-auto mb-3">
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">Portfolio Management</h4>
                        <p className="text-xs text-gray-600">Dynamic asset allocation and rebalancing</p>
                      </div>
                      
                      <div className="neuro-inset p-4 rounded-2xl bg-white/50 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-xl flex items-center justify-center mx-auto mb-3">
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">Compliance Enforcement</h4>
                        <p className="text-xs text-gray-600">Automated regulatory compliance monitoring</p>
                      </div>
                      
                      <div className="neuro-inset p-4 rounded-2xl bg-white/50 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-xl flex items-center justify-center mx-auto mb-3">
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">Market Response</h4>
                        <p className="text-xs text-gray-600">Proactive market condition adaptation</p>
                      </div>
                    </div>

                    <p className="text-gray-700 font-medium text-sm">
                      This fusion of decentralized finance and artificial intelligence redefines programmable money, enabling 
                      self-optimizing, adaptive financial ecosystems.
                    </p>
                  </div>

                  {/* Conclusion */}
                  <div className="my-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] rounded-3xl flex items-center justify-center mx-auto mb-4">
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3">Revolutionary Convergence</h3>
                      <p className="text-gray-700 text-sm max-w-4xl mx-auto">
                        Together, these core principles position DAGChain uniquely to revolutionize the convergence of digital 
                        and physical economies, delivering an advanced, compliant, and intelligent blockchain platform built for 
                        the future of finance and infrastructure.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                  <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-gray-800 mb-2">Explore DAGChain's Architecture</h3>
                      <p className="text-gray-600 text-xs">Dive deep into the technical architecture that powers our platform.</p>
                    </div>
                    <button 
                      onClick={() => scrollToSection('architecture')}
                      className="mt-4 sm:mt-0 neuro-button px-4 py-2 text-xs font-semibold text-gray-700 hover:text-blockchain-primary transition-all duration-300 flex items-center space-x-2"
                    >
                      <span>View Architecture</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              </motion.section>

              {/* Architecture */}
              <motion.section 
                id="architecture"
                className="neuro-base p-6 lg:p-8 rounded-3xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <h2 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent font-nasalization">
                        System Architecture and Design
                      </h2>
                </div>
                
                <div className="prose prose-base max-w-none text-gray-700 leading-relaxed space-y-6">
                  <p className="text-base text-gray-600 font-medium mb-6 text-sm">
                    DAGChain's architecture is designed to deliver a highly scalable, secure, and modular Layer 1 blockchain 
                    solution fully compatible with the Ethereum Virtual Machine (EVM). The system employs an optimistic rollup 
                    design to scale transaction throughput while inheriting Ethereum's Layer 1 security guarantees.
                  </p>

                  <p className="font-medium text-gray-800 text-base text-sm">
                    The architecture comprises three fundamental layers—Execution, Sequencer, and Settlement—working in tandem 
                    to optimize for performance, security, and interoperability.
                  </p>

                  {/* 4.1 Layered Architectural Components */}
                  <div className="my-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-2xl flex items-center justify-center">
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">Layered Architectural Components</h3>
                        <p className="text-gray-600 text-sm">Three-Layer Modular Design</p>
                      </div>
                    </div>

                    {/* Execution Layer */}
                    <div className="mb-8 p-4 bg-white/70 rounded-2xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-xl flex items-center justify-center">
                        </div>
                        <h4 className="text-base font-bold text-gray-800 text-sm">Execution Layer</h4>
                      </div>
                      
                      <p className="text-gray-700 mb-4 text-sm">
                        At the core, the execution layer runs an EVM-compatible virtual machine executing user transactions and smart contracts. 
                        It processes incoming transactions and computes the resulting new state.
                      </p>

                      {/* Mathematical Formula */}
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4">
                        <div className="text-center space-y-3">
                          <div className="text-base font-mono bg-white p-3 rounded-lg border">
                            <span className="text-gray-700">T</span> = {"{"}
                            <span className="text-gray-700">t₁</span>, 
                            <span className="text-gray-700">t₂</span>, ..., 
                            <span className="text-gray-700">tₙ</span>
                            {"}"}
                          </div>
                          <div className="text-base font-mono bg-white p-3 rounded-lg border">
                            <span className="text-gray-800">S</span><sub className="text-xs">t+1</sub> = 
                            <span className="text-gray-700">STF</span>(
                            <span className="text-gray-800">S</span><sub className="text-xs">t</sub>, 
                            <span className="text-gray-700">T</span>)
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-3 text-center">
                          Where <span className="font-mono text-gray-700">STF</span> denotes the state transition function mapping current state 
                          <span className="font-mono text-gray-800">S<sub>t</sub></span> and batch transactions 
                          <span className="font-mono text-gray-700">T</span> onto next state 
                          <span className="font-mono text-gray-800">S<sub>t+1</sub></span>
                        </p>
                      </div>

                      {/* Sequential Formula */}
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                        <div className="text-center">
                          <div className="text-base font-mono bg-white p-3 rounded-lg border inline-block">
                            <span className="text-gray-800">S</span><sub className="text-xs">t+1</sub> = 
                            <span className="text-gray-700">STF</span>(
                            <span className="text-gray-800">S</span><sub className="text-xs">t</sub>, 
                            <span className="text-gray-700">T</span>) = 
                            <span className="text-gray-800">∏</span><sub className="text-xs">i=1</sub><sup className="text-xs">n</sup> 
                            <span className="text-gray-700">STF</span><sub className="text-xs">i</sub>(
                            <span className="text-gray-800">S</span><sub className="text-xs">t+i-1</sub>, 
                            <span className="text-gray-700">t</span><sub className="text-xs">i</sub>)
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-3 text-center">
                          Each <span className="font-mono text-gray-700">STF<sub>i</sub></span> is the application of transaction 
                          <span className="font-mono text-gray-700">t<sub>i</sub></span> in sequence
                        </p>
                      </div>
                    </div>

                    {/* Sequencer Layer */}
                    <div className="mb-8 p-4 bg-white/70 rounded-2xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-xl flex items-center justify-center">
                        </div>
                        <h4 className="text-base font-bold text-gray-800 text-sm">Sequencer Layer</h4>
                      </div>
                      
                      <p className="text-gray-700 mb-4 text-sm">
                        The sequencer is responsible for transaction ordering and block construction. It collects transactions submitted by users, 
                        orders them into a block, and produces a state commitment by applying the state transition function. It guarantees high 
                        throughput and low latency, batching thousands of transactions per block.
                      </p>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                          <h5 className="font-bold text-gray-800 mb-3 text-sm">Block Construction</h5>
                          <div className="text-center">
                            <div className="text-base font-mono bg-white p-3 rounded-lg border">
                              <span className="text-gray-700">B</span><sub className="text-xs">t</sub> = {"{"}
                              <span className="text-gray-700">t₁</span>, 
                              <span className="text-gray-700">t₂</span>, ..., 
                              <span className="text-gray-700">tₙ</span>
                              {"}"}
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mt-2 text-center">
                            Ordered list of transactions in block <span className="font-mono text-gray-700">B<sub>t</sub></span>
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                          <h5 className="font-bold text-gray-800 mb-3 text-sm">State Commitment</h5>
                          <div className="text-center">
                            <div className="text-base font-mono bg-white p-3 rounded-lg border">
                              <span className="text-gray-800">H</span>(
                              <span className="text-gray-800">S</span><sub className="text-xs">t+1</sub>)
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mt-2 text-center">
                            Post-state root hash published to settlement layer
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Settlement Layer */}
                    <div className="p-4 bg-white/70 rounded-2xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] rounded-xl flex items-center justify-center">
                        </div>
                        <h4 className="text-base font-bold text-gray-800 text-sm">Settlement Layer</h4>
                      </div>
                      
                      <p className="text-gray-700 mb-4 text-sm">
                        The settlement layer anchors the rollup state roots and calldata batches on Ethereum Layer 1, providing finality 
                        and ensuring data availability. State roots and transaction calldata are posted on-chain as commitments every epoch.
                      </p>

                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                        <div className="text-center">
                          <div className="text-base font-mono bg-white p-3 rounded-lg border inline-block">
                            <span className="text-gray-700">Commitment</span><sub className="text-xs">t</sub> = (
                            <span className="text-gray-800">H</span>(
                            <span className="text-gray-800">S</span><sub className="text-xs">t</sub>), 
                            <span className="text-gray-700">Data</span><sub className="text-xs">calldata</sub>(
                            <span className="text-gray-700">B</span><sub className="text-xs">t</sub>))
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-3 text-center">
                          Anchoring to Layer 1 provides trustless verification that guarantees rollup blocks are irreversible once finalized
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 4.2 Optimistic Rollup and Fraud Proofs */}
                  <div className="my-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-2xl flex items-center justify-center">
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">Optimistic Rollup and Fraud Proofs</h3>
                        <p className="text-gray-600 text-sm">Challenge-Response Security Mechanism</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6 text-sm">
                      Transactions on DAGChain are optimistically assumed valid. To detect invalid state transitions, a fraud proof 
                      mechanism allows challengers to prove discrepancies.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white/70 p-4 rounded-2xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                        <h4 className="text-base font-bold text-gray-800 mb-3 text-sm">Mismatch Detection</h4>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                          <div className="text-center">
                            <div className="text-sm font-mono bg-white p-2 rounded-lg border">
                              <span className="text-gray-800">Mismatch</span> := 
                              <span className="text-gray-700">STF</span>(
                              <span className="text-gray-800">S</span><sub className="text-xs">t</sub>, 
                              <span className="text-gray-700">B</span><sub className="text-xs">t</sub>) ≠ 
                              <span className="text-gray-800">S</span><sub className="text-xs">t+1</sub>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          Challenger computes expected state and compares with published state
                        </p>
                      </div>

                      <div className="bg-white/70 p-4 rounded-2xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                        <h4 className="text-base font-bold text-gray-800 mb-3 text-sm">State Difference Predicate</h4>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                          <div className="text-center">
                            <div className="text-xs font-mono bg-white p-2 rounded-lg border">
                              <span className="text-gray-800">δ</span>(
                              <span className="text-gray-800">S</span><sub className="text-xs">t</sub>, 
                              <span className="text-gray-700">B</span><sub className="text-xs">t</sub>, 
                              <span className="text-gray-800">S'</span><sub className="text-xs">t+1</sub>) = 
                              <span className="block mt-1">
                                {"{"} 1 if <span className="text-gray-700">STF</span>(
                                <span className="text-gray-800">S</span><sub className="text-xs">t</sub>, 
                                <span className="text-gray-700">B</span><sub className="text-xs">t</sub>) ≠ 
                                <span className="text-gray-800">S'</span><sub className="text-xs">t+1</sub>
                              </span>
                              <span className="block">
                                {"{"} 0 otherwise
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          Predicate triggers slashing and rewards protocol actors accordingly
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 4.3 Data Availability */}
                  <div className="my-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-2xl flex items-center justify-center">
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">Data Availability and State Commitment</h3>
                        <p className="text-gray-600 text-sm">Distributed Storage & Transparency</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 text-sm">
                      To ensure data integrity and transparency, all transaction calldata is published to Layer 1 or Layer 1 data 
                      availability committees (DAOs) utilizing distributed storage systems such as IPFS or Celestia. This design 
                      leverages Ethereum's immutability and security while decreasing Layer 1 congestion.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="neuro-inset p-4 rounded-2xl bg-white/50 text-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-xl flex items-center justify-center mx-auto mb-3">
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">IPFS Integration</h4>
                        <p className="text-xs text-gray-600">Decentralized file storage for transaction data</p>
                      </div>
                      
                      <div className="neuro-inset p-4 rounded-2xl bg-white/50 text-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-xl flex items-center justify-center mx-auto mb-3">
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">Celestia DA</h4>
                        <p className="text-xs text-gray-600">Modular data availability layer</p>
                      </div>
                      
                      <div className="neuro-inset p-4 rounded-2xl bg-white/50 text-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-xl flex items-center justify-center mx-auto mb-3">
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">L1 Anchoring</h4>
                        <p className="text-xs text-gray-600">Ethereum security inheritance</p>
                      </div>
                    </div>
                  </div>

                  {/* 4.4 Cross-Layer Interaction */}
                  <div className="my-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-2xl flex items-center justify-center">
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">Cross-Layer Interaction and Modularity</h3>
                        <p className="text-gray-600 text-sm">Plug-and-Play Component Architecture</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6 text-sm">
                      DAGChain's architecture is modular, supporting plug-and-play components for enhanced functionality and flexibility.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="neuro-inset p-4 rounded-2xl bg-white/50">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-lg flex items-center justify-center">
                          </div>
                          <h4 className="font-bold text-gray-800 text-sm">Oracle Modules</h4>
                        </div>
                        <p className="text-xs text-gray-600">
                          Interface with multi-source price oracles to provide real-time Ai Projects valuations and market data feeds.
                        </p>
                      </div>

                      <div className="neuro-inset p-4 rounded-2xl bg-white/50">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-lg flex items-center justify-center">
                          </div>
                          <h4 className="font-bold text-gray-800 text-sm">Compliance Layers</h4>
                        </div>
                        <p className="text-xs text-gray-600">
                          Enforce on-chain KYC/AML rules through permissioned token standards (ERC-3643) and regulatory frameworks.
                        </p>
                      </div>

                      <div className="neuro-inset p-4 rounded-2xl bg-white/50">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-lg flex items-center justify-center">
                          </div>
                          <h4 className="font-bold text-gray-800 text-sm">AI Agent Integrations</h4>
                        </div>
                        <p className="text-xs text-gray-600">
                          Enable autonomous decision-making smart contracts powered by agentic AI subsystems and machine learning.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 4.5 Mathematical Properties */}
                  <div className="my-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] rounded-2xl flex items-center justify-center">
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">Mathematical Properties & Security Assurances</h3>
                        <p className="text-gray-600 text-sm">Formal Verification & Game Theory</p>
                      </div>
                    </div>

                    {/* Deterministic State Transitions */}
                    <div className="mb-6 p-4 bg-white/70 rounded-2xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                      <h4 className="text-base font-bold text-gray-800 mb-3 text-sm">Deterministic State Transitions</h4>
                      <p className="text-gray-700 mb-3 text-sm">
                        The state transition function STF satisfies determinism, guaranteeing order-robustness:
                      </p>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="text-center">
                          <div className="text-xs font-mono bg-white p-3 rounded-lg border inline-block">
                            ∀<span className="text-gray-800">S</span>, 
                            <span className="text-gray-700">T₁</span>, 
                            <span className="text-gray-700">T₂</span> : 
                            <span className="text-gray-700">STF</span>(
                            <span className="text-gray-700">STF</span>(
                            <span className="text-gray-800">S</span>, 
                            <span className="text-gray-700">T₁</span>), 
                            <span className="text-gray-700">T₂</span>) = 
                            <span className="text-gray-700">STF</span>(
                            <span className="text-gray-800">S</span>, 
                            <span className="text-gray-700">T₁</span> ∪ 
                            <span className="text-gray-700">T₂</span>)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Finality and Trust Minimization */}
                    <div className="mb-6 p-4 bg-white/70 rounded-2xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                      <h4 className="text-base font-bold text-gray-800 mb-3 text-sm">Finality and Trust Minimization</h4>
                      <p className="text-gray-700 mb-3 text-sm">
                        The finality time is determined by challenge and confirmation periods:
                      </p>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="text-center">
                          <div className="text-base font-mono bg-white p-3 rounded-lg border inline-block">
                            <span className="text-gray-800">τ</span><sub className="text-xs">f</sub> = 
                            <span className="text-gray-800">τ</span><sub className="text-xs">challenge</sub> + 
                            <span className="text-gray-800">τ</span><sub className="text-xs">confirmation</sub>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-3 text-center">
                          Where <span className="font-mono text-gray-800">τ<sub>challenge</sub></span> is fraud proof challenge period (typically 1 week)
                        </p>
                      </div>
                    </div>

                    {/* Economic Security */}
                    <div className="p-4 bg-white/70 rounded-2xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                      <h4 className="text-base font-bold text-gray-800 mb-3 text-sm">Economic Security</h4>
                      <p className="text-gray-700 mb-3 text-sm">
                        Collateral stakes on sequencers and challengers are mathematically correlated to maximize incentives against fraud:
                      </p>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="text-center">
                          <div className="text-base font-mono bg-white p-3 rounded-lg border inline-block">
                            <span className="text-gray-700">P</span><sub className="text-xs">honest</sub> &gt; 2/3
                            <span className="text-gray-800">P</span><sub className="text-xs">fraud</sub>
                          </div>
                          <div className="text-xs text-gray-600 mt-2">
                            where <span className="font-mono text-gray-700">P</span> = payoff
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-3 text-center">
                          Ensuring protocol game-theoretical stability and honest behavior incentivization
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Conclusion */}
                  <div className="my-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-3xl flex items-center justify-center mx-auto mb-4">
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3">Scalable & Composable Architecture</h3>
                      <p className="text-gray-700 text-sm max-w-4xl mx-auto">
                        This architecture enables DAGChain to serve a diverse ecosystem of asset tokenizers, DeFi primitives, 
                        and autonomous AI-driven financial agents with unparalleled scalability, security, and composability.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                  <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-gray-800 mb-2">Explore Technical Implementation</h3>
                      <p className="text-gray-600 text-xs">Learn about the specific technologies and protocols powering DAGChain.</p>
                    </div>
                    <button 
                      onClick={() => scrollToSection('technology')}
                      className="mt-4 sm:mt-0 neuro-button px-4 py-2 text-xs font-semibold text-gray-700 hover:text-blockchain-primary transition-all duration-300 flex items-center space-x-2"
                    >
                      <span>View Technology</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              </motion.section>

              {/* Nodes Section */}
              <motion.section 
                id="nodes"
                className="neuro-base p-6 lg:p-8 rounded-3xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="neuro-inset p-3 rounded-2xl">
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent font-nasalization">
                    Node Operators and Mining
                  </h2>
                </div>
                
                <div className="prose prose-base max-w-none text-gray-700 leading-relaxed">
                  <p className="text-base text-gray-600 font-medium mb-4">
                    DAGChain is architected to operate as a decentralized, secure, and scalable Layer 1 blockchain ecosystem. 
                    To achieve these goals, it plans to onboard up to 50,000 Node Operators, each playing a critical role in 
                    maintaining network consensus, transaction validation, block production, and security.
                  </p>
                  <p className="text-sm text-gray-600 mb-6">
                    This section elaborates on the technical significance of Node Operators, their contributions to network 
                    robustness, and the economic incentives that ensure sustained participation through mining of the native 
                    gas coin, $DGC.
                  </p>

                  {/* What are Node Operators */}
                  <div className="neuro-base p-4 rounded-2xl mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                      <span>What are Node Operators?</span>
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      Node Operators in DAGChain run full blockchain nodes,specialized softwares and hardware setups designed to:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <div className="neuro-inset p-3 rounded-xl">
                        <div className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-xs text-gray-700">Store a complete copy of the blockchain ledger (state and transactions) locally</p>
                        </div>
                      </div>
                      <div className="neuro-inset p-3 rounded-xl">
                        <div className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-xs text-gray-700">Independently validate transactions and state transitions according to protocol rules</p>
                        </div>
                      </div>
                      <div className="neuro-inset p-3 rounded-xl">
                        <div className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-xs text-gray-700">Participate as block producers (miners) in transaction ordering and block forging</p>
                        </div>
                      </div>
                      <div className="neuro-inset p-3 rounded-xl">
                        <div className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-xs text-gray-700">Relay messages and synchronize data with peer nodes across the distributed network</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      Each Node Operator holds a vital position in preserving network integrity by cross-verifying blocks, 
                      ensuring correctness, and detecting malicious or invalid transactions through complex game-theoretic incentives.
                    </p>
                  </div>

                  {/* Why 50,000 Nodes */}
                  <div className="neuro-base p-4 rounded-2xl mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                      <span>Why Onboard 50,000 Nodes?</span>
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      The decision to enable a large number of nodes is motivated by a desire for high decentralization and fault tolerance. 
                      A broader validator set reduces:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                      <div className="neuro-inset p-3 rounded-xl text-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full mx-auto mb-2 flex items-center justify-center">
                        </div>
                        <h4 className="text-xs font-semibold text-gray-800 mb-1">Centralization Risks</h4>
                        <p className="text-xs text-gray-600">Avoids possible collusion or censorship by any small validator coalition</p>
                      </div>
                      <div className="neuro-inset p-3 rounded-xl text-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full mx-auto mb-2 flex items-center justify-center">
                        </div>
                        <h4 className="text-xs font-semibold text-gray-800 mb-1">Network Partition Resilience</h4>
                        <p className="text-xs text-gray-600">Ensures operational continuity even if subsets are isolated or attacked</p>
                      </div>
                      <div className="neuro-inset p-3 rounded-xl text-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full mx-auto mb-2 flex items-center justify-center">
                        </div>
                        <h4 className="text-xs font-semibold text-gray-800 mb-1">Security Liveness</h4>
                        <p className="text-xs text-gray-600">Wide geographic spread mitigates DDoS attacks or regulatory shutdowns</p>
                      </div>
                    </div>
                  </div>

                  {/* Security Mechanisms */}
                  <div className="neuro-base p-4 rounded-2xl mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                      <span>How Node Operators Secure DAGChain</span>
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Node Operators execute a Proof-of-Stake (PoS) based mining and consensus protocol designed specifically 
                      for the optimistic rollup architecture of DAGChain. Each node must stake a minimum amount of $DGCas collateral.
                    </p>
                    
                    {/* Mathematical Formulas */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl mb-4">
                      <h4 className="text-sm font-semibold text-gray-800 mb-3">Protocol Definitions:</h4>
                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-800 font-semibold">N</span>
                          <span className="text-gray-600">=</span>
                          <span className="text-gray-700">total number of registered node operators</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-700 font-semibold">s<sub>i</sub></span>
                          <span className="text-gray-600">=</span>
                          <span className="text-gray-700">stake of node i</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-800 font-semibold">S = ∑<sub>i=1</sub><sup>N</sup> s<sub>i</sub></span>
                          <span className="text-gray-600">=</span>
                          <span className="text-gray-700">aggregated network stake</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl mb-4">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Block Producer Selection Probability:</h4>
                      <div className="text-center py-2">
                        <span className="text-lg font-mono bg-white px-4 py-2 rounded-lg shadow-sm">
                          <span className="text-gray-800">P<sub>i</sub></span> = 
                          <span className="text-gray-700">s<sub>i</sub></span> / 
                          <span className="text-gray-800">S</span>
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        Node i's probability to be elected as block producer in epoch t is proportional to its stake share.
                      </p>
                    </div>

                    <p className="text-sm text-gray-700">
                      Upon selection, nodes propose a block B<sub>t</sub>, sequencing pending transactions &#123;t₁, t₂, ..., tₙ&#125;, 
                      and execute a state transition STF(S<sub>t-1</sub>, B<sub>t</sub>) on the Layer 1 EVM. They then publish 
                      the block header and a cryptographic commitment to the updated state hash H(S<sub>t</sub>) to the 
                      Ethereum Layer 1 settlement chain.
                    </p>
                  </div>

                  {/* Mining Rewards */}
                  <div className="neuro-base p-4 rounded-2xl mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                      <span>Mining Rewards and Incentives</span>
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Mining on DAGChain is economically incentivized through a dual reward mechanism:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="neuro-inset p-3 rounded-xl">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center space-x-2">
                          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                          <span>Block Rewards</span>
                        </h4>
                        <p className="text-xs text-gray-700">
                          Selected sequencers earn <span className="font-mono text-gray-700">R<sub>b</sub></span> $DGCtokens 
                          as mining rewards for valid block proposals.
                        </p>
                      </div>
                      <div className="neuro-inset p-3 rounded-xl">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center space-x-2">
                          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                          <span>Transaction Fees</span>
                        </h4>
                        <p className="text-xs text-gray-700">
                          Nodes collect network gas fees <span className="font-mono text-gray-700">f<sub>gas</sub></span> 
                          paid by users for transaction execution within their blocks.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl mb-4">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Total Reward Formula:</h4>
                      <div className="text-center py-2">
                        <span className="text-lg font-mono bg-white px-4 py-2 rounded-lg shadow-sm">
                          <span className="text-gray-800">R<sub>i</sub></span> = 
                          <span className="text-gray-700">R<sub>b</sub></span> + 
                          <span className="text-gray-700">∑<sub>j=1</sub><sup>n</sup> f<sub>gas</sub>(t<sub>j</sub>)</span>
                        </span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Penalty Mechanism:</h4>
                      <p className="text-xs text-gray-700 mb-2">
                        If a fraud proof challenge successfully demonstrates invalid state transitions, 
                        the offending node loses a slashed stake portion:
                      </p>
                      <div className="text-center py-2">
                        <span className="text-sm font-mono bg-white px-3 py-1 rounded-lg shadow-sm">
                          <span className="text-gray-700">s<sub>i</sub><sup>new</sup></span> = 
                          <span className="text-gray-800">s<sub>i</sub></span> - 
                          <span className="text-gray-800">Δs</span>, where 
                          <span className="text-gray-800">Δs &gt; 0</span>
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        Where Δs contributes to the reward pool for honest challengers.
                      </p>
                    </div>
                  </div>

                  {/* Technical Role */}
                  <div className="neuro-base p-4 rounded-2xl">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                      <span>Technical Role in Consensus and Fraud Detection</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="neuro-inset p-3 rounded-xl">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center space-x-2">
                          <span>Validation</span>
                        </h4>
                        <p className="text-xs text-gray-700">
                          Miners perform deterministic EVM execution of all transactions in their proposed block 
                          to compute S<sub>t</sub> and produce a valid Merkle root commitment H(S<sub>t</sub>).
                        </p>
                      </div>
                      <div className="neuro-inset p-3 rounded-xl">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center space-x-2">
                          <span>Sequencing</span>
                        </h4>
                        <p className="text-xs text-gray-700">
                          The order of transactions determines critical properties like front-running resistance 
                          and MEV extraction potential, making miner sequencing decisions impactful.
                        </p>
                      </div>
                      <div className="neuro-inset p-3 rounded-xl">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center space-x-2">
                          <span>Fraud Proof Enforcement</span>
                        </h4>
                        <p className="text-xs text-gray-700">
                          When malicious blocks are detected, a game-theoretic fraud challenge process is triggered, 
                          where challenger nodes submit proofs on-chain within a challenge window τ<sub>c</sub> (typically one week).
                        </p>
                      </div>
                      <div className="neuro-inset p-3 rounded-xl">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center space-x-2">
                          <span>Fork Choice Rule</span>
                        </h4>
                        <p className="text-xs text-gray-700">
                          DAGChain applies a fork choice based on finalized, fraud-proof-vetted blocks 
                          to maintain a canonical chain view.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                  <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-gray-800 mb-1">Become a Node Operator</h3>
                      <p className="text-gray-600 text-xs">Join the decentralized network and earn $DGCrewards through mining.</p>
                    </div>
                    <button 
                      onClick={() => scrollToSection('tokenomics')}
                      className="neuro-button px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blockchain-primary transition-all duration-300 flex items-center space-x-2"
                    >
                      <span>Learn About $AQT</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              </motion.section>

              {/* Tokenomics Section */}
              <motion.section 
                id="tokenomics"
                className="neuro-base p-6 lg:p-8 rounded-3xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {/* Hero Section */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="neuro-inset p-3 rounded-2xl">
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent font-nasalization">
                    DAGChain Tokenomics
                  </h2>
                </div>

                {/* Total Supply Highlight */}
                <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Supply</span>
                    </div>
                    <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent font-nasalization mb-2">
                      4,000,000,000
                    </div>
                    <div className="text-lg font-semibold text-gray-700">DGC Tokens</div>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-white rounded-xl border border-gray-100">
                        <div className="text-2xl font-bold text-gray-800">80%</div>
                        <div className="text-xs text-gray-600">Preminted</div>
                        <div className="text-sm font-semibold text-gray-700">3.2B DGC</div>
                        <div className="text-xs text-gray-500 mt-1">Initial distribution & operations</div>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-gray-100">
                        <div className="text-2xl font-bold text-gray-700">20%</div>
                        <div className="text-xs text-gray-600">Mintable</div>
                        <div className="text-sm font-semibold text-gray-700">800M DGC</div>
                        <div className="text-xs text-gray-500 mt-1">Network rewards & incentives</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Supply Distribution Overview */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
                  {/* All Token Allocations */}
                  <div className="neuro-inset p-6 rounded-2xl">
                    <div className="flex items-center space-x-2 mb-4">
                      <h3 className="text-lg font-bold text-gray-800">Complete Token Distribution</h3>
                      <span className="text-sm text-gray-500">(All Allocations)</span>
                    </div>
                    
                    <div className="mb-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                      <p className="text-xs text-gray-600 leading-relaxed">
                        <span className="font-semibold text-gray-800">Preminted (80%)</span> - Tokens created at launch for initial distribution and operations. 
                        <span className="font-semibold text-gray-800 ml-2">Mintable (20%)</span> - Network rewards and incentives minted over time.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {/* Preminted Allocations */}
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                        <div className="text-xs font-semibold text-gray-800 mb-2 uppercase tracking-wide">Preminted (80%)</div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                              <span className="text-sm font-medium text-gray-700">Team</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-gray-800">5%</div>
                              <div className="text-xs text-gray-500">200M DGC</div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                              <span className="text-sm font-medium text-gray-700">Advisor</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-gray-800">2%</div>
                              <div className="text-xs text-gray-500">80M DGC</div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                              <span className="text-sm font-medium text-gray-700">Marketing & Community Airdrop</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-gray-800">6%</div>
                              <div className="text-xs text-gray-500">240M DGC</div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                              <span className="text-sm font-medium text-gray-700">Ecosystem Growth/ Grants</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-gray-800">5%</div>
                              <div className="text-xs text-gray-500">200M DGC</div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                              <span className="text-sm font-medium text-gray-700">Contingency Reserves</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-gray-800">8%</div>
                              <div className="text-xs text-gray-500">320M DGC</div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                              <span className="text-sm font-medium text-gray-700">Scalable Growth</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-gray-800">2%</div>
                              <div className="text-xs text-gray-500">80M DGC</div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                              <span className="text-sm font-medium text-gray-700">Private Sale</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-gray-800">40%</div>
                              <div className="text-xs text-gray-500">1.6B DGC</div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                              <span className="text-sm font-medium text-gray-700">DEX Liquidity</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-gray-800">2%</div>
                              <div className="text-xs text-gray-500">80M DGC</div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                              <span className="text-sm font-medium text-gray-700">Storage Node</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-gray-800">10%</div>
                              <div className="text-xs text-gray-500">400M DGC</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mintable Rewards */}
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                        <div className="text-xs font-semibold text-gray-800 mb-2 uppercase tracking-wide">Mintable (20%)</div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                              <span className="text-sm font-medium text-gray-700">Validator Node</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-gray-800">20%</div>
                              <div className="text-xs text-gray-500">800M DGC</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Chart Container */}
                  <div className="neuro-inset p-6 rounded-2xl">
                    <div className="flex items-center space-x-2 mb-4">
                      <h3 className="text-lg font-bold text-gray-800">Interactive Distribution Chart</h3>
                      <span className="text-sm text-gray-500">(Click to Explore)</span>
                    </div>
                    
                    {/* Interactive Donut Chart with Click Animation */}
                    <div className="relative h-[600px] mb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] overflow-hidden">
                      <div className="w-full h-full p-1">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={preminedData}
                              cx="50%"
                              cy="50%"
                              innerRadius={120}
                              outerRadius={220}
                              paddingAngle={2}
                              dataKey="value"
                              stroke="#ffffff"
                              strokeWidth={2}
                              onClick={(data, index) => {
                                setActiveIndex(activeIndex === index ? null : index);
                              }}
                              onMouseEnter={(data, index) => {
                                if (activeIndex === null) {
                                  // Only show hover effect if no segment is selected
                                  const cells = document.querySelectorAll(`[data-index="${index}"]`);
                                  cells.forEach(cell => {
                                    (cell as HTMLElement).style.filter = 'brightness(1.1)';
                                  });
                                }
                              }}
                              onMouseLeave={(data, index) => {
                                if (activeIndex === null) {
                                  const cells = document.querySelectorAll(`[data-index="${index}"]`);
                                  cells.forEach(cell => {
                                    (cell as HTMLElement).style.filter = 'brightness(1)';
                                  });
                                }
                              }}
                            >
                              {preminedData.map((entry, index) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={entry.color}
                                  data-index={index}
                                  style={{
                                    filter: activeIndex === index ? 'brightness(1.2) drop-shadow(0 8px 25px rgba(0,0,0,0.15))' : 'brightness(1)',
                                    transform: activeIndex === index ? 'scale(1.08)' : 'scale(1)',
                                    transformOrigin: 'center',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'pointer'
                                  }}
                                  stroke={activeIndex === index ? entry.color : '#ffffff'}
                                  strokeWidth={activeIndex === index ? 4 : 2}
                                />
                              ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                          </PieChart>
                        </ResponsiveContainer>
                        
                        {/* Center text - shows selected segment info or total */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="text-center transition-all duration-300 ease-in-out">
                            {activeIndex !== null ? (
                              <div className="animate-fade-in">
                                <div className="text-3xl font-bold mb-1 text-gray-900">
                                  {preminedData[activeIndex].value}%
                                </div>
                                <div className="text-base text-gray-700 font-semibold mb-1">
                                  {preminedData[activeIndex].name}
                                </div>
                                <div className="text-sm text-gray-500 font-medium">
                                  {preminedData[activeIndex].tokens}
                                </div>
                                
                              </div>
                            ) : (
                              <div className="animate-fade-in">
                                <div className="text-2xl font-bold text-gray-800 mb-1">4.0B</div>
                                <div className="text-sm text-gray-600 font-medium mb-1">Total DGC</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-600 leading-relaxed">
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detailed Allocation Tables */}
                <div className="grid grid-cols-1 gap-8 mb-8">
                  {/* Pre-Mined Allocations Table */}
                  <div className="neuro-inset p-6 rounded-2xl">
                    <div className="flex items-center space-x-2 mb-4">
                      <h3 className="text-lg font-bold text-gray-800">Preminted Allocation (80%)</h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-2 font-semibold text-gray-700">Allocation</th>
                            <th className="text-center py-3 px-2 font-semibold text-gray-700">% of Supply</th>
                            <th className="text-center py-3 px-2 font-semibold text-gray-700">Tokens (DGC)</th>
                            <th className="text-left py-3 px-2 font-semibold text-gray-700">Vesting Schedule</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                <span className="font-medium text-gray-800">Team</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">Long-term alignment of founding team</div>
                            </td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">5%</td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">200,000,000</td>
                            <td className="py-3 px-2 text-xs text-gray-600">1-year cliff, then linear over 4 years</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                <span className="font-medium text-gray-800">Advisor</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">Strategic guidance from AI, Web3, enterprise</div>
                            </td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">2%</td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">80,000,000</td>
                            <td className="py-3 px-2 text-xs text-gray-600">6-month cliff, then linear over 2 years</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                <span className="font-medium text-gray-800">Marketing & Community Airdrop</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">Early Testnet users, contributors, AI creators</div>
                            </td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">6%</td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">240,000,000</td>
                            <td className="py-3 px-2 text-xs text-gray-600">Fair distribution and broad participation</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                <span className="font-medium text-gray-800">Ecosystem Growth/ Grants</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">For R&D, grants, partnerships, and ecosystem expansion</div>
                            </td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">5%</td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">200,000,000</td>
                            <td className="py-3 px-2 text-xs text-gray-600">Via governance over time</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                <span className="font-medium text-gray-800">Contingency Reserves</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">Treasury-managed, time-locked</div>
                            </td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">8%</td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">320,000,000</td>
                            <td className="py-3 px-2 text-xs text-gray-600">Buffer for expenses, listings, emergencies</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                <span className="font-medium text-gray-800">Scalable Growth</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">Strategic expansion and scaling initiatives</div>
                            </td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">2%</td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">80,000,000</td>
                            <td className="py-3 px-2 text-xs text-gray-600">Future-proofing ecosystem growth</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                <span className="font-medium text-gray-800">Private Sale</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">Strategic VCs, early backers, ecosystem partners</div>
                            </td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">40%</td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">1,600,000,000</td>
                            <td className="py-3 px-2 text-xs text-gray-600">TBD</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                <span className="font-medium text-gray-800">DEX Liquidity</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">DEX + CEX liquidity pools at launch</div>
                            </td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">2%</td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">80,000,000</td>
                            <td className="py-3 px-2 text-xs text-gray-600">Healthy token trading and user access</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                <span className="font-medium text-gray-800">Storage Node</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">Incentivizes storage node operators</div>
                            </td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">10%</td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">400,000,000</td>
                            <td className="py-3 px-2 text-xs text-gray-600">Decentralized storage infrastructure</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Mined Supply Table */}
                  <div className="neuro-inset p-6 rounded-2xl">
                    <div className="flex items-center space-x-2 mb-4">
                      <h3 className="text-lg font-bold text-gray-800">Mintable Rewards (20%)</h3>
                      <span className="text-sm text-gray-500">Minted over 10–12 years by ~50,000 nodes</span>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-2 font-semibold text-gray-700">Allocation</th>
                            <th className="text-center py-3 px-2 font-semibold text-gray-700">% of Supply</th>
                            <th className="text-center py-3 px-2 font-semibold text-gray-700">Tokens (DGC)</th>
                            <th className="text-left py-3 px-2 font-semibold text-gray-700">Distribution Method</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                <span className="font-medium text-gray-800">Validator Node</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">Incentivizes node uptime & validation</div>
                            </td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">20%</td>
                            <td className="py-3 px-2 text-center font-bold text-gray-800">800,000,000</td>
                            <td className="py-3 px-2 text-xs text-gray-600">Higher early emissions, declining curve</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Emission Model */}
                <div className="neuro-inset p-6 rounded-2xl mb-8">
                  <div className="flex items-center space-x-2 mb-6">
                    <h3 className="text-lg font-bold text-gray-800">Emission Model & Timeline</h3>
                    <span className="text-sm text-gray-500">Minted over 10–12 years with declining curve</span>
                  </div>

                  {/* Timeline Visualization */}
                  <div className="mb-6">
                    <div className="relative">
                      {/* Timeline Line */}
                     
                      
                      {/* Timeline Points */}
                      <div className="relative flex justify-between items-start">
                        {/* Year 0-3 */}
                        <div className="flex flex-col items-center text-center w-1/4">
                          <div className="w-4 h-4 bg-gray-500 rounded-full border-4 border-white shadow-lg mb-2"></div>
                          <div className="text-sm font-bold text-gray-800">Years 0-3</div>
                          <div className="text-xs text-gray-600 mt-1">High Rewards</div>
                          <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                            <div className="text-xs font-semibold text-gray-800">1.2B DGC</div>
                            <div className="text-xs text-gray-600">50% of mintable</div>
                          </div>
                        </div>
                        
                        {/* Year 3-6 */}
                        <div className="flex flex-col items-center text-center w-1/4">
                          <div className="w-4 h-4 bg-gray-500 rounded-full border-4 border-white shadow-lg mb-2"></div>
                          <div className="text-sm font-bold text-gray-800">Years 3-6</div>
                          <div className="text-xs text-gray-600 mt-1">Declining Curve</div>
                          <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                            <div className="text-xs font-semibold text-gray-800">600M DGC</div>
                            <div className="text-xs text-gray-600">25% of mintable</div>
                          </div>
                        </div>
                        
                        {/* Year 6-9 */}
                        <div className="flex flex-col items-center text-center w-1/4">
                          <div className="w-4 h-4 bg-gray-500 rounded-full border-4 border-white shadow-lg mb-2"></div>
                          <div className="text-sm font-bold text-gray-800">Years 6-9</div>
                          <div className="text-xs text-gray-600 mt-1">Lower Emissions</div>
                          <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                            <div className="text-xs font-semibold text-gray-800">400M DGC</div>
                            <div className="text-xs text-gray-600">16.7% of mintable</div>
                          </div>
                        </div>
                        
                        {/* Year 9-12 */}
                        <div className="flex flex-col items-center text-center w-1/4">
                          <div className="w-4 h-4 bg-gray-500 rounded-full border-4 border-white shadow-lg mb-2"></div>
                          <div className="text-sm font-bold text-gray-800">Years 9-12</div>
                          <div className="text-xs text-gray-600 mt-1">Final Phase</div>
                          <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="text-xs font-semibold text-gray-700">200M DGC</div>
                            <div className="text-xs text-gray-600">Remaining supply</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Emission Details */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-semibold text-gray-800">Node Rewards</span>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">Incentivizes network security & decentralization</div>
                      <div className="text-sm font-bold text-gray-800">Community-owned blockchain</div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-semibold text-gray-800">Staking Rewards</span>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">Encourages liquidity locking</div>
                      <div className="text-sm font-bold text-gray-800">Beyond direct validators</div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-semibold text-gray-800">Ecosystem Fund</span>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">AI-native projects, hackathons, integrations</div>
                      <div className="text-sm font-bold text-gray-800">Fuels ecosystem growth</div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-semibold text-gray-800">Community Airdrops</span>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">Early Testnet users, contributors, AI creators</div>
                      <div className="text-sm font-bold text-gray-800">Rewards contributors</div>
                    </div>
                  </div>
                </div>

                {/* DGCUtility Showcase */}
                <div className="neuro-inset p-6 rounded-2xl mb-8">
                  <div className="flex items-center space-x-2 mb-6">
                    <h3 className="text-lg font-bold text-gray-800">DGCToken Utility</h3>
                    <span className="text-sm text-gray-500">Multi-faceted ecosystem utility</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {/* Gas Fees */}
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-800">Gas Fees</h4>
                          <div className="text-xs text-gray-600">Network Operations</div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        All dApps and Ai Projects protocols built on DAGChain consume DGCas gas for transactions and smart contract execution.
                      </p>
                    </div>

                    {/* Mining Rewards */}
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-800">Mining Rewards</h4>
                          <div className="text-xs text-gray-600">Network Security</div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Incentivizes 50,000 miners to secure the network through proof-of-work consensus and block validation.
                      </p>
                    </div>

                    {/* Governance DAO */}
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-800">Governance DAO</h4>
                          <div className="text-xs text-gray-600">Protocol Decisions</div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        On-chain proposals to adjust mining difficulty, emission schedules, and treasury usage through democratic voting.
                      </p>
                    </div>

                    {/* Developer Incentives */}
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-800">Developer Incentives</h4>
                          <div className="text-xs text-gray-600">Ecosystem Growth</div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Funded automatically from mining emissions to keep the ecosystem thriving with grants and hackathons.
                      </p>
                    </div>

                    {/* Staking & Validator Rewards */}
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-800">Staking & Validators</h4>
                          <div className="text-xs text-gray-600">Network Participation</div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Validators and delegators earn staking incentives for participating in network consensus and security.
                      </p>
                    </div>

                    {/* Ai Projects Onboarding */}
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-800">Ai Projects Onboarding</h4>
                          <div className="text-xs text-gray-600">Asset Tokenization</div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        DGC required to tokenize and deploy real-world assets on-chain, enabling seamless asset digitization.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Narrative Edge - Unique Positioning */}
                <div className="neuro-inset p-6 rounded-2xl mb-8 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 shadow-[inset_8px_8px_16px_rgba(163,177,198,0.15),inset_-8px_-8px_16px_rgba(255,255,255,0.8)]">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="p-2 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-lg">
                    </div>
                    
                    <span className="text-sm text-gray-800 font-medium">Community First-Mined L2</span>
                  </div>

                  <div className="space-y-6">
                    {/* Main Narrative */}
                    <div className="p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] shadow-lg">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-br from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full flex-shrink-0">
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-800 mb-3">
                            Unlike Most L2s That Are Fully Pre-Mined & VC-Heavy
                          </h4>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            DAGChain becomes the <span className="font-bold text-gray-800">first Layer-2 blockchain</span> where the 
                            <span className="font-bold text-gray-800"> majority of supply (50%) is mined by the validator Nodes</span>, 
                            aligning closer with Bitcoin's ethos but optimized for Ai Projects + developer-centric utility.
                          </p>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Community-first approach ensures true decentralization</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Comparison Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Traditional L2s */}
                      <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-2 bg-gray-100 rounded-lg">
                          </div>
                          <h4 className="text-base font-bold text-gray-800">Traditional L2s</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                            <span>90-100% pre-mined tokens</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                            <span>Heavy VC control & centralization</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                            <span>Limited community participation</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                            <span>Token distribution favors insiders</span>
                          </li>
                        </ul>
                      </div>

                      {/* DAGChain Advantage */}
                      <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-2 bg-gray-100 rounded-lg">
                          </div>
                          <h4 className="text-base font-bold text-gray-800">DAGChain Advantage</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-800">
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                            <span>50% validator Nodes - mined supply</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                            <span>50,000 miners securing network</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                            <span>Bitcoin-style emission model</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                            <span>Ai Projects-optimized infrastructure</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Distribution Summary */}
                    <div className="p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                      <h4 className="text-base font-bold text-gray-800 mb-4 flex items-center space-x-2">
                        <span>Distribution at a Glance</span>
                      </h4>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                          <span className="text-gray-700">
                            <span className="font-bold">Pre-Mined (10%)</span> → Ensures Core Team, Dev team and Advisors sustainability
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                          <span className="text-gray-700">
                            <span className="font-bold">Mintable (90%)</span> → Ensures long-term decentralization, miner participation, and community alignment
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.section>

              {/* Placeholder sections for remaining content */}
              {sections.slice(5).filter(section => section.id !== 'nodes' && section.id !== 'tokenomics').map((section, index) => {
                // Handle Roadmap section with design from main landing page
                if (section.id === 'roadmap') {
                  const [activePhase, setActivePhase] = React.useState(0);

                  const roadmapData = [
                    {
                      phase: "Foundation",
                      period: "Oct - Dec 2025",
                      milestones: [
                        {
                          month: "Oct 2025",
                          title: "Concept Validation",
                          status: "planning",
                          highlights: [
                            "Brand identity finalized → DAGChain.network hub",
                            "Research on existing L2 limitations completed",
                            "Whitepaper drafted with AI-native primitives",
                            "Strategic advisor discussions initiated"
                          ]
                        },
                        {
                          month: "Nov 2025", 
                          title: "Architecture Design",
                          status: "planning",
                          highlights: [
                            "Ethereum fork baseline setup",
                            "Rollup design aligned with Ethereum settlement",
                            "Smart contract security review",
                            "Developer workflow pipeline established"
                          ]
                        },
                        {
                          month: "Dec 2025",
                          title: "Consensus Finalization", 
                          status: "planning",
                          highlights: [
                            "PoS consensus parameters finalized",
                            "Devnet environment launched",
                            "Tokenomics framework tested",
                            "Smart contracts moved to audit cycle"
                          ]
                        },
                        {
                          month: "Oct 2025 - Aug 2026",
                          title: "Node Key Sale & Validator Onboarding",
                          status: "planning",
                          highlights: [
                            "Node Key Sale: Onboarding 10k Node validators for TestNet",
                            "Node Key Pricing: Phased from $750 - $1500",
                            "Validator Requirements: Minimum hardware specs published",
                            "Early Validator Incentives: Bonus rewards for first 1000 nodes"
                          ]
                        }
                      ]
                    },
                    {
                      phase: "Launch",
                      period: "Feb - May 2026", 
                      milestones: [
                        {
                          month: "Feb 2026",
                          title: "Public Testnet Launch",
                          status: "development",
                          highlights: [
                            "Explorer, wallet UI, faucet go live",
                            "Testnet tokens distributed to developers",
                            "Developer documentation published",
                            "AI builders onboarding campaign"
                          ]
                        },
                        {
                          month: "Mar 2026",
                          title: "Agent Registry Alpha",
                          status: "development", 
                          highlights: [
                            "AI Agent Identity System launched",
                            "Basic reputation system introduced",
                            "First AI Agent Builders hackathon",
                            "Research partnerships with AI tools"
                          ]
                        },
                        {
                          month: "Apr 2026",
                          title: "Provenance Stamp Prototype",
                          status: "development",
                          highlights: [
                            "Provenance framework for AI assets",
                            "IPFS/Arweave integration",
                            "Creator verification workflows",
                            "Content marketplace pilots"
                          ]
                        },
                        {
                          month: "May 2026",
                          title: "Micro-Payment Rails",
                          status: "development",
                          highlights: [
                            "Sub-cent AI-to-AI transactions",
                            "Streaming payment prototype",
                            "Multi-agent workflow simulations", 
                            "Decentralized compute partnerships"
                          ]
                        }
                      ]
                    },
                    {
                      phase: "Growth",
                      period: "June - Sep 2026",
                      milestones: [
                        {
                          month: "June 2026",
                          title: "SDK Alpha Release",
                          status: "upcoming",
                          highlights: [
                            "SDK for no-code platforms released",
                            "Agent-to-chain API documentation",
                            "Wallet abstraction support",
                            "Developer feedback integration"
                          ]
                        },
                        {
                          month: "Jul 2026", 
                          title: "Early Integrations",
                          status: "upcoming",
                          highlights: [
                            "First AI-native projects deployed",
                            "Provenance demos showcased",
                            "Real-world micro-payment testing",
                            "Ecosystem grant selections"
                          ]
                        },
                        {
                          month: "Aug 2026",
                          title: "DevHub & Hackathons", 
                          status: "upcoming",
                          highlights: [
                            "DAGChain DevHub launched",
                            "Global hackathon announced",
                            "$500K ecosystem grants",
                            "Community governance experiments"
                          ]
                        },
                        {
                          month: "Sep 2026",
                          title: "Mainnet Beta Launch",
                          status: "upcoming", 
                          highlights: [
                            "Mainnet Beta with validator staking",
                            "$DGC token activated",
                            "5K+ validators targeted",
                            "Genesis governance council"
                          ]
                        }
                      ]
                    },
                    {
                      phase: "Scale",
                      period: "Sep 2026 - 2027+",
                      milestones: [
                        {
                          month: "Sep-Dec 2026",
                          title: "Ecosystem Expansion",
                          status: "future",
                          highlights: [
                            "Provenance Marketplaces launched",
                            "Agent Discovery Service deployed", 
                            "Enterprise pilots initiated",
                            "Tier-1 exchange listings"
                          ]
                        },
                        {
                          month: "2027+",
                          title: "Global Expansion", 
                          status: "future",
                          highlights: [
                            "Cross-chain interoperability",
                            "Enterprise AI integration",
                            "50K+ global node network",
                            "Default AI economy layer"
                          ]
                        }
                      ]
                    }
                  ];

                  const getStatusIcon = (status: string) => {
                    switch (status) {
                      case 'planning': return Clock
                      case 'development': return Target
                      case 'upcoming': return Calendar
                      case 'future': return CheckCircle
                      default: return Clock
                    }
                  };

                  return (
                    <motion.section 
                      key={section.id}
                      id={section.id}
                      className="neuro-base p-6 lg:p-8 rounded-3xl"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      {/* Section Header */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                      >
                        <div className="bg-white p-3 shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200 rounded-2xl inline-block mb-8">
                          <span className="text-sm font-semibold text-gray-700 tracking-wider uppercase">ROADMAP</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-nasalization leading-tight">
                          Development Timeline
                        </h2>

                        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                          Our strategic roadmap from concept to global AI economy infrastructure, with clear milestones and deliverables.
                        </p>
                      </motion.div>

                      {/* Phase Navigation */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-4 mb-12"
                      >
                        {roadmapData.map((phase, index) => (
                          <motion.button
                            key={index}
                            onClick={() => setActivePhase(index)}
                            className={`px-6 py-3 font-medium transition-all duration-300 rounded-2xl ${
                              activePhase === index
                                ? 'bg-white shadow-[inset_-8px_-8px_16px_rgba(255,255,255,0.7),inset_8px_8px_16px_rgba(163,177,198,0.3)] border border-gray-200 text-gray-900'
                                : 'bg-gray-50 shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] hover:shadow-[8px_8px_16px_rgba(163,177,198,0.4),-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200 text-gray-700'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="text-lg font-bold font-nasalization">{phase.phase}</div>
                            <div className="text-sm opacity-80">{phase.period}</div>
                          </motion.button>
                        ))}
                      </motion.div>

                      {/* Active Phase Content */}
                      <motion.div
                        key={activePhase}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-8 shadow-[30px_30px_60px_rgba(163,177,198,0.4),-30px_-30px_60px_rgba(255,255,255,0.9)] border border-gray-200 rounded-3xl mb-12"
                      >
                        <div className="text-center mb-8">
                          <h3 className="text-3xl font-bold text-gray-900 mb-2 font-nasalization">
                            {roadmapData[activePhase].phase} Phase
                          </h3>
                          <p className="text-xl text-gray-600">
                            {roadmapData[activePhase].period}
                          </p>
                        </div>

                        {/* Milestones Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                          {roadmapData[activePhase].milestones.map((milestone, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              className="bg-gray-50 p-6 shadow-[inset_12px_12px_24px_rgba(163,177,198,0.2),inset_-12px_-12px_24px_rgba(255,255,255,0.8)] border border-gray-200 rounded-2xl"
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-[6px_6px_12px_rgba(163,177,198,0.3),-6px_-6px_12px_rgba(255,255,255,0.9)] border border-gray-200 flex items-center justify-center">
                                  {React.createElement(getStatusIcon(milestone.status), { className: "w-6 h-6 text-gray-700" })}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-600">{milestone.month}</div>
                                  <h4 className="text-lg font-bold text-gray-900 font-nasalization">{milestone.title}</h4>
                                </div>
                              </div>

                              <div className="space-y-2">
                                {milestone.highlights.map((highlight, highlightIndex) => (
                                  <div
                                    key={highlightIndex}
                                    className="bg-white p-3 rounded-xl shadow-[4px_4px_8px_rgba(163,177,198,0.3),-4px_-4px_8px_rgba(255,255,255,0.9)] border border-gray-200"
                                  >
                                    <span className="text-sm text-gray-700 font-medium">{highlight}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Status Badge */}
                              <div className="mt-4 flex justify-end">
                                <span className="px-3 py-1 text-xs font-semibold bg-white shadow-[4px_4px_8px_rgba(163,177,198,0.3),-4px_-4px_8px_rgba(255,255,255,0.9)] border border-gray-200 rounded-full text-gray-700 capitalize">
                                  {milestone.status}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Timeline Overview */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 shadow-[24px_24px_48px_rgba(163,177,198,0.4),-24px_-24px_48px_rgba(255,255,255,0.9)] border border-gray-200 rounded-3xl"
                      >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center font-nasalization">
                          Complete Timeline Overview
                        </h3>

                        <div className="grid md:grid-cols-4 gap-4">
                          {roadmapData.map((phase, index) => (
                            <motion.div
                              key={index}
                              onClick={() => setActivePhase(index)}
                              className={`p-4 cursor-pointer transition-all duration-300 rounded-2xl text-center ${
                                activePhase === index
                                  ? 'bg-gray-50 shadow-[inset_-6px_-6px_12px_rgba(255,255,255,0.7),inset_6px_6px_12px_rgba(163,177,198,0.3)] border border-gray-300'
                                  : 'bg-gray-100 shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[6px_6px_12px_rgba(163,177,198,0.4),-6px_-6px_12px_rgba(255,255,255,0.9)] border border-gray-200'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="text-lg font-bold text-gray-900 mb-1 font-nasalization">{phase.phase}</div>
                              <div className="text-sm text-gray-600 mb-2">{phase.period}</div>
                              <div className="text-xs text-gray-500">{phase.milestones.length} milestones</div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                    </motion.section>
                  );
                }

                // Handle Appendix section with comprehensive technical content
                if (section.id === 'appendix') {
                  return (
                    <motion.section 
                      key={section.id}
                      id={section.id}
                      className="neuro-base p-6 lg:p-8 rounded-3xl"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-3 mb-8">
                        <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent font-nasalization">
                          Appendix: Mathematical Proofs, Code, Full API Descriptions
                        </h2>
                      </div>
                      
                      <motion.p 
                        className="text-lg text-gray-600 mb-12 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        This appendix provides the foundational mathematical proofs, reference code examples, detailed API specifications, and security guidelines for the DAGChain blockchain. The contents below are critical for developers, auditors, and researchers aiming to understand or contribute to the technical integrity and extensibility of the DAGChain ecosystem.
                      </motion.p>

                      {/* Section A: State Transition Proofs */}
                      <motion.div 
                        className="mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <div className="neuro-base p-8 rounded-2xl">
                          <h3 className="text-2xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent font-nasalization">
                            A. State Transition Proofs
                          </h3>
                          
                          <p className="text-gray-700 mb-6 leading-relaxed">
                            DAGChain's core blockchain functionality hinges on the deterministic state transition function (STF), mapping current states and inputs to new states in a secure and verifiable manner.
                          </p>

                          <div className="space-y-8">
                            {/* Mathematical Definitions */}
                            <div className="neuro-inset p-6 rounded-xl">
                              <h4 className="text-lg font-semibold text-gray-800 mb-4">Mathematical Definitions</h4>
                              <div className="space-y-4 text-sm text-gray-700">
                                <div className="flex items-center space-x-4">
                                  <span className="font-mono bg-gray-100 px-3 py-1 rounded">S<sub>t</sub></span>
                                  <span>denote the global state at time t</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <span className="font-mono bg-gray-100 px-3 py-1 rounded">T = {`{t₁, t₂, ..., tₙ}`}</span>
                                  <span>represent an ordered batch of transactions</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <span className="font-mono bg-gray-100 px-3 py-1 rounded">S<sub>t+1</sub> = STF(S<sub>t</sub>, T)</span>
                                  <span>signify the post-state after transactions are applied</span>
                                </div>
                              </div>
                            </div>

                            {/* Deterministic Execution Proof */}
                            <div className="neuro-inset p-6 rounded-xl">
                              <h4 className="text-lg font-semibold text-gray-800 mb-4">Deterministic Execution Proof</h4>
                              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4">
                                ∀S<sub>t</sub>, T, S'<sub>t</sub> : STF(S<sub>t</sub>, T) = S'<sub>t</sub> ⟹ unique(S'<sub>t</sub>)
                              </div>
                              <p className="text-sm text-gray-700">
                                This property guarantees network consistency—every honest node applying the same transactions arrives at an identical state root S'<sub>t</sub>.
                              </p>
                            </div>

                            {/* Composability */}
                            <div className="neuro-inset p-6 rounded-xl">
                              <h4 className="text-lg font-semibold text-gray-800 mb-4">Composability of STF</h4>
                              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4">
                                STF(STF(S<sub>t</sub>, T₁), T₂) = STF(S<sub>t</sub>, T₁ ∪ T₂)
                              </div>
                              <p className="text-sm text-gray-700">
                                Through induction, this ensures that transaction lists can be partitioned and processed out of order if the combined order is preserved, enabling parallelized execution frameworks.
                              </p>
                            </div>

                            {/* Merkle Root Commitment */}
                            <div className="neuro-inset p-6 rounded-xl">
                              <h4 className="text-lg font-semibold text-gray-800 mb-4">Merkle Root Commitment</h4>
                              <p className="text-sm text-gray-700 mb-4">
                                Each S<sub>t</sub> is compactly represented by a Merkle root H(S<sub>t</sub>). State correctness is verified using Merkle proofs π satisfying:
                              </p>
                              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                                VerifyProof(H(S<sub>t</sub>), x, v, π) = True
                              </div>
                              <p className="text-sm text-gray-700 mt-4">
                                where x denotes a state key, and v the observed value.
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Section B: ERC-3643 Implementation */}
                      <motion.div 
                        className="mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <div className="neuro-base p-8 rounded-2xl">
                          <h3 className="text-2xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent font-nasalization">
                            B. Full ERC-3643 Implementation Example
                          </h3>
                          
                          <p className="text-gray-700 mb-6 leading-relaxed">
                            The ERC-3643 standard facilitates permissioned token issuance for Ai Projectss with embedded compliance. Below is a Solidity excerpt demonstrating critical interface functions and compliance enforcement hooks:
                          </p>

                          <div className="neuro-inset p-6 rounded-xl">
                            <div className="bg-white text-gray-800 border border-gray-200 p-6 rounded-lg overflow-x-auto">
                              <pre className="text-sm leading-relaxed">
{`pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface ICompliance {
    function isTransferAllowed(address from, address to, uint256 amount) 
        external view returns (bool);
}

contract DAGChainERC3643 is ERC20 {
    ICompliance public compliance;
    
    mapping(address => bool) public issuers;
    address public owner;
    
    modifier onlyIssuer() {
        require(issuers[msg.sender], "Only issuers allowed");
        _;
    }
    
    constructor(address _compliance) ERC20("DAGChain Ai Projects Token", "AQT-Ai Projects") {
        compliance = ICompliance(_compliance);
        owner = msg.sender;
        issuers[msg.sender] = true;
    }
    
    function setIssuer(address issuer, bool status) external {
        require(msg.sender == owner, "Only owner");
        issuers[issuer] = status;
    }
    
    function _beforeTokenTransfer(address from, address to, uint256 amount) 
        internal override {
        require(compliance.isTransferAllowed(from, to, amount), 
                "Transfer not allowed by compliance");
        super._beforeTokenTransfer(from, to, amount);
    }
    
    function mint(address to, uint256 amount) external onlyIssuer {
        _mint(to, amount);
    }
    
    function burn(address from, uint256 amount) external onlyIssuer {
        _burn(from, amount);
    }
}`}
                              </pre>
                            </div>
                            <p className="text-sm text-gray-700 mt-4">
                              This implementation ensures every transfer respects legal constraints enforced by a compliance contract.
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Section C: Fraud Proof Logic */}
                      <motion.div 
                        className="mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div className="neuro-base p-8 rounded-2xl">
                          <h3 className="text-2xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent font-nasalization">
                            C. Fraud Proof Sample Challenge Logic
                          </h3>
                          
                          <p className="text-gray-700 mb-6 leading-relaxed">
                            In optimistic rollups, fraud proofs verify invalid state commitments. The challenge protocol involves:
                          </p>

                          <div className="space-y-6">
                            {/* Challenge Steps */}
                            <div className="neuro-inset p-6 rounded-xl">
                              <h4 className="text-lg font-semibold text-gray-800 mb-4">Challenge Protocol Steps</h4>
                              <ol className="space-y-3 text-sm text-gray-700">
                                <li className="flex items-start space-x-3">
                                  <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
                                  <span>Challenger submits a FraudProof transaction referencing suspect block B<sub>i</sub> and post-state root S'<sub>i</sub>.</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                  <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
                                  <span>The smart contract executes a byte-by-byte or opcode-level replay of transactions comparing:</span>
                                </li>
                                <li className="ml-9">
                                  <div className="bg-gray-50 p-3 rounded font-mono text-xs">
                                    STF(S<sub>i-1</sub>, B<sub>i</sub>) =? S'<sub>i</sub>
                                  </div>
                                </li>
                                <li className="flex items-start space-x-3">
                                  <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
                                  <span>If mismatch detected:</span>
                                </li>
                                <li className="ml-9 space-y-2">
                                  <div>• Slash malicious sequencer's stake: s<sub>seq</sub> = s<sub>seq</sub> - Δs</div>
                                  <div>• Reward challenger proportionally</div>
                                  <div>• Roll back or invalidate fraudulent block</div>
                                </li>
                              </ol>
                            </div>

                            {/* Code Example */}
                            <div className="neuro-inset p-6 rounded-xl">
                              <h4 className="text-lg font-semibold text-gray-800 mb-4">Example Pseudocode</h4>
                              <div className="bg-white text-gray-800 border border-gray-200 p-6 rounded-lg overflow-x-auto">
                                <pre className="text-sm leading-relaxed">
{`function submitFraudProof(uint256 blockNumber, bytes calldata proofData) external {
    State preState = getState(blockNumber - 1);
    Transactions txns = getTransactions(blockNumber);
    State calculated = runSTF(preState, txns);
    State committed = getCommittedState(blockNumber);
    
    require(calculated != committed, "No fraud detected");
    
    slashSequencer(blockNumber);
    rewardChallenger(msg.sender);
    invalidateBlock(blockNumber);
}`}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Section D: Security Audit Checklist */}
                      <motion.div 
                        className="mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <div className="neuro-base p-8 rounded-2xl">
                          <h3 className="text-2xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                            D. Security Audit Checklist
                          </h3>
                          
                          <p className="text-gray-700 mb-6 leading-relaxed">
                            DAGChain's security model follows rigorous processes including:
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div 
                              className="neuro-inset p-6 rounded-xl"
                              whileHover={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="flex items-center space-x-3 mb-4">
                                <div className="w-3 h-3 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                                <h4 className="text-lg font-semibold text-gray-800">Code Hygiene</h4>
                              </div>
                              <p className="text-sm text-gray-700">No unused variables, strict visibility modifiers.</p>
                            </motion.div>

                            <motion.div 
                              className="neuro-inset p-6 rounded-xl"
                              whileHover={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="flex items-center space-x-3 mb-4">
                                <div className="w-3 h-3 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                                <h4 className="text-lg font-semibold text-gray-800">Input Validation</h4>
                              </div>
                              <p className="text-sm text-gray-700">Bounds checking for arrays, overflow-safe math.</p>
                            </motion.div>

                            <motion.div 
                              className="neuro-inset p-6 rounded-xl"
                              whileHover={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="flex items-center space-x-3 mb-4">
                                <div className="w-3 h-3 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                                <h4 className="text-lg font-semibold text-gray-800">Access Control</h4>
                              </div>
                              <p className="text-sm text-gray-700">Role-based permissions, multi-signature governance.</p>
                            </motion.div>

                            <motion.div 
                              className="neuro-inset p-6 rounded-xl"
                              whileHover={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="flex items-center space-x-3 mb-4">
                                <div className="w-3 h-3 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                                <h4 className="text-lg font-semibold text-gray-800">Formal Verification</h4>
                              </div>
                              <p className="text-sm text-gray-700">Critical components mathematically proven (STF, Fraud Proof handlers).</p>
                            </motion.div>

                            <motion.div 
                              className="neuro-inset p-6 rounded-xl"
                              whileHover={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="flex items-center space-x-3 mb-4">
                                <div className="w-3 h-3 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                                <h4 className="text-lg font-semibold text-gray-800">Replay Protection</h4>
                              </div>
                              <p className="text-sm text-gray-700">Nonce enforcement per account.</p>
                            </motion.div>

                            <motion.div 
                              className="neuro-inset p-6 rounded-xl"
                              whileHover={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="flex items-center space-x-3 mb-4">
                                <div className="w-3 h-3 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] rounded-full"></div>
                                <h4 className="text-lg font-semibold text-gray-800">Economic Incentives</h4>
                              </div>
                              <p className="text-sm text-gray-700">Slashing mechanisms for malicious nodes.</p>
                            </motion.div>

                            <motion.div 
                              className="neuro-inset p-6 rounded-xl"
                              whileHover={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="flex items-center space-x-3 mb-4">
                                <div className="w-3 h-3 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                                <h4 className="text-lg font-semibold text-gray-800">Oracle Resiliency</h4>
                              </div>
                              <p className="text-sm text-gray-700">Use majority consensus across data providers.</p>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.section>
                  );
                }
                
                // Handle Governance section with comprehensive content
                if (section.id === 'governance') {
                  return (
                    <motion.section 
                      key={section.id}
                      id={section.id}
                      className="neuro-base p-6 lg:p-8 rounded-3xl"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-3 mb-6">
                        <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent font-nasalization">
                          {section.title}
                        </h2>
                      </div>
                      
                      {/* Governance Content */}
                      <div className="prose prose-base max-w-none text-gray-700 leading-relaxed">
                        <div className="mb-8">
                          <h3 className="text-xl font-bold text-gray-800 mb-4">
                            Governance in DAGChain: Empowering the Network's Top Nodes to Shape the Future
                          </h3>
                          <p className="text-sm text-gray-700 mb-4">
                            DAGChain is designed not only as a high-performance Layer 1 blockchain but also as a truly decentralized ecosystem where network participants govern its evolution. To realize this vision, DAGChain will onboard up to 50,000 Node Operators—dedicated, qualified users who run full nodes, validate blocks, and secure the network. Yet within this vast and diverse network, governance rights and decision-making authority will reside with the top 5% of these nodes, carefully selected based on their contribution, stake, and performance metrics. This "elite" cohort forms the decentralized autonomous organization (DAO) responsible for guiding DAGChain's strategic decisions, protocol upgrades, and community initiatives.
                          </p>
                        </div>

                        {/* What is the Governance DAO */}
                        <div className="neuro-base p-6 rounded-2xl mb-6">
                          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                            <span>What is the Governance DAO?</span>
                          </h3>
                          <p className="text-sm text-gray-700 mb-4">
                            The DAO is a decentralized, community-run body that holds the power to propose, debate, and vote on crucial network matters. Unlike traditional centralized governance where a small board or company executives dictate changes, DAGChain's DAO embodies inclusive, meritocratic principles. It empowers its leading node runners—the backbone of the network—to collectively form a democratic, transparent decision-making system with on-chain voting and automated smart contract execution.
                          </p>
                        </div>

                        {/* Why Top 5% Node Operators */}
                        <div className="neuro-base p-6 rounded-2xl mb-6">
                          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                            <span>Why Top 5% Node Operators?</span>
                          </h3>
                          <p className="text-sm text-gray-700 mb-4">
                            Selecting the top 5% of node operators as DAO members strikes a pragmatic balance between:
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="neuro-inset p-4 rounded-xl">
                              <h4 className="text-sm font-semibold text-gray-800 mb-2">Decentralization</h4>
                              <p className="text-xs text-gray-700">Ensuring a broad, globally distributed governance body that reduces risks of centralization or manipulation.</p>
                            </div>
                            <div className="neuro-inset p-4 rounded-xl">
                              <h4 className="text-sm font-semibold text-gray-800 mb-2">Expertise and Reliability</h4>
                              <p className="text-xs text-gray-700">The top performers have proven their technical commitment, uptime, and stake integrity, vital traits to safeguard network upgrades.</p>
                            </div>
                            <div className="neuro-inset p-4 rounded-xl">
                              <h4 className="text-sm font-semibold text-gray-800 mb-2">Scalability of Governance</h4>
                              <p className="text-xs text-gray-700">Limiting governance to this subset optimizes decision-making efficiency while maintaining diverse representation.</p>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-700">
                            Node performance metrics such as uptime, block proposal success, and stake size are algorithmically calculated each governance cycle. This dynamic membership model motivates consistent, high-quality participation.
                          </p>
                        </div>

                        {/* How Does the Governance Process Work */}
                        <div className="neuro-base p-6 rounded-2xl mb-6">
                          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                            <span>How Does the Governance Process Work?</span>
                          </h3>
                          <p className="text-sm text-gray-700 mb-4">
                            DAO members receive governance tokens representing their voting power, weighted by stake and performance reputation. Proposals—including protocol parameter adjustments, security upgrades, or ecosystem funding—can be submitted by any DAO member or community stakeholder but require proposal sponsorship by DAO members.
                          </p>
                          <p className="text-sm text-gray-700 mb-4">
                            Voting employs quadratic voting to prevent power concentration and encourage broad participation. Once a proposal achieves quorum and majority approval, smart contracts automatically execute the changes, ensuring censorship resistance and transparency.
                          </p>
                        </div>

                        {/* The Role of Node Operators */}
                        <div className="neuro-base p-6 rounded-2xl mb-6">
                          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-gray-600 to-gray-800 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-full"></div>
                            <span>The Role of Node Operators in Governance and Network Security</span>
                          </h3>
                          <p className="text-sm text-gray-700 mb-4">
                            Node operators serve dual roles:
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="neuro-inset p-4 rounded-xl">
                              <h4 className="text-sm font-semibold text-gray-800 mb-2">Security Guardians</h4>
                              <p className="text-xs text-gray-700">Running validating nodes that execute and verify transactions, and producing blocks securely.</p>
                            </div>
                            <div className="neuro-inset p-4 rounded-xl">
                              <h4 className="text-sm font-semibold text-gray-800 mb-2">Governance Stewards</h4>
                              <p className="text-xs text-gray-700">Guiding DAGChain's future by voting on upgrades, economic policies, and strategic initiatives.</p>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-700">
                            Their combined technical expertise and economic stake create a robust accountability framework.
                          </p>
                        </div>

                        {/* Conclusion */}
                        <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                          <p className="text-sm text-gray-700 font-medium">
                            DAGChain's governance model ensures that those who contribute most actively to the network's health also steer its future—creating a sustainable, democratic, and transparent platform for building the decentralized economy of tomorrow.
                          </p>
                        </div>
                      </div>
                    </motion.section>
                  );
                }
                
                // Handle other placeholder sections
                return (
                  <motion.section 
                    key={section.id}
                    id={section.id}
                    className="neuro-base p-6 lg:p-8 rounded-3xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent font-nasalization">
                        {section.title}
                      </h2>
                    </div>
                    
                    <div className="prose prose-base max-w-none text-gray-700 leading-relaxed">
                      <p className="text-base text-gray-600 font-medium mb-4">
                        This section is currently under development and will be available in the next version of the whitepaper.
                      </p>
                      <p className="text-sm text-gray-600">
                        Our team is actively working on comprehensive content for {section.title.toLowerCase()}, including detailed technical specifications, implementation strategies, and real-world use cases.
                      </p>
                    </div>
                  </motion.section>
                );
              })}
            </div>

            {/* Closing Section */}
            <motion.section 
              className="mt-24 mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 rounded-3xl" />
                
                <div className="relative p-12 lg:p-16 text-center text-white">
                  <motion.h2 
                    className="text-2xl lg:text-3xl font-black mb-8 leading-tight"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    DAGChain bridges Real and On-Chain Economies.
                    <br />
                    <span className="text-xl lg:text-2xl font-normal opacity-90">
                      Secure. Composable. Intelligent.
                    </span>
                  </motion.h2>

                  <motion.div 
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <button className="px-8 py-4 bg-white text-gray-800 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                      <span>Explore Ecosystem</span>
                    </button>
                    <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                      <span>Join Community</span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
