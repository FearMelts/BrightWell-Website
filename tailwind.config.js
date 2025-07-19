/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        // Purple Gradient Vision Palette
        royal: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        electric: {
          50: '#f0f7ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        neon: {
          50: '#f0fcff',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        magenta: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        glass: {
          DEFAULT: 'rgba(255,255,255,0.15)',
          dark: 'rgba(36, 0, 70, 0.25)',
        },
        // Accent and legacy
        accent: {
          500: '#ec4899',
        },
      },
      backgroundImage: {
        'hero-purple': 'linear-gradient(120deg, #4c1d95 0%, #8b5cf6 50%, #06b6d4 100%)',
        'hero-electric': 'linear-gradient(120deg, #7c3aed 0%, #6366f1 50%, #06b6d4 100%)',
        'card-glass':
          'linear-gradient(120deg, rgba(76,29,149,0.7) 0%, rgba(139,92,246,0.5) 50%, rgba(6,182,212,0.4) 100%)',
        'stats-gradient': 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
        'cta-gradient': 'linear-gradient(90deg, #a21caf 0%, #8b5cf6 50%, #06b6d4 100%)',
      },
      boxShadow: {
        'neon-purple': '0 4px 32px 0 rgba(139,92,246,0.45)',
        'neon-cyan': '0 4px 32px 0 rgba(6,182,212,0.35)',
        glass: '0 8px 32px 0 rgba(76,29,149,0.18)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'gradient-x': 'gradientX 6s ease-in-out infinite',
        'gradient-y': 'gradientY 8s ease-in-out infinite',
        'particle-float': 'particleFloat 12s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientY: {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
        },
        particleFloat: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '25%': { transform: 'translateY(-20px) scale(1.1)' },
          '50%': { transform: 'translateY(0) scale(1)' },
          '75%': { transform: 'translateY(20px) scale(0.9)' },
          '100%': { transform: 'translateY(0) scale(1)' },
        },
      },
      blur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      borderRadius: {
        glass: '2rem',
      },
    },
  },
  plugins: [],
};
