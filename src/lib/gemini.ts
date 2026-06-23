import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const PRESCRIPTION_PROMPT = `
You are a medical prescription reader assistant. Analyze this prescription image or document and extract the following information. Return ONLY a valid JSON object with no markdown, no explanation, no backticks.

Return this exact structure:
{
  "medicines": [
    {
      "name": "medicine name as written",
      "dosage": "dosage/strength as written",
      "frequency_code": "e.g. BD, OD, TDS",
      "frequency_plain": "plain English explanation of frequency",
      "duration": "e.g. 7 days, 1 month",
      "instructions": "any special instructions e.g. after meals",
      "confidence": "high | medium | low"
    }
  ],
  "doctor_notes": "any general notes or instructions not tied to a specific medicine",
  "overall_confidence": "high | medium | low",
  "unreadable_fields": ["list any fields that could not be read clearly"]
}

If this image is not a prescription or is completely unreadable, return:
{ "error": "not_a_prescription" } or { "error": "unreadable" }
`;

export async function extractPrescriptionData(imageBase64: string, mimeType: string): Promise<string> {
  try {
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: mimeType,
          data: imageBase64
        }
      },
      { text: PRESCRIPTION_PROMPT }
    ]);

    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
