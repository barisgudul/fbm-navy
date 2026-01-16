/* app/kiralik/[id]/page.tsx */
import { Metadata } from 'next';
import { supabase } from '@/app/lib/supabaseClient';
import PropertyDetailClient from '@/app/components/PropertyDetailClient';
import Script from 'next/script';
import { getBreadcrumbSchema } from '@/app/config/seo';

type Props = {
  params: Promise<{ id: string }>
}

// Fiyatı temizleyip sayıya çeviren yardımcı fonksiyon
function parsePrice(priceStr: string) {
  if (!priceStr) return 0;
  const numbers = priceStr.replace(/[^0-9]/g, '');
  return parseInt(numbers) || 0;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const { data } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (!data) {
    return {
      title: 'İlan Bulunamadı | FRH Gayrimenkul ve Tasarım Isparta',
      description: 'Aradığınız gayrimenkul ilanı bulunamadı. Isparta\'da satılık ve kiralık ev, daire, villa ilanları için FRH Gayrimenkul ve Tasarım\'ı ziyaret edin.',
    };
  }

  const imageUrl = data.image_urls && data.image_urls.length > 0
    ? data.image_urls[0]
    : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop';

  const metaDescription = data.description
    ? data.description.slice(0, 155) + '...'
    : `${data.title} - ${data.rooms} oda, ${data.living_rooms} salon, ${data.area}m². ${data.location}, Isparta. Aylık ${data.price}. FRH Gayrimenkul ve Tasarım güvencesiyle.`;

  return {
    title: `${data.title} - Kiralık ${data.rooms}+${data.living_rooms} | FRH Gayrimenkul ve Tasarım Isparta`,
    description: metaDescription,
    keywords: [
      `Kiralık ${data.location}`,
      `${data.location} Kiralık Daire`,
      `Isparta ${data.location} Kiralık`,
      `${data.rooms}+${data.living_rooms} Kiralık`,
      'Isparta Kiralık Ev',
      'FRH Gayrimenkul ve Tasarım'
    ],
    openGraph: {
      title: `${data.title} - Kiralık`,
      description: metaDescription,
      url: `https://www.fbmgayrimenkul.com/kiralik/${id}`,
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
      siteName: 'FRH Gayrimenkul ve Tasarım Isparta',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: metaDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://www.fbmgayrimenkul.com/kiralik/${id}`,
    },
  };
}

export default async function KiralikDetailPage({ params }: Props) {
  const { id } = await params;

  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return (
      <main className="min-h-screen pt-40 pb-20 px-4 text-center text-white">
        <p>İlan bulunamadı.</p>
      </main>
    );
  }

  // İlan detaylarını ve videoları client bileşenine gönderiyoruz
  const imagesList = (data.image_urls && data.image_urls.length > 0)
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
    videos: data.video_urls || []
  };

  // Google için Yapısal Veri (Schema Markup) - RealEstateListing
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
      addressCountry: 'TR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.7648,
      longitude: 30.5566
    },
    numberOfRooms: data.rooms + data.living_rooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: data.area,
      unitCode: 'MTK'
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'TRY',
      price: parsePrice(data.price),
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: parsePrice(data.price),
        priceCurrency: 'TRY',
        unitText: 'MONTH'
      },
      availability: data.status === 'aktif' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      url: `https://www.fbmgayrimenkul.com/kiralik/${data.id}`,
      seller: {
        '@type': 'RealEstateAgent',
        name: 'FRH Gayrimenkul ve Tasarım',
        url: 'https://www.fbmgayrimenkul.com'
      }
    }
  };

  // Breadcrumb Schema
  const breadcrumbItems = [
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Kiralık', url: '/kiralik' },
    { name: data.title, url: `/kiralik/${data.id}` }
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);

  return (
    <>
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
      <PropertyDetailClient initialProperty={property} />
    </>
  );
}