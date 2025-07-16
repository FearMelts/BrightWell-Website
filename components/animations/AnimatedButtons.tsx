'use client';
import { buttonHover, buttonTap, fastTransition } from '@/lib/motionConfig';
import { motion } from 'framer-motion';
import React, { ComponentPropsWithoutRef } from 'react';

interface AnimatedButtonProps extends ComponentPropsWithoutRef<typeof motion.button> {
  label: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function AnimatedButton({
  label,
  icon,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: AnimatedButtonProps) {
  // Variant styles
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg shadow-gray-600/25',
    outline:
      'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent',
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
  };

  return (
    <motion.button
      whileHover={buttonHover}
      whileTap={buttonTap}
      whileFocus={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={fastTransition}
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        rounded-full font-semibold focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200
        flex items-center justify-center gap-2 relative overflow-hidden
        ${className}
      `}
      {...props}
    >
      {/* Ripple effect background */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && (
          <motion.span
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 12 }}
            transition={fastTransition}
          >
            {icon}
          </motion.span>
        )}
        {label}
      </span>
    </motion.button>
  );
}
