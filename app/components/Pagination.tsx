/* app/components/Pagination.tsx */

'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginationInfo } from '@/types';

interface PaginationProps extends PaginationInfo {
    baseUrl?: string;
}

export function Pagination({
    currentPage,
    totalPages,
    totalCount,
    itemsPerPage,
    hasNextPage,
    hasPrevPage,
    baseUrl = '/satilik'
}: PaginationProps) {
    const searchParams = useSearchParams();

    // Preserve all existing filters when changing pages
    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) {
            params.delete('page');
        } else {
            params.set('page', page.toString());
        }
        const queryString = params.toString();
        return `${baseUrl}${queryString ? `?${queryString}` : ''}`;
    };

    // Don't render if only one page
    if (totalPages <= 1) return null;

    // Calculate showing range
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalCount);

    return (
        <nav
            aria-label="Sayfa navigasyonu"
            className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 bg-fbm-denim-750/50 backdrop-blur-sm rounded-lg border border-fbm-gold-400/20 p-4 sm:p-6"
        >
            {/* Items counter */}
            <p className="text-sm text-white/70 order-2 sm:order-1">
                <span className="text-fbm-gold-400 font-medium">{totalCount}</span>
                {' '}sonuçtan{' '}
                <span className="text-white font-medium">{startItem}-{endItem}</span>
                {' '}gösteriliyor
            </p>

            {/* Navigation buttons */}
            <div className="flex items-center gap-2 order-1 sm:order-2">
                {/* Previous button */}
                {hasPrevPage ? (
                    <Link
                        href={createPageUrl(currentPage - 1)}
                        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-fbm-denim-700 hover:bg-fbm-denim-750 border border-fbm-gold-400/30 hover:border-fbm-gold-400/50 rounded-lg transition-all duration-200"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Önceki</span>
                    </Link>
                ) : (
                    <button
                        disabled
                        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/40 bg-fbm-denim-750/30 border border-white/10 rounded-lg cursor-not-allowed"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Önceki</span>
                    </button>
                )}

                {/* Page indicator */}
                <div className="flex items-center gap-1 px-3 py-2 min-w-[80px] justify-center">
                    <span className="text-fbm-gold-400 font-bold">{currentPage}</span>
                    <span className="text-white/50">/</span>
                    <span className="text-white/70">{totalPages}</span>
                </div>

                {/* Next button */}
                {hasNextPage ? (
                    <Link
                        href={createPageUrl(currentPage + 1)}
                        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-fbm-navy-900 bg-fbm-gold-400 hover:bg-fbm-bronze-400 rounded-lg transition-all duration-200"
                    >
                        <span>Sonraki</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                ) : (
                    <button
                        disabled
                        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/40 bg-fbm-denim-750/30 border border-white/10 rounded-lg cursor-not-allowed"
                    >
                        <span>Sonraki</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                )}
            </div>
        </nav>
    );
}
