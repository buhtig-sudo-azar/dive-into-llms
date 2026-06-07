'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SquareStack, Plus, Trash2, RotateCcw, Minus, AlertTriangle } from 'lucide-react';

interface Msg { id: number; role: 'system' | 'user' | 'assistant'; content: string; }

const SIZES = [
  { label: '4K', tokens: 4096 },
  { label: '8K', tokens: 8192 },
  { label: '32K', tokens: 32768 },
  { label: '128K', tokens: 131072 },
  { label: '200K', tokens: 200000 },
];

const ROLE_COLORS = { system: 'bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-400', user: 'bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400', assistant: 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400' };
const ROLE_BADGES = { system: 'Системный', user: 'Пользователь', assistant: 'Ассистент' };

function approxTokens(text: string): number {
  const ru = (text.match(/[а-яА-ЯёЁ]/g) || []).length;
  const total = text.length;
  const ratio = ru / (total || 1);
  return Math.round(total / (2.5 * ratio + 4 * (1 - ratio)));
}

export function ContextWindowSim({ title, description }: { title: string; description: string }) {
  const [messages, setMessages] = useState<Msg[]>([
    { id: 1, role: 'system', content: 'Ты полезный ассистент. Отвечай на русском языке.' },
    { id: 2, role: 'user', content: 'Привет! Расскажи про контекстное окно в LLM.' },
    { id: 3, role: 'assistant', content: 'Контекстное окно — это максимальное количество токенов, которое модель может обработать за один запрос. Оно определяет, сколько информации модель "помнит" при генерации ответа.' },
  ]);
  const [contextSize, setContextSize] = useState(8192);
  const [newRole, setNewRole] = useState<'user' | 'assistant'>('user');
  const [newContent, setNewContent] = useState('');
  const [idCounter, setIdCounter] = useState(4);
  const [compressed, setCompressed] = useState(false);

  const tokensPerMsg = useMemo(() => messages.map((m) => approxTokens(m.content)), [messages]);
  const usedTokens = useMemo(() => tokensPerMsg.reduce((a, b) => a + b, 0), [tokensPerMsg]);
  const overflow = usedTokens > contextSize;
  const fillPct = Math.min((usedTokens / contextSize) * 100, 100);
  const barColor = fillPct > 95 ? 'bg-red-500' : fillPct > 80 ? 'bg-amber-500' : 'bg-primary';

  const addMsg = () => {
    if (!newContent.trim()) return;
    setMessages((p) => [...p, { id: idCounter, role: newRole, content: newContent.trim() }]);
    setIdCounter((p) => p + 1);
    setNewContent('');
  };
  const removeMsg = (id: number) => setMessages((p) => p.filter((m) => m.id !== id));

  const handleCompress = () => {
    if (compressed) { setCompressed(false); return; }
    setCompressed(true);
  };

  const displayTokens = compressed ? Math.round(usedTokens * 0.4) : usedTokens;

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <SquareStack className="h-4 w-4 text-primary" />
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs">Песочница</Badge>
        </div>
        <p className="text-base text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Context window bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span>Контекстное окно: {displayTokens.toLocaleString()} / {contextSize.toLocaleString()} токенов</span>
            <span className="font-mono">{Math.round((displayTokens / contextSize) * 100)}%</span>
          </div>
          <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
            <div className={`h-full ${compressed ? 'bg-emerald-500' : barColor} rounded-full transition-all`} style={{ width: `${Math.min((displayTokens / contextSize) * 100, 100)}%` }} />
          </div>
          {overflow && !compressed && (
            <div className="flex items-center gap-1 text-xs text-destructive">
              <AlertTriangle className="h-3 w-3" /> Переполнение! Нужно удалить {usedTokens - contextSize} токенов
            </div>
          )}
        </div>

        {/* Model selector */}
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((s) => (
            <button key={s.label} onClick={() => setContextSize(s.tokens)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                contextSize === s.tokens ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
              }`}>{s.label}</button>
          ))}
        </div>

        {/* Message stack */}
        <div className="space-y-2 max-h-[250px] overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={msg.id} className={`rounded-lg border p-2.5 ${ROLE_COLORS[msg.role]}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline" className="text-[10px]">{ROLE_BADGES[msg.role]}</Badge>
                  <span className="text-[10px] font-mono">{tokensPerMsg[i]} токенов</span>
                </div>
                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => removeMsg(msg.id)}>
                  <Trash2 className="h-2.5 w-2.5" />
                </Button>
              </div>
              <p className="text-xs leading-relaxed">{msg.content.length > 120 ? msg.content.slice(0, 120) + '...' : msg.content}</p>
            </div>
          ))}
        </div>

        {/* Add message */}
        <div className="flex gap-2 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-muted-foreground">Роль</label>
            <select value={newRole} onChange={(e) => setNewRole(e.target.value as 'user' | 'assistant')}
              className="h-8 rounded-md border bg-background px-2 text-xs">
              <option value="user">Пользователь</option>
              <option value="assistant">Ассистент</option>
            </select>
          </div>
          <div className="flex-1">
            <Input value={newContent} onChange={(e) => setNewContent(e.target.value)} placeholder="Текст сообщения..."
              className="text-sm h-8" onKeyDown={(e) => { if (e.key === 'Enter') addMsg(); }} />
          </div>
          <Button size="sm" onClick={addMsg} disabled={!newContent.trim()} className="gap-1 shrink-0 h-8">
            <Plus className="h-3 w-3" /> Добавить
          </Button>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleCompress} className="gap-1.5">
            {compressed ? <RotateCcw className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
            {compressed ? 'Вернуть исходный' : 'Сжать контекст'}
          </Button>
          <Button size="sm" variant="outline" onClick={() => { setMessages([]); setCompressed(false); }} className="gap-1.5">
            <Trash2 className="h-3 w-3" /> Очистить
          </Button>
        </div>

        {compressed && (
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2 text-xs">
            Контекст сжат: {usedTokens} → {displayTokens} токенов (−{Math.round((1 - 0.4) * 100)}%)
          </div>
        )}
      </CardContent>
    </Card>
  );
}
