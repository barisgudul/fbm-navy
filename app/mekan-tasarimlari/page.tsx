/* app/mekan-tasarimlari/page.tsx */
/**
 * Mekan Tasarımları - Premium Design Portfolio
 */

'use client';

import { DesignCard } from '@/app/components/DesignCard';
import { PageHeader } from '@/app/components/layout/PageHeader';
import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { motion } from 'framer-motion';

interface Design {
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

      if (!error && data) {
        const formattedData = data.map((item: DBDesign) => ({
          id: item.id,
          title: item.title,
          type: item.type,
          location: item.location,
          area: item.area,
          year: item.year,
          image: item.image_urls?.[0] || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'
        }));
        setDesigns(formattedData);
      }
      setLoading(false);
    }

    fetchDesigns();
  }, []);

  return (
    <main className="min-h-screen bg-[#12161f]">
      {/* Cinematic Header */}
      <PageHeader
        title="Mekan Tasarımları"
        subtitle="Mimari Vizyon"
        bgImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80"
      />

      {/* Content */}
      <section className="py-20 md:py-24 px-6 md:px-12">
        <div className="container mx-auto max-w-7xl">

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <p className="text-white/50 text-lg leading-relaxed">
              Her proje, estetik ve fonksiyonelliği harmanlayan özenli çalışmalarımızın ürünüdür.
              Modern yaşamın ihtiyaçlarını zarif tasarımlarla buluşturuyoruz.
            </p>
          </motion.div>

          {/* Grid */}
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-8 h-8 border-2 border-fbm-gold-400/20 border-t-fbm-gold-400 rounded-full animate-spin" />
            </div>
          ) : designs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {designs.map((design, index) => (
                <DesignCard key={design.id} design={design} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-2xl font-serif text-white/30">Henüz Proje Yok</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
