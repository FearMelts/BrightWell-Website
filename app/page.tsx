'use client';
import AnimatedButton from '@/components/animations/AnimatedButtons';
import { features } from '@/lib/data/features';
import { testimonials } from '@/lib/data/testimonials';
import type { Feature } from '@/types';
import { motion } from 'framer-motion';
// Replace heroicons import with local SVG components
const ChartBarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="3" y="13" width="4" height="8" rx="1" />
    <rect x="9" y="9" width="4" height="12" rx="1" />
    <rect x="15" y="5" width="4" height="16" rx="1" />
  </svg>
);
const ClipboardDocumentListIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="6" y="4" width="12" height="16" rx="2" />
    <path d="M9 8h6M9 12h6M9 16h2" />
  </svg>
);
const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M12 3l8 4v5c0 5.25-3.5 9.75-8 11-4.5-1.25-8-5.75-8-11V7l8-4z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const transitionConfig = { duration: 0.8, ease: [0.4, 0, 0.2, 1] } as const;

const FeatureCard = ({ feature, delay = 0 }: { feature: Feature; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ ...transitionConfig, delay }}
    className="flex flex-col items-center text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100"
    whileHover={{ scale: 1.02, y: -5 }}
  >
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-full mb-4">
      {feature.icon}
    </div>
    <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
  </motion.div>
);

export default function BrightWellsPage() {
  return (
    <main className="flex flex-col bg-gradient-to-b from-white to-gray-50 text-gray-800 font-sans">
      {/* ENHANCED HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90"></div>

        <div className="relative z-10 flex flex-col items-center max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-6">
              <ShieldCheckIcon className="w-16 h-16 text-white mx-auto" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-6xl md:text-7xl font-bold text-white tracking-tight mb-6"
          >
            Illuminate Your
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Medical Revenue
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            className="mt-6 max-w-3xl text-xl text-blue-100 leading-relaxed"
          >
            HIPAA-compliant medical billing solutions that maximize your revenue, reduce claim
            denials, and ensure regulatory compliance.
            <strong className="text-white">Transform your practice today.</strong>
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6 mt-10">
            <AnimatedButton
              label="Start Free Trial"
              variant="primary"
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl shadow-blue-500/25"
            />
            <AnimatedButton
              label="Client Portal"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-900"
            />
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-4xl"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-blue-200">First-Pass Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">34%</div>
              <div className="text-blue-200">Revenue Increase</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">60%</div>
              <div className="text-blue-200">Faster Collections</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ENHANCED FEATURES SECTION */}
      <section className="py-24 px-4 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transitionConfig}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Why Healthcare Providers Choose BrightWells
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive medical billing solutions designed for modern healthcare practices
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <FeatureCard key={feature.title} feature={feature} delay={idx * 0.2} />
          ))}
        </div>
      </section>

      {/* ENHANCED TESTIMONIALS */}
      <section className="py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={transitionConfig}
          className="text-5xl font-bold text-center mb-16 text-gray-900"
        >
          Trusted by Healthcare Professionals
        </motion.h2>
        <div className="flex overflow-x-scroll gap-8 px-4 md:px-16 snap-x">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              className="min-w-[350px] snap-center flex-shrink-0 bg-white rounded-2xl shadow-lg p-8 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...transitionConfig, delay: idx * 0.2 }}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-6 ring-4 ring-blue-100"
              />
              <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-blue-600">{testimonial.position}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ENHANCED CTA */}
      <section className="py-24 px-4 md:px-16 text-center bg-gradient-to-r from-blue-900 to-purple-900">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={transitionConfig}
          className="text-5xl font-bold mb-6 text-white"
        >
          Ready to Transform Your Practice?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ ...transitionConfig, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-10 text-xl text-blue-100"
        >
          Join thousands of healthcare providers who trust BrightWells with their revenue cycle
          management.
        </motion.p>
        <AnimatedButton
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-6 rounded-full font-bold text-lg shadow-2xl"
          label="Start Free Trial Today"
          size="lg"
        />
      </section>
    </main>
  );
}
