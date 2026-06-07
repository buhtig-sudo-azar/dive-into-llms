'use client';

import { useState, useEffect, useRef } from 'react';
import { useModelStore, FREE_MODELS } from '@/store/model-store';
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
import { Check, ChevronsUpDown, Cpu, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function ModelSelector() {
  const { currentModel, setCurrentModel, isApplying, setIsApplying, _hydrate } = useModelStore();
  const [open, setOpen] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    _hydrate();
  }, [_hydrate]);

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
        // Silent fail — model is still used client-side via request body
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

  const currentLabel =
    FREE_MODELS.find((m) => m.id === currentModel)?.label ||
    currentModel.split('/').pop() ||
    currentModel;

  const isFreeModel = FREE_MODELS.some((m) => m.id === currentModel);

  return (
    <div className="flex items-center gap-1.5">
      <Popover open={open} onOpenChange={setOpen}>
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
            ) : (
              <Cpu className="h-3 w-3 text-primary" />
            )}
            <span className="max-w-[120px] sm:max-w-[180px] truncate">
              {isApplying ? 'Применение...' : currentLabel}
            </span>
            {!isFreeModel && (
              <Badge variant="secondary" className="text-[9px] px-1 py-0 h-4 ml-0.5">
                custom
              </Badge>
            )}
            <ChevronsUpDown className="h-3 w-3 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[320px] p-0" align="end">
          <Command>
            <CommandInput placeholder="Поиск модели..." />
            <CommandList>
              <CommandEmpty>Модель не найдена</CommandEmpty>
              <CommandGroup heading="Бесплатные модели">
                {FREE_MODELS.map((model) => (
                  <CommandItem
                    key={model.id}
                    value={model.label}
                    onSelect={() => applyModel(model.id)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Check
                      className={cn(
                        'h-3.5 w-3.5',
                        currentModel === model.id ? 'opacity-100 text-primary' : 'opacity-0'
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{model.label}</div>
                      <div className="text-[10px] text-muted-foreground font-mono truncate">
                        {model.id}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 shrink-0">
                      free
                    </Badge>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Своё">
                <CommandItem
                  onSelect={() => {
                    setShowCustom(true);
                    setTimeout(() => inputRef.current?.focus(), 100);
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="text-sm">Вставить свою модель</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>

          {/* Custom model input */}
          {showCustom && (
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
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
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5">
                Формат: <code className="font-mono text-primary/80">провайдер/модель:free</code> — модель применится мгновенно
              </p>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
