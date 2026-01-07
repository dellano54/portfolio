/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    // parallelServerBuild: true, // often implicit in newer versions or renamed
  },
  // Ensure we transpile GSAP plugins if needed (usually handled by next-transpile-modules or implicit)
};

export default nextConfig;
