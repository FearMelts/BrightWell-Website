'use client';
import { bouncySpring, fadeVariants, fastTransition, staggerContainer } from '@/lib/motionConfig';
import { motion, useInView } from 'framer-motion';
import React from 'react';

interface ModernAnimationsProps {
  className?: string;
}

export default function ModernAnimations({ className = '' }: ModernAnimationsProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className={`space-y-8 ${className}`}>
      {/* Staggered Animation Container */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[1, 2, 3].map(item => (
          <motion.div
            key={item}
            variants={fadeVariants}
            className="bg-white rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Card {item}</h3>
            <p className="text-gray-600">
              This card animates in with a staggered effect using modern Framer Motion patterns.
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Interactive Hover Effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={fastTransition}
        className="flex gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium"
        >
          Hover Me
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }}
          transition={bouncySpring}
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium"
        >
          Bouncy Effect
        </motion.button>
      </motion.div>

      {/* Layout Animations */}
      <motion.div layout className="bg-gray-100 p-4 rounded-lg">
        <motion.h4 layout className="text-lg font-semibold mb-2">
          Layout Animation Demo
        </motion.h4>
        <motion.p layout className="text-gray-600">
          This content automatically animates when the layout changes using Framer Motion&apos;s
          layout prop.
        </motion.p>
      </motion.div>

      {/* Gesture-based Animations */}
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 200, top: 0, bottom: 0 }}
        whileDrag={{ scale: 1.1, rotate: 5 }}
        className="w-20 h-20 bg-purple-500 rounded-lg cursor-grab active:cursor-grabbing flex items-center justify-center text-white font-bold"
      >
        Drag
      </motion.div>

      {/* Path Drawing Animation */}
      <motion.svg
        width="200"
        height="100"
        viewBox="0 0 200 100"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.path
          d="M10,50 Q50,10 100,50 T190,50"
          stroke="#3B82F6"
          strokeWidth="3"
          fill="none"
          variants={{
            hidden: { pathLength: 0 },
            visible: {
              pathLength: 1,
              transition: { duration: 2, ease: 'easeInOut' },
            },
          }}
        />
      </motion.svg>
    </div>
  );
}
