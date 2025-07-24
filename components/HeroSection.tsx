'use client';
import { LazyMotion, domAnimation, motion, type Variants } from 'framer-motion';
import Link from 'next/link';

// Animation variants for the hero section container
const heroVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export default function HeroSection() {
  const stats = [
    { label: 'Claims Processed', value: '25M+' },
    { label: 'Healthcare Providers', value: '5000+' },
    { label: 'Average Revenue Increase', value: '45%' },
    { label: 'Claim Success Rate', value: '98.5%' },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 pb-16 bg-gradient-to-br from-cyan-600 via-blue-700 to-purple-700 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500">
        <motion.div
          className="relative z-10 flex flex-col items-center max-w-6xl mx-auto"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 dark:from-cyan-100 dark:via-blue-200 dark:to-purple-200 mb-6"
            // variants={textContainerVariants}
          >
            <motion.span /* variants={textRevealVariants} */ className="inline-block">
              Illuminate
            </motion.span>{' '}
            <motion.span /* variants={textRevealVariants} */ className="inline-block">
              Your
            </motion.span>
            <br />
            <motion.span /* variants={textRevealVariants} */ className="inline-block">
              Medical
            </motion.span>{' '}
            <motion.span /* variants={textRevealVariants} */ className="inline-block">
              Revenue
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-slate-200 dark:text-slate-300 mb-10 max-w-3xl leading-relaxed"
            // variants={textRevealVariants}
          >
            Transform your healthcare practice with comprehensive medical billing solutions.
            Maximize revenue, ensure compliance, and focus on what matters most – patient care.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 mb-12" /* variants={statsVariants} */
          >
            <motion.div /* variants={advancedButtonVariants} whileHover="hover" whileTap="tap" */>
              <Link
                href="#contact"
                className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-cyan-500/40 transition-all"
              >
                Get Started Today
              </Link>
            </motion.div>
            <motion.div /* variants={advancedButtonVariants} whileHover="hover" whileTap="tap" */>
              <Link
                href="#contact"
                className="inline-block bg-transparent border-2 border-cyan-300 text-cyan-100 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-cyan-100 hover:text-blue-800 transition-all"
              >
                Schedule Demo
              </Link>
            </motion.div>
          </motion.div>
          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl"
            // variants={statsVariants}
          >
            {stats.map(stat => (
              <motion.div
                key={stat.label}
                className="bg-white/10 dark:bg-black/20 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/20 dark:border-black/40"
                // variants={statItemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <p className="text-sm text-blue-200 dark:text-blue-100 font-medium uppercase tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </LazyMotion>
  );
}
