import type { mode, phase, turn, message, PlayerId, eliminatedPlayer } from "../../types/game.js";
import type { PlayerMap } from "./player.state.js";

type byPlayerVote = {
  targetId: string;
  timestamp: number;
};

type byPlayerMap = Map<string, byPlayerVote>;

type VoteState = {
  round: 1;
  byPlayer: byPlayerMap | undefined;
  tally: Map<string, number> | undefined; // playerID : votes
  revealed: boolean;
  endsAt: number;
};

export type GameState = {
  id: string;
  inviteCode: string;
  mode: mode;
  phase: phase;
  round: number;
  maxRounds: number;
  players: PlayerMap;
  turn: turn | null;
  voteType: "secret" | "public";
  votes: VoteState | null;
  eliminatedPlayers: Record<PlayerId, eliminatedPlayer> | null;
  messages: [message];
  version: number; // optimistic concurrency
  lastUpdatedAt: number;
};
