# Gulp Test for EdgeOne Pages

这个项目已经配置了 Gulp 构建工具来测试 EdgeOne Pages 的 Gulp 支持。

## 安装依赖

```bash
npm install
```

## 可用的 Gulp 任务

### 基础任务

- `npm run gulp:test` - 测试 Gulp 是否正常工作
- `npm run gulp:clean` - 清理 dist 目录
- `npm run gulp:build` - 构建生产版本
- `npm run gulp:dev` - 开发模式（包含文件监视）

### 具体任务

- `gulp styles` - 处理 CSS 文件（合并、压缩）
- `gulp scripts` - 处理 JavaScript 文件（合并、压缩）
- `gulp images` - 优化图片
- `gulp html` - 复制 HTML 文件
- `gulp copyStatic` - 复制静态文件

## 测试步骤

1. **安装依赖并运行构建**
   ```bash
   npm install
   npm run gulp:build
   ```

2. **检查构建结果**
   构建完成后，检查 `dist/` 目录是否包含：
   - `index.html` - 测试页面
   - `css/bundle.min.css` - 压缩的 CSS
   - `js/bundle.min.js` - 压缩的 JavaScript
   - 其他静态资源

3. **部署到 EdgeOne Pages**
   
   **方法1: 使用专用配置文件**
   ```bash
   # 使用 edgeone-gulp.json 配置文件部署
   # 这个配置专门为 gulp 构建产物设置
   ```
   
   **方法2: 手动部署 dist 目录**
   直接将 `dist/` 目录上传到 EdgeOne Pages

## 测试内容

Gulp 配置包含以下测试功能：

1. **CSS 处理**: 合并和压缩 CSS 文件
2. **JavaScript 处理**: 合并和压缩 JS 文件  
3. **静态文件复制**: 复制图片和其他资源
4. **自动生成测试页面**: 创建带时间戳的测试页面
5. **文件监视**: 开发模式下监视文件变化

## 预期结果

如果 EdgeOne Pages 支持 Gulp，你应该看到：

1. ✅ 构建命令 `npm run gulp:build` 执行成功
2. ✅ `dist/` 目录生成正确的文件结构
3. ✅ 部署的网站显示 "Gulp Test Successfully Deployed!" 页面
4. ✅ CSS 和 JavaScript 正常加载和运行

## 故障排除

如果遇到问题：

1. 检查 Node.js 版本是否兼容
2. 确认所有依赖已正确安装
3. 查看构建日志中的错误信息
4. 检查 EdgeOne Pages 的构建配置

## 文件结构

```
项目根目录/
├── gulpfile.js              # Gulp 配置文件
├── edgeone-gulp.json        # EdgeOne Pages 配置
├── app/
│   ├── gulp-test.js         # 测试 JavaScript
│   └── gulp-test.css        # 测试 CSS
└── dist/                    # Gulp 构建输出目录
    ├── index.html           # 生成的测试页面
    ├── css/bundle.min.css   # 压缩的 CSS
    └── js/bundle.min.js     # 压缩的 JavaScript
``` 