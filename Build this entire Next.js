'use client';
import { motion } from 'framer-motion';
import Head from 'next/head';

// Animation config (no as const)
const transitionConfig = { duration: 0.8, ease: [0.4, 0, 0.2, 1] };

// Data for the feature grid
const features = [
  {
    title: 'Streamlined Billing',
    description: 'Efficient processes to ensure timely and accurate billing.',
    image: 'https://source.unsplash.com/featured/?medical,billing',
  },
  {
    title: 'Compliance Assurance',
    description: 'Stay compliant with the latest healthcare regulations.',
    image: 'https://source.unsplash.com/featured/?compliance,healthcare',
  },
  {
    title: 'Dedicated Support',
    description: 'Expert support to handle all your billing inquiries.',
    image: 'https://source.unsplash.com/featured/?support,medical',
  },
];

// Client testimonials
const testimonials = [
  {
    name: 'Dr. Emily Carter',
    quote: 'BrightWell has transformed our billing process, making it seamless and stress-free.',
    image: 'https://source.unsplash.com/100x100/?portrait,doctor',
  },
  {
    name: 'Clinic Manager, NY',
    quote: 'Our claims are processed faster and with greater accuracy thanks to BrightWell.',
    image: 'https://source.unsplash.com/100x100/?portrait,manager',
  },
  {
    name: 'Healthcare Provider, TX',
    quote: 'The support team is always ready to assist with any billing issues we encounter.',
    image: 'https://source.unsplash.com/100x100/?portrait,provider',
  },
];

// Feature card
const FeatureCard = ({ feature, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ ...transitionConfig, delay }}
    className="flex flex-col items-center text-center bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-500"
    whileHover={{ scale: 1.03 }}
  >
    <img
      src={feature.image}
      alt={feature.title}
      loading="lazy"
      className="rounded-xl object-cover w-full h-60 mb-6 transition-transform duration-500 hover:scale-105"
    />
    <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
    <p className="text-gray-600">{feature.description}</p>
  </motion.div>
);

// Testimonial card
const TestimonialCard = ({ testimonial, delay = 0 }) => (
  <motion.div
    className="min-w-[300px] snap-center flex-shrink-0 bg-gray-50 rounded-2xl shadow-lg p-6 text-center"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ ...transitionConfig, delay }}
  >
    <img
      src={testimonial.image}
      alt={testimonial.name}
      loading="lazy"
      className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
    />
    <p className="text-gray-600 italic mb-2">&ldquo;{testimonial.quote}&rdquo;</p>
    <p className="font-medium text-gray-900">{testimonial.name}</p>
  </motion.div>
);

/**
 * Renders the main landing page for BrightWell Systems, including hero section,
 * feature highlights, client testimonials, and call-to-action sections.
 * Utilizes Framer Motion for animations and Next.js Head for SEO.
 *
 * @returns {JSX.Element} The UltraPage component.
 */
export default function UltraPage() {
  return (
    <>
      <Head>
        <title>Reliable Medical Billing | BrightWell Systems</title>
        <meta
          name="description"
          content="Streamline your medical billing process with compliance-first, expert-backed solutions."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex flex-col bg-gradient-to-b from-white to-gray-50 text-gray-800 font-sans">
        {/*<ParallaxHero> */}
        <section
          className="relative h-screen flex flex-col justify-center items-center text-center bg-cover bg-center"
          style={{ backgroundImage: `url(https://source.unsplash.com/featured/?medical,office)` }}
        >
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transitionConfig}
            className="relative text-6xl font-bold text-gray-900 tracking-tight"
          >
            Reliable Medical Billing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: 0.2 }}
            className="relative mt-6 max-w-xl text-lg text-gray-600"
          >
            Streamline your practice’s billing process with our expert solutions.
          </motion.p>
          <motion.button
            type="button"
            aria-label="Get started with BrightWell"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: 0.4 }}
            className="relative mt-8 bg-blue-600 text-white px-8 py-4 rounded-full font-medium shadow-lg transition-transform hover:scale-105"
          >
            Get Started
          </motion.button>
        </section>
        {/*</ParallaxHero> */}
        <section className="py-24 px-4 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, idx) => (
            <FeatureCard key={feature.title} feature={feature} delay={idx * 0.2} />
          ))}
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-white">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={transitionConfig}
            className="text-4xl font-bold text-center mb-12"
          >
            What Our Clients Say
          </motion.h2>
          <div className="flex overflow-x-scroll gap-8 px-4 md:px-16 snap-x">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} delay={idx * 0.2} />
            ))}
          </div>
        </section>

        {/* Call To Action */}
        <section className="py-24 px-4 md:px-16 text-center bg-gray-50">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={transitionConfig}
            className="text-4xl font-bold mb-4"
          >
            Ready to Optimize Your Billing?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ ...transitionConfig, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-8 text-gray-600"
          >
            Join countless healthcare providers who trust us with their billing needs.
          </motion.p>
          <motion.button
            type="button"
            aria-label="Contact BrightWell today"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: 0.4 }}
            className="bg-blue-600 text-white px-10 py-6 rounded-full font-medium shadow-lg transition-transform hover:scale-105"
          >
            Contact Us Today
          </motion.button>
        </section>
      </main>
    </>
  );
}
