/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/koti',
        permanent: true, // This indicates it's a 301 redirect
      },
    ];
  },
};

export default nextConfig;
