import { motion, useAnimation, useMotionValue } from 'framer-motion';
import React, { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';

export enum AssetType {
  IMAGE = 'image',
  VIDEO = 'video',
  FONT = 'font',
  SCRIPT = 'script',
  STYLE = 'style',
  AUDIO = 'audio',
}

export enum AssetPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

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
          const styleLink = document.createElement('link');
          styleLink.rel = 'stylesheet';
          styleLink.onload = () => resolve(styleLink);
          styleLink.onerror = reject;
          if (crossOrigin) styleLink.crossOrigin = crossOrigin;
          styleLink.href = src;
          document.head.appendChild(styleLink);
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

