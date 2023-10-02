/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: '10mb'
  },
  images: {
    domains: ['localhost'] // Добавьте здесь домены, на которых находятся ваши изображения
  }
}

module.exports = nextConfig
