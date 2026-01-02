import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Logo services
      { protocol: 'https', hostname: 'logo.clearbit.com' },
      { protocol: 'https', hostname: 'cdn.brandfetch.io' },
      { protocol: 'https', hostname: 'asset.brandfetch.io' },
      // Supabase storage (for user uploads)
      { protocol: 'https', hostname: '*.supabase.co' },
      // Fallback for other CDNs
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
