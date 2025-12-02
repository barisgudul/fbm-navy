/* app/robots.ts */
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/admin/*',
          '/api/*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
        crawlDelay: 0, // Google için hızlı tarama
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/admin/'],
      },
    ],
    sitemap: 'https://www.fbmgayrimenkul.com/sitemap.xml',
    host: 'https://www.fbmgayrimenkul.com',
  }
}

