import "@/styles/globals.css"; // ✅ REQUIRED

import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import Script from "next/script";
import { CookieConsent } from "@/components/cookie-consent";
import { siteConfig } from "./siteconfig";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Powering Agentic AI with Layer 1`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* LCP Hero Image */}
        <link rel="preload" as="image" href="/assets/hero-dagchain.webp"></link> 
        <link rel="preload" as="image" href="/assets/dagchain-hero.mp4"></link>
        <link rel="preload" href="/styles/globals.css" as="style" onLoad={(e) => { const link = e.currentTarget; link.rel = "stylesheet"; }} />

        {/* Google Fonts (legacy CDN-based) */} 
        <link rel="preconnect" href="https://fonts.googleapis.com" /> 
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /> 
        <link rel="preload" href="/assets/Nasalization_Rg.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /> 
        <link rel="preload" href="/assets/fonts/sora/sora-latin-ext.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /> 
        <link rel="preload" href="/assets/fonts/sora/sora-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        <link rel='stylesheet' href='/styles/globals.css' />
      </Head>

      <body className={`${inter.className} antialiased`}>
       
        { children }
        
        <CookieConsent />

        {/* Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-73EW4LY9JQ"
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-73EW4LY9JQ');
          `}
        </Script>
        {/* Facebook Pixel - Optional: Move to a dedicated component later */}
        {/* <Script id="fb-pixel" strategy="lazyOnload">
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
        </Script> */}
      </body>
    </html>
  );
}
