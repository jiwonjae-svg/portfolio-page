/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [],
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
