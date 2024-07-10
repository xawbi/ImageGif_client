/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 500,
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: '10mb',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagegif.ru',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '176.109.100.227',
        pathname: '**',
      },
    ],
  }
}

module.exports = nextConfig
