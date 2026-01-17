/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://assets.calendly.com https://www.googletagmanager.com https://connect.facebook.net;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' blob: data: https://www.facebook.com;
      font-src 'self' https://fonts.gstatic.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-src 'self' https://calendly.com;
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim();

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy', // Change to 'Content-Security-Policy-Report-Only' to keep testing
            value: cspHeader,
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // domains: ['images.unsplash.com', 'via.placeholder.com', 'lottie.host'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {

    config.optimization.splitChunks = {
      chunks: "all",
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "react",
          priority: 20,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 10,
        },
      },
    };

    // Exclude the Sale component folder from webpack processing
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /components\/Sale component/,
    });

    return config;
  },
}

module.exports = nextConfig
