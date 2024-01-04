/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sarpinos.mysites.io',
      },
    ],
  },
  }

module.exports = nextConfig
