'use client';

import { topics } from '@/data/topics';
import { useNavigationStore } from '@/store/navigation-store';
import { useProgressStore } from '@/store/progress-store';
import {
  Brain, MessageSquare, Layers, Plug, Database,
  Bot, Laptop, Rocket, ArrowRight, Sparkles, RotateCcw,
  BookOpen, MessageCircle, Cpu, Key, HelpCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
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
import { motion } from 'framer-motion';
import { pluralize } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Brain, MessageSquare, Layers, Plug, Database, Bot, Laptop, Rocket,
};

export function HomeView() {
  const { navigateToCategory } = useNavigationStore();
  const totalSubtopics = topics.reduce((acc, t) => acc + t.subtopics.length, 0);
  const overallProgress = useProgressStore(s => s.getOverallProgress(totalSubtopics));
  const completedCount = useProgressStore(s => s.completedSubtopics.length);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 md:py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-base font-semibold mb-6">
          <Sparkles className="h-4 w-4" />
          Интерактивная обучающая платформа
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-5">
          Dive Into{' '}
          <span className="text-primary">LLMs</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Структурированное обучение по Large Language Models, Prompt Engineering, RAG, MCP, AI Agents и смежным направлениям
        </p>
        <p className="text-xs text-muted-foreground/40 mt-3">СОЗДАТЕЛЬ AZAR</p>
      </motion.div>

      {/* Progress overview */}
      {completedCount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10 p-4 rounded-lg border border-border bg-card"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-base font-medium">Ваш прогресс</span>
            <div className="flex items-center gap-2">
              <span className="text-base text-muted-foreground">
                {completedCount} из {totalSubtopics} {pluralize(totalSubtopics, 'тема', 'темы', 'тем')} ({overallProgress}%)
              </span>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive">
                    <RotateCcw className="h-3.5 w-3.5" />
                  </Button>
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
            </div>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </motion.div>
      )}

      {/* How to use — подробная инструкция */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mb-10 p-5 sm:p-6 rounded-xl border border-border bg-card"
      >
        <div className="flex items-center gap-2 mb-5">
          <HelpCircle className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold">Как пользоваться платформой</h2>
        </div>

        {/* Основные шаги */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">1. Выберите тему</p>
              <p className="text-sm text-muted-foreground">Кликните на карточку ниже — откроется список подтем с материалами</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">2. Спросите AI-наставника</p>
              <p className="text-sm text-muted-foreground">Круглый аватар справа внизу — кликните и задайте вопрос по теме</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
              <Cpu className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">3. Выберите модель</p>
              <p className="text-sm text-muted-foreground">Кнопка с названием модели в шапке — переключайте между бесплатными</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
              <Key className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">4. Подставьте свой ключ</p>
              <p className="text-sm text-muted-foreground">Значок ключа в шапке → получите бесплатный ключ на openrouter.ai/keys</p>
            </div>
          </div>
        </div>

        {/* Подробная инструкция по чат-боту */}
        <div className="border-t border-border pt-4">
          <p className="text-sm font-semibold mb-3">Как работает AI-наставник:</p>
          <div className="space-y-2.5 text-sm text-muted-foreground">
            <div className="flex gap-2">
              <span className="text-primary font-bold shrink-0">→</span>
              <p>Откройте любую тему — в правом нижнем углу появится аватар AI-наставника</p>
            </div>
            <div className="flex gap-2">
              <span className="text-primary font-bold shrink-0">→</span>
              <p>Нажмите на аватар — откроется окно чата. Наставник уже знает тему и готов отвечать</p>
            </div>
            <div className="flex gap-2">
              <span className="text-primary font-bold shrink-0">→</span>
              <p>Используйте подсказки-кнопки в чате или пишите свой вопрос свободно</p>
            </div>
            <div className="flex gap-2">
              <span className="text-primary font-bold shrink-0">→</span>
              <p>Если модель не отвечает — нажмите на кнопку модели в шапке и выберите другую (зелёная точка = доступна, красная = лимит исчерпан)</p>
            </div>
            <div className="flex gap-2">
              <span className="text-primary font-bold shrink-0">→</span>
              <p>Для стабильной работы получите бесплатный API-ключ на <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80">openrouter.ai/keys</a> и вставьте через значок ключа в шапке</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Topic grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {topics.map((category, i) => {
          const Icon = iconMap[category.iconName] || Brain;
          const progress = useProgressStore.getState().getCategoryProgress(
            category.subtopics.map(s => s.slug)
          );

          return (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
            >
              <Card
                className="cursor-pointer group hover:border-primary/50 transition-all hover:shadow-md"
                onClick={() => navigateToCategory(category.slug)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{category.title}</h3>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-base text-muted-foreground mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Progress value={progress} className="h-1 flex-1" />
                    <span className="text-sm text-muted-foreground">{progress}%</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {category.subtopics.length} {pluralize(category.subtopics.length, 'тема', 'темы', 'тем')}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>


    </div>
  );
}
