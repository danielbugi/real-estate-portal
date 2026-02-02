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
  // Use server-side rendering for dynamic routes to avoid file path issues with Hebrew
  experimental: {
    // This helps with internationalization
  },
};

module.exports = nextConfig;
