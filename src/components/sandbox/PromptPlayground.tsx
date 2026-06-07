'use client';

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Loader2, RotateCcw, Sparkles } from 'lucide-react';

interface PromptPlaygroundProps {
  title: string;
  description: string;
  defaultPrompt?: string;
  defaultSystem?: string;
  placeholder?: string;
}

export function PromptPlayground({
  title,
  description,
  defaultPrompt = '',
  defaultSystem = 'Ты полезный ассистент.',
  placeholder = 'Введите ваш промпт здесь...',
}: PromptPlaygroundProps) {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [systemPrompt, setSystemPrompt] = useState(defaultSystem);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const abortRef = useRef<AbortController | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setResponse('');
    setError('');

    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          systemPrompt,
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Ошибка сервера' }));
        throw new Error(err.error || 'Ошибка сервера');
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('Нет потока ответа');

      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') break;
            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                fullText += delta;
                setResponse(fullText);
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  }, [prompt, systemPrompt, loading]);

  const handleReset = () => {
    if (abortRef.current) abortRef.current.abort();
    setPrompt(defaultPrompt);
    setSystemPrompt(defaultSystem);
    setResponse('');
    setError('');
    setLoading(false);
  };

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs">Песочница</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* System prompt */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
            Системный промпт
          </label>
          <Textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="text-sm min-h-[60px] resize-y font-mono"
            placeholder="Системный промпт..."
          />
        </div>

        {/* User prompt */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
            Ваш запрос
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="text-sm min-h-[80px] resize-y"
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={loading || !prompt.trim()}
            className="gap-1.5 text-sm"
          >
            {loading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Play className="h-3 w-3" />
            )}
            {loading ? 'Генерация...' : 'Запустить'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            className="gap-1.5 text-sm"
          >
            <RotateCcw className="h-3 w-3" />
            Сбросить
          </Button>
        </div>

        {/* Response */}
        {response && (
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
              Ответ модели
            </label>
            <div className="text-base whitespace-pre-wrap leading-relaxed">
              {response}
              {loading && <span className="streaming-cursor" />}
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
