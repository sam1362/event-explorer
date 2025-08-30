/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/events/:path*",
        destination: "http://localhost:5080/api/events/:path*", // Backend
      },
    ];
  },
};

module.exports = nextConfig;
