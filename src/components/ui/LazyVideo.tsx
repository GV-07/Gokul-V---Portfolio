import React, { useRef, useState, useEffect } from 'react';
import { Skeleton } from './Skeleton';

interface LazyVideoProps {
  src: string;
  poster?: string;
  fallbackImage?: string;
  alt?: string;
  className?: string;
  aspectRatioClass?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  poster = '/avatar_still.jpg',
  fallbackImage = '/avatar_still.jpg',
  alt = 'Media content',
  className = 'w-full h-full object-cover',
  aspectRatioClass = 'aspect-square',
  autoPlay = true,
  loop = true,
  muted = true, // MUST default to true to prevent browser errors
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Track the mute state internally
  const [isMuted, setIsMuted] = useState(muted);

  // Toggle sound safely on click (the click counts as user interaction)
  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextState = !videoRef.current.muted;
      videoRef.current.muted = nextState;
      setIsMuted(nextState);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (videoRef.current && autoPlay) {
              // Safe play catch for browser policies
              videoRef.current.play().catch(() => {});
            }
          } else {
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
            }
          }
        });
      },
      { rootMargin: '100px 0px', threshold: 0.1 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [autoPlay]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${aspectRatioClass}`}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-0">
          <Skeleton className="w-full h-full" variant="rectangular" />
        </div>
      )}

      {!hasError ? (
        <video
          ref={videoRef}
          onClick={handleVideoClick}
          src={isInView ? src : undefined}
          poster={poster}
          preload="metadata"
          autoPlay={autoPlay}
          loop={loop}
          muted={isMuted}
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`${className} cursor-pointer transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          title={isMuted ? "Click to Unmute" : "Click to Mute"}
        />
      ) : (
        <img
          src={fallbackImage}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`${className} opacity-100 transition-opacity duration-300`}
        />
      )}
    </div>
  );
};