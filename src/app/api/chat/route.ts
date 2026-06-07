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
          // Forward the stream
          return new Response(response.body, {
            headers: {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              Connection: 'keep-alive',
            },
          });
        }

        // If rate limited or server error, try next model
        const errText = await response.text();
        console.warn(`Model ${model} failed (${response.status}):`, errText);
        lastError = errText;

        // Don't retry on client errors (4xx) except 429 (rate limit)
        if (response.status === 429) continue;
        if (response.status >= 400 && response.status < 500) continue;
        // Server errors — also try next
        continue;
      } catch (fetchError) {
        console.warn(`Model ${model} fetch error:`, fetchError);
        continue;
      }
    }

    // All models failed
    console.error('All models failed. Last error:', lastError);
    return new Response(JSON.stringify({ error: 'All models unavailable', details: lastError }), {
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
