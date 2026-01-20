
import { GoogleGenAI } from "@google/genai";
import { Transaction, UserProfile } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;
  // Use recommended gemini-3-flash-preview for text tasks
  private modelName = 'gemini-3-flash-preview';

  constructor() {
    // Always use named parameter for apiKey and directly access process.env.API_KEY
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getFinancialAdvice(profile: UserProfile, transactions: Transaction[], query: string): Promise<string> {
    const prompt = `
      You are a professional banking AI advisor named Nova. 
      The user's profile: ${JSON.stringify(profile)}
      Recent transactions: ${JSON.stringify(transactions.slice(0, 10))}
      
      User's Query: "${query}"
      
      Provide helpful, empathetic, and data-driven financial advice. 
      If they ask about spending habits, analyze the categories in their transactions.
      Always maintain a professional tone and emphasize security.
      Keep it concise and formatted in Markdown.
    `;

    try {
      // Correct usage: ai.models.generateContent with model and contents
      const response = await this.ai.models.generateContent({
        model: this.modelName,
        contents: prompt,
        config: {
          temperature: 0.7,
          topP: 0.9,
        }
      });

      // Directly access .text property
      return response.text || "I'm sorry, I couldn't process that financial inquiry right now.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Nova AI is currently offline for maintenance. Please try again later.";
    }
  }
}

export const geminiService = new GeminiService();
