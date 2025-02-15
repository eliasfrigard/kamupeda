/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "assets.ctfassets.net",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/etusivu",
        permanent: true, // This indicates it's a 301 redirect
      },
    ];
  },
};

export default nextConfig;
