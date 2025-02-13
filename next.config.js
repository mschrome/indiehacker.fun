/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  webpack: (config) => {
    // 设置资源文件大小限制
    config.performance = {
      ...config.performance,
      maxAssetSize: 10 * 1024 * 1024, // 10MB
      maxEntrypointSize: 10 * 1024 * 1024 // 10MB
    };

    // 配置内存缓存
    config.cache = {
      type: 'memory',
      maxGenerations: 1
    };

    // 优化分块策略
    config.optimization = {
      ...config.optimization,
      minimize: true,
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 1000000, // 1MB 每个块的最大大小
        cacheGroups: {
          default: false,
          vendors: false,
          // 大文件单独打包
          bigFiles: {
            test: /bigFile\.js$/,
            name: 'big-files',
            chunks: 'async',
            enforce: true,
            priority: 30,
            maxSize: 25 * 1024 * 1024 // 25MB，符合 Cloudflare Pages 限制
          }
        }
      }
    };

    return config;
  },
  // 添加其他 Next.js 配置
  output: 'export', // 使用静态导出
  images: {
    unoptimized: true // 禁用图片优化
  },
  experimental: {
    optimizePackageImports: ['@/app/about/bigFile']
  }
};

module.exports = nextConfig; 