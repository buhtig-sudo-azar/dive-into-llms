import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt, temperature = 0.7, max_tokens = 256, model: clientModel, apiToken } = await req.json();

    // User's token takes priority over the server's env var
    const apiKey = apiToken || process.env.OPENROUTER_API_KEY;
    // Client-side model takes priority, then env var, then fallback
    const model = clientModel || process.env.OPENROUTER_MODEL || 'google/gemma-4-31b-it:free';

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const allMessages = [
      { role: 'system', content: systemPrompt || 'Ты полезный ассистент.' },
      ...messages,
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://dive-into-llms.app',
        'X-Title': 'Dive Into LLMs Sandbox',
      },
      body: JSON.stringify({
        model,
        messages: allMessages,
        stream: false,
        max_tokens,
        temperature: Math.max(0, Math.min(2, temperature)),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Sandbox API error:', errText);
      return new Response(JSON.stringify({ error: 'LLM API error', details: errText }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    return new Response(JSON.stringify({ content }), {
      status: 200,
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
