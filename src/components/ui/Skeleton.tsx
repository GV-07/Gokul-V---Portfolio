import React from 'react';

export const Skeleton: React.FC<{
  className?: string;
  variant?: 'rectangular' | 'circular' | 'rounded';
}> = ({ className = '', variant = 'rounded' }) => {
  const roundedClass =
    variant === 'circular'
      ? 'rounded-full'
      : variant === 'rectangular'
      ? 'rounded-none'
      : 'rounded-xl';

  return (
    <div
      className={`animate-pulse bg-slate-800/60 border border-slate-700/40 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent ${roundedClass} ${className}`}
      aria-hidden="true"
    />
  );
};

export const TabSkeletonFallback: React.FC<{ title?: string }> = ({ title = 'Loading section...' }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fadeIn" aria-busy="true" aria-label={title}>
      {/* Header Skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-48 sm:w-64" />
        <Skeleton className="h-4 w-72 sm:w-96" />
      </div>

      {/* Grid of Skeleton Cards to prevent CLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4 shadow-lg min-h-[220px]"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="w-10 h-10" variant="circular" />
              <Skeleton className="w-20 h-6" />
            </div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-2 pt-2">
              <Skeleton className="w-16 h-6" />
              <Skeleton className="w-16 h-6" />
              <Skeleton className="w-16 h-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
