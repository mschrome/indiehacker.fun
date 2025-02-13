/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.performance = {
      ...config.performance,
      maxAssetSize: 10 * 1024 * 1024, // 10MB
      maxEntrypointSize: 10 * 1024 * 1024 // 10MB
    }
    return config
  }
}

module.exports = nextConfig 