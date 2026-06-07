'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Terminal, RotateCcw } from 'lucide-react';
import { useModelStore } from '@/store/model-store';

interface Model { name: string; tag: string; size: string; }

const MODELS: Model[] = [
  { name: 'Llama 3.2', tag: 'llama3.2:3b', size: '2.0 GB' },
  { name: 'Mistral 7B', tag: 'mistral:7b', size: '4.4 GB' },
  { name: 'Phi 3 Mini', tag: 'phi3:mini', size: '2.4 GB' },
];

export function OllamaDemo({ title, description }: { title: string; description: string }) {
  const [downloaded, setDownloaded] = useState<string[]>(['llama3.2:3b', 'phi3:mini']);
  const [output, setOutput] = useState<string[]>(['$ Добро пожаловать в Ollama CLI симулятор', 'Введите команду или "help" для справки', '']);
  const [command, setCommand] = useState('');
  const [mode, setMode] = useState<'cli' | 'chat'>('cli');
  const [chatModel, setChatModel] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [generating, setGenerating] = useState(false);
  const [pulling, setPulling] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentModel = useModelStore((s) => s.currentModel);
  const apiToken = useModelStore((s) => s.apiToken);

  useEffect(() => { scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight); }, [output]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const addLine = (line: string) => setOutput((p) => [...p, line]);

  const handleChat = useCallback(async (msg: string) => {
    const newMsgs = [...chatMessages, { role: 'user', content: msg }];
    setChatMessages(newMsgs);
    addLine(`>>> ${msg}`);
    setGenerating(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs, systemPrompt: 'Ты полезный ассистент. Отвечай кратко.', model: currentModel, apiToken: apiToken || undefined }),
      });
      const reader = res.body?.getReader();
      if (!reader) throw new Error('no stream');
      const decoder = new TextDecoder();
      let full = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n')) {
          if (line.startsWith('data: ')) {
            const d = line.slice(6).trim();
            if (d === '[DONE]') break;
            try { const delta = JSON.parse(d).choices?.[0]?.delta?.content; if (delta) full += delta; } catch {}
          }
        }
      }
      setChatMessages([...newMsgs, { role: 'assistant', content: full }]);
      addLine(full);
    } catch { addLine('Ошибка генерации'); }
    setGenerating(false);
  }, [chatMessages, currentModel, apiToken]);

  const handleSubmit = () => {
    const cmd = command.trim();
    setCommand('');
    if (!cmd) return;

    if (mode === 'chat') {
      if (cmd === '/exit') {
        setMode('cli');
        addLine('$ Выход из чата');
        return;
      }
      handleChat(cmd);
      return;
    }

    addLine(`$ ollama ${cmd}`);

    if (cmd === 'help' || cmd === '--help') {
      addLine('Доступные команды:');
      addLine('  list              — показать загруженные модели');
      addLine('  pull <модель>     — скачать модель');
      addLine('  run <модель>      — запустить чат с моделью');
      addLine('  rm <модель>       — удалить модель');
      addLine('  show <модель>     — информация о модели');
    } else if (cmd === 'list') {
      if (downloaded.length === 0) { addLine('  (нет загруженных моделей)'); }
      else { downloaded.forEach((t) => { const m = MODELS.find((mm) => mm.tag === t); addLine(`  ${t}  ${m ? m.size : ''}`); }); }
    } else if (cmd.startsWith('pull ')) {
      const tag = cmd.slice(5).trim();
      const m = MODELS.find((mm) => mm.tag === tag);
      if (!m) { addLine(`  Модель "${tag}" не найдена. Доступные: ${MODELS.map((mm) => mm.tag).join(', ')}`); }
      else if (downloaded.includes(tag)) { addLine(`  Модель ${tag} уже загружена`); }
      else {
        setPulling(true);
        addLine(`  Загрузка ${m.name}...`);
        setTimeout(() => {
          setDownloaded((p) => [...p, tag]);
          addLine(`  ✓ ${tag} загружена (${m.size})`);
          setPulling(false);
        }, 2000);
      }
    } else if (cmd.startsWith('run ')) {
      const tag = cmd.slice(4).trim();
      if (!downloaded.includes(tag)) { addLine(`  Модель "${tag}" не загружена. Используйте: pull ${tag}`); }
      else {
        setMode('chat'); setChatModel(tag); setChatMessages([]);
        const m = MODELS.find((mm) => mm.tag === tag);
        addLine(`  Запуск ${m?.name || tag}...`);
        addLine(`  Введите сообщение или /exit для выхода`);
        addLine('');
      }
    } else if (cmd.startsWith('rm ')) {
      const tag = cmd.slice(3).trim();
      if (!downloaded.includes(tag)) { addLine(`  Модель "${tag}" не найдена`); }
      else { setDownloaded((p) => p.filter((t) => t !== tag)); addLine(`  ✓ ${tag} удалена`); }
    } else if (cmd.startsWith('show ')) {
      const tag = cmd.slice(5).trim();
      const m = MODELS.find((mm) => mm.tag === tag);
      if (!m) { addLine(`  Модель "${tag}" не найдена`); }
      else { addLine(`  Имя: ${m.name}`); addLine(`  Тег: ${m.tag}`); addLine(`  Размер: ${m.size}`); addLine(`  Формат: GGUF Q4_K_M`); addLine(`  Контекст: 8192 токенов`); }
    } else {
      addLine(`  Неизвестная команда: ${cmd}. Введите "help" для справки.`);
    }
  };

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary" />
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs">Песочница</Badge>
        </div>
        <p className="text-base text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-zinc-900 border border-zinc-700 overflow-hidden">
          {/* Terminal output */}
          <div ref={scrollRef} className="p-3 h-[280px] overflow-y-auto font-mono text-xs text-green-400 space-y-0.5">
            {output.map((line, i) => (
              <div key={i} className={line.startsWith('$') ? 'text-green-300 font-bold' : line.startsWith('  ✓') ? 'text-emerald-400' : line.startsWith('>>>') ? 'text-cyan-400' : ''}>
                {line || '\u00A0'}
              </div>
            ))}
            {generating && <div className="text-amber-400">Генерация...</div>}
            {pulling && <div className="text-amber-400">Загрузка...</div>}
          </div>
          {/* Input */}
          <div className="flex items-center border-t border-zinc-700 px-3 py-2">
            <span className="text-xs text-green-400 font-mono mr-2">{mode === 'chat' ? '>>>' : '$ ollama'}</span>
            <input
              ref={inputRef}
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !generating && !pulling) handleSubmit(); }}
              className="flex-1 bg-transparent text-xs text-green-400 font-mono outline-none"
              placeholder={mode === 'chat' ? 'Введите сообщение...' : 'help, list, pull, run, rm, show'}
              disabled={generating || pulling}
            />
          </div>
        </div>
        <div className="mt-2 text-[10px] text-muted-foreground">
          Подсказки: ollama list | ollama pull mistral:7b | ollama run llama3.2:3b | help
        </div>
      </CardContent>
    </Card>
  );
}
