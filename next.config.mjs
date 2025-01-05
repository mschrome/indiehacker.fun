/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 添加以下配置以确保生成所有静态路由
  trailingSlash: true,
  distDir: 'build',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
