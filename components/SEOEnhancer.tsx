'use client';

import { faqData, localBusinessData, seoConfig } from '@/lib/seoConfig';

export default function SEOEnhancer() {
  return (
    <>
      {/* Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seoConfig.structuredData),
        }}
      />

      {/* Services Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: seoConfig.services.map((service, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: service,
            })),
          }),
        }}
      />

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqData),
        }}
      />

      {/* Local Business Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessData),
        }}
      />

      {/* Breadcrumbs Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seoConfig.breadcrumbs),
        }}
      />

      {/* Website Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: seoConfig.title,
            url: seoConfig.url,
            description: seoConfig.description,
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${seoConfig.url}/search?q={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      {/* WebPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: seoConfig.title,
            description: seoConfig.description,
            url: seoConfig.url,
            inLanguage: 'en-US',
            isPartOf: {
              '@type': 'WebSite',
              name: seoConfig.company,
              url: seoConfig.url,
            },
            about: {
              '@type': 'Thing',
              name: 'Medical Billing Services',
              description: 'Professional medical billing and revenue cycle management solutions',
            },
            mainEntity: {
              '@type': 'Organization',
              name: seoConfig.company,
            },
          }),
        }}
      />
    </>
  );
}
