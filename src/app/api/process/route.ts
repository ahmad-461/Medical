import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { extractPrescriptionData } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { session_id, file_path } = await req.json();

    if (!session_id || !file_path) {
      return NextResponse.json({ error: 'missing_params' }, { status: 400 });
    }

    // 0. Check if storage bucket exists
    const { data: buckets } = await supabaseServer.storage.listBuckets();
    const bucketExists = buckets?.some(b => b.name === 'prescription-images');
    if (!bucketExists) {
      return NextResponse.json(
        { error: 'storage_not_configured' },
        { status: 500 }
      );
    }

    // 1. Download image from Supabase Storage
    const { data, error: downloadError } = await supabaseServer.storage
      .from('prescription-images')
      .download(file_path);

    if (downloadError || !data) {
      console.error('Error downloading from Supabase Storage:', downloadError);
      return NextResponse.json({ error: 'download_failed', message: downloadError?.message }, { status: 500 });
    }

    // 2. Convert image to base64
    const buffer = Buffer.from(await data.arrayBuffer());
    const base64Image = buffer.toString('base64');
    const mimeType = data.type || 'image/jpeg';

    // 3. Send to Gemini
    const originalGeminiText = await extractPrescriptionData(base64Image, mimeType);

    // 4. Parse Gemini response
    let parsedJSON;
    try {
      const clean = originalGeminiText.replace(/```json|```/g, "").trim();
      parsedJSON = JSON.parse(clean);
    } catch (parseError) {
      console.error('Error parsing Gemini JSON:', parseError, 'Raw Text:', originalGeminiText);
      return NextResponse.json({ error: 'processing_failed', message: 'Failed to parse AI response' }, { status: 500 });
    }

    // 5. Check for AI-detected errors
    if (parsedJSON.error) {
      return NextResponse.json({ error: parsedJSON.error }, { status: 422 });
    }

    // 6. Save to results table
    const { error: insertError } = await supabaseServer
      .from('results')
      .insert([
        {
          session_id,
          raw_text: originalGeminiText,
          structured_data: parsedJSON
        }
      ]);

    if (insertError) {
      console.error('Error inserting into results table:', insertError);
      // We still return the JSON to the user even if DB insert fails
    }

    // 7. Return parsed JSON to client
    return NextResponse.json(parsedJSON, { status: 200 });

  } catch (err: unknown) {
    console.error('API Process Route Error:', err);
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: 'processing_failed', message: errorMessage },
      { status: 500 }
    );
  }
}
