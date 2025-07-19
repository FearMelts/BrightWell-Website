'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="min-h-screen flex flex-col"
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
