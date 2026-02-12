'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { A2ACoordinator } from '@/lib/a2a/coordinator';
import { A2AMessage, Agent } from '@/lib/a2a/bus';
import { AGENT_CONFIGS } from '@/lib/a2a/agents';

// Agent 可视化配置
const AGENT_VISUALS = [
  { icon: '🧠', color: '#B8A8D6', cnName: '心理 Agent' },
  { icon: '✨', color: '#E8B8C8', cnName: '审美 Agent' },
  { icon: '✅', color: '#A8C5A0', cnName: '合规 Agent' },
  { icon: '💬', color: '#8AAED6', cnName: '沟通 Agent' },
  { icon: '⚖️', color: '#E8B86D', cnName: '博弈 Agent' },
  { icon: '🤝', color: '#C9A88A', cnName: '成交 Agent' },
];

export default function LoadingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Initializing A2A protocol...');
  const [messages, setMessages] = useState<A2AMessage[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [currentAgent, setCurrentAgent] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // 启动 A2A 工作流
  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('growthMatrixFormData') || '{}');
    
    const coordinator = new A2ACoordinator(
      userProfile,
      (prog, msg) => {
        setProgress(prog);
        setStatusMessage(msg);
        
        // 更新当前 Agent
        const activeIndex = Math.floor((prog / 100) * 6);
        setCurrentAgent(Math.min(activeIndex, 5));
      },
      (msg) => {
        setMessages(prev => [...prev, msg]);
      }
    );

    coordinator.start().then(() => {
      setIsComplete(true);
      setTimeout(() => {
        router.push('/report');
      }, 2000);
    });

    // 定期更新 Agent 状态
    const interval = setInterval(() => {
      setAgents(coordinator.getAgentStatuses());
    }, 500);

    return () => clearInterval(interval);
  }, [router]);

  // 获取 Agent 状态
  const getAgentStatus = (agentId: string) => {
    return agents.find(a => a.id === agentId)?.status || 'IDLE';
  };

  // 过滤显示最近的消息
  const recentMessages = messages.slice(-6);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FBF9F6] to-[#F5F2ED] flex items-center justify-center p-6">
      <div className="max-w-5xl w-full">
        {/* 标题区域 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-text-secondary font-medium">A2A Protocol Active</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading mb-3">
            Six Agents Collaborating
          </h1>
          <p className="text-lg text-text-secondary">
            Real-time Agent-to-Agent communication in progress
          </p>
        </div>

        {/* Agent 矩阵 + 消息流 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* 左侧：Agent 状态 */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">
              Agent Status
            </h3>
            <div className="space-y-3">
              {AGENT_CONFIGS.map((agent, index) => {
                const status = getAgentStatus(agent.id);
                const visual = AGENT_VISUALS[index];
                const isActive = status === 'BUSY';
                const isDone = status === 'DONE';

                return (
                  <div
                    key={agent.id}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isActive ? 'bg-gray-50 ring-2' : isDone ? 'bg-green-50' : 'bg-gray-50/50'
                    }`}
                    style={{ ['--tw-ring-color' as string]: isActive ? visual.color : undefined }}
                  >
                    {/* Agent 图标 */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all ${
                        isActive ? 'animate-pulse' : ''
                      }`}
                      style={{ backgroundColor: isDone ? '#A8C5A0' : isActive ? visual.color : '#E5E5E5' }}
                    >
                      {isDone ? '✓' : visual.icon}
                    </div>

                    {/* Agent 信息 */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{visual.cnName}</span>
                        <span className="text-xs text-text-secondary">{agent.name}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          status === 'DONE' ? 'bg-green-100 text-green-700' :
                          status === 'BUSY' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {status === 'DONE' ? 'Completed' :
                           status === 'BUSY' ? 'Processing' :
                           status === 'IDLE' ? 'Waiting' : 'Ready'}
                        </span>
                      </div>
                    </div>

                    {/* 状态指示器 */}
                    {isActive && (
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ color: visual.color }} />
                        <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ color: visual.color, animationDelay: '0.1s' }} />
                        <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ color: visual.color, animationDelay: '0.2s' }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 右侧：A2A 消息流 */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">
              A2A Message Stream
            </h3>
            <div className="space-y-2 h-[320px] overflow-y-auto">
              {recentMessages.length === 0 ? (
                <div className="text-center text-text-secondary py-10">
                  <div className="text-4xl mb-2">📡</div>
                  <p className="text-sm">Waiting for messages...</p>
                </div>
              ) : (
                recentMessages.map((msg, i) => (
                  <div
                    key={msg.id}
                    className="flex items-start gap-2 p-2 rounded-lg bg-gray-50 animate-fade-in text-sm"
                  >
                    {/* 发送者 */}
                    <div className="flex items-center gap-1 shrink-0">
                      {msg.from !== 'coordinator' && (
                        <span 
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                          style={{ 
                            backgroundColor: AGENT_VISUALS.find((_, idx) => 
                              AGENT_CONFIGS[idx]?.id === msg.from
                            )?.color || '#E5E5E5'
                          }}
                        >
                          {AGENT_VISUALS.find((_, idx) => 
                            AGENT_CONFIGS[idx]?.id === msg.from
                          )?.icon || 'C'}
                        </span>
                      )}
                      <span className="text-xs font-medium text-gray-500">
                        {msg.from === 'coordinator' ? 'Coordinator' : msg.from}
                      </span>
                    </div>

                    {/* 箭头 */}
                    <span className="text-gray-400">→</span>

                    {/* 接收者 */}
                    <div className="flex items-center gap-1 shrink-0">
                      {msg.to !== 'BROADCAST' && msg.to !== 'coordinator' && (
                        <span 
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                          style={{ 
                            backgroundColor: AGENT_VISUALS.find((_, idx) => 
                              AGENT_CONFIGS[idx]?.id === msg.to
                            )?.color || '#E5E5E5'
                          }}
                        >
                          {AGENT_VISUALS.find((_, idx) => 
                            AGENT_CONFIGS[idx]?.id === msg.to
                          )?.icon || '?'}
                        </span>
                      )}
                      <span className="text-xs font-medium text-gray-500">
                        {msg.to === 'BROADCAST' ? 'All' : msg.to}
                      </span>
                    </div>

                    {/* 消息内容 */}
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-gray-400">[{msg.type}]</span>
                      <span className="text-gray-700 ml-1 truncate block">
                        {msg.payload?.type || 'Message'}
                      </span>
                    </div>
                  </div>
                ))
              )}
              {/* 自动滚动到底部 */}
              <div id="messages-end" />
            </div>
          </div>
        </div>

        {/* 进度条 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-text-secondary">Workflow Progress</span>
              <span className="text-xs text-gray-400">{statusMessage}</span>
            </div>
            <span className="text-3xl font-bold" style={{ 
              color: AGENT_VISUALS[Math.min(currentAgent, 5)]?.color || '#E8D5C4'
            }}>
              {progress}%
            </span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${AGENT_VISUALS.map(a => a.color).join(', ')})`
              }}
            />
          </div>
          
          {/* 完成提示 */}
          {isComplete && (
            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                <span className="text-xl">✓</span>
                A2A Workflow Complete! Redirecting to report...
              </span>
            </div>
          )}
        </div>

        {/* 底部说明 */}
        <div className="text-center mt-8 text-text-secondary text-sm">
          <p className="font-medium mb-1">Powered by SecondMe A2A Protocol</p>
          <p className="text-xs opacity-70">
            Six specialized agents communicate through message bus to collaboratively generate your assessment
          </p>
        </div>
      </div>
    </main>
  );
}
