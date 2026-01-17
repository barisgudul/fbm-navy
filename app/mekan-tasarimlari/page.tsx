/* app/mekan-tasarimlari/page.tsx */
/**
 * Mekan Tasarımları - Premium Design Portfolio with Filtering
 */

'use client';

import { DesignCard } from '@/app/components/DesignCard';
import { PageHeader } from '@/app/components/layout/PageHeader';
import { FilterTabs } from '@/app/components/FilterTabs';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabaseClient';
import { DESIGN_FILTER_OPTIONS, type DesignFilterOption } from '@/app/lib/constants';
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

function MekanTasarimlariContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);

  // Get category from URL, validate and default to 'Tümü'
  const categoryParam = searchParams.get('kategori') || 'Tümü';
  const isValidCategory = (DESIGN_FILTER_OPTIONS as readonly string[]).includes(categoryParam);
  const activeCategory: DesignFilterOption = isValidCategory
    ? (categoryParam as DesignFilterOption)
    : 'Tümü';

  // Fetch all designs once
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

  // Filter designs based on active category
  const filteredDesigns = useMemo(() => {
    if (activeCategory === 'Tümü') {
      return designs;
    }
    return designs.filter((design) => design.type === activeCategory);
  }, [designs, activeCategory]);

  // Handle category selection with URL update
  const handleCategorySelect = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === 'Tümü') {
      params.delete('kategori');
    } else {
      params.set('kategori', category);
    }

    const newUrl = params.toString()
      ? `/mekan-tasarimlari?${params.toString()}`
      : '/mekan-tasarimlari';

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      {/* Cinematic Header */}
      <PageHeader
        title="Projeler"
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
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <p className="text-white/50 text-lg leading-relaxed">
              Her proje, estetik ve fonksiyonelliği harmanlayan özenli çalışmalarımızın ürünüdür.
              Modern yaşamın ihtiyaçlarını zarif tasarımlarla buluşturuyoruz.
            </p>
          </motion.div>


          <FilterTabs
            categories={DESIGN_FILTER_OPTIONS.filter(c => !['Otel Konsepti', 'Villa Projesi'].includes(c))}
            activeCategory={activeCategory}
            onSelect={handleCategorySelect}
          />

          {/* Grid */}
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-8 h-8 border-2 border-fbm-gold-400/20 border-t-fbm-gold-400 rounded-full animate-spin" />
            </div>
          ) : filteredDesigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDesigns.map((design, index) => (
                <DesignCard key={design.id} design={design} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-2xl font-serif text-white/30">
                {activeCategory === 'Tümü' ? 'Henüz Proje Yok' : `"${activeCategory}" kategorisinde proje bulunamadı`}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// Loading fallback for Suspense
function LoadingFallback() {
  return (
    <>
      <PageHeader
        title="Projeler"
        subtitle="Mimari Vizyon"
        bgImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80"
      />
      <section className="py-20 md:py-24 px-6 md:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-fbm-gold-400/20 border-t-fbm-gold-400 rounded-full animate-spin" />
          </div>
        </div>
      </section>
    </>
  );
}

export default function MekanTasarimlariPage() {
  return (
    <main className="min-h-screen bg-[#12161f]">
      <Suspense fallback={<LoadingFallback />}>
        <MekanTasarimlariContent />
      </Suspense>
    </main>
  );
}

