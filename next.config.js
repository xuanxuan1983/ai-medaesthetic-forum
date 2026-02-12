/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
    domains: ['api.second.me', 'storage.second.me'],
  },
  trailingSlash: true,
}

module.exports = nextConfig
