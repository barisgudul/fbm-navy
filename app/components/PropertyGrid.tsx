/* app/components/PropertyGrid.tsx */

import { PropertyCard } from '@/app/components/PropertyCard';
import type { Property } from '@/types';

interface PropertyGridProps {
    properties: Property[];
}

export function PropertyGrid({ properties }: PropertyGridProps) {
    if (properties.length === 0) {
        return (
            <div className="text-white/60 text-center py-20 bg-fbm-denim-750/30 rounded-lg border border-white/5 mt-8">
                <p className="text-xl font-serif text-fbm-gold-400 mb-2">Henüz İlan Yok</p>
                <p>Şu an sistemde aktif satılık ilan bulunmamaktadır.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
            ))}
        </div>
    );
}
