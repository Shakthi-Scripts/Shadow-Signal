import type { PublicGameState } from "../types/game.js";

export interface ClientToServerEvents {
  "room:join": (
    payload: { inviteCode: string; alias: string; playerId: string },
    ack: (response: { success: boolean; reason?: string }) => void,
  ) => void;
  "room:leave": () => void;

  "game:start": (payload?: {
    mode?: "infiltrator" | "spy";
    difficulty?: "easy" | "hard";
    roundTimerSeconds?: number;
    voteTimerSeconds?: number;
    maxRounds?: number;
  }) => void;
  "game:config:update": (payload: {
    mode?: "infiltrator" | "spy";
    difficulty?: "easy" | "hard";
    roundTimerSeconds?: number;
    voteTimerSeconds?: number;
    maxRounds?: number;
  }) => void;
  "turn:end": () => void;
  "chat:send": (payload: { content: string }) => void;

  "vote:cast": (
    payload: { targetId: string },
    ack?: (response: { success: boolean; reason?: string }) => void,
  ) => void;
  "vote:reveal": () => void;
}

export interface ServerToClientEvents {
  error: (payload: { message: string }) => void;

  "room:joined": (payload: { roomId: string }) => void;
  "room:state": (state: PublicGameState) => void;

  "game:started": (state: PublicGameState) => void;
  "role:assigned": (payload: {
    role: "citizen" | "infiltrator" | "agent" | "spy";
    word: string | null;
  }) => void;

  "vote:update": (payload: {
    tally: Record<string, number>;
    lastVote?: { voterId: string; targetId: string };
  }) => void;
  "vote:progress": (payload: {
    votesCast: number;
    totalPlayers: number;
  }) => void;
  "vote:reveal": (payload: { tally: Record<string, number> }) => void;
}

export interface InterServerEvents {
  "room:sync": (roomId: string) => void;
  "room:destroy": (roomId: string) => void;
}

export interface SocketData {
  roomId?: string;
  playerId?: string;
  connectedAt: number;
}
