/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s1.ticketm.net", // Ticketmaster main
      },
      {
        protocol: "https",
        hostname: "media.ticketmaster.com", // Ticketmaster CDN
      },
      {
        protocol: "https",
        hostname: "images.universe.com", // Universe (partner platform)
      },
    ],
  },


  async rewrites() {
    return [
      {
        source: "/api/events/:path*",
        destination: "http://localhost:5080/api/events/:path*", // Backend API
      },
    ];
  },
};

module.exports = nextConfig;
