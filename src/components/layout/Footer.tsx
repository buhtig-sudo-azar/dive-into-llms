'use client';

export function Footer() {
  return (
    <footer className="border-t border-border py-6 px-6 mt-auto">
      <div className="flex flex-col items-center justify-center gap-1.5">
        <p className="text-xs text-muted-foreground/50">
          Dive Into LLMs — интерактивная образовательная платформа
        </p>
        <p className="text-[10px] text-muted-foreground/40">
          СОЗДАТЕЛЬ AZAR • Модели предоставлены OpenRouter • Бесплатные AI-наставники для каждой темы
        </p>
      </div>
    </footer>
  );
}
