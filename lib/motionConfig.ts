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

// 🚀 MAXED OUT ANIMATION VARIANTS 🚀

// Hero section animations
export const heroVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

export const heroTitleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const heroTextVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Statistics counter animations
export const statsVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    rotateY: -180,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.2,
    },
  },
};

export const statItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
  hover: {
    scale: 1.1,
    y: -10,
    transition: {
      type: 'spring',
      stiffness: 600,
      damping: 20,
    },
  },
};

// Card animations with 3D effects
export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    rotateX: -45,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  hover: {
    y: -15,
    scale: 1.05,
    rotateX: 5,
    rotateY: 5,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

// Testimonial scroll animations
export const testimonialVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 100,
    rotateY: 90,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    transition: {
      duration: 0.3,
    },
  },
};

// Feature grid animations
export const featureGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const featureItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.8,
    rotateZ: -5,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateZ: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  hover: {
    y: -8,
    scale: 1.03,
    rotateZ: 1,
    transition: {
      type: 'spring',
      stiffness: 600,
      damping: 20,
    },
  },
};

// CTA section animations
export const ctaVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.2,
    },
  },
};

// Advanced button animations
export const advancedButtonVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
  hover: {
    scale: 1.05,
    y: -2,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: {
      type: 'spring',
      stiffness: 600,
      damping: 20,
    },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

// Text reveal animations
export const textRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Container for staggered text
export const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Floating animations for background elements
export const floatingVariants: Variants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Pulse animation for attention-grabbing elements
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
