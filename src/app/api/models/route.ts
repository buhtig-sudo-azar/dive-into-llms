import { NextResponse } from 'next/server';

// Cache for 5 minutes
let cachedModels: { id: string; name: string; label: string }[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  try {
    const now = Date.now();

    // Return cached if fresh
    if (cachedModels && now - cacheTime < CACHE_TTL) {
      return NextResponse.json({ models: cachedModels });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers,
      next: { revalidate: 300 }, // Cache for 5 minutes at Next.js level too
    });

    if (!response.ok) {
      // If API fails, return cached even if stale, or fallback list
      if (cachedModels) {
        return NextResponse.json({ models: cachedModels });
      }
      return NextResponse.json(
        { error: 'Failed to fetch models from OpenRouter' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const allModels = data.data || [];

    // Filter only free models (id ends with :free)
    // Exclude content-safety models — they're not for chat
    const freeModels = allModels
      .filter((m: { id: string }) => m.id.endsWith(':free'))
      .filter((m: { id: string }) => !m.id.includes('content-safety'))
      .map((m: { id: string; name?: string }) => {
        // Build a clean label: use name from API, or derive from id
        const name = m.name || m.id.split('/').pop() || m.id;
        // Remove " (free)" suffix from name if present
        const label = name.replace(/\s*\(free\)\s*$/i, '').trim();

        return {
          id: m.id,
          name: m.name || m.id,
          label,
        };
      })
      // Sort: popular/large models first — sort by name alphabetically for now
      .sort((a: { label: string }, b: { label: string }) => a.label.localeCompare(b.label));

    cachedModels = freeModels;
    cacheTime = now;

    return NextResponse.json({ models: freeModels });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    // Return cached if available, even on error
    if (cachedModels) {
      return NextResponse.json({ models: cachedModels });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
