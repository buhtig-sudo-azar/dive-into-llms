'use client';

import { useChatStore } from '@/store/chat-store';
import { useNavigationStore } from '@/store/navigation-store';
import { chatPrompts } from '@/data/chat-prompts';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { X, BotIcon, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useEffect } from 'react';

export function ChatPanel({ isMobile = false }: { isMobile?: boolean }) {
  const { messages, isLoading, activeCategory } = useChatStore();
  const { setChatOpen } = useNavigationStore();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const systemPrompt = activeCategory ? chatPrompts[activeCategory] || '' : '';
  const categoryNames: Record<string, string> = {
    'llm-basics': 'Основы LLM',
    'prompt-engineering': 'Prompt Engineering',
    'context-engineering': 'Context Engineering',
    'mcp': 'MCP',
    'rag': 'RAG',
    'ai-agents': 'AI Agents',
    'local-ai': 'Local AI',
    'production-ai': 'Production AI',
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center gap-2 p-3 border-b border-border shrink-0">
        <BotIcon className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium flex-1">
          {activeCategory ? `${categoryNames[activeCategory] || 'AI'} Наставник` : 'AI Наставник'}
        </span>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setChatOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages - using plain div with overflow for reliable scrolling */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-3 min-h-0"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8 px-4">
            <div className="p-3 rounded-full bg-primary/10 mb-3">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm font-medium mb-1">AI-наставник</p>
            <p className="text-xs text-muted-foreground">
              Задайте вопрос по теме{' '}
              {activeCategory ? categoryNames[activeCategory] : ''}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
                <BotIcon className="h-4 w-4" />
                <span>Думаю...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput systemPrompt={systemPrompt} />
    </div>
  );
}
