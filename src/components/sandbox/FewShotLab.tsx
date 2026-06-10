'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layers, Plus, Trash2, Play, Loader2, RotateCcw } from 'lucide-react';
import { useModelStore } from '@/store/model-store';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface Example { id: number; input: string; output: string; }

export function FewShotLab({ title, description }: { title: string; description: string }) {
  const [task, setTask] = useState('Определи тональность отзыва');
  const [examples, setExamples] = useState<Example[]>([
    { id: 1, input: 'Отличный товар, рекомендую!', output: 'Позитивная' },
    { id: 2, input: 'Ужасный сервис, больше не приду', output: 'Негативная' },
  ]);
  const [newInput, setNewInput] = useState('');
  const [newOutput, setNewOutput] = useState('');
  const [idCounter, setIdCounter] = useState(3);
  const [zeroResponse, setZeroResponse] = useState('');
  const [fewResponse, setFewResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const currentModel = useModelStore((s) => s.currentModel);
  const apiToken = useModelStore((s) => s.apiToken);

  const addExample = () => {
    if (!newInput.trim() || !newOutput.trim()) return;
    setExamples((p) => [...p, { id: idCounter, input: newInput.trim(), output: newOutput.trim() }]);
    setIdCounter((p) => p + 1);
    setNewInput(''); setNewOutput('');
  };
  const removeExample = (id: number) => setExamples((p) => p.filter((e) => e.id !== id));

  const buildFewShotPrompt = () => {
    const exText = examples.map((e) => `Вход: ${e.input}\nВыход: ${e.output}`).join('\n\n');
    return `${task}\n\nПримеры:\n${exText}\n\nТеперь определи:\nВход: Этот фильм просто потрясающий`;
  };

  const buildZeroShotPrompt = () => `${task}\n\nВход: Этот фильм просто потрясающий`;

  const handleCompare = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    setZeroResponse(''); setFewResponse(''); setShowComparison(true);
    try {
      const [zRes, fRes] = await Promise.all([
        fetch('/api/sandbox', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [{ role: 'user', content: buildZeroShotPrompt() }], systemPrompt: 'Ты классификатор. Отвечай одним словом.', temperature: 0.1, max_tokens: 32, model: currentModel, apiToken: apiToken || undefined }),
        }),
        fetch('/api/sandbox', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [{ role: 'user', content: buildFewShotPrompt() }], systemPrompt: 'Ты классификатор. Следуй формату примеров. Отвечай одним словом.', temperature: 0.1, max_tokens: 32, model: currentModel, apiToken: apiToken || undefined }),
        }),
      ]);
      const zData = await zRes.json();
      const fData = await fRes.json();
      setZeroResponse(zData.content || 'Пустой ответ');
      setFewResponse(fData.content || 'Пустой ответ');
    } catch {
      setZeroResponse('Ошибка'); setFewResponse('Ошибка');
    } finally {
      setLoading(false);
    }
  }, [task, examples, loading, currentModel, apiToken]);

  const zeroTokens = Math.round(buildZeroShotPrompt().length / 3);
  const fewTokens = Math.round(buildFewShotPrompt().length / 3);

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs">Песочница</Badge>
        </div>
        <p className="text-base text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Task */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Задача</label>
          <Input value={task} onChange={(e) => setTask(e.target.value)} className="text-sm" />
        </div>

        {/* Examples */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Примеры (Few-shot)</label>
          <div className="space-y-2">
            {examples.map((ex) => (
              <div key={ex.id} className="flex items-center gap-2 rounded-lg border border-border p-2">
                <div className="flex-1 space-y-0.5">
                  <div className="text-xs"><span className="text-muted-foreground">Вход:</span> {ex.input}</div>
                  <div className="text-xs"><span className="text-muted-foreground">Выход:</span> <span className="font-medium">{ex.output}</span></div>
                </div>
                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => removeExample(ex.id)}><Trash2 className="h-2.5 w-2.5" /></Button>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-2 items-end">
            <Input value={newInput} onChange={(e) => setNewInput(e.target.value)} placeholder="Вход" className="text-sm h-8" />
            <Input value={newOutput} onChange={(e) => setNewOutput(e.target.value)} placeholder="Выход" className="text-sm h-8" />
            <Button size="sm" onClick={addExample} disabled={!newInput.trim() || !newOutput.trim()} className="gap-1 shrink-0 h-8">
              <Plus className="h-3 w-3" /> Добавить
            </Button>
          </div>
        </div>

        {/* Token comparison */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-md bg-muted/30 border border-border p-2 text-center">
            <div className="text-[10px] text-muted-foreground">Zero-shot</div>
            <div className="text-sm font-bold">{zeroTokens} токенов</div>
          </div>
          <div className="rounded-md bg-primary/5 border border-primary/10 p-2 text-center">
            <div className="text-[10px] text-muted-foreground">Few-shot</div>
            <div className="text-sm font-bold">{fewTokens} токенов</div>
          </div>
        </div>

        {/* Run */}
        <div className="flex gap-2">
          <Button size="sm" onClick={handleCompare} disabled={loading} className="gap-1.5">
            {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
            Сравнить Zero-shot vs Few-shot
          </Button>
          <Button size="sm" variant="outline" onClick={() => { setExamples([]); setZeroResponse(''); setFewResponse(''); setShowComparison(false); }} className="gap-1.5">
            <RotateCcw className="h-3 w-3" /> Сбросить
          </Button>
        </div>

        {/* Comparison */}
        {showComparison && (
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-border p-3">
              <Badge variant="outline" className="text-[10px] mb-2">Zero-shot</Badge>
              <MarkdownRenderer content={zeroResponse || '...'} />
            </div>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
              <Badge className="text-[10px] mb-2">Few-shot</Badge>
              <MarkdownRenderer content={fewResponse || '...'} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
