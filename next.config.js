/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['loremflickr.com', 'https:/loremflickr.com'],
  },
};

module.exports = nextConfig;