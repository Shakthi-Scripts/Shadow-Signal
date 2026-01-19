import type { GameState } from "../state/game.state.js";
import {
  transitionPhase,
  addSystemMessage,
} from "../state/state.transitions.js";
import { initializeVoting } from "./voting.manager.js";

/**
 * Start the speaking turn for the current player
 */
export function startTurn(state: GameState): void {
  if (state.phase !== "playing") {
    return;
  }

  const alivePlayers = getAlivePlayers(state);
  if (alivePlayers.length === 0) {
    return;
  }

  // Filter speaking order to only alive players
  const aliveSpeakingOrder = state.speakingOrder.filter((playerId) => {
    const player = state.players.get(playerId);
    return player && player.alive && player.connected;
  });

  if (aliveSpeakingOrder.length === 0) {
    // All players have spoken, move to voting
    transitionToVoting(state);
    return;
  }

  // Get current speaker
  const currentPlayerId = aliveSpeakingOrder[state.currentTurnIndex];
  if (!currentPlayerId) {
    // All players have spoken, move to voting
    transitionToVoting(state);
    return;
  }

  const turnDurationMs = state.roundTimerSeconds * 1000;
  const endsAt = new Date().getTime() + turnDurationMs;

  state.turn = {
    currentPlayerId,
    endsAt,
    durationMs: turnDurationMs,
  };

  state.lastUpdatedAt = new Date().getTime();
  state.version += 1;

  const player = state.players.get(currentPlayerId);
  if (player) {
    addSystemMessage(state, `${player.name} is now speaking.`);
  }
}

/**
 * End the current turn early
 */
export function endTurnEarly(state: GameState, playerId: string): void {
  if (state.phase !== "playing") {
    return;
  }

  if (!state.turn || state.turn.currentPlayerId !== playerId) {
    return; // Not this player's turn
  }

  const player = state.players.get(playerId);
  if (player) {
    addSystemMessage(state, `${player.name} finished speaking.`);
  }

  // Move to next player
  advanceToNextTurn(state);
}

/**
 * Advance to the next turn
 */
export function advanceToNextTurn(state: GameState): void {
  const alivePlayers = getAlivePlayers(state);
  const aliveSpeakingOrder = state.speakingOrder.filter((playerId) => {
    const player = state.players.get(playerId);
    return player && player.alive && player.connected;
  });

  state.currentTurnIndex += 1;

  if (state.currentTurnIndex >= aliveSpeakingOrder.length) {
    // All players have spoken, move to voting
    transitionToVoting(state);
  } else {
    // Start next turn
    startTurn(state);
  }
}

/**
 * Check if turn timer has expired and advance if needed
 */
export function checkTurnTimer(state: GameState): void {
  if (state.phase !== "playing" || !state.turn) {
    return;
  }

  if (new Date().getTime() >= state.turn.endsAt) {
    const player = state.players.get(state.turn.currentPlayerId);
    if (player) {
      addSystemMessage(state, `${player.name}'s turn has ended.`);
    }
    advanceToNextTurn(state);
  }
}

/**
 * Transition from speaking phase to voting phase
 */
function transitionToVoting(state: GameState): void {
  state.turn = null;
  state.currentTurnIndex = -1;
  initializeVoting(state);
  transitionPhase(
    state,
    "voting",
    "Speaking phase complete. Voting begins now.",
  );
}

/**
 * Get all alive players
 */
function getAlivePlayers(state: GameState) {
  return Array.from(state.players.values()).filter(
    (p) => p.alive && p.connected,
  );
}
