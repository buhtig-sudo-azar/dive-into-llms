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
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground px-6 py-3 border-b border-border/50">
      <button
        onClick={navigateToHome}
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <Home className="h-3.5 w-3.5" />
        <span>Обзор</span>
      </button>

      {category && (
        <>
          <ChevronRight className="h-3 w-3" />
          <button
            onClick={() => navigateToCategory(category.slug)}
            className="hover:text-foreground transition-colors"
          >
            {category.title}
          </button>
        </>
      )}

      {subtopic && (
        <>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{subtopic.title}</span>
        </>
      )}
    </nav>
  );
}
