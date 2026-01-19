import type {
  mode,
  phase,
  turn,
  message,
  PlayerId,
  eliminatedPlayer,
} from "../../types/game.js";
import type { PlayerMap } from "./player.state.js";

type byPlayerVote = {
  targetId: string;
  timestamp: number;
};

type byPlayerMap = Map<string, byPlayerVote>;

type VoteState = {
  round: number;
  byPlayer: byPlayerMap | undefined;
  tally: Map<string, number> | undefined; // playerID : votes
  revealed: boolean;
  endsAt: number;
};

export type GameState = {
  id: string;
  inviteCode: string;
  hostPlayerId: string;
  mode: mode;
  phase: phase;
  round: number;
  maxRounds: number;
  players: PlayerMap;
  speakingOrder: PlayerId[]; // Order in which players will speak
  currentTurnIndex: number; // Index in speakingOrder for current speaker
  turn: turn | null;
  voteType: "secret" | "public";
  votes: VoteState | null;
  eliminatedPlayers: Record<PlayerId, eliminatedPlayer> | null;
  messages: message[];
  version: number; // optimistic concurrency
  lastUpdatedAt: number;
  hostId: PlayerId; // Host player ID
  roundTimerSeconds: number; // Duration of each speaking turn
  voteTimerSeconds: number; // Duration of voting phase
  difficulty: "easy" | "hard";
};
