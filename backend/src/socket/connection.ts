import { Socket } from "socket.io";
import { registerRoomEvents } from "./events/room.js";
import { getRoom } from "../game/rooms/room.manager.js";
import { io } from "../server.js";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./socket.types.js";

type SocketType = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export function onConnection(socket: SocketType) {
  console.log("Connected:", socket.id);

  socket.data.playerId = socket.id;
  socket.data.roomId = null;

  registerRoomEvents(socket);

  socket.on("vote:reveal", () => {
    const room = getRoom(socket.data.roomId);
    if (!room) return;

    room.state.votes.revealed = true;

    io.to(room.id).emit("vote:reveal", {
      tally: room.state.votes.tally,
    });
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
}
