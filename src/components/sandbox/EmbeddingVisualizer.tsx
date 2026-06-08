'use client';

import { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Network, Plus, Trash2, RotateCcw, Loader2, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useModelStore } from '@/store/model-store';

interface TextItem {
  id: number;
  content: string;
}

const SAMPLES: TextItem[] = [
  { id: 1, content: 'Машинное обучение позволяет компьютерам учиться на данных без явного программирования' },
  { id: 2, content: 'Нейронные сети — основа глубокого обучения и современных AI-систем' },
  { id: 3, content: 'Рецепт борща: свёкла, капуста, картофель, морковь, лук, томатная паста' },
  { id: 4, content: 'Искусственный интеллект трансформирует индустрию здравоохранения' },
  { id: 5, content: 'Пирог с яблоками: тесто, сахар, масло, корица, свежие яблоки' },
];

export function EmbeddingVisualizer({ title, description }: { title: string; description: string }) {
  const [texts, setTexts] = useState<TextItem[]>(SAMPLES);
  const [newText, setNewText] = useState('');
  const [idCounter, setIdCounter] = useState(6);
  const [loading, setLoading] = useState(false);
  const [similarities, setSimilarities] = useState<number[][] | null>(null);
  const [positions2d, setPositions2d] = useState<number[][] | null>(null);
  const [embedSource, setEmbedSource] = useState<string>('');
  const [embedModel, setEmbedModel] = useState<string>('');
  const [hoveredPair, setHoveredPair] = useState<[number, number] | null>(null);
  const [showGuide, setShowGuide] = useState(true);

  const apiToken = useModelStore((s) => s.apiToken);

  const addText = () => {
    if (!newText.trim()) return;
    setTexts((p) => [...p, { id: idCounter, content: newText.trim() }]);
    setIdCounter((p) => p + 1);
    setNewText('');
    // Сбрасываем результаты — нужно пересчитать
    setSimilarities(null);
    setPositions2d(null);
  };

  const removeText = (id: number) => {
    setTexts((p) => p.filter((t) => t.id !== id));
    setSimilarities(null);
    setPositions2d(null);
  };

  /* Вычисление эмбеддингов через API */
  const computeEmbeddings = useCallback(async () => {
    if (texts.length < 2 || loading) return;
    setLoading(true);
    setSimilarities(null);
    setPositions2d(null);

    try {
      const res = await fetch('/api/embeddings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texts: texts.map((t) => t.content),
          apiToken: apiToken || undefined,
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setSimilarities(data.similarities);
      setPositions2d(data.positions2d);
      setEmbedSource(data.source);
      setEmbedModel(data.model);
    } catch (err: unknown) {
      console.error('Embedding error:', err);
      // Фолбэк — простая локальная оценка
      computeLocalFallback();
    } finally {
      setLoading(false);
    }
  }, [texts, loading, apiToken]);

  /* Простой фолбэк на основе word overlap */
  const computeLocalFallback = () => {
    const tokenize = (text: string) =>
      new Set(text.toLowerCase().replace(/[^\wа-яё]/gi, ' ').split(/\s+/).filter((w) => w.length > 2));

    const sim = (a: string, b: string) => {
      if (a === b) return 1;
      const tA = tokenize(a), tB = tokenize(b);
      const intersection = [...tA].filter((w) => tB.has(w)).length;
      return intersection / ((tA.size + tB.size) / 2) || 0;
    };

    const sims = texts.map((a) =>
      texts.map((b) => Math.round(sim(a.content, b.content) * 100) / 100)
    );
    setSimilarities(sims);
    setEmbedSource('local-fallback');
    setEmbedModel('word-overlap');

    // Простой force-directed layout
    const pos = texts.map(() => ({ x: 50, y: 50 }));
    for (let iter = 0; iter < 200; iter++) {
      for (let i = 0; i < texts.length; i++) {
        for (let j = i + 1; j < texts.length; j++) {
          const s = sims[i][j];
          const dx = pos[j].x - pos[i].x;
          const dy = pos[j].y - pos[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const target = (1 - s) * 40;
          const force = (dist - target) * 0.03;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          pos[i].x += fx;
          pos[i].y += fy;
          pos[j].x -= fx;
          pos[j].y -= fy;
        }
      }
      for (const p of pos) {
        p.x = Math.max(8, Math.min(92, p.x));
        p.y = Math.max(8, Math.min(92, p.y));
      }
    }
    setPositions2d(pos.map((p) => [p.x, p.y]));
  };

  const handleReset = () => {
    setTexts(SAMPLES);
    setNewText('');
    setIdCounter(6);
    setSimilarities(null);
    setPositions2d(null);
    setEmbedSource('');
    setEmbedModel('');
  };

  const simColor = (v: number) =>
    v >= 0.8
      ? 'bg-green-500/30 text-green-700 dark:text-green-300'
      : v >= 0.5
        ? 'bg-green-500/15 text-green-600 dark:text-green-400'
        : v >= 0.3
          ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
          : 'bg-red-500/15 text-red-700 dark:text-red-400';

  const simLabel = (v: number) =>
    v >= 0.8 ? 'Очень похожи' : v >= 0.5 ? 'Похожи' : v >= 0.3 ? 'Слабое сходство' : 'Разные';

  const hasResults = similarities && positions2d;

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
        {/* ═══════ Инструкция ═══════ */}
        <div className="rounded-lg border border-primary/20 bg-primary/5">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="flex items-center justify-between w-full p-3"
          >
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm">Как работают эмбеддинги</span>
            </div>
            {showGuide ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showGuide && (
            <div className="px-3 pb-3 space-y-2 text-sm text-muted-foreground">
              <p>
                <b className="text-foreground">Эмбеддинг</b> — это числовой вектор, который представляет смысл текста.
                Тексты с похожим смыслом получают похожие векторы — они расположены близко в векторном пространстве.
                Тексты о разном — далеко друг от друга.
              </p>
              <p>
                Здесь используется <b className="text-foreground">косинусное сходство</b> для сравнения векторов:
                1.0 = идентичный смысл, 0.0 = совершенно разный. 2D-проекция строится через PCA (метод главных компонент).
              </p>
              <div className="rounded-md border border-amber-500/20 bg-amber-500/5 p-2.5 space-y-1">
                <span className="font-semibold text-xs text-amber-600">Попробуйте:</span>
                <ul className="text-xs space-y-0.5 list-disc list-inside">
                  <li>Добавьте текст про AI и текст про готовку — увидите, что AI-тексты сгруппируются</li>
                  <li>Наведите на ячейку матрицы — увидите оценку сходства и её интерпретацию</li>
                  <li>Добавьте текст &quot;Суп из овощей&quot; — он окажется рядом с рецептом борща</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* ═══════ Добавление текстов ═══════ */}
        <div className="flex gap-2">
          <Input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Добавьте текст для сравнения..."
            className="text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter') addText();
            }}
          />
          <Button size="sm" onClick={addText} disabled={!newText.trim()} className="gap-1.5 shrink-0">
            <Plus className="h-3 w-3" /> Добавить
          </Button>
        </div>

        {/* Список текстов */}
        <div className="space-y-1.5">
          {texts.map((t, idx) => (
            <div
              key={t.id}
              className="flex items-start gap-2 rounded-md border border-border bg-card p-2 text-sm"
              onMouseEnter={() => setHoveredPair([idx, idx])}
              onMouseLeave={() => setHoveredPair(null)}
            >
              <span className="text-xs font-mono text-muted-foreground mt-0.5 shrink-0">{idx + 1}.</span>
              <span className="flex-1">{t.content}</span>
              <button
                onClick={() => removeText(t.id)}
                className="shrink-0 rounded-full p-1 hover:bg-destructive/10"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Кнопка вычисления */}
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={computeEmbeddings} disabled={texts.length < 2 || loading} className="gap-1.5">
            {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Network className="h-3 w-3" />}
            {loading ? 'Вычисление...' : hasResults ? 'Пересчитать' : 'Вычислить эмбеддинги'}
          </Button>
          {hasResults && (
            <Badge variant="outline" className="text-[10px]">
              {embedSource === 'api' ? `Модель: ${embedModel}` : 'Локальная оценка'}
            </Badge>
          )}
          <Button size="sm" variant="outline" onClick={handleReset} className="gap-1.5 ml-auto">
            <RotateCcw className="h-3 w-3" /> Сбросить
          </Button>
        </div>

        {/* ═══════ Матрица сходства ═══════ */}
        {hasResults && similarities && (
          <div>
            <label className="text-sm font-medium mb-2 block">Матрица косинусного сходства</label>
            <div className="overflow-x-auto">
              <table className="text-xs border-collapse w-full">
                <thead>
                  <tr>
                    <th className="p-1.5 text-left" />
                    {texts.map((t, i) => (
                      <th key={t.id} className="p-1.5 font-normal text-muted-foreground min-w-[50px]">
                        <div className="truncate max-w-[60px]" title={t.content}>{i + 1}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {similarities.map((row, i) => (
                    <tr key={texts[i].id}>
                      <td className="p-1.5 font-normal text-muted-foreground text-right">
                        <div className="truncate max-w-[60px]" title={texts[i].content}>{i + 1}</div>
                      </td>
                      {row.map((val, j) => (
                        <td
                          key={j}
                          className={`p-1.5 text-center rounded cursor-default transition-colors ${
                            i === j ? 'bg-primary/10 font-bold' : simColor(val)
                          } ${hoveredPair && (hoveredPair[0] === i || hoveredPair[1] === i || hoveredPair[0] === j || hoveredPair[1] === j) ? 'ring-1 ring-primary/40' : ''}`}
                          onMouseEnter={() => setHoveredPair([i, j])}
                          onMouseLeave={() => setHoveredPair(null)}
                          title={`${texts[i].content.slice(0, 30)}... ↔ ${texts[j].content.slice(0, 30)}... : ${val.toFixed(2)} — ${simLabel(val)}`}
                        >
                          {val.toFixed(2)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Подсказка при наведении */}
            {hoveredPair && hoveredPair[0] !== hoveredPair[1] && (
              <div className="mt-2 text-xs text-muted-foreground bg-muted/30 rounded p-2">
                <b>{hoveredPair[0] + 1}</b> ↔ <b>{hoveredPair[1] + 1}</b>:{' '}
                сходство = <b>{similarities[hoveredPair[0]][hoveredPair[1]].toFixed(2)}</b> — {simLabel(similarities[hoveredPair[0]][hoveredPair[1]])}
              </div>
            )}

            {/* Легенда */}
            <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500/30" /> ≥ 0.8 Очень похожи</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500/15" /> ≥ 0.5 Похожи</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-500/15" /> ≥ 0.3 Слабое</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500/15" /> &lt; 0.3 Разные</span>
            </div>
          </div>
        )}

        {/* ═══════ 2D визуализация ═══════ */}
        {hasResults && positions2d && (
          <div>
            <label className="text-sm font-medium mb-2 block">Пространство эмбеддингов (PCA → 2D)</label>
            <div className="relative w-full h-[280px] rounded-lg border border-border bg-muted/10 overflow-hidden">
              {/* Сетка */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Линии связи между похожими текстами */}
                {texts.map((_, i) =>
                  texts.map((_, j) => {
                    if (j <= i || !similarities || similarities[i][j] < 0.3) return null;
                    return (
                      <line
                        key={`${i}-${j}`}
                        x1={positions2d[i][0]}
                        y1={positions2d[i][1]}
                        x2={positions2d[j][0]}
                        y2={positions2d[j][1]}
                        stroke="currentColor"
                        strokeOpacity={Math.min(1, similarities[i][j])}
                        strokeWidth={similarities[i][j] > 0.7 ? 0.5 : 0.2}
                        className={similarities[i][j] > 0.7 ? 'text-green-500' : 'text-amber-500'}
                      />
                    );
                  })
                )}
              </svg>

              {/* Точки и подписи */}
              {texts.map((t, i) => {
                const isHighlighted = hoveredPair !== null && (hoveredPair[0] === i || hoveredPair[1] === i);
                return (
                  <div
                    key={t.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      isHighlighted ? 'z-10 scale-125' : 'z-0'
                    }`}
                    style={{ left: `${positions2d[i][0]}%`, top: `${positions2d[i][1]}%` }}
                    onMouseEnter={() => setHoveredPair([i, i])}
                    onMouseLeave={() => setHoveredPair(null)}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 border-background shadow-sm ${
                      isHighlighted ? 'bg-primary' : 'bg-primary/70'
                    }`} />
                    <div className={`text-[10px] whitespace-nowrap mt-1 text-center font-medium ${
                      isHighlighted ? 'text-foreground' : 'text-muted-foreground'
                    }`} style={{ transform: 'translateX(-25%)' }}>
                      <span className="bg-background/80 px-1 rounded">{i + 1}. {t.content.slice(0, 30)}{t.content.length > 30 ? '...' : ''}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
