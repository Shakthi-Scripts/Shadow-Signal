import { v4 as uuidV4 } from "uuid";
import type { GameRoom } from "./room.types.js";
import { createInitialState } from "../state/state.factory.js";

const rooms = new Map<string, GameRoom>();
const inviteCodes = new Map<string, string>();

export function createRoom(alias: string, maxPlayers: number = 12) {
  const roomId = uuidV4();
  const playerId = uuidV4();
  const inviteCode = generateInviteCode();
  inviteCodes.set(inviteCode, roomId);
  const room: GameRoom = {
    id: roomId,
    state: createInitialState(roomId, playerId, alias, inviteCode, maxPlayers),
  };
  rooms.set(roomId, room);
  return { inviteCode, playerId };
}

export function getRoom(roomId: string) {
  return rooms.get(roomId);
}

export function getRoomByInviteCode(inviteCode: string) {
  const roomId = inviteCodes.get(inviteCode);
  return roomId ? rooms.get(roomId) : undefined;
}

export function getAllRooms(): GameRoom[] {
  return Array.from(rooms.values());
}

export function deleteRoom(roomId: string) {
  const room = rooms.get(roomId);
  if (room) {
    inviteCodes.delete(room.state.inviteCode);
    rooms.delete(roomId);
  }
}

function generateInviteCode(length = 5): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  const inviteCode = Array.from(array, (x) => chars[x % 36]).join("");
  return inviteCodes.has(inviteCode) ? generateInviteCode() : inviteCode;
}
