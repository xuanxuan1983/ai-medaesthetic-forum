// A2A Message Bus - Agent 间消息总线
// 实现真正的 Agent-to-Agent 通信

export interface A2AMessage {
  id: string;
  from: string;
  to: string;
  type: 'REQUEST' | 'RESPONSE' | 'NOTIFY' | 'DELEGATE';
  payload: any;
  timestamp: number;
  correlationId?: string; // 用于关联请求和响应
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  capabilities: string[];
  status: 'IDLE' | 'BUSY' | 'DONE' | 'ERROR';
}

export type MessageHandler = (message: A2AMessage) => Promise<void> | void;

export class A2AMessageBus {
  private agents: Map<string, Agent> = new Map();
  private handlers: Map<string, MessageHandler> = new Map();
  private messageHistory: A2AMessage[] = [];
  private subscribers: ((message: A2AMessage) => void)[] = [];

  // 注册 Agent
  registerAgent(agent: Agent, handler: MessageHandler): void {
    this.agents.set(agent.id, agent);
    this.handlers.set(agent.id, handler);
    console.log(`[A2A Bus] Agent registered: ${agent.name} (${agent.id})`);
  }

  // 发送消息
  async send(message: Omit<A2AMessage, 'id' | 'timestamp'>): Promise<void> {
    const fullMessage: A2AMessage = {
      ...message,
      id: this.generateId(),
      timestamp: Date.now(),
    };

    this.messageHistory.push(fullMessage);
    
    // 通知订阅者（用于 UI 展示）
    this.subscribers.forEach(cb => cb(fullMessage));

    console.log(`[A2A Bus] Message from ${message.from} to ${message.to}: ${message.type}`);

    // 如果是指定 Agent，调用其 handler
    if (message.to !== 'BROADCAST' && this.handlers.has(message.to)) {
      const handler = this.handlers.get(message.to)!;
      await handler(fullMessage);
    }
  }

  // 广播消息
  async broadcast(from: string, payload: any): Promise<void> {
    const message: A2AMessage = {
      id: this.generateId(),
      from,
      to: 'BROADCAST',
      type: 'NOTIFY',
      payload,
      timestamp: Date.now(),
    };

    this.messageHistory.push(message);
    this.subscribers.forEach(cb => cb(message));

    // 通知所有 Agent
    for (const [agentId, handler] of this.handlers) {
      if (agentId !== from) {
        await handler(message);
      }
    }
  }

  // 订阅消息（用于 UI 更新）
  subscribe(callback: (message: A2AMessage) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  // 获取消息历史
  getMessageHistory(): A2AMessage[] {
    return [...this.messageHistory];
  }

  // 获取 Agent 列表
  getAgents(): Agent[] {
    return Array.from(this.agents.values());
  }

  // 更新 Agent 状态
  updateAgentStatus(agentId: string, status: Agent['status']): void {
    const agent = this.agents.get(agentId);
    if (agent) {
      agent.status = status;
      console.log(`[A2A Bus] Agent ${agentId} status: ${status}`);
    }
  }

  private generateId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// 单例模式
export const messageBus = new A2AMessageBus();
