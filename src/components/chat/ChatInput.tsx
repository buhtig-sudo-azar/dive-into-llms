'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChatStore } from '@/store/chat-store';
import { useModelStore } from '@/store/model-store';

export function ChatInput({ systemPrompt }: { systemPrompt: string }) {
  const [input, setInput] = useState('');
  const { addMessage, appendToLastMessage, setLoading, isLoading, messages } = useChatStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const currentModel = useModelStore((s) => s.currentModel);

  const handleSubmit = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    setInput('');
    addMessage({ role: 'user', content: text });

    setLoading(true);

    try {
      const chatMessages = [...messages, { role: 'user' as const, content: text }].map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatMessages, systemPrompt, model: currentModel }),
      });

      if (!response.ok) {
        addMessage({ role: 'assistant', content: 'Ошибка при обращении к AI. Попробуйте ещё раз.' });
        setLoading(false);
        return;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        addMessage({ role: 'assistant', content: 'Ошибка: нет потока данных.' });
        setLoading(false);
        return;
      }

      // Add empty assistant message
      addMessage({ role: 'assistant', content: '' });

      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                fullContent += content;
                appendToLastMessage(content);
              }
            } catch {
              // skip non-JSON lines
            }
          }
        }
      }

      if (!fullContent) {
        appendToLastMessage('Не удалось получить ответ. Попробуйте ещё раз.');
      }
    } catch (error) {
      addMessage({ role: 'assistant', content: 'Произошла ошибка сети. Проверьте подключение.' });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-3 border-t border-border">
      <div className="flex gap-2">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Задайте вопрос..."
          className="min-h-[42px] max-h-24 resize-none text-base"
          rows={1}
          disabled={isLoading}
        />
        <Button
          size="icon"
          onClick={handleSubmit}
          disabled={isLoading || !input.trim()}
          className="shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
