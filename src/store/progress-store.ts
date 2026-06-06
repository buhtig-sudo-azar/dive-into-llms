import { create } from 'zustand';

interface ProgressState {
  viewedSubtopics: string[];
  completedSubtopics: string[];
  markAsViewed: (slug: string) => void;
  markAsCompleted: (slug: string) => void;
  isCompleted: (slug: string) => boolean;
  isViewed: (slug: string) => boolean;
  getOverallProgress: (total: number) => number;
  getCategoryProgress: (slugs: string[]) => number;
  _hydrate: () => void;
}

const STORAGE_KEY = 'dive-into-llms-progress';

function loadFromStorage(): Pick<ProgressState, 'viewedSubtopics' | 'completedSubtopics'> {
  if (typeof window === 'undefined') return { viewedSubtopics: [], completedSubtopics: [] };
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return { viewedSubtopics: parsed.viewedSubtopics || [], completedSubtopics: parsed.completedSubtopics || [] };
    }
  } catch {}
  return { viewedSubtopics: [], completedSubtopics: [] };
}

function saveToStorage(viewed: string[], completed: string[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ viewedSubtopics: viewed, completedSubtopics: completed }));
  } catch {}
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  viewedSubtopics: [],
  completedSubtopics: [],
  markAsViewed: (slug) =>
    set((s) => {
      if (s.viewedSubtopics.includes(slug)) return s;
      const viewed = [...s.viewedSubtopics, slug];
      saveToStorage(viewed, s.completedSubtopics);
      return { viewedSubtopics: viewed };
    }),
  markAsCompleted: (slug) =>
    set((s) => {
      if (s.completedSubtopics.includes(slug)) return s;
      const completed = [...s.completedSubtopics, slug];
      const viewed = s.viewedSubtopics.includes(slug) ? s.viewedSubtopics : [...s.viewedSubtopics, slug];
      saveToStorage(viewed, completed);
      return { completedSubtopics: completed, viewedSubtopics: viewed };
    }),
  isCompleted: (slug) => get().completedSubtopics.includes(slug),
  isViewed: (slug) => get().viewedSubtopics.includes(slug),
  getOverallProgress: (total) => {
    if (total === 0) return 0;
    return Math.round((get().completedSubtopics.length / total) * 100);
  },
  getCategoryProgress: (slugs) => {
    if (slugs.length === 0) return 0;
    const completed = slugs.filter((s) => get().completedSubtopics.includes(s)).length;
    return Math.round((completed / slugs.length) * 100);
  },
  _hydrate: () => {
    const data = loadFromStorage();
    set({ viewedSubtopics: data.viewedSubtopics, completedSubtopics: data.completedSubtopics });
  },
}));
