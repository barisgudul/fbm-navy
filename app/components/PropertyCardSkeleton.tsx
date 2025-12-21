/* app/components/PropertyCardSkeleton.tsx */

export function PropertyCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-fbm-denim-750/50 backdrop-blur-sm border border-fbm-sage-200/30 flex flex-col h-full">
      {/* Image skeleton */}
      <div className="relative h-64 overflow-hidden rounded-t-lg bg-fbm-denim-750">
        <div className="w-full h-full bg-gradient-to-r from-fbm-navy-900/50 via-fbm-denim-750/80 to-fbm-navy-900/50 animate-shimmer bg-[length:200%_100%]" />
      </div>

      {/* Content skeleton */}
      <div className="p-6 flex flex-col h-full animate-pulse">
        {/* Title skeleton */}
        <div className="mb-2 min-h-[3.5rem] space-y-2">
          <div className="h-6 bg-fbm-denim-750 rounded w-3/4" />
          <div className="h-6 bg-fbm-denim-750 rounded w-1/2" />
        </div>

        {/* Location skeleton */}
        <div className="mb-4">
          <div className="h-4 bg-fbm-denim-750/70 rounded w-2/3" />
        </div>

        {/* Specs skeleton */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="h-4 bg-fbm-denim-750/70 rounded w-16" />
          <div className="h-4 bg-fbm-denim-750/70 rounded w-20" />
          <div className="h-4 bg-fbm-denim-750/70 rounded w-16" />
        </div>

        {/* Price skeleton */}
        <div className="pt-4 border-t border-fbm-sage-200/30">
          <div className="h-8 bg-fbm-denim-750 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}
