/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: '10mb',
    appDir: true,
  },
  images: {
    domains: ['localhost', 'http://imagegif.ru', 'https://imagegif.ru']
  }
}

module.exports = nextConfig
