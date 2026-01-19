import type { GameState } from "./game.state.js";
import type { message, phase } from "../../types/game.js";
import { v4 as uuidV4 } from "uuid";

/**
 * Add a system message to the game state
 */
export function addSystemMessage(
  state: GameState,
  content: string
): void {
  const message: message = {
    id: uuidV4(),
    type: "system",
    from: "system",
    content,
    timestamp: new Date().getTime(),
  };
  
  state.messages.push(message);
  state.lastUpdatedAt = new Date().getTime();
  state.version += 1;
}

/**
 * Transition game phase
 */
export function transitionPhase(
  state: GameState,
  newPhase: phase,
  message?: string
): void {
  state.phase = newPhase;
  state.lastUpdatedAt = new Date().getTime();
  state.version += 1;

  if (message) {
    addSystemMessage(state, message);
  }
}

/**
 * Increment round
 */
export function incrementRound(state: GameState): void {
  state.round += 1;
  state.lastUpdatedAt = new Date().getTime();
  state.version += 1;
}
