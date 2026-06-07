'use client';

import { useNavigationStore } from '@/store/navigation-store';
import { topics } from '@/data/topics';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs() {
  const { currentView, currentCategory, currentSubtopic, navigateToHome, navigateToCategory } = useNavigationStore();

  if (currentView === 'home') return null;

  const category = topics.find(t => t.slug === currentCategory);
  const subtopic = category?.subtopics.find(s => s.slug === currentSubtopic);

  return (
    <nav className="flex items-center gap-1.5 text-base text-muted-foreground px-4 sm:px-6 py-3 border-b border-border/50 overflow-x-auto">
      <button
        onClick={navigateToHome}
        className="flex items-center gap-1 hover:text-foreground transition-colors shrink-0"
      >
        <Home className="h-4 w-4" />
        <span className="hidden sm:inline">Обзор</span>
      </button>

      {category && (
        <>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <button
            onClick={() => navigateToCategory(category.slug)}
            className="hover:text-foreground transition-colors truncate max-w-[140px] sm:max-w-none"
          >
            {category.title}
          </button>
        </>
      )}

      {subtopic && (
        <>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <span className="text-foreground font-medium truncate max-w-[160px] sm:max-w-none">{subtopic.title}</span>
        </>
      )}
    </nav>
  );
}
