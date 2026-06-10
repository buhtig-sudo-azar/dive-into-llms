'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench, Plus, Trash2, Play, Loader2, RotateCcw } from 'lucide-react';
import { useModelStore } from '@/store/model-store';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface ToolParam { name: string; type: string; }
interface Tool { id: number; name: string; description: string; params: ToolParam[]; }

export function ToolUseLab({ title, description }: { title: string; description: string }) {
  const [tools, setTools] = useState<Tool[]>([
    { id: 1, name: 'search_web', description: 'Ищет информацию в интернете', params: [{ name: 'query', type: 'string' }] },
    { id: 2, name: 'get_weather', description: 'Получает прогноз погоды', params: [{ name: 'city', type: 'string' }] },
  ]);
  const [task, setTask] = useState('Найди прогноз погоды в Санкт-Петербурге');
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newParams, setNewParams] = useState<ToolParam[]>([]);
  const [idCounter, setIdCounter] = useState(3);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const currentModel = useModelStore((s) => s.currentModel);
  const apiToken = useModelStore((s) => s.apiToken);

  const addTool = () => {
    if (!newName.trim()) return;
    setTools((p) => [...p, { id: idCounter, name: newName.trim(), description: newDesc.trim(), params: [...newParams] }]);
    setIdCounter((p) => p + 1);
    setNewName('');
    setNewDesc('');
    setNewParams([]);
  };

  const removeTool = (id: number) => setTools((p) => p.filter((t) => t.id !== id));
  const addParam = () => setNewParams((p) => [...p, { name: '', type: 'string' }]);
  const updateParam = (idx: number, field: 'name' | 'type', val: string) =>
    setNewParams((p) => p.map((pr, i) => (i === idx ? { ...pr, [field]: val } : pr)));
  const removeParam = (idx: number) => setNewParams((p) => p.filter((_, i) => i !== idx));

  const handleRun = useCallback(async () => {
    if (!task.trim() || loading) return;
    setLoading(true);
    setResult('');
    try {
      const toolDescriptions = tools.map((t) =>
        `- ${t.name}(${t.params.map((p) => `${p.name}: ${p.type}`).join(', ')}): ${t.description}`
      ).join('\n');
      const res = await fetch('/api/sandbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: task }],
          systemPrompt: `Ты AI-агент. У тебя есть инструменты:\n${toolDescriptions}\n\nОтветь, какой инструмент ты бы вызвал и с какими параметрами. Формат: ИНСТРУМЕНТ(параметры) - причина.`,
          temperature: 0.3,
          max_tokens: 256,
          model: currentModel,
          apiToken: apiToken || undefined,
        }),
      });
      const data = await res.json();
      setResult(data.content || 'Пустой ответ');
    } catch {
      setResult('Ошибка при запросе к модели');
    } finally {
      setLoading(false);
    }
  }, [task, tools, loading, currentModel, apiToken]);

  const apiPreview = JSON.stringify({
    task,
    tools: tools.map((t) => ({ name: t.name, description: t.description, parameters: t.params })),
  }, null, 2);

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-primary" />
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs">Песочница</Badge>
        </div>
        <p className="text-base text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tool list */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Инструменты агента</label>
          <div className="space-y-2">
            {tools.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-lg border border-border p-2">
                <div>
                  <div className="text-sm font-mono font-medium">{t.name}({t.params.map((p) => p.name).join(', ')})</div>
                  <div className="text-xs text-muted-foreground">{t.description}</div>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => removeTool(t.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Add tool */}
        <div className="rounded-lg border border-dashed border-border p-3 space-y-2">
          <div className="text-xs font-medium text-muted-foreground">Добавить инструмент</div>
          <div className="grid grid-cols-2 gap-2">
            <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Имя (search_db)" className="text-sm font-mono" />
            <Input value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Описание" className="text-sm" />
          </div>
          {newParams.map((p, i) => (
            <div key={i} className="flex items-center gap-1">
              <Input value={p.name} onChange={(e) => updateParam(i, 'name', e.target.value)} placeholder="параметр" className="text-sm h-8" />
              <select value={p.type} onChange={(e) => updateParam(i, 'type', e.target.value)} className="h-8 rounded-md border bg-background px-2 text-xs">
                <option value="string">string</option><option value="number">number</option><option value="boolean">boolean</option>
              </select>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeParam(i)}><Trash2 className="h-3 w-3" /></Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={addParam} className="text-xs gap-1"><Plus className="h-3 w-3" /> Параметр</Button>
            <Button size="sm" onClick={addTool} disabled={!newName.trim()} className="text-xs gap-1"><Plus className="h-3 w-3" /> Добавить инструмент</Button>
          </div>
        </div>

        {/* Task */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Задача</label>
          <Textarea value={task} onChange={(e) => setTask(e.target.value)} className="text-sm min-h-[50px] resize-y" placeholder="Введите задачу..." />
        </div>

        {/* Run */}
        <div className="flex gap-2">
          <Button size="sm" onClick={handleRun} disabled={loading || !task.trim()} className="gap-1.5">
            {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
            Запустить агента
          </Button>
          <Button size="sm" variant="outline" onClick={() => { setTools([]); setResult(''); }} className="gap-1.5">
            <RotateCcw className="h-3 w-3" /> Сбросить
          </Button>
        </div>

        {/* Result */}
        {result && (
          <div className="rounded-lg border border-border bg-card p-3">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Выбор агента</label>
            <MarkdownRenderer content={result} />
          </div>
        )}

        {/* API Preview */}
        <details className="rounded-lg border border-border">
          <summary className="p-2 text-xs font-medium text-muted-foreground cursor-pointer">JSON конфигурация</summary>
          <pre className="p-2 text-[10px] font-mono overflow-x-auto text-muted-foreground bg-muted/20">{apiPreview}</pre>
        </details>
      </CardContent>
    </Card>
  );
}
