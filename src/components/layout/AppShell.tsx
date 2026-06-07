'use client';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Breadcrumbs } from './Breadcrumbs';
import { Footer } from './Footer';
import { useNavigationStore } from '@/store/navigation-store';
import { HomeView } from '@/components/home/HomeView';
import { CategoryView } from '@/components/content/CategoryView';
import { TopicView } from '@/components/content/TopicView';
import { AgentChatPopup } from '@/components/chat/AgentChatPopup';
import { SearchDialog } from '@/components/search/SearchDialog';
import { FloatingDock } from './FloatingDock';
import { useEffect, useRef } from 'react';

export function AppShell() {
  const currentView = useNavigationStore(s => s.currentView);
  const currentCategory = useNavigationStore(s => s.currentCategory);
  const currentSubtopic = useNavigationStore(s => s.currentSubtopic);
  const mainRef = useRef<HTMLElement | null>(null);

  // Автопрокрутка наверх при любой навигации
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentView, currentCategory, currentSubtopic]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main ref={mainRef} className="flex-1 overflow-y-auto flex flex-col min-w-0">
          <Breadcrumbs />
          <div className="flex-1">
            {currentView === 'home' && <HomeView />}
            {currentView === 'category' && <CategoryView />}
            {currentView === 'subtopic' && <TopicView />}
          </div>
          <Footer />
        </main>
      </div>

      {/* Плавающий док: агент + стрелка «Наверх» — обтекают друг друга */}
      <FloatingDock />

      {/* Всплывающее окно чата с агентом */}
      <AgentChatPopup />

      <SearchDialog />
    </div>
  );
}
