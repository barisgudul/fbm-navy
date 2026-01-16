import { Metadata } from 'next';
import { supabase } from '@/app/lib/supabaseClient';
import DesignDetailClient from './DesignDetailClient';
import Script from 'next/script';
import { getBreadcrumbSchema } from '@/app/config/seo';

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const { data } = await supabase
    .from('designs')
    .select('*')
    .eq('id', id)
    .single();

  if (!data) {
    return {
      title: 'Proje Bulunamadı | FRH Gayrimenkul & Tasarım',
      description: 'Aradığınız mekan tasarımı projesi bulunamadı. Isparta\'da profesyonel iç mimarlık ve mekan tasarımı projeleri için FRH Gayrimenkul\'ü ziyaret edin.',
    };
  }

  const imageUrl = data.image_urls && data.image_urls.length > 0
    ? data.image_urls[0]
    : 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop';

  const metaDescription = data.description
    ? data.description.slice(0, 155) + '...'
    : `${data.title} - ${data.type} projesi. ${data.area}m² mekan tasarımı, ${data.location}. ${data.year} yılı. FRH Gayrimenkul ve Tasarım profesyonel tasarım hizmetleri.`;

  // Tasarımlar için SEO başlığı
  return {
    title: `${data.title} - ${data.type} Mekan Tasarımı | FRH Gayrimenkul ve Tasarım Isparta`,
    description: metaDescription,
    keywords: [
      `Isparta ${data.type} Tasarımı`,
      `${data.location} Mekan Tasarımı`,
      'Isparta İç Mimarlık',
      'Isparta Mekan Tasarımı',
      'FT Tasarım',
      data.type,
      data.location
    ],
    openGraph: {
      title: `${data.title} - ${data.type} Tasarımı`,
      description: metaDescription,
      url: `https://www.fbmgayrimenkul.com/mekan-tasarimlari/${id}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${data.title} - ${data.type} Mekan Tasarımı`,
        },
      ],
      type: 'website',
      locale: 'tr_TR',
      siteName: 'FRH Gayrimenkul & Tasarım',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: metaDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://www.fbmgayrimenkul.com/mekan-tasarimlari/${id}`,
    },
  };
}

export default async function MekanTasarimlariDetailPage({ params }: Props) {
  const { id } = await params;

  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return (
      <main className="min-h-screen pt-40 pb-20 px-4 text-center text-white">
        <p>Tasarım bulunamadı.</p>
      </main>
    );
  }

  const imagesList = (data.image_urls && data.image_urls.length > 0)
    ? data.image_urls
    : ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'];

  const design = {
    id: data.id,
    title: data.title,
    type: data.type,
    location: data.location,
    area: data.area,
    year: data.year,
    image: imagesList[0],
    description: data.description,
    images: imagesList,
    videos: data.video_urls || []
  };

  // --- GOOGLE İÇİN GİZLİ YAPISAL VERİ (JSON-LD) ---
  // Tasarımlar için 'CreativeWork' ve 'Service' şeması kombinasyonu
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: data.title,
    image: imagesList,
    description: data.description,
    dateCreated: data.year.toString(),
    locationCreated: {
      '@type': 'Place',
      name: data.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: data.location,
        addressRegion: 'Isparta',
        addressCountry: 'TR'
      }
    },
    author: {
      '@type': 'Organization',
      name: 'FRH Gayrimenkul & Tasarım',
      url: 'https://www.fbmgayrimenkul.com'
    },
    creator: {
      '@type': 'Organization',
      name: 'FRH Gayrimenkul ve Tasarım',
      url: 'https://www.fbmgayrimenkul.com'
    },
    genre: data.type,
    inLanguage: 'tr',
    about: {
      '@type': 'Service',
      serviceType: 'İç Mimarlık ve Mekan Tasarımı',
      provider: {
        '@type': 'RealEstateAgent',
        name: 'FRH Gayrimenkul ve Tasarım'
      },
      areaServed: {
        '@type': 'City',
        name: 'Isparta'
      }
    }
  };

  // Breadcrumb Schema
  const breadcrumbItems = [
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Mekan Tasarımları', url: '/mekan-tasarimlari' },
    { name: data.title, url: `/mekan-tasarimlari/${data.id}` }
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      {/* Yapısal Veriyi Sayfaya Ekliyoruz (Görünmez) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <DesignDetailClient initialDesign={design} />
    </>
  );
}