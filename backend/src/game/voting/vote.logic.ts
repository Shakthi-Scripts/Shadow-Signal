import type { GameState } from "../state/game.state.js";

export function castVote(state: GameState, voterId: string, targetId: string) {
  if (state.phase !== "voting") return;
  if (state.votes?.byPlayer?.has(voterId)) return;
  if (!state.players.has(voterId)) return;

  state.votes?.byPlayer?.set(voterId, {
    targetId,
    timestamp: new Date().getTime(),
  });
  state.votes?.tally?.set(targetId, (state.votes.tally.get(targetId) || 0) + 1);
}
