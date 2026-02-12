'use client';

import { useState } from 'react';
import Link from 'next/link';

// 模拟社区成员数据
const COMMUNITY_MEMBERS = [
  {
    id: 1,
    name: '小美',
    avatar: '👩',
    location: '北京',
    goal: '面部轮廓改善',
    status: '已成交',
    agentScore: 94,
    reportSummary: '脂肪填充 + 玻尿酸',
    institution: '斐缦医美',
    timeline: '2个月前',
    tags: ['初体验', '效果满意'],
  },
  {
    id: 2,
    name: 'Alice',
    avatar: '👱‍♀️',
    location: '上海',
    goal: '眼部年轻化',
    status: '评估中',
    agentScore: 88,
    reportSummary: '眼袋去除 + 双眼皮',
    institution: '待定',
    timeline: '1周前',
    tags: ['谨慎型', '多方比较'],
  },
  {
    id: 3,
    name: '晓雯',
    avatar: '👩‍🦰',
    location: '广州',
    goal: '鼻部塑形',
    status: '咨询中',
    agentScore: 91,
    reportSummary: '假体隆鼻',
    institution: '美莱医疗',
    timeline: '3天前',
    tags: ['预算充足', '追求自然'],
  },
  {
    id: 4,
    name: 'Sophie',
    avatar: '👩‍🦱',
    location: '深圳',
    goal: '皮肤管理',
    status: '已成交',
    agentScore: 96,
    reportSummary: '光子嫩肤套餐',
    institution: '艺星整形',
    timeline: '1个月前',
    tags: ['老客户', '定期维护'],
  },
  {
    id: 5,
    name: '婷婷',
    avatar: '👧',
    location: '杭州',
    goal: '瘦脸 + 除皱',
    status: '评估中',
    agentScore: 85,
    reportSummary: '肉毒素注射',
    institution: '待定',
    timeline: '2天前',
    tags: ['第一次', '有点紧张'],
  },
  {
    id: 6,
    name: 'Emma',
    avatar: '👩‍💼',
    location: '成都',
    goal: '胸部塑形',
    status: '咨询中',
    agentScore: 89,
    reportSummary: '假体隆胸',
    institution: '斐缦医美',
    timeline: '5天前',
    tags: ['深思熟虑', '多方咨询'],
  },
];

// 统计数据
const STATS = {
  totalMembers: 1234,
  completedReports: 892,
  successfulTransactions: 456,
  avgSatisfaction: 4.8,
};

// 筛选选项
const FILTERS = [
  { key: 'all', label: '全部' },
  { key: 'evaluating', label: '评估中' },
  { key: 'consulting', label: '咨询中' },
  { key: 'completed', label: '已成交' },
];

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = COMMUNITY_MEMBERS.filter(member => {
    if (activeFilter !== 'all') {
      const statusMap: Record<string, string> = {
        evaluating: '评估中',
        consulting: '咨询中',
        completed: '已成交',
      };
      if (member.status !== statusMap[activeFilter]) return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        member.name.toLowerCase().includes(query) ||
        member.goal.toLowerCase().includes(query) ||
        member.location.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <main className="min-h-screen py-12 bg-gradient-to-br from-[#FBF9F6] to-[#F5F2ED]">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* 页面头部 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-heading mb-4">The Growth Matrix Community</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            与 1,000+ 求美者的 AI 分身交流，分享经验，找到最适合你的变美方案
          </p>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: '社区成员', value: STATS.totalMembers, icon: '👥' },
            { label: '生成报告', value: STATS.completedReports, icon: '📊' },
            { label: '成功成交', value: STATS.successfulTransactions, icon: '✅' },
            { label: '满意度', value: `${STATS.avgSatisfaction}/5`, icon: '⭐' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-[#2E2929]">{stat.value.toLocaleString()}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 搜索和筛选 */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="搜索成员、变美目标或城市..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:border-[#E8D5C4] focus:outline-none focus:ring-2 focus:ring-[#E8D5C4]/20"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
          <div className="flex gap-2">
            {FILTERS.map(filter => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeFilter === filter.key
                    ? 'bg-[#2E2929] text-white'
                    : 'bg-white text-text-secondary hover:bg-gray-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* 成员网格 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all group"
            >
              {/* 卡片头部 */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E8D5C4] to-[#C9A88A] flex items-center justify-center text-3xl">
                      {member.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-sm text-text-secondary">{member.location}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    member.status === '已成交' ? 'bg-green-100 text-green-700' :
                    member.status === '咨询中' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {member.status}
                  </span>
                </div>
              </div>

              {/* 卡片内容 */}
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-text-secondary mb-1">变美目标</p>
                  <p className="font-medium">{member.goal}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-text-secondary mb-1">Agent 评分</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#E8D5C4] to-[#C9A88A] rounded-full"
                          style={{ width: `${member.agentScore}%` }}
                        />
                      </div>
                      <span className="font-semibold text-sm">{member.agentScore}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-text-secondary mb-1">推荐方案</p>
                  <p className="text-sm">{member.reportSummary}</p>
                </div>

                {member.institution !== '待定' && (
                  <div>
                    <p className="text-sm text-text-secondary mb-1">选择机构</p>
                    <p className="text-sm font-medium text-[#C9A88A]">{member.institution}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  {member.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 text-text-secondary px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 卡片底部 */}
              <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                <span className="text-xs text-text-secondary">{member.timeline}</span>
                <button className="text-sm text-[#C9A88A] hover:text-[#A08060] font-medium transition-colors">
                  查看详情 →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 空状态 */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-heading mb-2">没有找到匹配的成员</h3>
            <p className="text-text-secondary">尝试调整筛选条件或搜索关键词</p>
          </div>
        )}

        {/* 加载更多 */}
        {filteredMembers.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white text-text-secondary px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all">
              加载更多成员
            </button>
          </div>
        )}

        {/* CTA 区域 */}
        <div className="mt-16 bg-gradient-to-r from-[#E8D5C4] to-[#C9A88A] rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-heading mb-4 text-[#2E2929]">Join The Growth Matrix Community</h3>
          <p className="text-[#2E2929]/80 mb-6 max-w-xl mx-auto">
            创建你的 AI 分身，获取专属的确定性变美报告，
            与社区成员交流经验，找到最适合你的变美方案
          </p>
          <Link href="/create">
            <button className="bg-[#2E2929] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#4A4242] transition-all">
              创建我的 AI 分身
            </button>
          </Link>
        </div>

        {/* 社区动态 */}
        <div className="mt-16">
          <h2 className="text-2xl font-heading mb-6">社区动态</h2>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="space-y-4">
              {[
                { user: '小美', action: '完成了脂肪填充手术', time: '2小时前', icon: '✅' },
                { user: 'Alice', action: '生成了确定性变美报告', time: '3小时前', icon: '📊' },
                { user: 'Sophie', action: '预约了光子嫩肤咨询', time: '5小时前', icon: '📅' },
                { user: '晓雯', action: '分享了术后恢复经验', time: '1天前', icon: '💬' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg shadow-sm">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p>
                      <span className="font-medium">{activity.user}</span>
                      {' '}{activity.action}
                    </p>
                  </div>
                  <span className="text-sm text-text-secondary">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
