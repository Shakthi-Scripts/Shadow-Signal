import type { GameState } from "../state/game.state.js";
import {
  transitionPhase,
  incrementRound,
  addSystemMessage,
} from "../state/state.transitions.js";
import { assignRoles, applyRolesToState } from "./role.assignment.js";
import {
  selectWordForInfiltratorMode,
  selectWordsForSpyMode,
} from "../words/word.service.js";

export interface GameStartConfig {
  mode: "infiltrator" | "spy";
  difficulty: "easy" | "hard";
  roundTimerSeconds: number;
  voteTimerSeconds: number;
  maxRounds: number;
}

/**
 * Start the game - assign roles, words, and initialize typing phase
 */
export async function startGame(
  state: GameState,
  config: GameStartConfig,
): Promise<void> {
  // Validate minimum players
  const alivePlayers = Array.from(state.players.values()).filter(
    (p) => p.alive && p.connected,
  );

  if (alivePlayers.length < 3) {
    throw new Error("Need at least 3 players to start the game");
  }

  // Validate game is in lobby
  if (state.phase !== "lobby") {
    throw new Error("Game can only be started from lobby phase");
  }

  // Update game configuration
  state.mode = config.mode;
  state.roundTimerSeconds = config.roundTimerSeconds;
  state.voteTimerSeconds = config.voteTimerSeconds;
  state.difficulty = config.difficulty;
  state.maxRounds = config.maxRounds;

  // Select words based on mode
  let words: { citizenWord: string; spyWord?: string };

  if (config.mode === "infiltrator") {
    // Infiltrator mode: everyone except the infiltrator gets the same word
    const citizenWord = selectWordForInfiltratorMode();
    words = { citizenWord };
  } else {
    // Spy mode: agents share a base word, spy gets a similar-but-different word
    const wordPair = await selectWordsForSpyMode();
    words = {
      citizenWord: wordPair.agentWord,
      spyWord: wordPair.spyWord,
    };
  }

  // Assign roles
  const roles = assignRoles(state, words);
  applyRolesToState(state, roles);

  // Create randomized speaking order (only alive players)
  const alivePlayerIds = alivePlayers.map((p) => p.id);
  state.speakingOrder = shuffleArray([...alivePlayerIds]);
  state.currentTurnIndex = 0;

  // Start first round
  incrementRound(state);
  transitionPhase(
    state,
    "playing",
    `Game started! Round ${state.round} begins.`,
  );

  // Add role assignment messages (without revealing roles)
  addSystemMessage(
    state,
    `Roles have been assigned. ${alivePlayers.length} players are ready.`,
  );
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp;
  }
  return shuffled;
}
