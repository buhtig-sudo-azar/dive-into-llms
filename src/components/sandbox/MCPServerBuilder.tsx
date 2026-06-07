'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Plus, Trash2, Play, RotateCcw, Copy, CheckCircle2, XCircle } from 'lucide-react';

interface ToolParam { name: string; type: string; }
interface Tool { id: number; name: string; description: string; params: ToolParam[]; }
interface Resource { id: number; uri: string; name: string; description: string; mime: string; }

export function MCPServerBuilder({ title, description }: { title: string; description: string }) {
  const [serverName, setServerName] = useState('my-mcp-server');
  const [tools, setTools] = useState<Tool[]>([
    { id: 1, name: 'search_web', description: 'Поиск в интернете', params: [{ name: 'query', type: 'string' }] },
  ]);
  const [resources, setResources] = useState<Resource[]>([
    { id: 1, uri: 'file:///docs/readme.md', name: 'readme', description: 'Документация проекта', mime: 'text/markdown' },
  ]);
  const [idC, setIdC] = useState(10);
  const [toolName, setToolName] = useState('');
  const [toolDesc, setToolDesc] = useState('');
  const [toolParams, setToolParams] = useState<ToolParam[]>([]);
  const [resUri, setResUri] = useState('');
  const [resName, setResName] = useState('');
  const [resDesc, setResDesc] = useState('');
  const [resMime, setResMime] = useState('text/plain');
  const [testToolId, setTestId] = useState<number | null>(null);
  const [testResult, setTestResult] = useState('');

  const addTool = () => {
    if (!toolName.trim()) return;
    setTools((p) => [...p, { id: idC, name: toolName.trim(), description: toolDesc.trim(), params: [...toolParams] }]);
    setIdC((p) => p + 1); setToolName(''); setToolDesc(''); setToolParams([]);
  };
  const removeTool = (id: number) => setTools((p) => p.filter((t) => t.id !== id));
  const addResource = () => {
    if (!resUri.trim()) return;
    setResources((p) => [...p, { id: idC, uri: resUri.trim(), name: resName.trim(), description: resDesc.trim(), mime: resMime }]);
    setIdC((p) => p + 1); setResUri(''); setResName(''); setResDesc('');
  };
  const removeResource = (id: number) => setResources((p) => p.filter((r) => r.id !== id));
  const addParam = () => setToolParams((p) => [...p, { name: '', type: 'string' }]);
  const updateParam = (i: number, f: 'name' | 'type', v: string) => setToolParams((p) => p.map((pr, idx) => idx === i ? { ...pr, [f]: v } : pr));

  const config = { name: serverName, tools: tools.map((t) => ({ name: t.name, description: t.description, parameters: t.params })), resources: resources.map((r) => ({ uri: r.uri, name: r.name, description: r.description, mimeType: r.mime })) };
  const isValid = serverName.trim() && tools.length > 0;

  const testTool = (id: number) => {
    const tool = tools.find((t) => t.id === id);
    if (!tool) return;
    setTestId(id);
    setTestResult(`Результат вызова ${tool.name}(${tool.params.map((p) => p.name).join(', ')}): симуляция успешна. Данные получены.`);
  };

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Server className="h-4 w-4 text-primary" />
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs">Песочница</Badge>
        </div>
        <p className="text-base text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Server name */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Имя сервера</label>
          <Input value={serverName} onChange={(e) => setServerName(e.target.value)} className="text-sm font-mono" />
        </div>

        {/* Tools */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Инструменты {isValid ? <CheckCircle2 className="h-3 w-3 text-green-500 inline" /> : <XCircle className="h-3 w-3 text-destructive inline" />}</label>
          <div className="space-y-2">
            {tools.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-lg border border-border p-2">
                <div>
                  <div className="text-sm font-mono font-medium">{t.name}({t.params.map((p) => `${p.name}: ${p.type}`).join(', ')})</div>
                  <div className="text-xs text-muted-foreground">{t.description}</div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => testTool(t.id)} className="h-6 text-[10px] gap-1"><Play className="h-2.5 w-2.5" />Тест</Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => removeTool(t.id)}><Trash2 className="h-3 w-3" /></Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 rounded-lg border border-dashed border-border p-2 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Input value={toolName} onChange={(e) => setToolName(e.target.value)} placeholder="Имя инструмента" className="text-sm font-mono h-8" />
              <Input value={toolDesc} onChange={(e) => setToolDesc(e.target.value)} placeholder="Описание" className="text-sm h-8" />
            </div>
            {toolParams.map((p, i) => (
              <div key={i} className="flex items-center gap-1">
                <Input value={p.name} onChange={(e) => updateParam(i, 'name', e.target.value)} placeholder="параметр" className="text-sm h-7" />
                <select value={p.type} onChange={(e) => updateParam(i, 'type', e.target.value)} className="h-7 rounded border bg-background px-2 text-xs">
                  <option value="string">string</option><option value="number">number</option><option value="boolean">boolean</option>
                </select>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setToolParams((p2) => p2.filter((_, j) => j !== i))}><Trash2 className="h-2.5 w-2.5" /></Button>
              </div>
            ))}
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={addParam} className="text-[10px] gap-1"><Plus className="h-2.5 w-2.5" />Параметр</Button>
              <Button size="sm" onClick={addTool} disabled={!toolName.trim()} className="text-[10px] gap-1"><Plus className="h-2.5 w-2.5" />Добавить</Button>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Ресурсы</label>
          <div className="space-y-2">
            {resources.map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg border border-border p-2">
                <div>
                  <div className="text-sm font-medium">{r.name} <span className="text-xs text-muted-foreground font-mono">{r.uri}</span></div>
                  <div className="text-xs text-muted-foreground">{r.description} · {r.mime}</div>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => removeResource(r.id)}><Trash2 className="h-3 w-3" /></Button>
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Input value={resUri} onChange={(e) => setResUri(e.target.value)} placeholder="URI (file:///...)" className="text-sm font-mono h-8" />
            <Input value={resName} onChange={(e) => setResName(e.target.value)} placeholder="Имя" className="text-sm h-8" />
            <Input value={resDesc} onChange={(e) => setResDesc(e.target.value)} placeholder="Описание" className="text-sm h-8" />
            <div className="flex gap-1">
              <Input value={resMime} onChange={(e) => setResMime(e.target.value)} placeholder="MIME" className="text-sm font-mono h-8" />
              <Button size="sm" onClick={addResource} disabled={!resUri.trim()} className="gap-1 shrink-0 h-8 text-[10px]"><Plus className="h-2.5 w-2.5" /></Button>
            </div>
          </div>
        </div>

        {/* Test result */}
        {testResult && (
          <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-2 text-sm">{testResult}</div>
        )}

        {/* Config preview */}
        <details className="rounded-lg border border-border" open>
          <summary className="p-2 text-xs font-medium text-muted-foreground cursor-pointer">JSON конфигурация сервера</summary>
          <pre className="p-2 text-[10px] font-mono overflow-x-auto text-muted-foreground bg-muted/20 max-h-[200px] overflow-y-auto">{JSON.stringify(config, null, 2)}</pre>
        </details>

        <Button size="sm" variant="outline" onClick={() => { setTools([]); setResources([]); setTestResult(''); }} className="gap-1.5">
          <RotateCcw className="h-3 w-3" /> Сбросить
        </Button>
      </CardContent>
    </Card>
  );
}
