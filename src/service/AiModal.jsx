import {GoogleGenAI} from '@google/genai';

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

const ai = new GoogleGenAI({apiKey: apiKey});

export async function generateTravelPlan(prompt) {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    let text = response?.text || "";

    // Remove ```json ... ``` if present
    text = text.replace(/^```json\s*/, "").replace(/```$/, "").trim();

    // Parse JSON safely
    const data = JSON.parse(text);
    console.log("AI Response:", data);
    return data;
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
}



