'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Play, Loader2, RotateCcw, Monitor, Server, Cpu, HardDrive,
  Zap, Activity, Download, ChevronDown, ChevronUp, Wifi,
} from 'lucide-react';
import { useModelStore } from '@/store/model-store';

/* ─── Mock data: локальные модели LM Studio ─── */
interface LocalModel {
  id: string;
  name: string;
  size: string;
  quant: string;
  ram: string;
  ctxLen: number;
  status: 'downloaded' | 'available' | 'loading' | 'loaded';
}

const LOCAL_MODELS: LocalModel[] = [
  { id: 'llama-3.2-3b-instruct-Q4_K_M', name: 'Llama 3.2 3B Instruct', size: '2.0 GB', quant: 'Q4_K_M', ram: '3.5 GB', ctxLen: 8192, status: 'downloaded' },
  { id: 'mistral-7b-instruct-Q4_K_M', name: 'Mistral 7B Instruct', size: '4.4 GB', quant: 'Q4_K_M', ram: '6.0 GB', ctxLen: 32768, status: 'downloaded' },
  { id: 'phi-3.5-mini-instruct-Q4_K_M', name: 'Phi 3.5 Mini Instruct', size: '2.4 GB', quant: 'Q4_K_M', ram: '4.0 GB', ctxLen: 16384, status: 'downloaded' },
  { id: 'qwen2.5-7b-instruct-Q5_K_M', name: 'Qwen 2.5 7B Instruct', size: '5.3 GB', quant: 'Q5_K_M', ram: '7.0 GB', ctxLen: 32768, status: 'available' },
  { id: 'gemma-2-9b-it-Q4_K_M', name: 'Gemma 2 9B IT', size: '5.5 GB', quant: 'Q4_K_M', ram: '8.0 GB', ctxLen: 8192, status: 'available' },
];

/* ─── Компонент ─── */
export function LMStudioSandbox({
  title,
  description,
  defaultPrompt = 'Объясни, что такое квантование моделей простыми словами.',
  defaultSystem = 'Ты полезный ассистент. Отвечай кратко и по делу на русском языке.',
}: {
  title: string;
  description: string;
  defaultPrompt?: string;
  defaultSystem?: string;
}) {
  /* state */
  const [selectedModelId, setSelectedModelId] = useState(LOCAL_MODELS[0].id);
  const [models, setModels] = useState<LocalModel[]>(LOCAL_MODELS);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loadingModel, setLoadingModel] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(512);
  const [contextLength, setContextLength] = useState(8192);
  const [gpuLayers, setGpuLayers] = useState(33);

  const [systemPrompt, setSystemPrompt] = useState(defaultSystem);
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [response, setResponse] = useState('');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const [apiServerOn, setApiServerOn] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [showApi, setShowApi] = useState(false);
  const [logLines, setLogLines] = useState<string[]>([]);

  /* perf mock */
  const [ramUsed, setRamUsed] = useState(0);
  const [tokensPerSec, setTokensPerSec] = useState(0);
  const [genTime, setGenTime] = useState(0);
  const [tokensGenerated, setTokensGenerated] = useState(0);

  const abortRef = useRef<AbortController | null>(null);
  const startTimeRef = useRef(0);
  const currentModel = useModelStore((s) => s.currentModel);
  const apiToken = useModelStore((s) => s.apiToken);

  const selectedModel = models.find((m) => m.id === selectedModelId)!;

  /* загрузка модели (имитация) */
  const handleLoadModel = useCallback(() => {
    if (loadingModel || modelLoaded) return;
    setLoadingModel(true);
    setLoadProgress(0);
    setLogLines((l) => [...l, `[INFO] Загрузка модели ${selectedModel.name}...`]);

    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 18 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setLoadingModel(false);
        setModelLoaded(true);
        setLoadProgress(100);
        setRamUsed(parseFloat(selectedModel.ram));
        setContextLength(selectedModel.ctxLen);
        setModels((prev) =>
          prev.map((m) =>
            m.id === selectedModelId ? { ...m, status: 'loaded' as const } : m
          )
        );
        setLogLines((l) => [
          ...l,
          `[OK] Модель ${selectedModel.name} загружена (${selectedModel.ram} RAM)`,
          `[OK] Context length: ${selectedModel.ctxLen} tokens`,
        ]);
      }
      setLoadProgress(Math.min(Math.round(p), 100));
    }, 200);
  }, [loadingModel, modelLoaded, selectedModel, selectedModelId]);

  /* выгрузка модели */
  const handleUnloadModel = useCallback(() => {
    setModelLoaded(false);
    setRamUsed(0);
    setTokensPerSec(0);
    setGenTime(0);
    setTokensGenerated(0);
    setResponse('');
    setLogLines((l) => [...l, `[INFO] Модель ${selectedModel.name} выгружена из памяти.`]);
    setModels((prev) =>
      prev.map((m) =>
        m.id === selectedModelId ? { ...m, status: 'downloaded' as const } : m
      )
    );
  }, [selectedModel, selectedModelId]);

  /* генерация (реальный LLM-запрос через наш API) */
  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || generating || !modelLoaded) return;
    setGenerating(true);
    setResponse('');
    setError('');
    setTokensPerSec(0);
    setGenTime(0);
    setTokensGenerated(0);
    startTimeRef.current = Date.now();

    abortRef.current = new AbortController();

    setLogLines((l) => [...l, `[GEN] Отправка запроса к модели...`]);
    setLogLines((l) => [...l, `[GEN] Параметры: max_tokens=${maxTokens}, temperature=${temperature.toFixed(1)}`]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          systemPrompt,
          temperature,
          max_tokens: maxTokens,
          model: currentModel,
          apiToken: apiToken || undefined,
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
      let actualCompletionTokens: number | null = null;

      // Приблизительная оценка токенов: ~1.3 токена на слово для русского текста
      const estimateTokens = (text: string) => Math.round(text.split(/\s+/).filter(Boolean).length * 1.3);

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

              // Проверяем usage — OpenRouter может прислать реальное число токенов
              const usage = parsed.usage;
              if (usage?.completion_tokens) {
                actualCompletionTokens = usage.completion_tokens;
              }

              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                fullText += delta;
                const tokenCount = actualCompletionTokens || estimateTokens(fullText);
                setResponse(fullText);
                setTokensGenerated(tokenCount);
                const elapsed = (Date.now() - startTimeRef.current) / 1000;
                setGenTime(elapsed);
                setTokensPerSec(elapsed > 0 ? Math.round(tokenCount / elapsed) : 0);
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      }

      const finalTokens = actualCompletionTokens || estimateTokens(fullText);
      setTokensGenerated(finalTokens);
      const finalElapsed = (Date.now() - startTimeRef.current) / 1000;
      setGenTime(finalElapsed);
      setTokensPerSec(finalElapsed > 0 ? Math.round(finalTokens / finalElapsed) : 0);
      setLogLines((l) => [
        ...l,
        `[GEN] Генерация завершена: ${actualCompletionTokens ? '' : '~'}${finalTokens} токенов за ${finalElapsed.toFixed(1)}с (лимит: ${maxTokens})`,
      ]);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
      setLogLines((l) => [...l, `[ERROR] ${err instanceof Error ? err.message : 'Ошибка генерации'}`]);
    } finally {
      setGenerating(false);
    }
  }, [prompt, systemPrompt, temperature, maxTokens, generating, modelLoaded, currentModel, apiToken]);

  /* сброс */
  const handleReset = () => {
    if (abortRef.current) abortRef.current.abort();
    handleUnloadModel();
    setPrompt(defaultPrompt);
    setSystemPrompt(defaultSystem);
    setTemperature(0.7);
    setMaxTokens(512);
    setGpuLayers(33);
    setApiServerOn(false);
    setShowApi(false);
    setLogLines([]);
    setError('');
  };

  /* API server toggle */
  useEffect(() => {
    if (apiServerOn && modelLoaded) {
      setLogLines((l) => [
        ...l,
        `[API] Сервер запущен: http://localhost:1234/v1`,
        `[API] OpenAI-совместимый endpoint активен`,
      ]);
    } else if (!apiServerOn) {
      setLogLines((l) => [...l, `[API] Сервер остановлен.`]);
    }
  }, [apiServerOn, modelLoaded]);

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Monitor className="h-4 w-4 text-primary" />
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs">Песочница</Badge>
          <Badge variant="outline" className="text-xs bg-lime-500/10 text-lime-600 border-lime-500/20">
            LM Studio
          </Badge>
        </div>
        <p className="text-base text-muted-foreground">{description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* ═══════ 1. Model Selector ═══════ */}
        <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-3">
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">Модель</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-2 gap-2">
            {models.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  if (modelLoaded) handleUnloadModel();
                  setSelectedModelId(m.id);
                }}
                className={`flex items-center justify-between rounded-lg border p-2.5 text-left transition-colors text-sm ${
                  selectedModelId === m.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/40'
                }`}
              >
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {m.size} · {m.quant} · RAM {m.ram}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {m.status === 'loaded' && (
                    <Badge className="text-[10px] bg-green-500/10 text-green-600 border-green-500/20">Загружена</Badge>
                  )}
                  {m.status === 'downloaded' && (
                    <Badge variant="outline" className="text-[10px]">Готова</Badge>
                  )}
                  {m.status === 'available' && (
                    <Badge variant="outline" className="text-[10px] text-muted-foreground">
                      <Download className="h-3 w-3 mr-0.5" />Скачать
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Load / Unload */}
          <div className="flex items-center gap-2">
            {!modelLoaded && !loadingModel && (
              <Button
                size="sm"
                onClick={handleLoadModel}
                disabled={selectedModel.status === 'available'}
                className="gap-1.5"
              >
                <Zap className="h-3 w-3" />
                Загрузить модель
              </Button>
            )}
            {loadingModel && (
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span className="text-xs">Загрузка {loadProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
              </div>
            )}
            {modelLoaded && (
              <Button size="sm" variant="outline" onClick={handleUnloadModel} className="gap-1.5">
                <RotateCcw className="h-3 w-3" />
                Выгрузить модель
              </Button>
            )}
          </div>
        </div>

        {/* ═══════ 2. Settings ═══════ */}
        <div className="rounded-lg border border-border bg-muted/20">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center justify-between w-full p-3"
          >
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm">Параметры инференса</span>
            </div>
            {showSettings ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showSettings && (
            <div className="px-3 pb-3 space-y-4">
              {/* Temperature */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Temperature</label>
                  <span className="text-xs font-mono font-bold text-primary">{temperature.toFixed(1)}</span>
                </div>
                <Slider value={[temperature]} onValueChange={([v]) => setTemperature(v)} min={0} max={2} step={0.1} />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                  <span>0 (точный)</span><span>1 (баланс)</span><span>2 (креатив)</span>
                </div>
              </div>

              {/* Max Tokens */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Max Tokens</label>
                  <span className="text-xs font-mono font-bold text-primary">{maxTokens}</span>
                </div>
                <Slider value={[maxTokens]} onValueChange={([v]) => setMaxTokens(v)} min={64} max={4096} step={64} />
              </div>

              {/* Context Length */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Context Length</label>
                  <span className="text-xs font-mono font-bold text-primary">{contextLength.toLocaleString()}</span>
                </div>
                <Slider
                  value={[contextLength]}
                  onValueChange={([v]) => setContextLength(v)}
                  min={512}
                  max={selectedModel?.ctxLen || 32768}
                  step={512}
                  disabled={!modelLoaded}
                />
              </div>

              {/* GPU Layers */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-muted-foreground">GPU Layers</label>
                  <span className="text-xs font-mono font-bold text-primary">{gpuLayers}</span>
                </div>
                <Slider value={[gpuLayers]} onValueChange={([v]) => setGpuLayers(v)} min={0} max={81} step={1} />
              </div>

              {/* System Prompt */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Системный промпт</label>
                <Textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="text-sm min-h-[50px] resize-y font-mono"
                  placeholder="Системный промпт..."
                />
              </div>
            </div>
          )}
        </div>

        {/* ═══════ 3. API Server Toggle ═══════ */}
        <div className="rounded-lg border border-border bg-muted/20 p-3">
          <button
            onClick={() => setShowApi(!showApi)}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm">API Server (OpenAI-совместимый)</span>
              {apiServerOn && (
                <Badge className="text-[10px] bg-green-500/10 text-green-600 border-green-500/20">Active</Badge>
              )}
            </div>
            {showApi ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showApi && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={apiServerOn ? 'destructive' : 'default'}
                  onClick={() => setApiServerOn(!apiServerOn)}
                  disabled={!modelLoaded}
                  className="gap-1.5 text-xs"
                >
                  <Wifi className="h-3 w-3" />
                  {apiServerOn ? 'Остановить' : 'Запустить'}
                </Button>
                {!modelLoaded && (
                  <span className="text-xs text-muted-foreground">Сначала загрузите модель</span>
                )}
              </div>

              {apiServerOn && (
                <div className="rounded-md bg-card border border-border p-2 font-mono text-xs space-y-1">
                  <div className="text-muted-foreground"># Подключение к LM Studio API</div>
                  <div>
                    <span className="text-purple-500">const</span> client = <span className="text-green-500">new</span> OpenAI(&#123;
                  </div>
                  <div className="pl-4">
                    baseURL: <span className="text-amber-500">&apos;http://localhost:1234/v1&apos;</span>,
                  </div>
                  <div className="pl-4">
                    apiKey: <span className="text-amber-500">&apos;lm-studio&apos;</span> <span className="text-muted-foreground">// не проверяется</span>
                  </div>
                  <div>&#125;);</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ═══════ 4. Chat / Inference ═══════ */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-3">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">Inference — Чат с моделью</span>
            {!modelLoaded && (
              <Badge variant="outline" className="text-[10px] text-muted-foreground">
                Загрузите модель для начала
              </Badge>
            )}
          </div>

          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="text-sm min-h-[60px] resize-y"
            placeholder="Введите ваш запрос..."
            disabled={!modelLoaded}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                handleGenerate();
              }
            }}
          />

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleGenerate}
              disabled={generating || !prompt.trim() || !modelLoaded}
              className="gap-1.5"
            >
              {generating ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Play className="h-3 w-3" />
              )}
              {generating ? 'Генерация...' : 'Запустить'}
            </Button>
            <Button size="sm" variant="outline" onClick={handleReset} className="gap-1.5">
              <RotateCcw className="h-3 w-3" />
              Сбросить всё
            </Button>
          </div>

          {/* Response */}
          {response && (
            <div className="rounded-lg border border-border bg-card p-3">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Ответ модели</label>
              <div className="text-sm whitespace-pre-wrap leading-relaxed">
                {response}
                {generating && <span className="streaming-cursor" />}
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </div>

        {/* ═══════ 5. Performance Monitor ═══════ */}
        {(modelLoaded || ramUsed > 0) && (
          <div className="rounded-lg border border-border bg-muted/20 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm">Мониторинг ресурсов</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="rounded-md bg-card border border-border p-2 text-center">
                <div className="text-[10px] text-muted-foreground">RAM</div>
                <div className="text-sm font-bold">{ramUsed > 0 ? `${ramUsed} GB` : '—'}</div>
              </div>
              <div className="rounded-md bg-card border border-border p-2 text-center">
                <div className="text-[10px] text-muted-foreground">Скорость</div>
                <div className="text-sm font-bold">{tokensPerSec > 0 ? `${tokensPerSec} t/s` : '—'}</div>
              </div>
              <div className="rounded-md bg-card border border-border p-2 text-center">
                <div className="text-[10px] text-muted-foreground">Время</div>
                <div className="text-sm font-bold">{genTime > 0 ? `${genTime.toFixed(1)}с` : '—'}</div>
              </div>
              <div className="rounded-md bg-card border border-border p-2 text-center">
                <div className="text-[10px] text-muted-foreground">Токены</div>
                <div className="text-sm font-bold">
                  {tokensGenerated > 0 ? `~${tokensGenerated}` : '—'}
                  <span className="text-[10px] font-normal text-muted-foreground"> / {maxTokens}</span>
                </div>
                {tokensGenerated > 0 && (
                  <div className="w-full h-1 bg-muted rounded-full mt-1 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        tokensGenerated / maxTokens > 0.9 ? 'bg-destructive' : 'bg-primary'
                      }`}
                      style={{ width: `${Math.min(100, (tokensGenerated / maxTokens) * 100)}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ═══════ 6. Console Log ═══════ */}
        {logLines.length > 0 && (
          <div className="rounded-lg border border-border bg-card p-2 max-h-[140px] overflow-y-auto font-mono text-[11px] space-y-0.5">
            {logLines.map((line, i) => (
              <div key={i} className={
                line.startsWith('[ERROR]')
                  ? 'text-destructive'
                  : line.startsWith('[OK]')
                  ? 'text-green-600'
                  : line.startsWith('[GEN]')
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }>
                {line}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
