## yarn-error.log\*

# BrightWell Website — Project Summary

## Project Structure

```
brightwell-website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── animations/
│       └── AnimatedButtons.tsx
├── lib/
│   └── motionConfig.ts
├── public/
├── package.json
├── package-lock.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── .gitignore
├── README.md
├── Website Guidelines.pdf
├── eslint.config.js
├── index.d.ts
└── project-summary.md
```

## Key Configuration Files

### package.json (excerpt)

```json
{
  "name": "brightwell-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "npx eslint . --fix",
    "format": "prettier --write ."
  },
  "dependencies": {
    "react": "^19.3.0",
    "react-dom": "^19.3.0",
    "next": "^15.4.2",
    "framer-motion": "^12.25.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@tailwindcss/postcss": "^4.2.0",
    "tailwindcss": "^4.1.0",
    "eslint": "^9.33.0",
    "@eslint/js": "^9.0.0",
    "eslint-plugin-react": "^7.36.0",
    "eslint-plugin-react-hooks": "^5.5.0",
    "eslint-plugin-jsx-a11y": "^7.1.0",
    "@typescript-eslint/eslint-plugin": "^7.8.0",
    "@typescript-eslint/parser": "^7.8.0",
    "eslint-config-prettier": "^9.2.0",
    "eslint-plugin-unused-imports": "^3.4.0",
    "eslint-plugin-tailwindcss": "^4.3.0",
    "prettier": "^3.3.0",
    "prettier-plugin-tailwindcss": "^0.7.0",
    "prettier-plugin-organize-imports": "^4.1.0"
  }
}
```

### tsconfig.json (excerpt)

```jsonc
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "forceConsistentCasingInFileNames": true,
    "allowImportingTsExtensions": false,
    "verbatimModuleSyntax": false,
    "plugins": [
      { "name": "next" },
      { "name": "@typescript-eslint/ts-plugin" },
      { "name": "typescript-plugin-css-modules" },
    ],
    "paths": {
      "@/*": ["./*"],
    },
    "baseUrl": ".",
    "types": ["node"],
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "dist", "build", ".next"],
}
```

### eslint.config.js (excerpt)

```js
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules', '.next', 'dist', 'build'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      'unused-imports': 'eslint-plugin-unused-imports',
      tailwindcss: 'eslint-plugin-tailwindcss',
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/no-contradicting-classname': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      'unused-imports': 'eslint-plugin-unused-imports',
      tailwindcss: 'eslint-plugin-tailwindcss',
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/no-contradicting-classname': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  prettier,
];
```

## Main Source Files

### app/layout.tsx

```tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
```

### app/page.tsx (excerpt)

```tsx
'use client';
import AnimatedButton from '@/components/animations/AnimatedButtons';
import { motion } from 'framer-motion';

/**
 * Animation configuration reused across motion components.
 * The cubic-bezier curve provides a natural easing for UI transitions.
 */
const transitionConfig = { duration: 0.8, ease: [0.4, 0, 0.2, 1] } as const;

/** Basic types for data-driven sections */
interface Feature {
  title: string;
  description: string;
  image: string;
}

interface Testimonial {
  name: string;
  quote: string;
  image: string;
}

/** Data for the feature grid */
const features: Feature[] = [
  {
    title: 'Streamlined Billing',
    description: 'Efficient processes to ensure timely and accurate billing.',
    image: '/static/images/feature-billing.jpg',
  },
  {
    title: 'Compliance Assurance',
    description: 'Stay compliant with the latest healthcare regulations.',
    image: '/static/images/feature-compliance.jpg',
  },
  {
    title: 'Dedicated Support',
    description: 'Expert support to handle all your billing inquiries.',
    image: '/static/images/feature-support.jpg',
  },
];

/** Client testimonials displayed in a scrollable list */
const testimonials: Testimonial[] = [
  {
    name: 'Dr. Emily Carter',
    quote: 'BrightWell has transformed our billing process, making it seamless and stress-free.',
    image: 'https://source.unsplash.com/100x100/?portrait,doctor',
  },
  {
    name: 'Clinic Manager, NY',
    quote: 'Our claims are processed faster and with greater accuracy thanks to BrightWell.',
    image: 'https://source.unsplash.com/100x100/?portrait,manager',
  },
  {
    name: 'Healthcare Provider, TX',
    quote: 'The support team is always ready to assist with any billing issues we encounter.',
    image: 'https://source.unsplash.com/100x100/?portrait,provider',
  },
];

/**
 * Individual card for a feature item.
 * Extracted for readability and reusability.
 */
const FeatureCard = ({ feature, delay = 0 }: { feature: Feature; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ ...transitionConfig, delay }}
    className="flex flex-col items-center text-center bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-500"
    whileHover={{ scale: 1.03 }}
  >
    <img
      src={feature.image}
      alt={feature.title}
      loading="lazy"
      className="rounded-xl object-cover w-full h-60 mb-6 transition-transform duration-500 hover:scale-105"
    />
    <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
    <p className="text-gray-600">{feature.description}</p>
  </motion.div>
);

/** Visual card representing a testimonial */
const TestimonialCard = ({
  testimonial,
  delay = 0,
}: {
  testimonial: Testimonial;
  delay?: number;
}) => (
  <motion.div
    className="min-w-[300px] snap-center flex-shrink-0 bg-gray-50 rounded-2xl shadow-lg p-6 text-center"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ ...transitionConfig, delay }}
  >
    <img
      src={testimonial.image}
      alt={testimonial.name}
      loading="lazy"
      className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
    />
    <p className="text-gray-600 italic mb-2">&ldquo;{testimonial.quote}&rdquo;</p>
    <p className="font-medium text-gray-900">{testimonial.name}</p>
  </motion.div>
);

export default function UltraPage() {
  return (
    <>
      <main className="flex flex-col bg-gradient-to-b from-white to-gray-50 text-gray-800 font-sans">
        {/* </ParallaxHero> */}

        <section className="relative h-screen flex flex-col justify-center items-center text-center bg-cover bg-center hero-bg">
          {/* Removed inline style */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
          {/* Keep this overlay BEFORE content to blur background only */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="text-6xl font-bold text-gray-900 tracking-tight"
            >
              Reliable Medical Billing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
              className="mt-6 max-w-xl text-lg text-gray-600"
            >
              Streamline your practice’s billing process with our expert solutions.
            </motion.p>
            <AnimatedButton
              label="Get Started"
              aria-label="Get started with BrightWell"
              className="mt-8"
            />
          </div>
        </section>
        {/* </ParallaxHero>  */}

        <section className="py-24 px-4 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, idx) => (
            <FeatureCard key={feature.title} feature={feature} delay={idx * 0.2} />
          ))}
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-white">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={transitionConfig}
            className="text-4xl font-bold text-center mb-12"
          >
            What Our Clients Say
          </motion.h2>
          <div className="flex overflow-x-scroll gap-8 px-4 md:px-16 snap-x">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} delay={idx * 0.2} />
            ))}
          </div>
        </section>

        {/* Call To Action */}
        <section className="py-24 px-4 md:px-16 text-center bg-gray-50">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={transitionConfig}
            className="text-4xl font-bold mb-4"
          >
            Ready to Optimize Your Billing?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ ...transitionConfig, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-8 text-gray-600"
          >
            Join countless healthcare providers who trust us with their billing needs.
          </motion.p>
          <AnimatedButton
            className="relative mt-8 bg-blue-600 text-white px-8 py-4 rounded-full font-medium shadow-lg transition-transform hover:scale-105"
            label="Get Started"
          />
        </section>
      </main>
    </>
  );
}
```

### app/globals.css

```css
@import 'tailwindcss';

:root {
  --background: #ffffff;
  --foreground: #171717;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
```

## Assets in public/

There are currently **no assets** in your `public/` folder.

## Documentation & Guidelines

- README.md
- Website Guidelines.pdf

## Tech Stack

- Next.js 15.4.2 (App Router)
- React 19.3.0
- TypeScript 5.5.0
- Tailwind CSS 4.1.0
- Framer Motion 12.25.0
- ESLint 9.33.0 (Flat config, automated)
- Prettier 3.3.0 (with Tailwind plugin)
- Turbopack

---

You can share this file with your GPT assistant to give a complete, detailed overview of your VS Code project, including all config, source, asset, and environment details.
