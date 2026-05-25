import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in a parent directory confuses workspace-root inference.
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Shopify serves product imagery from its CDN.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    // Keep server action bodies generous for cart payloads.
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
