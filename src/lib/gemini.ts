import { GoogleGenerativeAI } from '@google/generative-ai';

export async function extractPrescriptionData(
  imageBase64: string,
  mimeType: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

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

  const result = await model.generateContent([
    { inlineData: { mimeType, data: imageBase64 } },
    { text: prompt },
  ]);

  const text = result.response.text();
  console.log('[gemini] raw response:', text);
  return text;
}
