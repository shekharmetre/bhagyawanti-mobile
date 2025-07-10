/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'pagedone.io',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/bun/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`, // Use env value
      },
    ];
  }
};

export default nextConfig;
