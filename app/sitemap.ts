/* app/sitemap.ts */
import { MetadataRoute } from 'next'
import { supabase } from '@/app/lib/supabaseClient'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.fbm-gayrimenkul-tasarim.com'

  // 1. Tüm İlanları Çek (type bilgisi ile)
  const { data: properties } = await supabase
    .from('properties')
    .select('id, updated_at, type') // type: 'satilik' | 'kiralik'
  
  const propertyUrls = properties?.map((property) => ({
    // Eğer type 'kiralik' ise /kiralik/, değilse /satilik/ linki oluştur
    url: `${baseUrl}/${property.type === 'kiralik' ? 'kiralik' : 'satilik'}/${property.id}`,
    lastModified: new Date(property.updated_at || new Date()),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  })) || []

  // 2. Tüm Tasarım Projelerini Çek
  const { data: designs } = await supabase
    .from('designs')
    .select('id, created_at') // Tasarımlar için created_at kullanıyoruz
  
  const designUrls = designs?.map((design) => ({
    url: `${baseUrl}/mekan-tasarimlari/${design.id}`,
    lastModified: new Date(design.created_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  })) || []

  // 3. Statik Sayfalar
  const staticRoutes = [
    '',
    '/satilik',
    '/kiralik',
    '/mekan-tasarimlari',
    '/hakkimizda',
    '/iletisim',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }))

  return [...staticRoutes, ...propertyUrls, ...designUrls]
}

