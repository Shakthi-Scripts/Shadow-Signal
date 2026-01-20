import type { GameState } from "../state/game.state.js";

export type GameRoom = {
  id: string;
  state: GameState;
};
