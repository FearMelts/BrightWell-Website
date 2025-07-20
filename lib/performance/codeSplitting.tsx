/**
 * Advanced code splitting and bundle optimization
 * Dynamic imports with intelligent loading strategies
 */
import { ComponentType, lazy, LazyExoticComponent, Suspense } from 'react';
import { globalPerformanceMonitor, OptimizationLevel } from './performanceMonitor';

// Bundle analysis and splitting configuration
interface BundleConfig {
  chunkName: string;
  priority: 'high' | 'medium' | 'low';
  preload?: boolean;
  prefetch?: boolean;
  critical?: boolean;
  maxAge?: number;
}

// Advanced lazy loading with retry mechanism
interface LazyLoadOptions {
  retries?: number;
  retryDelay?: number;
  fallback?: ComponentType;
  preload?: boolean;
  priority?: 'high' | 'medium' | 'low';
}

// Component registry for intelligent loading
class ComponentRegistry {
  private components = new Map<string, LazyExoticComponent<any>>();
  private loadingStates = new Map<string, boolean>();
  private failedComponents = new Set<string>();
  private retryAttempts = new Map<string, number>();

  register(
    name: string,
    importFn: () => Promise<any>,
    options: LazyLoadOptions = {}
  ): LazyExoticComponent<any> {
    if (this.components.has(name)) {
      return this.components.get(name)!;
    }

    const { retries = 3, retryDelay = 1000, fallback } = options;

    const lazyComponent = lazy(async () => {
      this.loadingStates.set(name, true);

      try {
        const component = await this.loadWithRetry(importFn, retries, retryDelay);
        this.loadingStates.set(name, false);
        this.retryAttempts.delete(name);
        this.failedComponents.delete(name);
        return component;
      } catch (error) {
        this.loadingStates.set(name, false);
        this.failedComponents.add(name);
        console.error(`Failed to load component ${name}:`, error);

        if (fallback) {
          return { default: fallback };
        }

        throw error;
      }
    });

    this.components.set(name, lazyComponent);

    // Preload if requested
    if (options.preload) {
      this.preloadComponent(name);
    }

    return lazyComponent;
  }

  private async loadWithRetry(
    importFn: () => Promise<any>,
    retries: number,
    delay: number
  ): Promise<any> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await importFn();
      } catch (error) {
        if (attempt === retries) {
          throw error;
        }

        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
      }
    }
  }

  preloadComponent(name: string): void {
    const component = this.components.get(name);
    if (component && !this.loadingStates.get(name) && !this.failedComponents.has(name)) {
      // Trigger lazy loading without rendering
      const tempDiv = document.createElement('div');
      tempDiv.style.display = 'none';
      document.body.appendChild(tempDiv);

      const React = require('react');
      const ReactDOM = require('react-dom');

      ReactDOM.render(
        React.createElement(
          Suspense,
          { fallback: React.createElement('div') },
          React.createElement(component)
        ),
        tempDiv
      );

      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(tempDiv);
        document.body.removeChild(tempDiv);
      }, 100);
    }
  }

  getLoadingState(name: string): boolean {
    return this.loadingStates.get(name) || false;
  }

  hasFailed(name: string): boolean {
    return this.failedComponents.has(name);
  }

  getRetryCount(name: string): number {
    return this.retryAttempts.get(name) || 0;
  }

  clear(): void {
    this.components.clear();
    this.loadingStates.clear();
    this.failedComponents.clear();
    this.retryAttempts.clear();
  }
}

// Global component registry
export const globalComponentRegistry = new ComponentRegistry();

// Smart code splitting hook
export const useCodeSplitting = (
  importFn: () => Promise<any>,
  options: LazyLoadOptions & { name: string }
) => {
  const { name, ...lazyOptions } = options;

  const component = globalComponentRegistry.register(name, importFn, lazyOptions);
  const isLoading = globalComponentRegistry.getLoadingState(name);
  const hasFailed = globalComponentRegistry.hasFailed(name);
  const retryCount = globalComponentRegistry.getRetryCount(name);

  return {
    Component: component,
    isLoading,
    hasFailed,
    retryCount,
    preload: () => globalComponentRegistry.preloadComponent(name),
  };
};

// Bundle size analyzer
export class BundleAnalyzer {
  private bundleSizes = new Map<string, number>();
  private loadTimes = new Map<string, number>();
  private compressionRatios = new Map<string, number>();

  recordBundleSize(name: string, size: number): void {
    this.bundleSizes.set(name, size);
  }

  recordLoadTime(name: string, time: number): void {
    this.loadTimes.set(name, time);
  }

  recordCompressionRatio(name: string, ratio: number): void {
    this.compressionRatios.set(name, ratio);
  }

  getBundleAnalysis(): {
    totalSize: number;
    averageLoadTime: number;
    averageCompressionRatio: number;
    bundles: Array<{
      name: string;
      size: number;
      loadTime: number;
      compressionRatio: number;
      efficiency: number;
    }>;
  } {
    const bundles: any[] = [];
    let totalSize = 0;
    let totalLoadTime = 0;
    let totalCompressionRatio = 0;

    this.bundleSizes.forEach((size, name) => {
      const loadTime = this.loadTimes.get(name) || 0;
      const compressionRatio = this.compressionRatios.get(name) || 1;
      const efficiency = size > 0 ? (compressionRatio * 1000) / (loadTime + 1) : 0;

      bundles.push({
        name,
        size,
        loadTime,
        compressionRatio,
        efficiency,
      });

      totalSize += size;
      totalLoadTime += loadTime;
      totalCompressionRatio += compressionRatio;
    });

    return {
      totalSize,
      averageLoadTime: totalLoadTime / bundles.length || 0,
      averageCompressionRatio: totalCompressionRatio / bundles.length || 1,
      bundles: bundles.sort((a, b) => b.efficiency - a.efficiency),
    };
  }

  getOptimizationRecommendations(): string[] {
    const analysis = this.getBundleAnalysis();
    const recommendations: string[] = [];

    // Large bundle detection
    analysis.bundles.forEach(bundle => {
      if (bundle.size > 100 * 1024) {
        // 100KB
        recommendations.push(
          `Bundle "${bundle.name}" is large (${Math.round(bundle.size / 1024)}KB). Consider code splitting.`
        );
      }

      if (bundle.loadTime > 1000) {
        // 1 second
        recommendations.push(
          `Bundle "${bundle.name}" has slow load time (${bundle.loadTime}ms). Consider optimization.`
        );
      }

      if (bundle.compressionRatio > 0.8) {
        recommendations.push(
          `Bundle "${bundle.name}" has poor compression (${Math.round(bundle.compressionRatio * 100)}%). Consider minification.`
        );
      }
    });

    // Overall recommendations
    if (analysis.totalSize > 1024 * 1024) {
      // 1MB
      recommendations.push(
        'Total bundle size is large. Consider aggressive code splitting and tree shaking.'
      );
    }

    if (analysis.averageLoadTime > 500) {
      recommendations.push('Average load time is high. Consider CDN delivery and HTTP/2 push.');
    }

    return recommendations;
  }
}

// Global bundle analyzer
export const globalBundleAnalyzer = new BundleAnalyzer();

// Performance-aware dynamic import
export const performanceAwareDynamicImport = async <T = any,>(
  importFn: () => Promise<T>,
  bundleName: string,
  priority: 'high' | 'medium' | 'low' = 'medium'
): Promise<T> => {
  const startTime = performance.now();
  const optimizationLevel = globalPerformanceMonitor.getOptimizationLevel();

  // Adjust loading strategy based on performance
  const shouldDefer = optimizationLevel === OptimizationLevel.MAXIMUM && priority === 'low';

  if (shouldDefer) {
    // Defer low-priority imports when performance is critical
    await new Promise(resolve => {
      requestIdleCallback ? requestIdleCallback(resolve) : setTimeout(resolve, 0);
    });
  }

  try {
    const module = await importFn();
    const loadTime = performance.now() - startTime;

    // Record metrics
    globalBundleAnalyzer.recordLoadTime(bundleName, loadTime);

    return module;
  } catch (error) {
    console.error(`Failed to load bundle ${bundleName}:`, error);
    throw error;
  }
};

// Tree shaking helper
export const treeShakeableImport = <T extends Record<string, any>>(
  module: T,
  exports: Array<keyof T>
): Partial<T> => {
  const shaken: Partial<T> = {};

  exports.forEach(exportName => {
    if (exportName in module) {
      shaken[exportName] = module[exportName];
    }
  });

  return shaken;
};

// Intelligent chunk loading
export class ChunkLoader {
  private loadedChunks = new Set<string>();
  private loadingChunks = new Map<string, Promise<any>>();
  private chunkPriorities = new Map<string, number>();

  constructor() {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const chunkName = entry.target.getAttribute('data-chunk');
            if (chunkName && !this.loadedChunks.has(chunkName)) {
              this.preloadChunk(chunkName);
            }
          }
        });
      },
      { rootMargin: '100px' }
    );

    // Observe elements with data-chunk attributes
    const chunkElements = document.querySelectorAll('[data-chunk]');
    chunkElements.forEach(element => observer.observe(element));
  }

  async loadChunk(
    chunkName: string,
    importFn: () => Promise<any>,
    priority: number = 0
  ): Promise<any> {
    if (this.loadedChunks.has(chunkName)) {
      return Promise.resolve();
    }

    if (this.loadingChunks.has(chunkName)) {
      return this.loadingChunks.get(chunkName);
    }

    this.chunkPriorities.set(chunkName, priority);

    const loadPromise = performanceAwareDynamicImport(
      importFn,
      chunkName,
      priority > 5 ? 'high' : priority > 2 ? 'medium' : 'low'
    )
      .then(module => {
        this.loadedChunks.add(chunkName);
        this.loadingChunks.delete(chunkName);
        return module;
      })
      .catch(error => {
        this.loadingChunks.delete(chunkName);
        throw error;
      });

    this.loadingChunks.set(chunkName, loadPromise);
    return loadPromise;
  }

  preloadChunk(chunkName: string): void {
    const priority = this.chunkPriorities.get(chunkName) || 0;

    // Only preload if performance allows
    const optimizationLevel = globalPerformanceMonitor.getOptimizationLevel();
    if (optimizationLevel === OptimizationLevel.MAXIMUM && priority < 5) {
      return; // Skip preloading low-priority chunks when performance is critical
    }

    // Add to preload queue
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'script';
    link.href = `/chunks/${chunkName}.js`; // Adjust path as needed
    document.head.appendChild(link);
  }

  isLoaded(chunkName: string): boolean {
    return this.loadedChunks.has(chunkName);
  }

  isLoading(chunkName: string): boolean {
    return this.loadingChunks.has(chunkName);
  }

  getLoadingProgress(): { loaded: number; total: number; percentage: number } {
    const total = this.loadedChunks.size + this.loadingChunks.size;
    const loaded = this.loadedChunks.size;

    return {
      loaded,
      total,
      percentage: total > 0 ? (loaded / total) * 100 : 0,
    };
  }
}

// Global chunk loader
export const globalChunkLoader = new ChunkLoader();

// React component for intelligent code splitting
interface SplitComponentProps {
  componentName: string;
  importFn: () => Promise<any>;
  fallback?: React.ReactNode;
  priority?: 'high' | 'medium' | 'low';
  preload?: boolean;
  children?: (Component: any) => React.ReactNode;
}

export const SplitComponent: React.FC<SplitComponentProps> = ({
  componentName,
  importFn,
  fallback = <div>Loading...</div>,
  priority = 'medium',
  preload = false,
  children,
}) => {
  const { Component, isLoading, hasFailed } = useCodeSplitting(importFn, {
    name: componentName,
    priority,
  });

  if (hasFailed) {
    return <div>Failed to load component: {componentName}</div>;
  }

  return <Suspense fallback={fallback}>{children ? children(Component) : <Component />}</Suspense>;
};

// Bundle optimization utilities
export const bundleOptimizations = {
  // Eliminate dead code
  eliminateDeadCode: (code: string): string => {
    // Basic dead code elimination (would use AST in production)
    return code
      .split('\n')
      .filter(line => {
        const trimmed = line.trim();
        return (
          trimmed &&
          !trimmed.startsWith('//') &&
          !trimmed.startsWith('console.log') &&
          !trimmed.startsWith('debugger')
        );
      })
      .join('\n');
  },

  // Extract common dependencies
  extractCommonDependencies: (modules: string[]): string[] => {
    const dependencyCounts = new Map<string, number>();

    modules.forEach(moduleCode => {
      const imports = moduleCode.match(/import .* from ['"](.*)['"]/g) || [];
      imports.forEach(importLine => {
        const match = importLine.match(/from ['"](.*)['"]/);
        if (match) {
          const dependency = match[1];
          dependencyCounts.set(dependency, (dependencyCounts.get(dependency) || 0) + 1);
        }
      });
    });

    // Return dependencies used by multiple modules
    return Array.from(dependencyCounts.entries())
      .filter(([_, count]) => count > 1)
      .map(([dependency]) => dependency);
  },

  // Generate optimal chunk configuration
  generateChunkConfig: (
    analysis: ReturnType<BundleAnalyzer['getBundleAnalysis']>
  ): BundleConfig[] => {
    return analysis.bundles.map(bundle => ({
      chunkName: bundle.name,
      priority: bundle.efficiency > 10 ? 'high' : bundle.efficiency > 5 ? 'medium' : 'low',
      preload: bundle.size < 50 * 1024 && bundle.efficiency > 8,
      prefetch: bundle.efficiency > 5,
      critical: bundle.loadTime < 200 && bundle.size < 20 * 1024,
      maxAge: bundle.efficiency > 10 ? 86400 : 3600, // 1 day vs 1 hour
    }));
  },
};
