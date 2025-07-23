'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, LazyMotion, domAnimation, motion } from 'framer-motion';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen flex flex-col">
        {children}
      </div>
    </LazyMotion>
  );
}
