import "dotenv/config";
import { GoogleGenAI } from "@google/genai";


export class AIService {
  private client: GoogleGenAI | null;
  private model: string;

  constructor() {
    /**
     * GoogleGenAI will read GEMINI_API_KEY from the environment by default.
     * We instantiate the client only if a key is present so that the rest of
     * the backend can run without Gemini configured (and fall back to dataset).
     */
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("apiKey", apiKey);
    this.client = apiKey ? new GoogleGenAI({ apiKey }) : null;
    this.model = process.env.GEMINI_MODEL || "gemini-3-flash-preview";
  }

  /**
   * Generate a similar but different word for Spy mode
   * Falls back to dataset similar words if AI is unavailable
   */
  async generateSpyWord(word: string, similarWords: string[]): Promise<string> {
    // If no client (no API key), use fallback
    if (!this.client) {
      return this.fallbackSpyWord(word, similarWords);
    }

    try {
      const response = await this.client.models.generateContent({
        model: this.model,
        contents:
          "You are a word association assistant for a social deduction word game.\n" +
          `Base word: "${word}". Example mappings: Beach -> Island, Dog -> Wolf, Pizza -> Pasta.\n` +
          (similarWords.length
            ? `Optional similar words from a dataset you MAY choose from or be inspired by: ${similarWords.join(
                ", ",
              )}.\n`
            : "No additional similar words provided.\n") +
          "Respond with a JSON object containing a single property `spyWord` which is one similar but different word.",
        config: {
          // Ask the model to return strict JSON for easier parsing
          responseMimeType: "application/json",
          responseJsonSchema: {
            type: "object",
            properties: {
              spyWord: {
                type: "string",
                description:
                  "A single similar but different word related to the base word.",
              },
            },
            required: ["spyWord"],
            additionalProperties: false,
          },
          // Keep temperature moderate; we just need a nearby word, not heavy reasoning.
          temperature: 0.7,
        },
      });

      const rawText: string | undefined = response.text;

      if (!rawText) {
        return this.fallbackSpyWord(word, similarWords);
      }

      // Expect a JSON object like: { "spyWord": "Island" }
      let parsed: any;
      try {
        parsed = JSON.parse(rawText);
      } catch {
        return this.fallbackSpyWord(word, similarWords);
      }

      const candidate =
        parsed && typeof parsed.spyWord === "string"
          ? (parsed.spyWord as string).trim()
          : "";

      if (candidate.length > 0) {
        return candidate;
      }

      return this.fallbackSpyWord(word, similarWords);
    } catch (error) {
      console.warn("AI service failed, using fallback:", error);
      return this.fallbackSpyWord(word, similarWords);
    }
  }

  /**
   * Fallback: randomly select from similar words in dataset
   */
  private fallbackSpyWord(word: string, similarWords: string[]): string {
    if (similarWords.length === 0) {
      // If no similar words, return a generic variation
      return word + "s";
    }

    // Randomly pick one of the similar words
    const randomIndex = Math.floor(Math.random() * similarWords.length);
    return similarWords[randomIndex] as string;
  }
}

export const aiService = new AIService();
