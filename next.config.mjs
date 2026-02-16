/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [],
  // Generate a unique build ID each build to prevent stale cache
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  // Prevent caching issues with static assets in dev
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  webpack: (config, { dev, isServer }) => {
    // Windows 경로 문제 해결
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    
    return config;
  },
  experimental: {
    esmExternals: 'loose',
  },
}

export default nextConfig
