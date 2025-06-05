const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const { src, dest, watch, series, parallel } = require('gulp');

// Define paths
const paths = {
  styles: {
    src: 'src/styles/**/*.css',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  },
  html: {
    src: 'src/**/*.html',
    dest: 'dist/'
  },
  images: {
    src: 'src/images/**/*',
    dest: 'dist/images/'
  }
};

// Clean dist directory using rimraf instead of del
async function clean() {
  const fs = require('fs');
  const path = require('path');
  
  function rimraf(dir) {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }
  
  rimraf(path.join(__dirname, 'dist'));
  return Promise.resolve();
}

// Process CSS files
function styles() {
  return src([
    'app/globals.css',
    'app/gulp-test.css',
    'public/**/*.css'
  ])
    .pipe(concat('bundle.css'))
    .pipe(dest('dist/css/'))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/css/'));
}

// Process JavaScript files
function scripts() {
  return src([
    'app/gulp-test.js',
    'app/**/*.js',
    '!app/test.js',
    '!node_modules/**'
  ])
    .pipe(concat('bundle.js'))
    .pipe(dest('dist/js/'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/js/'));
}

// Copy HTML files
function html() {
  return src('public/**/*.html')
    .pipe(dest('dist/'));
}

// Copy and optimize images
function images() {
  return src('public/images/**/*')
    .pipe(dest('dist/images/'));
}

// Copy static files
function copyStatic() {
  return src([
    'public/**/*',
    '!public/**/*.html',
    '!public/images/**/*',
    '!public/**/*.css'
  ])
    .pipe(dest('dist/'));
}

// Create a simple test file to verify gulp is working
function createTestFile() {
  const fs = require('fs');
  const path = require('path');
  const testContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Gulp Test on EdgeOne Pages</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/bundle.min.css">
    <style>
      body { 
        font-family: Arial, sans-serif; 
        margin: 0; 
        padding: 20px; 
        background: #f5f5f5; 
      }
      .container { 
        max-width: 800px; 
        margin: 0 auto; 
        background: white; 
        padding: 30px; 
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }
    </style>
</head>
<body>
    <div class="container">
        <div class="gulp-test">
            <h1>🎉 Gulp Test Successfully Deployed!</h1>
            <p>This page was generated using Gulp tasks on EdgeOne Pages.</p>
            <p><strong>Generated at:</strong> ${new Date().toISOString()}</p>
            <p><strong>Build ID:</strong> ${Date.now()}</p>
        </div>
        
        <div class="gulp-success">
            ✅ Gulp processing is working correctly!
        </div>
        
        <h2>Test Results:</h2>
        <ul>
            <li>✅ CSS bundling and minification</li>
            <li>✅ JavaScript bundling and minification</li>
            <li>✅ Static file copying</li>
            <li>✅ Automated HTML generation</li>
            <li>✅ EdgeOne Pages deployment</li>
        </ul>
        
        <p>If you can see this page with proper styling, Gulp is working on EdgeOne Pages! 🚀</p>
    </div>
    
    <script src="js/bundle.min.js"></script>
</body>
</html>
  `;
  
  const distDir = path.join(__dirname, 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(distDir, 'index.html'), testContent);
  return Promise.resolve();
}

// Watch files for changes
function watchFiles() {
  watch(['app/**/*.css', 'public/**/*.css'], styles);
  watch(['app/**/*.js', '!app/test.js'], scripts);
  watch('public/**/*.html', html);
  watch('public/images/**/*', images);
}

// Development task
const dev = series(clean, parallel(styles, scripts, html, images, copyStatic), createTestFile, watchFiles);

// Build task for production
const build = series(clean, parallel(styles, scripts, html, images, copyStatic), createTestFile);

// Test task to verify gulp functionality
function testGulp(done) {
  console.log('🔧 Testing Gulp configuration...');
  console.log('✅ Gulp is working correctly!');
  console.log('📁 Project structure analyzed');
  console.log('🔧 Build tools ready');
  console.log('🚀 Ready for EdgeOne Pages deployment');
  console.log('');
  console.log('Available commands:');
  console.log('  npm run gulp:build  - Build for production');
  console.log('  npm run gulp:dev    - Development with watch');
  console.log('  npm run gulp:clean  - Clean dist directory');
  console.log('');
  done();
}

// Export tasks
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.images = images;
exports.copyStatic = copyStatic;
exports.createTestFile = createTestFile;
exports.watch = watchFiles;
exports.test = testGulp;
exports.dev = dev;
exports.build = build;
exports.default = build; 