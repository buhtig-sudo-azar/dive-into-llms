'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Network, Plus, Trash2, RotateCcw } from 'lucide-react';

interface TextItem { id: number; content: string; }

const SAMPLES: TextItem[] = [
  { id: 1, content: 'Машинное обучение позволяет компьютерам учиться на данных без явного программирования' },
  { id: 2, content: 'Нейронные сети — основа глубокого обучения и современных AI-систем' },
  { id: 3, content: 'Рецепт борща: свёкла, капуста, картофель, морковь, лук, томатная паста' },
];

function tokenize(text: string): Set<string> {
  return new Set(text.toLowerCase().replace(/[^\wа-яё]/gi, ' ').split(/\s+/).filter((w) => w.length > 2));
}

function similarity(a: string, b: string): number {
  if (a === b) return 1;
  const tA = tokenize(a), tB = tokenize(b);
  const intersection = [...tA].filter((w) => tB.has(w)).length;
  return intersection / ((tA.size + tB.size) / 2) || 0;
}

export function EmbeddingVisualizer({ title, description }: { title: string; description: string }) {
  const [texts, setTexts] = useState<TextItem[]>(SAMPLES);
  const [newText, setNewText] = useState('');
  const [idCounter, setIdCounter] = useState(4);

  const addText = () => {
    if (!newText.trim()) return;
    setTexts((p) => [...p, { id: idCounter, content: newText.trim() }]);
    setIdCounter((p) => p + 1);
    setNewText('');
  };
  const removeText = (id: number) => setTexts((p) => p.filter((t) => t.id !== id));

  const matrix = useMemo(() => {
    return texts.map((a) => texts.map((b) => Math.round(similarity(a.content, b.content) * 100) / 100));
  }, [texts]);

  const positions = useMemo(() => {
    if (texts.length <= 1) return texts.map(() => ({ x: 50, y: 50 }));
    const pos = texts.map(() => ({ x: Math.random() * 60 + 20, y: Math.random() * 60 + 20 }));
    for (let iter = 0; iter < 50; iter++) {
      for (let i = 0; i < texts.length; i++) {
        for (let j = i + 1; j < texts.length; j++) {
          const sim = similarity(texts[i].content, texts[j].content);
          const dx = pos[j].x - pos[i].x, dy = pos[j].y - pos[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const target = (1 - sim) * 40;
          const force = (dist - target) * 0.05;
          const fx = (dx / dist) * force, fy = (dy / dist) * force;
          pos[i].x += fx; pos[i].y += fy;
          pos[j].x -= fx; pos[j].y -= fy;
        }
      }
      for (const p of pos) { p.x = Math.max(5, Math.min(95, p.x)); p.y = Math.max(5, Math.min(95, p.y)); }
    }
    return pos;
  }, [texts]);

  const simColor = (v: number) => v > 0.5 ? 'bg-green-500/20 text-green-700 dark:text-green-400' : v > 0.2 ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400' : 'bg-red-500/20 text-red-700 dark:text-red-400';

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Network className="h-4 w-4 text-primary" />
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs">Песочница</Badge>
        </div>
        <p className="text-base text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add text */}
        <div className="flex gap-2">
          <Input value={newText} onChange={(e) => setNewText(e.target.value)} placeholder="Добавьте текст для сравнения..." className="text-sm"
            onKeyDown={(e) => { if (e.key === 'Enter') addText(); }} />
          <Button size="sm" onClick={addText} disabled={!newText.trim()} className="gap-1.5 shrink-0">
            <Plus className="h-3 w-3" /> Добавить
          </Button>
        </div>

        {/* Text list */}
        <div className="flex flex-wrap gap-1.5">
          {texts.map((t) => (
            <Badge key={t.id} variant="outline" className="text-xs gap-1 pr-0.5">
              {t.content.slice(0, 40)}{t.content.length > 40 ? '...' : ''}
              <button onClick={() => removeText(t.id)} className="ml-1 rounded-full p-0.5 hover:bg-destructive/10">
                <Trash2 className="h-2.5 w-2.5" />
              </button>
            </Badge>
          ))}
        </div>

        {/* Similarity matrix */}
        {texts.length > 1 && (
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Матрица сходства</label>
            <div className="overflow-x-auto">
              <table className="text-xs border-collapse">
                <thead>
                  <tr>
                    <th className="p-1" />
                    {texts.map((t, i) => <th key={t.id} className="p-1 font-normal text-muted-foreground max-w-[60px] truncate">{i + 1}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((row, i) => (
                    <tr key={texts[i].id}>
                      <td className="p-1 font-normal text-muted-foreground max-w-[60px] truncate">{i + 1}</td>
                      {row.map((val, j) => (
                        <td key={j} className={`p-1 text-center rounded ${i === j ? 'bg-primary/10' : simColor(val)}`}>
                          {val.toFixed(2)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2D visualization */}
        {texts.length > 1 && (
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Пространство эмбеддингов (2D)</label>
            <div className="relative w-full h-[200px] rounded-lg border border-border bg-muted/10 overflow-hidden">
              {texts.map((t, i) => (
                <div key={t.id} className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%` }}>
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <div className="text-[9px] text-muted-foreground whitespace-nowrap mt-0.5">{t.content.slice(0, 25)}...</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button size="sm" variant="outline" onClick={() => { setTexts(SAMPLES); setNewText(''); }} className="gap-1.5">
          <RotateCcw className="h-3 w-3" /> Сбросить
        </Button>
      </CardContent>
    </Card>
  );
}
