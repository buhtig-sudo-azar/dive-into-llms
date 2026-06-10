'use client';

import { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Network, Plus, Trash2, RotateCcw, Loader2, Info, ChevronDown, ChevronUp, Check } from 'lucide-react';
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

const STEPS = [
  { num: 1, title: 'Введите тексты', desc: 'Добавьте 2+ текста для сравнения' },
  { num: 2, title: 'Вычислите', desc: 'Нажмите кнопку вычисления эмбеддингов' },
  { num: 3, title: 'Сравните', desc: 'Изучите матрицу косинусного сходства' },
  { num: 4, title: 'Визуализируйте', desc: 'Исследуйте 2D-пространство эмбеддингов' },
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
  const [showGuide, setShowGuide] = useState(false);

  const apiToken = useModelStore((s) => s.apiToken);

  // Determine current step
  const currentStep = useMemo(() => {
    if (hasResults) return 4;
    if (texts.length >= 2) return 2;
    return 1;
  }, [texts.length, similarities, positions2d]);

  const addText = () => {
    if (!newText.trim()) return;
    setTexts((p) => [...p, { id: idCounter, content: newText.trim() }]);
    setIdCounter((p) => p + 1);
    setNewText('');
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

  // Вычисляем кластеры для 2D визуализации
  const clusters = useMemo(() => {
    if (!hasResults || !similarities || !positions2d) return [];
    const result: { indices: number[]; label: string }[] = [];
    const visited = new Set<number>();
    for (let i = 0; i < texts.length; i++) {
      if (visited.has(i)) continue;
      const cluster = [i];
      visited.add(i);
      for (let j = i + 1; j < texts.length; j++) {
        if (!visited.has(j) && similarities[i][j] >= 0.5) {
          cluster.push(j);
          visited.add(j);
        }
      }
      if (cluster.length > 1) {
        result.push({ indices: cluster, label: `Группа ${result.length + 1}` });
      }
    }
    // Mark unclustered items
    for (let i = 0; i < texts.length; i++) {
      if (!visited.has(i)) {
        // standalone — no group
      }
    }
    return result;
  }, [hasResults, similarities, positions2d, texts.length]);

  // Вычисляем позиции лейблов с rectangle-based collision avoidance
  const labelPositions = useMemo(() => {
    if (!positions2d || positions2d.length <= 1) {
      return positions2d?.map(() => ({ dir: 'bottom' as const, dx: 0, dy: 12 })) || [];
    }

    const labelH = 5;
    const charW = 1.2;
    const labelWidths = texts.map((t) => Math.min(35, 3 + t.content.slice(0, 25).length * charW + 4));

    const dirConfigs = [
      { dir: 'bottom' as const, dx: 0, dy: 5 },
      { dir: 'top' as const, dx: 0, dy: -5 },
      { dir: 'right' as const, dx: 5, dy: 0 },
      { dir: 'left' as const, dx: -5, dy: 0 },
      { dir: 'bottom-right' as const, dx: 4, dy: 4 },
      { dir: 'bottom-left' as const, dx: -4, dy: 4 },
      { dir: 'top-right' as const, dx: 4, dy: -4 },
      { dir: 'top-left' as const, dx: -4, dy: -4 },
    ];

    const rectsOverlap = (
      ax: number, ay: number, aw: number, ah: number,
      bx: number, by: number, bw: number, bh: number,
      padding: number = 1.5
    ): boolean => {
      return !(ax + aw + padding < bx || bx + bw + padding < ax ||
               ay + ah + padding < by || by + bh + padding < ay);
    };

    const results: { dir: string; dx: number; dy: number }[] = [];
    const placed: { x: number; y: number; w: number; h: number }[] = [];

    for (let i = 0; i < positions2d.length; i++) {
      const [px, py] = positions2d[i];
      const w = labelWidths[i];
      const h = labelH;

      let bestDir = dirConfigs[0];
      let bestScore = -Infinity;

      for (const cfg of dirConfigs) {
        const cx = px + cfg.dx;
        const cy = py + cfg.dy;
        const lx = cx - w / 2;
        const ly = cy - h / 2;

        let penalty = 0;
        if (lx < 2) penalty += (2 - lx) * 10;
        if (lx + w > 98) penalty += (lx + w - 98) * 10;
        if (ly < 2) penalty += (2 - ly) * 10;
        if (ly + h > 98) penalty += (ly + h - 98) * 10;

        let overlaps = 0;
        for (const rect of placed) {
          if (rectsOverlap(lx, ly, w, h, rect.x, rect.y, rect.w, rect.h)) {
            overlaps++;
          }
        }

        let minPointDist = Infinity;
        for (let j = 0; j < positions2d.length; j++) {
          if (i === j) continue;
          const dx = cx - positions2d[j][0];
          const dy = cy - positions2d[j][1];
          minPointDist = Math.min(minPointDist, Math.sqrt(dx * dx + dy * dy));
        }

        const score = minPointDist * 2 - overlaps * 100 - penalty;
        if (score > bestScore) {
          bestScore = score;
          bestDir = cfg;
        }
      }

      const finalCx = px + bestDir.dx;
      const finalCy = py + bestDir.dy;
      const finalLx = finalCx - w / 2;
      const finalLy = finalCy - h / 2;
      placed.push({ x: finalLx, y: finalLy, w, h });
      results.push({ dir: bestDir.dir, dx: bestDir.dx, dy: bestDir.dy });
    }

    return results;
  }, [positions2d, texts]);

  const clusterColors = [
    { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-600 dark:text-green-400', dot: 'bg-green-500' },
    { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-500' },
    { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-600 dark:text-purple-400', dot: 'bg-purple-500' },
    { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
  ];

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
        {/* ═══════ Шаги процесса ═══════ */}
        <div className="grid grid-cols-4 gap-2">
          {STEPS.map((step) => {
            const isActive = currentStep === step.num;
            const isDone = currentStep > step.num;
            return (
              <div
                key={step.num}
                className={`rounded-lg border p-2.5 text-center transition-all ${
                  isActive
                    ? 'border-primary/50 bg-primary/10 shadow-sm'
                    : isDone
                      ? 'border-green-500/30 bg-green-500/5'
                      : 'border-border bg-muted/30 opacity-60'
                }`}
              >
                <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mb-1 ${
                  isDone
                    ? 'bg-green-500 text-white'
                    : isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted-foreground/20 text-muted-foreground'
                }`}>
                  {isDone ? <Check className="h-3.5 w-3.5" /> : step.num}
                </div>
                <div className={`text-xs font-semibold ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Шаг {step.num}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{step.title}</div>
              </div>
            );
          })}
        </div>

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

        {/* ═══════ Шаг 1: Добавление текстов ═══════ */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">1</span>
            <span className="text-sm font-semibold">Введите тексты для сравнения</span>
          </div>
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
        </div>

        {/* ═══════ Шаг 2: Вычисление ═══════ */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
              currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20 text-muted-foreground'
            }`}>2</span>
            <span className="text-sm font-semibold">Вычислите эмбеддинги</span>
          </div>
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
        </div>

        {/* ═══════ Шаг 3: Матрица сходства ═══════ */}
        {hasResults && similarities && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">3</span>
              <span className="text-sm font-semibold">Сравните сходство текстов</span>
            </div>
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
                          title={`${texts[i].content.slice(0, 30)}... / ${texts[j].content.slice(0, 30)}... : ${val.toFixed(2)} — ${simLabel(val)}`}
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
                <b>{hoveredPair[0] + 1}</b> / <b>{hoveredPair[1] + 1}</b>:{' '}
                сходство = <b>{similarities[hoveredPair[0]][hoveredPair[1]].toFixed(2)}</b> — {simLabel(similarities[hoveredPair[0]][hoveredPair[1]])}
              </div>
            )}

            {/* Легенда */}
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500/30" /> ≥ 0.8 Очень похожи</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500/15" /> ≥ 0.5 Похожи</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-500/15" /> ≥ 0.3 Слабое</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500/15" /> &lt; 0.3 Разные</span>
            </div>
          </div>
        )}

        {/* ═══════ Шаг 4: 2D визуализация ═══════ */}
        {hasResults && positions2d && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">4</span>
              <span className="text-sm font-semibold">Визуализируйте пространство эмбеддингов</span>
            </div>

            {/* Кластеры — группы похожих текстов */}
            {clusters.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {clusters.map((cluster, ci) => {
                  const colors = clusterColors[ci % clusterColors.length];
                  return (
                    <div key={`cluster-badge-${ci}`} className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs ${colors.bg} ${colors.border}`}>
                      <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                      <span className={`font-semibold ${colors.text}`}>{cluster.label}</span>
                      <span className="text-muted-foreground">({cluster.indices.map(i => i + 1).join(', ')})</span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="relative w-full h-[360px] rounded-lg border border-border bg-muted/10 overflow-hidden">
              {/* Кластерные фоновые зоны */}
              {clusters.map((cluster, ci) => {
                const colors = clusterColors[ci % clusterColors.length];
                const xs = cluster.indices.map(idx => positions2d[idx][0]);
                const ys = cluster.indices.map(idx => positions2d[idx][1]);
                const minX = Math.max(0, Math.min(...xs) - 8);
                const maxX = Math.min(100, Math.max(...xs) + 8);
                const minY = Math.max(0, Math.min(...ys) - 6);
                const maxY = Math.min(100, Math.max(...ys) + 6);
                return (
                  <div
                    key={`cluster-zone-${ci}`}
                    className={`absolute rounded-full ${colors.bg} border ${colors.border}`}
                    style={{
                      left: `${minX}%`,
                      top: `${minY}%`,
                      width: `${maxX - minX}%`,
                      height: `${maxY - minY}%`,
                    }}
                  />
                );
              })}

              {/* Точки */}
              {texts.map((t, i) => {
                const isHighlighted = hoveredPair !== null && (hoveredPair[0] === i || hoveredPair[1] === i);
                // Determine cluster color for this point
                const clusterIdx = clusters.findIndex(c => c.indices.includes(i));
                const colors = clusterIdx >= 0 ? clusterColors[clusterIdx % clusterColors.length] : null;
                return (
                  <div
                    key={`dot-${t.id}`}
                    className={`absolute transition-all duration-300 ${
                      isHighlighted ? 'z-10' : 'z-0'
                    }`}
                    style={{
                      left: `${positions2d[i][0]}%`,
                      top: `${positions2d[i][1]}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onMouseEnter={() => setHoveredPair([i, i])}
                    onMouseLeave={() => setHoveredPair(null)}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 border-background shadow-sm transition-transform ${
                      isHighlighted ? 'scale-150' : 'scale-100'
                    } ${colors ? colors.dot : 'bg-primary/70'}`} />
                  </div>
                );
              })}

              {/* Подписи */}
              {texts.map((t, i) => {
                const pos = labelPositions[i];
                if (!pos) return null;
                const isHighlighted = hoveredPair !== null && (hoveredPair[0] === i || hoveredPair[1] === i);
                const labelLeft = positions2d[i][0] + pos.dx;
                const labelTop = positions2d[i][1] + pos.dy;
                return (
                  <div
                    key={`label-${t.id}`}
                    className={`absolute ${isHighlighted ? 'z-20' : 'z-5'}`}
                    style={{
                      left: `${labelLeft}%`,
                      top: `${labelTop}%`,
                      transform: 'translate(-50%, -50%)',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                    }}
                  >
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded shadow-sm ${
                      isHighlighted ? 'bg-primary text-primary-foreground' : 'bg-background/90 text-muted-foreground border border-border'
                    }`}>
                      {i + 1}. {t.content.slice(0, 25)}{t.content.length > 25 ? '...' : ''}
                    </span>
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
