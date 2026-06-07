import { NextRequest } from 'next/server';

// Кеш бесплатных моделей (обновляется каждые 5 минут)
let cachedFreeModels: string[] = [];
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 минут

async function getFreeModels(): Promise<string[]> {
  const now = Date.now();
  if (cachedFreeModels.length > 0 && now - lastFetchTime < CACHE_TTL) {
    return cachedFreeModels;
  }

  try {
    const res = await fetch('https://openrouter.ai/api/v1/models', {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.warn('Failed to fetch models, using cache:', res.status);
      return cachedFreeModels.length > 0 ? cachedFreeModels : getFallbackModels();
    }

    const data = await res.json();
    const models = data?.data || [];

    // Фильтруем бесплатные модели, исключаем content-safety
    cachedFreeModels = models
      .filter((m: { id: string }) =>
        m.id.endsWith(':free') && !m.id.includes('content-safety')
      )
      .map((m: { id: string }) => m.id);

    lastFetchTime = now;

    if (cachedFreeModels.length === 0) {
      return getFallbackModels();
    }

    console.log(`Loaded ${cachedFreeModels.length} free models from OpenRouter`);
    return cachedFreeModels;
  } catch (err) {
    console.warn('Error fetching models:', err);
    return cachedFreeModels.length > 0 ? cachedFreeModels : getFallbackModels();
  }
}

// Fallback-список на случай недоступности API
function getFallbackModels(): string[] {
  return [
    'moonshotai/kimi-k2.6:free',
    'nvidia/nemotron-3-ultra-550b-a55b:free',
    'google/gemma-4-31b-it:free',
    'nousresearch/hermes-3-llama-3.1-405b:free',
    'meta-llama/llama-3.3-70b-instruct:free',
    'qwen/qwen3-next-80b-a3b-instruct:free',
    'nvidia/nemotron-3-super-120b-a12b:free',
    'google/gemma-4-26b-a4b-it:free',
  ];
}

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt, model: clientModel, apiToken } = await req.json();

    // Токен пользователя приоритетнее серверного
    const apiKey = apiToken || process.env.OPENROUTER_API_KEY;
    // Модель с клиента приоритетнее
    const preferredModel = clientModel || process.env.OPENROUTER_MODEL;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const allMessages = [
      { role: 'system', content: systemPrompt },
      ...messages,
    ];

    // Динамически загружаем бесплатные модели
    const freeModels = await getFreeModels();

    // Строим список: предпочтительная модель первой, затем остальные
    const modelsToTry = preferredModel
      ? [preferredModel, ...freeModels.filter(m => m !== preferredModel)]
      : freeModels;

    let lastError = '';
    const rateLimitedModels: string[] = [];

    for (const model of modelsToTry) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://dive-into-llms.app',
            'X-Title': 'Dive Into LLMs',
          },
          body: JSON.stringify({
            model,
            messages: allMessages,
            stream: true,
            max_tokens: 2048,
            temperature: 0.7,
          }),
        });

        if (response.ok) {
          // Инжектим кастомное SSE-событие с инфо о модели
          const modelInfoEvent = `data: ${JSON.stringify({
            type: 'model_info',
            model,
            rateLimited: rateLimitedModels,
          })}\n\n`;

          const encoder = new TextEncoder();
          const infoChunk = encoder.encode(modelInfoEvent);
          const originalStream = response.body;

          if (!originalStream) {
            return new Response(JSON.stringify({ error: 'No stream body' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            });
          }

          // Комбинируем: сначала model_info, потом стрим
          const combinedStream = new ReadableStream({
            async start(controller) {
              controller.enqueue(infoChunk);
              const reader = originalStream.getReader();
              try {
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
                  controller.enqueue(value);
                }
                controller.close();
              } catch (err) {
                controller.error(err);
              }
            },
          });

          return new Response(combinedStream, {
            headers: {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              Connection: 'keep-alive',
              'X-Model-Used': model,
              'X-Rate-Limited-Models': rateLimitedModels.join(','),
            },
          });
        }

        // Отслеживаем модели с исчерпанным лимитом
        if (response.status === 429) {
          rateLimitedModels.push(model);
        }

        const errText = await response.text();
        console.warn(`Model ${model} failed (${response.status}):`, errText);
        lastError = errText;

        // Продолжаем со следующей моделью
        continue;
      } catch (fetchError) {
        console.warn(`Model ${model} fetch error:`, fetchError);
        continue;
      }
    }

    // Все модели не сработали
    console.error('All models failed. Last error:', lastError);
    return new Response(JSON.stringify({
      error: 'All models unavailable',
      details: lastError,
      rateLimitedModels,
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
