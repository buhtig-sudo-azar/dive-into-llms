'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileDown, RotateCcw } from 'lucide-react';

const DEFAULT_TEXT = `Искусственный интеллект продолжает развиваться быстрыми темпами. В последние годы мы наблюдаем значительный прогресс в области обработки естественного языка. Большие языковые модели, такие как GPT-4 и Claude, демонстрируют впечатляющие результаты в решении сложных задач.

Машинное обучение является одним из ключевых направлений искусственного интеллекта. Алгоритмы машинного обучения позволяют компьютерам обучаться на основе данных и делать предсказания. Глубокое обучение, использующее многослойные нейронные сети, стало основой для многих современных достижений.

Трансформеры — это архитектура нейронных сетей, основанная на механизме внимания. Механизм внимания позволяет модели фокусироваться на различных частях входных данных при обработке каждого элемента. Это обеспечивает более эффективную обработку длинных последовательностей по сравнению с рекуррентными сетями.

Обучение языковых моделей требует огромных вычислительных ресурсов и больших объёмов данных. Современные модели обучаются на триллионах токенов текста с использованием тысяч GPU. Это делает обучение доступным только для крупнейших технологических компаний.`;

const STOP_WORDS = new Set(['и', 'в', 'на', 'с', 'что', 'это', 'как', 'не', 'к', 'по', 'а', 'но', 'от', 'для', 'из', 'о', 'за', 'то', 'все', 'так', 'да', 'же', 'еще', 'уже', 'ли', 'бы', 'был', 'была', 'было', 'были', 'он', 'она', 'оно', 'они', 'мы', 'вы', 'я', 'мой', 'моя', 'мое', 'наш', 'ваш', 'их', 'его', 'ее', 'этот', 'эта', 'это', 'эти', 'тот', 'та', 'то', 'те', 'который', 'которая', 'которое', 'которые', 'где', 'когда', 'чем', 'чего', 'кому', 'чему', 'кем', 'чем', 'свой', 'своя', 'своё', 'свои', 'себя', 'себе', 'собой', 'только', 'может', 'можено', 'очень', 'также', 'тоже', 'при', 'без', 'до', 'под', 'над', 'между', 'через', 'после', 'перед', 'во', 'со', 'из-за', 'будет', 'будут', 'быть', 'есть', 'имеет', 'имеют']);

function approxTokens(text: string): number {
  const ru = (text.match(/[а-яА-ЯёЁ]/g) || []).length;
  const total = text.length;
  const ratio = ru / (total || 1);
  return Math.round(total / (2.5 * ratio + 4 * (1 - ratio)));
}

function removeStopWords(text: string): string {
  return text.split(/\s+/).filter((w) => !STOP_WORDS.has(w.toLowerCase().replace(/[.,!?:;]/g, ''))).join(' ');
}

function reduceRepetition(text: string): string {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const seen = new Set<string>();
  return sentences.map((s) => {
    const key = s.toLowerCase().slice(0, 30);
    if (seen.has(key)) return '[см. выше]';
    seen.add(key);
    return s;
  }).join(' ');
}

function keyExtraction(text: string): string {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const keywords = ['ai', 'ии', 'модел', 'обучен', 'нейрон', 'трансформ', 'вниман', 'язык', 'данн', 'алгоритм', 'сеть', 'результат', 'прогресс', 'ресурс'];
  return sentences.filter((s) => keywords.some((kw) => s.toLowerCase().includes(kw))).join(' ');
}

function summarize(text: string): string {
  const paragraphs = text.split(/\n\n+/);
  return paragraphs.map((p) => {
    const sentences = p.split(/(?<=[.!?])\s+/);
    if (sentences.length <= 2) return p;
    return [sentences[0], sentences[sentences.length - 1]].join(' ');
  }).join('\n\n');
}

type Method = 'stopwords' | 'repetition' | 'keywords' | 'summarize';

export function CompressionLab({ title, description }: { title: string; description: string }) {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [methods, setMethods] = useState<Record<Method, boolean>>({ stopwords: false, repetition: false, keywords: false, summarize: false });

  const toggle = (m: Method) => setMethods((p) => ({ ...p, [m]: !p[m] }));

  const originalTokens = useMemo(() => approxTokens(text), [text]);

  const compressedText = useMemo(() => {
    let result = text;
    if (methods.stopwords) result = removeStopWords(result);
    if (methods.repetition) result = reduceRepetition(result);
    if (methods.keywords) result = keyExtraction(result);
    if (methods.summarize) result = summarize(result);
    return result;
  }, [text, methods]);

  const compressedTokens = useMemo(() => approxTokens(compressedText), [compressedText]);
  const ratio = originalTokens > 0 ? Math.round((1 - compressedTokens / originalTokens) * 100) : 0;

  const methodLabels: [Method, string, string][] = [
    ['stopwords', 'Удаление стоп-слов', 'Убирает предлоги, союзы, местоимения'],
    ['repetition', 'Сокращение повторов', 'Заменяет повторяющиеся фразы на «см. выше»'],
    ['keywords', 'Извлечение ключевых слов', 'Оставляет только предложения с ключевыми терминами'],
    ['summarize', 'Резюмирование', 'Оставляет первое и последнее предложение абзаца'],
  ];

  const methodSavings = useMemo(() => {
    const savings: [string, number][] = [];
    for (const [key, label] of methodLabels) {
      let result = text;
      result = removeStopWords(result); // base
      if (key === 'repetition') result = reduceRepetition(removeStopWords(text));
      if (key === 'keywords') result = keyExtraction(removeStopWords(text));
      if (key === 'summarize') result = summarize(removeStopWords(text));
      savings.push([label, approxTokens(text) - approxTokens(result)]);
    }
    return savings;
  }, [text]);

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <FileDown className="h-4 w-4 text-primary" />
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs">Песочница</Badge>
        </div>
        <p className="text-base text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input text */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Исходный текст ({originalTokens} токенов)</label>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} className="text-sm min-h-[80px] resize-y" />
        </div>

        {/* Methods */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Методы сжатия</label>
          {methodLabels.map(([key, label, desc]) => (
            <button key={key} onClick={() => toggle(key)}
              className={`w-full flex items-center gap-3 rounded-lg border p-2.5 text-left transition-colors ${
                methods[key] ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
              }`}>
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                methods[key] ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/40'
              }`}>
                {methods[key] && <span className="text-[10px]">✓</span>}
              </div>
              <div>
                <div className="text-sm font-medium">{label}</div>
                <div className="text-xs text-muted-foreground">{desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-md bg-card border border-border p-2 text-center">
            <div className="text-[10px] text-muted-foreground">Исходные</div>
            <div className="text-sm font-bold">{originalTokens}</div>
          </div>
          <div className="rounded-md bg-card border border-border p-2 text-center">
            <div className="text-[10px] text-muted-foreground">После сжатия</div>
            <div className="text-sm font-bold text-primary">{compressedTokens}</div>
          </div>
          <div className="rounded-md bg-card border border-border p-2 text-center">
            <div className="text-[10px] text-muted-foreground">Экономия</div>
            <div className="text-sm font-bold text-green-600">{ratio}%</div>
          </div>
        </div>

        {/* Visual bar */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="h-2 rounded bg-primary" style={{ width: '100%' }} />
            <span>Исходный</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="h-2 rounded bg-green-500" style={{ width: `${Math.max(5, 100 - ratio)}%` }} />
            <span>Сжатый</span>
          </div>
        </div>

        {/* Compressed output */}
        {Object.values(methods).some(Boolean) && (
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1 block">Результат ({compressedTokens} токенов)</label>
            <div className="rounded-lg border border-border bg-muted/20 p-2.5 text-sm whitespace-pre-wrap leading-relaxed max-h-[150px] overflow-y-auto">
              {compressedText}
            </div>
          </div>
        )}

        <Button size="sm" variant="outline" onClick={() => { setText(DEFAULT_TEXT); setMethods({ stopwords: false, repetition: false, keywords: false, summarize: false }); }} className="gap-1.5">
          <RotateCcw className="h-3 w-3" /> Сбросить
        </Button>
      </CardContent>
    </Card>
  );
}
