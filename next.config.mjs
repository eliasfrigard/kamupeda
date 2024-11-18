/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net', 'assets.ctfassets.net'],
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
