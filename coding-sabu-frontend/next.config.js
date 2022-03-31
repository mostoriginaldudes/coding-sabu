/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'production'
  },
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production'
  }
};

module.exports = nextConfig;
