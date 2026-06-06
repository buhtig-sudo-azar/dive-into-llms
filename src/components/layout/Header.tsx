'use client';

import { useNavigationStore } from '@/store/navigation-store';
import { useProgressStore } from '@/store/progress-store';
import { allTopics } from '@/data/topics';
import { Search, Menu, Sun, Moon, GraduationCap } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export function Header() {
  const { toggleSidebar, navigateToHome } = useNavigationStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const completedCount = useProgressStore((s) => s.completedSubtopics.length);
  const totalSubtopics = allTopics.reduce((acc, t) => acc + t.subtopics.length, 0);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const progress = totalSubtopics > 0 ? Math.round((completedCount / totalSubtopics) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-accent rounded-md md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <button
            onClick={navigateToHome}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg hidden sm:block">Dive Into LLMs</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Progress indicator */}
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground mr-2">
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs">{progress}%</span>
          </div>

          {/* Search button */}
          <button
            onClick={() => {
              const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true });
              window.dispatchEvent(event);
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md border border-border transition-colors"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:block">Поиск</span>
            <kbd className="hidden sm:inline text-xs bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
          </button>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 hover:bg-accent rounded-md transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
