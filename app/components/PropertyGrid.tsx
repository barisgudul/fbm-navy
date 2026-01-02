/* app/components/PropertyGrid.tsx */
/**
 * Property Grid - Premium Layout
 * 3-column grid with generous spacing
 */

'use client';

import { motion } from 'framer-motion';
import { PropertyCard } from '@/app/components/PropertyCard';
import type { Property } from '@/types';

interface PropertyGridProps {
    properties: Property[];
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export function PropertyGrid({ properties }: PropertyGridProps) {
    if (properties.length === 0) {
        return (
            <div className="text-center py-32">
                <p className="text-2xl font-serif text-white/40 mb-2">Henüz İlan Yok</p>
                <p className="text-white/30 text-sm">Şu an sistemde aktif ilan bulunmamaktadır.</p>
            </div>
        );
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
            {properties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
            ))}
        </motion.div>
    );
}
