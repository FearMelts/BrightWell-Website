/**
 * Motion configuration file containing all animation variants
 * Centralized animations for consistent motion design across the application
 */

/**
 * Hero section animation variants
 */
export const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

/**
 * Hero title animation variants with stagger effect
 */
export const heroTitleVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.1,
    },
  },
};

/**
 * Hero text animation variants
 */
export const heroTextVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.3,
    },
  },
};

/**
 * Text container variants for staggered text animations
 */
export const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

/**
 * Individual text reveal animation
 */
export const textRevealVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

/**
 * Feature grid container variants
 */
export const featureGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

/**
 * Individual feature item animation variants
 */
export const featureItemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    rotateY: 5,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

/**
 * Call-to-action button variants
 */
export const ctaVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.4,
    },
  },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

/**
 * Advanced button animation variants with gradient effects
 */
export const advancedButtonVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.5,
    },
  },
  hover: {
    scale: 1.1,
    y: -5,
    rotateX: 15,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

/**
 * Testimonial card animation variants
 */
export const testimonialVariants = {
  hidden: { opacity: 0, x: 100, rotateY: 45 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  hover: {
    scale: 1.02,
    y: -5,
    rotateX: 5,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

/**
 * Statistics section animation variants
 */
export const statsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

/**
 * Individual stat item animation
 */
export const statItemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

/**
 * Floating background elements animation
 */
export const floatingVariants = {
  animate: {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Pulse animation for accent elements
 */
export const pulseVariants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};