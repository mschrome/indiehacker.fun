const fs = require('fs');
const path = require('path');

// 假设原始的大数组
const bigArray = [ /* 您的大数组数据 */ ];

// 将数组分割成多个小文件
const chunkSize = 1000;
for (let i = 0; i < bigArray.length; i += chunkSize) {
  const chunk = bigArray.slice(i, i + chunkSize);
  const fileName = `bigFile_${Math.floor(i / chunkSize)}.js`;
  const content = `export default ${JSON.stringify(chunk)};`;
  
  fs.writeFileSync(
    path.join(__dirname, 'app', 'about', 'data', fileName),
    content
  );
}

// 生成一个大字符串
const generateBigString = () => {
  let content = 'const bigArray = [\n';
  
  // 生成足够多的数据来达到 5M+
  for (let i = 0; i < 100000; i++) {
    content += `  "${'x'.repeat(100)}",\n`;
  }
  
  content += '];\n\nexport default bigArray;';
  return content;
};

// 写入文件
fs.writeFileSync('app/about/bigFile.js', generateBigString());
console.log('大文件已生成'); 