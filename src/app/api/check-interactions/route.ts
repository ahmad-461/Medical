import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { medicines } = await req.json();

    if (!medicines || !Array.isArray(medicines) || medicines.length < 2) {
      return NextResponse.json(
        { error: 'minimum_two_medicines' },
        { status: 400 }
      );
    }

    if (medicines.length > 5) {
      return NextResponse.json(
        { error: 'maximum_five_medicines' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    const medicineList = medicines.join(', ');

    const prompt = `You are a clinical pharmacology expert. Check for drug interactions between these medicines: ${medicineList}.

Return ONLY a valid JSON object with no markdown, no backticks, no code fences, no explanation.

Return exactly this structure:
{
  "overall_safety": "safe | caution | dangerous",
  "summary": "one sentence overall summary of the combination",
  "interactions": [
    {
      "drug_a": "first medicine name",
      "drug_b": "second medicine name",
      "severity": "none | mild | moderate | severe",
      "description": "plain English explanation of what happens when these two are combined",
      "recommendation": "what the patient should do e.g. consult doctor, avoid combination, take at different times"
    }
  ],
  "general_advice": "overall advice for taking this combination of medicines",
  "consult_doctor": true
}

Check every possible pair combination from the list.
If all medicines are safe together set overall_safety to "safe" and interactions array can be empty or have entries with severity "none".
Always set consult_doctor to true.
Return only JSON, nothing else.`;

    try {
      const result = await model.generateContent(prompt);
      const rawText = result.response.text();

      let parsed: unknown;
      try {
        const clean = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        parsed = JSON.parse(clean);
      } catch (e) {
        console.error('[interactions] parse error:', e);
        return NextResponse.json({ error: 'parse_failed' }, { status: 500 });
      }

      return NextResponse.json(parsed, { status: 200 });
    } catch (apiError: unknown) {
      const apiErrorMessage = apiError instanceof Error ? apiError.message : String(apiError);
      console.error('[interactions] Gemini API error:', apiErrorMessage);

      let finalMessage = apiErrorMessage;
      if (apiErrorMessage.includes('404') || apiErrorMessage.includes('not found')) {
        try {
          const diagResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
          const diagData = await diagResp.json() as { models?: Array<{ name: string }> };
          const availableModels = diagData.models?.map(m => m.name);
          if (availableModels) {
            finalMessage = `${apiErrorMessage} | Available models for your key: ${availableModels.join(', ')}`;
          }
          console.error('[interactions] [Diagnostic] Available models:', JSON.stringify(availableModels));
        } catch (diagErr) {
          console.error('[interactions] [Diagnostic] Failed diagnostic list:', diagErr);
        }
      }
      return NextResponse.json(
        { error: 'api_error', message: finalMessage },
        { status: 500 }
      );
    }

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('[interactions] fatal:', errorMessage);
    return NextResponse.json(
      { error: 'check_failed', message: errorMessage },
      { status: 500 }
    );
  }
}
