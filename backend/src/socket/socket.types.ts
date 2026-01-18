import type { PublicGameState } from "../types/game.js";

export interface ClientToServerEvents {
  hello: (ack: (playerId: string) => void) => void;

  "room:create": (
    ack: (response: { roomId: string }) => void
  ) => void;
  "room:join": (
    payload: { roomId: string },
    ack: (response: { success: boolean; reason?: string }) => void
  ) => void;
  "room:leave": () => void;

  "game:start": () => void;

  "vote:cast": (
    payload: { targetId: string },
    ack?: (response: { success: boolean; reason?: string }) => void
  ) => void;
  "vote:reveal": () => void;
}

export interface ServerToClientEvents {
  "error": (payload: { message: string }) => void;

  "room:created": (payload: { roomId: string }) => void;
  "room:joined": (payload: { roomId: string }) => void;
  "room:state": (state: PublicGameState) => void;
  "room:playerJoined": (payload: { playerId: string }) => void;
  "room:playerLeft": (payload: { playerId: string }) => void;

  "game:started": (state: PublicGameState) => void;

  "vote:update": (payload: {
    tally: Record<string, number>;
    lastVote?: { voterId: string; targetId: string };
  }) => void;
  "vote:progress": (payload: {
    votesCast: number;
    totalPlayers: number;
  }) => void;
  "vote:reveal": (payload: {
    tally: Record<string, number>;
  }) => void;
}


export interface InterServerEvents {
  "room:sync": (roomId: string) => void;
  "room:destroy": (roomId: string) => void;
}


export interface SocketData {
  playerId: string;
  roomId?: string;
  connectedAt: number;
  isHost: boolean;
}
