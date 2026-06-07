'use client';

import { useState, useEffect, useRef } from 'react';
import { useModelStore } from '@/store/model-store';
import type { FreeModel, ModelRateLimit } from '@/store/model-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Check,
  ChevronsUpDown,
  Cpu,
  Loader2,
  Sparkles,
  RefreshCw,
  Wifi,
  WifiOff,
  Activity,
  CircleAlert,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { HelpTooltip } from '@/components/ui/help-tooltip';

function RateLimitIndicator({ rateLimit }: { rateLimit?: ModelRateLimit }) {
  if (!rateLimit || !rateLimit.checkedAt) {
    return (
      <HelpTooltip content="Статус модели ещё не проверен. Нажмите «Проверить все», чтобы узнать доступность." side="left">
        <span className="shrink-0 flex items-center gap-1 cursor-help">
          <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
        </span>
      </HelpTooltip>
    );
  }

  if (rateLimit.available) {
    return (
      <HelpTooltip
        content={`Модель работает и доступна для запросов.${rateLimit.remaining != null ? ` Осталось запросов: ${rateLimit.remaining}.` : ''}${rateLimit.latency != null ? ` Задержка: ${rateLimit.latency}мс.` : ''}`}
        side="left"
      >
        <span className="shrink-0 flex items-center gap-1 cursor-help">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          {rateLimit.remaining != null && (
            <span className="text-[9px] text-muted-foreground font-mono">
              {rateLimit.remaining}
            </span>
          )}
        </span>
      </HelpTooltip>
    );
  }

  return (
    <HelpTooltip
      content={`Лимит запросов исчерпан.${rateLimit.reason === 'rate_limited' ? ' Суточный лимит бесплатной модели закончился — попробуйте позже или выберите другую.' : rateLimit.reason === 'not_found' ? ' Модель не найдена на OpenRouter — возможно, она была удалена.' : ' Произошла ошибка при проверке модели.'}`}
      side="left"
    >
      <span className="shrink-0 flex items-center gap-1 cursor-help">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[9px] text-red-500 font-medium">лимит</span>
      </span>
    </HelpTooltip>
  );
}

export function ModelSelector() {
  const {
    currentModel,
    availableModels,
    isLoadingModels,
    isApplying,
    isCheckingAll,
    rateLimits,
    setCurrentModel,
    fetchAvailableModels,
    checkAllModels,
    setIsApplying,
    _hydrate,
  } = useModelStore();
  const [open, setOpen] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    _hydrate();
  }, [_hydrate]);

  // Fetch models from OpenRouter when popover opens for the first time
  useEffect(() => {
    if (open && availableModels.length === 0) {
      fetchAvailableModels();
    }
  }, [open, availableModels.length, fetchAvailableModels]);

  // Sync current model to server on mount
  useEffect(() => {
    const syncModel = async () => {
      try {
        await fetch('/api/settings/model', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: currentModel }),
        });
      } catch {
        // Silent fail
      }
    };
    syncModel();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const applyModel = async (model: string) => {
    setIsApplying(true);
    setCurrentModel(model);
    setOpen(false);

    try {
      const res = await fetch('/api/settings/model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Ошибка' }));
        throw new Error(err.error || 'Ошибка применения модели');
      }

      toast({
        title: 'Модель применена',
        description: `Активна: ${model}`,
      });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Не удалось применить модель',
        variant: 'destructive',
      });
    } finally {
      setIsApplying(false);
    }
  };

  const handleCustomSubmit = () => {
    const model = customInput.trim();
    if (!model) return;
    applyModel(model);
    setCustomInput('');
    setShowCustom(false);
  };

  const handleCheckAll = async () => {
    toast({
      title: 'Проверка моделей...',
      description: 'Опрашиваем все бесплатные модели',
    });
    await checkAllModels();
    const limitedCount = Object.values(rateLimits).filter(r => !r.available).length;
    toast({
      title: 'Проверка завершена',
      description: limitedCount > 0
        ? `${limitedCount} модел${limitedCount === 1 ? 'ь' : limitedCount < 5 ? 'и' : 'ей'} с исчерпанным лимитом`
        : 'Все модели доступны!',
    });
  };

  // Get current model label
  const currentModelData = availableModels.find((m) => m.id === currentModel);
  const currentLabel = currentModelData?.label || currentModel.split('/').pop() || currentModel;
  const isKnownModel = availableModels.some((m) => m.id === currentModel);

  // Current model rate limit
  const currentRateLimit = rateLimits[currentModel];

  // Count rate-limited models
  const limitedCount = Object.values(rateLimits).filter(r => !r.available && r.checkedAt).length;

  return (
    <div className="flex items-center gap-1.5">
      <Popover open={open} onOpenChange={setOpen}>
        <HelpTooltip
          content="Выбор ИИ-модели — нажмите, чтобы открыть список бесплатных моделей. Текущая модель используется для чата с агентом и всех песочниц. Двойной клик — подсказка."
          side="bottom"
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'gap-1.5 h-8 px-2.5 text-xs font-medium transition-all',
                'border-primary/20 hover:border-primary/40 hover:bg-primary/5'
              )}
              disabled={isApplying}
            >
              {isApplying ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : currentRateLimit && !currentRateLimit.available && currentRateLimit.checkedAt ? (
                <CircleAlert className="h-3 w-3 text-red-500" />
              ) : (
                <Cpu className="h-3 w-3 text-primary" />
              )}
              <span className="max-w-[100px] sm:max-w-[160px] truncate">
                {isApplying ? 'Применение...' : currentLabel}
              </span>
              {!isKnownModel && (
                <HelpTooltip content="Это пользовательская модель — она не из стандартного списка бесплатных моделей OpenRouter." side="top">
                  <Badge variant="secondary" className="text-[9px] px-1 py-0 h-4 ml-0.5">
                    custom
                  </Badge>
                </HelpTooltip>
              )}
              {limitedCount > 0 && (
                <HelpTooltip content={`${limitedCount} модел${limitedCount === 1 ? 'ь' : limitedCount < 5 ? 'и' : 'ей'} исчерпали суточный лимит бесплатных запросов. Выберите другую или подождите сброса.`} side="top">
                  <Badge variant="destructive" className="text-[9px] px-1 py-0 h-4 ml-0.5">
                    {limitedCount} лимит
                  </Badge>
                </HelpTooltip>
              )}
              <ChevronsUpDown className="h-3 w-3 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
        </HelpTooltip>

        <PopoverContent className="w-[360px] p-0" align="end">
          <Command>
            <div className="flex items-center border-b border-border px-3">
              <CommandInput placeholder="Поиск модели..." className="flex-1" />
              <HelpTooltip
                content="Проверить доступность всех моделей. Каждая модель получит тестовый запрос — это поможет узнать, у какой модели исчерпан суточный лимит, а какая готова к работе."
                side="left"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-[10px] gap-1 shrink-0 ml-1"
                  onClick={handleCheckAll}
                  disabled={isCheckingAll || isLoadingModels}
                >
                  {isCheckingAll ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Activity className="h-3 w-3" />
                  )}
                  {isCheckingAll ? 'Проверка...' : 'Проверить все'}
                </Button>
              </HelpTooltip>
            </div>
            <CommandList>
              <CommandEmpty>
                {isLoadingModels ? 'Загрузка моделей...' : 'Модель не найдена'}
              </CommandEmpty>
              <CommandGroup heading={
                <div className="flex items-center gap-1.5">
                  <Wifi className="h-3 w-3" />
                  <span>Бесплатные модели ({availableModels.length})</span>
                </div>
              }>
                {isLoadingModels && availableModels.length === 0 ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-sm text-muted-foreground">Загрузка...</span>
                  </div>
                ) : (
                  availableModels.map((model: FreeModel) => {
                    const rl = rateLimits[model.id];
                    return (
                      <CommandItem
                        key={model.id}
                        value={model.label + ' ' + model.id}
                        onSelect={() => applyModel(model.id)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Check
                          className={cn(
                            'h-3.5 w-3.5 shrink-0',
                            currentModel === model.id ? 'opacity-100 text-primary' : 'opacity-0'
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{model.label}</div>
                          <div className="text-[10px] text-muted-foreground font-mono truncate">
                            {model.id}
                          </div>
                        </div>
                        <RateLimitIndicator rateLimit={rl} />
                      </CommandItem>
                    );
                  })
                )}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading={
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" />
                  <span>Своё</span>
                </div>
              }>
                <HelpTooltip
                  content="Введите ID модели вручную, если её нет в списке. Формат: провайдер/модель:free — например deepseek/deepseek-r1:free. Модель применится ко всем чатам и песочницам."
                  side="bottom"
                >
                  <CommandItem
                    onSelect={() => {
                      setShowCustom(true);
                      setTimeout(() => inputRef.current?.focus(), 100);
                    }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <WifiOff className="h-3.5 w-3.5 text-primary" />
                    <span className="text-sm">Вставить свою модель</span>
                  </CommandItem>
                </HelpTooltip>
              </CommandGroup>
            </CommandList>
          </Command>

          {/* Custom model input */}
          {showCustom && (
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
                <HelpTooltip
                  content="Введите ID модели в формате провайдер/модель:free. Список всех моделей: openrouter.ai/models"
                  side="bottom"
                >
                  <Input
                    ref={inputRef}
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="vendor/model-name:free"
                    className="text-xs h-8 font-mono"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleCustomSubmit();
                      }
                    }}
                  />
                </HelpTooltip>
                <HelpTooltip
                  content="Применить введённую модель. Она станет активной для чата с агентом и всех песочниц."
                  side="bottom"
                >
                  <Button
                    size="sm"
                    className="h-8 px-3 text-xs gap-1 shrink-0"
                    onClick={handleCustomSubmit}
                    disabled={!customInput.trim() || isApplying}
                  >
                    {isApplying ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <RefreshCw className="h-3 w-3" />
                    )}
                    Применить
                  </Button>
                </HelpTooltip>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5">
                Формат: <code className="font-mono text-primary/80">провайдер/модель:free</code> — модель применится мгновенно
              </p>
            </div>
          )}

          {/* Rate limit legend */}
          <div className="px-3 py-2 border-t border-border">
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
              <HelpTooltip content="Зелёная точка — модель работает и принимает запросы. Число рядом — сколько запросов осталось до лимита." side="top">
                <span className="flex items-center gap-1 cursor-help">
                  <span className="w-2 h-2 rounded-full bg-green-500" /> Доступна
                </span>
              </HelpTooltip>
              <HelpTooltip content="Красная пульсирующая точка — суточный лимит бесплатных запросов исчерпан. Попробуйте другую модель или подождите сброса." side="top">
                <span className="flex items-center gap-1 cursor-help">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Лимит
                </span>
              </HelpTooltip>
              <HelpTooltip content="Серая точка — модель ещё не проверена. Нажмите «Проверить все», чтобы узнать её статус." side="top">
                <span className="flex items-center gap-1 cursor-help">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/30" /> Не проверена
                </span>
              </HelpTooltip>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
