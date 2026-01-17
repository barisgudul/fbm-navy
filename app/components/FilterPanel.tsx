/* app/components/FilterPanel.tsx */

'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useTransition, useEffect } from 'react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import type { PropertyCategory } from '@/types';

export function FilterPanel() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Get current filter values from URL
    const currentFilters = {
        location: searchParams.get('location') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        rooms: searchParams.get('rooms') || '',
        category: (searchParams.get('category') as PropertyCategory) || ''
    };

    // Track if category is 'arsa' to hide rooms filter
    const isLandCategory = currentFilters.category === 'arsa';

    const hasActiveFilters = Boolean(
        currentFilters.location ||
        currentFilters.minPrice ||
        currentFilters.maxPrice ||
        currentFilters.rooms ||
        currentFilters.category
    );

    const updateFilters = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        // If switching to 'arsa', clear rooms filter
        if (key === 'category' && value === 'arsa') {
            params.delete('rooms');
        }

        // Use transition for smoother UX during server re-render
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
    };

    const clearFilters = () => {
        startTransition(() => {
            router.push(pathname, { scroll: false });
        });
    };

    return (
        <div className="mb-8 bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg border border-fbm-gold-400/20">
            {/* Filter Header - Collapsible */}
            <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full p-6 flex items-center justify-between hover:bg-fbm-denim-750/70 transition-colors duration-300 rounded-lg"
            >
                <div className="flex items-center gap-3">
                    <Filter className="w-5 h-5 text-fbm-gold-400" />
                    <h2 className="text-lg font-serif text-fbm-gold-400">
                        Filtrele
                        {hasActiveFilters && (
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

            {/* Filter Content */}
            {isFilterOpen && (
                <div className="px-6 pb-6 border-t border-fbm-gold-400/10 pt-4">
                    {/* Category Filter - Prominent at top */}
                    <div className="mb-4">
                        <label className="block text-xs text-fbm-gold-400/80 mb-2 font-medium">Kategori</label>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => updateFilters('category', '')}
                                disabled={isPending}
                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${!currentFilters.category
                                        ? 'bg-fbm-gold-400 text-fbm-navy-900'
                                        : 'bg-fbm-navy-900/50 text-white/70 hover:bg-fbm-navy-900 hover:text-white border border-white/10'
                                    } disabled:opacity-50`}
                            >
                                Tümü
                            </button>
                            <button
                                type="button"
                                onClick={() => updateFilters('category', 'konut')}
                                disabled={isPending}
                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${currentFilters.category === 'konut'
                                        ? 'bg-fbm-gold-400 text-fbm-navy-900'
                                        : 'bg-fbm-navy-900/50 text-white/70 hover:bg-fbm-navy-900 hover:text-white border border-white/10'
                                    } disabled:opacity-50`}
                            >
                                🏠 Konut
                            </button>
                            <button
                                type="button"
                                onClick={() => updateFilters('category', 'arsa')}
                                disabled={isPending}
                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${currentFilters.category === 'arsa'
                                        ? 'bg-fbm-gold-400 text-fbm-navy-900'
                                        : 'bg-fbm-navy-900/50 text-white/70 hover:bg-fbm-navy-900 hover:text-white border border-white/10'
                                    } disabled:opacity-50`}
                            >
                                🏞️ Arsa
                            </button>
                        </div>
                    </div>

                    {/* Other Filters */}
                    <div className={`grid grid-cols-1 gap-4 ${isLandCategory ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}>
                        <div>
                            <label className="block text-xs text-fbm-gold-400/80 mb-1">Konum</label>
                            <input
                                type="text"
                                placeholder="Örn: Merkez"
                                value={currentFilters.location}
                                onChange={(e) => updateFilters('location', e.target.value)}
                                disabled={isPending}
                                className="w-full bg-fbm-navy-900/50 p-2 rounded border border-white/10 text-white placeholder:text-white/30 focus:border-fbm-gold-400 outline-none text-sm disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-fbm-gold-400/80 mb-1">Min Fiyat (₺)</label>
                            <input
                                type="number"
                                placeholder="Örn: 1000000"
                                value={currentFilters.minPrice}
                                onChange={(e) => updateFilters('minPrice', e.target.value)}
                                disabled={isPending}
                                className="w-full bg-fbm-navy-900/50 p-2 rounded border border-white/10 text-white placeholder:text-white/30 focus:border-fbm-gold-400 outline-none text-sm disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-fbm-gold-400/80 mb-1">Max Fiyat (₺)</label>
                            <input
                                type="number"
                                placeholder="Örn: 5000000"
                                value={currentFilters.maxPrice}
                                onChange={(e) => updateFilters('maxPrice', e.target.value)}
                                disabled={isPending}
                                className="w-full bg-fbm-navy-900/50 p-2 rounded border border-white/10 text-white placeholder:text-white/30 focus:border-fbm-gold-400 outline-none text-sm disabled:opacity-50"
                            />
                        </div>
                        {/* Rooms filter - Hidden when category is 'arsa' */}
                        {!isLandCategory && (
                            <div>
                                <label className="block text-xs text-fbm-gold-400/80 mb-1">Oda Sayısı</label>
                                <select
                                    value={currentFilters.rooms}
                                    onChange={(e) => updateFilters('rooms', e.target.value)}
                                    disabled={isPending}
                                    className="w-full bg-fbm-navy-900/50 p-2 rounded border border-white/10 text-white focus:border-fbm-gold-400 outline-none text-sm disabled:opacity-50"
                                >
                                    <option value="">Tümü</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5+</option>
                                </select>
                            </div>
                        )}
                    </div>
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            disabled={isPending}
                            className="mt-4 text-sm text-fbm-gold-400 hover:text-fbm-bronze-400 underline disabled:opacity-50"
                        >
                            Filtreleri Temizle
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
