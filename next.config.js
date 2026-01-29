/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.zelenka.guru',
      },
      {
        protocol: 'https',
        hostname: '**.lzt.market',
      }
    ],
  },
}

module.exports = nextConfig
