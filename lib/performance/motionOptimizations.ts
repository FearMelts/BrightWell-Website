/**
 * Production-grade Framer Motion optimizations
 * Advanced performance enhancements for maximum efficiency
 */
import { MotionValue, useMotionValue } from 'framer-motion';
import { useCallback, useMemo, useRef } from 'react';

// GPU-accelerated animation configurations
export const gpuAccelerated = {
  transform: 'translateZ(0)',
  willChange: 'transform',
  backfaceVisibility: 'hidden' as const,
  perspective: 1000,
};

// High-performance transition presets
export const performanceTransitions = {
  instant: { duration: 0 },
  ultraFast: { duration: 0.15, ease: 'easeOut' },
  fast: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  smooth: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  elastic: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
    mass: 0.8,
  },
  bouncy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
    mass: 1.2,
  },
};

// Memory-efficient animation variants with recycling
export const optimizedVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  rotate: {
    initial: { opacity: 0, rotate: -5 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 5 },
  },
};

// Staggered animation configurations for lists
export const staggerConfigs = {
  ultraFast: { delayChildren: 0.05, staggerChildren: 0.05 },
  fast: { delayChildren: 0.1, staggerChildren: 0.1 },
  smooth: { delayChildren: 0.2, staggerChildren: 0.15 },
  dramatic: { delayChildren: 0.3, staggerChildren: 0.2 },
};

// Performance-optimized motion value recycling
export class MotionValuePool {
  private pool: Map<string, MotionValue[]> = new Map();

  get(type: string, initialValue: number = 0): MotionValue {
    const typePool = this.pool.get(type) || [];
    const motionValue = typePool.pop() || useMotionValue(initialValue);

    if (typePool.length === 0) {
      this.pool.delete(type);
    } else {
      this.pool.set(type, typePool);
    }

    return motionValue;
  }

  return(type: string, motionValue: MotionValue): void {
    const typePool = this.pool.get(type) || [];
    typePool.push(motionValue);
    this.pool.set(type, typePool);
  }

  clear(): void {
    this.pool.clear();
  }
}

// Global motion value pool instance
export const globalMotionPool = new MotionValuePool();

// High-performance scroll-triggered animations
export const useOptimizedScrollAnimation = () => {
  const scrollY = useMotionValue(0);

  const optimizedScrollHandler = useCallback(
    (latest: number) => {
      // Throttle scroll updates for performance
      requestAnimationFrame(() => {
        scrollY.set(latest);
      });
    },
    [scrollY]
  );

  return { scrollY, optimizedScrollHandler };
};

// Gesture debouncing for touch devices
export const useDebouncedGestures = (delay: number = 16) => {
  const lastGestureTime = useRef(0);

  const debouncedGesture = useCallback(
    (handler: () => void) => {
      const now = Date.now();
      if (now - lastGestureTime.current >= delay) {
        lastGestureTime.current = now;
        handler();
      }
    },
    [delay]
  );

  return debouncedGesture;
};

// Advanced spring configurations for different use cases
export const springConfigs = {
  // Ultra-responsive for UI elements
  snappy: { stiffness: 500, damping: 30, mass: 0.5 },
  // Smooth for content animations
  gentle: { stiffness: 200, damping: 25, mass: 1 },
  // Bouncy for interactive elements
  playful: { stiffness: 300, damping: 15, mass: 0.8 },
  // Precise for data visualizations
  precise: { stiffness: 400, damping: 40, mass: 0.6 },
  // Heavy for large elements
  heavy: { stiffness: 150, damping: 20, mass: 2 },
};

// Layout optimization utilities
export const layoutOptimized = {
  // Prevent layout thrashing
  transform: true,
  // Enable hardware acceleration
  style: gpuAccelerated,
  // Optimize for mobile performance
  dragConstraints: { top: 0, left: 0, right: 0, bottom: 0 },
};

// Animation queue management for complex sequences
export class AnimationQueue {
  private queue: Array<() => Promise<void>> = [];
  private isRunning = false;

  add(animation: () => Promise<void>): void {
    this.queue.push(animation);
    this.process();
  }

  private async process(): Promise<void> {
    if (this.isRunning || this.queue.length === 0) return;

    this.isRunning = true;

    while (this.queue.length > 0) {
      const animation = this.queue.shift();
      if (animation) {
        try {
          await animation();
        } catch (error) {
          console.warn('Animation queue error:', error);
        }
      }
    }

    this.isRunning = false;
  }

  clear(): void {
    this.queue = [];
    this.isRunning = false;
  }
}

// Global animation queue
export const globalAnimationQueue = new AnimationQueue();

// Intersection Observer optimizations
export const useOptimizedInView = (threshold: number = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useRef(false);

  const observer = useMemo(() => {
    if (typeof window === 'undefined') return null;

    return new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      {
        threshold,
        rootMargin: '50px 0px',
      }
    );
  }, [threshold]);

  return { ref, inView: inView.current, observer };
};

// Resource-aware animation reduction
export const getReducedMotionPreference = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Performance monitoring utilities
export const performanceMonitor = {
  startTiming: (label: string) => {
    if (typeof performance !== 'undefined') {
      performance.mark(`${label}-start`);
    }
  },

  endTiming: (label: string) => {
    if (typeof performance !== 'undefined') {
      performance.mark(`${label}-end`);
      performance.measure(label, `${label}-start`, `${label}-end`);
    }
  },

  getMetrics: () => {
    if (typeof performance !== 'undefined') {
      return performance.getEntriesByType('measure');
    }
    return [];
  },
};
