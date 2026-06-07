'use client';

import { useState, useEffect, useCallback } from 'react';
import { useNavigationStore } from '@/store/navigation-store';
import { topics } from '@/data/topics';
import { Search, X, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface SearchResult {
  type: 'category' | 'subtopic' | 'term';
  title: string;
  description: string;
  categorySlug: string;
  subtopicSlug?: string;
}

function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  for (const category of topics) {
    results.push({
      type: 'category',
      title: category.title,
      description: category.description,
      categorySlug: category.slug,
    });

    for (const sub of category.subtopics) {
      results.push({
        type: 'subtopic',
        title: sub.title,
        description: sub.introduction.what.slice(0, 120),
        categorySlug: category.slug,
        subtopicSlug: sub.slug,
      });

      for (const term of sub.theory.terms) {
        results.push({
          type: 'term',
          title: term.term,
          description: term.definition.slice(0, 120),
          categorySlug: category.slug,
          subtopicSlug: sub.slug,
        });
      }
    }
  }

  return results;
}

const searchIndex = buildSearchIndex();

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { navigateToSubtopic, navigateToCategory } = useNavigationStore();

  // Cmd+K to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filtered = query.length > 0
    ? searchIndex.filter(item => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        );
      }).slice(0, 10)
    : [];

  const handleSelect = (item: SearchResult) => {
    if (item.subtopicSlug) {
      navigateToSubtopic(item.categorySlug, item.subtopicSlug);
    } else {
      navigateToCategory(item.categorySlug);
    }
    setOpen(false);
    setQuery('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg p-0 gap-0">
        <div className="flex items-center border-b border-border px-3">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по темам, терминам..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-11"
          />
          {query && (
            <button onClick={() => setQuery('')} className="shrink-0">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {filtered.length > 0 && (
          <div className="max-h-64 overflow-y-auto py-1">
            {filtered.map((item, i) => (
              <button
                key={`${item.type}-${item.title}-${i}`}
                onClick={() => handleSelect(item)}
                className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="text-[10px] uppercase font-medium text-muted-foreground w-16 shrink-0">
                  {item.type === 'category' ? 'Раздел' : item.type === 'term' ? 'Термин' : 'Тема'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        )}

        {query.length > 0 && filtered.length === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            Ничего не найдено по запросу «{query}»
          </div>
        )}

        {query.length === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            Начните вводить для поиска по платформе
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
