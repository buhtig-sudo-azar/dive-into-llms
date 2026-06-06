'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigationStore } from '@/store/navigation-store';

export function Header() {
  const { theme, setTheme } = useTheme();
  const { toggleSidebar, toggleChat, sidebarOpen, chatOpen } = useNavigationStore();

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-2 border-b border-border bg-background/80 backdrop-blur-md px-4">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <div className="flex items-center gap-2 flex-1">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => useNavigationStore.getState().navigateToHome()}>
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">DL</span>
          </div>
          <span className="font-semibold text-sm hidden sm:block">Dive Into LLMs</span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true });
            window.dispatchEvent(event);
          }}
          title="Поиск (⌘K)"
        >
          <Search className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title="Переключить тему"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
}
