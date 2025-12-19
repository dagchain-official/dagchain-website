/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'lottie.host'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    // Exclude the Sale component folder from webpack processing
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /components\/Sale component/,
    })
    return config
  },
}

module.exports = nextConfig
