import React, { useState } from 'react';
import { Skeleton } from './Skeleton';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  aspectRatioClass?: string;
  fallbackText?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  width,
  height,
  aspectRatioClass,
  fallbackText = 'GV',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Transform Cloudinary image URL to optimize delivery (WebP/AVIF auto-format & quality)
  const getOptimizedSrc = (url: string) => {
    if (url.includes('cloudinary.com') && url.includes('/upload/') && !url.includes('/upload/f_auto')) {
      return url.replace('/upload/', '/upload/f_auto,q_auto/');
    }
    return url;
  };

  const optimizedSrc = getOptimizedSrc(src);

  return (
    <div
      className={`relative overflow-hidden ${aspectRatioClass || ''}`}
      style={{ width: width || undefined, height: height || undefined }}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-0">
          <Skeleton className="w-full h-full" variant="rectangular" />
        </div>
      )}

      {!hasError ? (
        <img
          src={optimizedSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`${className} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-slate-900 to-indigo-950 text-cyan-400 font-mono font-bold text-sm">
          <span>{fallbackText}</span>
        </div>
      )}
    </div>
  );
};
