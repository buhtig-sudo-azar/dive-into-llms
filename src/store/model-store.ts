import { create } from 'zustand';

const STORAGE_KEY = 'dive-into-llms-model';

export const FREE_MODELS = [
  { id: 'moonshotai/kimi-k2.6:free', label: 'Kimi K2.6 (Moonshot)', free: true },
  { id: 'nvidia/nemotron-3-ultra-550b-a55b:free', label: 'Nemotron Ultra 550B (NVIDIA)', free: true },
  { id: 'google/gemma-4-31b-it:free', label: 'Gemma 4 31B (Google)', free: true },
  { id: 'nousresearch/hermes-3-llama-3.1-405b:free', label: 'Hermes 3 Llama 405B (Nous)', free: true },
  { id: 'meta-llama/llama-3.3-70b-instruct:free', label: 'Llama 3.3 70B (Meta)', free: true },
  { id: 'qwen/qwen3-next-80b-a3b-instruct:free', label: 'Qwen3 Next 80B (Alibaba)', free: true },
  { id: 'nvidia/nemotron-3-super-120b-a12b:free', label: 'Nemotron Super 120B (NVIDIA)', free: true },
  { id: 'google/gemma-4-26b-a4b-it:free', label: 'Gemma 4 26B (Google)', free: true },
] as const;

const DEFAULT_MODEL = 'moonshotai/kimi-k2.6:free';

interface ModelState {
  currentModel: string;
  customModel: string;
  isApplying: boolean;
  setCurrentModel: (model: string) => void;
  setCustomModel: (model: string) => void;
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
  customModel: '',
  isApplying: false,
  setCurrentModel: (model) => {
    saveModelToStorage(model);
    set({ currentModel: model });
  },
  setCustomModel: (model) => set({ customModel: model }),
  setIsApplying: (applying) => set({ isApplying: applying }),
  getModelForRequest: () => get().currentModel,
  _hydrate: () => {
    const model = loadModelFromStorage();
    set({ currentModel: model });
  },
}));
