/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com', 'cdn.pixabay.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable compression
  compress: true,
  // Generate ETags for caching
  generateEtags: true,
  // Power by header removal for security
  poweredByHeader: false,
  // Trailing slash for better crawling
  trailingSlash: false,
  // Output mode - removed 'standalone' for better compatibility
  // output: 'standalone',
  // Use server-side rendering for dynamic routes to avoid file path issues with Hebrew
  experimental: {
    // This helps with internationalization
  },
  // Safari compatibility headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
