export type mode = "infiltrator" | "spy";
export type phase = "lobby" | "playing" | "voting" | "ended";

export type chatType = "chat" | "system" | "action";

export type message = {
  id: string;
  from: "system" | "playerId";
  type: chatType;
  content: string;
  timestamp: number;
};

export type turn = {
  currentPlayerId: string;
  endsAt: number;
  durationMs: number;
};

export type eliminatedPlayer = {
  playerId: string;
  round: number;
  reason: "vote" | "disconnection";
};

export type PlayerId = string;
export type RoomId = string;

export interface PublicPlayer {
  id: PlayerId;
  name: string;
  alive: boolean;
  connected: boolean;
}

export interface PublicGameState {
  roomId: RoomId;
  mode: mode;
  hostPlayerId: PlayerId;
  phase: phase;
  round: number;
  maxRounds: number;
  turn: turn | null;
  players: Record<PlayerId, PublicPlayer>;
  eliminatedPlayers : Record<PlayerId, eliminatedPlayer> | null;
  messages: [message];
  difficulty?: "easy" | "hard";
  roundTimerSeconds?: number;
  voteTimerSeconds?: number;
}
