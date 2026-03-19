import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['jspdf', 'fflate'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig