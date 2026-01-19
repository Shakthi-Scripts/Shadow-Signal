import type { GameState } from "./game.state.js";
import { v4 as uuidV4 } from "uuid";

export function createInitialState(
  roomId: string,
  hostPlayerId: string,
  alias: string,
  inviteCode: string,
  maxPlayers: number = 12,
): GameState {
  const currentTimestamp = new Date().getTime();
  return {
    id: roomId,
    inviteCode: inviteCode,
    hostPlayerId: hostPlayerId,
    phase: "lobby",
    mode: "infiltrator",
    maxRounds: 6,
    maxPlayers: maxPlayers,
    round: -1,
    players: new Map([
      [
        hostPlayerId,
        {
          id: hostPlayerId,
          name: alias,
          alive: true,
          connected: true,
          secretWord: null,
        },
      ],
    ]),
    speakingOrder: [],
    currentTurnIndex: -1,
    eliminatedPlayers: null,
    turn: null,
    votes: null,
    voteType: "secret",
    messages: [
      {
        id: uuidV4(),
        type: "system",
        from: "system",
        content: `${alias} created a new Room.`,
        timestamp: currentTimestamp,
      },
    ],
    version: 0,
    lastUpdatedAt: currentTimestamp,
    hostId: hostPlayerId,
    roundTimerSeconds: 60,
    voteTimerSeconds: 30,
    difficulty: "easy",
  };
}
