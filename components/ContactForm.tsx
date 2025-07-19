/**
 * Advanced contact form component with validation and animations
 * Features form validation, error handling, and smooth submission animations
 */
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, MapPin, Phone, Stethoscope } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

/**
 * Form validation schema using Zod
 */
const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  practiceType: z.string().min(1, 'Please select your practice type'),
  practiceSize: z.string().min(1, 'Please select your practice size'),
  currentBillingSystem: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  urgency: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Animation variants for form elements
 */
const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
  focus: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
};

/**
 * Main contact form component
 */
export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  /**
   * Handle form submission with animation
   */
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Form submitted:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after success message
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 bg-card-glass backdrop-blur-2xl rounded-glass border-2 border-electric-400 shadow-neon-purple"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 bg-gradient-to-r from-neon-500 to-electric-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-neon-cyan animate-float"
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>
        <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-neon-400 mb-6 animate-gradient-x">
          Thank You for Your Interest!
        </h3>
        <p className="text-xl text-white/90 mb-8 font-semibold">
          We've received your message and will contact you within 24 hours to discuss your medical
          billing needs.
        </p>
        <div className="bg-white/10 backdrop-blur-2xl rounded-glass p-6 border border-white/20">
          <p className="text-white/80 font-medium">
            <strong className="text-neon-400">What's Next?</strong> Our billing specialists will
            review your practice details and prepare a customized solution proposal.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <section className="py-32 bg-gradient-to-br from-royal-600 via-electric-600 to-neon-600 dark:from-royal-800 dark:via-electric-800 dark:to-neon-800 relative overflow-hidden animate-gradient-x">
      {/* Glassy Overlay */}
      <div className="absolute inset-0 bg-glass dark:bg-glass-dark backdrop-blur-2xl z-0" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-gradient-to-r from-magenta-500 to-royal-500 rounded-glass flex items-center justify-center mx-auto mb-6 shadow-neon-purple animate-float"
          >
            <Phone className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 via-royal-400 to-neon-400 mb-6 animate-gradient-x drop-shadow-[0_4px_32px_rgba(139,92,246,0.45)]">
            Get Your <span className="text-white">Free Consultation</span>
          </h2>
          <p className="text-2xl text-white/90 max-w-4xl mx-auto font-semibold drop-shadow-[0_2px_16px_rgba(139,92,246,0.25)]">
            Transform your medical billing with a personalized strategy session. No cost, no
            commitment.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="bg-card-glass dark:bg-card-glass backdrop-blur-2xl rounded-glass p-10 border-2 border-electric-400 dark:border-electric-500 shadow-neon-purple"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={inputVariants}>
                <label className="block text-lg font-bold text-white mb-3">First Name *</label>
                <input
                  {...register('firstName')}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-2xl border-2 border-electric-400 rounded-glass text-white placeholder-white/60 focus:outline-none focus:border-magenta-400 transition-colors text-lg"
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-red-400 text-sm mt-2 font-medium">
                    {errors.firstName.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={inputVariants}>
                <label className="block text-lg font-bold text-white mb-3">Last Name *</label>
                <input
                  {...register('lastName')}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-2xl border-2 border-electric-400 rounded-glass text-white placeholder-white/60 focus:outline-none focus:border-magenta-400 transition-colors text-lg"
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-red-400 text-sm mt-2 font-medium">{errors.lastName.message}</p>
                )}
              </motion.div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={inputVariants}>
                <label className="block text-lg font-bold text-white mb-3">Email Address *</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-2xl border-2 border-electric-400 rounded-glass text-white placeholder-white/60 focus:outline-none focus:border-magenta-400 transition-colors text-lg"
                  placeholder="your.email@practice.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-2 font-medium">{errors.email.message}</p>
                )}
              </motion.div>

              <motion.div variants={inputVariants}>
                <label className="block text-lg font-bold text-white mb-3">Phone Number *</label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-2xl border-2 border-electric-400 rounded-glass text-white placeholder-white/60 focus:outline-none focus:border-magenta-400 transition-colors text-lg"
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-2 font-medium">{errors.phone.message}</p>
                )}
              </motion.div>
            </div>

            {/* Practice Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={inputVariants}>
                <label className="block text-lg font-bold text-white mb-3">Practice Type *</label>
                <select
                  {...register('practiceType')}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-2xl border-2 border-electric-400 rounded-glass text-white focus:outline-none focus:border-magenta-400 transition-colors text-lg"
                >
                  <option value="" className="bg-slate-800 text-white">
                    Select practice type
                  </option>
                  <option value="family-practice" className="bg-slate-800 text-white">
                    Family Practice
                  </option>
                  <option value="internal-medicine" className="bg-slate-800 text-white">
                    Internal Medicine
                  </option>
                  <option value="pediatrics" className="bg-slate-800 text-white">
                    Pediatrics
                  </option>
                  <option value="cardiology" className="bg-slate-800 text-white">
                    Cardiology
                  </option>
                  <option value="orthopedics" className="bg-slate-800 text-white">
                    Orthopedics
                  </option>
                  <option value="dermatology" className="bg-slate-800 text-white">
                    Dermatology
                  </option>
                  <option value="psychiatry" className="bg-slate-800 text-white">
                    Psychiatry
                  </option>
                  <option value="emergency-medicine" className="bg-slate-800 text-white">
                    Emergency Medicine
                  </option>
                  <option value="surgery" className="bg-slate-800 text-white">
                    Surgery
                  </option>
                  <option value="other" className="bg-slate-800 text-white">
                    Other Specialty
                  </option>
                </select>
                {errors.practiceType && (
                  <p className="text-red-400 text-sm mt-2 font-medium">
                    {errors.practiceType.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={inputVariants}>
                <label className="block text-lg font-bold text-white mb-3">Practice Size *</label>
                <select
                  {...register('practiceSize')}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-2xl border-2 border-electric-400 rounded-glass text-white focus:outline-none focus:border-magenta-400 transition-colors text-lg"
                >
                  <option value="" className="bg-slate-800 text-white">
                    Select practice size
                  </option>
                  <option value="solo" className="bg-slate-800 text-white">
                    Solo Practice (1 provider)
                  </option>
                  <option value="small" className="bg-slate-800 text-white">
                    Small Practice (2-5 providers)
                  </option>
                  <option value="medium" className="bg-slate-800 text-white">
                    Medium Practice (6-15 providers)
                  </option>
                  <option value="large" className="bg-slate-800 text-white">
                    Large Practice (16+ providers)
                  </option>
                  <option value="hospital" className="bg-slate-800 text-white">
                    Hospital/Health System
                  </option>
                </select>
                {errors.practiceSize && (
                  <p className="text-red-400 text-sm mt-2 font-medium">
                    {errors.practiceSize.message}
                  </p>
                )}
              </motion.div>
            </div>

            {/* Additional Information */}
            <motion.div variants={inputVariants}>
              <label className="block text-lg font-bold text-white mb-3">
                Current Billing System (Optional)
              </label>
              <input
                {...register('currentBillingSystem')}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-2xl border-2 border-electric-400 rounded-glass text-white placeholder-white/60 focus:outline-none focus:border-magenta-400 transition-colors text-lg"
                placeholder="e.g., Epic, Cerner, Practice Fusion, or In-house"
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <label className="block text-lg font-bold text-white mb-3">
                How Can We Help You? *
              </label>
              <textarea
                {...register('message')}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-2xl border-2 border-electric-400 rounded-glass text-white placeholder-white/60 focus:outline-none focus:border-magenta-400 transition-colors text-lg min-h-[120px] resize-none"
                placeholder="Tell us about your billing challenges, goals, or specific questions..."
              />
              {errors.message && (
                <p className="text-red-400 text-sm mt-2 font-medium">{errors.message.message}</p>
              )}
            </motion.div>

            <motion.div variants={inputVariants}>
              <label className="block text-lg font-bold text-white mb-3">Request Priority</label>
              <select
                {...register('urgency')}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-2xl border-2 border-electric-400 rounded-glass text-white focus:outline-none focus:border-magenta-400 transition-colors text-lg"
              >
                <option value="" className="bg-slate-800 text-white">
                  Select priority level
                </option>
                <option value="standard" className="bg-slate-800 text-white">
                  Standard - Within 48 hours
                </option>
                <option value="urgent" className="bg-slate-800 text-white">
                  Urgent - Within 24 hours
                </option>
                <option value="immediate" className="bg-slate-800 text-white">
                  Immediate - Same day response needed
                </option>
              </select>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              variants={inputVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-magenta-500 via-royal-500 to-neon-500 dark:from-magenta-400 dark:via-royal-400 dark:to-neon-400 text-white px-20 py-6 rounded-glass text-2xl font-extrabold shadow-neon-purple hover:shadow-neon-cyan transition-all duration-700 relative overflow-hidden group border-0 animate-gradient-x disabled:opacity-50"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto"
                  />
                ) : (
                  <span className="relative z-10 tracking-wider">Get Your Free Consultation</span>
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>

        {/* Contact Information Cards */}
        <ContactInfoCards />
      </div>
    </section>
  );
}

/**
 * Contact information cards component
 */
export function ContactInfoCards() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our billing specialists',
      details: '1-800-BILLING (1-800-245-5464)',
      available: 'Available 24/7 for urgent matters',
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us detailed questions and documentation',
      details: 'support@brightwell.com',
      available: 'Response within 4 hours',
    },
    {
      icon: Stethoscope,
      title: 'Practice Visit',
      description: 'On-site consultation and setup assistance',
      details: 'Schedule a consultation',
      available: 'Available in major metropolitan areas',
    },
    {
      icon: MapPin,
      title: 'Office Locations',
      description: 'Visit our regional offices for in-person support',
      details: '12 locations nationwide',
      available: 'Mon-Fri 8AM-6PM local time',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-24 bg-card-glass dark:bg-card-glass backdrop-blur-2xl rounded-glass p-12 border-2 border-electric-400 dark:border-electric-500 shadow-neon-purple"
    >
      <h4 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-neon-400 mb-10 text-center animate-gradient-x">
        Prefer to Contact Us Directly?
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {contactMethods.map((method, index) => {
          const IconComponent = method.icon;
          return (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/10 backdrop-blur-2xl rounded-glass p-6 border border-white/20 hover:border-magenta-400 transition-all duration-300 animate-float"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-royal-500 to-neon-500 rounded-glass flex items-center justify-center mb-4 shadow-neon-purple">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-extrabold text-white mb-2 text-lg">{method.title}</h3>
              <p className="text-white/80 text-sm mb-3 leading-relaxed">{method.description}</p>
              <p className="font-bold text-neon-400 mb-2">{method.details}</p>
              <p className="text-xs text-white/60 font-medium">{method.available}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
