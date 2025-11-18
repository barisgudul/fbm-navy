/* app/satilik/page.tsx */
'use client';

import { PropertyCard } from '@/app/components/PropertyCard';
import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';

// Frontend'in beklediği veri tipi
export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  area: number;
  rooms: number;
  livingRoom: number;
  bathrooms: number;
  image: string;
}

// Veritabanından gelen ham veri tipi
interface DBProperty {
  id: number;
  title: string;
  location: string;
  price: string;
  area: number;
  rooms: number;
  living_rooms: number;
  bathrooms: number;
  image_urls: string[];
}

export default function SatilikPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      // 1. Veritabanından 'satilik' olanları çek
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('type', 'kiralik')
        .order('created_at', { ascending: false }); // En yeni en başta

      if (error) {
        console.error('Veri çekme hatası:', error);
      } else if (data) {
        // 2. Veritabanı sütunlarını bizim kart bileşenine uydur (Mapping)
        const formattedData = data.map((item: DBProperty) => ({
          id: item.id,
          title: item.title,
          location: item.location,
          price: item.price,
          area: item.area,
          rooms: item.rooms,
          livingRoom: item.living_rooms, // DB'de 'living_rooms', bizde 'livingRoom'
          bathrooms: item.bathrooms,
          image: (item.image_urls && item.image_urls.length > 0) 
            ? item.image_urls[0] 
            : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'
        }));
        setProperties(formattedData);
      }
      setLoading(false);
    }

    fetchProperties();
  }, []);

  return (
    <main className="min-h-screen pt-36 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-5xl md:text-7xl text-fbm-gold-400 mb-4">
            Satılık Konutlar
          </h1>
          <p className="font-sans text-lg text-white/80 max-w-2xl mx-auto">
            Hayalinizdeki evi bulun. Seçkin lokasyonlarda, kaliteli yapılar.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fbm-gold-400"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
            
            {properties.length === 0 && (
               <div className="text-white/60 text-center py-20 bg-fbm-denim-750/30 rounded-lg border border-white/5 mt-8">
                 <p className="text-xl font-serif text-fbm-gold-400 mb-2">Henüz İlan Yok</p>
                 <p>Şu an sistemde aktif satılık ilan bulunmamaktadır.</p>
               </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}