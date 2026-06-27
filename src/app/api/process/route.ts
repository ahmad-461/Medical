import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { extractPrescriptionData } from '@/lib/gemini';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { session_id, file_path } = await req.json();
    console.log('[process] start:', { session_id, file_path });
    console.log('[process] env:', {
      hasGemini: !!process.env.GEMINI_API_KEY,
      hasSupabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasService: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    });

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
    console.log('[process] downloaded, size:', fileData.size, 'type:', fileData.type);

    // Convert to base64
    const arrayBuffer = await fileData.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = fileData.type || 'image/jpeg';

    // Send to Gemini
    const rawText = await extractPrescriptionData(base64, mimeType);

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

    console.log('[process] success');
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
