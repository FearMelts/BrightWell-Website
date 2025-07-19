// SEO Configuration for BrightWell Medical Billing
export const seoConfig = {
  title: 'BrightWell Medical Billing - Illuminate Your Revenue',
  description:
    'Transform your medical billing with cutting-edge solutions. Experience 98% first-pass rates, 34% revenue increase, and 60% faster collections.',
  keywords: [
    'medical billing',
    'healthcare revenue cycle',
    'medical coding',
    'practice management',
    'healthcare billing software',
    'medical claims processing',
    'revenue cycle management',
    'healthcare analytics',
    'medical practice automation',
    'billing compliance',
    'healthcare technology',
    'medical billing services',
  ],
  author: 'BrightWell Solutions',
  company: 'BrightWell Medical Billing',
  url: 'https://brightwell-medical.com',
  image: 'https://brightwell-medical.com/og-image.jpg',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BrightWell Medical Billing',
    description:
      'Leading provider of medical billing and revenue cycle management solutions for healthcare providers',
    url: 'https://brightwell-medical.com',
    logo: 'https://brightwell-medical.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-BRIGHT-1',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Healthcare Blvd',
      addressLocality: 'Medical City',
      addressRegion: 'TX',
      postalCode: '75230',
      addressCountry: 'US',
    },
    foundingDate: '2020',
    industry: 'Healthcare Technology',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 50,
      maxValue: 200,
    },
    sameAs: [
      'https://www.linkedin.com/company/brightwell-medical',
      'https://twitter.com/brightwellmed',
      'https://www.facebook.com/brightwellmedical',
    ],
  },
  services: [
    {
      '@type': 'Service',
      name: 'Medical Billing Services',
      description: 'Comprehensive medical billing solutions with 98% first-pass rate',
      provider: {
        '@type': 'Organization',
        name: 'BrightWell Medical Billing',
      },
    },
    {
      '@type': 'Service',
      name: 'Revenue Cycle Management',
      description: 'End-to-end revenue cycle optimization increasing collections by 34%',
      provider: {
        '@type': 'Organization',
        name: 'BrightWell Medical Billing',
      },
    },
    {
      '@type': 'Service',
      name: 'Medical Coding',
      description: 'Expert medical coding services ensuring compliance and accuracy',
      provider: {
        '@type': 'Organization',
        name: 'BrightWell Medical Billing',
      },
    },
  ],
  breadcrumbs: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://brightwell-medical.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://brightwell-medical.com/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'About',
        item: 'https://brightwell-medical.com/about',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Contact',
        item: 'https://brightwell-medical.com/contact',
      },
    ],
  },
};

export const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is BrightWell Medical Billing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BrightWell Medical Billing is a comprehensive medical billing and revenue cycle management solution that helps healthcare providers optimize their billing processes, increase collections, and reduce administrative burden.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can BrightWell improve my practice revenue?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our advanced billing solutions achieve a 98% first-pass rate, resulting in an average 34% increase in revenue and 60% faster collections for our clients.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is BrightWell HIPAA compliant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, BrightWell is fully HIPAA compliant and implements industry-leading security measures to protect patient data and ensure regulatory compliance.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does implementation take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Implementation typically takes 2-4 weeks, including data migration, staff training, and system testing to ensure a smooth transition.',
      },
    },
  ],
};

export const localBusinessData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://brightwell-medical.com',
  name: 'BrightWell Medical Billing',
  image: 'https://brightwell-medical.com/logo.png',
  description: 'Professional medical billing and revenue cycle management services',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Healthcare Blvd',
    addressLocality: 'Medical City',
    addressRegion: 'TX',
    postalCode: '75230',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 32.7767,
    longitude: -96.797,
  },
  url: 'https://brightwell-medical.com',
  telephone: '+1-800-BRIGHT-1',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
  },
};
