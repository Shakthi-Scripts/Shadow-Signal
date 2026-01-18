import { v4 as uuidV4 } from "uuid";
import type { GameRoom } from "./room.types.js";
import { createInitialState } from "../state/state.factory.js";

const rooms = new Map<string, GameRoom>();
const inviteCodes = new Map<string, string>();

export function createRoom(playerId: string, alias: string): GameRoom {
  const roomId = uuidV4();
  const inviteCode = generateInviteCode();
  inviteCodes.set(inviteCode, roomId);
  const room: GameRoom = {
    id: roomId,
    state: createInitialState(roomId, playerId, alias, inviteCode),
  };
  rooms.set(roomId, room);
  return room;
}

export function getRoom(roomId: string) {
  return rooms.get(roomId);
}

export function getRoomByInviteCode(inviteCode: string) {
  const roomId = inviteCodes.get(inviteCode);
  return roomId ? rooms.get(roomId) : undefined;
}

function generateInviteCode(): string {
  const inviteCode = (uuidV4().slice(0, 3) + Date.now().toString(36))
    .replace(/[^A-Z]/gi, "")
    .toUpperCase()
    .slice(0, 5);

  return inviteCodes.has(inviteCode) ? generateInviteCode() : inviteCode;
}
