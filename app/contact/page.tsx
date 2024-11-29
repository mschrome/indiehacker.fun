'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      // 这里可以替换为实际的提交逻辑
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">联系我们</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">姓名</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded dark:bg-gray-800"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">邮箱</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border rounded dark:bg-gray-800"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">留言</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full p-2 border rounded dark:bg-gray-800"
            rows={4}
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? '发送中...' : '提交'}
        </button>
        
        {status === 'success' && (
          <p className="mt-2 text-green-500">消息已发送，我们会尽快回复！</p>
        )}
        {status === 'error' && (
          <p className="mt-2 text-red-500">发送失败，请稍后重试。</p>
        )}
      </form>
      
      <Link 
        href="/"
        className="mt-8 text-blue-500 hover:text-blue-700 transition-colors"
      >
        返回首页
      </Link>
    </main>
  );
}