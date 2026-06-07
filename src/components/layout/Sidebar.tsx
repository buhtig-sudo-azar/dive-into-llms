'use client';

import { useNavigationStore } from '@/store/navigation-store';
import { useProgressStore } from '@/store/progress-store';
import { topics } from '@/data/topics';
import {
  Brain, MessageSquare, Layers, Plug, Database,
  Bot, Laptop, Rocket, CheckCircle2,
  Circle, ChevronDown, RotateCcw, PanelLeftClose, PanelLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

const iconMap: Record<string, React.ElementType> = {
  Brain, MessageSquare, Layers, Plug, Database, Bot, Laptop, Rocket,
};

export function Sidebar() {
  const { currentView, currentCategory, currentSubtopic, navigateToHome, navigateToCategory, navigateToSubtopic, sidebarOpen, setSidebarOpen, sidebarCollapsed, toggleSidebarCollapse } = useNavigationStore();
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
  const isCollapsed = sidebarCollapsed;

  const renderProgressSection = () => (
    <div className="mb-5">
      <div className="flex items-center justify-between text-base mb-2">
        <span className="text-muted-foreground">Общий прогресс</span>
        <div className="flex items-center gap-1">
          <span className="font-medium">{overallProgress}%</span>
          {overallProgress > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  className="p-0.5 rounded hover:bg-sidebar-accent/50 text-muted-foreground hover:text-destructive transition-colors"
                  title="Сбросить прогресс"
                >
                  <RotateCcw className="h-3 w-3" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Сбросить прогресс?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Все просмотренные и изученные темы будут отмечены как непройденные. Это действие нельзя отменить.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => useProgressStore.getState().resetProgress()}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Сбросить
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
      <Progress value={overallProgress} className="h-1.5" />
    </div>
  );

  const renderHomeButton = () => (
    <button
      onClick={() => {
        navigateToHome();
        if (window.innerWidth < 768) setSidebarOpen(false);
      }}
      className={cn(
        'w-full flex items-center gap-2 px-3 py-2.5 rounded-md text-base font-medium transition-colors',
        currentView === 'home'
          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
          : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
      )}
    >
      <span>🏠</span>
      <span>Обзор</span>
    </button>
  );

  const renderTopics = () => (
    <>
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
                'w-full flex items-center gap-2 px-3 py-2.5 rounded-md text-base transition-colors group',
                isActive && currentView === 'category'
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              )}
            >
              <Icon className="h-4 w-4 shrink-0 text-primary" />
              <span className="flex-1 text-left truncate">{category.title}</span>
              <span className="text-sm text-muted-foreground mr-1">{progress}%</span>
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 text-muted-foreground transition-transform',
                  isExpanded && 'rotate-180'
                )}
              />
            </button>

            {isExpanded && (
              <div className="ml-4 mt-1 space-y-0.5">
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
                        'w-full flex items-center gap-2 px-2 py-2 rounded text-base transition-colors',
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
    </>
  );

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
          'fixed md:relative z-40 md:z-auto top-16 md:top-0 left-0 h-[calc(100vh-4rem)] md:h-full border-r border-border bg-sidebar transition-all duration-300 flex flex-col',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          isCollapsed ? 'w-72 md:w-14' : 'w-72'
        )}
      >
        {/* Collapse toggle — desktop only, at the top */}
        <div className="hidden md:flex items-center justify-end px-2 pt-2 pb-1 shrink-0">
          <button
            onClick={toggleSidebarCollapse}
            className="p-1.5 rounded-md hover:bg-sidebar-accent/50 text-muted-foreground hover:text-sidebar-foreground transition-colors"
            title={isCollapsed ? 'Развернуть меню' : 'Свернуть меню'}
          >
            {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>

        {/* Full sidebar content — shown on mobile always, on desktop when expanded */}
        <ScrollArea className={cn('flex-1', isCollapsed && 'hidden md:hidden')}>
          <div className="p-4 space-y-2 pb-8">
            {renderProgressSection()}
            {renderHomeButton()}
            {renderTopics()}
          </div>
        </ScrollArea>

        {/* Collapsed sidebar icons — desktop only */}
        {isCollapsed && (
          <ScrollArea className="flex-1 hidden md:block">
            <div className="py-2 space-y-1">
              <button
                onClick={navigateToHome}
                className={cn(
                  'w-full flex items-center justify-center py-2.5 rounded-md transition-colors',
                  currentView === 'home'
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                )}
                title="Обзор"
              >
                <span className="text-lg">🏠</span>
              </button>
              {topics.map((category) => {
                const Icon = iconMap[category.iconName] || Brain;
                const isActive = currentCategory === category.slug;
                return (
                  <button
                    key={category.slug}
                    onClick={() => navigateToCategory(category.slug)}
                    className={cn(
                      'w-full flex items-center justify-center py-2.5 rounded-md transition-colors',
                      isActive && currentView === 'category'
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                    )}
                    title={category.title}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-primary" />
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        )}

        {/* Sidebar bottom: creator label */}
        {!isCollapsed && (
          <div className="shrink-0 px-4 py-3 border-t border-border">
            <div className="text-xs text-muted-foreground/50 text-center tracking-wide">
              СОЗДАТЕЛЬ <span className="font-semibold text-muted-foreground/70">AZAR</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
