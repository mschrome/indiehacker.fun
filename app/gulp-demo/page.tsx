'use client';

import { useEffect, useState } from 'react';

export default function GulpDemoPage() {
  const [gulpStatus, setGulpStatus] = useState('checking...');

  useEffect(() => {
    // Check if gulp enhanced files are available
    const checkGulpFiles = async () => {
      try {
        // Try to load gulp enhanced CSS
        const cssResponse = await fetch('/css/gulp-enhanced.min.css');
        const jsResponse = await fetch('/js/gulp-enhanced.min.js');
        
        if (cssResponse.ok && jsResponse.ok) {
          setGulpStatus('✅ Gulp enhancement active');
          
          // Dynamically load gulp enhanced CSS
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/css/gulp-enhanced.min.css';
          document.head.appendChild(link);
          
          // Dynamically load gulp enhanced JS
          const script = document.createElement('script');
          script.src = '/js/gulp-enhanced.min.js';
          document.head.appendChild(script);
          
          // Load gulp indicator
          const indicatorScript = document.createElement('script');
          indicatorScript.src = '/js/gulp-indicator.js';
          document.head.appendChild(indicatorScript);
          
        } else {
          setGulpStatus('⚠️ Gulp files not found - using Next.js only');
        }
      } catch (error) {
        setGulpStatus('❌ Error loading gulp files');
      }
    };

    checkGulpFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🔧 Next.js + Gulp Demo Page
          </h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Build Status
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-lg">
                <strong>Gulp Status:</strong> <span className="font-mono">{gulpStatus}</span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Generated at: {new Date().toISOString()}
              </p>
              <p className="text-sm text-gray-600">
                Environment: {process.env.NEXT_PUBLIC_GULP_ENHANCED ? 'Gulp Enhanced' : 'Standard Next.js'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                🚀 Next.js Features
              </h3>
              <ul className="space-y-2 text-blue-700">
                <li>✅ React Server Components</li>
                <li>✅ Static Site Generation</li>
                <li>✅ TypeScript Support</li>
                <li>✅ Tailwind CSS</li>
                <li>✅ Performance Optimization</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-3">
                🔧 Gulp Enhancements
              </h3>
              <ul className="space-y-2 text-green-700">
                <li>✅ CSS Bundling & Minification</li>
                <li>✅ JavaScript Bundling & Minification</li>
                <li>✅ Asset Post-processing</li>
                <li>✅ Custom Build Pipeline</li>
                <li>✅ Development Workflow</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              🧪 Test Instructions
            </h3>
            <div className="text-yellow-700 space-y-2">
              <p><strong>1. Check browser console</strong> - You should see Gulp processing messages</p>
              <p><strong>2. Look for the floating indicator</strong> - &ldquo;🔧 Enhanced with Gulp&rdquo; badge</p>
              <p><strong>3. Inspect network tab</strong> - Check for gulp-enhanced.min.css and gulp-enhanced.min.js</p>
              <p><strong>4. Verify build output</strong> - EdgeOne Pages build logs should show both Next.js and Gulp tasks</p>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Available Build Commands
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm font-mono">
              <div>
                <p className="text-blue-600">npm run build</p>
                <p className="text-gray-600">Next.js only (original)</p>
              </div>
              <div>
                <p className="text-blue-600">npm run build:next-only</p>
                <p className="text-gray-600">Next.js only (explicit)</p>
              </div>
              <div>
                <p className="text-blue-600">npm run build:gulp-only</p>
                <p className="text-gray-600">Gulp only (standalone)</p>
              </div>
              <div>
                <p className="text-blue-600">npm run build:with-gulp</p>
                <p className="text-gray-600">Next.js + Gulp post-processing</p>
              </div>
              <div>
                <p className="text-blue-600">npm run build:hybrid</p>
                <p className="text-gray-600">Pre + Next.js + Post</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 