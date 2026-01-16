"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Technology", href: "#technology" },
  { name: "Roadmap", href: "#roadmap" },
  { name: "Tokenomics", href: "#tokenomics" },
  { name: "Ecosystem", href: "#ecosystem" },
  // { name: "Developers", href: "#developers" },
  { name: "DAG ARMY", href: "#community" },
  { name: "DAG Node", href: "/dag-node" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarVariants = {
    top: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
    },
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-0"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <img
              src="/assets/logonew.png"
              alt="DAGChain Logo"
              className="h-12 lg:h-16 w-auto"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            {/* Single Glassmorphic Container for All Menu Items */}
            <motion.div
              className="bg-gray-100 rounded-3xl px-2 py-2 shadow-[4px_4px_8px_rgba(163,177,198,0.2),-4px_-4px_8px_rgba(255,255,255,0.8)]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    variants={linkVariants}
                    className="relative text-gray-700 font-medium transition-all duration-300 group px-3 py-2 rounded-xl bg-white shadow-[4px_4px_8px_rgba(163,177,198,0.3),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_4px_rgba(163,177,198,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] active:shadow-[inset_3px_3px_6px_rgba(163,177,198,0.3),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] text-sm hover:bg-gradient-to-r hover:from-[#123CFE] hover:to-[#FFE5F5] hover:text-white"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Connect Wallet Button */}
          <div className="hidden lg:block">
            <Button
              variant="neumorphic"
              size="default"
              className="font-semibold cursor-not-allowed opacity-60"
              disabled
            >
              <Wallet className="w-4 h-4 mr-2" />
              COMING SOON
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.div
              className="bg-gray-100 rounded-2xl shadow-[8px_8px_16px_rgba(163,177,198,0.4),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] transition-all duration-300"
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 rounded-2xl text-gray-700 transition-all duration-300"
                aria-label="Toggle mobile menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6 text-gray-700" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6 text-gray-700" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-[8px_8px_16px_rgba(163,177,198,0.4),-8px_-8px_16px_rgba(255,255,255,0.9)] rounded-b-2xl mx-4 mt-2 z-50"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative block px-4 py-3 text-base font-medium text-gray-700 bg-white shadow-[8px_8px_16px_rgba(163,177,198,0.4),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[inset_6px_6px_12px_rgba(163,177,198,0.3),inset_-6px_-6px_12px_rgba(255,255,255,0.8)] rounded-2xl transition-all duration-300 mx-2 mb-3 group hover:bg-gradient-to-r hover:from-[#123CFE] hover:to-[#FFE5F5] hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <div className="pt-4 pb-2">
                  <Button
                    variant="neumorphic"
                    size="default"
                    className="w-full font-semibold cursor-not-allowed opacity-60"
                    disabled
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    COMING SOON
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
