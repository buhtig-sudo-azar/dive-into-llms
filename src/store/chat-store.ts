import { create } from 'zustand';
import { ChatMessage } from '@/types';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  activeCategory: string | null;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  appendToLastMessage: (content: string) => void;
  setLoading: (loading: boolean) => void;
  setActiveCategory: (slug: string | null) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  activeCategory: null,
  addMessage: (message) =>
    set((s) => ({
      messages: [
        ...s.messages,
        { ...message, id: crypto.randomUUID(), timestamp: Date.now() },
      ],
    })),
  appendToLastMessage: (content) =>
    set((s) => {
      const messages = [...s.messages];
      const last = messages[messages.length - 1];
      if (last && last.role === 'assistant') {
        messages[messages.length - 1] = { ...last, content: last.content + content };
      }
      return { messages };
    }),
  setLoading: (loading) => set({ isLoading: loading }),
  setActiveCategory: (slug) => set({ activeCategory: slug }),
  clearMessages: () => set({ messages: [] }),
}));
