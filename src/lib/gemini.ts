import { GoogleGenerativeAI } from '@google/generative-ai';

export async function extractPrescriptionData(
  imageBase64: string,
  mimeType: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

  const prompt = `You are a medical prescription reader. Analyze this prescription image and extract all medicine information. Return ONLY valid JSON with no markdown, no backticks, no code fences, no explanation.

Return exactly this JSON structure:
{
  "medicines": [
    {
      "name": "medicine name",
      "dosage": "dosage or strength",
      "frequency_code": "BD or OD or TDS etc",
      "frequency_plain": "plain English frequency",
      "duration": "e.g. 7 days",
      "instructions": "e.g. after meals or empty string",
      "confidence": "high"
    }
  ],
  "doctor_notes": "general notes or empty string",
  "overall_confidence": "high",
  "unreadable_fields": []
}

If not a prescription return: {"error":"not_a_prescription"}
If unreadable return: {"error":"unreadable"}`;

  try {
    const result = await model.generateContent([
      { inlineData: { mimeType, data: imageBase64 } },
      { text: prompt },
    ]);

    const text = result.response.text();
    return text;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[Gemini Error]:', errorMessage);

    if (errorMessage.includes('404') || errorMessage.includes('not found')) {
      console.error('[Diagnostic] Attempting to list available models...');
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json() as { models?: Array<{ name: string }> };
        console.error('[Diagnostic] Available models:', JSON.stringify(data.models?.map(m => m.name)));
      } catch (listError) {
        console.error('[Diagnostic] Failed to list models:', listError);
      }
    }
    throw error;
  }
}
