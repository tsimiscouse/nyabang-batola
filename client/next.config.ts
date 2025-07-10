/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost', 'upxxoqbrqccuyhffmxvm.supabase.co', 'lh3.googleusercontent.com'],
    formats: ['image/webp', 'image/avif'],
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig