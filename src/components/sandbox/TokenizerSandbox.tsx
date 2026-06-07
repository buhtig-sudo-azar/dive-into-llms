'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Hash, Languages } from 'lucide-react';

interface TokenizerSandboxProps {
  title: string;
  description: string;
  defaultPrompt?: string;
}

// Simple BPE-like tokenizer simulation for demonstration
function simulateTokenize(text: string): { token: string; isWord: boolean }[] {
  if (!text) return [];

  const tokens: { token: string; isWord: boolean }[] = [];
  // Simple heuristic: split by spaces, then for each word check if it might be subword-tokenized
  const words = text.split(/(\s+)/);

  for (const word of words) {
    if (!word) continue;
    if (/^\s+$/.test(word)) {
      tokens.push({ token: word, isWord: false });
      continue;
    }

    // Check for common English words (likely single tokens)
    const commonEnglish = /^(the|is|a|an|and|or|but|in|on|at|to|for|of|with|by|from|it|this|that|are|was|were|be|been|have|has|had|do|does|did|will|would|could|should|can|may|might|not|no|yes|if|then|else|so|as|up|out|how|what|which|who|when|where|why|all|each|every|both|few|more|most|other|some|such|only|own|same|than|too|very|just|because|about|into|through|during|before|after|above|below|between|under|again|further|once|here|there|also|been|being|did|doing|having|make|like|just|over|also|new|after|use|our|work|first|well|way|even|want|because|any|these|give|day|most|us)$/i;

    // Cyrillic text typically splits into more tokens
    const hasCyrillic = /[а-яА-ЯёЁ]/.test(word);

    // Strip punctuation for analysis
    const stripped = word.replace(/[^\p{L}\p{N}]/gu, '');
    if (!stripped) {
      tokens.push({ token: word, isWord: false });
      continue;
    }

    if (hasCyrillic) {
      // Russian: longer words often split into 2-3 subwords
      if (stripped.length <= 3) {
        tokens.push({ token: word, isWord: true });
      } else if (stripped.length <= 6) {
        // Might be 1-2 tokens
        const mid = Math.ceil(stripped.length * 0.6);
        tokens.push({ token: word.slice(0, mid), isWord: true });
        if (word.slice(mid)) tokens.push({ token: word.slice(mid), isWord: true });
      } else {
        // Likely 3+ tokens
        const p1 = Math.ceil(stripped.length * 0.35);
        const p2 = Math.ceil(stripped.length * 0.65);
        const prefix = word.slice(0, p1);
        const middle = word.slice(p1, p2);
        const suffix = word.slice(p2);
        tokens.push({ token: prefix, isWord: true });
        if (middle) tokens.push({ token: middle, isWord: true });
        if (suffix) tokens.push({ token: suffix, isWord: true });
      }
    } else if (commonEnglish.test(stripped) || stripped.length <= 5) {
      tokens.push({ token: word, isWord: true });
    } else if (stripped.length <= 8) {
      tokens.push({ token: word, isWord: true });
    } else {
      // Long English word might split
      const mid = Math.ceil(stripped.length * 0.55);
      tokens.push({ token: word.slice(0, mid), isWord: true });
      if (word.slice(mid)) tokens.push({ token: word.slice(mid), isWord: true });
    }
  }

  return tokens;
}

const COLORS = [
  'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30',
  'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
  'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
  'bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30',
  'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
  'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30',
  'bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30',
  'bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30',
];

export function TokenizerSandbox({
  title,
  description,
  defaultPrompt = '',
}: TokenizerSandboxProps) {
  const [text, setText] = useState(defaultPrompt);

  const tokens = useMemo(() => simulateTokenize(text), [text]);
  const wordTokens = tokens.filter((t) => t.isWord);
  const charCount = text.length;
  const approxRealTokens = useMemo(() => {
    // More realistic estimation
    const hasCyrillic = /[а-яА-ЯёЁ]/.test(text);
    if (hasCyrillic) {
      return Math.ceil(charCount / 2.5); // ~2.5 chars per token for Russian
    }
    return Math.ceil(charCount / 4); // ~4 chars per token for English
  }, [text, charCount]);

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Hash className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-[10px]">Песочница</Badge>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            Введите текст для токенизации
          </label>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-sm"
            placeholder="Привет! Как дела? Hello world!"
          />
        </div>

        {/* Token visualization */}
        {tokens.length > 0 && (
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              Визуализация токенов
            </label>
            <div className="flex flex-wrap gap-1 p-3 rounded-lg bg-muted/30 border border-border">
              {tokens.map((t, i) => {
                if (!t.isWord) {
                  return (
                    <span key={i} className="text-muted-foreground text-xs opacity-50">
                      {t.token}
                    </span>
                  );
                }
                const colorIdx = i % COLORS.length;
                return (
                  <span
                    key={i}
                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium border ${COLORS[colorIdx]}`}
                  >
                    {t.token}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-muted/30 border border-border p-2 text-center">
            <div className="text-lg font-bold text-primary">{wordTokens.length}</div>
            <div className="text-[10px] text-muted-foreground">Токенов (визуально)</div>
          </div>
          <div className="rounded-lg bg-muted/30 border border-border p-2 text-center">
            <div className="text-lg font-bold text-primary">{approxRealTokens}</div>
            <div className="text-[10px] text-muted-foreground">Реальных токенов</div>
          </div>
          <div className="rounded-lg bg-muted/30 border border-border p-2 text-center">
            <div className="text-lg font-bold text-primary">{charCount}</div>
            <div className="text-[10px] text-muted-foreground">Символов</div>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-start gap-2 p-2 rounded-lg bg-primary/5 border border-primary/10">
          <Languages className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Английский текст: ~4 символа на токен. Русский текст: ~2-3 символа на токен,
            потому что в обучающих данных LLM меньше русского текста. Реальное количество
            токенов зависит от конкретного токенизатора (BPE, SentencePiece).
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
