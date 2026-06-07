'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, RotateCcw, ArrowUp, ArrowDown } from 'lucide-react';

interface Doc { id: number; title: string; snippet: string; initialScore: number; rerankScore?: number; }

const DEFAULT_DOCS: Doc[] = [
  { id: 1, title: 'Банковские счета для физических лиц', snippet: 'Полное руководство по открытию, ведению и закрытию банковских счетов.', initialScore: 0.85 },
  { id: 2, title: 'Документы для открытия расчётного счёта', snippet: 'Перечень документов для открытия расчётного счёта ИП и ООО.', initialScore: 0.78 },
  { id: 3, title: 'Открытие депозитного вклада', snippet: 'Условия и процедура открытия депозитного вклада в Сбербанке.', initialScore: 0.72 },
  { id: 4, title: 'Как зарегистрировать ИП пошагово', snippet: 'Пошаговая инструкция по регистрации индивидуального предпринимателя.', initialScore: 0.65 },
  { id: 5, title: 'Рецепт яблочного пирога от бабушки', snippet: 'Лучший рецепт яблочного пирога с корицей и карамелью.', initialScore: 0.31 },
  { id: 6, title: 'Обзор лучших ресторанов Москвы', snippet: 'Топ-10 ресторанов Москвы по версии критиков 2024.', initialScore: 0.22 },
];

const RERANK_MAP: Record<number, number> = { 1: 0.95, 2: 0.88, 3: 0.84, 4: 0.52, 5: 0.12, 6: 0.08 };

export function RerankingLab({ title, description }: { title: string; description: string }) {
  const [query, setQuery] = useState('Как открыть банковский счёт?');
  const [userOrder, setUserOrder] = useState<number[]>(DEFAULT_DOCS.map((d) => d.id));
  const [algoOrder, setAlgoOrder] = useState<number[] | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const moveInUser = (id: number, dir: -1 | 1) => {
    setUserOrder((prev) => {
      const idx = prev.indexOf(id);
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const arr = [...prev];
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
      return arr;
    });
  };

  const handleRerank = () => {
    const ranked = [...DEFAULT_DOCS].sort((a, b) => (RERANK_MAP[b.id] || 0) - (RERANK_MAP[a.id] || 0)).map((d) => d.id);
    setAlgoOrder(ranked);
    setShowComparison(true);
  };

  const getDoc = (id: number) => DEFAULT_DOCS.find((d) => d.id === id)!;

  const computeNDCG = (order: number[], ideal: number[]): number => {
    const dcg = order.reduce((sum, id, i) => {
      const rel = RERANK_MAP[id] || 0;
      return sum + rel / Math.log2(i + 2);
    }, 0);
    const idcg = ideal.reduce((sum, id, i) => {
      const rel = RERANK_MAP[id] || 0;
      return sum + rel / Math.log2(i + 2);
    }, 0);
    return idcg > 0 ? Math.round((dcg / idcg) * 100) : 0;
  };

  const idealOrder = [...DEFAULT_DOCS].sort((a, b) => (RERANK_MAP[b.id] || 0) - (RERANK_MAP[a.id] || 0)).map((d) => d.id);
  const userNDCG = computeNDCG(userOrder, idealOrder);
  const algoNDCG = algoOrder ? computeNDCG(algoOrder, idealOrder) : 0;

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-primary" />
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs">Песочница</Badge>
        </div>
        <p className="text-base text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Query */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Запрос</label>
          <Input value={query} onChange={(e) => setQuery(e.target.value)} className="text-sm" />
        </div>

        {!showComparison ? (
          /* Manual reranking */
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Перетащите результаты (кнопками ↑↓) по релевантности</label>
            <div className="space-y-2">
              {userOrder.map((id, idx) => {
                const doc = getDoc(id);
                return (
                  <div key={id} className="flex items-center gap-2 rounded-lg border border-border p-2">
                    <span className="text-xs font-mono text-muted-foreground w-5">#{idx + 1}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{doc.title}</div>
                      <div className="text-xs text-muted-foreground">{doc.snippet}</div>
                    </div>
                    <Badge variant="outline" className="text-[10px]">{doc.initialScore}</Badge>
                    <div className="flex flex-col gap-0.5">
                      <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => moveInUser(id, -1)} disabled={idx === 0}><ArrowUp className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => moveInUser(id, 1)} disabled={idx === userOrder.length - 1}><ArrowDown className="h-3 w-3" /></Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Comparison */
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Ваш рейтинг (NDCG: {userNDCG}%)</label>
              <div className="space-y-1.5">
                {userOrder.map((id, idx) => {
                  const doc = getDoc(id);
                  const matchAlgo = algoOrder && algoOrder[idx] === id;
                  return (
                    <div key={id} className={`rounded-lg border p-1.5 text-xs ${matchAlgo ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                      <div className="font-medium">#{idx + 1} {doc.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Алгоритм (NDCG: {algoNDCG}%)</label>
              <div className="space-y-1.5">
                {algoOrder!.map((id, idx) => {
                  const doc = getDoc(id);
                  return (
                    <div key={id} className="rounded-lg border border-primary/20 bg-primary/5 p-1.5 text-xs">
                      <div className="font-medium">#{idx + 1} {doc.title} <span className="text-primary font-mono">({RERANK_MAP[id]})</span></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {!showComparison ? (
            <Button size="sm" onClick={handleRerank} className="gap-1.5">
              <ArrowUpDown className="h-3 w-3" /> Реранк алгоритмом
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setShowComparison(false)} className="gap-1.5">
              Назад к редактированию
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={() => { setUserOrder(DEFAULT_DOCS.map((d) => d.id)); setAlgoOrder(null); setShowComparison(false); }} className="gap-1.5">
            <RotateCcw className="h-3 w-3" /> Сбросить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
