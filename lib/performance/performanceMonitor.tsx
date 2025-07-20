/**
 * Advanced performance monitoring and optimization
 * Real-time metrics and automatic performance adjustments
 */
import { ReactNode, useEffect, useMemo, useState } from 'react';

// Performance metrics interface
interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  paintTime: number;
  scriptTime: number;
  layoutTime: number;
  networkLatency: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  connectionType: 'slow-2g' | '2g' | '3g' | '4g' | 'unknown';
}

// Performance thresholds for automatic optimization
const PERFORMANCE_THRESHOLDS = {
  LOW_FPS: 30,
  HIGH_MEMORY: 100 * 1024 * 1024, // 100MB
  SLOW_PAINT: 16, // > 16ms
  SLOW_SCRIPT: 50, // > 50ms
  SLOW_NETWORK: 1000, // > 1s
};

// Performance optimization levels
export enum OptimizationLevel {
  MAXIMUM = 'maximum',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  MINIMAL = 'minimal',
}

// Real-time performance monitor
export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    fps: 60,
    memoryUsage: 0,
    paintTime: 0,
    scriptTime: 0,
    layoutTime: 0,
    networkLatency: 0,
    deviceType: 'desktop',
    connectionType: 'unknown',
  };

  private observers: Array<(metrics: PerformanceMetrics) => void> = [];
  private frameCount = 0;
  private lastTime = 0;
  private rafId: number | null = null;
  private performanceObserver: PerformanceObserver | null = null;

  constructor() {
    this.detectDevice();
    this.detectConnection();
    this.startMonitoring();
  }

  // Start performance monitoring
  startMonitoring(): void {
    if (typeof window === 'undefined') return;

    // FPS monitoring
    this.startFPSMonitoring();

    // Memory monitoring
    this.startMemoryMonitoring();

    // Performance observer for detailed metrics
    if ('PerformanceObserver' in window) {
      this.performanceObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          switch (entry.entryType) {
            case 'paint':
              if (entry.name === 'first-contentful-paint') {
                this.metrics.paintTime = entry.startTime;
              }
              break;
            case 'measure':
              if (entry.name.includes('script')) {
                this.metrics.scriptTime = entry.duration;
              } else if (entry.name.includes('layout')) {
                this.metrics.layoutTime = entry.duration;
              }
              break;
            case 'navigation':
              this.metrics.networkLatency = (entry as PerformanceNavigationTiming).responseStart;
              break;
          }
        }
        this.notifyObservers();
      });

      try {
        this.performanceObserver.observe({ entryTypes: ['paint', 'measure', 'navigation'] });
      } catch (error) {
        console.warn('Performance monitoring not fully supported:', error);
      }
    }
  }

  // FPS monitoring using RAF
  private startFPSMonitoring(): void {
    const measureFPS = (timestamp: number) => {
      if (this.lastTime === 0) {
        this.lastTime = timestamp;
      }

      const delta = timestamp - this.lastTime;
      if (delta >= 1000) {
        this.metrics.fps = Math.round((this.frameCount * 1000) / delta);
        this.frameCount = 0;
        this.lastTime = timestamp;
        this.notifyObservers();
      }

      this.frameCount++;
      this.rafId = requestAnimationFrame(measureFPS);
    };

    this.rafId = requestAnimationFrame(measureFPS);
  }

  // Memory monitoring
  private startMemoryMonitoring(): void {
    if (typeof window === 'undefined') return;

    const updateMemory = () => {
      if ('memory' in performance) {
        this.metrics.memoryUsage = (performance as any).memory.usedJSHeapSize;
      }
    };

    setInterval(updateMemory, 5000); // Update every 5 seconds
  }

  // Device detection
  private detectDevice(): void {
    if (typeof window === 'undefined') return;

    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
    const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(userAgent);

    if (isMobile && !isTablet) {
      this.metrics.deviceType = 'mobile';
    } else if (isTablet) {
      this.metrics.deviceType = 'tablet';
    } else {
      this.metrics.deviceType = 'desktop';
    }
  }

  // Connection detection
  private detectConnection(): void {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      this.metrics.connectionType = connection.effectiveType || 'unknown';

      connection.addEventListener('change', () => {
        this.metrics.connectionType = connection.effectiveType || 'unknown';
        this.notifyObservers();
      });
    }
  }

  // Subscribe to performance updates
  subscribe(callback: (metrics: PerformanceMetrics) => void): () => void {
    this.observers.push(callback);
    return () => {
      const index = this.observers.indexOf(callback);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }

  // Notify all observers
  private notifyObservers(): void {
    this.observers.forEach(callback => callback({ ...this.metrics }));
  }

  // Get current metrics
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Determine optimization level based on performance
  getOptimizationLevel(): OptimizationLevel {
    const { fps, memoryUsage, paintTime, scriptTime, connectionType, deviceType } = this.metrics;

    let score = 0;

    // FPS scoring
    if (fps < PERFORMANCE_THRESHOLDS.LOW_FPS) score += 3;
    else if (fps < 45) score += 2;
    else if (fps < 55) score += 1;

    // Memory scoring
    if (memoryUsage > PERFORMANCE_THRESHOLDS.HIGH_MEMORY) score += 3;
    else if (memoryUsage > 50 * 1024 * 1024) score += 2;
    else if (memoryUsage > 25 * 1024 * 1024) score += 1;

    // Paint time scoring
    if (paintTime > PERFORMANCE_THRESHOLDS.SLOW_PAINT) score += 2;

    // Script time scoring
    if (scriptTime > PERFORMANCE_THRESHOLDS.SLOW_SCRIPT) score += 2;

    // Device and connection scoring
    if (deviceType === 'mobile') score += 1;
    if (connectionType === 'slow-2g' || connectionType === '2g') score += 3;
    else if (connectionType === '3g') score += 1;

    // Determine optimization level
    if (score >= 8) return OptimizationLevel.MAXIMUM;
    if (score >= 6) return OptimizationLevel.HIGH;
    if (score >= 4) return OptimizationLevel.MEDIUM;
    if (score >= 2) return OptimizationLevel.LOW;
    return OptimizationLevel.MINIMAL;
  }

  // Stop monitoring
  stop(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
      this.performanceObserver = null;
    }

    this.observers = [];
  }
}

// Global performance monitor
export const globalPerformanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>(globalPerformanceMonitor.getMetrics());
  const [optimizationLevel, setOptimizationLevel] = useState<OptimizationLevel>(
    globalPerformanceMonitor.getOptimizationLevel()
  );

  useEffect(() => {
    const unsubscribe = globalPerformanceMonitor.subscribe(newMetrics => {
      setMetrics(newMetrics);
      setOptimizationLevel(globalPerformanceMonitor.getOptimizationLevel());
    });

    return unsubscribe;
  }, []);

  return { metrics, optimizationLevel };
};

// Adaptive animation reducer based on performance
export const useAdaptiveAnimations = (baseConfig: any) => {
  const { optimizationLevel } = usePerformanceMonitor();

  return useMemo(() => {
    switch (optimizationLevel) {
      case OptimizationLevel.MAXIMUM:
        return {
          ...baseConfig,
          transition: { duration: 0 }, // No animations
          animate: baseConfig.animate, // Skip intermediate states
        };

      case OptimizationLevel.HIGH:
        return {
          ...baseConfig,
          transition: {
            ...baseConfig.transition,
            duration: (baseConfig.transition?.duration || 0.5) * 0.5,
          },
        };

      case OptimizationLevel.MEDIUM:
        return {
          ...baseConfig,
          transition: {
            ...baseConfig.transition,
            duration: (baseConfig.transition?.duration || 0.5) * 0.75,
          },
        };

      default:
        return baseConfig;
    }
  }, [optimizationLevel, baseConfig]);
};

// Performance budget enforcer
export class PerformanceBudget {
  private budgets = new Map<string, { limit: number; current: number; violations: number }>();

  setBudget(metric: string, limit: number): void {
    this.budgets.set(metric, { limit, current: 0, violations: 0 });
  }

  recordMetric(metric: string, value: number): boolean {
    const budget = this.budgets.get(metric);
    if (!budget) return true;

    budget.current = value;

    if (value > budget.limit) {
      budget.violations++;
      console.warn(`Performance budget exceeded for ${metric}: ${value} > ${budget.limit}`);
      return false;
    }

    return true;
  }

  getBudgetStatus(): Record<
    string,
    { limit: number; current: number; violations: number; healthy: boolean }
  > {
    const status: Record<string, any> = {};

    this.budgets.forEach((budget, metric) => {
      status[metric] = {
        ...budget,
        healthy: budget.current <= budget.limit,
      };
    });

    return status;
  }

  reset(): void {
    this.budgets.forEach(budget => {
      budget.current = 0;
      budget.violations = 0;
    });
  }
}

// Global performance budget
export const globalPerformanceBudget = new PerformanceBudget();

// Initialize default budgets
globalPerformanceBudget.setBudget('fps', 30);
globalPerformanceBudget.setBudget('memory', 100 * 1024 * 1024);
globalPerformanceBudget.setBudget('paintTime', 16);
globalPerformanceBudget.setBudget('scriptTime', 50);

// Performance-aware component wrapper
interface PerformanceWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  performanceThreshold?: OptimizationLevel;
}

export const PerformanceWrapper = ({
  children,
  fallback,
  performanceThreshold = OptimizationLevel.HIGH,
}: PerformanceWrapperProps) => {
  const { optimizationLevel } = usePerformanceMonitor();

  const shouldRenderFallback = useMemo(() => {
    const levels = [
      OptimizationLevel.MINIMAL,
      OptimizationLevel.LOW,
      OptimizationLevel.MEDIUM,
      OptimizationLevel.HIGH,
      OptimizationLevel.MAXIMUM,
    ];

    const currentIndex = levels.indexOf(optimizationLevel);
    const thresholdIndex = levels.indexOf(performanceThreshold);

    return currentIndex >= thresholdIndex;
  }, [optimizationLevel, performanceThreshold]);

  if (shouldRenderFallback && fallback) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
