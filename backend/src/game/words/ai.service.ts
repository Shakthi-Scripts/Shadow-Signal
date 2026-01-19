/**
 * AI Service for generating similar but different words for Spy mode
 * Uses OpenAI API or fallback to dataset similar words
 */

type WordPair = {
  word: string;
  spyWord: string;
};

export class AIService {
  private apiKey: string | undefined;
  private baseURL: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.baseURL = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
  }

  /**
   * Generate a similar but different word for Spy mode
   * Falls back to dataset similar words if AI is unavailable
   */
  async generateSpyWord(
    word: string,
    similarWords: string[]
  ): Promise<string> {
    // If no API key, use fallback
    if (!this.apiKey) {
      return this.fallbackSpyWord(word, similarWords);
    }

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a word association assistant. Given a word, provide a single similar but different word that could be confused with it in a word-guessing game. Return only the word, nothing else.",
            },
            {
              role: "user",
              content: `Given the word "${word}", provide a similar but different word. It should be related but distinct enough that players could confuse them. Examples: "Beach" -> "Island", "Dog" -> "Wolf", "Pizza" -> "Pasta".`,
            },
          ],
          max_tokens: 10,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const spyWord = "test"; // TODO: remove this

      if (spyWord && spyWord.length > 0) {
        return spyWord;
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
