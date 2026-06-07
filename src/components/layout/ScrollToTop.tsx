'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Find the main scrollable container
    const main = document.querySelector('main');
    if (!main) return;

    const handleScroll = () => {
      setVisible(main.scrollTop > 300);
    };

    main.addEventListener('scroll', handleScroll, { passive: true });
    return () => main.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const main = document.querySelector('main');
    if (main) {
      main.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Наверх"
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center justify-center',
        'h-11 w-11 rounded-full',
        'bg-primary text-primary-foreground shadow-lg',
        'hover:shadow-xl hover:scale-110',
        'active:scale-95',
        'transition-all duration-300 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
        visible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-4 opacity-0 pointer-events-none'
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
