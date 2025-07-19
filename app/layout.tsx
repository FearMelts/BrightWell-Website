import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'BrightWell Medical Billing | Streamlined Healthcare Revenue Cycle',
    template: '%s | BrightWell Medical Billing',
  },
  description:
    'Professional medical billing services with 99% accuracy. Streamline your healthcare practice revenue cycle with our expert billing solutions.',
  keywords: [
    'medical billing',
    'healthcare',
    'revenue cycle',
    'claims processing',
    'practice management',
  ],
  authors: [{ name: 'BrightWell Systems' }],
  creator: 'BrightWell Systems',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brightwell.com',
    title: 'BrightWell Medical Billing | Streamlined Healthcare Revenue Cycle',
    description: 'Professional medical billing services with 99% accuracy.',
    siteName: 'BrightWell Medical Billing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrightWell Medical Billing',
    description: 'Professional medical billing services with 99% accuracy.',
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
