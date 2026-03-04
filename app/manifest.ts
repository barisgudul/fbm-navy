import type { MetadataRoute } from 'next';
import { seoConfig } from '@/app/config/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seoConfig.siteName,
    short_name: 'Ferah Tabak',
    description: seoConfig.defaultDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#12161f',
    theme_color: '#12161f',
    lang: 'tr-TR',
    icons: [
      {
        src: '/icon1.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
