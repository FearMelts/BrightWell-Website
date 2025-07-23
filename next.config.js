/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Ultimate Production Optimizations
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  // Advanced experimental features
  experimental: {
    optimizePackageImports: ['framer-motion'],
    optimizeCss: true,
    scrollRestoration: true,
    gzipSize: true,
    craCompat: false,
    esmExternals: true,
    turbotrace: {
      logLevel: 'error',
      logDetail: true,
      memoryLimit: 1024,
    },
  },

  // Ultimate bundle optimization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Production optimizations only
    if (!dev) {
      // Ultimate compression and minification
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 100000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              chunks: 'all',
              priority: 15,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      };

      // Tree shaking improvements
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;

      // Performance monitoring webpack plugin
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.ULTIMATE_PERFORMANCE': JSON.stringify(true),
          'process.env.BUILD_ID': JSON.stringify(buildId),
          'process.env.DEPLOYMENT_TIME': JSON.stringify(Date.now()),
        })
      );
    }

    return config;
  },

  // Ultimate image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 24 hours
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Ultimate headers for performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Ultimate redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Ultimate output configuration
  output: 'standalone',
  trailingSlash: false,

  // Ultimate TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // Ultimate ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Performance budgets
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Ultimate environment variables
  env: {
    ULTIMATE_OPTIMIZATION: 'true',
    FRAMER_MOTION_LAZY: 'true',
    PERFORMANCE_MONITORING: 'true',
  },
};

module.exports = nextConfig;
