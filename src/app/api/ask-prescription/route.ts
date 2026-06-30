import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { question, prescriptionContext } = await req.json();

    if (!question || !prescriptionContext) {
      return NextResponse.json({ error: 'missing_params' }, { status: 400 });
    }

    if (question.length > 300) {
      return NextResponse.json({ error: 'question_too_long' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('[ask-prescription] Error: GEMINI_API_KEY is not set');
      return NextResponse.json({ error: 'service_not_configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // User requested gemini-2.0-flash specifically
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `You are a prescription explanation assistant. You may ONLY answer questions that directly relate to explaining the prescription data provided below. You must NEVER give medical advice, diagnose conditions, recommend dosage changes, comment on symptoms, or answer anything not directly about explaining the listed medicines and their already-stated instructions.

PRESCRIPTION DATA:
${JSON.stringify(prescriptionContext)}

RULES — follow strictly:
1. Only explain or clarify information that is already present in the prescription data above (e.g. "what does BD mean", "why might this be prescribed after meals", "what is this frequency code").
2. If the question asks for medical advice, diagnosis, whether to take the medicine, what to do about symptoms, dosage changes, or anything not explicitly answerable from the prescription data alone, you MUST refuse and respond with a message explaining you can only explain the prescription details and that they should consult a doctor or pharmacist.
3. Never suggest stopping, changing, or adjusting any medicine.
4. Never comment on whether a combination of medicines is safe — only point to the Drug Interaction Checker tool if asked about interactions, do not analyze interactions yourself in this chat.
5. Keep answers under 80 words, plain English, friendly tone.
6. Always end every answer (except the refusal message) with: "Always confirm with your doctor or pharmacist before making any changes."

USER QUESTION: ${question}

Return ONLY the plain text answer, no JSON, no markdown, no formatting.`;

    const result = await model.generateContent(prompt);
    const answer = result.response.text().trim();

    return NextResponse.json({ answer }, { status: 200 });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('[ask-prescription] error:', errorMessage);
    return NextResponse.json(
      { error: 'ask_failed', message: errorMessage },
      { status: 500 }
    );
  }
}
