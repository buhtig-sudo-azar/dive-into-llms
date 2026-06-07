'use client';

import { useChatStore } from '@/store/chat-store';
import { useNavigationStore } from '@/store/navigation-store';
import { chatPrompts } from '@/data/chat-prompts';
import { agents } from '@/data/agent-data';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { X, Minimize2, Maximize2, Shrink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

export function AgentChatPopup() {
  const { messages, isLoading, activeCategory, setActiveCategory, clearMessages } = useChatStore();
  const { chatOpen, setChatOpen, currentCategory } = useNavigationStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const agent = activeCategory ? agents[activeCategory] : (currentCategory ? agents[currentCategory] : null);
  const systemPrompt = activeCategory ? chatPrompts[activeCategory] || '' : '';

  // ВСЕ хуки вызываются ДО любого условного return!

  // Обновлять activeCategory при смене темы, пока чат открыт
  useEffect(() => {
    if (chatOpen && currentCategory && currentCategory !== activeCategory) {
      // Используем setTimeout чтобы избежать "Cannot update component during render"
      const timer = setTimeout(() => {
        setActiveCategory(currentCategory);
        clearMessages();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [chatOpen, currentCategory, activeCategory, setActiveCategory, clearMessages]);

  // Автопрокрутка при новых сообщениях
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleClose = useCallback(() => {
    setChatOpen(false);
    setIsMinimized(false);
    clearMessages();
  }, [setChatOpen, clearMessages]);

  const handleMinimize = useCallback(() => {
    setIsMinimized(true);
  }, []);

  const handleRestore = useCallback(() => {
    setIsMinimized(false);
  }, []);

  const handleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  // Ранний return ПОСЛЕ всех хуков
  if (!chatOpen || !agent) return null;

  return (
    <>
      {/* Минимизированная версия — маленький аватар */}
      {isMinimized && (
        <div
          className="fixed bottom-24 right-6 z-50 animate-in fade-in zoom-in-95 duration-200"
        >
          <button
            onClick={handleRestore}
            className="group relative focus:outline-none"
          >
            <span className={`absolute -inset-1 rounded-full bg-gradient-to-br ${agent.gradient} opacity-50 group-hover:opacity-80 transition-opacity`} />
            <span className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-background shadow-lg">
              <Image
                src={agent.avatar}
                alt={agent.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </span>
            {/* Уведомление о количестве сообщений */}
            {messages.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-bold">
                {messages.length}
              </span>
            )}
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
          </button>
        </div>
      )}

      {/* Полное окно чата */}
      {!isMinimized && (
        <div
          className={`
            fixed z-50 flex flex-col
            bg-background border border-border shadow-2xl rounded-2xl overflow-hidden
            transition-all duration-300 ease-in-out
            ${isExpanded
              ? 'sm:bottom-6 sm:right-6 sm:top-6 sm:w-[calc(100vw-3rem)] sm:max-h-[calc(100vh-3rem)] max-sm:inset-3 max-sm:max-h-[calc(100vh-1.5rem)]'
              : 'sm:bottom-24 sm:right-6 sm:w-[420px] sm:max-h-[600px] max-sm:inset-x-3 max-sm:bottom-24 max-sm:top-auto max-sm:max-h-[75vh]'
            }
            animate-in slide-in-from-bottom-4 fade-in duration-200
          `}
        >
          {/* Заголовок чата с аватаром агента */}
          <div className={`relative flex items-center gap-3 px-4 py-3 border-b border-border`}>
            {/* Градиентный фон заголовка */}
            <div className={`absolute inset-0 bg-gradient-to-r ${agent.gradient} opacity-[0.08]`} />
            <div className="relative flex items-center gap-3 w-full">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 shadow-sm flex-shrink-0">
                <Image
                  src={agent.avatar}
                  alt={agent.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-foreground truncate">{agent.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{agent.role}</p>
              </div>
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 hover:bg-muted"
                  onClick={handleExpand}
                  aria-label={isExpanded ? 'Свернуть окно' : 'Развернуть окно'}
                >
                  {isExpanded ? <Shrink className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 hover:bg-muted"
                  onClick={handleMinimize}
                  aria-label="Свернуть в аватар"
                >
                  <Minimize2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 hover:bg-muted"
                  onClick={handleClose}
                  aria-label="Закрыть чат"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Область сообщений */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-3 min-h-0"
          >
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 shadow-md mb-3">
                  <Image
                    src={agent.avatar}
                    alt={agent.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <p className="text-base font-semibold">{agent.name}</p>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed max-w-[280px] mb-4">
                  {agent.greeting}
                </p>
                <div className="w-full max-w-[280px] space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Попробуйте спросить</p>
                  {agent.suggestions?.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const store = useChatStore.getState();
                        store.addMessage({ role: 'user', content: s });
                      }}
                      className="w-full text-left text-sm px-3 py-2 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors text-muted-foreground hover:text-foreground"
                    >
                      {s}
                    </button>
                  )) || (
                    <>
                      <button
                        onClick={() => useChatStore.getState().addMessage({ role: 'user', content: 'Объясни простыми словами' })}
                        className="w-full text-left text-sm px-3 py-2 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors text-muted-foreground hover:text-foreground"
                      >
                        Объясни простыми словами
                      </button>
                      <button
                        onClick={() => useChatStore.getState().addMessage({ role: 'user', content: 'Приведи пример' })}
                        className="w-full text-left text-sm px-3 py-2 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors text-muted-foreground hover:text-foreground"
                      >
                        Приведи пример
                      </button>
                      <button
                        onClick={() => useChatStore.getState().addMessage({ role: 'user', content: 'Что это и зачем нужно?' })}
                        className="w-full text-left text-sm px-3 py-2 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors text-muted-foreground hover:text-foreground"
                      >
                        Что это и зачем нужно?
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-border flex-shrink-0">
                      <Image
                        src={agent.avatar}
                        alt={agent.name}
                        width={24}
                        height={24}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-base">Думаю...</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Поле ввода */}
          <ChatInput systemPrompt={systemPrompt} />
        </div>
      )}
    </>
  );
}
