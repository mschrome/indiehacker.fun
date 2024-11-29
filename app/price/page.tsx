'use client';

import Link from 'next/link';

export default function Price() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">价格计划</h1>
      <div className="max-w-2xl text-center mb-8">
        <p className="mb-4">
          我们提供多种价格计划以满足不同用户的需求。
        </p>
        <ul className="list-disc text-left pl-8 mb-4">
          <li>基础版：免费</li>
          <li>专业版：每月 $9.99</li>
          <li>企业版：每月 $29.99</li>
        </ul>
        <p className="mb-4">
          每个计划都提供不同的功能和支持级别，您可以根据需要选择合适的计划。
        </p>
      </div>
      <Link 
        href="/"
        className="text-blue-500 hover:text-blue-700 transition-colors"
      >
        返回首页
      </Link>
    </main>
  );
}