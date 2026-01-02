/* app/satilik/loading.tsx */

import { PropertyCardSkeleton } from '@/app/components/PropertyCardSkeleton';
import { PageHeader } from '@/app/components/layout/PageHeader';

export default function Loading() {
    return (
        <main className="min-h-screen bg-[#12161f]">
            {/* Cinematic Header - Same as page.tsx */}
            <PageHeader
                title="Satılık Portföyü"
                subtitle="Eşsiz Yaşam Alanları"
                bgImage="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
            />

            {/* Content */}
            <section className="py-20 md:py-24 px-6 md:px-12">
                <div className="container mx-auto max-w-7xl">
                    {/* Filter Skeleton */}
                    <div className="mb-16 h-20 bg-white/5 rounded-lg animate-pulse" />

                    {/* Grid Skeleton - Matching grid-cols-3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {Array.from({ length: 9 }).map((_, index) => (
                            <PropertyCardSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
