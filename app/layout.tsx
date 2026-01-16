import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import Script from 'next/script';
import '@/styles/globals.css';
import { CookieConsent } from '@/components/cookie-consent';
import { siteConfig } from './siteconfig';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Powering Agentic AI with Layer 1`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['blockchain', 'Layer 1', 'AI agents', 'no-code', 'DAGChain', 'web3'],
  authors: [{ name: 'DAGChain Team' }],
  creator: 'DAGChain',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@DAGChain_ai',
  },
  icons: {
    icon: '/assets/android-chrome-192x192.png',
    apple: '/assets/android-chrome-192x192.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        "name": siteConfig.name,
        "url": siteConfig.url,
        "logo": `${siteConfig.url}/assets/android-chrome-192x192.png`,
        "sameAs": Object.values(siteConfig.links),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        "url": siteConfig.url,
        "name": siteConfig.name,
        "publisher": { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <meta charSet="utf-8" />
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Google Fonts (legacy CDN-based) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics - Load After Interactive to boost LCP */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-73EW4LY9JQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-73EW4LY9JQ');
          `}
        </Script>
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <CookieConsent />
        
        {/* Facebook Pixel - Optional: Move to a dedicated component later */}
        <Script id="fb-pixel" strategy="lazyOnload">
          {`
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
          `}
        </Script>
      </body>
    </html>
  );
}