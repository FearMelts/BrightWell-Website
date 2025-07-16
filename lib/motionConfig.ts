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

// Enhanced spring presets
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

export const bouncySpring: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
  mass: 0.6,
};

export const gentleSpring: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 35,
  mass: 1,
};

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

export interface ParallaxMotion {
  y: number;
}

export const parallaxMotion = (scrollY: number): ParallaxMotion => ({
  y: scrollY * 0.2,
});

// Modern animation variants using the Variants type
export const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: fastTransition,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: fastTransition,
  },
};

export const slideVariants: Variants = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: springTransition,
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: fastTransition,
  },
};

export const scaleVariants: Variants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: bouncySpring,
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    transition: fastTransition,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerConfig.staggerChildren,
      delayChildren: staggerConfig.delayChildren,
    },
  },
};

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
