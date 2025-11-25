/* app/robots.ts */
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Admin paneli Google'dan gizlenir
    },
    sitemap: 'https://www.fbm-gayrimenkul-tasarim.com/sitemap.xml',
  }
}

