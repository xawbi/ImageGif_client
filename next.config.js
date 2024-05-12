/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: '10mb',
    appDir: true,
  },
  images: {
    domains: ['localhost', 'imagegif.ru'],
  }
}

module.exports = nextConfig
