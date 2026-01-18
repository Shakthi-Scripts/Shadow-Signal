import { Socket } from "socket.io";
import { io } from "../../server.js";
import { createRoom, getRoom } from "../../game/rooms/room.manager.js";

export function registerRoomEvents(socket: Socket) {
  socket.on("room:create", () => {
    const room = createRoom(socket.data.playerId);

    socket.join(room.id);
    socket.data.roomId = room.id;

    socket.emit("room:created", { roomId: room.id });
  });

  socket.on("room:join", ({ roomId }) => {
    const room = getRoom(roomId);
    if (!room) return;

    room.state.players[socket.data.playerId] = {
      id: socket.data.playerId,
      alive: true,
    };

    socket.join(roomId);
    socket.data.roomId = roomId;

    io.to(roomId).emit("room:state", room.state);
  });
}
