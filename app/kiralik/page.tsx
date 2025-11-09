/* app/kiralik/page.tsx */

'use client';

import { PropertyCard } from '@/app/components/PropertyCard';
import { generateRandomProperties } from '@/app/lib/propertyData';
import { useState, useEffect } from 'react';

export default function KiralikPage() {
  const [properties, setProperties] = useState(() => generateRandomProperties(12, true));

  useEffect(() => {
    // Client-side'da render olduktan sonra güncelle (hydration sonrası)
    const timer = setTimeout(() => {
      setProperties(generateRandomProperties(12, true));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen pt-36 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-5xl md:text-7xl text-fbm-gold-400 mb-4">
            Kiralık Konutlar
          </h1>
          <p className="font-sans text-lg text-white/80 max-w-2xl mx-auto">
            Kısa veya uzun dönem kiralama seçenekleri. Güvenilir ev sahipleri ve profesyonel hizmet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
