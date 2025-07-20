import { MotionValue, useMotionValue } from 'framer-motion';
import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';

// --- Dynamic Import Helper for Code Splitting & Lazy Loading ---
export function lazyMotion(
  importFunc: () => Promise<{ default: React.ComponentType<any> }>,
  fallback: React.ReactNode = null
) {
  const LazyComponent = React.lazy(importFunc);
  return (props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

// --- Motion Value Recycling Pool ---
const motionValuePool: Record<string, MotionValue<any>> = {};
export function getPooledMotionValue<T>(key: string, initial: T): MotionValue<T> {
  if (!motionValuePool[key]) {
    motionValuePool[key] = useMotionValue(initial);
  }
  return motionValuePool[key] as MotionValue<T>;
}

// --- GPU Acceleration Helper ---
export function enableGPUAcceleration(styles: React.CSSProperties = {}): React.CSSProperties {
  return {
    willChange: 'transform, opacity',
    transform: 'translateZ(0)',
    ...styles,
  };
}

// --- Animation Queue Manager ---
type AnimationTask = () => Promise<void>;
class AnimationQueue {
  private queue: AnimationTask[] = [];
  private running = false;

  enqueue(task: AnimationTask) {
    this.queue.push(task);
    this.run();
  }

  private async run() {
    if (this.running) return;
    this.running = true;
    while (this.queue.length) {
      const task = this.queue.shift();
      if (task) await task();
    }
    this.running = false;
  }
}
export const animationQueue = new AnimationQueue();

// --- Gesture Debouncing Utility ---
export function useDebouncedGesture<T extends (...args: any[]) => void>(handler: T, delay = 50): T {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  return useCallback(
    ((...args: any[]) => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => handler(...args), delay);
    }) as T,
    [handler, delay]
  );
}

// --- Asset Preloader ---
export function preloadAssets(urls: string[]) {
  urls.forEach(url => {
    const img = new window.Image();
    img.src = url;
  });
}

// --- Error Boundary for Motion Components ---
export class MotionErrorBoundary extends React.Component<
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
    if (process.env.NODE_ENV === 'production') {
      // send error to monitoring service
      // e.g., window.gtag('event', 'motion_error', { error, info });
    }
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

// --- Monitoring Hook ---
export function useMotionPerformanceMonitor(label: string) {
  useEffect(() => {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      if (process.env.NODE_ENV === 'production') {
        // send duration to monitoring service
        // e.g., window.gtag('event', 'motion_perf', { label, duration });
      }
    };
  }, [label]);
}

// --- Progressive Enhancement Detection ---
export function useProgressiveEnhancement() {
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => {
    setEnhanced(true);
  }, []);
  return enhanced;
}

// --- Layout Optimization Helper ---
export function useOptimizedLayout(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.contain = 'layout style paint';
    ref.current.style.backfaceVisibility = 'hidden';
  }, [ref]);
}

// --- Example Usage (to be removed in production) ---
// const LazyMotionComponent = lazyMotion(() => import("../components/HeavyMotionComponent"));
// <MotionErrorBoundary>
//   <LazyMotionComponent />
// </MotionErrorBoundary>
