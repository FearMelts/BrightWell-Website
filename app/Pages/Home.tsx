/**
 * Enhanced medical billing landing page with comprehensive features
 * Includes all advanced animations, contact forms, blog, video testimonials, and service pages
 */
'use client';
import { Button } from 'components/ui/button';
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  Stethoscope,
  TrendingUp,
  Users,
} from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { BlogSection } from '../components/BlogSection';
import { ContactForm, ContactInfoCards } from '../components/ContactForm';
import { ServicePages } from '../components/ServicePages';
import { DarkModeToggle } from '../components/ThemeProvider';
import { VideoTestimonials } from '../components/VideoTestimonials';
import {
  ctaVariants,
  featureGridVariants,
  featureItemVariants,
  floatingVariants,
  heroTextVariants,
  heroTitleVariants,
  heroVariants,
  statItemVariants,
  statsVariants,
  testimonialVariants,
  textContainerVariants,
  textRevealVariants,
} from '../lib/motionConfig';

// --- Data ---
const features = [
  {
    title: 'Streamlined Billing',
    description:
      'Efficient processes to ensure timely and accurate billing with automated workflows and real-time tracking.',
    icon: '⚡',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Compliance Assurance',
    description:
      'Stay compliant with the latest healthcare regulations including HIPAA, ICD-10, and billing standards.',
    icon: '🛡️',
    color: 'from-purple-500 to-pink-600',
  },
  {
    title: 'Dedicated Support',
    description:
      'Expert support team available 24/7 to handle all your billing inquiries and provide personalized assistance.',
    icon: '🎯',
    color: 'from-green-500 to-teal-600',
  },
  {
    title: 'Revenue Optimization',
    description:
      'Advanced analytics and reporting to maximize your revenue potential and minimize claim denials.',
    icon: '📈',
    color: 'from-orange-500 to-red-600',
  },
  {
    title: 'Seamless Integration',
    description:
      'Easy integration with existing practice management systems and EHR platforms for smooth operations.',
    icon: '🔗',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Data Security',
    description:
      'Bank-level security measures to protect sensitive patient information and ensure complete data privacy.',
    icon: '🔒',
    color: 'from-pink-500 to-purple-600',
  },
];

const testimonials = [
  {
    name: 'Dr. Sarah Johnson',
    quote:
      'BrightWell transformed our billing process completely! Our revenue increased by 40% in just 3 months.',
    position: 'Chief Medical Officer',
    company: 'Metro Health Group',
    rating: 5,
  },
  {
    name: 'Mike Chen',
    quote:
      'Our claims are processed faster and with greater accuracy. The team is incredibly responsive and professional.',
    position: 'Practice Manager',
    company: 'Sunrise Family Practice',
    rating: 5,
  },
  {
    name: 'Lisa Rodriguez',
    quote:
      'The support team is always ready to assist us. Their expertise has been invaluable to our practice growth.',
    position: 'Healthcare Provider',
    company: 'Wellness Center Plus',
    rating: 5,
  },
  {
    name: 'Dr. James Wilson',
    quote:
      'Outstanding service and remarkable results. Our denial rate dropped to less than 2% since partnering with BrightWell.',
    position: 'Medical Director',
    company: 'Advanced Care Clinic',
    rating: 5,
  },
];

const stats = [
  { label: 'Claims Processed', value: '2.5M+', icon: TrendingUp },
  { label: 'Healthcare Providers', value: '5,000+', icon: Users },
  { label: 'Average Revenue Increase', value: '45%', icon: Star },
  { label: 'Claim Success Rate', value: '98.5%', icon: Shield },
];

// --- Navigation Component ---
function Navigation() {
  const [activeSection, setActiveSection] = useState('home');

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Success Stories' },
    { id: 'blog', label: 'Insights' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">BrightWell</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  activeSection === section.id
                    ? 'text-cyan-600 dark:text-cyan-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          <DarkModeToggle />
        </div>
      </div>
    </motion.nav>
  );
}

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
      className="flex flex-col items-center text-center bg-white/95 dark:bg-slate-800/95 rounded-3xl p-8 shadow-2xl hover:shadow-3xl dark:hover:shadow-cyan-500/10 transition-all duration-700 will-change-transform border border-slate-100 dark:border-slate-700 group relative overflow-hidden"
    >
      <motion.div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/8 to-purple-500/5 dark:from-cyan-400/10 dark:via-blue-400/15 dark:to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <motion.div
        className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 rounded-2xl mb-6 flex items-center justify-center text-3xl relative z-10 shadow-lg"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {feature.icon}
      </motion.div>

      <motion.h3
        className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors relative z-10"
        variants={textRevealVariants}
      >
        {feature.title}
      </motion.h3>

      <motion.p
        className="text-slate-700 dark:text-slate-300 leading-relaxed relative z-10 transition-colors duration-700"
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
      className="min-w-[380px] snap-center flex-shrink-0 bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-800 dark:to-slate-700 rounded-3xl shadow-2xl p-8 text-center will-change-transform border border-slate-100 dark:border-slate-600 group relative overflow-hidden transition-colors duration-700"
    >
      <motion.div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/8 to-purple-500/5 dark:from-cyan-400/10 dark:via-blue-400/15 dark:to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <motion.div
        className="w-24 h-24 rounded-full mx-auto mb-6 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 dark:from-cyan-300 dark:via-blue-400 dark:to-purple-400 p-1 relative z-10 shadow-lg"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-2xl font-bold text-slate-700 dark:text-slate-200 transition-colors duration-700">
          {testimonial.name
            .split(' ')
            .map(n => n[0])
            .join('')}
        </div>
      </motion.div>

      <motion.p
        className="text-slate-700 dark:text-slate-300 italic mb-6 text-lg leading-relaxed relative z-10 transition-colors duration-700"
        variants={textRevealVariants}
      >
        "{testimonial.quote}"
      </motion.p>

      <div className="flex justify-center mb-4 relative z-10">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>

      <motion.div className="relative z-10">
        <motion.p
          className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors duration-700"
          variants={textRevealVariants}
        >
          {testimonial.name}
        </motion.p>
        <motion.p
          className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-700"
          variants={textRevealVariants}
        >
          {testimonial.position}
        </motion.p>
        <motion.p
          className="text-xs text-slate-400 dark:text-slate-500 transition-colors duration-700"
          variants={textRevealVariants}
        >
          {testimonial.company}
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
    <div ref={containerRef}>
      <Navigation />

      <main className="flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50/40 dark:from-slate-900 dark:via-gray-900 dark:to-blue-950/40 text-gray-900 dark:text-gray-50 font-sans relative overflow-hidden transition-colors duration-700">
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
        <section
          id="home"
          className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 transition-colors duration-700 pt-16"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-blue-600/12 to-purple-600/8 dark:from-cyan-400/15 dark:via-blue-500/20 dark:to-purple-500/15"
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
                className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 tracking-tight leading-none mb-6 drop-shadow-sm"
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
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-slate-700 dark:text-slate-300 mb-12 max-w-4xl leading-relaxed font-light"
              variants={heroTextVariants}
            >
              Transform your healthcare practice with our comprehensive medical billing solutions.
              Maximize revenue, ensure compliance, and focus on what matters most - patient care.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-6 mb-16" variants={ctaVariants}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 px-8 py-6 rounded-2xl text-lg font-semibold transition-all duration-300"
              >
                Schedule Demo
              </Button>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 w-full max-w-5xl"
              variants={statsVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center bg-white/80 dark:bg-slate-800/80 rounded-2xl p-6 backdrop-blur-sm border border-white/20 dark:border-slate-700/20 shadow-lg"
                  variants={statItemVariants}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-cyan-600 dark:text-cyan-400" />
                  <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section
          id="services"
          className="py-20 px-4 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/50 dark:from-slate-900 dark:via-blue-950/50 dark:to-cyan-950/30 transition-colors duration-700"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-6">
                Our Solutions
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Comprehensive medical billing services designed to optimize your revenue cycle and
                streamline your practice operations.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={featureGridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} delay={index * 0.1} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Service Pages Component */}
        <ServicePages />

        {/* Video Testimonials Section */}
        <VideoTestimonials />

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-blue-950/30 dark:to-purple-950/20 transition-colors duration-700"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 mb-6">
                Success Stories
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Hear from healthcare providers who have transformed their practices with
                BrightWell's medical billing solutions.
              </p>
            </motion.div>

            <motion.div
              className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, staggerChildren: 0.2 }}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.name}
                  testimonial={testimonial}
                  delay={index * 0.2}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Blog Section */}
        <BlogSection />

        {/* Contact Section */}
        <section
          id="contact"
          className="py-20 px-4 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 transition-colors duration-700"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-6">
                Get In Touch
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Ready to transform your medical billing? Contact us today for a free consultation
                and discover how we can optimize your revenue cycle.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactInfoCards />
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-700 dark:via-blue-700 dark:to-purple-700">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Ready to Transform Your Practice?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of healthcare providers who trust BrightWell for their medical
                billing needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 rounded-2xl text-lg font-semibold transition-all duration-300"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Call Now
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 bg-slate-900 dark:bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold">BrightWell</span>
                </div>
                <p className="text-slate-400">
                  Illuminating your path to optimized medical revenue through expert billing
                  solutions.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-slate-400">
                  <li>Revenue Cycle Management</li>
                  <li>Claims Processing</li>
                  <li>Compliance Monitoring</li>
                  <li>Analytics & Reporting</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-slate-400">
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>News & Updates</li>
                  <li>Case Studies</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    (555) 123-4567
                  </li>
                  <li className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    hello@brightwell.com
                  </li>
                  <li className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Healthcare District, TX
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
              <p>&copy; 2024 BrightWell Medical Billing. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
