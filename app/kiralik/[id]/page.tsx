/* app/kiralik/[id]/page.tsx */
import { Metadata } from 'next';
import { supabase } from '@/app/lib/supabaseClient';
import PropertyDetailClient from '@/app/components/PropertyDetailClient';

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
      title: 'İlan Bulunamadı | FBM Emlak',
    };
  }

  const imageUrl = data.image_urls && data.image_urls.length > 0 
    ? data.image_urls[0] 
    : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop';

  return {
    // Başlık otomatik olarak: "Isparta Hızırbey... | FBM Emlak & Tasarım" olur
    title: `${data.title} | FBM Emlak & Tasarım`,
    // Açıklama emlakçının girdiği metinden alınır
    description: data.description ? data.description.slice(0, 160) : data.title,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: data.title,
        },
      ],
      type: 'website',
      locale: 'tr_TR',
      siteName: 'FBM Emlak & Tasarım',
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

  // Google için Yapısal Veri (Schema Markup)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product', 
    name: data.title,
    image: imagesList,
    description: data.description,
    brand: {
      '@type': 'Brand',
      name: 'FBM Emlak',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'TRY',
      price: parsePrice(data.price),
      availability: data.status === 'aktif' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      itemCondition: 'https://schema.org/UsedCondition',
      areaServed: {
        '@type': 'Place',
        name: 'Isparta'
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyDetailClient initialProperty={property} />
    </>
  );
}