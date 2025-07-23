'use client';
import { fadeInVariants, slowTransition } from '@/lib/motionConfig';
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

interface ParallaxHeroProps {
  children: React.ReactNode;
  backgroundImage?: string;
  overlay?: boolean;
  parallaxOffset?: number;
  className?: string;
}

export default function ParallaxHero({
  children,
  backgroundImage,
  overlay = false,
  parallaxOffset = 0.5,
  className = '',
}: ParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Enhanced parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * parallaxOffset]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0.8, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Dynamic background styling
  const backgroundStyle = useMotionTemplate`url(${backgroundImage || ''})`;

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
      className={`relative w-full h-screen overflow-hidden ${className}`}
    >
      {/* Parallax Background */}
      <motion.div
        style={{
          y,
          scale,
          opacity,
          backgroundImage: backgroundImage ? backgroundStyle : undefined,
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
      >
        {/* Gradient overlay for better text readability */}
        {overlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={slowTransition}
            className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"
          />
        )}
      </motion.div>

      {/* Content Container */}
      <motion.div
        variants={fadeInVariants}
        className="relative z-10 h-full flex items-center justify-center"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...slowTransition, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto px-4"
        >
          {children}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-3 bg-white/70 rounded-full mx-auto"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
