'use client';
import AdvancedCard from '@/components/animations/AdvancedCard';
import AnimatedButton from '@/components/animations/AnimatedButtons';
import AnimatedMetric from '@/components/animations/AnimatedMetric';
import ModernAnimations from '@/components/animations/ModernAnimations';
import ParallaxHero from '@/components/animations/ParallaxHero';
import { fadeInVariants, staggerContainer } from '@/lib/motionConfig';
import { motion } from 'framer-motion';

export default function AnimationShowcase() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ParallaxHero
        backgroundImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        overlay={true}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center text-white"
        >
          <h1 className="text-6xl font-bold mb-6">Modern Framer Motion</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the latest Framer Motion features with enhanced animations, better
            performance, and modern React patterns.
          </p>
          <div className="flex gap-4 justify-center">
            <AnimatedButton label="Get Started" variant="primary" icon={<span>🚀</span>} />
            <AnimatedButton label="Learn More" variant="outline" icon={<span>📖</span>} />
          </div>
        </motion.div>
      </ParallaxHero>

      {/* Metrics Section */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2 variants={fadeInVariants} className="text-4xl font-bold text-center mb-12">
            Performance Metrics
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: 99, suffix: '%', label: 'Performance Score' },
              { value: 150, suffix: '+', label: 'Components' },
              { value: 2.5, suffix: 's', label: 'Load Time', decimals: 1 },
            ].map((metric, index) => (
              <motion.div key={index} variants={fadeInVariants} className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  <AnimatedMetric
                    from={0}
                    to={metric.value}
                    duration={2}
                    suffix={metric.suffix}
                    decimals={metric.decimals || 0}
                  />
                </div>
                <p className="text-gray-600">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Modern Animations Demo */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Interactive Animations
          </motion.h2>
          <ModernAnimations />
        </div>
      </section>

      {/* Advanced Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Advanced Components
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: '3D Interactions',
                description:
                  'Mouse-tracking parallax effects with 3D transforms and smooth spring animations.',
                image:
                  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
              },
              {
                title: 'Layout Animations',
                description:
                  'Smooth layout transitions that automatically animate when content changes.',
                image:
                  'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
              },
              {
                title: 'Gesture Recognition',
                description:
                  'Advanced drag, swipe, and hover interactions with haptic-like feedback.',
                image:
                  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
              },
            ].map((card, index) => (
              <AdvancedCard
                key={index}
                title={card.title}
                description={card.description}
                image={card.image}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-12 bg-gray-900 text-white text-center"
      >
        <p className="text-lg">Built with the latest Framer Motion patterns and best practices</p>
      </motion.footer>
    </div>
  );
}
