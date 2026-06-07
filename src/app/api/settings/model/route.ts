import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { model } = await req.json();

    if (!model || typeof model !== 'string' || model.trim().length === 0) {
      return NextResponse.json(
        { error: 'Model name is required' },
        { status: 400 }
      );
    }

    const trimmedModel = model.trim();

    // Update process.env for the current serverless function invocation
    // Note: on Vercel, the filesystem is read-only, so we can't write .env.local
    // The model is persisted client-side in localStorage and sent with each request
    process.env.OPENROUTER_MODEL = trimmedModel;

    return NextResponse.json({
      success: true,
      model: trimmedModel,
      message: `Model set to ${trimmedModel}. Active for this session.`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const currentModel = process.env.OPENROUTER_MODEL || 'moonshotai/kimi-k2.6:free';
    return NextResponse.json({ currentModel });
  } catch {
    return NextResponse.json({ error: 'Failed to read model' }, { status: 500 });
  }
}
