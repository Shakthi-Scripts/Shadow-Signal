import type { GameState } from "../state/game.state.js";
import { transitionPhase, addSystemMessage } from "../state/state.transitions.js";
import { processElimination } from "./elimination.logic.js";

/**
 * Initialize voting phase
 */
export function initializeVoting(state: GameState): void {
  const alivePlayers = getAlivePlayers(state);
  
  if (alivePlayers.length < 2) {
    // Not enough players to vote
    return;
  }

  const voteDurationMs = state.voteTimerSeconds * 1000;
  const endsAt = new Date().getTime() + voteDurationMs;

  state.votes = {
    round: state.round,
    byPlayer: new Map(),
    tally: new Map(),
    revealed: false,
    endsAt,
  };

  // Initialize tally with 0 votes for all alive players
  alivePlayers.forEach((player) => {
    state.votes!.tally!.set(player.id, 0);
  });

  state.lastUpdatedAt = new Date().getTime();
  state.version += 1;
}

/**
 * Cast a vote
 */
export function castVote(
  state: GameState,
  voterId: string,
  targetId: string
): boolean {
  if (state.phase !== "voting" || !state.votes) {
    return false;
  }

  // Check if voter is alive
  const voter = state.players.get(voterId);
  if (!voter || !voter.alive || !voter.connected) {
    return false;
  }

  // Check if target is alive
  const target = state.players.get(targetId);
  if (!target || !target.alive || !target.connected) {
    return false;
  }

  // Check if already voted
  if (state.votes.byPlayer?.has(voterId)) {
    return false; // Already voted
  }

  // Record vote
  state.votes.byPlayer?.set(voterId, {
    targetId,
    timestamp: new Date().getTime(),
  });

  // Update tally
  const currentVotes = state.votes.tally?.get(targetId) || 0;
  state.votes.tally?.set(targetId, currentVotes + 1);

  state.lastUpdatedAt = new Date().getTime();
  state.version += 1;

  return true;
}

/**
 * Reveal votes (when all players have voted or timer expires)
 */
export function revealVotes(state: GameState): void {
  if (state.phase !== "voting" || !state.votes || state.votes.revealed) {
    return;
  }

  state.votes.revealed = true;
  state.lastUpdatedAt = new Date().getTime();
  state.version += 1;

  addSystemMessage(state, "Votes have been revealed.");
}

/**
 * Check if all players have voted
 */
export function allPlayersVoted(state: GameState): boolean {
  if (state.phase !== "voting" || !state.votes) {
    return false;
  }

  const alivePlayers = getAlivePlayers(state);
  const votesCast = state.votes.byPlayer?.size || 0;

  return votesCast >= alivePlayers.length;
}

/**
 * Check if voting timer has expired
 */
export function checkVotingTimer(state: GameState): boolean {
  if (state.phase !== "voting" || !state.votes) {
    return false;
  }

  if (new Date().getTime() >= state.votes.endsAt && !state.votes.revealed) {
    revealVotes(state);
    return true; // Indicates elimination should be processed
  }
  
  return false;
}

/**
 * Complete voting phase and process results
 */
export function completeVoting(state: GameState): void {
  if (state.phase !== "voting" || !state.votes) {
    return;
  }

  revealVotes(state);
  processElimination(state);
}

/**
 * Get all alive players
 */
function getAlivePlayers(state: GameState) {
  return Array.from(state.players.values()).filter(
    (p) => p.alive && p.connected
  );
}
