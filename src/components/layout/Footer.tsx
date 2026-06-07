'use client';

export function Footer() {
  return (
    <footer className="border-t border-border py-6 px-6 mt-auto">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-widest text-muted-foreground/70">
            СОЗДАТЕЛЬ
          </span>
          <span className="text-sm font-bold tracking-widest text-muted-foreground/90">
            AZAR
          </span>
        </div>
        <p className="text-xs text-muted-foreground/40">
          Интерактивная образовательная платформа для изучения LLM
        </p>
      </div>
    </footer>
  );
}
