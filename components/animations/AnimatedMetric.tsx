'use client';
import { fadeInVariants } from '@/lib/motionConfig';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedMetricProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  onComplete?: () => void;
  enableCountUp?: boolean;
}

export default function AnimatedMetric({
  from,
  to,
  duration = 2,
  className = '',
  suffix = '',
  prefix = '',
  decimals = 0,
  onComplete,
  enableCountUp = true,
}: AnimatedMetricProps) {
  const motionValue = useMotionValue(from);
  const [displayValue, setDisplayValue] = useState(from);

  // Transform the motion value to a rounded number for display
  const rounded = useTransform(motionValue, latest => {
    return Math.round(latest * Math.pow(10, decimals)) / Math.pow(10, decimals);
  });

  useEffect(() => {
    if (!enableCountUp) {
      setDisplayValue(to);
      return;
    }

    const unsubscribe = rounded.on('change', latest => {
      setDisplayValue(latest);
    });

    const controls = animate(motionValue, to, {
      duration,

      onComplete,
    });

    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [to, duration, onComplete, motionValue, rounded, enableCountUp]);

  useEffect(() => {
    motionValue.set(from);
    setDisplayValue(from);
  }, [from, motionValue]);

  return (
    <motion.span
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`inline-block font-bold tabular-nums ${className}`}
      aria-live="polite"
      role="status"
    >
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </motion.span>
  );
}
