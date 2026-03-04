/* app/sitemap.ts */
import { MetadataRoute } from 'next';
import { supabase } from '@/app/lib/supabaseClient';
import { seoConfig } from '@/app/config/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = seoConfig.siteUrl;

  // 1. Tüm ilanlar
  const { data: properties } = await supabase
    .from('properties')
    .select('id, updated_at, type');

  const propertyUrls =
    properties?.map((property) => ({
      url: `${baseUrl}/${property.type === 'kiralik' ? 'kiralik' : 'satilik'}/${property.id}`,
      lastModified: new Date(property.updated_at || new Date()),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    })) || [];

  // 2. Tüm tasarım projeleri
  const { data: designs } = await supabase.from('designs').select('id, created_at');

  const designUrls =
    designs?.map((design) => ({
      url: `${baseUrl}/mekan-tasarimlari/${design.id}`,
      lastModified: new Date(design.created_at || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })) || [];

  // 3. Statik sayfalar
  const staticRoutes = [
    { route: '', priority: 1 },
    { route: '/satilik', priority: 0.95 },
    { route: '/kiralik', priority: 0.9 },
    { route: '/mekan-tasarimlari', priority: 0.9 },
    { route: '/isparta-gayrimenkul-mimarlik-ve-yatirim', priority: 0.85 },
    { route: '/isparta-insaat-mimar-ic-mimar', priority: 0.85 },
    { route: '/hakkimizda', priority: 0.75 },
    { route: '/iletisim', priority: 0.8 },
  ].map(({ route, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority,
  }));

  return [...staticRoutes, ...propertyUrls, ...designUrls];
}
