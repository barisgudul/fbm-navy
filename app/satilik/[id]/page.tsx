/* app/satilik/[id]/page.tsx */
import { Metadata } from 'next';
import { supabase } from '@/app/lib/supabaseClient';
import PropertyDetailClient from '@/app/components/PropertyDetailClient';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data } = await supabase
    .from('properties')
    .select('title, description, image_urls, location, price')
    .eq('id', params.id)
    .single();

  if (!data) {
    return {
      title: 'İlan Bulunamadı | FBM Emlak',
      description: 'Aradığınız ilan bulunamadı.',
    };
  }

  const imageUrl = data.image_urls && data.image_urls.length > 0 
    ? data.image_urls[0] 
    : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop';

  return {
    title: `${data.title} - ${data.location} | FBM Emlak`,
    description: data.description || `${data.title} - ${data.location}. ${data.price}`,
    openGraph: {
      title: `${data.title} - ${data.location}`,
      description: data.description || `${data.title} - ${data.location}. ${data.price}`,
      images: [imageUrl],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.title} - ${data.location}`,
      description: data.description || `${data.title} - ${data.location}. ${data.price}`,
      images: [imageUrl],
    },
  };
}

export default async function SatilikDetailPage({ params }: { params: { id: string } }) {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', params.id)
        .single();

  if (error || !data) {
    return (
      <main className="min-h-screen pt-40 pb-20 px-4 text-center text-white">
        <p>İlan bulunamadı.</p>
      </main>
    );
  }

        const imagesList = (data.image_urls && data.image_urls.length > 0) 
          ? data.image_urls 
          : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'];

  const property = {
          id: data.id,
          title: data.title,
          location: data.location,
          price: data.price,
          area: data.area,
          rooms: data.rooms,
          livingRoom: data.living_rooms,
          bathrooms: data.bathrooms,
    description: data.description || '',
    images: imagesList,
    type: data.type
  };

  return <PropertyDetailClient initialProperty={property} />;
}
