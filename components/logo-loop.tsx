"use client"

import React from "react"
import { motion } from "framer-motion"
import LogoLoop from "./LogoLoop"
import { 
  SiEthereum, 
  SiChainlink, 
  SiOpenaigym, 
  SiIpfs,
  SiPolygon,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss
} from 'react-icons/si'

export function LogoLoopSection() {
  // Technology and partner logos using react-icons
  const techLogos = [
    { node: <SiEthereum />, title: "Ethereum", href: "https://ethereum.org" },
    { node: <SiPolygon />, title: "Polygon", href: "https://polygon.technology" },
    { node: <SiChainlink />, title: "Chainlink", href: "https://chain.link" },
    { node: <SiOpenaigym />, title: "OpenAI", href: "https://openai.com" },
    { node: <SiIpfs />, title: "IPFS", href: "https://ipfs.tech" },
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  ]

  return (
    <section className="py-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-sm font-light tracking-[0.2em] text-gray-500 uppercase font-mono mb-4">
            Powered by Industry Leaders
          </h3>
          <div className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent max-w-xs mx-auto" />
        </motion.div>

        {/* React Bits Logo Loop */}
        <div style={{ height: '80px', position: 'relative', overflow: 'hidden' }}>
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={40}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Technology partners"
          />
        </div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-500 mt-8 font-light"
        >
          Integrating with the most trusted names in blockchain and AI
        </motion.p>
      </div>
    </section>
  )
}
