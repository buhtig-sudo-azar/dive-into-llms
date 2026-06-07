'use client';

import { useNavigationStore } from '@/store/navigation-store';
import { Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FloatingHomeButton — полупрозрачная плавающая кнопка «На главную».
 * Появляется на страницах категорий и подтем.
 * Эстетичная, стеклянная, ненавязчивая.
 */
export function FloatingHomeButton() {
  const currentView = useNavigationStore(s => s.currentView);
  const navigateToHome = useNavigationStore(s => s.navigateToHome);

  // Показываем только на внутренних страницах
  const visible = currentView === 'category' || currentView === 'subtopic';

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, x: -20, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.4 }}
          onClick={navigateToHome}
          aria-label="На главную"
          className={`
            fixed left-5 bottom-6 z-40
            flex items-center gap-2
            px-4 py-2.5 rounded-2xl
            bg-foreground/5 dark:bg-foreground/10
            backdrop-blur-xl
            border border-border/40 dark:border-foreground/10
            text-muted-foreground
            shadow-lg shadow-black/5 dark:shadow-black/20
            hover:bg-foreground/10 dark:hover:bg-foreground/15
            hover:text-foreground
            hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30
            hover:border-border/60 dark:hover:border-foreground/20
            hover:scale-[1.04]
            active:scale-[0.97]
            transition-all duration-300 ease-out
            focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background
            group
          `}
        >
          <Home
            className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
            strokeWidth={1.8}
          />
          <span className="text-sm font-medium tracking-wide">Главная</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
