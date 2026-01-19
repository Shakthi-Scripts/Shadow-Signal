import type { GameState } from "./game.state.js";
import type { PublicGameState, PublicPlayer } from "../../types/game.js";

export function serializeGameState(
  state: GameState,
  requestingPlayerId: string,
): PublicGameState {
  // Convert PlayerMap to Record, hiding secret words from other players
  const publicPlayers: Record<string, PublicPlayer> = {};

  state.players.forEach((player, playerId) => {
    // Only show secret word to the player themselves
    publicPlayers[playerId] = {
      id: player.id,
      name: player.name,
      alive: player.alive,
      connected: player.connected,
    };
  });

  // Convert Maps to Records for JSON serialization
  const voteTally: Record<string, number> = {};
  if (state.votes?.tally) {
    state.votes.tally.forEach((votes, playerId) => {
      voteTally[playerId] = votes;
    });
  }

  return {
    roomId: state.id,
    mode: state.mode,
    hostPlayerId: state.hostPlayerId,
    phase: state.phase,
    round: state.round,
    maxRounds: state.maxRounds,
    turn: state.turn || null,
    players: publicPlayers,
    eliminatedPlayers: state.eliminatedPlayers || {},
    messages: state.messages as [(typeof state.messages)[0]],
    difficulty: state.difficulty,
    roundTimerSeconds: state.roundTimerSeconds,
    voteTimerSeconds: state.voteTimerSeconds,
  };
}

/**
 * Get player's secret word (only for the requesting player)
 */
export function getPlayerSecretWord(
  state: GameState,
  playerId: string,
): string | null {
  const player = state.players.get(playerId);
  return player?.secretWord || null;
}
