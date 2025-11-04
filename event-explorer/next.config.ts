/** @type {import('next').NextConfig} */
const nextConfig = {
 
  images: {
    domains: [
      "s1.ticketm.net",           // Ticketmaster main
      "media.ticketmaster.com",   // Ticketmaster CDN
      "images.universe.com",      // Universe (partner platform)
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

