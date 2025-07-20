/**
 * Production-grade asset optimization and preloading
 * Advanced resource management with intelligent caching
 */
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import React, { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Asset types for optimization
export enum AssetType {
  IMAGE = 'image',
  VIDEO = 'video',
  FONT = 'font',
  SCRIPT = 'script',
  STYLE = 'style',
  AUDIO = 'audio',
}

// Asset priority levels
export enum AssetPriority {
  CRITICAL = 'high',
  HIGH = 'high',
  MEDIUM = 'low',
  LOW = 'low',
}

// Asset loading strategies
export enum LoadingStrategy {
  EAGER = 'eager',
  LAZY = 'lazy',
  INTERSECTION = 'intersection',
  HOVER = 'hover',
  CLICK = 'click',
}

interface AssetConfig {
  src: string;
  type: AssetType;
  priority: AssetPriority;
  strategy: LoadingStrategy;
  preload?: boolean;
  prefetch?: boolean;
  crossOrigin?: 'anonymous' | 'use-credentials';
  sizes?: string;
  media?: string;
}

// Advanced asset preloader with intelligent caching
export class AssetPreloader {
  private cache = new Map<string, Promise<any>>();
  private loadedAssets = new Set<string>();
  private failedAssets = new Set<string>();
  private observers = new Map<string, IntersectionObserver>();

  constructor() {
    // Cleanup on page unload
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.cleanup());
    }
  }

  // Preload asset with caching
  async preload(config: AssetConfig): Promise<any> {
    const { src, type, priority } = config;

    if (this.loadedAssets.has(src)) {
      return Promise.resolve();
    }

    if (this.failedAssets.has(src)) {
      return Promise.reject(new Error(`Asset ${src} previously failed to load`));
    }

    if (this.cache.has(src)) {
      return this.cache.get(src);
    }

    const loadPromise = this.loadAsset(config);
    this.cache.set(src, loadPromise);

    try {
      await loadPromise;
      this.loadedAssets.add(src);
      return loadPromise;
    } catch (error) {
      this.failedAssets.add(src);
      this.cache.delete(src);
      throw error;
    }
  }

  // Load asset based on type
  private async loadAsset(config: AssetConfig): Promise<any> {
    const { src, type, crossOrigin } = config;

    return new Promise((resolve, reject) => {
      switch (type) {
        case AssetType.IMAGE:
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          if (crossOrigin) img.crossOrigin = crossOrigin;
          img.src = src;
          break;

        case AssetType.VIDEO:
          const video = document.createElement('video');
          video.oncanplaythrough = () => resolve(video);
          video.onerror = reject;
          if (crossOrigin) video.crossOrigin = crossOrigin;
          video.preload = 'metadata';
          video.src = src;
          break;

        case AssetType.AUDIO:
          const audio = new Audio();
          audio.oncanplaythrough = () => resolve(audio);
          audio.onerror = reject;
          if (crossOrigin) audio.crossOrigin = crossOrigin;
          audio.preload = 'metadata';
          audio.src = src;
          break;

        case AssetType.FONT:
          if ('fonts' in document) {
            const font = new FontFace('preloaded-font', `url(${src})`);
            font.load().then(resolve).catch(reject);
          } else {
            // Fallback for older browsers
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.href = src;
            link.onload = () => resolve(link);
            link.onerror = reject;
            if (crossOrigin) link.crossOrigin = crossOrigin;
            document.head.appendChild(link);
          }
          break;

        case AssetType.SCRIPT:
          const script = document.createElement('script');
          script.onload = () => resolve(script);
          script.onerror = reject;
          if (crossOrigin) script.crossOrigin = crossOrigin;
          script.src = src;
          document.head.appendChild(script);
          break;

        case AssetType.STYLE:
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.onload = () => resolve(link);
          link.onerror = reject;
          if (crossOrigin) link.crossOrigin = crossOrigin;
          link.href = src;
          document.head.appendChild(link);
          break;

        default:
          reject(new Error(`Unsupported asset type: ${type}`));
      }
    });
  }

  // Setup intersection observer for lazy loading
  setupIntersectionLoader(element: HTMLElement, config: AssetConfig): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.preload(config);
          observer.disconnect();
          this.observers.delete(config.src);
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );

    observer.observe(element);
    this.observers.set(config.src, observer);
  }

  // Check if asset is loaded
  isLoaded(src: string): boolean {
    return this.loadedAssets.has(src);
  }

  // Check if asset failed to load
  hasFailed(src: string): boolean {
    return this.failedAssets.has(src);
  }

  // Get cache statistics
  getCacheStats() {
    return {
      cached: this.cache.size,
      loaded: this.loadedAssets.size,
      failed: this.failedAssets.size,
    };
  }

  // Cleanup resources
  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.cache.clear();
  }
}

// Global asset preloader instance
export const globalAssetPreloader = new AssetPreloader();

// React hook for asset preloading
export const useAssetPreloader = () => {
  const [stats, setStats] = useState(globalAssetPreloader.getCacheStats());

  const preload = useCallback((config: AssetConfig) => {
    return globalAssetPreloader.preload(config).finally(() => {
      setStats(globalAssetPreloader.getCacheStats());
    });
  }, []);

  const isLoaded = useCallback((src: string) => {
    return globalAssetPreloader.isLoaded(src);
  }, []);

  const hasFailed = useCallback((src: string) => {
    return globalAssetPreloader.hasFailed(src);
  }, []);

  return { preload, isLoaded, hasFailed, stats };
};

// Smart image component with advanced optimization
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: AssetPriority;
  strategy?: LoadingStrategy;
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
  sizes?: string;
  className?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = AssetPriority.MEDIUM,
  strategy = LoadingStrategy.LAZY,
  quality = 85,
  format = 'auto',
  sizes,
  className,
  onLoad,
  onError,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { preload } = useAssetPreloader();
  const motionOpacity = useMotionValue(0);
  const controls = useAnimation();

  // Generate optimized src based on format and quality
  const optimizedSrc = useMemo(() => {
    if (format === 'auto') {
      // Check browser support for modern formats
      const supportsWebP = typeof window !== 'undefined' && (window as any).supportsWebP !== false;
      const supportsAVIF = typeof window !== 'undefined' && (window as any).supportsAVIF !== false;

      if (supportsAVIF) return `${src}?format=avif&quality=${quality}`;
      if (supportsWebP) return `${src}?format=webp&quality=${quality}`;
    }

    return format === 'auto' ? src : `${src}?format=${format}&quality=${quality}`;
  }, [src, format, quality]);

  // Animate opacity on load for GPU acceleration
  useEffect(() => {
    if (isLoaded) {
      queueAnimation(() => {
        controls.start({ opacity: 1, transition: { duration: 0.3, ease: 'linear' } });
      });
    }
  }, [isLoaded, controls]);

  useEffect(() => {
    if (strategy === LoadingStrategy.EAGER || priority === AssetPriority.CRITICAL) {
      preload({
        src: optimizedSrc,
        type: AssetType.IMAGE,
        priority,
        strategy,
      })
        .then(() => {
          setIsLoaded(true);
          onLoad?.();
        })
        .catch(error => {
          setHasError(true);
          onError?.(error);
        });
    }
  }, [optimizedSrc, strategy, priority, preload, onLoad, onError]);

  if (hasError) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-800 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <AssetErrorBoundary>
      <motion.img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={strategy === LoadingStrategy.LAZY ? 'lazy' : 'eager'}
        decoding="async"
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
        onError={e => {
          setHasError(true);
          onError?.(new Error('Image failed to load'));
        }}
        className={`${className} will-change-transform`}
        initial={{ opacity: 0 }}
        animate={controls}
        style={{ opacity: motionOpacity, backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
      />
    </AssetErrorBoundary>
  );
};

// --- Error Boundary for production reliability ---
class AssetErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    // TODO: Integrate with production monitoring (e.g., Sentry)
    if (process.env.NODE_ENV === 'production') {
      // sendErrorToMonitoringService(error, info);
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-100 text-red-700 p-2 rounded">
          Something went wrong loading this asset.
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Debounce utility for gestures ---
function debounce<T extends (...args: any[]) => void>(fn: T, ms = 100) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms);
  };
}

// --- Animation queue for resource management ---
const animationQueue: Array<() => void> = [];
let isAnimating = false;
function queueAnimation(fn: () => void) {
  animationQueue.push(fn);
  if (!isAnimating) {
    isAnimating = true;
    requestAnimationFrame(runAnimationQueue);
  }
}
function runAnimationQueue() {
  while (animationQueue.length) {
    const fn = animationQueue.shift();
    fn && fn();
  }
  isAnimating = false;
}

// --- Lazy load heavy components ---
const LazyOptimizedVideo = lazy(
  () => import(/* webpackChunkName: "OptimizedVideo" */ './OptimizedVideoImpl')
);

// --- OptimizedVideo moved to a separate chunk for code splitting ---
/*
  To enable bundle splitting, move OptimizedVideo to its own file:
  ./OptimizedVideoImpl.tsx
  and export as default.
  Here, we lazy load it and wrap with Suspense.
*/
export const OptimizedVideo = (props: any) => (
  <AssetErrorBoundary>
    <Suspense fallback={<div className="bg-gray-100 animate-pulse w-full h-48" />}>
      <LazyOptimizedVideo {...props} />
    </Suspense>
  </AssetErrorBoundary>
);

// --- Enhanced font optimization with progressive enhancement ---
export const optimizeFonts = (
  fonts: Array<{
    family: string;
    weights: number[];
    display?: 'auto' | 'swap' | 'fallback' | 'optional';
  }>
) => {
  if (typeof document === 'undefined' || !('fonts' in document)) return;

  fonts.forEach(({ family, weights, display = 'swap' }) => {
    weights.forEach(weight => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = `/fonts/${family}-${weight}.woff2`;
      document.head.appendChild(link);
    });

    // Add font-display CSS
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: '${family}';
        font-display: ${display};
      }
    `;
    document.head.appendChild(style);
  });
};

// --- Production monitoring hook (placeholder) ---
export function useProductionMonitoring() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // Integrate with analytics/monitoring here
      // e.g., window.monitoringService?.init();
    }
  }, []);
}
// --- Critical CSS inlining utility ---
    if (strategy === LoadingStrategy.INTERSECTION && videoRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        { rootMargin: '100px 0px' }
      );

      observer.observe(videoRef.current);
      return () => observer.disconnect();
    }
  }, [strategy]);

  return (
    <video
      ref={videoRef}
      width={width}
      height={height}
      poster={poster}
      autoPlay={autoPlay && isLoaded}
      muted={muted}
      loop={loop}
      controls={controls}
      className={className}
      preload="metadata"
      playsInline
    >
      {shouldLoad && <source src={src} type="video/mp4" />}
    </video>
  );
};

// --- Enhanced font optimization with progressive enhancement ---
export const optimizeFonts = (
  fonts: Array<{
    family: string;
    weights: number[];
    display?: 'auto' | 'swap' | 'fallback' | 'optional';
  }>
) => {
  if (typeof document === 'undefined' || !('fonts' in document)) return;

  fonts.forEach(({ family, weights, display = 'swap' }) => {
    weights.forEach(weight => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = `/fonts/${family}-${weight}.woff2`;
      document.head.appendChild(link);
    });

    // Add font-display CSS
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: '${family}';
        font-display: ${display};
      }
    `;
    document.head.appendChild(style);
  });
};

// --- Production monitoring hook (placeholder) ---
export function useProductionMonitoring() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // Integrate with analytics/monitoring here
      // e.g., window.monitoringService?.init();
    }
  }, []);
}
// --- Critical CSS inlining utility ---
