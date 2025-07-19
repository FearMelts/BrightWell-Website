# 🏥 BrightWell Medical Billing Website

A modern, responsive website for BrightWell Medical Billing Services built with **Next.js 15.4.1**, **React 19.1.0**, **TypeScript 5.5+**, and **Tailwind CSS 4.1.11**. Features advanced animations with Framer Motion and optimized performance.

## 🤖 AI Assistant Guide

This README is designed to help AI assistants understand and work with this project effectively. The project is a **production-ready medical billing website** with comprehensive features and modern architecture.

### Current Project Status (July 18, 2025)

- ✅ **Fully Functional**: Website runs cleanly on `http://localhost:3000`
- ✅ **No Errors**: Clean compilation with no 404s or TypeScript errors
- ✅ **Production Ready**: 217 lines of professional medical billing content
- ✅ **Modern Stack**: Latest Next.js 15, React 19, TypeScript 5.5+
- ✅ **Animations**: Advanced Framer Motion 12.23.6 implementation

## ✨ Current Features

- **Latest Tech Stack**: Next.js 15.4.1 with App Router, React 19.1.0, TypeScript 5.5+
- **Advanced Animations**: Framer Motion 12.23.6 with optimized motion configurations
- **Professional Content**: Complete medical billing website with hero, features, testimonials
- **Responsive Design**: Mobile-first design with Tailwind CSS 4.1.11
- **Hero Section**: "Illuminate Your Medical Revenue" with animated statistics
- **Statistics Showcase**: 98% First-Pass Rate, 34% Revenue Increase, 60% Faster Collections
- **HIPAA Compliance**: Professional medical billing messaging
- **Testimonials**: Horizontal scrolling with gradient avatars (no image dependencies)
- **Performance Optimized**: Sharp image optimization, bundle analysis, and analytics
- **Type Safety**: Comprehensive TypeScript integration with strict configuration
- **Code Quality**: ESLint, Prettier, and automated formatting
- **Accessibility**: WCAG compliant with comprehensive a11y testing

## 🚀 Quick Start for AI Assistants

When helping with this project, follow these commands:

```bash
# 1. Navigate to project directory
cd c:\Users\Fe4rm\BrightWell-Website

# 2. Check current development server status
npm run dev
# Server runs on http://localhost:3000 or 3001

# 3. Build for production testing
npm run build

# 4. Check Git status for changes
git status

# 5. Common debugging commands
npm run lint          # Check for linting errors
Get-Content app/page.tsx | Measure-Object -Line  # Count lines in PowerShell
taskkill /f /im node.exe    # Stop all Node processes if needed
```

## 🎯 AI Assistant Instructions

### Key Project Context

- **Main file**: `app/page.tsx` (217 lines of comprehensive medical billing content)
- **Working directory**: `c:\Users\Fe4rm\BrightWell-Website`
- **Shell**: PowerShell (pwsh.exe) on Windows
- **Current status**: Fully functional with clean development server

### When Making Changes

1. **Always check current file contents** before editing
2. **Use absolute paths** in tool calls
3. **PowerShell commands** for Windows environment
4. **Preserve existing content** - this is a complete, working website
5. **Test changes** by checking dev server output

### Common Issues & Solutions

- **Import errors**: Remove `.tsx` extensions from imports
- **Missing images**: Use gradient avatars instead of image files
- **Port conflicts**: Next.js will auto-switch to available port
- **Multiple lock files**: Normal warning, can be ignored

### File Structure to Maintain

## 📁 Project Structure

```
brightwell-website/
├── app/                     # Next.js App Router
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/             # Reusable components
│   └── animations/         # Animation components
│       └── AnimatedButtons.tsx
├── lib/                    # Utilities and configurations
│   ├── data/               # Data organization
│   │   ├── features.ts     # Feature data
│   │   └── testimonials.ts # Testimonial data
│   └── motionConfig.ts     # Framer Motion configurations
├── types/                  # TypeScript type definitions
│   └── index.ts           # Centralized types
└── public/                # Static assets
```

## 🎨 Animation System

The project includes a comprehensive animation system built with Framer Motion:

### Motion Configurations

- **Spring Transitions**: Optimized spring animations with proper typing
- **Fade Variants**: Consistent fade in/out animations
- **Scale Variants**: Smooth scaling effects
- **Slide Variants**: Directional slide animations
- **Stagger Animations**: Coordinated list animations

### Usage Example

```tsx
import { fadeInVariants, springTransition } from '@/lib/motionConfig';
import { motion } from 'framer-motion';

<motion.div
  variants={fadeInVariants}
  initial="hidden"
  animate="visible"
  transition={springTransition}
>
  Content
</motion.div>;
```

## 🛠 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint with auto-fix
npm run check-lint   # Check linting without fixing
npm run format       # Format code with Prettier
npm run clear-cache  # Clear npm cache
```

## 📦 Dependencies

### Core Framework

- **Next.js 14.2.0**: React framework with App Router
- **React 18.3.0**: Latest React with concurrent features
- **TypeScript 5.0+**: Type-safe development

### Styling & Animation

- **Tailwind CSS 3.4.0**: Utility-first CSS framework
- **Framer Motion 11.18.2**: Advanced animation library
- **PostCSS 8.4.40**: CSS processing

### Performance & Analytics

- **Sharp 0.33.2**: High-performance image processing
- **@next/bundle-analyzer**: Bundle size analysis
- **@vercel/analytics**: Performance analytics

### Code Quality

- **ESLint 8.57.0**: Code linting with flat config
- **Prettier 3.3.0**: Code formatting
- **React a11y plugins**: Accessibility linting

## 🔧 Configuration

### TypeScript Configuration

Enhanced path mapping for better imports:

```json
{
  "paths": {
    "@/*": ["./*"],
    "@/components/*": ["./components/*"],
    "@/lib/*": ["./lib/*"],
    "@/types/*": ["./types/*"]
  }
}
```

### ESLint Configuration

Modern flat config format with comprehensive rules:

- React 18+ optimizations
- TypeScript integration
- Accessibility checks
- Tailwind CSS support

## 🎯 Type System

Centralized type definitions in `/types/index.ts`:

```typescript
export interface Feature {
  title: string;
  description: string;
  image: string;
  icon?: React.ReactNode;
}

export interface Testimonial {
  name: string;
  quote: string;
  image: string;
  position?: string;
  company?: string;
}
```

## 🚀 Deployment

The project is optimized for deployment on Vercel:

```bash
# Build and deploy
npm run build
```

## 📈 Performance Features

- **Image Optimization**: Sharp for Next.js image processing
- **Bundle Analysis**: Built-in bundle size monitoring
- **Analytics Integration**: Performance tracking
- **Code Splitting**: Automatic route-based splitting
- **Static Generation**: Optimized build output

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and formatting
5. Submit a pull request

## 📄 License

This project is proprietary to BrightWell Medical Billing Services.

---

Built with ❤️ using Next.js, React, and TypeScript
