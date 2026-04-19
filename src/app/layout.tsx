import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import CursorGlow from '@/components/CursorGlow';
import SkipLink from '@/components/SkipLink';
import { env, isGAConfigured } from '@/lib/env';

export const metadata: Metadata = {
  title: 'StadiumIQ — Smart Physical Event Experience | AI-Powered Stadium Assistant',
  description:
    'AI-powered real-time crowd management and fan experience platform for large sporting events. Real-time heatmaps, smart navigation, seat-side ordering, and AI assistant.',
  keywords: 'stadium AI crowd management fan experience PromptWars 2026 Google Hack2skill',
  openGraph: {
    title: 'StadiumIQ — Smart Physical Event Experience',
    description: 'AI-powered real-time crowd management and fan experience platform.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'StadiumIQ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StadiumIQ — Smart Physical Event Experience',
    description: 'AI-powered real-time crowd management and fan experience platform.',
  },
};

// Moved out of metadata to avoid Next.js 16 warning
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#080a0f',
};

// JSON-LD structured data for the product
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "StadiumIQ",
  "applicationCategory": "EventManagementApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  },
  "description": "AI-powered real-time crowd management and fan experience platform for large sporting events."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics — only active when real ID is provided */}
        {isGAConfigured() && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${env.ga.measurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${env.ga.measurementId}');
            `}</Script>
          </>
        )}
      </head>
      <body>
        <SkipLink />
        {/* Ambient mouse-follow glow */}
        <CursorGlow />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
