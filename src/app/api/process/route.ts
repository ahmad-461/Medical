import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { extractPrescriptionData } from '@/lib/gemini';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { session_id, file_path } = await req.json();

    if (!session_id || !file_path) {
      return NextResponse.json({ error: 'missing_params' }, { status: 400 });
    }

    // Download from Supabase Storage
    const { data: fileData, error: downloadError } = await supabaseServer
      .storage.from('prescription-images').download(file_path);

    if (downloadError || !fileData) {
      console.error('[process] download error:', downloadError);
      return NextResponse.json(
        { error: 'download_failed', detail: downloadError?.message },
        { status: 500 }
      );
    }

    // Convert to base64
    const arrayBuffer = await fileData.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = fileData.type || 'image/jpeg';

    // Send to Gemini
    let geminiResponse: { text: string; available_models?: string[] };
    try {
      geminiResponse = await extractPrescriptionData(base64, mimeType);
    } catch (geminiErr: unknown) {
      const msg = geminiErr instanceof Error ? geminiErr.message : String(geminiErr);
      return NextResponse.json({
        error: 'gemini_error',
        message: msg
      }, { status: 500 });
    }

    const rawText = geminiResponse.text;

    // Parse JSON
    let parsed: Record<string, unknown>;
    try {
      const clean = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(clean);
    } catch (e) {
      console.error('[process] parse error:', e, 'raw:', rawText);
      return NextResponse.json({ error: 'parse_failed', raw: rawText }, { status: 500 });
    }

    if (parsed.error) {
      return NextResponse.json({ error: parsed.error }, { status: 422 });
    }

    // Save to DB (non-blocking)
    supabaseServer.from('results').insert({
      session_id, raw_text: rawText, structured_data: parsed
    }).then(({ error }) => {
      if (error) console.error('[process] db insert error:', error);
    });

    return NextResponse.json(parsed, { status: 200 });

  } catch (err: unknown) {
    const error = err as Error;
    console.error('[process] fatal:', error?.message || err);
    return NextResponse.json(
      { error: 'processing_failed', message: error?.message || String(err) },
      { status: 500 }
    );
  }
}
