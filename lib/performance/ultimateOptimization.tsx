/**
 * ULTIMATE PRODUCTION OPTIMIZATION FRAMEWORK
 * Maximum performance enhancements for Framer Motion deployment
 * Advanced gesture debouncing, memory management, and layout optimization
 */
import {
  LazyMotion,
  domAnimation,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import React, {
  Component,
  ComponentProps,
  ReactNode,
  forwardRef,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// Performance monitoring and adaptive optimization
interface PerformanceMetrics {
  fps: number;
  memory: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  networkSpeed: 'slow' | 'medium' | 'fast';
  batteryLevel?: number;
  isLowPowerMode?: boolean;
}

class UltimatePerformanceManager {
  private metrics: PerformanceMetrics = {
    fps: 60,
    memory: 0,
    deviceType: 'desktop',
    networkSpeed: 'fast',
  };

  private optimizationLevel = 0; // 0-4 (0=max quality, 4=max performance)
  private observers: Array<(level: number) => void> = [];
  private frameCount = 0;
  private lastTime = 0;
  private animationQueue: Array<() => void> = [];
  private isProcessingQueue = false;

  constructor() {
    this.detectDevice();
    this.startMonitoring();
    this.setupIntersectionOptimization();
  }

  private detectDevice(): void {
    if (typeof window === 'undefined') return;

    const userAgent = navigator.userAgent;
    if (/Mobi|Android/i.test(userAgent)) {
      this.metrics.deviceType = 'mobile';
      this.optimizationLevel = 2;
    } else if (/iPad|Tablet/i.test(userAgent)) {
      this.metrics.deviceType = 'tablet';
      this.optimizationLevel = 1;
    } else {
      this.metrics.deviceType = 'desktop';
      this.optimizationLevel = 0;
    }

    // Battery API for mobile optimization
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        this.metrics.batteryLevel = battery.level;
        this.metrics.isLowPowerMode = battery.level < 0.2;

        if (this.metrics.isLowPowerMode) {
          this.optimizationLevel = Math.max(this.optimizationLevel, 3);
        }
      });
    }

    // Network speed detection
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const speed = connection.effectiveType;

      if (speed === 'slow-2g' || speed === '2g') {
        this.metrics.networkSpeed = 'slow';
        this.optimizationLevel = Math.max(this.optimizationLevel, 2);
      } else if (speed === '3g') {
        this.metrics.networkSpeed = 'medium';
        this.optimizationLevel = Math.max(this.optimizationLevel, 1);
      } else {
        this.metrics.networkSpeed = 'fast';
      }
    }
  }

  private startMonitoring(): void {
    if (typeof window === 'undefined') return;

    // FPS monitoring
    const measureFPS = (timestamp: number) => {
      if (this.lastTime === 0) this.lastTime = timestamp;

      const delta = timestamp - this.lastTime;
      if (delta >= 1000) {
        this.metrics.fps = Math.round((this.frameCount * 1000) / delta);
        this.frameCount = 0;
        this.lastTime = timestamp;

        // Adjust optimization based on FPS
        if (this.metrics.fps < 30) {
          this.optimizationLevel = Math.min(4, this.optimizationLevel + 1);
        } else if (this.metrics.fps > 55 && this.optimizationLevel > 0) {
          this.optimizationLevel = Math.max(0, this.optimizationLevel - 1);
        }

        this.notifyObservers();
      }

      this.frameCount++;
      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);

    // Memory monitoring
    setInterval(() => {
      if ('memory' in performance) {
        this.metrics.memory = (performance as any).memory.usedJSHeapSize;

        // Adjust for high memory usage
        if (this.metrics.memory > 100 * 1024 * 1024) {
          // 100MB
          this.optimizationLevel = Math.min(4, this.optimizationLevel + 1);
        }
      }
    }, 5000);
  }

  private setupIntersectionOptimization(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    // Optimize animations based on visibility
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            element.style.willChange = 'transform, opacity';
          } else {
            element.style.willChange = 'auto';
          }
        });
      },
      { threshold: 0.1 }
    );

    // Auto-observe elements with data-optimize attribute
    setTimeout(() => {
      document.querySelectorAll('[data-optimize]').forEach(el => {
        observer.observe(el);
      });
    }, 1000);
  }

  // Queue animations for optimal performance
  queueAnimation(callback: () => void): void {
    this.animationQueue.push(callback);
    this.processQueue();
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessingQueue || this.animationQueue.length === 0) return;

    this.isProcessingQueue = true;

    while (this.animationQueue.length > 0) {
      const callback = this.animationQueue.shift();
      if (callback) {
        callback();

        // Yield control based on optimization level
        if (this.optimizationLevel > 2) {
          await new Promise(resolve => setTimeout(resolve, 16)); // 1 frame
        } else if (this.optimizationLevel > 0) {
          await new Promise(resolve => requestAnimationFrame(() => resolve(undefined)));
        }
      }
    }

    this.isProcessingQueue = false;
  }

  subscribe(callback: (level: number) => void): () => void {
    this.observers.push(callback);
    return () => {
      this.observers = this.observers.filter(obs => obs !== callback);
    };
  }

  private notifyObservers(): void {
    this.observers.forEach(callback => callback(this.optimizationLevel));
  }

  getOptimizationLevel(): number {
    return this.optimizationLevel;
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Get optimized animation config based on current performance
  getOptimizedConfig(baseConfig: any): any {
    const level = this.optimizationLevel;

    switch (level) {
      case 4: // Maximum performance mode
        return {
          ...baseConfig,
          transition: { duration: 0 },
          animate: baseConfig.animate || {},
        };
      case 3: // High performance mode
        return {
          ...baseConfig,
          transition: {
            ...baseConfig.transition,
            duration: Math.min(0.2, (baseConfig.transition?.duration || 0.5) * 0.4),
          },
        };
      case 2: // Medium performance mode
        return {
          ...baseConfig,
          transition: {
            ...baseConfig.transition,
            duration: Math.min(0.3, (baseConfig.transition?.duration || 0.5) * 0.6),
          },
        };
      case 1: // Slight optimization
        return {
          ...baseConfig,
          transition: {
            ...baseConfig.transition,
            duration: (baseConfig.transition?.duration || 0.5) * 0.8,
          },
        };
      default: // Full quality
        return baseConfig;
    }
  }
}

// Global performance manager instance
export const ultimatePerformanceManager = new UltimatePerformanceManager();

// Advanced gesture debouncing system
class GestureDebouncer {
  private timeouts = new Map<string, NodeJS.Timeout>();
  private lastEvents = new Map<string, any>();

  debounce<T extends (...args: any[]) => void>(
    key: string,
    fn: T,
    delay: number = 16,
    immediate: boolean = false
  ): T {
    return ((...args: any[]) => {
      const existing = this.timeouts.get(key);

      if (existing) {
        clearTimeout(existing);
      }

      if (immediate && !existing) {
        fn(...args);
      }

      const timeout = setTimeout(() => {
        if (!immediate) fn(...args);
        this.timeouts.delete(key);
      }, delay);

      this.timeouts.set(key, timeout);
    }) as T;
  }

  throttle<T extends (...args: any[]) => void>(key: string, fn: T, delay: number = 16): T {
    return ((...args: any[]) => {
      const lastCall = this.lastEvents.get(key);
      const now = Date.now();

      if (!lastCall || now - lastCall >= delay) {
        fn(...args);
        this.lastEvents.set(key, now);
      }
    }) as T;
  }

  cleanup(): void {
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts.clear();
    this.lastEvents.clear();
  }
}

export const gestureDebouncer = new GestureDebouncer();

// Memory-optimized motion value pool
class AdvancedMotionValuePool {
  private pools = new Map<string, any[]>();
  private maxPoolSize = 50;
  private activeValues = new Set<any>();

  get<T>(type: string, initialValue: T): any {
    const pool = this.pools.get(type) || [];
    let value = pool.pop();

    if (!value) {
      value = useMotionValue(initialValue);
    } else {
      value.set(initialValue);
    }

    this.activeValues.add(value);
    return value;
  }

  return(type: string, value: any): void {
    if (!this.activeValues.has(value)) return;

    this.activeValues.delete(value);
    const pool = this.pools.get(type) || [];

    if (pool.length < this.maxPoolSize) {
      pool.push(value);
      this.pools.set(type, pool);
    }
  }

  cleanup(): void {
    this.pools.clear();
    this.activeValues.clear();
  }
}

export const motionValuePool = new AdvancedMotionValuePool();

// Layout optimization utilities
export const layoutOptimizations = {
  // Prevent layout thrashing
  containLayout: {
    contain: 'layout style paint',
    contentVisibility: 'auto',
  } as React.CSSProperties,

  // GPU acceleration for transforms
  gpuLayer: {
    transform: 'translateZ(0)',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
  } as React.CSSProperties,

  // Optimize for animations
  animationLayer: {
    transform: 'translateZ(0)',
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    perspective: 1000,
  } as React.CSSProperties,

  // Text rendering optimization
  textOptimized: {
    textRendering: 'optimizeSpeed',
    fontDisplay: 'swap',
  } as React.CSSProperties,

  // Critical path optimization
  criticalPath: {
    contain: 'strict',
    contentVisibility: 'auto',
    containIntrinsicSize: '0 500px',
  } as React.CSSProperties,
};

// Ultimate optimized motion component
interface UltimateMotionProps extends ComponentProps<typeof motion.div> {
  optimizationLevel?: 'auto' | 'performance' | 'quality';
  enableGPU?: boolean;
  enableDebouncing?: boolean;
  layoutOptimize?: boolean;
  children?: ReactNode;
}

export const UltimateMotion = memo(
  forwardRef<HTMLDivElement, UltimateMotionProps>(
    (
      {
        optimizationLevel = 'auto',
        enableGPU = true,
        enableDebouncing = true,
        layoutOptimize = true,
        style,
        onHoverStart,
        onHoverEnd,
        onTap,
        onTapStart,
        onTapCancel,
        children,
        ...props
      },
      ref
    ) => {
      const [currentOptLevel, setCurrentOptLevel] = useState(0);
      const shouldReduceMotion = useReducedMotion();

      useEffect(() => {
        if (optimizationLevel === 'auto') {
          return ultimatePerformanceManager.subscribe(setCurrentOptLevel);
        }
      }, [optimizationLevel]);

      // Debounced gesture handlers
      const debouncedOnHoverStart = useMemo(
        () =>
          onHoverStart && enableDebouncing
            ? gestureDebouncer.debounce('hover-start', onHoverStart, 16, true)
            : onHoverStart,
        [onHoverStart, enableDebouncing]
      );

      const debouncedOnHoverEnd = useMemo(
        () =>
          onHoverEnd && enableDebouncing
            ? gestureDebouncer.debounce('hover-end', onHoverEnd, 16)
            : onHoverEnd,
        [onHoverEnd, enableDebouncing]
      );

      const throttledOnTap = useMemo(
        () => (onTap && enableDebouncing ? gestureDebouncer.throttle('tap', onTap, 100) : onTap),
        [onTap, enableDebouncing]
      );

      // Optimized styles
      const optimizedStyle = useMemo(() => {
        let computedStyle = { ...style };

        if (enableGPU) {
          computedStyle = { ...computedStyle, ...layoutOptimizations.animationLayer };
        }

        if (layoutOptimize) {
          computedStyle = { ...computedStyle, ...layoutOptimizations.containLayout };
        }

        return computedStyle;
      }, [style, enableGPU, layoutOptimize]);

      // Get optimized props
      const optimizedProps = useMemo(() => {
        if (shouldReduceMotion) {
          return {
            ...props,
            initial: false,
            animate: props.animate,
            transition: { duration: 0 },
          };
        }

        if (optimizationLevel === 'performance' || currentOptLevel >= 3) {
          return ultimatePerformanceManager.getOptimizedConfig(props);
        }

        return props;
      }, [props, optimizationLevel, currentOptLevel, shouldReduceMotion]);

      return (
        <motion.div
          ref={ref}
          {...optimizedProps}
          style={optimizedStyle}
          onHoverStart={debouncedOnHoverStart}
          onHoverEnd={debouncedOnHoverEnd}
          onTap={throttledOnTap}
          onTapStart={onTapStart}
          onTapCancel={onTapCancel}
          data-optimize="true"
        >
          {children}
        </motion.div>
      );
    }
  )
);

UltimateMotion.displayName = 'UltimateMotion';

// Progressive enhancement wrapper
interface ProgressiveMotionProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
}

export const ProgressiveMotion = memo(
  ({ children, fallback, threshold = 30 }: ProgressiveMotionProps) => {
    const [isHighPerformance, setIsHighPerformance] = useState(true);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
      return ultimatePerformanceManager.subscribe(level => {
        setIsHighPerformance(level < 3);
      });
    }, []);

    if (shouldReduceMotion || !isHighPerformance) {
      return <>{fallback || children}</>;
    }

    return (
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    );
  }
);

ProgressiveMotion.displayName = 'ProgressiveMotion';

// Advanced error boundary for motion components
interface MotionErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class MotionErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  MotionErrorBoundaryState
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): MotionErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Motion component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="motion-error-fallback">Animation temporarily unavailable</div>
        )
      );
    }

    return this.props.children;
  }
}

// Optimized scroll-triggered animations
export const useOptimizedScrollAnimation = (
  options: { threshold?: number; margin?: string } = {}
) => {
  const { threshold = 0.1 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once: true,
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return {
    ref,
    isInView: hasAnimated,
    shouldAnimate: hasAnimated && ultimatePerformanceManager.getOptimizationLevel() < 4,
  };
};

// Gesture optimization hook
export const useOptimizedGestures = () => {
  const currentLevel = ultimatePerformanceManager.getOptimizationLevel();

  return useMemo(
    () => ({
      enableHover: currentLevel < 3,
      enableDrag: currentLevel < 2,
      enableComplexAnimations: currentLevel < 2,
      gestureThreshold: currentLevel > 1 ? 10 : 5,
      debounceDelay: currentLevel > 1 ? 32 : 16,
    }),
    [currentLevel]
  );
};

// Memory management utilities
export const motionMemoryManager = {
  // Cleanup unused motion values
  cleanup: () => {
    motionValuePool.cleanup();
    gestureDebouncer.cleanup();
  },

  // Force garbage collection (for debugging)
  forceGC: () => {
    if ('gc' in window && typeof (window as any).gc === 'function') {
      (window as any).gc();
    }
  },

  // Monitor memory usage
  getMemoryUsage: () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        usage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
      };
    }
    return null;
  },
};

// Production deployment optimizations
export const productionOptimizations = {
  // Initialize all optimizations
  initialize: () => {
    // Set up performance monitoring
    ultimatePerformanceManager.getMetrics();

    // Register cleanup on page unload
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        motionMemoryManager.cleanup();
      });

      // Cleanup on visibility change
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          motionMemoryManager.cleanup();
        }
      });
    }

    console.log('🚀 Ultimate Motion optimizations initialized');
  },

  // Get current optimization status
  getStatus: () => {
    const level = ultimatePerformanceManager.getOptimizationLevel();
    const metrics = ultimatePerformanceManager.getMetrics();
    const memory = motionMemoryManager.getMemoryUsage();

    return {
      optimizationLevel: level,
      levelName: [
        'Maximum Quality',
        'High Quality',
        'Balanced',
        'Performance',
        'Maximum Performance',
      ][level],
      metrics,
      memory,
      recommendations:
        level > 2
          ? [
              'Consider reducing animation complexity',
              'Enable gesture debouncing',
              'Use progressive enhancement',
            ]
          : ['Performance is optimal'],
    };
  },
};

// Export optimized motion variants
export const ultimateVariants = {
  // Ultra-fast entrance animations
  quickFade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.15 },
  },

  // GPU-optimized slide animations
  slideUp: {
    initial: { opacity: 0, y: 20, ...layoutOptimizations.gpuLayer },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },

  // Performance-conscious hover effects
  hoverLift: {
    rest: { y: 0, scale: 1 },
    hover: {
      y: -4,
      scale: 1.02,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
  },

  // Memory-efficient stagger configurations
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  },
};

// Initialize optimizations on module load
if (typeof window !== 'undefined') {
  productionOptimizations.initialize();
}

// Ultimate Performance Provider Component
export function UltimatePerformanceProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className="ultimate-performance-optimized">
      {children}
    </div>
  );
}
