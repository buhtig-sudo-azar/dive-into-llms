import { NextRequest } from 'next/server';

const FREE_MODELS = [
  'moonshotai/kimi-k2.6:free',
  'nvidia/nemotron-3-ultra-550b-a55b:free',
  'google/gemma-4-31b-it:free',
  'nousresearch/hermes-3-llama-3.1-405b:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'qwen/qwen3-next-80b-a3b-instruct:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
  'google/gemma-4-26b-a4b-it:free',
];

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt, model: clientModel } = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY;
    // Client-side model takes priority, then env var, then fallback
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

    // Build model list: preferred first, then fallbacks
    const modelsToTry = preferredModel
      ? [preferredModel, ...FREE_MODELS.filter(m => m !== preferredModel)]
      : FREE_MODELS;

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
          // Inject a custom SSE event with model info + rate limited models
          // Then forward the actual stream
          const modelInfoEvent = `data: ${JSON.stringify({
            type: 'model_info',
            model,
            rateLimited: rateLimitedModels,
          })}\n\n`;

          // Create a combined stream: model_info event + actual response
          const encoder = new TextEncoder();
          const infoChunk = encoder.encode(modelInfoEvent);
          const originalStream = response.body;

          if (!originalStream) {
            return new Response(JSON.stringify({ error: 'No stream body' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            });
          }

          // Combine: prepend model_info, then forward the rest
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

        // Track rate limited models
        if (response.status === 429) {
          rateLimitedModels.push(model);
        }

        const errText = await response.text();
        console.warn(`Model ${model} failed (${response.status}):`, errText);
        lastError = errText;

        if (response.status === 429) continue;
        if (response.status >= 400 && response.status < 500) continue;
        continue;
      } catch (fetchError) {
        console.warn(`Model ${model} fetch error:`, fetchError);
        continue;
      }
    }

    // All models failed
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
