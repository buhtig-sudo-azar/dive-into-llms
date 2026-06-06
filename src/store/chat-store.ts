import { create } from 'zustand';
import type { ChatMessage } from '@/types';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  activeCategory: string | null;
  chatOpen: boolean;
  addMessage: (msg: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
  setActiveCategory: (slug: string | null) => void;
  setChatOpen: (open: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  activeCategory: null,
  chatOpen: false,
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  setLoading: (loading) => set({ isLoading: loading }),
  setActiveCategory: (slug) => set({ activeCategory: slug, messages: [] }),
  setChatOpen: (open) => set({ chatOpen: open }),
  clearMessages: () => set({ messages: [] }),
}));
