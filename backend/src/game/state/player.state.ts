import type { PublicPlayer } from "../../types/game.js";

export interface PlayerData extends PublicPlayer {
  secretWord: string | null;
};

export type PlayerMap = Map<string, PlayerData>;
