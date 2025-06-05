# Gulp + Next.js Hybrid Test for EdgeOne Pages

这个项目支持多种构建模式来测试 EdgeOne Pages 的兼容性：**纯 Next.js**、**纯 Gulp** 和 **Next.js + Gulp 混合构建**。

## 🚀 构建模式

### 1. Next.js Only (原始模式)
```bash
npm run build                # 原始命令，保持不变
npm run build:next-only      # 明确指定 Next.js only
```
- 使用原有的 `echo $REACT_APP_API_URL && next build` 命令
- 输出目录：`out/`
- 适用于标准 Next.js 项目

### 2. Gulp Only (独立模式)
```bash
npm run build:gulp-only      # 纯 Gulp 构建
```
- 完全使用 Gulp 构建流程
- 输出目录：`dist/`
- 包含 CSS/JS 打包、压缩、静态文件处理

### 3. Next.js + Gulp 混合模式 (推荐测试)
```bash
npm run build:with-gulp      # Next.js + Gulp 后处理
npm run build:hybrid         # 预处理 + Next.js + 后处理
```
- **build:with-gulp**: `echo $REACT_APP_API_URL && gulp clean && next build && gulp post-process`
- **build:hybrid**: `echo $REACT_APP_API_URL && gulp pre-build && next build && gulp post-process`
- 保持 Next.js 的完整功能
- 在 Next.js 构建后添加 Gulp 增强处理
- 输出目录：`out/` (Next.js 标准输出)

## 📁 EdgeOne Pages 配置文件

### 原始 Next.js 模式
使用 `edgeone.json` 或默认配置：
```json
{
  "build": {
    "command": "npm run build",
    "outputDirectory": "out"
  }
}
```

### 纯 Gulp 模式
使用 `edgeone-gulp.json`：
```json
{
  "build": {
    "command": "npm run build:gulp-only",
    "outputDirectory": "dist"
  }
}
```

### 混合模式 (推荐)
使用 `edgeone-hybrid.json`：
```json
{
  "framework": "nextjs",
  "build": {
    "command": "npm run build:with-gulp",
    "outputDirectory": "out"
  }
}
```

## 🧪 测试步骤

### 1. 本地测试
```bash
# 安装依赖
npm install

# 测试 Gulp 配置
npm run gulp:test

# 测试不同构建模式
npm run build:next-only      # Next.js only
npm run build:gulp-only      # Gulp only
npm run build:with-gulp      # 混合模式
```

### 2. EdgeOne Pages 部署测试

**方法 A: 使用混合构建配置**
1. 在 EdgeOne Pages 创建项目
2. 连接 GitHub 仓库
3. 使用配置文件：`edgeone-hybrid.json`
4. 构建命令会自动设置为：`npm run build:with-gulp`

**方法 B: 手动配置**
- 构建命令：`npm run build:with-gulp`
- 输出目录：`out`
- 安装命令：`npm install`

### 3. 验证测试结果

访问部署网站的这些页面：
- `/` - 原始 Next.js 主页
- `/gulp-demo` - Gulp 功能测试页面

## ✅ 成功验证标志

### 构建日志验证
EdgeOne Pages 构建日志应显示：
1. ✅ `npm install` 安装 gulp 依赖成功
2. ✅ `echo $REACT_APP_API_URL` 执行
3. ✅ `next build` Next.js 构建成功
4. ✅ `gulp post-process` Gulp 后处理任务成功
   - CSS 后处理任务
   - JavaScript 后处理任务
   - Gulp 指示器添加

### 网站功能验证
1. **基础功能**：
   - ✅ Next.js 页面正常加载
   - ✅ React 组件正常工作
   - ✅ Tailwind CSS 样式正常

2. **Gulp 增强验证**：
   - ✅ 浏览器控制台显示 "🎉 This Next.js site has been enhanced with Gulp!"
   - ✅ 页面右上角显示 "🔧 Enhanced with Gulp" 浮动指示器
   - ✅ 网络面板可以看到 `/js/gulp-indicator.js` 文件
   - ✅ 网络面板可以看到 `/css/gulp-enhanced.min.css` 文件
   - ✅ `/gulp-demo` 页面显示 "✅ Gulp enhancement active"

## 🔧 技术实现

### Gulp 任务流程
1. **Pre-build** (可选): 预处理源文件
2. **Next.js Build**: 执行 `echo $REACT_APP_API_URL && next build`
3. **Post-process**: 处理 Next.js 输出
   - 将 Gulp 测试文件添加到 `out/css/` 和 `out/js/`
   - 生成 gulp-indicator.js 文件
   - 压缩和优化资源

### 文件结构
```
项目根目录/
├── package.json                    # 多种构建脚本
├── gulpfile.js                     # Gulp 配置（支持多种模式）
├── edgeone.json                    # 原始 Next.js 配置
├── edgeone-gulp.json               # 纯 Gulp 配置
├── edgeone-hybrid.json             # 混合构建配置
├── app/
│   ├── gulp-test.js                # Gulp 测试 JavaScript
│   ├── gulp-test.css               # Gulp 测试 CSS
│   └── gulp-demo/page.tsx          # Next.js 测试页面
└── out/                            # Next.js + Gulp 混合输出
    ├── index.html                  # Next.js 生成的页面
    ├── css/gulp-enhanced.min.css   # Gulp 处理的 CSS
    ├── js/gulp-enhanced.min.js     # Gulp 处理的 JS
    └── js/gulp-indicator.js        # Gulp 指示器
```

## 📊 对比测试

| 构建模式 | 命令 | 输出目录 | 特点 |
|---------|------|---------|------|
| Next.js Only | `npm run build` | `out/` | 纯 Next.js，无 Gulp |
| Gulp Only | `npm run build:gulp-only` | `dist/` | 纯 Gulp，无 Next.js |
| 混合模式 | `npm run build:with-gulp` | `out/` | Next.js + Gulp 增强 |

这样就可以全面测试 EdgeOne Pages 对不同构建工具的支持情况！ 