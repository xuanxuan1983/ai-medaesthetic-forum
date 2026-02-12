// 六大 Agent 实现 - 真正的 A2A 协作逻辑

import { messageBus, A2AMessage, Agent } from './bus';

// Agent 配置
export const AGENT_CONFIGS: Agent[] = [
  {
    id: 'psychology',
    name: 'Psychology Agent',
    role: '心理评估专家',
    capabilities: ['心理评估', '动机分析', '预期管理'],
    status: 'IDLE',
  },
  {
    id: 'aesthetic',
    name: 'Aesthetic Agent',
    role: '审美分析专家',
    capabilities: ['面部分析', '方案推荐', '效果预测'],
    status: 'IDLE',
  },
  {
    id: 'compliance',
    name: 'Compliance Agent',
    role: '合规验证专家',
    capabilities: ['资质验证', '风险筛查', '机构评级'],
    status: 'IDLE',
  },
  {
    id: 'communication',
    name: 'Communication Agent',
    role: '沟通协调专家',
    capabilities: ['术语翻译', '问题整理', '预期管理'],
    status: 'IDLE',
  },
  {
    id: 'negotiation',
    name: 'Negotiation Agent',
    role: '价格谈判专家',
    capabilities: ['价格分析', '策略制定', '优惠挖掘'],
    status: 'IDLE',
  },
  {
    id: 'transaction',
    name: 'Transaction Agent',
    role: '成交决策专家',
    capabilities: ['综合评估', '风险评级', '最终建议'],
    status: 'IDLE',
  },
];

// Agent 处理函数
export function initializeAgents(userProfile: any) {
  // 1. Psychology Agent
  messageBus.registerAgent(AGENT_CONFIGS[0], async (msg: A2AMessage) => {
    if (msg.to === 'psychology' && msg.type === 'REQUEST') {
      messageBus.updateAgentStatus('psychology', 'BUSY');
      
      // 模拟处理时间
      await delay(1500);
      
      // 心理评估逻辑
      const assessment = {
        score: calculatePsychologyScore(userProfile),
        motivation: analyzeMotivation(userProfile),
        readiness: 'READY',
        concerns: [],
      };
      
      // 发送结果给 Aesthetic Agent
      await messageBus.send({
        from: 'psychology',
        to: 'aesthetic',
        type: 'NOTIFY',
        payload: {
          type: 'PSYCHOLOGY_ASSESSMENT',
          data: assessment,
          note: 'User has realistic expectations and clear motivation',
        },
      });
      
      messageBus.updateAgentStatus('psychology', 'DONE');
    }
  });

  // 2. Aesthetic Agent
  messageBus.registerAgent(AGENT_CONFIGS[1], async (msg: A2AMessage) => {
    if (msg.from === 'psychology' && msg.payload.type === 'PSYCHOLOGY_ASSESSMENT') {
      messageBus.updateAgentStatus('aesthetic', 'BUSY');
      
      await delay(1500);
      
      // 根据心理评估调整审美方案
      const recommendations = generateAestheticRecommendations(
        userProfile,
        msg.payload.data
      );
      
      // 并行通知 Compliance 和 Communication Agent
      await Promise.all([
        messageBus.send({
          from: 'aesthetic',
          to: 'compliance',
          type: 'REQUEST',
          payload: {
            type: 'AESTHETIC_PLAN',
            data: recommendations,
            requirements: {
              nonSurgical: recommendations.some((r: any) => r.type === 'non-surgical'),
              budget: userProfile.budgetMax,
            },
          },
        }),
        messageBus.send({
          from: 'aesthetic',
          to: 'communication',
          type: 'NOTIFY',
          payload: {
            type: 'TECHNICAL_TERMS',
            data: recommendations.map((r: any) => r.terms).flat(),
          },
        }),
      ]);
      
      messageBus.updateAgentStatus('aesthetic', 'DONE');
    }
  });

  // 3. Compliance Agent
  messageBus.registerAgent(AGENT_CONFIGS[2], async (msg: A2AMessage) => {
    if (msg.from === 'aesthetic' && msg.payload.type === 'AESTHETIC_PLAN') {
      messageBus.updateAgentStatus('compliance', 'BUSY');
      
      await delay(1500);
      
      // 验证机构和医生
      const institutions = await verifyInstitutions(msg.payload.requirements);
      
      // 通知 Negotiation Agent
      await messageBus.send({
        from: 'compliance',
        to: 'negotiation',
        type: 'NOTIFY',
        payload: {
          type: 'VERIFIED_INSTITUTIONS',
          data: institutions,
          note: `${institutions.length} institutions passed compliance check`,
        },
      });
      
      messageBus.updateAgentStatus('compliance', 'DONE');
    }
  });

  // 4. Communication Agent
  messageBus.registerAgent(AGENT_CONFIGS[3], async (msg: A2AMessage) => {
    if (msg.from === 'aesthetic' && msg.payload.type === 'TECHNICAL_TERMS') {
      messageBus.updateAgentStatus('communication', 'BUSY');
      
      await delay(1000);
      
      // 翻译术语，准备问题清单
      const communicationGuide = {
        glossary: translateTerms(msg.payload.data),
        keyQuestions: generateKeyQuestions(userProfile),
        talkingPoints: generateTalkingPoints(userProfile),
      };
      
      // 通知 Transaction Agent
      await messageBus.send({
        from: 'communication',
        to: 'transaction',
        type: 'NOTIFY',
        payload: {
          type: 'COMMUNICATION_GUIDE',
          data: communicationGuide,
        },
      });
      
      messageBus.updateAgentStatus('communication', 'DONE');
    }
  });

  // 5. Negotiation Agent
  messageBus.registerAgent(AGENT_CONFIGS[4], async (msg: A2AMessage) => {
    if (msg.from === 'compliance' && msg.payload.type === 'VERIFIED_INSTITUTIONS') {
      messageBus.updateAgentStatus('negotiation', 'BUSY');
      
      await delay(1500);
      
      // 分析价格，制定谈判策略
      const pricingStrategy = analyzePricing(
        msg.payload.data,
        userProfile.budgetMin,
        userProfile.budgetMax
      );
      
      // 通知 Transaction Agent
      await messageBus.send({
        from: 'negotiation',
        to: 'transaction',
        type: 'NOTIFY',
        payload: {
          type: 'PRICING_STRATEGY',
          data: pricingStrategy,
        },
      });
      
      messageBus.updateAgentStatus('negotiation', 'DONE');
    }
  });

  // 6. Transaction Agent - 协调者，汇总所有信息
  messageBus.registerAgent(AGENT_CONFIGS[5], async (msg: A2AMessage) => {
    const receivedData: any = {};
    
    if (msg.payload.type === 'COMMUNICATION_GUIDE') {
      receivedData.communication = msg.payload.data;
    }
    
    if (msg.payload.type === 'PRICING_STRATEGY') {
      receivedData.negotiation = msg.payload.data;
    }
    
    // 当收到所有必要信息后，生成最终报告
    if (receivedData.communication && receivedData.negotiation) {
      messageBus.updateAgentStatus('transaction', 'BUSY');
      
      await delay(1000);
      
      // 生成最终报告
      const finalReport = generateFinalReport(userProfile, receivedData);
      
      // 广播报告完成
      await messageBus.broadcast('transaction', {
        type: 'FINAL_REPORT',
        data: finalReport,
        timestamp: Date.now(),
      });
      
      messageBus.updateAgentStatus('transaction', 'DONE');
    }
  });
}

// 辅助函数
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function calculatePsychologyScore(profile: any): number {
  // 基于用户资料计算心理评分
  const baseScore = 85;
  const budgetFactor = profile.budgetMax > 10000 ? 5 : 0;
  return Math.min(95, baseScore + budgetFactor);
}

function analyzeMotivation(profile: any): string {
  if (profile.beautyGoals?.includes('改善') || profile.beautyGoals?.includes('提升')) {
    return '自我提升驱动';
  }
  return '外在压力驱动';
}

function generateAestheticRecommendations(profile: any, psychologyData: any): any[] {
  const recommendations = [];
  
  if (profile.beautyGoals?.includes('面部')) {
    recommendations.push({
      type: 'non-surgical',
      name: '玻尿酸填充',
      priority: 'high',
      terms: ['玻尿酸', '填充', '透明质酸'],
    });
  }
  
  if (profile.budgetMax > 15000) {
    recommendations.push({
      type: 'surgical',
      name: '脂肪填充',
      priority: 'medium',
      terms: ['自体脂肪', '脂肪移植', '存活率'],
    });
  }
  
  return recommendations;
}

async function verifyInstitutions(requirements: any): Promise<any[]> {
  // 模拟机构验证
  return [
    { name: '斐缦医美', score: 95, verified: true },
    { name: '美莱医疗', score: 88, verified: true },
    { name: '艺星整形', score: 82, verified: true },
  ];
}

function translateTerms(terms: string[]): any[] {
  const glossary: Record<string, string> = {
    '玻尿酸': '透明质酸，一种天然存在于人体的保湿成分',
    '脂肪移植': '将身体其他部位的脂肪抽取后注射到面部',
    '存活率': '移植后存活的脂肪细胞比例，通常50-70%',
  };
  
  return terms.map(term => ({
    term,
    explanation: glossary[term] || '专业医美术语',
  }));
}

function generateKeyQuestions(profile: any): string[] {
  return [
    '手术的具体流程和恢复周期是多久？',
    '可能出现的并发症有哪些？如何预防？',
    '如果效果不满意，有什么补救措施？',
    '医生的执业年限和类似案例有多少？',
    '价格包含哪些项目？是否有隐藏费用？',
  ];
}

function generateTalkingPoints(profile: any): string[] {
  return [
    '强调自然效果，避免过度填充',
    '询问术后护理和随访服务',
    '了解机构的应急处理流程',
  ];
}

function analyzePricing(institutions: any[], budgetMin: number, budgetMax: number): any {
  const avgPrice = (budgetMin + budgetMax) / 2;
  
  return {
    marketPrice: Math.round(avgPrice * 1.2),
    reasonablePrice: Math.round(avgPrice),
    targetPrice: Math.round(avgPrice * 0.85),
    institutions: institutions.map((inst: any) => ({
      ...inst,
      estimatedPrice: Math.round(avgPrice * (0.9 + Math.random() * 0.2)),
    })),
    negotiationTips: [
      '选择淡季预约，通常有8-9折优惠',
      '询问老客户推荐优惠',
      '要求明确列出所有费用',
    ],
  };
}

function generateFinalReport(profile: any, data: any): any {
  return {
    userProfile: profile,
    communication: data.communication,
    negotiation: data.negotiation,
    generatedAt: new Date().toISOString(),
    confidence: 92,
    recommendation: 'PROCEED',
  };
}
