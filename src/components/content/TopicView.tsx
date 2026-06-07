'use client';

import { topics } from '@/data/topics';
import { useNavigationStore } from '@/store/navigation-store';
import { useProgressStore } from '@/store/progress-store';
import { useChatStore } from '@/store/chat-store';
import { TopicViewContent } from './TopicViewContent';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function TopicView() {
  const { currentCategory, currentSubtopic, navigateToCategory } = useNavigationStore();
  const { markAsViewed, markAsCompleted, isCompleted } = useProgressStore();

  const category = topics.find(t => t.slug === currentCategory);
  const subtopic = category?.subtopics.find(s => s.slug === currentSubtopic);

  if (!category || !subtopic) return null;

  // Mark as viewed on render
  markAsViewed(subtopic.slug);

  const completed = isCompleted(subtopic.slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8"
    >
      {/* Back button */}
      <button
        onClick={() => navigateToCategory(currentCategory!)}
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors mb-5 text-base group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span>{category.title}</span>
      </button>

      {/* Topic header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2">{subtopic.title}</h1>
          <p className="text-[10px] text-muted-foreground/40 mt-1">СОЗДАТЕЛЬ AZAR</p>
          {completed && (
            <div className="flex items-center gap-1.5 text-base text-primary">
              <CheckCircle2 className="h-4 w-4" />
              <span>Тема изучена</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <TopicViewContent subtopic={subtopic} />

      {/* Complete button */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <Button
            onClick={() => markAsCompleted(subtopic.slug)}
            variant={completed ? 'outline' : 'default'}
            className="gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            {completed ? 'Изучено ✓' : 'Отметить как изученное'}
          </Button>
          <span className="text-base text-muted-foreground">
            {completed ? 'Вы уже изучили эту тему' : 'Нажмите, когда завершите изучение темы'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
