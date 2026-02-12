'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// 从表单数据生成个性化报告
function generatePersonalizedReport(formData: any) {
  // 根据年龄调整建议
  const age = parseInt(formData?.age) || 28;
  const budget = parseInt(formData?.budgetMax) || 15000;
  
  // 根据预算调整价格建议
  const marketPrice = Math.min(budget * 1.2, 25000);
  const reasonablePrice = Math.min(budget, 20000);
  const targetPrice = Math.min(budget * 0.8, 15000);
  
  return {
    ...MOCK_REPORT,
    negotiation: {
      ...MOCK_REPORT.negotiation,
      marketPrice,
      reasonablePrice,
      targetPrice,
    }
  };
}

// Agent 配置
const AGENTS = [
  { key: 'psychology', name: '心理 Agent', icon: '🧠', color: '#B8A8D6', desc: '评估心理准备度' },
  { key: 'aesthetic', name: '审美 Agent', icon: '✨', color: '#E8B8C8', desc: '分析面部结构' },
  { key: 'compliance', name: '合规 Agent', icon: '✅', color: '#A8C5A0', desc: '验证机构资质' },
  { key: 'communication', name: '沟通 Agent', icon: '💬', color: '#8AAED6', desc: '翻译医学术语' },
  { key: 'negotiation', name: '博弈 Agent', icon: '⚖️', color: '#E8B86D', desc: '价格谈判策略' },
  { key: 'transaction', name: '成交 Agent', icon: '🤝', color: '#C9A88A', desc: '综合决策支持' },
];

// 模拟报告数据
const MOCK_REPORT = {
  psychology: {
    score: 85,
    level: '适合继续',
    levelColor: 'text-green-600',
    analysis: '心理准备度良好，动机真实，预期合理。你对自己的需求有清晰认知，不是为了迎合他人压力，而是出于自我提升的意愿。',
    details: [
      { label: '动机真实性', value: 90, desc: '内在驱动为主' },
      { label: '预期合理性', value: 82, desc: '符合医学现实' },
      { label: '心理稳定性', value: 88, desc: '情绪状态良好' },
    ]
  },
  aesthetic: {
    recommendations: [
      { name: '面部脂肪填充', priority: 'high', reason: '改善面部轮廓凹陷，效果自然持久' },
      { name: '玻尿酸注射', priority: 'medium', reason: '局部精细调整，可逆性强' },
      { name: '肉毒素除皱', priority: 'low', reason: '预防动态皱纹，维护成本低' },
    ],
    analysis: '你的面部基础条件良好，骨骼结构匀称。主要改善空间在中面部容积和下颌线条。建议采用渐进式方案，避免过度填充。',
    faceScore: 78,
  },
  compliance: {
    institutions: [
      { name: '斐缦医美（长春）', score: 95, distance: '3.2km', tags: ['三级资质', '10年+经验', '专精脂肪'], recommended: true },
      { name: '美莱医疗美容', score: 88, distance: '5.1km', tags: ['连锁品牌', '全国保修'], recommended: false },
      { name: '艺星整形医院', score: 82, distance: '7.8km', tags: ['韩国技术', '明星案例'], recommended: false },
    ],
    analysis: '已筛选出3家合规机构，均具备医疗美容资质。建议优先考虑距离较近、评分较高的机构。',
  },
  communication: {
    keyQuestions: [
      '手术的具体流程和恢复周期是多久？',
      '可能出现的并发症有哪些？如何预防？',
      '如果效果不满意，有什么补救措施？',
      '医生的执业年限和类似案例有多少？',
      '价格包含哪些项目？是否有隐藏费用？',
    ],
    glossary: [
      { term: '脂肪存活率', explanation: '移植后存活的脂肪细胞比例，一般50-70%' },
      { term: '填充层次', explanation: '脂肪注射的深度，影响效果自然度' },
      { term: '吸收期', explanation: '术后3-6个月，部分脂肪会被吸收' },
    ],
  },
  negotiation: {
    marketPrice: 15000,
    reasonablePrice: 12000,
    targetPrice: 10000,
    analysis: '市场价格约¥15,000，合理价格区间¥10,000-12,000。建议采用"分阶段付款"策略降低风险。',
    tips: [
      '选择淡季（3-4月、9-10月）预约，通常有8-9折优惠',
      '询问是否有老客户推荐优惠',
      '要求明确列出所有费用，避免术后加价',
      '考虑分期付款，减轻资金压力',
    ],
  },
  transaction: {
    recommendation: '推荐方案：面部脂肪填充（局部）',
    riskLevel: '低',
    riskColor: 'text-green-600',
    confidence: 92,
    timeline: '建议3个月内进行',
    finalAdvice: '综合评估结果良好，建议选择斐缦医美，预算控制在¥10,000-12,000。你的心理准备充分，审美需求合理，机构选择有保障。',
  }
};

export default function ReportPage() {
  const [loading, setLoading] = useState(true);
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState<any>(null);
  const [personalizedReport, setPersonalizedReport] = useState(MOCK_REPORT);

  // 读取表单数据
  useEffect(() => {
    const saved = localStorage.getItem('growthMatrixFormData');
    if (saved) {
      const data = JSON.parse(saved);
      setFormData(data);
      setPersonalizedReport(generatePersonalizedReport(data));
    }
  }, []);

  // 模拟加载动画
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FBF9F6] to-[#F5F2ED]">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-bounce">🐿️</div>
          <h2 className="text-2xl font-heading mb-4">六大 Agent 正在协作评估...</h2>
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <div 
              className="h-full bg-gradient-to-r from-[#E8D5C4] to-[#C9A88A] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-text-secondary mt-4">{progress}% 完成</p>
          <div className="mt-8 flex justify-center gap-4">
            {AGENTS.map((agent, i) => (
              <div 
                key={agent.key}
                className={`text-2xl transition-all duration-500 ${progress > (i + 1) * 16 ? 'opacity-100 scale-110' : 'opacity-30'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {agent.icon}
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  const report = personalizedReport;

  return (
    <main className="min-h-screen py-12 bg-gradient-to-br from-[#FBF9F6] to-[#F5F2ED]">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* 报告头部 */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
            <span className="text-green-500">✓</span>
            <span className="text-sm text-text-secondary">评估完成 · 生成于 2026年2月12日</span>
          </div>
          <h1 className="text-5xl font-heading mb-4">你的确定性变美报告</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            六大 Agent 已完成全方位评估，以下是为你量身定制的变美方案
          </p>
        </div>

        {/* 综合评分卡片 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#E8D5C4] to-[#C9A88A] flex items-center justify-center">
                <div className="text-5xl font-bold text-white">{report.transaction.confidence}</div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                推荐继续
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-heading mb-2">综合置信度评分</h2>
              <p className="text-text-secondary mb-4">{report.transaction.finalAdvice}</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  风险等级：{report.transaction.riskLevel}
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  建议时间：{report.transaction.timeline}
                </span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  预算：¥{report.negotiation.targetPrice.toLocaleString()}-{report.negotiation.reasonablePrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Agent 矩阵概览 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {AGENTS.map((agent, index) => (
            <button
              key={agent.key}
              onClick={() => setActiveAgent(activeAgent === agent.key ? null : agent.key)}
              className={`bg-white rounded-xl p-4 shadow-md transition-all hover:shadow-lg text-center ${
                activeAgent === agent.key ? 'ring-2 ring-offset-2' : ''
              }`}
              style={{ 
                ['--tw-ring-color' as string]: activeAgent === agent.key ? agent.color : undefined,
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="text-3xl mb-2">{agent.icon}</div>
              <div className="text-sm font-medium">{agent.name}</div>
              <div className="text-xs text-text-secondary mt-1">{agent.desc}</div>
            </button>
          ))}
        </div>

        {/* 详细报告内容 */}
        <div className="space-y-6">
          {/* 心理 Agent */}
          <section className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 border-l-4" style={{ borderLeftColor: AGENTS[0].color }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{AGENTS[0].icon}</span>
                <div>
                  <h3 className="text-xl font-semibold">{AGENTS[0].name}</h3>
                  <p className="text-sm text-text-secondary">{AGENTS[0].desc}</p>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-3xl font-bold" style={{ color: AGENTS[0].color }}>{report.psychology.score}</div>
                  <div className="text-xs text-text-secondary">/100分</div>
                </div>
              </div>
              <p className="text-text-secondary mb-4">{report.psychology.analysis}</p>
              <div className="grid grid-cols-3 gap-4">
                {report.psychology.details.map((detail, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">{detail.label}</span>
                      <span className="font-semibold" style={{ color: AGENTS[0].color }}>{detail.value}</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${detail.value}%`, backgroundColor: AGENTS[0].color }}
                      />
                    </div>
                    <p className="text-xs text-text-secondary mt-1">{detail.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 审美 Agent */}
          <section className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 border-l-4" style={{ borderLeftColor: AGENTS[1].color }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{AGENTS[1].icon}</span>
                <div>
                  <h3 className="text-xl font-semibold">{AGENTS[1].name}</h3>
                  <p className="text-sm text-text-secondary">{AGENTS[1].desc}</p>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-3xl font-bold" style={{ color: AGENTS[1].color }}>{report.aesthetic.faceScore}</div>
                  <div className="text-xs text-text-secondary">基础分</div>
                </div>
              </div>
              <p className="text-text-secondary mb-4">{report.aesthetic.analysis}</p>
              <div className="space-y-3">
                {report.aesthetic.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      rec.priority === 'high' ? 'bg-red-400' : 
                      rec.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`} />
                    <div className="flex-1">
                      <span className="font-medium">{rec.name}</span>
                      <span className="text-xs text-text-secondary ml-2">
                        ({rec.priority === 'high' ? '优先推荐' : rec.priority === 'medium' ? '推荐' : '可选'})
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">{rec.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 合规 Agent */}
          <section className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 border-l-4" style={{ borderLeftColor: AGENTS[2].color }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{AGENTS[2].icon}</span>
                <div>
                  <h3 className="text-xl font-semibold">{AGENTS[2].name}</h3>
                  <p className="text-sm text-text-secondary">{AGENTS[2].desc}</p>
                </div>
              </div>
              <p className="text-text-secondary mb-4">{report.compliance.analysis}</p>
              <div className="space-y-3">
                {report.compliance.institutions.map((inst, i) => (
                  <div key={i} className={`p-4 rounded-lg border-2 transition-all ${
                    inst.recommended ? 'border-green-400 bg-green-50' : 'border-gray-100 bg-gray-50'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{inst.name}</span>
                          {inst.recommended && (
                            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">推荐</span>
                          )}
                        </div>
                        <div className="flex gap-2 mt-2">
                          {inst.tags.map((tag, j) => (
                            <span key={j} className="text-xs bg-white px-2 py-1 rounded text-text-secondary">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{inst.score}</div>
                        <div className="text-xs text-text-secondary">{inst.distance}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 沟通 Agent */}
          <section className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 border-l-4" style={{ borderLeftColor: AGENTS[3].color }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{AGENTS[3].icon}</span>
                <div>
                  <h3 className="text-xl font-semibold">{AGENTS[3].name}</h3>
                  <p className="text-sm text-text-secondary">{AGENTS[3].desc}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">咨询时必问的问题清单</h4>
                  <ol className="space-y-2">
                    {report.communication.keyQuestions.map((q, i) => (
                      <li key={i} className="flex gap-2 text-sm text-text-secondary">
                        <span className="text-[#8AAED6] font-bold">{i + 1}.</span>
                        {q}
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-3">术语解释</h4>
                  <div className="space-y-3">
                    {report.communication.glossary.map((item, i) => (
                      <div key={i} className="bg-blue-50 rounded-lg p-3">
                        <div className="font-medium text-sm text-blue-800">{item.term}</div>
                        <div className="text-sm text-blue-600 mt-1">{item.explanation}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 博弈 Agent */}
          <section className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 border-l-4" style={{ borderLeftColor: AGENTS[4].color }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{AGENTS[4].icon}</span>
                <div>
                  <h3 className="text-xl font-semibold">{AGENTS[4].name}</h3>
                  <p className="text-sm text-text-secondary">{AGENTS[4].desc}</p>
                </div>
              </div>
              <p className="text-text-secondary mb-4">{report.negotiation.analysis}</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-text-secondary mb-1">市场价</div>
                  <div className="text-xl font-semibold text-gray-400 line-through">
                    ¥{report.negotiation.marketPrice.toLocaleString()}
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-text-secondary mb-1">合理价</div>
                  <div className="text-xl font-semibold text-blue-600">
                    ¥{report.negotiation.reasonablePrice.toLocaleString()}
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-text-secondary mb-1">目标价</div>
                  <div className="text-xl font-semibold text-green-600">
                    ¥{report.negotiation.targetPrice.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-medium mb-2 text-yellow-800">💡 谈判技巧</h4>
                <ul className="space-y-1">
                  {report.negotiation.tips.map((tip, i) => (
                    <li key={i} className="text-sm text-yellow-700">• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 成交 Agent */}
          <section className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 border-l-4" style={{ borderLeftColor: AGENTS[5].color }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{AGENTS[5].icon}</span>
                <div>
                  <h3 className="text-xl font-semibold">{AGENTS[5].name}</h3>
                  <p className="text-sm text-text-secondary">{AGENTS[5].desc}</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-[#C9A88A]/10 to-[#E8D5C4]/10 rounded-xl p-6">
                <h4 className="text-xl font-heading mb-4">最终建议</h4>
                <p className="text-lg mb-4">{report.transaction.recommendation}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-white px-4 py-2 rounded-full text-sm shadow-sm">
                    置信度：{report.transaction.confidence}%
                  </span>
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                    风险：{report.transaction.riskLevel}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                    时间：{report.transaction.timeline}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* CTA 区域 */}
        <div className="mt-12 bg-gradient-to-r from-[#2E2929] to-[#4A4242] rounded-2xl p-8 text-center text-white">
          <h3 className="text-3xl font-heading mb-4">准备好开始你的变美之旅了吗？</h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            你的 AI 分身已经为你完成了所有准备工作。现在，让TA帮你预约咨询，
            你只需要在最后确认：是的，我准备好了。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#E8D5C4] text-[#2E2929] font-semibold px-8 py-4 rounded-lg hover:bg-[#C9A88A] transition-all">
              让 AI 分身帮我预约咨询
            </button>
            <Link href="/community">
              <button className="bg-white/10 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 transition-all">
                先看看社区里的其他姐妹
              </button>
            </Link>
          </div>
        </div>

        {/* 底部导航 */}
        <div className="mt-8 flex justify-between items-center">
          <Link href="/create" className="text-text-secondary hover:text-text-primary transition-colors">
            ← 重新创建 AI 分身
          </Link>
          <button 
            onClick={() => window.print()}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            打印报告 ↗
          </button>
        </div>
      </div>
    </main>
  );
}
