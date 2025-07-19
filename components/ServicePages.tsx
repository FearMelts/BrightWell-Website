/**
 * Individual service detail pages component with comprehensive information
 * Features detailed service descriptions, pricing, benefits, and implementation guides
 */
'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Shield,
  TrendingUp,
  Users,
  Zap,
  Target,
  BarChart3,
  FileText,
  Headphones,
  DollarSign,
  Calendar,
  Award,
  Lightbulb,
  Settings,
  ChevronRight,
  PlayCircle,
  Download,
  Phone
} from 'lucide-react';

/**
 * Service data structure
 */
interface ServiceDetail {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: any;
  heroImage: string;
  benefits: string[];
  features: {
    name: string;
    description: string;
    included: boolean;
  }[];
  pricing: {
    starter: {
      price: string;
      description: string;
      features: string[];
    };
    professional: {
      price: string;
      description: string;
      features: string[];
    };
    enterprise: {
      price: string;
      description: string;
      features: string[];
    };
  };
  implementation: {
    timeline: string;
    steps: {
      title: string;
      description: string;
      duration: string;
    }[];
  };
  caseStudies: {
    client: string;
    challenge: string;
    solution: string;
    results: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  metrics: {
    accuracy: string;
    efficiency: string;
    satisfaction: string;
  };
}

/**
 * Comprehensive service details data
 */
const serviceDetails: ServiceDetail[] = [
  {
    id: 'streamlined-billing',
    title: 'Streamlined Billing Solutions',
    shortDescription: 'Efficient processes to ensure timely and accurate billing with automated workflows.',
    fullDescription: 'Our streamlined billing solution revolutionizes your revenue cycle management through advanced automation, intelligent claim processing, and real-time analytics. Eliminate manual errors, reduce processing time by 75%, and maximize your revenue potential.',
    icon: Zap,
    heroImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    benefits: [
      'Automated claim submission and tracking',
      'Real-time eligibility verification',
      'Intelligent denial management',
      'Advanced reporting and analytics',
      'Seamless EHR integration',
      'HIPAA-compliant processes'
    ],
    features: [
      {
        name: 'Automated Claims Processing',
        description: 'AI-powered system processes claims 24/7 with 99.2% accuracy',
        included: true
      },
      {
        name: 'Real-time Eligibility Checks',
        description: 'Instant insurance verification before patient visits',
        included: true
      },
      {
        name: 'Smart Denial Management',
        description: 'Automated appeal generation and resubmission workflows',
        included: true
      },
      {
        name: 'Custom Reporting Dashboard',
        description: 'Comprehensive analytics and performance metrics',
        included: true
      },
      {
        name: 'EHR Integration',
        description: 'Seamless connection with 50+ popular EHR systems',
        included: true
      },
      {
        name: 'Dedicated Support Team',
        description: '24/7 expert support with average 30-second response time',
        included: true
      }
    ],
    pricing: {
      starter: {
        price: '$299/month',
        description: 'Perfect for solo practices and small clinics',
        features: [
          'Up to 500 claims/month',
          'Basic reporting',
          'Email support',
          'Standard integrations',
          'Monthly reconciliation'
        ]
      },
      professional: {
        price: '$599/month',
        description: 'Ideal for growing practices with multiple providers',
        features: [
          'Up to 2,000 claims/month',
          'Advanced analytics',
          'Phone & email support',
          'Custom integrations',
          'Weekly reconciliation',
          'Denial management',
          'Patient billing portal'
        ]
      },
      enterprise: {
        price: 'Custom pricing',
        description: 'Comprehensive solution for large practices and health systems',
        features: [
          'Unlimited claims processing',
          'Real-time reporting',
          'Dedicated account manager',
          'API access',
          'Daily reconciliation',
          'Advanced denial management',
          'White-label patient portal',
          'Custom workflows',
          'Priority support'
        ]
      }
    },
    implementation: {
      timeline: '2-4 weeks',
      steps: [
        {
          title: 'Initial Assessment',
          description: 'Comprehensive review of current billing processes and system integration requirements',
          duration: '3-5 days'
        },
        {
          title: 'System Configuration',
          description: 'Custom setup of billing workflows, integrations, and user permissions',
          duration: '1 week'
        },
        {
          title: 'Staff Training',
          description: 'Comprehensive training for your team on new processes and system features',
          duration: '3-5 days'
        },
        {
          title: 'Go-Live & Monitoring',
          description: 'Launch new system with close monitoring and immediate support',
          duration: '1 week'
        }
      ]
    },
    caseStudies: [
      {
        client: 'Metro Family Practice',
        challenge: 'High claim denial rate (15%) and slow payment cycles affecting cash flow',
        solution: 'Implemented automated eligibility verification and intelligent claim scrubbing',
        results: [
          'Reduced denial rate to 2.1%',
          'Improved cash flow by 40%',
          'Decreased days in A/R from 45 to 28 days',
          'Eliminated manual claim reviews'
        ]
      }
    ],
    faqs: [
      {
        question: 'How long does implementation typically take?',
        answer: 'Most practices are fully operational within 2-4 weeks, depending on complexity and system integrations required.'
      },
      {
        question: 'Do you integrate with our existing EHR system?',
        answer: 'Yes, we integrate with 50+ popular EHR systems including Epic, Cerner, AllScripts, and Practice Fusion.'
      },
      {
        question: 'What kind of support do you provide?',
        answer: 'We offer 24/7 support with dedicated account managers, comprehensive training, and ongoing optimization services.'
      }
    ],
    metrics: {
      accuracy: '99.2%',
      efficiency: '75% faster',
      satisfaction: '98% client satisfaction'
    }
  },
  {
    id: 'compliance-assurance',
    title: 'Compliance Assurance',
    shortDescription: 'Stay compliant with the latest healthcare regulations including HIPAA, ICD-10, and billing standards.',
    fullDescription: 'Ensure your practice meets all regulatory requirements with our comprehensive compliance management system. Stay up-to-date with changing regulations, maintain audit trails, and protect patient data with enterprise-grade security.',
    icon: Shield,
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    benefits: [
      'HIPAA compliance monitoring',
      'Automated audit trail generation',
      'Regular compliance assessments',
      'Staff training programs',
      'Risk mitigation strategies',
      'Regulatory update notifications'
    ],
    features: [
      {
        name: 'HIPAA Compliance Management',
        description: 'Comprehensive HIPAA compliance monitoring and reporting',
        included: true
      },
      {
        name: 'Audit Trail Systems',
        description: 'Detailed logging of all system activities and data access',
        included: true
      },
      {
        name: 'Regulatory Updates',
        description: 'Automatic updates for changing healthcare regulations',
        included: true
      },
      {
        name: 'Risk Assessment Tools',
        description: 'Regular compliance risk assessments and recommendations',
        included: true
      },
      {
        name: 'Staff Training Modules',
        description: 'Ongoing compliance training for your team members',
        included: true
      },
      {
        name: 'Incident Response',
        description: '24/7 breach response and incident management support',
        included: true
      }
    ],
    pricing: {
      starter: {
        price: '$199/month',
        description: 'Essential compliance monitoring for small practices',
        features: [
          'Basic HIPAA compliance',
          'Monthly assessments',
          'Email alerts',
          'Standard training modules',
          'Incident reporting'
        ]
      },
      professional: {
        price: '$399/month',
        description: 'Advanced compliance management for growing practices',
        features: [
          'Comprehensive compliance suite',
          'Weekly assessments',
          'Real-time alerts',
          'Custom training programs',
          'Priority incident response',
          'Compliance dashboard',
          'Regulatory consultation'
        ]
      },
      enterprise: {
        price: 'Custom pricing',
        description: 'Enterprise-grade compliance for large organizations',
        features: [
          'Full compliance automation',
          'Daily monitoring',
          'Dedicated compliance officer',
          'Custom policy development',
          'Immediate incident response',
          'Advanced analytics',
          'Regulatory representation',
          'Multi-location support'
        ]
      }
    },
    implementation: {
      timeline: '1-3 weeks',
      steps: [
        {
          title: 'Compliance Audit',
          description: 'Comprehensive assessment of current compliance status and gaps',
          duration: '3-5 days'
        },
        {
          title: 'Policy Implementation',
          description: 'Development and implementation of required policies and procedures',
          duration: '1 week'
        },
        {
          title: 'System Configuration',
          description: 'Setup of monitoring systems and security controls',
          duration: '2-3 days'
        },
        {
          title: 'Staff Training',
          description: 'Compliance training for all staff members and ongoing education setup',
          duration: '2-3 days'
        }
      ]
    },
    caseStudies: [
      {
        client: 'Regional Health Network',
        challenge: 'Multiple compliance violations and failed HIPAA audit requiring immediate remediation',
        solution: 'Implemented comprehensive compliance management system with 24/7 monitoring',
        results: [
          'Achieved 100% HIPAA compliance within 30 days',
          'Passed subsequent audits with zero violations',
          'Reduced compliance-related incidents by 95%',
          'Established ongoing compliance monitoring'
        ]
      }
    ],
    faqs: [
      {
        question: 'What compliance standards do you cover?',
        answer: 'We cover HIPAA, HITECH, ICD-10/11, CPT, Medicare/Medicaid regulations, and state-specific healthcare compliance requirements.'
      },
      {
        question: 'How do you handle compliance violations?',
        answer: 'We provide immediate incident response, remediation guidance, and ongoing monitoring to prevent future violations.'
      },
      {
        question: 'Do you provide compliance training?',
        answer: 'Yes, we offer comprehensive staff training programs with regular updates and certification tracking.'
      }
    ],
    metrics: {
      accuracy: '100% compliance rate',
      efficiency: '90% fewer violations',
      satisfaction: '96% audit success rate'
    }
  },
  {
    id: 'dedicated-support',
    title: 'Dedicated Support Services',
    shortDescription: 'Expert support team available 24/7 to handle all your billing inquiries and provide personalized assistance.',
    fullDescription: 'Our dedicated support team consists of certified medical billing specialists, compliance experts, and technology professionals committed to your practice\'s success. Get personalized assistance, proactive account management, and expert guidance whenever you need it.',
    icon: Headphones,
    heroImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop',
    benefits: [
      '24/7 expert support availability',
      'Dedicated account managers',
      'Proactive issue resolution',
      'Personalized training programs',
      'Performance optimization',
      'Strategic billing consultation'
    ],
    features: [
      {
        name: '24/7 Expert Support',
        description: 'Round-the-clock access to certified billing specialists',
        included: true
      },
      {
        name: 'Dedicated Account Manager',
        description: 'Personal account manager who knows your practice intimately',
        included: true
      },
      {
        name: 'Proactive Monitoring',
        description: 'Continuous monitoring and proactive issue identification',
        included: true
      },
      {
        name: 'Performance Analytics',
        description: 'Regular performance reviews and optimization recommendations',
        included: true
      },
      {
        name: 'Custom Training',
        description: 'Tailored training programs for your specific needs',
        included: true
      },
      {
        name: 'Strategic Consulting',
        description: 'Expert guidance on billing strategy and optimization',
        included: true
      }
    ],
    pricing: {
      starter: {
        price: '$149/month',
        description: 'Essential support for independent practices',
        features: [
          'Business hours support',
          'Email and chat support',
          'Monthly check-ins',
          'Basic training resources',
          'Standard response times'
        ]
      },
      professional: {
        price: '$299/month',
        description: 'Enhanced support for growing practices',
        features: [
          '24/7 support access',
          'Phone, email, and chat',
          'Weekly check-ins',
          'Dedicated account manager',
          'Priority response times',
          'Custom training sessions',
          'Performance reviews'
        ]
      },
      enterprise: {
        price: 'Custom pricing',
        description: 'Premium support for large organizations',
        features: [
          '24/7 dedicated support team',
          'Multiple communication channels',
          'Daily monitoring',
          'Senior account management',
          'Immediate response guarantee',
          'On-site training available',
          'Strategic consulting',
          'Executive reporting'
        ]
      }
    },
    implementation: {
      timeline: '1 week',
      steps: [
        {
          title: 'Account Setup',
          description: 'Assignment of dedicated account manager and support team introduction',
          duration: '1 day'
        },
        {
          title: 'Needs Assessment',
          description: 'Comprehensive evaluation of support requirements and preferences',
          duration: '2 days'
        },
        {
          title: 'Support Configuration',
          description: 'Setup of support channels, escalation procedures, and monitoring systems',
          duration: '2 days'
        },
        {
          title: 'Team Training',
          description: 'Initial training session and establishment of ongoing support schedule',
          duration: '2 days'
        }
      ]
    },
    caseStudies: [
      {
        client: 'Coastal Medical Associates',
        challenge: 'Frequent billing issues causing staff frustration and revenue delays',
        solution: 'Assigned dedicated account manager with proactive monitoring and support',
        results: [
          'Reduced support tickets by 80%',
          'Improved staff satisfaction scores to 95%',
          'Eliminated billing-related revenue delays',
          'Achieved 99.8% system uptime'
        ]
      }
    ],
    faqs: [
      {
        question: 'What are your support hours?',
        answer: 'We offer 24/7 support for urgent issues, with business hours support for general inquiries. Response times vary by support tier.'
      },
      {
        question: 'How quickly do you respond to support requests?',
        answer: 'Response times range from immediate (Enterprise) to within 4 hours (Starter), depending on your support level and issue urgency.'
      },
      {
        question: 'Can you provide on-site support?',
        answer: 'Yes, we offer on-site support for Enterprise clients and can arrange on-site visits for other tiers when needed.'
      }
    ],
    metrics: {
      accuracy: '30-second avg response',
      efficiency: '99.8% uptime',
      satisfaction: '97% satisfaction rate'
    }
  }
];

/**
 * Animation variants
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

/**
 * Main service pages component
 */
export function ServicePages() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  if (selectedService) {
    const service = serviceDetails.find(s => s.id === selectedService);
    if (service) {
      return (
        <ServiceDetailPage 
          service={service} 
          onBack={() => setSelectedService(null)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      );
    }
  }

  return (
    <section className="py-32 bg-gradient-to-br from-royal-600 via-electric-600 to-neon-600 dark:from-royal-800 dark:via-electric-800 dark:to-neon-800 relative overflow-hidden animate-gradient-x">
      {/* Glassy Overlay */}
      <div className="absolute inset-0 bg-glass dark:bg-glass-dark backdrop-blur-2xl z-0" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
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
            <Settings className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 via-royal-400 to-neon-400 mb-6 animate-gradient-x drop-shadow-[0_4px_32px_rgba(139,92,246,0.45)]">
            Our <span className="text-white">Services</span>
          </h2>
          <p className="text-2xl text-white/90 max-w-4xl mx-auto font-semibold drop-shadow-[0_2px_16px_rgba(139,92,246,0.25)]">
            Comprehensive medical billing solutions tailored to your practice's unique needs and growth objectives.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {serviceDetails.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => setSelectedService(service.id)}
            />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-32 bg-card-glass dark:bg-card-glass backdrop-blur-2xl rounded-glass p-12 text-center border-2 border-electric-400 dark:border-electric-500 shadow-neon-purple"
        >
          <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-neon-400 mb-6 animate-gradient-x">
            Ready to Transform Your Billing?
          </h3>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto font-semibold">
            Let our experts analyze your current billing processes and recommend the perfect solution for your practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gradient-to-r from-magenta-500 to-royal-500 text-white px-8 py-4 rounded-glass font-extrabold shadow-neon-purple hover:shadow-neon-cyan transition-all duration-300 animate-gradient-x flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Schedule Consultation
            </button>
            <button className="bg-white/10 backdrop-blur-2xl border-2 border-electric-400 text-white hover:bg-white/20 rounded-glass px-8 py-4 font-extrabold transition-all duration-300 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Service Guide
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Service card component
 */
function ServiceCard({ service, onClick }: { service: ServiceDetail; onClick: () => void }) {
  const IconComponent = service.icon;
  
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className="bg-card-glass dark:bg-card-glass backdrop-blur-2xl rounded-glass p-8 shadow-neon-purple hover:shadow-neon-cyan transition-all duration-500 cursor-pointer group border-2 border-electric-400/50 dark:border-electric-500/50 hover:border-magenta-400 animate-float"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-royal-500 to-neon-500 rounded-glass flex items-center justify-center shadow-neon-purple">
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <ChevronRight className="w-6 h-6 text-white/60 group-hover:text-neon-400 group-hover:translate-x-1 transition-all" />
      </div>
      
      <h3 className="text-2xl font-extrabold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-magenta-400 group-hover:to-neon-400 transition-all duration-300">
        {service.title}
      </h3>
      
      <p className="text-white/80 mb-6 line-clamp-3 leading-relaxed">
        {service.shortDescription}
      </p>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="text-center bg-white/10 backdrop-blur-2xl rounded-glass p-3 border border-white/20">
          <div className="text-sm font-bold text-neon-400">
            {service.metrics.accuracy}
          </div>
          <div className="text-xs text-white/60">Accuracy</div>
        </div>
        <div className="text-center bg-white/10 backdrop-blur-2xl rounded-glass p-3 border border-white/20">
          <div className="text-sm font-bold text-electric-400">
            {service.metrics.efficiency}
          </div>
          <div className="text-xs text-white/60">Efficiency</div>
        </div>
        <div className="text-center bg-white/10 backdrop-blur-2xl rounded-glass p-3 border border-white/20">
          <div className="text-sm font-bold text-magenta-400">
            {service.metrics.satisfaction}
          </div>
          <div className="text-xs text-white/60">Satisfaction</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-white/70 font-medium">Top Rated Service</span>
        </div>
        <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-neon-400 transition-colors" />
      </div>
    </motion.div>
  );
}

/**
 * Detailed service page component
 */
function ServiceDetailPage({ service, onBack, activeTab, setActiveTab }: { 
  service: ServiceDetail; 
  onBack: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const IconComponent = service.icon;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-600 via-electric-600 to-neon-600 dark:from-royal-800 dark:via-electric-800 dark:to-neon-800 animate-gradient-x">
      {/* Glassy Overlay */}
      <div className="absolute inset-0 bg-glass dark:bg-glass-dark backdrop-blur-2xl z-0" />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <button
              onClick={onBack}
              className="mb-8 bg-white/10 backdrop-blur-2xl border-2 border-electric-400 text-white hover:bg-white/20 rounded-glass px-6 py-3 font-semibold transition-all duration-300"
            >
              ← Back to Services
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-magenta-500 to-royal-500 rounded-glass flex items-center justify-center shadow-neon-purple">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <div className="px-4 py-2 bg-white/20 backdrop-blur-2xl text-white rounded-full font-bold border border-white/30">
                    Premium Service
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-neon-400 mb-6 animate-gradient-x">
                  {service.title}
                </h1>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed font-medium">
                  {service.fullDescription}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-gradient-to-r from-magenta-500 to-royal-500 text-white px-8 py-4 rounded-glass font-extrabold shadow-neon-purple hover:shadow-neon-cyan transition-all duration-300 animate-gradient-x">
                    Get Started Today
                  </button>
                  <button className="bg-white/10 backdrop-blur-2xl border-2 border-electric-400 text-white hover:bg-white/20 rounded-glass px-8 py-4 font-extrabold transition-all duration-300 flex items-center justify-center gap-2">
                    <PlayCircle className="w-5 h-5" />
                    Watch Demo
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src={service.heroImage}
                  alt={service.title}
                  className="rounded-glass shadow-neon-purple w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Tabs */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            {/* Tab Navigation */}
            <div className="mb-12">
              <div className="flex flex-wrap gap-2 bg-card-glass backdrop-blur-2xl rounded-glass p-2 border-2 border-electric-400 shadow-neon-purple">
                {[
                  { key: 'overview', label: 'Overview' },
                  { key: 'features', label: 'Features' },
                  { key: 'pricing', label: 'Pricing' },
                  { key: 'implementation', label: 'Implementation' },
                  { key: 'support', label: 'Support' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-6 py-3 rounded-glass font-semibold transition-all duration-300 ${
                      activeTab === tab.key
                        ? 'bg-gradient-to-r from-magenta-500 to-royal-500 text-white shadow-neon-purple animate-gradient-x'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-card-glass backdrop-blur-2xl rounded-glass p-12 border-2 border-electric-400 shadow-neon-purple">
              {activeTab === 'overview' && <ServiceOverview service={service} />}
              {activeTab === 'features' && <ServiceFeatures service={service} />}
              {activeTab === 'pricing' && <ServicePricing service={service} />}
              {activeTab === 'implementation' && <ServiceImplementation service={service} />}
              {activeTab === 'support' && <ServiceSupport service={service} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Service overview tab component
 */
function ServiceOverview({ service }: { service: ServiceDetail }) {
  return (
    <div className="space-y-16">
      {/* Benefits Grid */}
      <div>
        <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-neon-400 mb-10 animate-gradient-x">Key Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-2xl rounded-glass p-6 border border-white/20 hover:border-magenta-400 transition-all duration-300"
            >
              <CheckCircle className="w-8 h-8 text-neon-400 mb-4" />
              <p className="text-white/90 leading-relaxed">{benefit}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Case Study */}
      {service.caseStudies.length > 0 && (
        <div>
          <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-neon-400 mb-10 animate-gradient-x">Success Story</h3>
          <div className="bg-white/10 backdrop-blur-2xl rounded-glass p-10 border border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h4 className="text-2xl font-extrabold text-white mb-6">
                  {service.caseStudies[0].client}
                </h4>
                <div className="space-y-6">
                  <div>
                    <h5 className="font-bold text-neon-400 mb-3 text-lg">Challenge</h5>
                    <p className="text-white/80 leading-relaxed">{service.caseStudies[0].challenge}</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-electric-400 mb-3 text-lg">Solution</h5>
                    <p className="text-white/80 leading-relaxed">{service.caseStudies[0].solution}</p>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-bold text-magenta-400 mb-6 text-lg">Results</h5>
                <ul className="space-y-3">
                  {service.caseStudies[0].results.map((result, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-neon-400 flex-shrink-0" />
                      <span className="text-white/90 font-medium">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Service features tab component
 */
function ServiceFeatures({ service }: { service: ServiceDetail }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {service.features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/10 backdrop-blur-2xl rounded-glass p-8 border border-white/20 hover:border-magenta-400 transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            <CheckCircle className={`w-6 h-6 mt-1 ${feature.included ? 'text-neon-400' : 'text-white/40'}`} />
            <div>
              <h4 className="font-extrabold text-white mb-3 text-lg">{feature.name}</h4>
              <p className="text-white/80 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Service pricing tab component
 */
function ServicePricing({ service }: { service: ServiceDetail }) {
  const plans = [
    { key: 'starter', name: 'Starter', popular: false },
    { key: 'professional', name: 'Professional', popular: true },
    { key: 'enterprise', name: 'Enterprise', popular: false }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan, index) => {
        const planData = service.pricing[plan.key as keyof typeof service.pricing];
        return (
          <motion.div
            key={plan.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-white/10 backdrop-blur-2xl rounded-glass p-8 border transition-all duration-300 ${
              plan.popular 
                ? 'border-magenta-400 ring-2 ring-magenta-400/20 shadow-neon-purple' 
                : 'border-white/20 hover:border-electric-400'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-magenta-500 to-royal-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-gradient-x">
                Most Popular
              </div>
            )}
            
            <div className="text-center mb-8">
              <h4 className="text-2xl font-extrabold text-white mb-4">{plan.name}</h4>
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-neon-400 mb-4 animate-gradient-x">
                {planData.price}
              </div>
              <p className="text-white/80 leading-relaxed">{planData.description}</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              {planData.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-neon-400 flex-shrink-0" />
                  <span className="text-white/90 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button className={`w-full py-4 rounded-glass font-extrabold transition-all duration-300 ${
              plan.popular
                ? 'bg-gradient-to-r from-magenta-500 to-royal-500 text-white shadow-neon-purple hover:shadow-neon-cyan animate-gradient-x'
                : 'bg-white/10 border-2 border-electric-400 text-white hover:bg-white/20'
            }`}>
              Get Started
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}

/**
 * Service implementation tab component
 */
function ServiceImplementation({ service }: { service: ServiceDetail }) {
  return (
    <div className="space-y-12">
      <div className="text-center mb-16">
        <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-neon-400 mb-6 animate-gradient-x">
          Implementation Timeline: {service.implementation.timeline}
        </h3>
        <p className="text-xl text-white/90 font-medium">
          Our proven implementation process ensures a smooth transition to your new billing system
        </p>
      </div>
      
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-magenta-500 via-royal-500 to-neon-500 animate-gradient-x"></div>
        
        {/* Steps */}
        <div className="space-y-16">
          {service.implementation.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative flex items-start gap-8"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-magenta-500 to-royal-500 rounded-full flex items-center justify-center text-white font-extrabold text-lg shadow-neon-purple animate-gradient-x">
                {index + 1}
              </div>
              
              <div className="bg-white/10 backdrop-blur-2xl rounded-glass p-8 border border-white/20 hover:border-magenta-400 transition-all duration-300 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-extrabold text-white">{step.title}</h4>
                  <div className="px-4 py-2 bg-neon-500/20 border border-neon-400 text-neon-400 rounded-full text-sm font-bold">
                    {step.duration}
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Service support tab component
 */
function ServiceSupport({ service }: { service: ServiceDetail }) {
  return (
    <div className="space-y-16">
      {/* FAQ Section */}
      <div>
        <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-neon-400 mb-10 animate-gradient-x">Frequently Asked Questions</h3>
        <div className="space-y-6">
          {service.faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-2xl rounded-glass p-8 border border-white/20 hover:border-magenta-400 transition-all duration-300"
            >
              <h4 className="font-extrabold text-white mb-4 text-lg">{faq.question}</h4>
              <p className="text-white/80 leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Contact CTA */}
      <div className="bg-white/10 backdrop-blur-2xl rounded-glass p-12 text-center border border-white/20">
        <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-neon-400 mb-6 animate-gradient-x">
          Still Have Questions?
        </h3>
        <p className="text-xl text-white/90 mb-8 font-medium">
          Our experts are here to help you choose the perfect solution for your practice
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="bg-gradient-to-r from-magenta-500 to-royal-500 text-white px-8 py-4 rounded-glass font-extrabold shadow-neon-purple hover:shadow-neon-cyan transition-all duration-300 animate-gradient-x">
            Schedule a Call
          </button>
          <button className="bg-white/10 backdrop-blur-2xl border-2 border-electric-400 text-white hover:bg-white/20 rounded-glass px-8 py-4 font-extrabold transition-all duration-300">
            Live Chat Support
          </button>
        </div>
      </div>
    </div>
  );
}
