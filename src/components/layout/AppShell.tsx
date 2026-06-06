'use client';

import { useNavigationStore } from '@/store/navigation-store';
import { useChatStore } from '@/store/chat-store';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomeView } from '@/components/home/HomeView';
import { TopicView } from '@/components/content/TopicView';
import { ChatBot } from '@/components/chat/ChatBot';
import { SearchDialog } from '@/components/search/SearchDialog';
import { Toaster } from '@/components/ui/sonner';

export function AppShell() {
  const currentView = useNavigationStore((s) => s.currentView);
  const currentCategory = useNavigationStore((s) => s.currentCategory);
  const currentSubtopic = useNavigationStore((s) => s.currentSubtopic);
  const sidebarOpen = useNavigationStore((s) => s.sidebarOpen);
  const chatOpen = useChatStore((s) => s.chatOpen);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => useNavigationStore.getState().setSidebarOpen(false)}
          />
        )}
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {currentView === 'home' && <HomeView />}
            {currentView === 'category' && currentCategory && (
              <TopicView categorySlug={currentCategory} />
            )}
            {currentView === 'subtopic' && currentCategory && currentSubtopic && (
              <TopicView categorySlug={currentCategory} subtopicSlug={currentSubtopic} />
            )}
          </div>
        </main>
        {chatOpen && <ChatBot />}
      </div>
      <Footer />
      <SearchDialog />
      <Toaster />
    </div>
  );
}
