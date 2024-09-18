/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self), browsing-topics=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://*.firebaseapp.com https://*.googleapis.com https://apis.google.com https://accounts.google.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://*.googleapis.com https://*.firebaseapp.com https://firebasestorage.googleapis.com https://storage.googleapis.com https://images.unsplash.com https://via.placeholder.com https://picsum.photos https://*.googleusercontent.com",
      "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com wss://*.firebaseio.com https://firebasestorage.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://apis.google.com https://accounts.google.com",
      "frame-src 'self' https://*.firebaseapp.com https://accounts.google.com https://propchain-e27be.firebaseapp.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
];

const nextConfig = {
  images: {
    remotePatterns: [
      // Firebase Storage — primary CDN for property images
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      // Legacy / dev placeholders
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'firebase'],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/assets/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },

  compress: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
};

export default nextConfig;
