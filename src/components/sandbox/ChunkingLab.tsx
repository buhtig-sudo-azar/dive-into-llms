'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Scissors, RotateCcw } from 'lucide-react';

const SAMPLE_TEXT = `Искусственный интеллект (ИИ) — это область компьютерных наук, занимающаяся созданием систем, способных выполнять задачи, требующие человеческого интеллекта. К таким задачам относятся распознавание речи, принятие решений, перевод языков и визуальное восприятие.

Машинное обучение — подраздел ИИ, в котором системы обучаются на данных, а не программируются явно. Алгоритмы находят закономерности в обучающей выборке и делают предсказания на новых данных.

Нейронные сети вдохновлены структурой мозга. Они состоят из слоёв нейронов, каждый из которых преобразует входные данные. Глубокое обучение использует многослойные сети для сложных задач.

Трансформеры — архитектура нейросетей, основанная на механизме внимания. Они произвели революцию в обработке языка и стали основой моделей GPT, BERT и других LLM.

Большие языковые модели (LLM) обучаются на огромных корпусах текста и могут генерировать связный текст, отвечать на вопросы и выполнять разнообразные задачи на естественном языке.`;

type Strategy = 'fixed' | 'recursive' | 'sentences';

function approxTokens(text: string): number {
  const russianChars = (text.match(/[а-яА-ЯёЁ]/g) || []).length;
  const totalChars = text.length;
  const ratio = russianChars / (totalChars || 1);
  return Math.round(totalChars / (2.5 * ratio + 4 * (1 - ratio)));
}

function chunkText(text: string, strategy: Strategy, size: number, overlap: number): string[] {
  const overlapChars = Math.round(overlap * 0.01 * size * 4);
  if (strategy === 'fixed') {
    const chunkChars = size * 4;
    const chunks: string[] = [];
    let pos = 0;
    while (pos < text.length) {
      const end = Math.min(pos + chunkChars, text.length);
      chunks.push(text.slice(pos, end).trim());
      pos = end - overlapChars;
      if (pos <= 0 || chunks.length > 50) break;
    }
    return chunks.filter((c) => c.length > 0);
  }
  if (strategy === 'sentences') {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
    const chunks: string[] = [];
    let current = '';
    for (const s of sentences) {
      if (approxTokens(current + s) > size && current) {
        chunks.push(current.trim());
        const words = current.split(/\s+/);
        const overlapWords = words.slice(-Math.ceil(overlap * words.length / 100));
        current = overlapWords.join(' ') + ' ' + s;
      } else {
        current += ' ' + s;
      }
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks;
  }
  // recursive
  const paragraphs = text.split(/\n\n+/).filter(Boolean);
  const chunks: string[] = [];
  let current = '';
  for (const p of paragraphs) {
    if (approxTokens(current + p) > size && current) {
      chunks.push(current.trim());
      current = p;
    } else {
      current += '\n\n' + p;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

const COLORS = ['bg-blue-500/10 border-blue-500/20', 'bg-green-500/10 border-green-500/20', 'bg-amber-500/10 border-amber-500/20', 'bg-purple-500/10 border-purple-500/20', 'bg-rose-500/10 border-rose-500/20', 'bg-cyan-500/10 border-cyan-500/20'];

export function ChunkingLab({ title, description }: { title: string; description: string }) {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [strategy, setStrategy] = useState<Strategy>('recursive');
  const [chunkSize, setChunkSize] = useState(256);
  const [overlapPct, setOverlapPct] = useState(10);

  const chunks = useMemo(() => chunkText(text, strategy, chunkSize, overlapPct), [text, strategy, chunkSize, overlapPct]);
  const totalTokens = useMemo(() => approxTokens(text), [text]);
  const chunkTokens = useMemo(() => chunks.map(approxTokens), [chunks]);

  const handleReset = () => { setText(SAMPLE_TEXT); setStrategy('recursive'); setChunkSize(256); setOverlapPct(10); };

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Scissors className="h-4 w-4 text-primary" />
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs">Песочница</Badge>
        </div>
        <p className="text-base text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Text input */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Текст для разбиения ({totalTokens} токенов)</label>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} className="text-sm min-h-[100px] resize-y" />
        </div>

        {/* Strategy selector */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Стратегия чанкинга</label>
          <div className="grid grid-cols-3 gap-2">
            {([['fixed', 'Фиксированный'], ['recursive', 'Рекурсивный'], ['sentences', 'По предложениям']] as [Strategy, string][]).map(([key, label]) => (
              <button key={key} onClick={() => setStrategy(key)}
                className={`rounded-lg border p-2 text-sm text-center transition-colors ${
                  strategy === key ? 'border-primary bg-primary/5 font-medium' : 'border-border hover:border-primary/40'
                }`}>{label}</button>
            ))}
          </div>
        </div>

        {/* Parameters */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-muted-foreground">Размер чанка</label>
              <span className="text-xs font-mono font-bold text-primary">{chunkSize} токенов</span>
            </div>
            <Slider value={[chunkSize]} onValueChange={([v]) => setChunkSize(v)} min={64} max={1024} step={64} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-muted-foreground">Перекрытие (Overlap)</label>
              <span className="text-xs font-mono font-bold text-primary">{overlapPct}%</span>
            </div>
            <Slider value={[overlapPct]} onValueChange={([v]) => setOverlapPct(v)} min={0} max={50} step={5} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          {[
            ['Чанков', chunks.length],
            ['Средний размер', chunks.length ? Math.round(chunkTokens.reduce((a, b) => a + b, 0) / chunks.length) : 0],
            ['Перекрытие', `${overlapPct}%`],
            ['Покрытие', `${Math.min(100, Math.round((chunkTokens.reduce((a, b) => a + b, 0) / totalTokens) * 100))}%`],
          ].map(([label, val]) => (
            <div key={String(label)} className="rounded-md bg-card border border-border p-2 text-center">
              <div className="text-[10px] text-muted-foreground">{label}</div>
              <div className="text-sm font-bold">{val}</div>
            </div>
          ))}
        </div>

        {/* Chunks */}
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {chunks.map((chunk, i) => (
            <div key={i} className={`rounded-lg border p-2.5 ${COLORS[i % COLORS.length]}`}>
              <div className="flex items-center justify-between mb-1">
                <Badge variant="outline" className="text-[10px]">Чанк #{i + 1}</Badge>
                <span className="text-[10px] font-mono text-muted-foreground">{chunkTokens[i]} токенов</span>
              </div>
              <p className="text-xs leading-relaxed line-clamp-3">{chunk}</p>
            </div>
          ))}
        </div>

        <Button size="sm" variant="outline" onClick={handleReset} className="gap-1.5">
          <RotateCcw className="h-3 w-3" /> Сбросить
        </Button>
      </CardContent>
    </Card>
  );
}
