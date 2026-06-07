import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

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

    // Read current .env.local
    const envPath = join(process.cwd(), '.env.local');
    let envContent: string;

    try {
      envContent = readFileSync(envPath, 'utf-8');
    } catch {
      // File doesn't exist, create it
      envContent = '';
    }

    // Update or add OPENROUTER_MODEL
    const lines = envContent.split('\n');
    let found = false;
    const updatedLines = lines.map((line) => {
      if (line.startsWith('OPENROUTER_MODEL=')) {
        found = true;
        return `OPENROUTER_MODEL=${trimmedModel}`;
      }
      return line;
    });

    if (!found) {
      // Add OPENROUTER_MODEL if it doesn't exist
      const apiKeyIndex = updatedLines.findIndex((l) =>
        l.startsWith('OPENROUTER_API_KEY=')
      );
      if (apiKeyIndex >= 0) {
        updatedLines.splice(apiKeyIndex + 1, 0, `OPENROUTER_MODEL=${trimmedModel}`);
      } else {
        updatedLines.push(`OPENROUTER_MODEL=${trimmedModel}`);
      }
    }

    const newContent = updatedLines.join('\n');
    writeFileSync(envPath, newContent, 'utf-8');

    // Update process.env for the current process so it takes effect immediately
    process.env.OPENROUTER_MODEL = trimmedModel;

    return NextResponse.json({
      success: true,
      model: trimmedModel,
      message: `Model updated to ${trimmedModel}. The new model is now active.`,
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
