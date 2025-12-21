/* app/components/PropertyCard.tsx */

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bed, Bath, Square } from 'lucide-react';
import type { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
  index: number;
}

// Generate shimmer placeholder for loading state
const shimmerDataUrl = `data:image/svg+xml;base64,${Buffer.from(
  `<svg width="800" height="600" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#0f172a" offset="20%" />
        <stop stop-color="#1e293b" offset="50%" />
        <stop stop-color="#0f172a" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="#0f172a" />
    <rect id="r" width="800" height="600" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-800" to="800" dur="1s" repeatCount="indefinite"  />
  </svg>`
).toString('base64')}`;

export function PropertyCard({ property, index }: PropertyCardProps) {
  // Satılık mı kiralık mı belirlemek için URL'den kontrol et
  const pathname = usePathname();
  const isRental = pathname.includes('/kiralik');
  const detailPath = isRental ? `/kiralik/${property.id}` : `/satilik/${property.id}`;

  return (
    <Link href={detailPath}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative overflow-hidden rounded-lg bg-fbm-denim-750/50 backdrop-blur-sm border border-fbm-sage-200/30 hover:border-fbm-cream-100/50 transition-all duration-300 cursor-pointer flex flex-col h-full"
      >
        <div className="relative h-64 overflow-hidden rounded-t-lg bg-fbm-denim-750">
          {property.image ? (
            <>
              <Image
                src={property.image}
                alt={property.title}
                fill
                priority={index < 4}
                placeholder="blur"
                blurDataURL={shimmerDataUrl}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fbm-navy-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {(property.status === 'satildi' || property.status === 'kiralandi') && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                  <span className="border-4 border-red-500 text-red-500 font-bold text-2xl md:text-4xl px-4 py-2 -rotate-12 uppercase tracking-widest">
                    {property.status === 'satildi' ? 'SATILDI' : 'KİRALANDI'}
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-fbm-navy-900 via-fbm-denim-750 to-fbm-gold-400 text-fbm-champagne-150/30">
              <Square className="w-20 h-20" />
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col h-full">
          <h3 className="font-serif text-xl md:text-2xl text-white mb-2 group-hover:text-fbm-gold-400 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
            {property.title}
          </h3>
          <p className="font-sans text-sm text-fbm-champagne-150/80 mb-4 line-clamp-1">{property.location}</p>

          <div className="flex flex-wrap gap-4 mb-4 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-fbm-gold-400" />
              <span>{property.rooms} + {property.livingRoom}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4 text-fbm-gold-400" />
              <span>{property.bathrooms} Banyo</span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="w-4 h-4 text-fbm-gold-400" />
              <span>{property.area} m²</span>
            </div>
          </div>

          <div className="pt-4 border-t border-fbm-sage-200/30">
            <p className="font-serif text-2xl md:text-3xl text-fbm-gold-400 font-bold">
              {property.price} ₺
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
