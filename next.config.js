/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sarpinos.mysites.io',
      },
    ],
  },
  }

module.exports = nextConfig
