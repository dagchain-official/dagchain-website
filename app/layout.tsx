import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import '@/styles/globals.css'
import { CookieConsent } from '@/components/cookie-consent'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'DAGChain - Powering Agentic AI with Layer 1 Blockchain',
    template: '%s | DAGChain',
  },
  description: 'The first blockchain designed for no-code builders and vibe coders. Deploy AI agents, build dApps, and scale your ideas without the complexity.',
  keywords: 'blockchain, ethereum, Layer 1, AI agents, no-code, DAGChain, web3, dApps',
  authors: [{ name: 'DAGChain Team' }],
  creator: 'DAGChain',
  publisher: 'DAGChain',
  icons: {
    icon: [
      { url: '/assets/android-chrome-192x192.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/android-chrome-192x192.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/assets/android-chrome-192x192.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/assets/android-chrome-192x192.png',
    apple: [
      { url: '/assets/android-chrome-192x192.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://DAGChain.network'),
  openGraph: {
    title: 'DAGChain - Powering Agentic AI with Layer 1 Blockchain',
    description: 'The first blockchain designed for no-code builders and vibe coders. Deploy AI agents, build dApps, and scale your ideas without the complexity.',
    url: 'https://DAGChain.network',
    siteName: 'DAGChain',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DAGChain - Powering Agentic AI with Layer 1 Blockchain',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DAGChain - Powering Agentic AI with Layer 1 Blockchain',
    description: 'The first blockchain designed for no-code builders and vibe coders. Deploy AI agents, build dApps, and scale your ideas without the complexity.',
    images: ['/og-image.png'],
    creator: '@DAGChain',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://www.dagchain.network',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
        {/* Schema.org JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.dagchain.network/#organization",
                  "name": "DAGChain",
                  "url": "https://www.dagchain.network",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.dagchain.network/assets/android-chrome-192x192.png",
                    "width": 192,
                    "height": 192
                  },
                  "description": "The first blockchain designed for no-code builders and vibe coders. Deploy AI agents, build dApps, and scale your ideas without the complexity.",
                  "foundingDate": "2024",
                  "sameAs": [
                    "https://x.com/DAGChain_ai",
                    "https://discord.gg/fKpUQxDdyG",
                    "https://t.me/DAGChain_network",
                    "https://medium.com/@DAGChain",
                    "https://www.linkedin.com/company/dag-chain",
                    "https://www.youtube.com/@dagchain.network",
                    "https://www.facebook.com/people/DagChain/61584495032870/",
                    "https://www.instagram.com/dagchain.network/",
                    "https://www.tiktok.com/@dagchain"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "support@dagchain.network",
                    "contactType": "customer support",
                    "availableLanguage": ["English"]
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.dagchain.network/#website",
                  "url": "https://www.dagchain.network",
                  "name": "DAGChain",
                  "description": "Powering Agentic AI with Layer 1 Blockchain",
                  "publisher": {
                    "@id": "https://www.dagchain.network/#organization"
                  },
                  "inLanguage": "en-US"
                },
                {
                  "@type": "WebPage",
                  "@id": "https://www.dagchain.network/#webpage",
                  "url": "https://www.dagchain.network",
                  "name": "DAGChain - Powering Agentic AI with Layer 1 Blockchain",
                  "isPartOf": {
                    "@id": "https://www.dagchain.network/#website"
                  },
                  "about": {
                    "@id": "https://www.dagchain.network/#organization"
                  },
                  "description": "The first blockchain designed for no-code builders and vibe coders. Deploy AI agents, build dApps, and scale your ideas without the complexity.",
                  "inLanguage": "en-US"
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "DAGChain",
                  "applicationCategory": "BlockchainApplication",
                  "operatingSystem": "Web",
                  "description": "AI-Native Layer 1 Blockchain for no-code builders, vibe coders, and AI agents",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  }
                }
              ]
            })
          }}
        />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-73EW4LY9JQ"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-73EW4LY9JQ');
            `,
          }}
        />

        {/* Facebook Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_FACEBOOK_PIXEL_ID');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=YOUR_FACEBOOK_PIXEL_ID&ev=PageView&noscript=1"
          />
        </noscript>
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/assets/android-chrome-192x192.png" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/assets/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/assets/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/android-chrome-192x192.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#6B7280" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {/* <style>{`
          link[rel*="icon"] {
            border-radius: 50% !important;
          }
        `}</style> */}
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
