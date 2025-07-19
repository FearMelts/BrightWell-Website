'use client';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollRevealText({
  children,
  className = '',
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.25'],
  });

  const words = children.split(' ');

  return (
    <div ref={ref} className={`${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
}

const Word = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: any;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [20, 0]);
  const scale = useTransform(progress, range, [0.8, 1]);

  const springOpacity = useSpring(opacity, { stiffness: 400, damping: 30 });
  const springY = useSpring(y, { stiffness: 400, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 400, damping: 30 });

  return (
    <motion.span
      style={{
        opacity: springOpacity,
        y: springY,
        scale: springScale,
        display: 'inline-block',
        marginRight: '0.25em',
      }}
      className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
    >
      {children}
    </motion.span>
  );
};
