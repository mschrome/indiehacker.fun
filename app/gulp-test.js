// Gulp test JavaScript file
console.log('Gulp JavaScript processing is working!');

function gulpTestFunction() {
  console.log('This function was processed by Gulp');
  
  // Add some test content to the page if DOM is available
  if (typeof document !== 'undefined') {
    const testDiv = document.createElement('div');
    testDiv.innerHTML = '🎉 Gulp JavaScript bundle loaded successfully!';
    testDiv.style.cssText = 'background: #4CAF50; color: white; padding: 10px; margin: 10px 0; border-radius: 4px;';
    document.body.appendChild(testDiv);
  }
}

// Execute test function when DOM is loaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', gulpTestFunction);
} else {
  // For Node.js environment
  gulpTestFunction();
} 