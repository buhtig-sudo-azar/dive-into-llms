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

export const useNavigationStore = create<NavigationState>((set) => ({
  currentView: 'home',
  currentCategory: null,
  currentSubtopic: null,
  sidebarOpen: true,
  chatOpen: false,
  navigateToHome: () => set({ currentView: 'home', currentCategory: null, currentSubtopic: null }),
  navigateToCategory: (slug) => set({ currentView: 'category', currentCategory: slug, currentSubtopic: null }),
  navigateToSubtopic: (categorySlug, subtopicSlug) =>
    set({ currentView: 'subtopic', currentCategory: categorySlug, currentSubtopic: subtopicSlug }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleChat: () => set((s) => ({ chatOpen: !s.chatOpen })),
  setChatOpen: (open) => set({ chatOpen: open }),
}));
