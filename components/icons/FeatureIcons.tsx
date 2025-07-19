// Animated SVG Icon Set for Features (Purple Gradient Vision)
import { motion } from 'framer-motion';

export const LightningIcon = () => (
  <motion.svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
  >
    <defs>
      <linearGradient
        id="lightning-gradient"
        x1="0"
        y1="0"
        x2="40"
        y2="40"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#a21caf" />
        <stop offset="0.5" stopColor="#8b5cf6" />
        <stop offset="1" stopColor="#06b6d4" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <motion.path
      d="M22 2L10 22H20L18 38L32 16H22L22 2Z"
      fill="url(#lightning-gradient)"
      filter="url(#glow)"
      initial={{ rotate: -10 }}
      animate={{ rotate: 10 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    />
  </motion.svg>
);

export const ShieldIcon = () => (
  <motion.svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
  >
    <defs>
      <linearGradient
        id="shield-gradient"
        x1="0"
        y1="0"
        x2="40"
        y2="40"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#8b5cf6" />
        <stop offset="1" stopColor="#06b6d4" />
      </linearGradient>
      <filter id="shield-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <motion.path
      d="M20 4C20 4 8 8 8 16C8 28 20 36 20 36C20 36 32 28 32 16C32 8 20 4 20 4Z"
      fill="url(#shield-gradient)"
      filter="url(#shield-glow)"
      initial={{ scale: 1 }}
      animate={{ scale: 1.08 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    />
  </motion.svg>
);

export const TargetIcon = () => (
  <motion.svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
  >
    <defs>
      <radialGradient id="target-gradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="60%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#a21caf" />
      </radialGradient>
      <filter id="target-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <motion.circle
      cx="20"
      cy="20"
      r="16"
      fill="url(#target-gradient)"
      filter="url(#target-glow)"
      initial={{ scale: 1 }}
      animate={{ scale: 1.1 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    />
    <circle cx="20" cy="20" r="8" fill="#fff" fillOpacity="0.15" />
    <circle cx="20" cy="20" r="4" fill="#fff" fillOpacity="0.3" />
  </motion.svg>
);
