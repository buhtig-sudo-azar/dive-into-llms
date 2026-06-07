import { create } from 'zustand';
import { ChatMessage } from '@/types';
import { useModelStore } from '@/store/model-store';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  activeCategory: string | null;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  appendToLastMessage: (content: string) => void;
  setLoading: (loading: boolean) => void;
  setActiveCategory: (slug: string | null) => void;
  clearMessages: () => void;
  sendMessage: (text: string, systemPrompt: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
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

  sendMessage: async (text: string, systemPrompt: string) => {
    const trimmed = text.trim();
    if (!trimmed || get().isLoading) return;

    const currentMessages = get().messages;

    // Добавляем сообщение пользователя в UI
    get().addMessage({ role: 'user', content: trimmed });
    get().setLoading(true);

    try {
      // Формируем историю для API (включая новое сообщение)
      const chatMessages = [
        ...currentMessages,
        { role: 'user' as const, content: trimmed },
      ].map(m => ({
        role: m.role,
        content: m.content,
      }));

      const { currentModel, apiToken } = useModelStore.getState();

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatMessages,
          systemPrompt,
          model: currentModel,
          apiToken: apiToken || undefined,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        const errMsg = errData?.error === 'All models unavailable'
          ? 'Все модели заняты. Попробуйте выбрать другую модель в шапке или подождите пару минут.'
          : 'Ошибка при обращении к AI. Попробуйте ещё раз.';
        get().addMessage({ role: 'assistant', content: errMsg });
        get().setLoading(false);
        return;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        get().addMessage({ role: 'assistant', content: 'Ошибка: нет потока данных.' });
        get().setLoading(false);
        return;
      }

      // Добавляем пустое сообщение ассистента для стриминга
      get().addMessage({ role: 'assistant', content: '' });

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
              // Обработка кастомного события model_info
              if (parsed.type === 'model_info') {
                if (parsed.rateLimited && Array.isArray(parsed.rateLimited)) {
                  for (const modelId of parsed.rateLimited) {
                    useModelStore.getState().markModelRateLimited(modelId);
                  }
                }
                continue;
              }
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                fullContent += content;
                get().appendToLastMessage(content);
              }
            } catch {
              // пропускаем не-JSON строки
            }
          }
        }
      }

      if (!fullContent) {
        get().appendToLastMessage('Не удалось получить ответ. Попробуйте другую модель или повторите запрос.');
      }
    } catch (error) {
      get().addMessage({ role: 'assistant', content: 'Произошла ошибка сети. Проверьте подключение и попробуйте снова.' });
    } finally {
      get().setLoading(false);
    }
  },
}));
