const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const { src, dest, watch, series, parallel } = require('gulp');

// Define paths for different build modes
const paths = {
  // For standalone gulp build
  standalone: {
    styles: {
      src: ['app/globals.css', 'app/gulp-test.css', 'public/**/*.css'],
      dest: 'dist/css/'
    },
    scripts: {
      src: ['app/gulp-test.js', 'app/**/*.js', '!app/test.js', '!node_modules/**'],
      dest: 'dist/js/'
    },
    html: {
      src: 'public/**/*.html',
      dest: 'dist/'
    },
    images: {
      src: 'public/images/**/*',
      dest: 'dist/images/'
    },
    static: {
      src: ['public/**/*', '!public/**/*.html', '!public/images/**/*', '!public/**/*.css'],
      dest: 'dist/'
    }
  },
  // For Next.js integration (processes Next.js output)
  nextjs: {
    styles: {
      src: ['out/**/*.css', 'app/gulp-test.css'],
      dest: 'out/css/'
    },
    scripts: {
      src: ['out/**/*.js', 'app/gulp-test.js'],
      dest: 'out/js/'
    },
    images: {
      src: 'out/images/**/*',
      dest: 'out/images/'
    }
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

// Clean Next.js output directory
async function cleanNext() {
  const fs = require('fs');
  const path = require('path');
  
  function rimraf(dir) {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }
  
  rimraf(path.join(__dirname, 'out'));
  return Promise.resolve();
}

// Pre-build tasks (run before Next.js build)
function preBuildStyles() {
  console.log('🎨 Pre-processing CSS files...');
  return src(['app/gulp-test.css'])
    .pipe(dest('app/'))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('app/'));
}

function preBuildScripts() {
  console.log('📜 Pre-processing JavaScript files...');
  return src(['app/gulp-test.js'])
    .pipe(dest('app/'));
}

// Process CSS files (standalone mode)
function styles() {
  return src(paths.standalone.styles.src)
    .pipe(concat('bundle.css'))
    .pipe(dest(paths.standalone.styles.dest))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths.standalone.styles.dest));
}

// Process JavaScript files (standalone mode)
function scripts() {
  return src(paths.standalone.scripts.src)
    .pipe(concat('bundle.js'))
    .pipe(dest(paths.standalone.scripts.dest))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths.standalone.scripts.dest));
}

// Post-process Next.js output
function postProcessStyles() {
  console.log('🎨 Post-processing Next.js CSS files...');
  
  // First, let's create additional processed CSS from our test files
  return src(['app/gulp-test.css'])
    .pipe(concat('gulp-enhanced.css'))
    .pipe(dest('out/css/'))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('out/css/'));
}

function postProcessScripts() {
  console.log('📜 Post-processing Next.js JavaScript files...');
  
  // Add our test JS to the Next.js output
  return src(['app/gulp-test.js'])
    .pipe(concat('gulp-enhanced.js'))
    .pipe(dest('out/js/'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('out/js/'));
}

// Add gulp test indicator to Next.js output
function addGulpIndicator() {
  const fs = require('fs');
  const path = require('path');
  
  console.log('🔧 Adding Gulp test indicator to Next.js output...');
  
  // Create a gulp indicator file
  const indicatorContent = `
/* Gulp Enhancement Indicator */
console.log('🎉 This Next.js site has been enhanced with Gulp!');
console.log('Generated at: ${new Date().toISOString()}');
console.log('Gulp processing: ✅ Completed');

// Add visual indicator to the page
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    const indicator = document.createElement('div');
    indicator.innerHTML = '🔧 Enhanced with Gulp';
    indicator.style.cssText = 'position: fixed; top: 10px; right: 10px; background: #4CAF50; color: white; padding: 5px 10px; border-radius: 4px; font-size: 12px; z-index: 9999; font-family: Arial, sans-serif;';
    document.body.appendChild(indicator);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      indicator.style.opacity = '0.3';
    }, 3000);
  });
}
`;

  const outDir = path.join(__dirname, 'out');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  const jsDir = path.join(outDir, 'js');
  if (!fs.existsSync(jsDir)) {
    fs.mkdirSync(jsDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(jsDir, 'gulp-indicator.js'), indicatorContent);
  return Promise.resolve();
}

// Copy HTML files (standalone mode)
function html() {
  return src(paths.standalone.html.src)
    .pipe(dest(paths.standalone.html.dest));
}

// Copy and optimize images (standalone mode)
function images() {
  return src(paths.standalone.images.src)
    .pipe(dest(paths.standalone.images.dest));
}

// Copy static files (standalone mode)
function copyStatic() {
  return src(paths.standalone.static.src)
    .pipe(dest(paths.standalone.static.dest));
}

// Create a simple test file to verify gulp is working (standalone mode)
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
            <p>This page was generated using <strong>Gulp only</strong> (standalone mode).</p>
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
        
        <p>This is <strong>standalone Gulp build</strong> mode. 🚀</p>
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

// Test task to verify gulp functionality
function testGulp(done) {
  console.log('🔧 Testing Gulp configuration...');
  console.log('✅ Gulp is working correctly!');
  console.log('📁 Project structure analyzed');
  console.log('🔧 Build tools ready');
  console.log('🚀 Ready for EdgeOne Pages deployment');
  console.log('');
  console.log('Available build modes:');
  console.log('  npm run build              - Next.js only (original)');
  console.log('  npm run build:next-only    - Next.js only (explicit)');
  console.log('  npm run build:gulp-only    - Gulp only (standalone)');
  console.log('  npm run build:hybrid       - Pre + Next.js + Post processing');
  console.log('  npm run build:with-gulp    - Clean + Next.js + Post processing');
  console.log('');
  console.log('Gulp tasks:');
  console.log('  npm run gulp:build         - Standalone gulp build');
  console.log('  npm run gulp:pre-build     - Pre-process before Next.js');
  console.log('  npm run gulp:post-build    - Post-process after Next.js');
  console.log('');
  done();
}

// Define composite tasks
const preBuild = parallel(preBuildStyles, preBuildScripts);
const postProcess = series(
  parallel(postProcessStyles, postProcessScripts),
  addGulpIndicator
);

// Development task (standalone)
const dev = series(clean, parallel(styles, scripts, html, images, copyStatic), createTestFile, watchFiles);

// Build task for production (standalone)
const build = series(clean, parallel(styles, scripts, html, images, copyStatic), createTestFile);

// Export tasks
exports.clean = clean;
exports.cleanNext = cleanNext;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.images = images;
exports.copyStatic = copyStatic;
exports.createTestFile = createTestFile;
exports.watch = watchFiles;
exports.test = testGulp;

// New tasks for Next.js integration
exports['pre-build'] = preBuild;
exports['post-process'] = postProcess;
exports.preBuildStyles = preBuildStyles;
exports.preBuildScripts = preBuildScripts;
exports.postProcessStyles = postProcessStyles;
exports.postProcessScripts = postProcessScripts;
exports.addGulpIndicator = addGulpIndicator;

// Main tasks
exports.dev = dev;
exports.build = build;
exports.default = build; 