'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// 每页显示的数据量
const PAGE_SIZE = 100;

export default function About() {
  const [bigData, setBigData] = useState<string[]>([]);
  const [displayData, setDisplayData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 异步加载大文件数据
    import('./bigFile')
      .then((module) => {
        setBigData(module.default);
        // 初始加载第一页数据
        setDisplayData(module.default.slice(0, PAGE_SIZE));
        setLoading(false);
      })
      .catch((err) => {
        console.error('加载大文件失败:', err);
        setLoading(false);
      });
  }, []);

  const loadMore = () => {
    const currentSize = displayData.length;
    const nextData = bigData.slice(currentSize, currentSize + PAGE_SIZE);
    setDisplayData(prev => [...prev, ...nextData]);
  };

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
      <p>已加载数据: {displayData.length} / {bigData.length}</p>
      {loading ? (
        <p>加载中...</p>
      ) : (
        displayData.length < bigData.length && (
          <button
            onClick={loadMore}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            加载更多
          </button>
        )
      )}
      <Link 
        href="/"
        className="mt-8 text-blue-500 hover:text-blue-700 transition-colors"
      >
        返回首页
      </Link>
    </main>
  );
}