'use client';

import { Subtopic } from '@/types';
import { useNavigationStore } from '@/store/navigation-store';
import {
  Lightbulb, BookOpen, GitBranch, Code2, AlertTriangle,
  ArrowRight, ChevronRight, FlaskConical,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';
import { PromptPlayground, TokenizerSandbox, TemperatureSandbox, SystemPromptSandbox } from '@/components/sandbox';

function SectionTitle({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className="h-5 w-5 text-primary" />
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
}

function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export function TopicViewContent({ subtopic }: { subtopic: Subtopic }) {
  const { navigateToSubtopic } = useNavigationStore();
  const { theme } = useTheme();

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card>
        <CardHeader>
          <SectionTitle icon={Lightbulb} title="Введение" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-sm text-primary mb-1">Что это такое?</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{subtopic.introduction.what}</p>
          </div>
          <div>
            <h4 className="font-medium text-sm text-primary mb-1">Зачем это нужно?</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{subtopic.introduction.why}</p>
          </div>
          <div>
            <h4 className="font-medium text-sm text-primary mb-1">Где используется?</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{subtopic.introduction.where}</p>
          </div>
          <div>
            <h4 className="font-medium text-sm text-primary mb-1">Какую проблему решает?</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{subtopic.introduction.problem}</p>
          </div>
        </CardContent>
      </Card>

      {/* Theory */}
      <Card>
        <CardHeader>
          <SectionTitle icon={BookOpen} title="Теоретическая часть" />
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Terms */}
          <div>
            <h4 className="font-medium mb-3">Основные термины</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {subtopic.theory.terms.map((term) => (
                <div key={term.term} className="p-3 rounded-lg border border-border bg-muted/30">
                  <dt className="font-medium text-sm text-primary">{term.term}</dt>
                  <dd className="text-xs text-muted-foreground mt-1 leading-relaxed">{term.definition}</dd>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Principles */}
          <div>
            <h4 className="font-medium mb-2">Принципы работы</h4>
            <MarkdownContent content={subtopic.theory.principles} />
          </div>

          <Separator />

          {/* Architecture */}
          <div>
            <h4 className="font-medium mb-2">Архитектура</h4>
            <MarkdownContent content={subtopic.theory.architecture} />
          </div>

          <Separator />

          {/* Connections */}
          <div>
            <h4 className="font-medium mb-2">Связи с другими технологиями</h4>
            <MarkdownContent content={subtopic.theory.connections} />
          </div>
        </CardContent>
      </Card>

      {/* Diagram */}
      <Card>
        <CardHeader>
          <SectionTitle icon={GitBranch} title="Визуальная схема" />
        </CardHeader>
        <CardContent>
          <h4 className="font-medium mb-3">{subtopic.diagram.title}</h4>
          <div
            className="w-full overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: subtopic.diagram.svgContent }}
          />
        </CardContent>
      </Card>

      {/* Practical Examples */}
      <Card>
        <CardHeader>
          <SectionTitle icon={Code2} title="Практические примеры" />
        </CardHeader>
        <CardContent className="space-y-4">
          {subtopic.practicalExamples.map((example, i) => (
            <div key={i} className="border border-border rounded-lg overflow-hidden">
              <div className="p-3 bg-muted/30">
                <h4 className="font-medium text-sm">{example.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{example.description}</p>
              </div>
              {example.code && (
                <div className="relative">
                  <SyntaxHighlighter
                    language={example.language || 'typescript'}
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      fontSize: '12px',
                      borderRadius: 0,
                    }}
                  >
                    {example.code}
                  </SyntaxHighlighter>
                  {example.language && (
                    <Badge
                      variant="secondary"
                      className="absolute top-2 right-2 text-[10px]"
                    >
                      {example.language}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Interactive Sandboxes */}
      {subtopic.sandboxes && subtopic.sandboxes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <FlaskConical className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Интерактивные песочницы</h2>
          </div>
          {subtopic.sandboxes.map((sandbox, i) => {
            switch (sandbox.type) {
              case 'prompt-playground':
                return (
                  <PromptPlayground
                    key={i}
                    title={sandbox.title}
                    description={sandbox.description}
                    defaultPrompt={sandbox.defaultPrompt}
                    defaultSystem={sandbox.defaultSystem}
                    placeholder={sandbox.placeholder}
                  />
                );
              case 'tokenizer':
                return (
                  <TokenizerSandbox
                    key={i}
                    title={sandbox.title}
                    description={sandbox.description}
                    defaultPrompt={sandbox.defaultPrompt}
                  />
                );
              case 'temperature':
                return (
                  <TemperatureSandbox
                    key={i}
                    title={sandbox.title}
                    description={sandbox.description}
                    defaultPrompt={sandbox.defaultPrompt}
                    defaultTemperature={sandbox.defaultTemperature}
                    placeholder={sandbox.placeholder}
                  />
                );
              case 'system-prompt':
                return (
                  <SystemPromptSandbox
                    key={i}
                    title={sandbox.title}
                    description={sandbox.description}
                    defaultPrompt={sandbox.defaultPrompt}
                    defaultSystem={sandbox.defaultSystem}
                    placeholder={sandbox.placeholder}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      )}

      {/* Common Mistakes */}
      <Card>
        <CardHeader>
          <SectionTitle icon={AlertTriangle} title="Частые ошибки новичков" />
        </CardHeader>
        <CardContent className="space-y-4">
          {subtopic.commonMistakes.map((mistake, i) => (
            <div key={i} className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
              <h4 className="font-medium text-sm text-destructive mb-2">❌ {mistake.mistake}</h4>
              <p className="text-sm text-muted-foreground mb-2">{mistake.explanation}</p>
              <div className="p-3 rounded bg-primary/5 border border-primary/10">
                <p className="text-sm"><span className="font-medium text-primary">✅ Правильный подход:</span> {mistake.correctApproach}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Further Reading */}
      <Card>
        <CardHeader>
          <SectionTitle icon={ArrowRight} title="Что изучать дальше" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {subtopic.furtherReading.map((item) => (
              <Button
                key={item.slug}
                variant="outline"
                size="sm"
                onClick={() => navigateToSubtopic(item.categorySlug, item.slug)}
                className="gap-1.5 text-xs"
              >
                {item.topic}
                <ChevronRight className="h-3 w-3" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
