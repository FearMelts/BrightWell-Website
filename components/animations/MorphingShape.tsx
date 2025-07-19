'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const shapes = [
  'M12,2 C17.5,2 22,6.5 22,12 C22,17.5 17.5,22 12,22 C6.5,22 2,17.5 2,12 C2,6.5 6.5,2 12,2 Z', // Circle
  'M12,2 L22,7 L22,17 L12,22 L2,17 L2,7 Z', // Hexagon
  'M12,2 L22,12 L12,22 L2,12 Z', // Diamond
  'M2,2 L22,2 L22,22 L2,22 Z', // Square
  'M12,2 L20,8 L16,22 L8,22 L4,8 Z', // Pentagon
];

export default function MorphingShape({
  size = 100,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  const [currentShape, setCurrentShape] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape(prev => (prev + 1) % shapes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`${className}`}
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.2, rotate: 360 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={shapes[currentShape]}
          fill="url(#gradient)"
          initial={false}
          animate={{ d: shapes[currentShape] }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
            type: 'spring',
            stiffness: 100,
            damping: 20,
          }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
