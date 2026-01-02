/* app/components/PropertyCard.tsx */
/**
 * Premium Property Card
 * Following luxury design standards:
 * - 16:10 aspect ratio for cinematic feel
 * - Subtle overlay gradient
 * - No harsh borders, opacity-based edges
 * - Simple fade-in animation
 */

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bed, Bath, Maximize, MapPin, ArrowUpRight } from 'lucide-react';
import type { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
  index: number;
}

export function PropertyCard({ property, index }: PropertyCardProps) {
  const pathname = usePathname();
  const isRental = pathname.includes('/kiralik');
  const detailPath = isRental ? `/kiralik/${property.id}` : `/satilik/${property.id}`;

  return (
    <Link href={detailPath} className="block group">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: index * 0.08, // Staggered delay based on index
          ease: [0.4, 0, 0.2, 1]
        }}
        className="relative overflow-hidden rounded-2xl bg-white/[0.02]"
      >
        {/* Image Container - 16:10 Cinematic Ratio */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {property.image ? (
            <>
              <Image
                src={property.image}
                alt={property.title}
                fill
                priority={index < 2}
                loading={index < 2 ? "eager" : "lazy"}
                quality={75}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Status Overlay */}
              {(property.status === 'satildi' || property.status === 'kiralandi') && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="text-white/90 font-medium text-sm uppercase tracking-[0.3em]">
                    {property.status === 'satildi' ? 'Satıldı' : 'Kiralandı'}
                  </span>
                </div>
              )}

              {/* Bottom Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                {/* Location */}
                <div className="flex items-center gap-1.5 text-white/60 text-xs mb-2">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{property.location}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl md:text-2xl text-white leading-tight line-clamp-2 mb-3">
                  {property.title}
                </h3>

                {/* Specs Row */}
                <div className="flex items-center gap-4 text-white/50 text-xs">
                  <span className="flex items-center gap-1">
                    <Bed className="w-3.5 h-3.5" />
                    {property.rooms}+{property.livingRoom}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-3.5 h-3.5" />
                    {property.bathrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize className="w-3.5 h-3.5" />
                    {property.area} m²
                  </span>
                </div>
              </div>

              {/* Price Badge - Top Right */}
              <div className="absolute top-4 right-4">
                <span className="inline-block bg-white/95 text-[#0d1117] font-semibold text-sm px-4 py-2 rounded-lg">
                  {property.price} ₺
                </span>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#151b24]">
              <Maximize className="w-10 h-10 text-white/10" />
            </div>
          )}
        </div>
      </motion.article>
    </Link>
  );
}
