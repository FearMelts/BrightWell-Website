/**
 * Individual service detail pages component with comprehensive information
 * Features detailed service descriptions, pricing, benefits, and implementation guides
 */
'use client';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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
    heroImage: 'https://pub-cdn.sider.ai/u/U05XH919WYG/web-coder/687b5cca00bcf77ebb7774ef/resource/4d477f27-4582-4137-98ef-10986c37bf91.jpg',
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
    heroImage: 'https://pub-cdn.sider.ai/u/U05XH919WYG/web-coder/687b5cca00bcf77ebb7774ef/resource/61d8c221-7bab-4330-b160-d9f121aeada0.jpg',
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
    heroImage: 'https://pub-cdn.sider.ai/u/U05XH919WYG/web-coder/687b5cca00bcf77ebb7774ef/resource/8bb35300-2601-4cb1-9cfe-1040d2b6c31a.jpg',
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
        />
      );
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-white via-slate-50 to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950/30 transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4">
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
            className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Settings className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-teal-600 to-blue-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive medical billing solutions tailored to your practice's unique needs and growth objectives.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
          className="mt-20 text-center bg-gradient-to-r from-green-500 via-teal-600 to-blue-600 rounded-3xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Billing?</h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Let our experts analyze your current billing processes and recommend the perfect solution for your practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-green-600 hover:bg-gray-100 rounded-xl px-8 py-3 font-semibold">
              <Phone className="w-5 h-5 mr-2" />
              Schedule Consultation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-xl px-8 py-3 font-semibold bg-transparent">
              <Download className="w-5 h-5 mr-2" />
              Download Service Guide
            </Button>
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
      className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-slate-200 dark:border-slate-700"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center">
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-green-600 transition-colors">
        {service.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
        {service.shortDescription}
      </p>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="text-center bg-green-50 dark:bg-green-900/30 rounded-lg p-3">
          <div className="text-sm font-bold text-green-600 dark:text-green-400">
            {service.metrics.accuracy}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy</div>
        </div>
        <div className="text-center bg-teal-50 dark:bg-teal-900/30 rounded-lg p-3">
          <div className="text-sm font-bold text-teal-600 dark:text-teal-400">
            {service.metrics.efficiency}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Efficiency</div>
        </div>
        <div className="text-center bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
          <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {service.metrics.satisfaction}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Satisfaction</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Top Rated Service</span>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
      </div>
    </motion.div>
  );
}

/**
 * Detailed service page component
 */
function ServiceDetailPage({ service, onBack }: { service: ServiceDetail; onBack: () => void }) {
  const IconComponent = service.icon;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950/30">
      {/* Hero Section */}
      <div className="relative py-24 bg-gradient-to-r from-green-500 via-teal-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-8 border-white/30 text-white hover:bg-white/10 bg-transparent"
          >
            ← Back to Services
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                <Badge className="bg-white/20 text-white">Premium Service</Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {service.title}
              </h1>
              
              <p className="text-xl opacity-90 mb-8">
                {service.fullDescription}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-green-600 hover:bg-gray-100 rounded-xl px-8 py-3 font-semibold">
                  Get Started Today
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent rounded-xl px-8 py-3 font-semibold">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={service.heroImage}
                alt={service.title}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Tabs */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white dark:bg-slate-800 rounded-xl p-2 shadow-lg">
              <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
              <TabsTrigger value="features" className="rounded-lg">Features</TabsTrigger>
              <TabsTrigger value="pricing" className="rounded-lg">Pricing</TabsTrigger>
              <TabsTrigger value="implementation" className="rounded-lg">Implementation</TabsTrigger>
              <TabsTrigger value="support" className="rounded-lg">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <ServiceOverview service={service} />
            </TabsContent>

            <TabsContent value="features">
              <ServiceFeatures service={service} />
            </TabsContent>

            <TabsContent value="pricing">
              <ServicePricing service={service} />
            </TabsContent>

            <TabsContent value="implementation">
              <ServiceImplementation service={service} />
            </TabsContent>

            <TabsContent value="support">
              <ServiceSupport service={service} />
            </TabsContent>
          </Tabs>
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
    <div className="space-y-12">
      {/* Benefits Grid */}
      <div>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Key Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
              <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Case Study */}
      {service.caseStudies.length > 0 && (
        <div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Success Story</h3>
          <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {service.caseStudies[0].client}
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Challenge</h5>
                    <p className="text-gray-600 dark:text-gray-400">{service.caseStudies[0].challenge}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Solution</h5>
                    <p className="text-gray-600 dark:text-gray-400">{service.caseStudies[0].solution}</p>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Results</h5>
                <ul className="space-y-2">
                  {service.caseStudies[0].results.map((result, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{result}</span>
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
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-start gap-4">
            <CheckCircle className={`w-6 h-6 mt-1 ${feature.included ? 'text-green-500' : 'text-gray-400'}`} />
            <div>
              <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{feature.name}</h4>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
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
            className={`relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border ${
              plan.popular 
                ? 'border-green-500 ring-2 ring-green-500/20' 
                : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500">
                Most Popular
              </Badge>
            )}
            
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{plan.name}</h4>
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {planData.price}
              </div>
              <p className="text-gray-600 dark:text-gray-400">{planData.description}</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              {planData.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button className={`w-full rounded-xl ${
              plan.popular
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-gray-100'
            }`}>
              Get Started
            </Button>
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
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Implementation Timeline: {service.implementation.timeline}
        </h3>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Our proven implementation process ensures a smooth transition to your new billing system
        </p>
      </div>
      
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-teal-600"></div>
        
        {/* Steps */}
        <div className="space-y-12">
          {service.implementation.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative flex items-start gap-8"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {index + 1}
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">{step.title}</h4>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {step.duration}
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
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
    <div className="space-y-12">
      {/* FAQ Section */}
      <div>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Frequently Asked Questions</h3>
        <div className="space-y-6">
          {service.faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3">{faq.question}</h4>
              <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-green-500 via-teal-600 to-blue-600 rounded-2xl p-8 text-center text-white">
        <h3 className="text-3xl font-bold mb-4">Still Have Questions?</h3>
        <p className="text-xl opacity-90 mb-6">
          Our experts are here to help you choose the perfect solution for your practice
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white text-green-600 hover:bg-gray-100 rounded-xl px-8 py-3 font-semibold">
            Schedule a Call
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent rounded-xl px-8 py-3 font-semibold">
            Live Chat Support
          </Button>
        </div>
      </div>
    </div>
  );
}