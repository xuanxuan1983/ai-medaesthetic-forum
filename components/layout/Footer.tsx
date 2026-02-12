import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-gray-200 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🐿️</span>
              <span className="text-xl font-heading font-semibold">The Growth Matrix</span>
            </div>
            <p className="text-text-secondary text-sm mb-4">
              从心到脸，确定性变美<br />
              基于 A2A 协议的医美去中心化信任增长社区
            </p>
            <p className="text-text-tertiary text-xs">
              © 2026 The Growth Matrix. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/" className="hover:text-text-primary transition-colors">首页</Link></li>
              <li><Link href="/create" className="hover:text-text-primary transition-colors">创建 AI 分身</Link></li>
              <li><Link href="/report" className="hover:text-text-primary transition-colors">查看报告</Link></li>
              <li><Link href="/community" className="hover:text-text-primary transition-colors">社区</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>微信：xuanyi9747</li>
              <li>项目：Second Me A2A 黑客松</li>
              <li>赛道：重做一遍互联网</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
