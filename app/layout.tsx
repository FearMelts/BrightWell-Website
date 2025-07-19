import SEOEnhancer from '@/components/SEOEnhancer';
import { ThemeProvider } from '@/components/ThemeProvider';
import Analytics from '@/lib/analytics';
import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import ClientLayout from './ClientLayout';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BrightWell Medical Billing - Illuminate Your Medical Revenue',
  description:
    'Transform your medical billing with cutting-edge solutions. Experience unprecedented accuracy, lightning-fast processing, and maximum revenue recovery with BrightWell.',
  keywords: [
    'medical billing',
    'healthcare billing',
    'revenue cycle management',
    'medical coding',
    'claims processing',
    'HIPAA compliance',
  ],
  authors: [{ name: 'BrightWell Systems' }],
  creator: 'BrightWell Systems',
  publisher: 'BrightWell Systems',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://brightwell-medical.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'BrightWell Medical Billing - Illuminate Your Medical Revenue',
    description:
      'Transform your medical billing with cutting-edge solutions. 98% First-Pass Rate, 34% Revenue Increase, 60% Faster Collections.',
    url: 'https://brightwell-medical.com',
    siteName: 'BrightWell Medical Billing',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BrightWell Medical Billing - Professional Healthcare Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrightWell Medical Billing - Illuminate Your Medical Revenue',
    description:
      'Transform your medical billing with cutting-edge solutions. 98% First-Pass Rate, 34% Revenue Increase.',
    images: ['/twitter-image.png'],
    creator: '@brightwellmed',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <SEOEnhancer />
          <Analytics />
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
