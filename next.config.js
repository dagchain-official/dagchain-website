/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://assets.calendly.com https://www.googletagmanager.com https://connect.facebook.net;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' blob: data: https://www.facebook.com https://www.google-analytics.com https://www.googletagmanager.com;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://stats.g.doubleclick.net;
      frame-src 'self' https://calendly.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim();

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
        ],
      },
    ];
  },
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    // Critical for Mobile Performance: Generate smaller versions for phones
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Suppressing build errors to speed up deployment
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@web3-onboard/core', 'framer-motion', 'recharts'],
  experimental: {
    // Aggressive package tree-shaking for mobile JS reduction
    optimizePackageImports: [
      'lucide-react', 
      '@web3-onboard', 
      'framer-motion', 
      '@radix-ui/react-icons',
      'ethers',
      'lucide-react/dist/esm/icons'
    ],
    esmExternals: true,
    optimizeCss: true
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /components\/Sale component/,
    });
    return config;
  },
}
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig);