import { create } from 'zustand';

interface NavigationState {
  currentView: 'home' | 'category' | 'subtopic';
  currentCategory: string | null;
  currentSubtopic: string | null;
  sidebarOpen: boolean;
  chatOpen: boolean;
  navigateToHome: () => void;
  navigateToCategory: (slug: string) => void;
  navigateToSubtopic: (categorySlug: string, subtopicSlug: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleChat: () => void;
  setChatOpen: (open: boolean) => void;
}

function scrollToMainTop() {
  const main = document.querySelector('main');
  if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentView: 'home',
  currentCategory: null,
  currentSubtopic: null,
  sidebarOpen: true,
  chatOpen: false,
  navigateToHome: () => { scrollToMainTop(); set({ currentView: 'home', currentCategory: null, currentSubtopic: null }); },
  navigateToCategory: (slug) => { scrollToMainTop(); set({ currentView: 'category', currentCategory: slug, currentSubtopic: null }); },
  navigateToSubtopic: (categorySlug, subtopicSlug) => {
    scrollToMainTop();
    set({ currentView: 'subtopic', currentCategory: categorySlug, currentSubtopic: subtopicSlug });
  },
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleChat: () => set((s) => ({ chatOpen: !s.chatOpen })),
  setChatOpen: (open) => set({ chatOpen: open }),
}));
