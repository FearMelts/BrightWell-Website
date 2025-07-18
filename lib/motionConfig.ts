import { Transition, Variants } from 'framer-motion';

// Enhanced interfaces for motion configs
export interface MotionConfig {
  initial: Record<string, number | string>;
  animate: Record<string, number | string>;
  exit: Record<string, number | string>;
  transition: Transition;
}

export interface StaggerConfig {
  staggerChildren: number;
  delayChildren: number;
}

// Modern easing curves
export const baseTransition: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1], // Modern easeOutExpo
};

export const fastTransition: Transition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1], // Material Design standard
};

export const slowTransition: Transition = {
  duration: 1.2,
  ease: [0.25, 0.1, 0.25, 1], // Elegant ease-in-out
};

export const staggerConfig: StaggerConfig = {
  staggerChildren: 0.1,
  delayChildren: 0.05,
};

// Enhanced spring presets (Framer Motion compatible)
export const springTransition: Transition = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30,
  mass: 0.8,
};

export const bouncySpring: Transition = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 25,
  mass: 0.6,
};

export const smoothSpring: Transition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 35,
  mass: 1,
};

export const gentleSpring: Transition = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 35,
  mass: 1,
};

// Animation variants for consistent usage
export const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: fastTransition,
  },
};

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: fastTransition,
  },
};

export const slideVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothSpring,
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: fastTransition,
  },
};

// Stagger configuration for list animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

// Legacy motion configurations for backward compatibility
export const fadeInUp: MotionConfig = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 40 },
  transition: baseTransition,
};

export const fadeIn: MotionConfig = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: baseTransition,
};

export const fadeInScale: MotionConfig = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: springTransition,
};

// Parallax motion utility
export interface ParallaxMotion {
  y: number;
}

export const parallaxMotion = (scrollY: number): ParallaxMotion => ({
  y: scrollY * 0.2,
});

// Enhanced hover and tap animations
export const buttonHover = {
  scale: 1.05,
  transition: fastTransition,
};

export const buttonTap = {
  scale: 0.98,
  transition: fastTransition,
};

// Page transition variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    x: -200,
  },
  in: {
    opacity: 1,
    x: 0,
    transition: baseTransition,
  },
  out: {
    opacity: 0,
    x: 200,
    transition: baseTransition,
  },
};
