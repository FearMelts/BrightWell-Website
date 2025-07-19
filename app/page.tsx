'use client';

import { DarkModeToggle } from '@/components/DarkModeToggle';
import { LightningIcon, ShieldIcon, TargetIcon } from '@/components/icons/FeatureIcons';
import {
  advancedButtonVariants,
  ctaVariants,
  featureGridVariants,
  featureItemVariants,
  heroTextVariants,
  heroTitleVariants,
  heroVariants,
  pulseVariants,
  statItemVariants,
  statsVariants,
  testimonialVariants,
  textContainerVariants,
  textRevealVariants,
} from '@/lib/motionConfig';
import {
  LazyMotion,
  domAnimation,
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/*******  678479bc-25b0-4c6e-ab46-b43629113e27  *******/
// --- Data ---
const features = [
  {
    title: 'Streamlined Billing',
    description: 'Lightning-fast, automated, and accurate. No more paperwork headaches.',
    icon: <LightningIcon />,
  },
  {
    title: 'Compliance Assurance',
    description: 'Stay ahead of regulations with real-time updates and bulletproof security.',
    icon: <ShieldIcon />,
  },
  {
    title: 'Dedicated Support',
    description: '24/7 expert help. Real humans, real answers, real fast.',
    icon: <TargetIcon />,
  },
];

const testimonials = [
  {
    name: 'Dr. Sarah Johnson',
    quote: 'BrightWell transformed our billing process completely!',
    position: 'Chief Medical Officer',
  },
  {
    name: 'Mike Chen',
    quote: 'Our claims are processed faster and with greater accuracy.',
    position: 'Practice Manager',
  },
  {
    name: 'Lisa Rodriguez',
    quote: 'The support team is always ready to assist us.',
    position: 'Healthcare Provider',
  },
];

// --- Animated Counter Component ---
function AnimatedCounter({ value, duration = 2 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
      let start = 0;
      const increment = numericValue / (duration * 60);

      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {value.replace(/[0-9]/g, '')}
    </span>
  );
}

// --- FeatureCard ---
function FeatureCard({ feature, delay = 0 }: { feature: (typeof features)[0]; delay?: number }) {
  return (
    <motion.div
      variants={featureItemVariants}
      whileHover="hover"
      whileTap="tap"
      className="flex flex-col items-center text-center bg-card-glass dark:bg-card-glass backdrop-blur-2xl rounded-glass p-10 shadow-neon-purple border-2 border-royal-400 dark:border-royal-500 group relative overflow-hidden transition-all duration-700 hover:scale-105 hover:shadow-neon-cyan animate-float"
    >
      <motion.div className="absolute inset-0 bg-gradient-to-br from-royal-500/10 via-electric-500/10 to-neon-500/10 dark:from-royal-400/10 dark:via-electric-400/10 dark:to-neon-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-x" />

      <motion.div
        className="w-24 h-24 flex items-center justify-center mb-8 relative z-10"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {feature.icon}
      </motion.div>

      <motion.h3
        className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-royal-500 via-electric-500 to-neon-500 dark:from-royal-400 dark:via-electric-400 dark:to-neon-400 group-hover:text-white transition-colors relative z-10 animate-gradient-x drop-shadow-[0_2px_16px_rgba(139,92,246,0.25)]"
        variants={textRevealVariants}
      >
        {feature.title}
      </motion.h3>

      <motion.p
        className="text-white/90 dark:text-white/90 leading-relaxed relative z-10 transition-colors duration-700 font-medium drop-shadow-[0_2px_16px_rgba(139,92,246,0.15)]"
        variants={textRevealVariants}
      >
        {feature.description}
      </motion.p>
    </motion.div>
  );
}

// --- TestimonialCard ---
function TestimonialCard({
  testimonial,
  delay = 0,
}: {
  testimonial: (typeof testimonials)[0];
  delay?: number;
}) {
  return (
    <motion.div
      variants={testimonialVariants}
      whileHover="hover"
      className="min-w-[380px] snap-center flex-shrink-0 bg-card-glass dark:bg-card-glass backdrop-blur-2xl rounded-glass shadow-neon-purple border-2 border-electric-400 dark:border-electric-500 p-10 text-center will-change-transform group relative overflow-hidden transition-all duration-700 hover:scale-105 hover:shadow-neon-cyan animate-float"
    >
      <motion.div className="absolute inset-0 bg-gradient-to-br from-royal-500/10 via-electric-500/10 to-neon-500/10 dark:from-royal-400/10 dark:via-electric-400/10 dark:to-neon-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-x" />

      <motion.div
        className="w-24 h-24 rounded-full mx-auto mb-6 bg-gradient-to-br from-royal-500 via-electric-500 to-neon-500 dark:from-royal-400 dark:via-electric-400 dark:to-neon-400 p-1 relative z-10 shadow-lg animate-gradient-x"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full h-full rounded-full bg-white/80 dark:bg-slate-800/80 flex items-center justify-center text-2xl font-extrabold text-royal-700 dark:text-royal-300 transition-colors duration-700">
          {testimonial.name
            .split(' ')
            .map(n => n[0])
            .join('')}
        </div>
      </motion.div>

      <motion.p
        className="text-white/90 dark:text-white/90 italic mb-6 text-xl leading-relaxed relative z-10 transition-colors duration-700 font-semibold drop-shadow-[0_2px_16px_rgba(139,92,246,0.15)]"
        variants={textRevealVariants}
      >
        “{testimonial.quote}”
      </motion.p>

      <motion.div className="relative z-10">
        <motion.p
          className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-electric-500 to-magenta-500 dark:from-electric-400 dark:to-magenta-400 group-hover:text-white transition-colors duration-700 animate-gradient-x"
          variants={textRevealVariants}
        >
          {testimonial.name}
        </motion.p>
        <motion.p
          className="text-sm text-white/70 dark:text-white/70 transition-colors duration-700 font-medium"
          variants={textRevealVariants}
        >
          {testimonial.position}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// --- Main Page ---
export default function UltraAnimatedPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <LazyMotion features={domAnimation}>
      <DarkModeToggle />
      <main className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/40 dark:from-slate-900 dark:via-gray-900 dark:to-blue-950/40 text-gray-900 dark:text-gray-50 font-sans">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 bg-hero-purple bg-[length:200%_200%] animate-gradient-x overflow-hidden">
          {/* Glassmorphism Overlay */}
          <div className="absolute inset-0 bg-glass dark:bg-glass-dark backdrop-blur-2xl z-0" />
          {/* Animated Geometric Shapes */}
          <motion.div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-royal-500 via-electric-500 to-neon-500 opacity-40 blur-3xl animate-float z-0" />
          <motion.div className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-br from-magenta-500 via-royal-400 to-electric-400 opacity-30 blur-2xl animate-float z-0" />
          <motion.div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-br from-neon-400 via-royal-400 to-magenta-400 opacity-30 blur-2xl animate-float z-0" />

          <motion.div
            className="relative z-10 flex flex-col items-center max-w-6xl mx-auto"
            variants={heroVariants}
          >
            <motion.div variants={heroTitleVariants} className="mb-8" style={{ y: textY }}>
              <motion.h1
                className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-royal-500 via-electric-500 to-neon-500 dark:from-royal-400 dark:via-electric-400 dark:to-neon-400 tracking-tight leading-none mb-6 drop-shadow-[0_4px_32px_rgba(139,92,246,0.45)]"
                variants={textContainerVariants}
              >
                <motion.span variants={textRevealVariants} className="inline-block">
                  Dominate
                </motion.span>{' '}
                <motion.span variants={textRevealVariants} className="inline-block">
                  Your
                </motion.span>
                <br />
                <motion.span variants={textRevealVariants} className="inline-block">
                  Medical
                </motion.span>{' '}
                <motion.span variants={textRevealVariants} className="inline-block">
                  Revenue
                </motion.span>
              </motion.h1>
              <motion.div
                className="h-3 bg-gradient-to-r from-royal-500 via-electric-500 to-neon-500 dark:from-royal-400 dark:via-electric-400 dark:to-neon-400 rounded-full mx-auto shadow-neon-purple animate-gradient-x"
                initial={{ width: 0 }}
                animate={{ width: '340px' }}
                transition={{ delay: 1.5, duration: 1.2 }}
              />
            </motion.div>

            <motion.p
              variants={heroTextVariants}
              className="text-2xl md:text-3xl text-white/90 dark:text-white/90 mb-12 leading-relaxed max-w-4xl transition-colors duration-700 font-semibold drop-shadow-[0_2px_16px_rgba(139,92,246,0.25)]"
            >
              Supercharge your billing with{' '}
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 via-royal-400 to-neon-400 animate-gradient-x">
                AI-driven automation
              </span>
              ,
              <span className="mx-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neon-400 via-electric-400 to-magenta-400 animate-gradient-x">
                real-time compliance
              </span>
              , and
              <span className="mx-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-royal-400 via-magenta-400 to-electric-400 animate-gradient-x">
                24/7 expert support
              </span>
              .
            </motion.p>

            <motion.div
              variants={advancedButtonVariants}
              whileHover="hover"
              whileTap="tap"
              className="mb-16"
            >
              <button className="bg-gradient-to-r from-royal-500 via-electric-500 to-neon-500 dark:from-royal-400 dark:via-electric-400 dark:to-neon-400 text-white px-16 py-7 rounded-glass text-2xl font-extrabold shadow-neon-purple hover:shadow-neon-cyan transition-all duration-700 relative overflow-hidden group border-0 animate-gradient-x">
                <motion.span className="absolute inset-0 bg-gradient-to-r from-magenta-500 via-royal-500 to-neon-500 dark:from-magenta-400 dark:via-royal-400 dark:to-neon-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-x" />
                <span className="relative z-10 tracking-wider">Get Started Instantly</span>
              </button>
            </motion.div>

            {/* Animated Statistics */}
            <motion.div
              variants={statsVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
            >
              <motion.div
                variants={statItemVariants}
                whileHover="hover"
                className="bg-card-glass dark:bg-card-glass backdrop-blur-2xl rounded-glass p-10 shadow-neon-purple border-2 border-royal-400 dark:border-royal-500 text-center group cursor-pointer transition-all duration-700 hover:scale-105 hover:shadow-neon-cyan animate-float"
              >
                <motion.div
                  className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-royal-500 to-neon-500 dark:from-royal-400 dark:to-neon-400 mb-3 animate-gradient-x"
                  variants={pulseVariants}
                  animate="animate"
                >
                  <AnimatedCounter value="98%" duration={2} />
                </motion.div>
                <p className="text-white font-bold text-xl group-hover:text-neon-400 transition-colors tracking-wide uppercase drop-shadow-[0_2px_16px_rgba(139,92,246,0.25)]">
                  First-Pass Rate
                </p>
              </motion.div>

              <motion.div
                variants={statItemVariants}
                whileHover="hover"
                className="bg-card-glass dark:bg-card-glass backdrop-blur-2xl rounded-glass p-10 shadow-neon-purple border-2 border-electric-400 dark:border-electric-500 text-center group cursor-pointer transition-all duration-700 hover:scale-105 hover:shadow-neon-cyan animate-float"
              >
                <motion.div
                  className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-electric-500 to-magenta-500 dark:from-electric-400 dark:to-magenta-400 mb-3 animate-gradient-x"
                  variants={pulseVariants}
                  animate="animate"
                >
                  <AnimatedCounter value="34%" duration={2.5} />
                </motion.div>
                <p className="text-white font-bold text-xl group-hover:text-magenta-400 transition-colors tracking-wide uppercase drop-shadow-[0_2px_16px_rgba(139,92,246,0.25)]">
                  Revenue Increase
                </p>
              </motion.div>

              <motion.div
                variants={statItemVariants}
                whileHover="hover"
                className="bg-card-glass dark:bg-card-glass backdrop-blur-2xl rounded-glass p-10 shadow-neon-purple border-2 border-magenta-400 dark:border-magenta-500 text-center group cursor-pointer transition-all duration-700 hover:scale-105 hover:shadow-neon-cyan animate-float"
              >
                <motion.div
                  className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-500 to-royal-500 dark:from-magenta-400 dark:to-royal-400 mb-3 animate-gradient-x"
                  variants={pulseVariants}
                  animate="animate"
                >
                  <AnimatedCounter value="60%" duration={3} />
                </motion.div>
                <p className="text-white font-bold text-xl group-hover:text-royal-400 transition-colors tracking-wide uppercase drop-shadow-[0_2px_16px_rgba(139,92,246,0.25)]">
                  Faster Collections
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <motion.section
          className="py-32 px-4 md:px-16 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 relative transition-colors duration-700"
          variants={featureGridVariants}
          initial="hidden"
          animate="visible"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-20" variants={textContainerVariants}>
              <motion.h2
                className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600 dark:from-cyan-400 dark:to-purple-400 mb-8 leading-tight"
                variants={textRevealVariants}
              >
                Powerful Features
              </motion.h2>
              <motion.p
                className="text-2xl text-slate-700 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed transition-colors duration-700"
                variants={textRevealVariants}
              >
                Discover the comprehensive suite of tools designed to revolutionize your medical
                billing process
              </motion.p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
              variants={featureGridVariants}
            >
              {features.map((feature, idx) => (
                <FeatureCard key={feature.title} feature={feature} delay={idx * 0.2} />
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          className="py-32 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden transition-colors duration-700"
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="max-w-7xl mx-auto px-4">
            <motion.div className="text-center mb-20" variants={textContainerVariants}>
              <motion.h2
                className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 mb-8 leading-tight"
                variants={textRevealVariants}
              >
                Client Success Stories
              </motion.h2>
              <motion.p
                className="text-2xl text-slate-700 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed transition-colors duration-700"
                variants={textRevealVariants}
              >
                Hear from healthcare professionals who transformed their billing with BrightWell
              </motion.p>
            </motion.div>

            <motion.div
              className="flex overflow-x-auto space-x-8 pb-8 snap-x snap-mandatory"
              variants={featureGridVariants}
            >
              {testimonials.map((testimonial, idx) => (
                <TestimonialCard
                  key={testimonial.name}
                  testimonial={testimonial}
                  delay={idx * 0.2}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-36 bg-cta-gradient bg-[length:200%_200%] animate-gradient-x text-white relative overflow-hidden transition-colors duration-700"
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Glassy Overlay & Animated Shapes */}
          <div className="absolute inset-0 bg-glass dark:bg-glass-dark backdrop-blur-2xl z-0" />
          <motion.div className="absolute -top-24 left-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-magenta-500 via-royal-500 to-neon-500 opacity-30 blur-3xl animate-float z-0" />
          <motion.div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-neon-400 via-electric-400 to-magenta-400 opacity-20 blur-2xl animate-float z-0" />

          <motion.div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <motion.h2
              className="text-7xl font-black mb-10 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-magenta-500 via-royal-500 to-neon-500 animate-gradient-x drop-shadow-[0_4px_32px_rgba(139,92,246,0.45)]"
              variants={heroTitleVariants}
            >
              Ready to Dominate Your Revenue?
            </motion.h2>

            <motion.p
              className="text-3xl mb-16 opacity-90 leading-relaxed max-w-4xl mx-auto font-semibold drop-shadow-[0_2px_16px_rgba(139,92,246,0.25)]"
              variants={heroTextVariants}
            >
              Join the movement. Thousands of providers are already maximizing their billing with{' '}
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-royal-400 via-electric-400 to-neon-400 animate-gradient-x">
                BrightWell
              </span>
              .
            </motion.p>

            <motion.div
              variants={advancedButtonVariants}
              whileHover="hover"
              whileTap="tap"
              className="inline-block"
            >
              <button className="bg-gradient-to-r from-magenta-500 via-royal-500 to-neon-500 dark:from-magenta-400 dark:via-royal-400 dark:to-neon-400 text-white px-20 py-8 rounded-glass text-3xl font-extrabold shadow-neon-purple hover:shadow-neon-cyan transition-all duration-700 relative overflow-hidden group border-0 animate-gradient-x">
                <motion.span className="absolute inset-0 bg-gradient-to-r from-royal-500 via-electric-500 to-neon-500 dark:from-royal-400 dark:via-electric-400 dark:to-neon-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-x" />
                <span className="relative z-10 tracking-wider">Start Your Free Trial</span>
              </button>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
    </LazyMotion>
  );
}
