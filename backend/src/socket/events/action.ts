import { Socket } from "socket.io";
import { getRoom } from "../../game/rooms/room.manager.js";
import { castVote } from "../../game/voting/vote.logic.js";
import { io } from "../../server.js";

export function registerActionEvents(socket: Socket) {
  socket.on("vote:cast", ({ targetId }) => {
    const roomId = socket.data.roomId;
    if (!roomId) return;

    const room = getRoom(roomId);
    if (!room) return;

    castVote(room.state, socket.data.playerId, targetId);

    if (room.state.voteType === "public") {
      io.to(roomId).emit("vote:update", room.state.votes.tally);
    } else {
      io.to(roomId).emit("vote:progress", {
        votesCast: Object.keys(room.state.votes.byPlayer).length,
      });
    }
  });
}
