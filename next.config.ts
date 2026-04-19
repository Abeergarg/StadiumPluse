import type { NextConfig } from 'next';

/* ================================================================
   StadiumPulse — next.config.ts
   Security headers, image optimisation, and bundle config.
   ================================================================ */

// Content Security Policy — tightly scoped for all Google services
const isDev = process.env.NODE_ENV !== 'production';

const CSP = [
  `default-src 'self'`,

  // Scripts: self + inline (needed for gtag init) + Google services
  // Notice: 'unsafe-eval' is REQUIRED in Next.js development mode for React refreshing
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""} https://www.googletagmanager.com https://maps.googleapis.com https://maps.gstatic.com`,

  // Styles: self + inline (Next.js emotion/CSS-in-JS) + Google Fonts
  `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,

  // Fonts: Google Fonts CDN
  `font-src 'self' https://fonts.gstatic.com`,

  // Images: self + data URIs (maps tiles, GA beacon)
  `img-src 'self' data: blob: https://*.googleapis.com https://*.gstatic.com https://*.ggpht.com https://www.google-analytics.com`,

  // Frames: Google Maps embed + Google Meet SOS
  `frame-src https://www.google.com https://maps.google.com https://meet.google.com`,

  // Network: Firebase, GA, Maps API
  [
    `connect-src 'self'`,
    `https://*.googleapis.com`,
    `https://*.firebase.com`,
    `https://*.firebaseio.com`,
    `https://firebaseinstallations.googleapis.com`,
    `https://identitytoolkit.googleapis.com`,
    `https://securetoken.googleapis.com`,
    `https://www.google-analytics.com`,
    `https://analytics.google.com`,
    `https://region1.google-analytics.com`,
  ].join(' '),

  // Media: self only
  `media-src 'self'`,

  // Workers
  `worker-src 'self' blob:`,

  // Security hardening
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'none'`,
  `upgrade-insecure-requests`,
].join('; ');

const nextConfig: NextConfig = {
  // Compress all responses
  compress: true,

  // Strict mode catches common React bugs early
  reactStrictMode: true,

  // Optimise images — WebP/AVIF + longer cache TTL
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 3600,
  },

  // TypeScript
  typescript: { ignoreBuildErrors: false },

  // Security response headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Content Security Policy
          { key: 'Content-Security-Policy',    value: CSP },

          // Prevent MIME-sniffing
          { key: 'X-Content-Type-Options',     value: 'nosniff' },

          // Prevent clickjacking
          { key: 'X-Frame-Options',            value: 'DENY' },

          // Legacy XSS filter (belt-and-suspenders)
          { key: 'X-XSS-Protection',           value: '1; mode=block' },

          // Control referrer header
          { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },

          // Allow geolocation for Maps, deny everything else
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=(self)',        // needed for Maps navigation
              'payment=(self)',            // needed for Google Pay
              'usb=()',
              'magnetometer=()',
              'accelerometer=()',
            ].join(', '),
          },

          // Force HTTPS for 1 year (HSTS)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },

          // Prevent DNS prefetch leakage
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
  },
};

export default nextConfig;
