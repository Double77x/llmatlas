import { cn } from "@/lib/utils";

export const ToolCardSkeleton = () => {
  return (
    <div className="p-4 md:p-6 bg-card border border-border shadow-sm flex flex-row gap-4 md:gap-6 items-start">
      {/* Middle: Content Skeleton */}
      <div className="flex-1 space-y-3 min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {/* Title Skeleton - Matching exactly text-lg (18px) md:text-2xl (24px) leading-none */}
          <div className="h-4.5 md:h-6 w-48 bg-muted animate-pulse rounded-none" />

          {/* Metadata Badges Skeleton - Slightly smaller to match text-[10px] */}
          <div className="flex flex-wrap gap-2 items-center">
            <div className="h-4 w-12 bg-muted animate-pulse rounded-none" />
            <div className="h-4 w-16 bg-muted animate-pulse rounded-none" />
            <div className="h-4 w-14 bg-muted animate-pulse rounded-none" />
          </div>
        </div>

        {/* Description Skeleton - Thin lines to account for leading-relaxed whitespace */}
        <div className="space-y-2.5">
          <div className="h-3 md:h-3.5 w-full bg-muted animate-pulse rounded-none" />
          <div className="h-3 md:h-3.5 w-3/4 bg-muted animate-pulse rounded-none" />
        </div>

        {/* Tags Skeleton - Matching text-[10px] */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
          <div className="h-3 w-16 bg-muted animate-pulse rounded-none" />
          <div className="h-3 w-20 bg-muted animate-pulse rounded-none" />
        </div>

        {/* Actions Skeleton - Matching text-[10px] */}
        <div className="flex items-center gap-6 pt-1">
          <div className="h-3 w-12 bg-muted animate-pulse rounded-none" />
          <div className="h-3 w-16 bg-muted animate-pulse rounded-none" />
        </div>
      </div>

      {/* Right: Vote Button Skeleton - Perfect match for w-16/20 h-16/20 */}
      <div className="flex flex-col items-center justify-start min-w-16 md:min-w-20">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-muted animate-pulse border-2 border-border" />
      </div>
    </div>
  );
};

export const ToolListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ToolCardSkeleton key={i} />
      ))}
    </div>
  );
};
