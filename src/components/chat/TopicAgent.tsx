'use client';

import { useNavigationStore } from '@/store/navigation-store';
import { useChatStore } from '@/store/chat-store';
import { agents } from '@/data/agent-data';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export function TopicAgent() {
  const currentView = useNavigationStore(s => s.currentView);
  const currentCategory = useNavigationStore(s => s.currentCategory);
  const chatOpen = useNavigationStore(s => s.chatOpen);
  const { setActiveCategory } = useChatStore();
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasAppeared, setHasAppeared] = useState(false);

  const isVisible = currentView !== 'home' && currentCategory;
  const agent = currentCategory ? agents[currentCategory] : null;

  // Появление агента с задержкой после навигации
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setHasAppeared(true), 800);
      return () => clearTimeout(timer);
    } else {
      setHasAppeared(false);
    }
  }, [isVisible, currentCategory]);

  // Подсказка при первом появлении
  useEffect(() => {
    if (hasAppeared && !chatOpen) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 4000);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hasAppeared, chatOpen, currentCategory]);

  if (!agent || !hasAppeared || chatOpen) return null;

  const handleAgentClick = () => {
    setActiveCategory(currentCategory);
    useNavigationStore.getState().setChatOpen(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-300">
      {/* Тултип с именем агента */}
      {showTooltip && (
        <div className="hidden sm:block mb-2 bg-popover border border-border rounded-xl px-4 py-3 shadow-lg max-w-[200px] animate-in fade-in slide-in-from-right-2 duration-200">
          <p className="text-sm font-semibold text-foreground">{agent.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{agent.role}</p>
          <p className="text-xs text-muted-foreground mt-1">Нажми, чтобы спросить!</p>
        </div>
      )}

      {/* Кнопка-аватар агента */}
      <button
        onClick={handleAgentClick}
        className="group relative focus:outline-none"
        aria-label={`Открыть чат с ${agent.name}`}
      >
        {/* Пульсирующее свечение */}
        <span className={`absolute inset-0 rounded-full bg-gradient-to-br ${agent.gradient} opacity-30 animate-pulse`} />

        {/* Кольцо вокруг аватара */}
        <span className={`absolute -inset-1 rounded-full bg-gradient-to-br ${agent.gradient} opacity-40 group-hover:opacity-70 transition-opacity`} />

        {/* Аватар */}
        <span className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-background shadow-lg">
          <Image
            src={agent.avatar}
            alt={agent.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </span>

        {/* Индикатор онлайн */}
        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
      </button>
    </div>
  );
}
