'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    occupation: '',
    beautyGoals: '',
    budgetMin: '',
    budgetMax: '',
    timeline: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 保存表单数据到 localStorage
    localStorage.setItem('growthMatrixFormData', JSON.stringify(formData));
    
    // 跳转到 loading 页面
    router.push('/loading');
  };

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-6 max-w-2xl">
        <h1 className="text-4xl font-heading mb-6">创建你的 AI 分身</h1>
        <p className="text-text-secondary mb-8">
          告诉我们一些基本信息，让六大 Agent 开始为你工作
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 年龄 */}
          <div>
            <label className="block text-sm font-medium mb-2">年龄</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-brand-primary focus:outline-none"
              placeholder="例如：28"
              required
            />
          </div>

          {/* 性别 */}
          <div>
            <label className="block text-sm font-medium mb-2">性别</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-brand-primary focus:outline-none"
              required
            >
              <option value="">请选择</option>
              <option value="female">女</option>
              <option value="male">男</option>
              <option value="other">其他</option>
            </select>
          </div>

          {/* 职业 */}
          <div>
            <label className="block text-sm font-medium mb-2">职业</label>
            <input
              type="text"
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-brand-primary focus:outline-none"
              placeholder="例如：互联网从业者"
              required
            />
          </div>

          {/* 变美诉求 */}
          <div>
            <label className="block text-sm font-medium mb-2">变美诉求</label>
            <textarea
              value={formData.beautyGoals}
              onChange={(e) => setFormData({ ...formData, beautyGoals: e.target.value })}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-brand-primary focus:outline-none"
              placeholder="例如：想改善面部轮廓，让脸看起来更立体"
              rows={4}
              required
            />
          </div>

          {/* 预算范围 */}
          <div>
            <label className="block text-sm font-medium mb-2">预算范围（元）</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={formData.budgetMin}
                onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                className="px-4 py-3 rounded-md border border-gray-300 focus:border-brand-primary focus:outline-none"
                placeholder="最低"
                required
              />
              <input
                type="number"
                value={formData.budgetMax}
                onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                className="px-4 py-3 rounded-md border border-gray-300 focus:border-brand-primary focus:outline-none"
                placeholder="最高"
                required
              />
            </div>
          </div>

          {/* 时间安排 */}
          <div>
            <label className="block text-sm font-medium mb-2">时间安排</label>
            <select
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-brand-primary focus:outline-none"
              required
            >
              <option value="">请选择</option>
              <option value="1month">1 个月内</option>
              <option value="3months">3 个月内</option>
              <option value="6months">6 个月内</option>
              <option value="flexible">时间灵活</option>
            </select>
          </div>

          {/* 提交按钮 */}
          <button
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-secondary text-text-primary font-semibold px-8 py-4 rounded-md transition-all"
          >
            创建 AI 分身
          </button>

          <p className="text-sm text-text-tertiary text-center">
            ✨ 提交后，六大 Agent 将在 24-48 小时内完成评估
          </p>
        </form>
      </div>
    </main>
  );
}
