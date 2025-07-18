/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  // Explicitly set the app directory
  appDir: true,
};

module.exports = nextConfig;
