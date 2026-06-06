import { create } from 'zustand';

interface ProgressState {
  viewedSubtopics: string[];
  completedSubtopics: string[];
  markAsViewed: (slug: string) => void;
  markAsCompleted: (slug: string) => void;
  isViewed: (slug: string) => boolean;
  isCompleted: (slug: string) => boolean;
  getOverallProgress: (total: number) => number;
  getCategoryProgress: (slugs: string[]) => number;
}

const STORAGE_KEY = 'dive-into-llms-progress';

function loadProgress(): Pick<ProgressState, 'viewedSubtopics' | 'completedSubtopics'> {
  if (typeof window === 'undefined') return { viewedSubtopics: [], completedSubtopics: [] };
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return { viewedSubtopics: [], completedSubtopics: [] };
}

function saveProgress(viewed: string[], completed: string[]) {
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
      saveProgress(viewed, s.completedSubtopics);
      return { viewedSubtopics: viewed };
    }),
  markAsCompleted: (slug) =>
    set((s) => {
      if (s.completedSubtopics.includes(slug)) return s;
      const completed = [...s.completedSubtopics, slug];
      const viewed = s.viewedSubtopics.includes(slug) ? s.viewedSubtopics : [...s.viewedSubtopics, slug];
      saveProgress(viewed, completed);
      return { completedSubtopics: completed, viewedSubtopics: viewed };
    }),
  isViewed: (slug) => get().viewedSubtopics.includes(slug),
  isCompleted: (slug) => get().completedSubtopics.includes(slug),
  getOverallProgress: (total) => {
    if (total === 0) return 0;
    return Math.round((get().completedSubtopics.length / total) * 100);
  },
  getCategoryProgress: (slugs) => {
    if (slugs.length === 0) return 0;
    const completed = slugs.filter((s) => get().completedSubtopics.includes(s)).length;
    return Math.round((completed / slugs.length) * 100);
  },
}));

// Initialize from localStorage after mount
if (typeof window !== 'undefined') {
  const saved = loadProgress();
  if (saved.viewedSubtopics.length > 0 || saved.completedSubtopics.length > 0) {
    useProgressStore.setState(saved);
  }
}
