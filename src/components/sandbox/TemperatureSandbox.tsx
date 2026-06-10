'use client';

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Play, Loader2, RotateCcw, Thermometer } from 'lucide-react';
import { useModelStore } from '@/store/model-store';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface TemperatureSandboxProps {
  title: string;
  description: string;
  defaultPrompt?: string;
  defaultTemperature?: number;
  placeholder?: string;
}

export function TemperatureSandbox({
  title,
  description,
  defaultPrompt = '',
  defaultTemperature = 0.7,
  placeholder = 'Введите промпт для сравнения...',
}: TemperatureSandboxProps) {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [temperature, setTemperature] = useState(defaultTemperature);
  const [responses, setResponses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const abortRef = useRef<AbortController | null>(null);
  const currentModel = useModelStore((s) => s.currentModel);
  const apiToken = useModelStore((s) => s.apiToken);

  const handleSubmit = useCallback(async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setResponses([]);
    setError('');

    const results: string[] = [];

    try {
      // Run 3 times with the same temperature to show variance
      for (let run = 0; run < 3; run++) {
        abortRef.current = new AbortController();

        const res = await fetch('/api/sandbox', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [{ role: 'user', content: prompt }],
            systemPrompt: 'Ты полезный ассистент.',
            temperature,
            max_tokens: 256,
            model: currentModel,
            apiToken: apiToken || undefined,
          }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: 'Ошибка сервера' }));
          throw new Error(err.error || 'Ошибка сервера');
        }

        const data = await res.json();
        results.push(data.content || 'Пустой ответ');
        setResponses([...results]);
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  }, [prompt, temperature, loading, currentModel, apiToken]);

  const handleReset = () => {
    if (abortRef.current) abortRef.current.abort();
    setPrompt(defaultPrompt);
    setTemperature(defaultTemperature);
    setResponses([]);
    setError('');
    setLoading(false);
  };

  const tempLabel = temperature <= 0.2
    ? 'Очень точный'
    : temperature <= 0.5
    ? 'Точный'
    : temperature <= 0.8
    ? 'Сбалансированный'
    : 'Креативный';

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Thermometer className="h-4 w-4 text-primary" />
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs">Песочница</Badge>
        </div>
        <p className="text-base text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Prompt */}
        <div>
          <label className="text-base font-medium text-muted-foreground mb-1.5 block">
            Промпт
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="text-base min-h-[60px] resize-y"
            placeholder={placeholder}
          />
        </div>

        {/* Temperature slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-base font-medium text-muted-foreground">
              Температура
            </label>
            <div className="flex items-center gap-2">
              <span className="text-base font-mono font-bold text-primary">
                {temperature.toFixed(1)}
              </span>
              <Badge variant="outline" className="text-xs">{tempLabel}</Badge>
            </div>
          </div>
          <Slider
            value={[temperature]}
            onValueChange={([v]) => setTemperature(v)}
            min={0}
            max={2}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>0 (точный)</span>
            <span>1 (сбалансированный)</span>
            <span>2 (креативный)</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={loading || !prompt.trim()}
            className="gap-1.5 text-base"
          >
            {loading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Play className="h-3 w-3" />
            )}
            {loading ? 'Генерация (3x)...' : 'Сравнить (3 запроса)'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            className="gap-1.5 text-base"
          >
            <RotateCcw className="h-3 w-3" />
            Сбросить
          </Button>
        </div>

        {/* Responses */}
        {responses.length > 0 && (
          <div className="space-y-2">
            <label className="text-base font-medium text-muted-foreground">
              Результаты при температуре {temperature.toFixed(1)}:
            </label>
            {responses.map((resp, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-muted/30 p-3"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-sm font-bold text-primary">
                    Запрос #{i + 1}
                  </span>
                </div>
                <MarkdownRenderer content={resp} />
              </div>
            ))}
            {responses.length > 1 && (
              <div className="p-2 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-base text-muted-foreground">
                  {responses[0] === responses[1] && responses[1] === responses[2]
                    ? 'Все три ответа идентичны — низкая температура даёт стабильные результаты.'
                    : 'Ответы различаются — высокая температура увеличивает вариативность.'}
                </p>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
            <p className="text-base text-destructive">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
