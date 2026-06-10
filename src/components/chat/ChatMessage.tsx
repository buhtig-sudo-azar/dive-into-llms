'use client';

import { ChatMessage as ChatMessageType } from '@/types';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChatStore } from '@/store/chat-store';
import { agents } from '@/data/agent-data';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import Image from 'next/image';

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === 'user';
  const { activeCategory, isLoading } = useChatStore();
  const agent = activeCategory ? agents[activeCategory] : null;

  const isLastAssistantMessage = !isUser && isLoading;

  return (
    <div className={cn('flex gap-2 animate-message-in', isUser && 'flex-row-reverse')}>
      <div className={cn(
        'shrink-0 w-7 h-7 rounded-full flex items-center justify-center overflow-hidden',
        isUser ? 'bg-primary text-primary-foreground' : 'border border-border'
      )}>
        {isUser ? (
          <User className="h-3.5 w-3.5" />
        ) : agent ? (
          <Image
            src={agent.avatar}
            alt={agent.name}
            width={28}
            height={28}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs">🤖</span>
        )}
      </div>
      <div className={cn(
        'flex-1 min-w-0 rounded-lg px-4 py-2.5',
        isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
      )}>
        {isUser ? (
          <div className="whitespace-pre-wrap break-words leading-relaxed text-base">
            {message.content}
          </div>
        ) : (
          <MarkdownRenderer
            content={message.content}
            streaming={isLastAssistantMessage}
          />
        )}
      </div>
    </div>
  );
}
