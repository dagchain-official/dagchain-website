"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Github,
  FileText,
  Shield,
  Zap,
  Users,
  Globe,
  Heart,
  Code,
  BookOpen,
  MessageCircle,
  Send,
  Package,
} from "lucide-react";

// Social Media Logo Components (reusing from community)
const DiscordLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const XLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const TelegramLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472c-.18 1.898-.962 6.502-1.36 8.627c-.168.9-.499 1.201-.82 1.23c-.696.065-1.225-.46-1.9-.902c-1.056-.693-1.653-1.124-2.678-1.8c-1.185-.78-.417-1.21.258-1.91c.177-.184 3.247-2.977 3.307-3.23c.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345c-.48.33-.913.49-1.302.48c-.428-.008-1.252-.241-1.865-.44c-.752-.245-1.349-.374-1.297-.789c.027-.216.325-.437.893-.663c3.498-1.524 5.83-2.529 6.998-3.014c3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const MediumLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const InstagramLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const YouTubeLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TikTokLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export function Footer() {
  const footerLinks = {
    protocol: [
      { name: "Whitepaper", href: "/whitepaper", icon: FileText },
      { name: "Technology", href: "/#technology", icon: Zap },
      { name: "Tokenomics", href: "/#tokenomics", icon: Shield },
      { name: "Roadmap", href: "/#roadmap", icon: ArrowRight },
      { name: "Security Audits", href: "#", icon: Shield },
    ],
    developers: [
      { name: "Documentation", href: "#", icon: BookOpen },
      // { name: "API Reference", href: "/#developers", icon: Code },
      { name: "GitHub", href: "#", icon: Github },
      { name: "SDK Downloads", href: "#", icon: Package },
      { name: "Testnet", href: "#", icon: Globe },
    ],
    community: [
      {
        name: "Discord",
        href: "https://discord.gg/fKpUQxDdyG",
        icon: DiscordLogo,
      },
      { name: "Twitter", href: "https://x.com/DAGChain_ai", icon: XLogo },
      {
        name: "Telegram",
        href: "https://t.me/DAGChain_network",
        icon: TelegramLogo,
      },
      {
        name: "Medium",
        href: "https://medium.com/@DAGChain",
        icon: MediumLogo,
      },
      { name: "Community Hub", href: "/#community", icon: Users },
    ],
    company: [
      { name: "About Us", href: "/#about", icon: Users },
      { name: "Careers", href: "#", icon: Heart },
      { name: "Media Kit", href: "/media-kit", icon: FileText },
      { name: "Contact", href: "mailto:support@DAGChain.network", icon: Mail },
      { name: "Legal", href: "#", icon: Shield },
    ],
  };

  const socialLinks = [
    {
      name: "Discord",
      icon: DiscordLogo,
      href: "https://discord.gg/fKpUQxDdyG",
      color: "hover:text-gray-700",
    },
    {
      name: "Twitter",
      icon: XLogo,
      href: "https://x.com/dagchain_ai",
      color: "hover:text-gray-700",
    },
    {
      name: "TikTok",
      icon: TikTokLogo,
      href: "https://www.tiktok.com/@dagchain",
      color: "hover:text-gray-800",
    },
    {
      name: "Telegram",
      icon: TelegramLogo,
      href: "https://t.me/dagchain_network",
      color: "hover:text-gray-700",
    },
    {
      name: "Medium",
      icon: MediumLogo,
      href: "https://medium.com/@dagchain",
      color: "hover:text-gray-700",
    },
    {
      name: "Instagram",
      icon: InstagramLogo,
      href: "https://www.instagram.com/dagchain.network/",
      color: "hover:text-gray-700",
    },
    {
      name: "Facebook",
      icon: FacebookLogo,
      href: "https://www.facebook.com/people/DagChain/61584495032870/",
      color: "hover:text-gray-700",
    },
    {
      name: "LinkedIn",
      icon: LinkedInLogo,
      href: "https://www.linkedin.com/company/dag-chain",
      color: "hover:text-gray-700",
    },
    {
      name: "YouTube",
      icon: YouTubeLogo,
      href: "https://www.youtube.com/@dagchain.network",
      color: "hover:text-gray-700",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-12 pb-6">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(107, 114, 128, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(107, 114, 128, 0.05) 1px, transparent 1px)
          `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        {/* Single Container Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-white rounded-2xl p-8 shadow-[16px_16px_32px_rgba(163,177,198,0.3),-16px_-16px_32px_rgba(255,255,255,0.9)] border border-gray-100 max-w-full overflow-hidden"
          style={{
            backgroundImage: "url(/assets/DAGCHAIN_footer.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Main Content Grid */}
          <div className="relative z-10 grid lg:grid-cols-6 gap-8 mb-6">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              {/* Logo */}
              <div className="flex items-center mb-4">
                <img
                  src="/assets/logo-footer-light.webp"
                  alt="DAGChain Logo"
                  width={14} height={'auto'}
                  className="h-14 w-auto"
                />
              </div>

              {/* Description */}
              <p className="text-white/90 mb-4 leading-relaxed font-inter text-sm">
                The first AI-native layer 1 designed for AI agents, creators, and no-code builders.
              </p>

              {/* Contact Information */}
              <div className="space-y-3 mt-6">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-white/80 mt-0.5 flex-shrink-0" />
                  <p className="text-white/80 text-xs font-inter leading-relaxed">
                    10 Elvira Mendez Street, Interseco Building, Panama, Republic of Panama.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-white/80 mt-0.5 flex-shrink-0" />
                  <div className="text-white/80 text-xs font-inter">
                    <div>U.S: +1 (555) 789-0123</div>
                    <div className="mt-1">U.K: +44 (20) 7946-0958</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {/* Protocol */}
              <div>
                <h4 className="font-semibold text-white mb-3 font-sora flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-white" />
                  Protocol
                </h4>
                <ul className="space-y-2">
                  {footerLinks.protocol.map((link, index) => {
                    const IconComponent = link.icon;
                    return (
                      <li key={index}>
                        <a
                          aria-label={link.name}
                          href={link.href}
                          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group font-inter"
                        >
                          <IconComponent className="w-3 h-3 group-hover:scale-110 transition-transform" />
                          <span className="text-xs">{link.name}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Developers */}
              <div>
                <h4 className="font-semibold text-white mb-3 font-sora flex items-center gap-2 text-sm">
                  <Code className="w-4 h-4 text-white" />
                  Developers
                </h4>
                <ul className="space-y-2">
                  {footerLinks.developers.map((link, index) => {
                    const IconComponent = link.icon;
                    return (
                      <li key={index}>
                        <a
                          aria-label={link.name}
                          href={link.href}
                          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group font-inter"
                        >
                          <IconComponent className="w-3 h-3 group-hover:scale-110 transition-transform" />
                          <span className="text-xs">{link.name}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-semibold text-white mb-3 font-sora flex items-center gap-2 text-sm">
                  <Heart className="w-4 h-4 text-white" />
                  Company
                </h4>
                <ul className="space-y-2">
                  {footerLinks.company.map((link, index) => {
                    const IconComponent = link.icon;
                    return (
                      <li key={index}>
                        <a
                          href={link.href}
                          target={
                            link.name === "Media Kit" ? "_blank" : undefined
                          }
                          rel={
                            link.name === "Media Kit"
                              ? "noopener noreferrer"
                              : undefined
                          }
                          aria-label={link.name}
                          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group font-inter"
                        >
                          <IconComponent className="w-3 h-3 group-hover:scale-110 transition-transform" />
                          <span className="text-xs">{link.name}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="relative z-10 border-t border-white/20 pt-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <div className="flex items-center gap-3">
                <div className="text-white/90 font-inter text-sm">
                  © 2025 DAGChain. All rights reserved.
                </div>
                <div className="hidden lg:flex items-center gap-3 text-xs text-white/70">
                  <a href="#" aria-label="PRivacy" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                  <span>•</span>
                  <a href="#" aria-label="Terms" className="hover:text-white transition-colors">
                    Terms
                  </a>
                  <span>•</span>
                  <a href="#" aria-label="Cookies" className="hover:text-white transition-colors">
                    Cookies
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    >
                      <IconComponent className="w-4 h-4" />
                    </motion.a>
                  );
                })}
              </div>

              {/* Made with Love */}
              <div className="flex items-center gap-1">
                <span className="text-white/70 text-xs font-inter">
                  Made with
                </span>
                <Heart className="w-3 h-3 text-white/70 animate-pulse" />
                <span className="text-white/70 text-xs font-inter">
                  for the AI community
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
