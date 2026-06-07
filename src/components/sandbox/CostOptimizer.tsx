'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, RotateCcw } from 'lucide-react';

interface ModelPrice { id: string; name: string; inputPerM: number; outputPerM: number; color: string; }

const MODELS: ModelPrice[] = [
  { id: 'gpt4o', name: 'GPT-4o', inputPerM: 5.00, outputPerM: 15.00, color: 'bg-green-500' },
  { id: 'gpt4omini', name: 'GPT-4o-mini', inputPerM: 0.15, outputPerM: 0.60, color: 'bg-emerald-400' },
  { id: 'claude35', name: 'Claude 3.5 Sonnet', inputPerM: 3.00, outputPerM: 15.00, color: 'bg-amber-500' },
  { id: 'llama70b', name: 'Llama 3.1 70B (Groq)', inputPerM: 0.60, outputPerM: 0.80, color: 'bg-blue-500' },
  { id: 'mistral', name: 'Mistral Large', inputPerM: 2.00, outputPerM: 6.00, color: 'bg-purple-500' },
  { id: 'local', name: 'Локально (бесплатно)', inputPerM: 0, outputPerM: 0, color: 'bg-zinc-500' },
];

export function CostOptimizer({ title, description }: { title: string; description: string }) {
  const [selected, setSelected] = useState<Set<string>>(new Set(['gpt4o', 'gpt4omini', 'local']));
  const [reqPerDay, setReqPerDay] = useState(100);
  const [avgInput, setAvgInput] = useState(500);
  const [avgOutput, setAvgOutput] = useState(200);

  const toggleModel = (id: string) => setSelected((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const costs = useMemo(() => {
    const result: Record<string, { daily: number; monthly: number; yearly: number }> = {};
    for (const m of MODELS) {
      if (!selected.has(m.id)) continue;
      const daily = (reqPerDay * avgInput / 1_000_000 * m.inputPerM) + (reqPerDay * avgOutput / 1_000_000 * m.outputPerM);
      result[m.id] = { daily, monthly: daily * 30, yearly: daily * 365 };
    }
    return result;
  }, [selected, reqPerDay, avgInput, avgOutput]);

  const maxMonthly = Math.max(...Object.values(costs).map((c) => c.monthly), 0.01);

  const tips = useMemo(() => {
    const t: string[] = [];
    if (selected.has('gpt4o') && reqPerDay > 500) t.push('Рассмотрите GPT-4o-mini для простых задач — экономия до 96%');
    if (avgInput > 500 && !selected.has('local')) t.push('Сократите промпты или используйте кэширование промптов');
    if (Object.keys(costs).some((k) => costs[k].monthly > 100) && !selected.has('local')) t.push('Попробуйте локальные модели для разработки — полностью бесплатно');
    if (selected.has('gpt4o') && selected.has('gpt4omini')) t.push('Используйте GPT-4o для сложных задач и GPT-4o-mini для простых (маршрутизация)');
    if (reqPerDay > 200 && !selected.has('llama70b')) t.push('Llama 3.1 70B через Groq — быстрый и дешёвый вариант');
    return t;
  }, [selected, reqPerDay, avgInput, costs]);

  const savings = useMemo(() => {
    const monthlyCosts = Object.values(costs).map((c) => c.monthly);
    if (monthlyCosts.length < 2) return null;
    const max = Math.max(...monthlyCosts);
    const min = Math.min(...monthlyCosts);
    return { amount: max - min, pct: Math.round(((max - min) / max) * 100) };
  }, [costs]);

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-primary" />
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs">Песочница</Badge>
        </div>
        <p className="text-base text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Model selection */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Модели для сравнения</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {MODELS.map((m) => (
              <button key={m.id} onClick={() => toggleModel(m.id)}
                className={`flex items-center gap-2 rounded-lg border p-2 text-left text-xs transition-colors ${
                  selected.has(m.id) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
                }`}>
                <div className={`w-2.5 h-2.5 rounded-full ${m.color} shrink-0`} />
                <div>
                  <div className="font-medium">{m.name}</div>
                  {m.inputPerM > 0 ? (
                    <div className="text-[10px] text-muted-foreground">${m.inputPerM} / ${m.outputPerM} за 1M токенов</div>
                  ) : (
                    <div className="text-[10px] text-green-600">Бесплатно</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Parameters */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-muted-foreground">Запросов в день</label>
              <span className="text-xs font-mono font-bold text-primary">{reqPerDay}</span>
            </div>
            <Slider value={[reqPerDay]} onValueChange={([v]) => setReqPerDay(v)} min={1} max={1000} step={1} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-muted-foreground">Среднее входных токенов</label>
              <span className="text-xs font-mono font-bold text-primary">{avgInput}</span>
            </div>
            <Slider value={[avgInput]} onValueChange={([v]) => setAvgInput(v)} min={50} max={2000} step={50} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-muted-foreground">Среднее выходных токенов</label>
              <span className="text-xs font-mono font-bold text-primary">{avgOutput}</span>
            </div>
            <Slider value={[avgOutput]} onValueChange={([v]) => setAvgOutput(v)} min={50} max={2000} step={50} />
          </div>
        </div>

        {/* Cost comparison */}
        {Object.keys(costs).length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Стоимость в месяц ($)</label>
            {MODELS.filter((m) => selected.has(m.id)).map((m) => {
              const c = costs[m.id];
              if (!c) return null;
              return (
                <div key={m.id} className="flex items-center gap-2">
                  <div className="w-24 text-xs font-medium truncate">{m.name}</div>
                  <div className="flex-1 h-5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${m.color} rounded-full`} style={{ width: `${(c.monthly / maxMonthly) * 100}%`, minWidth: '2px' }} />
                  </div>
                  <div className="text-xs font-mono w-20 text-right">${c.monthly.toFixed(2)}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Savings */}
        {savings && (
          <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-2 text-xs">
            Экономия при переключении: ${savings.amount.toFixed(2)}/мес ({savings.pct}%)
          </div>
        )}

        {/* Tips */}
        {tips.length > 0 && (
          <div className="rounded-lg bg-primary/5 border border-primary/10 p-2 space-y-1">
            <div className="text-xs font-medium text-primary">Советы по оптимизации:</div>
            {tips.map((t, i) => <div key={i} className="text-xs text-muted-foreground">• {t}</div>)}
          </div>
        )}

        <Button size="sm" variant="outline" onClick={() => { setSelected(new Set(['gpt4o', 'gpt4omini', 'local'])); setReqPerDay(100); setAvgInput(500); setAvgOutput(200); }} className="gap-1.5">
          <RotateCcw className="h-3 w-3" /> Сбросить
        </Button>
      </CardContent>
    </Card>
  );
}
