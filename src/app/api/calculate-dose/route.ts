import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { medicine, childWeight, childAge, ageUnit } = await req.json();

    if (!medicine || !childWeight || !childAge) {
      return NextResponse.json({ error: 'missing_params' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a pediatric dosing assistant. Calculate the typical pediatric dose for the following:
Medicine: ${medicine}
Child Weight: ${childWeight} kg
Child Age: ${childAge} ${ageUnit}

Return ONLY valid JSON with no markdown:
{
  "medicine": "string",
  "recommended_dose": "string e.g. 250mg every 8 hours",
  "max_daily_dose": "string",
  "notes": "string",
  "warning": "always confirm with pediatrician before administering"
}

If you cannot calculate a dose for this medicine or age/weight, return: {"error":"cannot_calculate", "message": "reason why"}
Provide a general estimate only based on standard medical guidelines.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Parse JSON
    let parsed: Record<string, unknown>;
    try {
      const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(clean);
    } catch (e) {
      console.error('[calculate-dose] parse error:', e, 'raw:', text);
      return NextResponse.json({ error: 'parse_failed', raw: text }, { status: 500 });
    }

    return NextResponse.json(parsed, { status: 200 });

  } catch (err: unknown) {
    const error = err as Error;
    console.error('[calculate-dose] fatal:', error?.message || err);
    return NextResponse.json(
      { error: 'calculation_failed', message: error?.message || String(err) },
      { status: 500 }
    );
  }
}
