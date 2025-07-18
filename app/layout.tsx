import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BrightWell Medical Billing | Streamline Your Practice',
  description:
    'Professional medical billing services for healthcare providers. Streamline your practice with our expert solutions, compliance assurance, and dedicated support.',
  keywords:
    'medical billing, healthcare billing, practice management, billing services, medical coding',
  authors: [{ name: 'BrightWell Systems' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'BrightWell Medical Billing | Streamline Your Practice',
    description: 'Professional medical billing services for healthcare providers.',
    type: 'website',
    locale: 'en_US',
  },
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },
  ],
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Remove icon links, handled by metadata */}
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
