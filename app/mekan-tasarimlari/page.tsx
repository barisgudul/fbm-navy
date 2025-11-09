/* app/mekan-tasarimlari/page.tsx */

'use client';

import { DesignCard } from '@/app/components/DesignCard';
import { generateRandomDesigns } from '@/app/lib/designData';
import { useState, useEffect } from 'react';

export default function MekanTasarimlariPage() {
  const [designs, setDesigns] = useState(() => generateRandomDesigns(12));

  useEffect(() => {
    // Client-side'da render olduktan sonra güncelle (hydration sonrası)
    const timer = setTimeout(() => {
      setDesigns(generateRandomDesigns(12));
    }, 0);
    return () => clearTimeout(timer);
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {designs.map((design, index) => (
            <DesignCard key={design.id} design={design} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
