/* next.config.ts */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'istrefhfxookljsbsqzs.supabase.co', // Senin Supabase adresin
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;