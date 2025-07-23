/**
 * Advanced lazy loading and code splitting utilities
 * Production-grade dynamic imports with performance monitoring
 */
import React, { ComponentType, lazy, ReactNode, Suspense, useRef, useEffect, useState } from 'react';
// Simple error boundary fallback
class SimpleErrorBoundary extends React.Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

const ErrorBoundary = SimpleErrorBoundary;

// Enhanced lazy loading with retry mechanism
export const createLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  retries: number = 3,
  delay: number = 1000
) => {
  const LazyComponent = lazy(async () => {
    let lastError: Error | null = null;

    for (let i = 0; i <= retries; i++) {
      try {
        const module = await importFunc();

        // Performance monitoring
        if (typeof performance !== 'undefined') {
          performance.mark(`lazy-load-${module.default.name || 'component'}-success`);
        }

        return module;
      } catch (error) {
        lastError = error as Error;

        if (i < retries) {
          await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        }
      }
    }

    // Log failed lazy load
    console.error('Failed to lazy load component after retries:', lastError);
    throw lastError;
  });

  return LazyComponent;
};

// Smart preloading based on user interaction patterns
export class PreloadManager {
  private preloadedComponents = new Set<string>();
  private preloadPromises = new Map<string, Promise<any>>();

  preload(componentName: string, importFunc: () => Promise<any>): void {
    if (this.preloadedComponents.has(componentName)) return;

    this.preloadedComponents.add(componentName);
    const promise = importFunc().catch(error => {
      console.warn(`Preload failed for ${componentName}:`, error);
      this.preloadedComponents.delete(componentName);
    });

    this.preloadPromises.set(componentName, promise);
  }

  getPreloadPromise(componentName: string): Promise<any> | undefined {
    return this.preloadPromises.get(componentName);
  }

  isPreloaded(componentName: string): boolean {
    return this.preloadedComponents.has(componentName);
  }

  clearPreloaded(): void {
    this.preloadedComponents.clear();
    this.preloadPromises.clear();
  }
}

// Global preload manager
export const globalPreloadManager = new PreloadManager();

// Enhanced error boundary with retry functionality
interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  componentName?: string;
}

const ErrorFallback = ({ error, resetErrorBoundary, componentName }: ErrorFallbackProps) => (
  <div className="flex flex-col items-center justify-center p-8 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
    <div className="text-red-600 dark:text-red-400 mb-4">
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
      Failed to load {componentName || 'component'}
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
      {error.message || 'An unexpected error occurred'}
    </p>
    <button
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
    >
      Try Again
    </button>
  </div>
);

// Loading skeleton with animation
interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

const LoadingSkeleton = ({ className = '', lines = 3 }: LoadingSkeletonProps) => (
  <div className={`animate-pulse ${className}`}>
    {Array.from({ length: lines }, (_, i) => (
      <div
        key={i}
        className={`bg-gray-200 dark:bg-gray-700 rounded ${
          i === lines - 1 ? 'h-4 w-3/4' : 'h-4 w-full'
        } ${i > 0 ? 'mt-3' : ''}`}
      />
    ))}
  </div>
);

// Smart component wrapper with enhanced error handling and loading states
interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ComponentType<ErrorFallbackProps>;
  componentName?: string;
  preloadDelay?: number;
}

export const LazyWrapper = ({
  children,
  fallback = <LoadingSkeleton />,
  errorFallback = ErrorFallback,
  componentName,
  preloadDelay = 100,
}: LazyWrapperProps) => {
  return (
    <ErrorBoundary
      fallback={<div>Error loading component</div>}
    >
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

// Bundle analyzer utilities
export const bundleAnalyzer = {
  logChunkSize: (chunkName: string, size: number) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`📦 Bundle chunk "${chunkName}": ${(size / 1024).toFixed(2)}KB`);
    }
  },

  measureLoadTime: (componentName: string) => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;

      if (process.env.NODE_ENV === 'development') {
        console.log(`⏱️ Component "${componentName}" loaded in ${loadTime.toFixed(2)}ms`);
      }

      return loadTime;
    };
  },
};

// Intersection-based preloading for better UX
export const useIntersectionPreload = (
  componentName: string,
  importFunc: () => Promise<any>,
  options: IntersectionObserverInit = {}
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          globalPreloadManager.preload(componentName, importFunc);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px 0px',
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [componentName, importFunc]);

  return ref;
};

// Resource hints for critical components
export const addResourceHints = (resources: Array<{ href: string; as: string; type?: string }>) => {
  if (typeof document === 'undefined') return;

  resources.forEach(({ href, as, type }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;

    document.head.appendChild(link);
  });
};

// Critical CSS inlining utility
export const inlineCriticalCSS = (css: string) => {
  if (typeof document === 'undefined') return;

  const style = document.createElement('style');
  style.textContent = css;
  style.setAttribute('data-critical', 'true');

  document.head.appendChild(style);
};
