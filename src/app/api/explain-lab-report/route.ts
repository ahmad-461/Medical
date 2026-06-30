import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function explainLabReport(
  imageBase64: string,
  mimeType: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `You are a medical lab report explainer. Analyze this lab report image and extract all test results. Return ONLY valid JSON with no markdown, no backticks, no code fences, no explanation.

Return exactly this JSON structure:
{
  "tests": [
    {
      "name": "test name e.g. Hemoglobin",
      "value": "result value with units",
      "normal_range": "reference range",
      "status": "normal | high | low",
      "explanation": "plain English explanation of what this test measures and what this result means"
    }
  ],
  "overall_summary": "brief plain English summary of all results",
  "unreadable_fields": []
}

If not a lab report return: {"error":"not_a_lab_report"}
If unreadable return: {"error":"unreadable"}`;

  const result = await model.generateContent([
    { inlineData: { mimeType, data: imageBase64 } },
    { text: prompt },
  ]);

  const text = result.response.text();
  return text;
}

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
      console.error('[explain-lab-report] download error:', downloadError);
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
    const rawText = await explainLabReport(base64, mimeType);

    // Parse JSON
    let parsed: Record<string, unknown>;
    try {
      const clean = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(clean);
    } catch (e) {
      console.error('[explain-lab-report] parse error:', e, 'raw:', rawText);
      return NextResponse.json({ error: 'parse_failed', raw: rawText }, { status: 500 });
    }

    if (parsed.error) {
      return NextResponse.json({ error: parsed.error }, { status: 422 });
    }

    // Save to DB (non-blocking) - assuming we can use the same results table or similar
    supabaseServer.from('results').insert({
      session_id, raw_text: rawText, structured_data: parsed
    }).then(({ error }) => {
      if (error) console.error('[explain-lab-report] db insert error:', error);
    });

    return NextResponse.json(parsed, { status: 200 });

  } catch (err: unknown) {
    const error = err as Error;
    console.error('[explain-lab-report] fatal:', error?.message || err);
    return NextResponse.json(
      { error: 'processing_failed', message: error?.message || String(err) },
      { status: 500 }
    );
  }
}
