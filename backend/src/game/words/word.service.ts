import wordDataset from "./word.dataset.json" with { type: "json" };
// import { aiService } from "./ai.service.js";

type WordEntry = {
  word: string;
  similar: string[];
};

type Domain = {
  name: string;
  words: WordEntry[];
};

type WordDataset = {
  domains: Domain[];
};

const dataset = wordDataset as WordDataset;

/**
 * Select a random word from the dataset for Infiltrator mode
 * Returns the word that Citizens will receive
 */
export function selectWordForInfiltratorMode(): string {
  const allWords: WordEntry[] = [];
  dataset.domains.forEach((domain) => {
    domain.words.forEach((entry) => {
      allWords.push(entry);
    });
  });

  if (allWords.length === 0) {
    throw new Error("Word dataset is empty");
  }

  const randomIndex = Math.floor(Math.random() * allWords.length);
  return allWords[randomIndex]?.word ?? "test";
}

/**
 * Select a word and generate a spy word for Spy mode
 * Returns both the agent word and spy word
 */
export async function selectWordsForSpyMode(): Promise<{
  agentWord: string;
  spyWord: string;
}> {
  const allWords: WordEntry[] = [];
  dataset.domains.forEach((domain) => {
    domain.words.forEach((entry) => {
      allWords.push(entry);
    });
  });

  if (allWords.length === 0) {
    throw new Error("Word dataset is empty");
  }

  const randomIndex = Math.floor(Math.random() * allWords.length);
  const selectedEntry = allWords[randomIndex];

  // if(!selectedEntry) return {agentWord: "NONE", spyWord: "NUN"};

  // // Use AI to generate a similar but different word for the spy
  // const spyWord = await aiService.generateSpyWord(
  //   selectedEntry.word,
  //   selectedEntry.similar
  // );

  // return {
  //   agentWord: selectedEntry.word,
  //   spyWord: spyWord,
  // };
  return {agentWord: "NONE", spyWord: "NUN"};
}

/**
 * Get all available words (for testing/debugging)
 */
export function getAllWords(): WordEntry[] {
  const allWords: WordEntry[] = [];
  dataset.domains.forEach((domain) => {
    domain.words.forEach((entry) => {
      allWords.push(entry);
    });
  });
  return allWords;
}
