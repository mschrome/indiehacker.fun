/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // 设置资源文件大小限制
    config.performance = {
      ...config.performance,
      maxAssetSize: 10 * 1024 * 1024, // 10MB
      maxEntrypointSize: 10 * 1024 * 1024 // 10MB
    };

    // 配置缓存相关选项
    config.cache = {
      type: 'filesystem',
      // 设置缓存文件大小限制
      maxGenerations: 1,
      compression: 'gzip',
      // 缓存文件的最大大小
      maxAge: 172800000, // 2天
      buildDependencies: {
        config: [__filename]
      },
      cacheDirectory: '.next/cache/webpack'
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
            priority: 30
          }
        }
      }
    };

    return config;
  }
};

module.exports = nextConfig; 