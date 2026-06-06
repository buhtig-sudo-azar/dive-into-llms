'use client';

import { topics } from '@/data/topics';
import { useNavigationStore } from '@/store/navigation-store';
import { useProgressStore } from '@/store/progress-store';
import { useChatStore } from '@/store/chat-store';
import {
  Brain, MessageSquare, Layers, Plug, Database,
  Bot, Laptop, Rocket, ChevronRight, CheckCircle2, Circle, BotIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ElementType> = {
  Brain, MessageSquare, Layers, Plug, Database, Bot, Laptop, Rocket,
};

export function CategoryView() {
  const currentCategory = useNavigationStore(s => s.currentCategory);
  const { navigateToSubtopic, setChatOpen } = useNavigationStore();
  const { setActiveCategory, clearMessages } = useChatStore();
  const { isCompleted, isViewed, getCategoryProgress } = useProgressStore();

  const category = topics.find(t => t.slug === currentCategory);
  if (!category) return null;

  const Icon = iconMap[category.iconName] || Brain;
  const progress = getCategoryProgress(category.subtopics.map(s => s.slug));

  const openChat = () => {
    setActiveCategory(category.slug);
    clearMessages();
    setChatOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Category header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="p-3 rounded-xl bg-primary/10">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{category.title}</h1>
              <Button
                variant="outline"
                size="sm"
                onClick={openChat}
                className="gap-1.5 text-xs"
              >
                <BotIcon className="h-3.5 w-3.5" />
                AI-наставник
              </Button>
            </div>
            <p className="text-muted-foreground mt-1">{category.description}</p>
            <div className="flex items-center gap-3 mt-3">
              <Progress value={progress} className="h-1.5 flex-1 max-w-xs" />
              <span className="text-sm text-muted-foreground">{progress}% пройдено</span>
            </div>
          </div>
        </div>

        {/* Subtopics */}
        <div className="space-y-3">
          {category.subtopics.map((sub, i) => {
            const completed = isCompleted(sub.slug);
            const viewed = isViewed(sub.slug);

            return (
              <motion.div
                key={sub.slug}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <Card
                  className="cursor-pointer group hover:border-primary/50 transition-all"
                  onClick={() => navigateToSubtopic(category.slug, sub.slug)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    {completed ? (
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    ) : viewed ? (
                      <Circle className="h-5 w-5 text-primary/50 shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground/30 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">{sub.title}</h3>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {sub.introduction.what.slice(0, 100)}...
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
