import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { extractPrescriptionData } from '@/lib/gemini';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { session_id, file_path } = await req.json();
    console.log('[process] received:', { session_id, file_path });

    // 1. Download image from Supabase Storage
    const { data: fileData, error: downloadError } = await supabaseServer
      .storage
      .from('prescription-images')
      .download(file_path);

    if (downloadError || !fileData) {
      console.error('[process] download error:', downloadError);
      return NextResponse.json({ error: 'download_failed' }, { status: 500 });
    }
    console.log('[process] file downloaded successfully');

    // 2. Convert to base64
    const arrayBuffer = await fileData.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = fileData.type || 'image/jpeg';
    console.log('[process] converted to base64, mimeType:', mimeType);

    // 3. Send to Gemini
    const rawText = await extractPrescriptionData(base64, mimeType);
    console.log('[process] Gemini raw response:', rawText);

    // 4. Parse JSON
    const clean = rawText.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    console.log('[process] parsed result:', parsed);

    if (parsed.error) {
      return NextResponse.json({ error: parsed.error }, { status: 422 });
    }

    // 5. Save to Supabase results table
    await supabaseServer.from('results').insert({
      session_id,
      raw_text: rawText,
      structured_data: parsed
    });
    console.log('[process] saved to database');

    return NextResponse.json(parsed, { status: 200 });

  } catch (err) {
    console.error('[process] fatal error:', err);
    return NextResponse.json(
      { error: 'processing_failed', message: String(err) },
      { status: 500 }
    );
  }
}
