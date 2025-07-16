'use client';
import { useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

/**
 * Advanced hook for scroll-triggered animations with modern patterns
 */
export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
    margin: '-50px',
  });

  return { ref, isInView };
}

/**
 * Hook for smooth spring-based counter animations
 */
export function useCounter(target: number, options = {}) {
  const count = useMotionValue(0);
  const spring = useSpring(count, {
    stiffness: 300,
    damping: 40,
    ...options,
  });

  useEffect(() => {
    count.set(target);
  }, [count, target]);

  return spring;
}

/**
 * Hook for mouse-tracking parallax effects
 */
export function useMouseParallax(strength = 50) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [strength, -strength]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-strength, strength]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return {
    rotateX,
    rotateY,
    handleMouseMove,
    handleMouseLeave,
  };
}

/**
 * Hook for advanced scroll-based transformations
 */
export function useScrollTransform() {
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const updateScrollY = () => scrollY.set(window.scrollY);
    window.addEventListener('scroll', updateScrollY);
    return () => window.removeEventListener('scroll', updateScrollY);
  }, [scrollY]);

  // Various transform options
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 200, 400], [1, 0.8, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);

  return { scrollY, parallaxY, opacity, scale };
}

/**
 * Hook for complex reveal animations
 */
export function useRevealAnimation(delay = 0) {
  const { ref, isInView } = useScrollAnimation();

  const variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return { ref, isInView, variants };
}
