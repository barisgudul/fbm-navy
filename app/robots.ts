/* app/robots.ts */
import { MetadataRoute } from 'next';
import { seoConfig } from '@/app/config/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/admin/*', '/api/*'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/admin/'],
      },
    ],
    sitemap: `${seoConfig.siteUrl}/sitemap.xml`,
    host: seoConfig.siteUrl,
  };
}
