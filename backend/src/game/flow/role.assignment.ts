import type { GameState } from "../state/game.state.js";
import type { mode } from "../../types/game.js";

export type Role = "citizen" | "infiltrator" | "agent" | "spy";

export interface PlayerRole {
  playerId: string;
  role: Role;
  word: string | null;
}

/**
 * Assign roles to all players based on game mode
 */
export function assignRoles(
  state: GameState,
  words: { citizenWord: string; spyWord?: string },
): PlayerRole[] {
  const playerIds = Array.from(state.players.keys());
  const roles: PlayerRole[] = [];

  if (state.mode === "infiltrator") {
    // Infiltrator mode: 1 infiltrator, rest are citizens
    const infiltratorIndex = Math.floor(Math.random() * playerIds.length);

    playerIds.forEach((playerId, index) => {
      if (index === infiltratorIndex) {
        roles.push({
          playerId,
          role: "infiltrator",
          word: null, // Infiltrator gets no word
        });
      } else {
        roles.push({
          playerId,
          role: "citizen",
          word: words.citizenWord,
        });
      }
    });
  } else {
    // Spy mode: 1 spy, rest are agents
    const spyIndex = Math.floor(Math.random() * playerIds.length);

    playerIds.forEach((playerId, index) => {
      if (index === spyIndex) {
        roles.push({
          playerId,
          role: "spy",
          word: words.spyWord || null,
        });
      } else {
        roles.push({
          playerId,
          role: "agent",
          word: words.citizenWord,
        });
      }
    });
  }

  // Shuffle roles for randomness
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = roles[i]!;
    roles[i] = roles[j]!;
    roles[j] = temp;
  }

  return roles;
}

/**
 * Apply roles to game state
 */
export function applyRolesToState(state: GameState, roles: PlayerRole[]): void {
  roles.forEach(({ playerId, role, word }) => {
    const player = state.players.get(playerId);
    if (player) {
      player.secretWord = word;
    }
  });
}
