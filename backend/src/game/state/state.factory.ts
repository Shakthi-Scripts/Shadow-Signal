import type { GameState } from "./game.state.js";
import { v4 as uuidV4 } from "uuid";

export function createInitialState(roomId: string, hostId: string, alias: string, inviteCode: string): GameState {
  const currentTimestamp = new Date().getTime();
  return {
    id: roomId,
    inviteCode: inviteCode,
    phase: "lobby",
    mode: "infiltrator",
    maxRounds: 6,
    round: -1,
    players: new Map([
      [
        hostId,
        {
          id: hostId,
          name: alias,
          alive: true,
          connected: true,
          secretWord: null,
        },
      ],
    ]),
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
  };
}
