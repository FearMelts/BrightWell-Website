'use client';
import { useMouseParallax } from '@/lib/animationHooks';
import { fastTransition } from '@/lib/motionConfig';
import { motion, Variants } from 'framer-motion';
import React from 'react';

interface AdvancedCardProps {
  title: string;
  description: string;
  image?: string;
  className?: string;
  delay?: number;
}

export default function AdvancedCard({
  title,
  description,
  image,
  className = '',
  delay = 0,
}: AdvancedCardProps) {
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useMouseParallax(8);
  const ref = React.useRef(null);

  const cardVariants: Variants = {
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
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove as any}
      onMouseLeave={handleMouseLeave}
      className={`
        relative bg-white rounded-2xl overflow-hidden shadow-lg 
        cursor-pointer group border border-gray-100
        ${className}
      `}
    >
      {/* Image */}
      {image && (
        <motion.div
          className="relative h-48 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={fastTransition}
        >
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={fastTransition}
          />
        </motion.div>
      )}

      {/* Content */}
      <motion.div className="p-6" style={{ transform: 'translateZ(50px)' }}>
        <motion.h3
          className="text-xl font-semibold text-gray-900 mb-3"
          whileHover={{ x: 5 }}
          transition={fastTransition}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-gray-600 leading-relaxed"
          whileHover={{ x: 5 }}
          transition={{ ...fastTransition, delay: 0.05 }}
        >
          {description}
        </motion.p>

        {/* Animated underline */}
        <motion.div
          className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={fastTransition}
          style={{ transformOrigin: 'left' }}
        />
      </motion.div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={fastTransition}
      />

      {/* 3D highlight effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"
        style={{ transform: 'translateZ(60px)' }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={fastTransition}
      />
    </motion.div>
  );
}
