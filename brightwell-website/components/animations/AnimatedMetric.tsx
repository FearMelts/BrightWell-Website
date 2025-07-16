import { animate, motion, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedMetricProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  onComplete?: () => void;
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
}: AnimatedMetricProps) {
  const value = useMotionValue(from);

  useEffect(() => {
    const controls = animate(value, to, {
      duration,
      onComplete,
    });
    return controls.stop;
  }, [to, duration, onComplete, value]);

  useEffect(() => {
    value.set(from);
  }, [from, value]);

  return (
    <motion.span aria-live="polite" className={`inline-block ${className}`}>
      {prefix}
      {value.get().toFixed(decimals)}
      {suffix}
    </motion.span>
  );
}
