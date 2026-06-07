'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Play, RotateCcw, Eye, Brain, Wrench, Search, Calculator, Cloud, MessageSquare } from 'lucide-react';

interface ToolDef { id: string; name: string; icon: React.ElementType; result: string; }
interface LogEntry { step: string; detail: string; }

const TOOLS: ToolDef[] = [
  { id: 'search', name: 'search_web(запрос)', icon: Search, result: 'Найдено 3 результата: [документ1, документ2, документ3]' },
  { id: 'calc', name: 'calculate(выражение)', icon: Calculator, result: 'Результат вычисления: 42' },
  { id: 'weather', name: 'get_weather(город)', icon: Cloud, result: 'Температура: +5°C, облачно, влажность 72%' },
];

const STEPS = ['Восприятие', 'Рассуждение', 'Действие', 'Наблюдение'] as const;
const STEP_ICONS = [Eye, Brain, Wrench, Search] as const;

export function AgentLoopSim({ title, description }: { title: string; description: string }) {
  const [task, setTask] = useState('Найди прогноз погоды в Москве и посчитай среднюю температуру за неделю');
  const [currentStep, setCurrentStep] = useState(-1);
  const [iteration, setIteration] = useState(1);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [completed, setCompleted] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState('');

  const addLog = (step: string, detail: string) => setLogs((p) => [...p, { step, detail }]);

  const stepContent = () => {
    if (currentStep < 0) return null;
    switch (currentStep) {
      case 0: return (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Агент получает задачу и анализирует текущее состояние.</p>
          <div className="rounded-md bg-muted/50 p-2"><span className="text-sm font-medium">Задача:</span> <span className="text-sm">{task}</span></div>
          <div className="text-sm text-muted-foreground">Доступные инструменты: {TOOLS.map((t) => t.name).join(', ')}</div>
        </div>
      );
      case 1: return (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Агент рассуждает, какой шаг предпринять:</p>
          <div className="rounded-md bg-primary/5 border border-primary/10 p-2 text-sm italic">
            &quot;Мне нужно найти прогноз погоды, затем вычислить среднее. Сначала вызову get_weather, потом calculate.&quot;
          </div>
        </div>
      );
      case 2: return (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Выберите инструмент для вызова:</p>
          <div className="grid grid-cols-1 gap-2">
            {TOOLS.map((t) => (
              <button key={t.id} onClick={() => setSelectedTool(t.id)}
                className={`flex items-center gap-2 rounded-lg border p-2 text-left text-sm transition-colors ${
                  selectedTool === t.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
                }`}>
                <t.icon className="h-4 w-4 text-primary shrink-0" />
                <span>{t.name}</span>
              </button>
            ))}
            <button onClick={() => setSelectedTool('answer')}
              className={`flex items-center gap-2 rounded-lg border p-2 text-left text-sm transition-colors ${
                selectedTool === 'answer' ? 'border-green-500 bg-green-500/5' : 'border-border hover:border-green-500/40'
              }`}>
              <MessageSquare className="h-4 w-4 text-green-500 shrink-0" />
              <span>Ответить пользователю (завершить)</span>
            </button>
          </div>
        </div>
      );
      case 3: return (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Результат выполнения:</p>
          {selectedTool === 'answer' ? (
            <div className="rounded-md bg-green-500/10 border border-green-500/20 p-2 text-sm">
              Агент готов дать финальный ответ пользователю.
            </div>
          ) : selectedTool ? (
            <div className="rounded-md bg-muted/50 border border-border p-2">
              <div className="text-sm font-medium">{TOOLS.find((t) => t.id === selectedTool)?.name}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {TOOLS.find((t) => t.id === selectedTool)?.result}
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Сначала выберите инструмент на шаге &quot;Действие&quot;</div>
          )}
        </div>
      );
    }
  };

  const handleNext = () => {
    if (currentStep === 2 && !selectedTool) return;

    if (currentStep >= 0) {
      addLog(STEPS[currentStep],
        currentStep === 2
          ? (selectedTool === 'answer' ? 'Финальный ответ' : `Вызов: ${TOOLS.find((t) => t.id === selectedTool)?.name}`)
          : currentStep === 3
          ? (selectedTool === 'answer' ? 'Цель достигнута' : TOOLS.find((t) => t.id === selectedTool)?.result || '')
          : currentStep === 1
          ? 'Анализ задачи и выбор стратегии'
          : 'Получена задача'
      );
    }

    if (currentStep === 3 && selectedTool === 'answer') {
      setCompleted(true);
      setFinalAnswer('Средняя температура в Москве за неделю: +3°C. Данные получены через get_weather и обработаны через calculate.');
      addLog('Результат', 'Цель достигнута!');
      return;
    }

    if (currentStep < 3) {
      setCurrentStep((p) => p + 1);
    } else {
      setCurrentStep(0);
      setIteration((p) => Math.min(p + 1, 5));
      setSelectedTool(null);
    }
  };

  const handleStart = () => {
    setCurrentStep(0);
    setLogs([]);
    setCompleted(false);
    setFinalAnswer('');
    setIteration(1);
    setSelectedTool(null);
    addLog('Старт', `Задача: ${task}`);
  };

  const handleReset = () => {
    setCurrentStep(-1);
    setLogs([]);
    setCompleted(false);
    setFinalAnswer('');
    setIteration(1);
    setSelectedTool(null);
  };

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-primary" />
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs">Песочница</Badge>
        </div>
        <p className="text-base text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Task input */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Задача для агента</label>
          <Textarea value={task} onChange={(e) => setTask(e.target.value)} className="text-sm min-h-[50px] resize-y" placeholder="Введите задачу..." />
        </div>

        {/* Cycle visualization */}
        <div className="flex items-center justify-center gap-1 flex-wrap">
          {STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i];
            const isActive = currentStep === i;
            const isDone = currentStep > i || (currentStep === 3 && selectedTool);
            return (
              <div key={step} className="flex items-center gap-1">
                <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground' : isDone ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-muted text-muted-foreground'
                }`}>
                  {isDone && !isActive ? <span>✓</span> : <Icon className="h-3 w-3" />}
                  {step}
                </div>
                {i < 3 && <span className="text-muted-foreground text-xs">→</span>}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Итерация: {iteration}/5</span>
        </div>

        {/* Step content */}
        {currentStep >= 0 && !completed && (
          <div className="rounded-lg border border-border bg-muted/20 p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-sm font-semibold">{STEPS[currentStep]}</span>
            </div>
            {stepContent()}
          </div>
        )}

        {/* Final answer */}
        {completed && (
          <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3 space-y-2">
            <div className="flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4 text-green-500" />
              <span className="text-sm font-semibold text-green-700 dark:text-green-400">Финальный ответ</span>
            </div>
            <p className="text-sm">{finalAnswer}</p>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-2">
          {currentStep < 0 ? (
            <Button size="sm" onClick={handleStart} disabled={!task.trim()} className="gap-1.5">
              <Play className="h-3 w-3" /> Запустить агента
            </Button>
          ) : !completed ? (
            <Button size="sm" onClick={handleNext} disabled={currentStep === 2 && !selectedTool} className="gap-1.5">
              <Play className="h-3 w-3" /> Следующий шаг
            </Button>
          ) : null}
          <Button size="sm" variant="outline" onClick={handleReset} className="gap-1.5">
            <RotateCcw className="h-3 w-3" /> Сбросить
          </Button>
        </div>

        {/* Log */}
        {logs.length > 0 && (
          <div className="rounded-lg border border-border bg-card p-2 max-h-[120px] overflow-y-auto font-mono text-[11px] space-y-0.5">
            {logs.map((l, i) => (
              <div key={i} className={l.step === 'Результат' ? 'text-green-600' : 'text-muted-foreground'}>
                [{l.step}] {l.detail}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
