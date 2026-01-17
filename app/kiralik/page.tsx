/* app/kiralik/page.tsx */
/**
 * Kiralık Properties - Premium Collection Page
 */

'use client';

import { PropertyCard } from '@/app/components/PropertyCard';
import { PageHeader } from '@/app/components/layout/PageHeader';
import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PropertyCategory } from '@/types';

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  area: number;
  category?: PropertyCategory;
  rooms: number | null;
  livingRoom: number | null;
  bathrooms: number | null;
  image: string;
  zoning_status?: string | null;
}

interface DBProperty {
  id: number;
  title: string;
  location: string;
  price: string;
  area: number;
  category?: PropertyCategory;
  rooms: number | null;
  living_rooms: number | null;
  bathrooms: number | null;
  image_urls: string[];
  zoning_status?: string | null;
}

export default function KiralikPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    rooms: '',
    category: '' as PropertyCategory | ''
  });

  const hasActiveFilters = filters.location || filters.minPrice || filters.maxPrice || filters.rooms || filters.category;
  const isLandCategory = filters.category === 'arsa';

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      let query = supabase
        .from('properties')
        .select('*')
        .eq('type', 'kiralik')
        .eq('status', 'aktif');

      // Apply category filter
      if (filters.category) query = query.eq('category', filters.category);
      if (filters.location) query = query.ilike('location', `%${filters.location}%`);
      // Only apply rooms filter if not filtering by 'arsa' category
      if (filters.rooms && filters.category !== 'arsa') query = query.eq('rooms', Number(filters.rooms));

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

      if (!error && data) {
        let formattedData = data.map((item: DBProperty) => ({
          id: item.id,
          title: item.title,
          location: item.location,
          price: item.price,
          area: item.area,
          category: item.category || 'konut',
          rooms: item.rooms,
          livingRoom: item.living_rooms,
          bathrooms: item.bathrooms,
          zoning_status: item.zoning_status,
          image: item.image_urls?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
        }));

        if (filters.minPrice || filters.maxPrice) {
          formattedData = formattedData.filter(item => {
            const priceNum = parseInt(item.price.replace(/[^\d]/g, ''));
            const min = filters.minPrice ? parseInt(filters.minPrice) : 0;
            const max = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
            return priceNum >= min && priceNum <= max;
          });
        }

        setProperties(formattedData);
      }
      setLoading(false);
    }

    fetchProperties();
  }, [filters]);

  // Handle category change - clear rooms if switching to arsa
  const handleCategoryChange = (newCategory: PropertyCategory | '') => {
    if (newCategory === 'arsa') {
      setFilters({ ...filters, category: newCategory, rooms: '' });
    } else {
      setFilters({ ...filters, category: newCategory });
    }
  };

  return (
    <main className="min-h-screen bg-[#12161f]">
      {/* Cinematic Header */}
      <PageHeader
        title="Kiralık"
        subtitle="Konfor ve Estetik"
        bgImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
      />

      {/* Content */}
      <section className="py-20 md:py-24 px-6 md:px-12">
        <div className="container mx-auto max-w-7xl">

          {/* Filter Toggle */}
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border transition-all ${hasActiveFilters
                ? 'border-fbm-gold-400/50 bg-fbm-gold-400/10 text-fbm-gold-400'
                : 'border-white/10 text-white/60 hover:border-white/20'
                }`}
            >
              <Filter className="w-4 h-4" />
              <span className="text-xs tracking-widest uppercase">Filtrele</span>
            </button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-12"
              >
                <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] p-8">
                  {/* Category Filter - Prominent at top */}
                  <div className="mb-6">
                    <label className="block text-xs text-white/40 mb-2 tracking-widest uppercase">Kategori</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleCategoryChange('')}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${!filters.category
                            ? 'bg-fbm-gold-400 text-fbm-navy-900'
                            : 'bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white border border-white/[0.08]'
                          }`}
                      >
                        Tümü
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCategoryChange('konut')}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${filters.category === 'konut'
                            ? 'bg-fbm-gold-400 text-fbm-navy-900'
                            : 'bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white border border-white/[0.08]'
                          }`}
                      >
                        🏠 Konut
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCategoryChange('arsa')}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${filters.category === 'arsa'
                            ? 'bg-fbm-gold-400 text-fbm-navy-900'
                            : 'bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white border border-white/[0.08]'
                          }`}
                      >
                        🏞️ Arsa
                      </button>
                    </div>
                  </div>

                  {/* Other Filters */}
                  <div className={`grid grid-cols-1 gap-6 ${isLandCategory ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}>
                    <div>
                      <label className="block text-xs text-white/40 mb-2 tracking-widest uppercase">Konum</label>
                      <input
                        type="text"
                        placeholder="Örn: Merkez"
                        value={filters.location}
                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                        className="w-full bg-white/[0.04] p-3 rounded-lg border border-white/[0.08] text-white placeholder:text-white/20 focus:border-fbm-gold-400/50 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-2 tracking-widest uppercase">Min Fiyat</label>
                      <input
                        type="number"
                        placeholder="₺"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                        className="w-full bg-white/[0.04] p-3 rounded-lg border border-white/[0.08] text-white placeholder:text-white/20 focus:border-fbm-gold-400/50 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-2 tracking-widest uppercase">Max Fiyat</label>
                      <input
                        type="number"
                        placeholder="₺"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                        className="w-full bg-white/[0.04] p-3 rounded-lg border border-white/[0.08] text-white placeholder:text-white/20 focus:border-fbm-gold-400/50 outline-none text-sm"
                      />
                    </div>
                    {/* Rooms filter - Hidden when category is 'arsa' */}
                    {!isLandCategory && (
                      <div>
                        <label className="block text-xs text-white/40 mb-2 tracking-widest uppercase">Oda</label>
                        <select
                          value={filters.rooms}
                          onChange={(e) => setFilters({ ...filters, rooms: e.target.value })}
                          className="w-full bg-white/[0.04] p-3 rounded-lg border border-white/[0.08] text-white focus:border-fbm-gold-400/50 outline-none text-sm"
                        >
                          <option value="">Tümü</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4+</option>
                        </select>
                      </div>
                    )}
                  </div>
                  {hasActiveFilters && (
                    <button
                      onClick={() => setFilters({ location: '', minPrice: '', maxPrice: '', rooms: '', category: '' })}
                      className="mt-6 flex items-center gap-2 text-xs text-white/40 hover:text-fbm-gold-400 transition-colors tracking-widest uppercase"
                    >
                      <X className="w-3 h-3" /> Temizle
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid */}
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-8 h-8 border-2 border-fbm-gold-400/20 border-t-fbm-gold-400 rounded-full animate-spin" />
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-2xl font-serif text-white/30">Henüz İlan Yok</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
