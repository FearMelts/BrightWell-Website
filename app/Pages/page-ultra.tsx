'use client';
import {
  advancedButtonVariants,
  ctaVariants,
  featureGridVariants,
  featureItemVariants,
  floatingVariants,
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

// --- Data ---
const features = [
  {
    title: 'Streamlined Billing',
    description: 'Efficient processes to ensure timely and accurate billing.',
    icon: '⚡',
  },
  {
    title: 'Compliance Assurance',
    description: 'Stay compliant with the latest healthcare regulations.',
    icon: '🛡️',
  },
  {
    title: 'Dedicated Support',
    description: 'Expert support to handle all your billing inquiries.',
    icon: '🎯',
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
      className="flex flex-col items-center text-center bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 will-change-transform border border-gray-100 group relative overflow-hidden"
    >
      <motion.div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <motion.div
        className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 flex items-center justify-center text-3xl relative z-10"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {feature.icon}
      </motion.div>

      <motion.h3
        className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors relative z-10"
        variants={textRevealVariants}
      >
        {feature.title}
      </motion.h3>

      <motion.p
        className="text-gray-600 leading-relaxed relative z-10"
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
      className="min-w-[380px] snap-center flex-shrink-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-8 text-center will-change-transform border border-gray-100 group relative overflow-hidden"
    >
      <motion.div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <motion.div
        className="w-24 h-24 rounded-full mx-auto mb-6 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-1 relative z-10"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl font-bold text-gray-700">
          {testimonial.name
            .split(' ')
            .map(n => n[0])
            .join('')}
        </div>
      </motion.div>

      <motion.p
        className="text-gray-600 italic mb-6 text-lg leading-relaxed relative z-10"
        variants={textRevealVariants}
      >
        "{testimonial.quote}"
      </motion.p>

      <motion.div className="relative z-10">
        <motion.p
          className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors"
          variants={textRevealVariants}
        >
          {testimonial.name}
        </motion.p>
        <motion.p className="text-sm text-gray-500" variants={textRevealVariants}>
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
      <div ref={containerRef}>
        <main className="flex flex-col bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30 text-gray-800 font-sans relative overflow-hidden">
          {/* Floating Background Elements */}
          <motion.div
            className="fixed top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl pointer-events-none"
            variants={floatingVariants}
            animate="animate"
          />
          <motion.div
            className="fixed top-1/3 right-20 w-48 h-48 bg-gradient-to-br from-pink-400/20 to-orange-500/20 rounded-full blur-xl pointer-events-none"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 2 }}
          />
          <motion.div
            className="fixed bottom-1/4 left-1/3 w-24 h-24 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full blur-xl pointer-events-none"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 4 }}
          />

          {/* Hero Section */}
          <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5"
              style={{ y: backgroundY }}
            />

            <motion.div
              className="relative z-10 flex flex-col items-center max-w-6xl mx-auto"
              variants={heroVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={heroTitleVariants} className="mb-8" style={{ y: textY }}>
                <motion.h1
                  className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 tracking-tight leading-none mb-6"
                  variants={textContainerVariants}
                >
                  <motion.span variants={textRevealVariants} className="inline-block">
                    Illuminate
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
                  className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto"
                  initial={{ width: 0 }}
                  animate={{ width: '300px' }}
                  transition={{ delay: 1.5, duration: 1.2 }}
                />
              </motion.div>

              <motion.p
                variants={heroTextVariants}
                className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl"
              >
                Transform your medical billing with our cutting-edge solutions. Experience{' '}
                <motion.span
                  className="text-blue-600 font-bold"
                  whileHover={{ scale: 1.1, color: '#8B5CF6' }}
                  transition={{ duration: 0.3 }}
                >
                  unprecedented accuracy
                </motion.span>
                ,{' '}
                <motion.span
                  className="text-purple-600 font-bold"
                  whileHover={{ scale: 1.1, color: '#EC4899' }}
                  transition={{ duration: 0.3 }}
                >
                  lightning-fast processing
                </motion.span>
                , and{' '}
                <motion.span
                  className="text-pink-600 font-bold"
                  whileHover={{ scale: 1.1, color: '#3B82F6' }}
                  transition={{ duration: 0.3 }}
                >
                  maximum revenue recovery
                </motion.span>
                .
              </motion.p>

              <motion.div
                variants={advancedButtonVariants}
                whileHover="hover"
                whileTap="tap"
                className="mb-16"
              >
                <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-12 py-6 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 relative overflow-hidden group">
                  <motion.span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10">Start Your Journey</span>
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
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 text-center group cursor-pointer"
                >
                  <motion.div
                    className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3"
                    variants={pulseVariants}
                    animate="animate"
                  >
                    <AnimatedCounter value="98%" duration={2} />
                  </motion.div>
                  <p className="text-gray-600 font-bold text-lg group-hover:text-gray-800 transition-colors">
                    First-Pass Rate
                  </p>
                </motion.div>

                <motion.div
                  variants={statItemVariants}
                  whileHover="hover"
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 text-center group cursor-pointer"
                >
                  <motion.div
                    className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3"
                    variants={pulseVariants}
                    animate="animate"
                  >
                    <AnimatedCounter value="34%" duration={2.5} />
                  </motion.div>
                  <p className="text-gray-600 font-bold text-lg group-hover:text-gray-800 transition-colors">
                    Revenue Increase
                  </p>
                </motion.div>

                <motion.div
                  variants={statItemVariants}
                  whileHover="hover"
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 text-center group cursor-pointer"
                >
                  <motion.div
                    className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-600 mb-3"
                    variants={pulseVariants}
                    animate="animate"
                  >
                    <AnimatedCounter value="60%" duration={3} />
                  </motion.div>
                  <p className="text-gray-600 font-bold text-lg group-hover:text-gray-800 transition-colors">
                    Faster Collections
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </section>

          {/* Features Section */}
          <motion.section
            className="py-32 px-4 md:px-16 bg-white relative"
            variants={featureGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div className="max-w-7xl mx-auto">
              <motion.div className="text-center mb-20" variants={textContainerVariants}>
                <motion.h2
                  className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 leading-tight"
                  variants={textRevealVariants}
                >
                  Powerful Features
                </motion.h2>
                <motion.p
                  className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
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
            className="py-32 bg-gradient-to-br from-gray-50 to-blue-50/50 relative overflow-hidden"
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="max-w-7xl mx-auto px-4">
              <motion.div className="text-center mb-20" variants={textContainerVariants}>
                <motion.h2
                  className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8 leading-tight"
                  variants={textRevealVariants}
                >
                  Client Success Stories
                </motion.h2>
                <motion.p
                  className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
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
            className="py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden"
            variants={ctaVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="absolute inset-0 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            />

            <motion.div className="max-w-5xl mx-auto px-4 text-center relative z-10">
              <motion.h2
                className="text-7xl font-black mb-10 leading-tight"
                variants={heroTitleVariants}
              >
                Ready to Transform Your Practice?
              </motion.h2>

              <motion.p
                className="text-2xl mb-16 opacity-90 leading-relaxed max-w-4xl mx-auto"
                variants={heroTextVariants}
              >
                Join thousands of healthcare providers who have revolutionized their billing process
                with BrightWell
              </motion.p>

              <motion.div
                variants={advancedButtonVariants}
                whileHover="hover"
                whileTap="tap"
                className="inline-block"
              >
                <button className="bg-white text-gray-900 px-16 py-8 rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-white/25 transition-all duration-500 relative overflow-hidden group">
                  <motion.span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  <span className="relative z-10">Start Your Free Trial</span>
                </button>
              </motion.div>
            </motion.div>
          </motion.section>
        </main>
      </div>
    </LazyMotion>
  );
}
