import { Socket } from "socket.io";
import { getRoom, getRoomByInviteCode } from "../../game/rooms/room.manager.js";
import { serializeGameState } from "../../game/state/state.serializer.js";
import { addSystemMessage } from "../../game/state/state.transitions.js";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../socket.types.js";
import { io } from "../../server.js";

type SocketType = Socket<ClientToServerEvents, ServerToClientEvents>;

export function registerRoomEvents(socket: SocketType) {
  socket.on("room:join", ({ inviteCode, alias, playerId }, ack) => {
    try {
      if (!inviteCode || !playerId || !alias || alias.trim().length === 0) {
        ack?.({
          success: false,
          reason: "Invalid invite code or alias or playerId",
        });
        socket.emit("error", {
          message: "Invalid invite code or alias or playerId",
        });
        return;
      }

      if (alias.length > 20) {
        ack?.({
          success: false,
          reason: "Alias must be 20 characters or less",
        });
        socket.emit("error", {
          message: "Alias must be 20 characters or less",
        });
        return;
      }

      const room = getRoomByInviteCode(inviteCode.toUpperCase());
      if (!room) {
        ack?.({ success: false, reason: "Room not found" });
        socket.emit("error", { message: "Room not found" });
        return;
      }

      // Check if player already in room
      if (room.state.players.has(playerId)) {
        // Reconnection
        const player = room.state.players.get(playerId);
        if (player) {
          player.connected = true;
        }
      } else {
        // New player joining
        if (room.state.phase !== "lobby") {
          ack?.({ success: false, reason: "Game has already started" });
          socket.emit("error", { message: "Game has already started" });
          return;
        }

        // Check if alias already exists (case-insensitive)
        const trimmedAlias = alias.trim();
        const aliasExists = Array.from(room.state.players.values()).some(
          (p) => p.name.trim().toLowerCase() === trimmedAlias.toLowerCase(),
        );
        if (aliasExists) {
          ack?.({
            success: false,
            reason: "Alias already exists, join with another alias",
          });
          socket.emit("error", {
            message: "Alias already exists, join with another alias",
          });
          return;
        }

        // Check max players
        const alivePlayers = Array.from(room.state.players.values()).filter(
          (p) => p.alive && p.connected,
        );
        if (alivePlayers.length >= room.state.maxPlayers) {
          ack?.({ success: false, reason: "Room is full" });
          socket.emit("error", { message: "Room is full" });
          return;
        }

        room.state.players.set(playerId, {
          id: playerId,
          name: alias.trim(),
          alive: true,
          connected: true,
          secretWord: null,
        });

        addSystemMessage(room.state, `${alias.trim()} joined the room.`);
      }

      // If the new/reconnected player is the only player in the room, make them the host
      const connectedPlayers = Array.from(room.state.players.values()).filter(
        (p) => p.connected,
      );
      const firstConnectedPlayer = connectedPlayers[0];
      if (
        connectedPlayers.length === 1 &&
        firstConnectedPlayer?.id === playerId
      ) {
        room.state.hostPlayerId = playerId;
        addSystemMessage(room.state, `${alias.trim()} is now the host.`);
      }

      socket.join(room.id);

      socket.data.roomId = room.id;
      socket.data.playerId = playerId;

      const publicState = serializeGameState(room.state, socket.data.playerId);

      ack?.({ success: true });
      socket.emit("room:joined", { roomId: room.id });
      io.to(room.id).emit("room:state", publicState);
    } catch (error) {
      console.error("Error joining room:", error);
      ack?.({ success: false, reason: "Internal server error" });
      socket.emit("error", { message: "Failed to join room" });
    }
  });

  socket.on("room:leave", () => {
    const roomId = socket.data.roomId;
    if (!roomId) return;

    const room = getRoom(roomId);
    if (!room) return;

    const player = room.state.players.get(socket.data.playerId);
    if (player) {
      player.connected = false;

      if (room.state.phase === "lobby") {
        // Remove player from lobby
        room.state.players.delete(socket.data.playerId);
        addSystemMessage(room.state, `${player.name} left the room.`);
      } else {
        // Mark as disconnected during game
        addSystemMessage(room.state, `${player.name} disconnected.`);
      }
    }

    socket.leave(roomId);
    socket.data.roomId = null;

    const publicState = serializeGameState(room.state, socket.data.playerId);
    io.to(roomId).emit("room:state", publicState);
  });

  socket.on("room:transfer-host", ({ newHostId }, ack) => {
    try {
      const roomId = socket.data.roomId;
      if (!roomId) {
        ack?.({ success: false, reason: "Not in a room" });
        socket.emit("error", { message: "Not in a room" });
        return;
      }

      const room = getRoom(roomId);
      if (!room) {
        ack?.({ success: false, reason: "Room not found" });
        socket.emit("error", { message: "Room not found" });
        return;
      }

      // Check if player is current host
      if (room.state.hostPlayerId !== socket.data.playerId) {
        ack?.({
          success: false,
          reason: "Only the host can transfer host privileges",
        });
        socket.emit("error", {
          message: "Only the host can transfer host privileges",
        });
        return;
      }

      // Check if game is in lobby (only allow host transfer in lobby)
      if (room.state.phase !== "lobby") {
        ack?.({
          success: false,
          reason: "Host can only be transferred in lobby",
        });
        socket.emit("error", {
          message: "Host can only be transferred in lobby",
        });
        return;
      }

      // Check if new host exists and is connected
      const newHost = room.state.players.get(newHostId);
      if (!newHost) {
        ack?.({ success: false, reason: "Player not found" });
        socket.emit("error", { message: "Player not found" });
        return;
      }

      if (!newHost.connected) {
        ack?.({ success: false, reason: "Player is not connected" });
        socket.emit("error", { message: "Player is not connected" });
        return;
      }

      // Check if trying to transfer to self
      if (newHostId === socket.data.playerId) {
        ack?.({ success: false, reason: "Cannot transfer host to yourself" });
        socket.emit("error", { message: "Cannot transfer host to yourself" });
        return;
      }

      // Transfer host
      const oldHost = room.state.players.get(room.state.hostPlayerId);
      room.state.hostPlayerId = newHostId;
      room.state.hostId = newHostId; // Also update hostId field for consistency

      addSystemMessage(
        room.state,
        `${oldHost?.name || "Host"} transferred host privileges to ${newHost.name}.`,
      );

      // Broadcast updated state to all players
      const publicState = serializeGameState(room.state, socket.data.playerId);
      io.to(roomId).emit("room:state", publicState);

      ack?.({ success: true });
    } catch (error) {
      console.error("Error transferring host:", error);
      ack?.({ success: false, reason: "Internal server error" });
      socket.emit("error", { message: "Failed to transfer host" });
    }
  });
}
