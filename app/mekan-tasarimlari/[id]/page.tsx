import { Metadata } from 'next';
import { supabase } from '@/app/lib/supabaseClient';
import DesignDetailClient from './DesignDetailClient';

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
      title: 'Proje Bulunamadı | FBM Emlak & Tasarım',
    };
  }

  const imageUrl = data.image_urls && data.image_urls.length > 0 
    ? data.image_urls[0] 
    : 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop';

  // Tasarımlar için SEO başlığı
  return {
    title: `${data.title} | FBM Mimarlık & Tasarım Isparta`,
    description: data.description ? data.description.slice(0, 160) : `${data.title} - ${data.type} projesi, ${data.location} bölgesinde.`,
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
  // Tasarımlar için 'CreativeWork' veya 'Project' şeması daha uygundur.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: data.title,
    image: imagesList,
    description: data.description,
    dateCreated: data.year,
    locationCreated: {
      '@type': 'Place',
      name: data.location
    },
    author: {
      '@type': 'Organization',
      name: 'FBM Emlak & Tasarım',
      url: 'https://fbmemlak.com' // Site URL'nizi buraya ekleyebilirsiniz
    },
    genre: data.type
  };

  return (
    <>
      {/* Yapısal Veriyi Sayfaya Ekliyoruz (Görünmez) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <DesignDetailClient initialDesign={design} />
    </>
  );
}