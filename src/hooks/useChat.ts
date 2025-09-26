import { useState, useCallback, useMemo } from 'react';
import { ChatMessage } from '@/types';
import { formatCurrentTime } from '@/utils/time';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    type: 'tutor',
    content: "Hello! I'm Aku, your AI tutor. I'm here to help you learn and grow. What subject would you like to work on today?",
    timestamp: '10:30 AM'
  },
  {
    id: '2',
    type: 'user',
    content: "Hi Aku! I need help with mathematics, specifically algebra.",
    timestamp: '10:31 AM'
  },
  {
    id: '3',
    type: 'tutor',
    content: "Great choice! Algebra is fundamental to mathematics. Let's start with linear equations. Can you tell me what you already know about solving for x in equations like 2x + 5 = 15?",
    timestamp: '10:31 AM'
  }
];

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);

  const formatTime = useCallback(() => formatCurrentTime(), []);

  const sendMessage = useCallback((content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: formatTime()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate tutor response
    setTimeout(() => {
      const tutorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'tutor',
        content: "I understand you're working on that topic. Let me help you break it down step by step...",
        timestamp: formatTime()
      };
      setMessages(prev => [...prev, tutorResponse]);
      setIsTyping(false);
    }, 1000);
  }, [formatTime]);

  const clearChat = useCallback(() => {
    setMessages(INITIAL_MESSAGES);
  }, []);

  const chatSummary = useMemo(() => ({
    totalMessages: messages.length,
    userMessages: messages.filter(m => m.type === 'user').length,
    tutorMessages: messages.filter(m => m.type === 'tutor').length
  }), [messages]);

  return {
    messages,
    isTyping,
    sendMessage,
    clearChat,
    chatSummary
  };
};