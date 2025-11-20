/* app/mekan-tasarimlari/page.tsx */

'use client';

import { DesignCard } from '@/app/components/DesignCard';
import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';

export interface Design {
  id: number;
  title: string;
  type: string;
  location: string;
  area: number;
  year: number;
  image: string;
}

interface DBDesign {
  id: number;
  title: string;
  type: string;
  location: string;
  area: number;
  year: number;
  image_urls: string[];
}

export default function MekanTasarimlariPage() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDesigns() {
      const { data, error } = await supabase
        .from('designs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Veri çekme hatası:', error);
      } else if (data) {
        const formattedData = data.map((item: DBDesign) => ({
          id: item.id,
          title: item.title,
          type: item.type,
          location: item.location,
          area: item.area,
          year: item.year,
          image: (item.image_urls && item.image_urls.length > 0) 
            ? item.image_urls[0] 
            : 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
        }));
        setDesigns(formattedData);
      }
      setLoading(false);
    }

    fetchDesigns();
  }, []);

  return (
    <main className="min-h-screen pt-36 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-5xl md:text-7xl text-fbm-gold-400 mb-4">
            Mekan Tasarımları
          </h1>
          <p className="font-sans text-lg text-white/80 max-w-2xl mx-auto">
            Yaratıcı ve fonksiyonel mekan tasarımları. Her proje, estetik ve kullanılabilirliği bir araya getiren özenli çalışmalarımızın ürünüdür.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fbm-gold-400"></div>
          </div>
        ) : (
          <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {designs.map((design, index) => (
            <DesignCard key={design.id} design={design} index={index} />
          ))}
        </div>
            
            {designs.length === 0 && (
              <div className="text-white/60 text-center py-20 bg-fbm-denim-750/30 rounded-lg border border-white/5 mt-8">
                <p className="text-xl font-serif text-fbm-gold-400 mb-2">Henüz Proje Yok</p>
                <p>Şu an sistemde aktif proje bulunmamaktadır.</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
