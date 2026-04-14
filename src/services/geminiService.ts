import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askGemini(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert social media consultant and digital marketing specialist for Vena Media Service. Your goal is to provide helpful, professional, and actionable advice on social media optimization (Instagram, TikTok, YouTube, etc.) and recommend premium digital subscriptions (Netflix, Canva, YouTube Premium, etc.). Keep your responses concise, friendly, and aligned with Vena Media Service's offerings.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Maaf, saya sedang mengalami gangguan teknis. Silakan coba lagi nanti.";
  }
}
