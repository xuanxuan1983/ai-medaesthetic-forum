'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { A2ACoordinator } from './coordinator';
import { A2AMessage, Agent } from './bus';

export interface A2AState {
  progress: number;
  statusMessage: string;
  messages: A2AMessage[];
  agents: Agent[];
  isComplete: boolean;
  isRunning: boolean;
}

export function useA2AWorkflow(userProfile: any) {
  const [state, setState] = useState<A2AState>({
    progress: 0,
    statusMessage: 'Initializing A2A protocol...',
    messages: [],
    agents: [],
    isComplete: false,
    isRunning: false,
  });

  const coordinatorRef = useRef<A2ACoordinator | null>(null);

  const startWorkflow = useCallback(async () => {
    if (coordinatorRef.current) return;

    setState(prev => ({ ...prev, isRunning: true }));

    // 创建协调器
    coordinatorRef.current = new A2ACoordinator(
      userProfile,
      (progress, statusMessage) => {
        setState(prev => ({
          ...prev,
          progress,
          statusMessage,
        }));
      },
      (message) => {
        setState(prev => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
    );

    // 启动工作流
    try {
      await coordinatorRef.current.start();
      setState(prev => ({
        ...prev,
        isComplete: true,
        isRunning: false,
        progress: 100,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isRunning: false,
        statusMessage: 'Workflow failed',
      }));
    }
  }, [userProfile]);

  // 获取 Agent 状态
  useEffect(() => {
    if (!state.isRunning || !coordinatorRef.current) return;

    const interval = setInterval(() => {
      const agents = coordinatorRef.current?.getAgentStatuses() || [];
      setState(prev => ({ ...prev, agents }));
    }, 500);

    return () => clearInterval(interval);
  }, [state.isRunning]);

  return {
    ...state,
    startWorkflow,
  };
}
