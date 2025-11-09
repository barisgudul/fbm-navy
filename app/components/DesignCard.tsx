/* app/components/DesignCard.tsx */

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Square } from 'lucide-react';

interface Design {
  id: number;
  title: string;
  type: string;
  location: string;
  area: number;
  year: number;
  image: string;
}

interface DesignCardProps {
  design: Design;
  index: number;
}

export function DesignCard({ design, index }: DesignCardProps) {
  return (
          <Link href={`/mekan-tasarimlari/${design.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative overflow-hidden rounded-lg bg-fbm-denim-750/50 backdrop-blur-sm border border-fbm-sage-200/30 hover:border-fbm-cream-100/50 transition-all duration-300 cursor-pointer flex flex-col h-full"
      >
      <div className="relative h-64 overflow-hidden rounded-t-lg bg-fbm-denim-750">
        {design.image ? (
          <>
            <Image
              src={design.image}
              alt={design.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-fbm-navy-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-fbm-navy-900 via-fbm-denim-750 to-fbm-gold-400 text-fbm-champagne-150/30">
            <Square className="w-20 h-20" />
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col h-full">
        <h3 className="font-serif text-xl md:text-2xl text-white mb-2 group-hover:text-fbm-gold-400 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
          {design.title}
        </h3>
        <p className="font-sans text-sm text-fbm-champagne-150/80 mb-4 line-clamp-1">{design.type} • {design.location}</p>
        
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <Square className="w-4 h-4 text-fbm-gold-400" />
            <span>{design.area} m²</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-fbm-gold-400">Yıl:</span>
            <span>{design.year}</span>
          </div>
        </div>
      </div>
    </motion.div>
    </Link>
  );
}
