"use client"

import React from "react"
import { m } from "framer-motion"
import { Download, Palette, Image as ImageIcon, FileText, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MediaKit() {
  const assets = [
    {
      title: "Primary Logo",
      description: "Main DAGChain logo with full branding",
      filename: "DAGChain-logo-primary.png",
      path: "/assets/media-kit/DAGChain-logo-primary.png",
      type: "Logo",
      icon: ImageIcon
    },
    {
      title: "Secondary Logo",
      description: "Alternative DAGChain logo variant",
      filename: "DAGChain-logo-secondary.png",
      path: "/assets/media-kit/DAGChain-logo-secondary.png",
      type: "Logo",
      icon: ImageIcon
    },
    {
      title: "Color Palette",
      description: "Official DAGChain brand colors",
      filename: "DAGChain-color-palette.png",
      path: "/assets/media-kit/DAGChain-color-palette.png",
      type: "Colors",
      icon: Palette
    }
  ]

  const handleDownload = (path: string, filename: string) => {
    const link = document.createElement('a')
    link.href = path
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] transition-all duration-300 text-gray-700 hover:text-gray-900 border border-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </m.div>

        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Icon */}
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 rounded-2xl bg-gray-50 shadow-[16px_16px_32px_rgba(163,177,198,0.3),-16px_-16px_32px_rgba(255,255,255,0.9)] flex items-center justify-center border border-gray-200">
              <FileText className="w-10 h-10 text-gray-800" />
            </div>
          </m.div>

          {/* Title */}
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-4 font-nasalization text-gray-900"
            style={{
              textShadow: '4px 4px 8px rgba(0,0,0,0.1), -2px -2px 4px rgba(255,255,255,0.8)'
            }}
          >
            DAGChain MEDIA KIT
          </m.h1>

          {/* Subtitle */}
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-gray-700 font-semibold mb-3"
          >
            Official Brand Assets & Guidelines
          </m.p>

          {/* Description */}
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm text-gray-600 max-w-3xl mx-auto"
          >
            Download our official logos, color palettes, and brand assets. Please use these materials in accordance with our brand guidelines.
          </m.p>
        </m.div>

        {/* Assets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {assets.map((asset, index) => {
            const Icon = asset.icon
            return (
              <m.div
                key={asset.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                className="relative group"
              >
                {/* Neumorphic Card */}
                <div className="bg-gray-50 rounded-3xl p-6 shadow-[20px_20px_60px_rgba(163,177,198,0.5),-20px_-20px_60px_rgba(255,255,255,0.9)] border border-gray-200 hover:shadow-[25px_25px_70px_rgba(163,177,198,0.6),-25px_-25px_70px_rgba(255,255,255,1)] transition-all duration-500">
                  
                  {/* Type Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-[6px_6px_12px_rgba(163,177,198,0.25),-6px_-6px_12px_rgba(255,255,255,0.9)] border border-gray-200 mb-4">
                    <Icon className="w-3 h-3 text-gray-700" />
                    <span className="text-xs text-gray-700 font-semibold">{asset.type}</span>
                  </div>

                  {/* Preview Container */}
                  <div className="relative mb-6 rounded-2xl overflow-hidden bg-white shadow-[inset_12px_12px_24px_rgba(163,177,198,0.2),inset_-12px_-12px_24px_rgba(255,255,255,0.9)] border border-gray-200 h-48 flex items-center justify-center">
                    <img 
                      src={asset.path}
                      alt={asset.title}
                      className="max-w-full max-h-full object-contain p-4"
                      onError={(e) => {
                        // Fallback if image doesn't exist
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement!.innerHTML = `
                          <div className="text-center p-4">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gray-100 flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                            </div>
                            <p className="text-xs text-gray-500">Upload ${asset.filename} here</p>
                          </div>
                        `
                      }}
                    />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 font-nasalization">{asset.title}</h3>
                  <p className="text-xs text-gray-600 mb-4">{asset.description}</p>

                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(asset.path, asset.filename)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] active:shadow-[inset_6px_6px_12px_rgba(163,177,198,0.3),inset_-6px_-6px_12px_rgba(255,255,255,0.7)] transition-all duration-300 text-gray-700 hover:text-gray-900 border border-gray-200 group"
                  >
                    <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-semibold">Download</span>
                  </button>

                  {/* Filename */}
                  <p className="text-xs text-gray-500 text-center mt-3">{asset.filename}</p>
                </div>
              </m.div>
            )
          })}
        </div>

        {/* Usage Guidelines */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="bg-gray-50 rounded-3xl p-8 shadow-[20px_20px_60px_rgba(163,177,198,0.5),-20px_-20px_60px_rgba(255,255,255,0.9)] border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-nasalization">Usage Guidelines</h2>
          
          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
              <p><strong>Logo Usage:</strong> Always maintain adequate clear space around the logo. Do not alter, rotate, or modify the logo in any way.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
              <p><strong>Color Accuracy:</strong> Use the exact color values provided in the color palette. Do not substitute or approximate colors.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
              <p><strong>Minimum Size:</strong> Ensure logos are never displayed smaller than 32px in height for digital use.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
              <p><strong>Background:</strong> Logos work best on white or light backgrounds. For dark backgrounds, use the appropriate logo variant.</p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-white shadow-[inset_8px_8px_16px_rgba(163,177,198,0.2),inset_-8px_-8px_16px_rgba(255,255,255,0.9)] border border-gray-200">
            <p className="text-xs text-gray-600">
              <strong>Note:</strong> For any questions about brand usage or to request additional assets, please contact us at{" "}
              <a href="mailto:support@DAGChain.network" className="text-gray-800 hover:underline font-semibold">
                support@DAGChain.network
              </a>
            </p>
          </div>
        </m.div>
      </div>
    </div>
  )
}
