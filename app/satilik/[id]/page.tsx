import type { Metadata } from 'next';
import { supabase } from '@/app/lib/supabaseClient';
import PropertyDetailClient from '@/app/components/PropertyDetailClient';
import Script from 'next/script';
import { getBreadcrumbSchema, getAbsoluteUrl, seoConfig } from '@/app/config/seo';

type Props = {
  params: Promise<{ id: string }>;
};

function parsePrice(priceStr: string) {
  if (!priceStr) return 0;
  const numbers = priceStr.replace(/[^0-9]/g, '');
  return parseInt(numbers, 10) || 0;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const { data } = await supabase.from('properties').select('*').eq('id', id).single();

  if (!data) {
    return {
      title: 'İlan Bulunamadı | Ferah Tabak Gayrimenkul',
      description:
        "Aradığınız ilan bulunamadı. Isparta'da satılık ve kiralık emlak fırsatları için Ferah Tabak Gayrimenkul portföyünü inceleyin.",
      alternates: {
        canonical: getAbsoluteUrl('/satilik'),
      },
    };
  }

  const imageUrl =
    data.image_urls && data.image_urls.length > 0
      ? data.image_urls[0]
      : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop';

  const metaDescription = data.description
    ? `${data.description.slice(0, 152)}...`
    : `${data.title}. ${data.area} m², ${data.location} konumunda satılık emlak ilanı. Isparta yatırım ve oturum amaçlı detaylar için inceleyin.`;

  return {
    title: `${data.title} | Isparta Satılık Emlak`,
    description: metaDescription,
    keywords: [
      `${data.location} satılık`,
      `${data.location} satılık daire`,
      `Isparta ${data.location} emlak`,
      'Isparta satılık emlak',
      'Isparta gayrimenkul yatırımı',
      seoConfig.brandName,
    ],
    openGraph: {
      title: `${data.title} | Satılık`,
      description: metaDescription,
      url: getAbsoluteUrl(`/satilik/${id}`),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      type: 'website',
      locale: 'tr_TR',
      siteName: seoConfig.siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: metaDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: getAbsoluteUrl(`/satilik/${id}`),
      languages: {
        'tr-TR': getAbsoluteUrl(`/satilik/${id}`),
      },
    },
  };
}

export default async function SatilikDetailPage({ params }: Props) {
  const { id } = await params;

  const { data, error } = await supabase.from('properties').select('*').eq('id', id).single();

  if (error || !data) {
    return (
      <main className="min-h-screen pt-40 pb-20 px-4 text-center text-white">
        <p>İlan bulunamadı.</p>
      </main>
    );
  }

  const imagesList =
    data.image_urls && data.image_urls.length > 0
      ? data.image_urls
      : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'];

  const property = {
    id: data.id,
    title: data.title,
    location: data.location,
    price: data.price,
    area: data.area,
    floor: data.floor,
    rooms: data.rooms,
    livingRoom: data.living_rooms,
    bathrooms: data.bathrooms,
    description: data.description || '',
    images: imagesList,
    type: data.type,
    videos: data.video_urls || [],
  };

  const totalRooms = (data.rooms || 0) + (data.living_rooms || 0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Residence',
    name: data.title,
    image: imagesList,
    description: data.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: data.location,
      addressRegion: 'Isparta',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: seoConfig.geo.latitude,
      longitude: seoConfig.geo.longitude,
    },
    numberOfRooms: totalRooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: data.area,
      unitCode: 'MTK',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'TRY',
      price: parsePrice(data.price),
      availability: data.status === 'aktif' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      url: getAbsoluteUrl(`/satilik/${data.id}`),
      seller: {
        '@type': 'RealEstateAgent',
        name: seoConfig.siteName,
        url: seoConfig.siteUrl,
      },
    },
  };

  const breadcrumbItems = [
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Satılık', url: '/satilik' },
    { name: data.title, url: `/satilik/${data.id}` },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <PropertyDetailClient initialProperty={property} />
    </>
  );
}
