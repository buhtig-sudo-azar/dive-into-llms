'use client';

import { useNavigationStore } from '@/store/navigation-store';
import { useProgressStore } from '@/store/progress-store';
import { topics } from '@/data/topics';
import {
  Brain, MessageSquare, Layers, Plug, Database,
  Bot, Laptop, Rocket, ChevronRight, CheckCircle2,
  Circle, ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

const iconMap: Record<string, React.ElementType> = {
  Brain, MessageSquare, Layers, Plug, Database, Bot, Laptop, Rocket,
};

export function Sidebar() {
  const { currentView, currentCategory, currentSubtopic, navigateToHome, navigateToCategory, navigateToSubtopic, sidebarOpen, setSidebarOpen } = useNavigationStore();
  const { getCategoryProgress, isCompleted, isViewed } = useProgressStore();

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(topics.map(t => t.slug))
  );

  const toggleCategory = (slug: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const totalSubtopics = topics.reduce((acc, t) => acc + t.subtopics.length, 0);
  const overallProgress = useProgressStore(s => s.getOverallProgress(totalSubtopics));

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed md:relative z-40 top-14 left-0 h-[calc(100vh-3.5rem)] w-72 border-r border-border bg-sidebar transition-transform duration-200',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-0 md:border-0 md:overflow-hidden'
        )}
      >
        <ScrollArea className="h-full">
          <div className="p-4 space-y-2">
            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Общий прогресс</span>
                <span className="font-medium">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-1.5" />
            </div>

            {/* Home */}
            <button
              onClick={navigateToHome}
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
                currentView === 'home'
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              )}
            >
              <span>🏠</span>
              <span>Обзор</span>
            </button>

            {/* Topics */}
            {topics.map((category) => {
              const Icon = iconMap[category.iconName] || Brain;
              const isExpanded = expandedCategories.has(category.slug);
              const isActive = currentCategory === category.slug;
              const progress = getCategoryProgress(category.subtopics.map(s => s.slug));

              return (
                <div key={category.slug}>
                  <button
                    onClick={() => {
                      toggleCategory(category.slug);
                      navigateToCategory(category.slug);
                    }}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors group',
                      isActive && currentView === 'category'
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-primary" />
                    <span className="flex-1 text-left truncate">{category.title}</span>
                    <span className="text-[10px] text-muted-foreground mr-1">{progress}%</span>
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 text-muted-foreground transition-transform',
                        isExpanded && 'rotate-180'
                      )}
                    />
                  </button>

                  {isExpanded && (
                    <div className="ml-4 mt-0.5 space-y-0.5">
                      {category.subtopics.map((sub) => {
                        const completed = isCompleted(sub.slug);
                        const viewed = isViewed(sub.slug);
                        const isSubActive = currentSubtopic === sub.slug;

                        return (
                          <button
                            key={sub.slug}
                            onClick={() => {
                              navigateToSubtopic(category.slug, sub.slug);
                              if (window.innerWidth < 768) setSidebarOpen(false);
                            }}
                            className={cn(
                              'w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors',
                              isSubActive
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                            )}
                          >
                            {completed ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                            ) : viewed ? (
                              <Circle className="h-3.5 w-3.5 text-primary/50 shrink-0" />
                            ) : (
                              <Circle className="h-3.5 w-3.5 text-muted-foreground/30 shrink-0" />
                            )}
                            <span className="truncate">{sub.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}
