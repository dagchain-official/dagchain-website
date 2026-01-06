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
  title: 'DAGChain - Powering Agentic AI with Layer 1 Blockchain',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
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
