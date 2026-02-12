// A2A Coordinator - Agent 协调器
// 管理工作流，确保 Agent 按正确顺序协作

import { messageBus, A2AMessage, Agent } from './bus';
import { AGENT_CONFIGS, initializeAgents } from './agents';

export interface WorkflowStep {
  agentId: string;
  dependencies: string[]; // 依赖的前置 Agent
  timeout: number;
}

export interface Workflow {
  id: string;
  name: string;
  steps: WorkflowStep[];
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
}

export class A2ACoordinator {
  private workflow: Workflow;
  private completedAgents: Set<string> = new Set();
  private onProgress: (progress: number, message: string) => void;
  private onMessage: (message: A2AMessage) => void;

  constructor(
    userProfile: any,
    onProgress: (progress: number, message: string) => void,
    onMessage: (message: A2AMessage) => void
  ) {
    this.onProgress = onProgress;
    this.onMessage = onMessage;

    // 定义工作流：六大 Agent 协作顺序
    this.workflow = {
      id: `workflow_${Date.now()}`,
      name: 'Beauty Assessment Workflow',
      status: 'PENDING',
      steps: [
        { agentId: 'psychology', dependencies: [], timeout: 5000 },
        { agentId: 'aesthetic', dependencies: ['psychology'], timeout: 5000 },
        { 
          agentId: 'compliance', 
          dependencies: ['aesthetic'], 
          timeout: 5000 
        },
        { 
          agentId: 'communication', 
          dependencies: ['aesthetic'], 
          timeout: 5000 
        },
        { 
          agentId: 'negotiation', 
          dependencies: ['compliance'], 
          timeout: 5000 
        },
        { 
          agentId: 'transaction', 
          dependencies: ['communication', 'negotiation'], 
          timeout: 5000 
        },
      ],
    };

    // 初始化所有 Agent
    initializeAgents(userProfile);

    // 订阅消息
    messageBus.subscribe((msg) => {
      this.onMessage(msg);
      this.handleMessage(msg);
    });
  }

  // 启动工作流
  async start(): Promise<void> {
    this.workflow.status = 'RUNNING';
    this.onProgress(0, 'Starting A2A workflow...');

    // 触发第一个 Agent
    await this.triggerAgent('psychology', {
      type: 'START_ASSESSMENT',
      userProfile: this.getUserProfile(),
    });

    // 等待所有 Agent 完成
    await this.waitForCompletion();
  }

  // 触发指定 Agent
  private async triggerAgent(agentId: string, payload: any): Promise<void> {
    const step = this.workflow.steps.find(s => s.agentId === agentId);
    if (!step) return;

    // 检查依赖是否满足
    const depsSatisfied = step.dependencies.every(dep => 
      this.completedAgents.has(dep)
    );

    if (!depsSatisfied) {
      console.log(`[Coordinator] Agent ${agentId} waiting for dependencies`);
      return;
    }

    this.onProgress(
      this.calculateProgress(),
      `Activating ${AGENT_CONFIGS.find(a => a.id === agentId)?.name}...`
    );

    // 发送消息给目标 Agent
    await messageBus.send({
      from: 'coordinator',
      to: agentId,
      type: 'REQUEST',
      payload,
    });
  }

  // 处理 Agent 消息
  private handleMessage(msg: A2AMessage): void {
    // 检查是否是 Agent 完成工作的消息
    if (msg.type === 'NOTIFY' || msg.type === 'RESPONSE') {
      const agentId = msg.from;
      
      if (AGENT_CONFIGS.some(a => a.id === agentId)) {
        this.completedAgents.add(agentId);
        
        this.onProgress(
          this.calculateProgress(),
          `${AGENT_CONFIGS.find(a => a.id === agentId)?.name} completed`
        );

        // 触发下一个 Agent
        this.triggerNextAgents(agentId);
      }
    }

    // 检查是否收到最终报告
    if (msg.payload?.type === 'FINAL_REPORT') {
      this.workflow.status = 'COMPLETED';
      this.onProgress(100, 'Assessment complete!');
    }
  }

  // 触发下一个 Agent
  private triggerNextAgents(completedAgentId: string): void {
    const nextSteps = this.workflow.steps.filter(step =>
      step.dependencies.includes(completedAgentId) &&
      !this.completedAgents.has(step.agentId)
    );

    nextSteps.forEach(step => {
      this.triggerAgent(step.agentId, {
        type: 'CONTINUE_ASSESSMENT',
        fromAgent: completedAgentId,
      });
    });
  }

  // 等待完成
  private async waitForCompletion(): Promise<void> {
    const maxWait = 60000; // 最大等待60秒
    const startTime = Date.now();

    while (this.workflow.status === 'RUNNING') {
      if (Date.now() - startTime > maxWait) {
        this.workflow.status = 'FAILED';
        throw new Error('Workflow timeout');
      }

      // 检查是否所有 Agent 都完成了
      const allCompleted = this.workflow.steps.every(step =>
        this.completedAgents.has(step.agentId)
      );

      if (allCompleted) {
        this.workflow.status = 'COMPLETED';
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // 计算进度
  private calculateProgress(): number {
    const total = this.workflow.steps.length;
    const completed = this.completedAgents.size;
    return Math.round((completed / total) * 100);
  }

  // 获取用户资料
  private getUserProfile(): any {
    // 从 localStorage 读取
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('growthMatrixFormData');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  }

  // 获取 Agent 状态
  getAgentStatuses(): Agent[] {
    return messageBus.getAgents();
  }

  // 获取消息历史
  getMessageHistory(): A2AMessage[] {
    return messageBus.getMessageHistory();
  }
}
