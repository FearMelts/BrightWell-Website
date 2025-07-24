/**
 * Advanced contact form component with validation and animations
 * Features form validation, error handling, and smooth submission animations
 */
'use client';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CheckCircle, Phone, Mail, MapPin, Clock, Stethoscope } from 'lucide-react';

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
    setValue,
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
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Thank You for Your Interest!
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We've received your message and will contact you within 24 hours to discuss your medical
          billing needs.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>What's Next?</strong> Our billing specialists will review your practice details
            and prepare a customized solution proposal.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      variants={formVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={inputVariants}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            First Name *
          </label>
          <Input
            {...register('firstName')}
            className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600"
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </motion.div>

        <motion.div variants={inputVariants}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Last Name *
          </label>
          <Input
            {...register('lastName')}
            className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600"
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </motion.div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={inputVariants}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address *
          </label>
          <Input
            {...register('email')}
            type="email"
            className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600"
            placeholder="your.email@practice.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </motion.div>

        <motion.div variants={inputVariants}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number *
          </label>
          <Input
            {...register('phone')}
            type="tel"
            className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600"
            placeholder="(555) 123-4567"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </motion.div>
      </div>

      {/* Practice Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={inputVariants}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Practice Type *
          </label>
          <Select onValueChange={value => setValue('practiceType', value)}>
            <SelectTrigger className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600">
              <SelectValue placeholder="Select practice type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="family-practice">Family Practice</SelectItem>
              <SelectItem value="internal-medicine">Internal Medicine</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="orthopedics">Orthopedics</SelectItem>
              <SelectItem value="dermatology">Dermatology</SelectItem>
              <SelectItem value="psychiatry">Psychiatry</SelectItem>
              <SelectItem value="emergency-medicine">Emergency Medicine</SelectItem>
              <SelectItem value="surgery">Surgery</SelectItem>
              <SelectItem value="other">Other Specialty</SelectItem>
            </SelectContent>
          </Select>
          {errors.practiceType && (
            <p className="text-red-500 text-sm mt-1">{errors.practiceType.message}</p>
          )}
        </motion.div>

        <motion.div variants={inputVariants}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Practice Size *
          </label>
          <Select onValueChange={value => setValue('practiceSize', value)}>
            <SelectTrigger className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600">
              <SelectValue placeholder="Select practice size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solo">Solo Practice (1 provider)</SelectItem>
              <SelectItem value="small">Small Practice (2-5 providers)</SelectItem>
              <SelectItem value="medium">Medium Practice (6-15 providers)</SelectItem>
              <SelectItem value="large">Large Practice (16+ providers)</SelectItem>
              <SelectItem value="hospital">Hospital/Health System</SelectItem>
            </SelectContent>
          </Select>
          {errors.practiceSize && (
            <p className="text-red-500 text-sm mt-1">{errors.practiceSize.message}</p>
          )}
        </motion.div>
      </div>

      {/* Additional Information */}
      <motion.div variants={inputVariants}>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Current Billing System (Optional)
        </label>
        <Input
          {...register('currentBillingSystem')}
          className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600"
          placeholder="e.g., Epic, Cerner, Practice Fusion, or In-house"
        />
      </motion.div>

      <motion.div variants={inputVariants}>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          How Can We Help You? *
        </label>
        <Textarea
          {...register('message')}
          className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 min-h-[120px]"
          placeholder="Tell us about your billing challenges, goals, or specific questions..."
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
      </motion.div>

      <motion.div variants={inputVariants}>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Request Priority
        </label>
        <Select onValueChange={value => setValue('urgency', value)}>
          <SelectTrigger className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600">
            <SelectValue placeholder="Select priority level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">Standard - Within 48 hours</SelectItem>
            <SelectItem value="urgent">Urgent - Within 24 hours</SelectItem>
            <SelectItem value="immediate">Immediate - Same day response needed</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={inputVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
            />
          ) : (
            'Get Your Free Consultation'
          )}
        </Button>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        variants={inputVariants}
        className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 mt-8"
      >
        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
          Prefer to Contact Us Directly?
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Call Us</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">1-800-BILLING</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Email Us</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">hello@brightwell.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Business Hours</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Mon-Fri 8AM-6PM EST</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.form>
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
      bgColor: 'from-cyan-500 to-blue-600',
      textColor: 'text-cyan-600 dark:text-cyan-400',
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us detailed questions and documentation',
      details: 'support@brightwell.com',
      available: 'Response within 4 hours',
      bgColor: 'from-blue-500 to-purple-600',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: Stethoscope,
      title: 'Practice Visit',
      description: 'On-site consultation and setup assistance',
      details: 'Schedule a consultation',
      available: 'Available in major metropolitan areas',
      bgColor: 'from-purple-500 to-pink-600',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      icon: MapPin,
      title: 'Office Locations',
      description: 'Visit our regional offices for in-person support',
      details: '12 locations nationwide',
      available: 'Mon-Fri 8AM-6PM local time',
      bgColor: 'from-green-500 to-teal-600',
      textColor: 'text-green-600 dark:text-green-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {contactMethods.map((method, index) => {
        const IconComponent = method.icon;
        return (
          <motion.div
            key={method.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
          >
            <div
              className={`w-12 h-12 bg-gradient-to-br ${method.bgColor} rounded-xl flex items-center justify-center mb-4`}
            >
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{method.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{method.description}</p>
            <p className={`font-semibold ${method.textColor} mb-2`}>{method.details}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">{method.available}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
