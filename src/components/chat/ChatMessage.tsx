'use client';

import { ChatMessage as ChatMessageType } from '@/types';
import { BotIcon, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex gap-2 animate-message-in', isUser && 'flex-row-reverse')}>
      <div className={cn(
        'shrink-0 w-7 h-7 rounded-full flex items-center justify-center',
        isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
      )}>
        {isUser ? <User className="h-3.5 w-3.5" /> : <BotIcon className="h-3.5 w-3.5" />}
      </div>
      <div className={cn(
        'flex-1 min-w-0 rounded-lg px-3 py-2 text-sm',
        isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
      )}>
        <div className="prose prose-xs dark:prose-invert max-w-none break-words [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
