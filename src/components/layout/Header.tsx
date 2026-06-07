'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun, Search, Menu, X, PanelLeft, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigationStore } from '@/store/navigation-store';
import { ModelSelector } from '@/components/settings/ModelSelector';

export function Header() {
  const { theme, setTheme } = useTheme();
  const { toggleSidebar, sidebarOpen, toggleSidebarCollapse, sidebarCollapsed } = useNavigationStore();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-2 border-b border-border bg-background/80 backdrop-blur-md px-4">
      {/* Mobile menu toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Desktop sidebar collapse toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="hidden md:flex"
        onClick={toggleSidebarCollapse}
        title={sidebarCollapsed ? 'Развернуть меню' : 'Свернуть меню'}
      >
        <PanelLeft className={sidebarCollapsed ? 'h-5 w-5' : 'h-5 w-5'} />
      </Button>

      <div className="flex items-center gap-2 flex-1">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => useNavigationStore.getState().navigateToHome()}>
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">DL</span>
          </div>
          <span className="font-bold text-lg hidden sm:block">Dive Into LLMs</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Model selector */}
        <ModelSelector />

        <a
          href="https://openrouter.ai/keys"
          target="_blank"
          rel="noopener noreferrer"
          title="Получить API-ключ OpenRouter (бесплатно)"
          className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-primary"
        >
          <Key className="h-3.5 w-3.5" />
        </a>

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
