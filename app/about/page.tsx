'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function About() {
  const [bigData, setBigData] = useState<string[]>([]);

  useEffect(() => {
    // 异步加载大文件数据
    import('./bigFile')
      .then((module) => {
        setBigData(module.default);
      })
      .catch((err) => {
        console.error('加载大文件失败:', err);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">关于我们</h1>
      <div className="max-w-2xl text-center mb-8">
        <p className="mb-4">
          这是一个使用 Next.js 构建的项目，旨在帮助开发者更好地理解和使用现代前端技术。
        </p>
        <p className="mb-4">
          我们使用了最新的技术栈：
        </p>
        <ul className="list-disc text-left pl-8 mb-4">
          <li>Next.js 14</li>
          <li>React 18</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
        </ul>
      </div>
      <p>数据长度: {bigData.length}</p>
      <Link 
        href="/"
        className="text-blue-500 hover:text-blue-700 transition-colors"
      >
        返回首页
      </Link>
    </main>
  );
}