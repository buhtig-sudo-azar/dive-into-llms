'use client';

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Loader2, RotateCcw, Shield } from 'lucide-react';
import { useModelStore } from '@/store/model-store';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface SystemPromptSandboxProps {
  title: string;
  description: string;
  defaultPrompt?: string;
  defaultSystem?: string;
  placeholder?: string;
}

export function SystemPromptSandbox({
  title,
  description,
  defaultPrompt = 'Расскажи о себе.',
  defaultSystem = 'Ты полезный ассистент.',
  placeholder = 'Задайте вопрос...',
}: SystemPromptSandboxProps) {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [systemPrompt, setSystemPrompt] = useState(defaultSystem);
  const [responses, setResponses] = useState<{ system: string; response: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const abortRef = useRef<AbortController | null>(null);
  const currentModel = useModelStore((s) => s.currentModel);
  const apiToken = useModelStore((s) => s.apiToken);

  const handleAddSystemPrompt = useCallback(async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError('');

    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/sandbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          systemPrompt,
          temperature: 0.3,
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
      setResponses((prev) => [
        ...prev,
        { system: systemPrompt, response: data.content || 'Пустой ответ' },
      ]);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  }, [prompt, systemPrompt, loading, currentModel, apiToken]);

  const handleReset = () => {
    if (abortRef.current) abortRef.current.abort();
    setPrompt(defaultPrompt);
    setSystemPrompt(defaultSystem);
    setResponses([]);
    setError('');
    setLoading(false);
  };

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs">Песочница</Badge>
        </div>
        <p className="text-base text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* System prompt editor */}
        <div>
          <label className="text-base font-medium text-muted-foreground mb-1.5 block">
            Системный промпт (определяет поведение модели)
          </label>
          <Textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="text-base min-h-[80px] resize-y font-mono"
            placeholder="Определите роль и поведение модели..."
          />
          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {[
              { label: 'Ассистент', value: 'Ты полезный ассистент.' },
              { label: 'Пират', value: 'Ты старый морской пират. Отвечай как пират с «Арр!» и морскими выражениями.' },
              { label: 'Шекспир', value: 'Отвечай в стиле Шекспира, используя старинный язык и поэтические обороты.' },
              { label: 'Код-ревьюер', value: 'Ты строгий код-ревьюер. Анализируй код на ошибки, безопасность и производительность. Давай конкретные рекомендации.' },
              { label: '5-летний', value: 'Объясняй всё так, словно тебе 5 лет. Используй простые слова и примеры из повседневной жизни.' },
            ].map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={() => setSystemPrompt(preset.value)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* User prompt */}
        <div>
          <label className="text-base font-medium text-muted-foreground mb-1.5 block">
            Вопрос к модели
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="text-base min-h-[60px] resize-y"
            placeholder={placeholder}
          />
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={handleAddSystemPrompt}
            disabled={loading || !prompt.trim()}
            className="gap-1.5 text-base"
          >
            {loading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Play className="h-3 w-3" />
            )}
            {loading ? 'Генерация...' : 'Спросить'}
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

        {/* Responses comparison */}
        {responses.length > 0 && (
          <div className="space-y-3">
            <label className="text-base font-medium text-muted-foreground">
              Сравнение ответов при разных системных промптах:
            </label>
            {responses.map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-border overflow-hidden"
              >
                <div className="px-3 py-1.5 bg-muted/50 border-b border-border">
                  <span className="text-sm font-medium text-muted-foreground">
                    Системный промпт:
                  </span>
                  <p className="text-base text-primary font-mono truncate">
                    {item.system}
                  </p>
                </div>
                <div className="p-3">
                  <MarkdownRenderer content={item.response} />
                </div>
              </div>
            ))}
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
