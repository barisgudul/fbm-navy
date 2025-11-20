/* app/mekan-tasarimlari/[id]/page.tsx */
import { Metadata } from 'next';
import { supabase } from '@/app/lib/supabaseClient';
import DesignDetailClient from './DesignDetailClient';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data } = await supabase
    .from('designs')
    .select('title, description, image_urls, location, type')
    .eq('id', params.id)
    .single();

  if (!data) {
    return {
      title: 'Proje Bulunamadı | FBM Emlak',
      description: 'Aradığınız proje bulunamadı.',
    };
  }

  const imageUrl = data.image_urls && data.image_urls.length > 0 
    ? data.image_urls[0] 
    : 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop';

  return {
    title: `${data.title} - ${data.location} | FBM Emlak`,
    description: data.description || `${data.title} - ${data.type} projesi, ${data.location} bölgesinde.`,
    openGraph: {
      title: `${data.title} - ${data.location}`,
      description: data.description || `${data.title} - ${data.type} projesi, ${data.location} bölgesinde.`,
      images: [imageUrl],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.title} - ${data.location}`,
      description: data.description || `${data.title} - ${data.type} projesi, ${data.location} bölgesinde.`,
      images: [imageUrl],
    },
  };
}

export default async function MekanTasarimlariDetailPage({ params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .eq('id', params.id)
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
    images: imagesList
  };

  return <DesignDetailClient initialDesign={design} />;
}
