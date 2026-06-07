import { create } from 'zustand';

const STORAGE_KEY = 'dive-into-llms-model';
const RATE_LIMIT_KEY = 'dive-into-llms-rate-limits';

const DEFAULT_MODEL = 'moonshotai/kimi-k2.6:free';

// Rate limit info for a single model
export interface ModelRateLimit {
  available: boolean;         // true = works, false = rate limited / error
  reason?: 'rate_limited' | 'not_found' | 'error' | null;
  remaining?: number | null;  // requests remaining (from headers)
  limit?: number | null;      // total limit (from headers)
  reset?: string | null;      // when limit resets
  latency?: number | null;    // response time in ms
  checkedAt?: number;         // timestamp of last check
}

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
  isCheckingAll: boolean;
  rateLimits: Record<string, ModelRateLimit>;
  setCurrentModel: (model: string) => void;
  fetchAvailableModels: () => Promise<void>;
  checkModel: (modelId: string) => Promise<ModelRateLimit>;
  checkAllModels: () => Promise<void>;
  markModelRateLimited: (modelId: string) => void;
  setIsApplying: (applying: boolean) => void;
  getModelForRequest: () => string;
  getRateLimit: (modelId: string) => ModelRateLimit | undefined;
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

function loadRateLimitsFromStorage(): Record<string, ModelRateLimit> {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(RATE_LIMIT_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      // Clean up entries older than 10 minutes
      const now = Date.now();
      const cleaned: Record<string, ModelRateLimit> = {};
      for (const [key, val] of Object.entries(parsed)) {
        const rl = val as ModelRateLimit;
        if (rl.checkedAt && now - rl.checkedAt < 10 * 60 * 1000) {
          cleaned[key] = rl;
        }
      }
      return cleaned;
    }
  } catch {}
  return {};
}

function saveRateLimitsToStorage(limits: Record<string, ModelRateLimit>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(limits));
  } catch {}
}

export const useModelStore = create<ModelState>((set, get) => ({
  currentModel: DEFAULT_MODEL,
  availableModels: [],
  isLoadingModels: false,
  modelsError: null,
  isApplying: false,
  isCheckingAll: false,
  rateLimits: {},

  setCurrentModel: (model) => {
    saveModelToStorage(model);
    set({ currentModel: model });
  },

  fetchAvailableModels: async () => {
    if (get().isLoadingModels) return;
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

  checkModel: async (modelId: string): Promise<ModelRateLimit> => {
    try {
      const res = await fetch('/api/models/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: modelId }),
      });

      if (!res.ok) {
        const info: ModelRateLimit = {
          available: false,
          reason: 'error',
          checkedAt: Date.now(),
        };
        const updated = { ...get().rateLimits, [modelId]: info };
        saveRateLimitsToStorage(updated);
        set({ rateLimits: updated });
        return info;
      }

      const data = await res.json();
      const info: ModelRateLimit = {
        available: data.available,
        reason: data.reason || null,
        remaining: data.rateLimit?.remaining ?? null,
        limit: data.rateLimit?.limit ?? null,
        reset: data.rateLimit?.reset ?? null,
        latency: data.latency ?? null,
        checkedAt: Date.now(),
      };

      const updated = { ...get().rateLimits, [modelId]: info };
      saveRateLimitsToStorage(updated);
      set({ rateLimits: updated });
      return info;
    } catch {
      const info: ModelRateLimit = {
        available: false,
        reason: 'error',
        checkedAt: Date.now(),
      };
      const updated = { ...get().rateLimits, [modelId]: info };
      saveRateLimitsToStorage(updated);
      set({ rateLimits: updated });
      return info;
    }
  },

  checkAllModels: async () => {
    if (get().isCheckingAll) return;
    set({ isCheckingAll: true });

    const models = get().availableModels;
    // Check models sequentially with a small delay to avoid hammering API
    for (const model of models) {
      await get().checkModel(model.id);
      // Small delay between checks
      await new Promise((r) => setTimeout(r, 200));
    }

    set({ isCheckingAll: false });
  },

  markModelRateLimited: (modelId: string) => {
    const info: ModelRateLimit = {
      available: false,
      reason: 'rate_limited',
      checkedAt: Date.now(),
    };
    const updated = { ...get().rateLimits, [modelId]: info };
    saveRateLimitsToStorage(updated);
    set({ rateLimits: updated });
  },

  setIsApplying: (applying) => set({ isApplying: applying }),

  getModelForRequest: () => get().currentModel,

  getRateLimit: (modelId: string) => get().rateLimits[modelId],

  _hydrate: () => {
    const model = loadModelFromStorage();
    const rateLimits = loadRateLimitsFromStorage();
    set({ currentModel: model, rateLimits });
  },
}));
