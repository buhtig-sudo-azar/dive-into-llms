'use client';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Breadcrumbs } from './Breadcrumbs';
import { Footer } from './Footer';
import { useNavigationStore } from '@/store/navigation-store';
import { HomeView } from '@/components/home/HomeView';
import { CategoryView } from '@/components/content/CategoryView';
import { TopicView } from '@/components/content/TopicView';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { SearchDialog } from '@/components/search/SearchDialog';

export function AppShell() {
  const currentView = useNavigationStore(s => s.currentView);
  const chatOpen = useNavigationStore(s => s.chatOpen);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto flex flex-col">
            <Breadcrumbs />
            <div className="flex-1">
              {currentView === 'home' && <HomeView />}
              {currentView === 'category' && <CategoryView />}
              {currentView === 'subtopic' && <TopicView />}
            </div>
            <Footer />
          </main>

          {/* Chat panel - desktop only */}
          {chatOpen && (
            <div className="hidden md:flex w-80 lg:w-96 border-l border-border flex-shrink-0 h-full overflow-hidden">
              <ChatPanel />
            </div>
          )}
        </div>
      </div>

      {/* Mobile chat modal */}
      {chatOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background">
          <ChatPanel isMobile />
        </div>
      )}

      <SearchDialog />
    </div>
  );
}
