/* app/kiralik/page.tsx */
'use client';

import { PropertyCard } from '@/app/components/PropertyCard';
import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

// Frontend'in beklediği veri tipi
export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  area: number;
  rooms: number;
  livingRoom: number;
  bathrooms: number;
  image: string;
}

// Veritabanından gelen ham veri tipi
interface DBProperty {
  id: number;
  title: string;
  location: string;
  price: string;
  area: number;
  rooms: number;
  living_rooms: number;
  bathrooms: number;
  image_urls: string[];
}

export default function KiralikPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    rooms: ''
  });

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      // 1. Veritabanından 'kiralik' olanları çek
      let query = supabase
        .from('properties')
        .select('*')
        .eq('type', 'kiralik')
        .eq('status', 'aktif');

      // Filtreler
      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }
      if (filters.rooms) {
        query = query.eq('rooms', Number(filters.rooms));
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        console.error('Veri çekme hatası:', error);
      } else if (data) {
        // 2. Veritabanı sütunlarını bizim kart bileşenine uydur (Mapping)
        let formattedData = data.map((item: DBProperty) => ({
          id: item.id,
          title: item.title,
          location: item.location,
          price: item.price,
          area: item.area,
          rooms: item.rooms,
          livingRoom: item.living_rooms,
          bathrooms: item.bathrooms,
          image: (item.image_urls && item.image_urls.length > 0) 
            ? item.image_urls[0] 
            : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'
        }));

        // Fiyat filtreleme (client-side, çünkü price string formatında)
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

  return (
    <main className="min-h-screen pt-36 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-5xl md:text-7xl text-fbm-gold-400 mb-4">
            Kiralık Konutlar
          </h1>
          <p className="font-sans text-lg text-white/80 max-w-2xl mx-auto">
            Hayalinizdeki evi bulun. Seçkin lokasyonlarda, kaliteli yapılar.
          </p>
        </div>

        {/* Filtreleme Barı */}
        <div className="mb-8 bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg border border-fbm-gold-400/20">
          {/* Filtre Başlığı - Açılır Kapanır */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full p-6 flex items-center justify-between hover:bg-fbm-denim-750/70 transition-colors duration-300 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-fbm-gold-400" />
              <h2 className="text-lg font-serif text-fbm-gold-400">
                Filtrele
                {(filters.location || filters.minPrice || filters.maxPrice || filters.rooms) && (
                  <span className="ml-2 text-sm text-fbm-bronze-400">(Aktif)</span>
                )}
              </h2>
            </div>
            {isFilterOpen ? (
              <ChevronUp className="w-5 h-5 text-fbm-gold-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-fbm-gold-400" />
            )}
          </button>

          {/* Filtre İçeriği */}
          {isFilterOpen && (
            <div className="px-6 pb-6 border-t border-fbm-gold-400/10 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-fbm-gold-400/80 mb-1">Konum</label>
                  <input
                    type="text"
                    placeholder="Örn: Merkez"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full bg-fbm-navy-900/50 p-2 rounded border border-white/10 text-white placeholder:text-white/30 focus:border-fbm-gold-400 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-fbm-gold-400/80 mb-1">Min Fiyat (₺/ay)</label>
                  <input
                    type="number"
                    placeholder="Örn: 5000"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="w-full bg-fbm-navy-900/50 p-2 rounded border border-white/10 text-white placeholder:text-white/30 focus:border-fbm-gold-400 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-fbm-gold-400/80 mb-1">Max Fiyat (₺/ay)</label>
                  <input
                    type="number"
                    placeholder="Örn: 20000"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="w-full bg-fbm-navy-900/50 p-2 rounded border border-white/10 text-white placeholder:text-white/30 focus:border-fbm-gold-400 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-fbm-gold-400/80 mb-1">Oda Sayısı</label>
                  <select
                    value={filters.rooms}
                    onChange={(e) => setFilters({ ...filters, rooms: e.target.value })}
                    className="w-full bg-fbm-navy-900/50 p-2 rounded border border-white/10 text-white focus:border-fbm-gold-400 outline-none text-sm"
                  >
                    <option value="">Tümü</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5+</option>
                  </select>
                </div>
              </div>
              {(filters.location || filters.minPrice || filters.maxPrice || filters.rooms) && (
                <button
                  onClick={() => setFilters({ location: '', minPrice: '', maxPrice: '', rooms: '' })}
                  className="mt-4 text-sm text-fbm-gold-400 hover:text-fbm-bronze-400 underline"
                >
                  Filtreleri Temizle
                </button>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fbm-gold-400"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
            
            {properties.length === 0 && (
               <div className="text-white/60 text-center py-20 bg-fbm-denim-750/30 rounded-lg border border-white/5 mt-8">
                 <p className="text-xl font-serif text-fbm-gold-400 mb-2">Henüz İlan Yok</p>
                 <p>Şu an sistemde aktif kiralık ilan bulunmamaktadır.</p>
               </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
