/* app/satilik/loading.tsx */

import { PropertyCardSkeleton } from '@/app/components/PropertyCardSkeleton';

export default function Loading() {
    return (
        <main className="min-h-screen pt-36 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="font-serif text-5xl md:text-7xl text-fbm-gold-400 mb-4">
                        Satılık Konutlar
                    </h1>
                    <p className="font-sans text-lg text-white/80 max-w-2xl mx-auto">
                        Hayalinizdeki evi bulun. Seçkin lokasyonlarda, kaliteli yapılar.
                    </p>
                </div>

                {/* Loading skeleton grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <PropertyCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        </main>
    );
}
