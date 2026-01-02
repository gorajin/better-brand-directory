import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow any external images (Brandfetch uses various CDNs)
      },
    ],
  },
};

export default nextConfig;
