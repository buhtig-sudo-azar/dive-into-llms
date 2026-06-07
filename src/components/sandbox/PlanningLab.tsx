'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ListChecks, Plus, Trash2, ArrowUp, ArrowDown, Play, Loader2, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useModelStore } from '@/store/model-store';

interface Subtask {
  id: number;
  text: string;
  status: 'pending' | 'done';
}

export function PlanningLab({ title, description }: { title: string; description: string }) {
  const [goal, setGoal] = useState('Создать веб-сайт для кофейни');
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState('');
  const nextId = useState(1)[0];
  const [idCounter, setIdCounter] = useState(1);
  const currentModel = useModelStore((s) => s.currentModel);
  const apiToken = useModelStore((s) => s.apiToken);

  const doneCount = subtasks.filter((s) => s.status === 'done').length;

  const handleGenerate = useCallback(async () => {
    if (!goal.trim() || loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/sandbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: `Разбей задачу на подзадачи: ${goal}` }],
          systemPrompt: 'Ты планировщик задач. Разбей цель на 5-8 конкретных подзадач. Формат: каждый пункт с новой строки, начиная с номера и точки. Без лишних пояснений.',
          temperature: 0.3,
          max_tokens: 512,
          model: currentModel,
          apiToken: apiToken || undefined,
        }),
      });
      const data = await res.json();
      const lines = (data.content || '').split('\n').filter((l: string) => l.trim());
      const tasks: Subtask[] = lines.map((line: string) => {
        const cleaned = line.replace(/^\d+[\.\)]\s*/, '').trim();
        return { id: idCounter + lines.indexOf(line), text: cleaned, status: 'pending' };
      });
      setIdCounter((p) => p + lines.length);
      setSubtasks(tasks);
    } catch {
      setSubtasks([
        { id: 1, text: 'Определить дизайн и структуру сайта', status: 'pending' },
        { id: 2, text: 'Создать главную страницу', status: 'pending' },
        { id: 3, text: 'Добавить меню с ценами', status: 'pending' },
        { id: 4, text: 'Настроить форму обратной связи', status: 'pending' },
        { id: 5, text: 'Разместить фото галерею', status: 'pending' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [goal, loading, currentModel, apiToken, idCounter]);

  const addManual = () => {
    if (!newTask.trim()) return;
    setSubtasks((p) => [...p, { id: idCounter, text: newTask.trim(), status: 'pending' }]);
    setIdCounter((p) => p + 1);
    setNewTask('');
  };

  const toggleDone = (id: number) => {
    setSubtasks((p) => p.map((s) => (s.id === id ? { ...s, status: s.status === 'done' ? 'pending' : 'done' } : s)));
  };

  const removeTask = (id: number) => setSubtasks((p) => p.filter((s) => s.id !== id));

  const moveTask = (id: number, dir: -1 | 1) => {
    setSubtasks((p) => {
      const idx = p.findIndex((s) => s.id === id);
      if (idx < 0) return p;
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= p.length) return p;
      const arr = [...p];
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
      return arr;
    });
  };

  const executeNext = () => {
    const next = subtasks.find((s) => s.status === 'pending');
    if (next) toggleDone(next.id);
  };

  const handleReset = () => { setSubtasks([]); setGoal(''); setNewTask(''); };

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <ListChecks className="h-4 w-4 text-primary" />
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs">Песочница</Badge>
        </div>
        <p className="text-base text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Goal input */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Цель</label>
          <div className="flex gap-2">
            <Input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Введите цель..." className="text-sm" />
            <Button size="sm" onClick={handleGenerate} disabled={loading || !goal.trim()} className="gap-1.5 shrink-0">
              {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
              Сгенерировать план
            </Button>
          </div>
        </div>

        {/* Progress */}
        {subtasks.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Прогресс: {doneCount}/{subtasks.length}</span>
              <span className="font-mono">{Math.round((doneCount / subtasks.length) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(doneCount / subtasks.length) * 100}%` }} />
            </div>
          </div>
        )}

        {/* Subtask list */}
        {subtasks.map((task, idx) => (
          <div key={task.id} className={`flex items-center gap-2 rounded-lg border p-2.5 transition-colors ${
            task.status === 'done' ? 'border-green-500/30 bg-green-500/5' : 'border-border bg-card'
          }`}>
            <button onClick={() => toggleDone(task.id)} className="shrink-0">
              {task.status === 'done' ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/40" />
              )}
            </button>
            <span className={`flex-1 text-sm ${task.status === 'done' ? 'line-through text-muted-foreground' : ''}`}>
              {task.text}
            </span>
            <div className="flex items-center gap-0.5 shrink-0">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveTask(task.id, -1)} disabled={idx === 0}>
                <ArrowUp className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveTask(task.id, 1)} disabled={idx === subtasks.length - 1}>
                <ArrowDown className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => removeTask(task.id)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}

        {/* Add manual */}
        <div className="flex gap-2">
          <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Добавить подзадачу..." className="text-sm"
            onKeyDown={(e) => { if (e.key === 'Enter') addManual(); }} />
          <Button size="sm" variant="outline" onClick={addManual} disabled={!newTask.trim()} className="gap-1.5 shrink-0">
            <Plus className="h-3 w-3" /> Добавить
          </Button>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button size="sm" onClick={executeNext} disabled={!subtasks.some((s) => s.status === 'pending')} className="gap-1.5">
            <Play className="h-3 w-3" /> Выполнить следующий шаг
          </Button>
          <Button size="sm" variant="outline" onClick={handleReset} className="gap-1.5">
            <RotateCcw className="h-3 w-3" /> Сбросить
          </Button>
        </div>

        {doneCount === subtasks.length && subtasks.length > 0 && (
          <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3 text-center">
            <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto mb-1" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400">Все подзадачи выполнены! Цель достигнута!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
