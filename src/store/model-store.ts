import { create } from 'zustand';

const STORAGE_KEY = 'dive-into-llms-model';

const DEFAULT_MODEL = 'moonshotai/kimi-k2.6:free';

export interface FreeModel {
  id: string;
  name: string;
  label: string;
}

interface ModelState {
  currentModel: string;
  availableModels: FreeModel[];
  isLoadingModels: boolean;
  modelsError: string | null;
  isApplying: boolean;
  setCurrentModel: (model: string) => void;
  fetchAvailableModels: () => Promise<void>;
  setIsApplying: (applying: boolean) => void;
  getModelForRequest: () => string;
  _hydrate: () => void;
}

function loadModelFromStorage(): string {
  if (typeof window === 'undefined') return DEFAULT_MODEL;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return parsed.currentModel || DEFAULT_MODEL;
    }
  } catch {}
  return DEFAULT_MODEL;
}

function saveModelToStorage(model: string) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ currentModel: model }));
  } catch {}
}

export const useModelStore = create<ModelState>((set, get) => ({
  currentModel: DEFAULT_MODEL,
  availableModels: [],
  isLoadingModels: false,
  modelsError: null,
  isApplying: false,

  setCurrentModel: (model) => {
    saveModelToStorage(model);
    set({ currentModel: model });
  },

  fetchAvailableModels: async () => {
    // Don't re-fetch if already loading
    if (get().isLoadingModels) return;
    // Don't re-fetch if we already have models (unless forced)
    if (get().availableModels.length > 0) return;

    set({ isLoadingModels: true, modelsError: null });

    try {
      const res = await fetch('/api/models');

      if (!res.ok) {
        throw new Error('Не удалось загрузить список моделей');
      }

      const data = await res.json();
      const models: FreeModel[] = data.models || [];

      set({ availableModels: models, isLoadingModels: false });
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Ошибка загрузки моделей';
      set({ modelsError: msg, isLoadingModels: false });
    }
  },

  setIsApplying: (applying) => set({ isApplying: applying }),

  getModelForRequest: () => get().currentModel,

  _hydrate: () => {
    const model = loadModelFromStorage();
    set({ currentModel: model });
  },
}));
