import { Socket } from "socket.io";
import { getRoom, deleteRoom, getAllRooms } from "../game/rooms/room.manager.js";
import { checkTurnTimer } from "../game/flow/turn.manager.js";
import { checkVotingTimer } from "../game/flow/voting.manager.js";
import { processElimination } from "../game/flow/elimination.logic.js";
import { serializeGameState } from "../game/state/state.serializer.js";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./socket.types.js";
import { registerRoomEvents } from "./events/room.js";
import { registerActionEvents } from "./events/action.js";
import { io } from "../server.js";
import { addSystemMessage } from "../game/state/state.transitions.js";

type SocketType = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export function onConnection(socket: SocketType) {
  console.log("Connected:", socket.id);

  registerRoomEvents(socket);
  registerActionEvents(socket);

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);

    const roomId = socket.data.roomId;
    if (roomId && socket.data.playerId) {
      const room = getRoom(roomId);
      if (room) {
        const player = room.state.players.get(socket.data.playerId);
        if (player) {
          player.connected = false;

          // If in lobby, remove player
          if (room.state.phase === "lobby") {
            addSystemMessage(room.state, `${player.name.trim()} left the room.`);
            room.state.players.delete(socket.data.playerId);
            // If this was the only player in the room, schedule room deletion after 1 minute
            if (room.state.players.size === 0) {
              setTimeout(() => {
                // Re-check the room to see if there are any active players
                const currentRoom = getRoom(roomId);
                if (currentRoom) {
                  const hasActivePlayers = Array.from(
                    currentRoom.state.players.values(),
                  ).some((p) => p.connected);
                  if (!hasActivePlayers) {
                    console.log(`Deleting empty room: ${roomId}`);
                    deleteRoom(roomId);
                  }
                }
              }, 60000); // 1 minute = 60000ms
            }
          } else if (
            (room.state.phase === "playing" || room.state.phase === "voting") &&
            player.alive
          ) {
            // During game, mark as eliminated if still alive
            player.alive = false;

            // Record elimination
            if (!room.state.eliminatedPlayers) {
              room.state.eliminatedPlayers = {};
            }
            room.state.eliminatedPlayers[socket.data.playerId] = {
              playerId: socket.data.playerId,
              round: room.state.round,
              reason: "disconnection",
            };

            addSystemMessage(
              room.state,
              `${player.name.trim()} disconnected and has been eliminated.`,
            );
          } else {
            addSystemMessage(room.state, `${player.name.trim()} disconnected.`);
          }

          // If the player is the host, find a new host
          if (room.state.hostPlayerId === player.id) {
            //find a new host
            const newHost = Array.from(room.state.players.values()).find(
              (p) => p.id !== player.id && p.alive && p.connected,
            );
            if (newHost) {
              room.state.hostPlayerId = newHost.id;
              addSystemMessage(
                room.state,
                `${player.name.trim()} is no longer the host. ${newHost.name.trim()} is now the host.`,
              );
            }
          }

          io.to(roomId).emit(
            "room:state",
            serializeGameState(room.state, player.id),
          );
        }
      }
    }
  });
}

// Game loop to check timers every second
export function startGameLoop() {
  setInterval(() => {
    const rooms = getAllRooms();

    rooms.forEach((room: any) => {
      if (room.state.phase === "playing") {
        checkTurnTimer(room.state);
        const publicState = serializeGameState(room.state, "");
        io.to(room.id).emit("room:state", publicState);
      } else if (room.state.phase === "voting") {
        const stateUpdated = checkVotingTimer(room.state);
        if (stateUpdated) {
          // State was updated (votes revealed and elimination processed)
          const publicState = serializeGameState(room.state, "");
          io.to(room.id).emit("room:state", publicState);
        } else {
          // Just emit state update for timer sync
          const publicState = serializeGameState(room.state, "");
          io.to(room.id).emit("room:state", publicState);
        }
      }
    });
  }, 1000);
}
