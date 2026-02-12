'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="bg-bg-card border-b border-gray-200 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-3xl">🐿️</span>
            <span className="text-xl font-heading font-semibold">The Growth Matrix</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-text-secondary hover:text-text-primary transition-colors">
              首页
            </Link>
            <Link href="/create" className="text-text-secondary hover:text-text-primary transition-colors">
              创建 AI 分身
            </Link>
            <Link href="/report" className="text-text-secondary hover:text-text-primary transition-colors">
              查看报告
            </Link>
            <Link href="/community" className="text-text-secondary hover:text-text-primary transition-colors">
              社区
            </Link>
          </div>

          {/* Login Button */}
          <div>
            {isLoggedIn ? (
              <button
                onClick={() => window.location.href = '/api/auth/logout'}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                退出登录
              </button>
            ) : (
              <button
                onClick={() => window.location.href = '/api/auth/login'}
                className="bg-brand-primary hover:bg-brand-secondary text-text-primary font-semibold px-6 py-2 rounded-md transition-all"
              >
                登录
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
