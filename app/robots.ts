import { seoConfig } from '@/lib/seoConfig';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/api/'],
    },
    sitemap: `${seoConfig.url}/sitemap.xml`,
  };
}
