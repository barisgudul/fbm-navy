/* next.config.ts */

import type { NextConfig } from "next";

const canonicalHost = 'ferahtabakgayrimenkul.com';

function supabaseStorageHostname(): string {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (raw) {
    try {
      return new URL(raw).hostname;
    } catch {
      /* fall through */
    }
  }
  return 'istrefhfxookljsbsqzs.supabase.co';
}

const nextConfig: NextConfig = {
  // SEO ve Performance Optimizasyonları
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: supabaseStorageHostname(),
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 gün cache
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    qualities: [75, 85],
  },

  // Sıkıştırma ve performans optimizasyonları
  compress: true,
  poweredByHeader: false,

  // Generate sitemap otomatik
  generateEtags: true,

  // Sayfa önbellekleme (ISR - Incremental Static Regeneration)
  experimental: {
    optimizeCss: true, // CSS optimizasyonu
    optimizePackageImports: ['lucide-react', 'framer-motion'], // Paket import optimizasyonu
  },
  // Güvenlik headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
  // Yönlendirmeler (eski domain'den yeni domain'e)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.ferahtabakgayrimenkul.com' }],
        destination: `https://${canonicalHost}/:path*`,
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.fbmgayrimenkul.com' }],
        destination: `https://${canonicalHost}/:path*`,
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'fbmgayrimenkul.com' }],
        destination: `https://${canonicalHost}/:path*`,
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
