/* app/components/PropertyCardSkeleton.tsx */

export function PropertyCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/[0.05] aspect-[16/10]">
      {/* Background Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-shimmer bg-[length:200%_100%]" />

      {/* Content Overlay Skeleton */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 space-y-3">

        {/* Location */}
        <div className="h-3 w-1/3 bg-white/20 rounded animate-pulse" />

        {/* Title */}
        <div className="h-6 w-3/4 bg-white/20 rounded animate-pulse" />

        {/* Specs Row */}
        <div className="flex gap-4 pt-1">
          <div className="h-3 w-12 bg-white/10 rounded animate-pulse" />
          <div className="h-3 w-12 bg-white/10 rounded animate-pulse" />
          <div className="h-3 w-12 bg-white/10 rounded animate-pulse" />
        </div>
      </div>

      {/* Price Badge - Top Right */}
      <div className="absolute top-4 right-4 h-8 w-24 bg-white/20 rounded-lg animate-pulse" />
    </div>
  );
}
