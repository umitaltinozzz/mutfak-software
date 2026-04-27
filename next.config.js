/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // Docker için standalone output
  output: 'standalone',
  // appDir is no longer needed in Next.js 14 - it's the default
}

module.exports = nextConfig 