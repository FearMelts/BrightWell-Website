// Core types for the BrightWell website

export interface Feature {
  title: string;
  description: string;
  image: string;
  icon?: React.ReactNode;
}

export interface Testimonial {
  name: string;
  quote: string;
  image: string;
  position?: string;
  company?: string;
}

export interface AnimationConfig {
  duration: number;
  ease: number[];
  delay?: number;
}

export interface MotionComponentProps {
  delay?: number;
  className?: string;
  children?: React.ReactNode;
}

// Framer Motion compatible animation presets
export const animationPresets = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
} as const;
