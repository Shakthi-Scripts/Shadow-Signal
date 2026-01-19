import { Socket } from "socket.io";
import type { ClientToServerEvents, ServerToClientEvents } from "../socket.types.js";
import { v4 as uuidV4 } from "uuid";
import { getRoom } from "../../game/rooms/room.manager.js";
import { startGame } from "../../game/flow/game.start.js";
import { getPlayerSecretWord, serializeGameState } from "../../game/state/state.serializer.js";
import { io } from "../../server.js";
import { endTurnEarly, startTurn } from "../../game/flow/turn.manager.js";

type SocketType = Socket<ClientToServerEvents, ServerToClientEvents>;

export function registerActionEvents(socket: SocketType) {
  socket.on("game:start", async (payload) => {
    try {
      const roomId = socket.data.roomId;
      if (!roomId) {
        socket.emit("error", { message: "Not in a room" });
        return;
      }

      const room = getRoom(roomId);
      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      // Check if player is host
      if (room.state.hostPlayerId !== socket.data.playerId) {
        socket.emit("error", { message: "Only the host can start the game" });
        return;
      }

      // Check if game is in lobby
      if (room.state.phase !== "lobby") {
        socket.emit("error", { message: "Game has already started" });
        return;
      }

      // Get game config from payload or use defaults
      const config = {
        mode: payload?.mode || room.state.mode,
        difficulty: payload?.difficulty || "easy",
        roundTimerSeconds: payload?.roundTimerSeconds || room.state.roundTimerSeconds,
        voteTimerSeconds: payload?.voteTimerSeconds || room.state.voteTimerSeconds,
      };

      await startGame(room.state, config);

      // Broadcast game started
      const publicState = serializeGameState(room.state, socket.data.playerId);
      io.to(roomId).emit("game:started", publicState);

      // Send secret words to each player
      room.state.players.forEach((player, playerId) => {
        const secretWord = getPlayerSecretWord(room.state, playerId);
        io.to(playerId).emit("role:assigned", {
          role: player.secretWord === null ? (room.state.mode === "infiltrator" ? "infiltrator" : "spy") : (room.state.mode === "infiltrator" ? "citizen" : "agent"),
          word: secretWord,
        });
      });

      // Start first turn
      startTurn(room.state);
      
      const updatedState = serializeGameState(room.state, socket.data.playerId);
      io.to(roomId).emit("room:state", updatedState);
    } catch (error: any) {
      console.error("Error starting game:", error);
      socket.emit("error", { message: error.message || "Failed to start game" });
    }
  });

  socket.on("turn:end", () => {
    try {
      const roomId = socket.data.roomId;
      if (!roomId) {
        socket.emit("error", { message: "Not in a room" });
        return;
      }

      const room = getRoom(roomId);
      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      endTurnEarly(room.state, socket.data.playerId);

      const publicState = serializeGameState(room.state, socket.data.playerId);
      io.to(roomId).emit("room:state", publicState);
    } catch (error: any) {
      console.error("Error ending turn:", error);
      socket.emit("error", { message: error.message || "Failed to end turn" });
    }
  });

  socket.on("chat:send", ({ content }) => {
    try {
      const roomId = socket.data.roomId;
      if (!roomId) {
        socket.emit("error", { message: "Not in a room" });
        return;
      }

      const room = getRoom(roomId);
      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      // Validate message
      if (!content || content.trim().length === 0) {
        return;
      }

      if (content.length > 500) {
        socket.emit("error", { message: "Message too long (max 500 characters)" });
        return;
      }

      const player = room.state.players.get(socket.data.playerId);
      if (!player) {
        return;
      }

      // Add message
      const message = {
        id: uuidV4(),
        type: "chat" as const,
        from: socket.data.playerId,
        content: content.trim(),
        timestamp: new Date().getTime(),
      };

      room.state.messages.push(message);
      room.state.lastUpdatedAt = new Date().getTime();
      room.state.version += 1;

      const publicState = serializeGameState(room.state, socket.data.playerId);
      io.to(roomId).emit("room:state", publicState);
    } catch (error: any) {
      console.error("Error sending chat:", error);
      socket.emit("error", { message: error.message || "Failed to send message" });
    }
  });

  // socket.on("vote:cast", ({ targetId }, ack) => {
  //   try {
  //     const roomId = socket.data.roomId;
  //     if (!roomId) {
  //       ack?.({ success: false, reason: "Not in a room" });
  //       socket.emit("error", { message: "Not in a room" });
  //       return;
  //     }

  //     const room = getRoom(roomId);
  //     if (!room) {
  //       ack?.({ success: false, reason: "Room not found" });
  //       socket.emit("error", { message: "Room not found" });
  //       return;
  //     }

  //     const success = castVote(room.state, socket.data.playerId, targetId);
      
  //     if (!success) {
  //       ack?.({ success: false, reason: "Invalid vote" });
  //       return;
  //     }

  //     ack?.({ success: true });

  //     // Broadcast vote progress
  //     const votesCast = room.state.votes?.byPlayer?.size || 0;
  //     const totalPlayers = Array.from(room.state.players.values()).filter(
  //       (p) => p.alive && p.connected
  //     ).length;

  //     if (room.state.voteType === "public") {
  //       const tally: Record<string, number> = {};
  //       room.state.votes?.tally?.forEach((votes, playerId) => {
  //         tally[playerId] = votes;
  //       });
  //       io.to(roomId).emit("vote:update", {
  //         tally,
  //         lastVote: { voterId: socket.data.playerId, targetId },
  //       });
  //     } else {
  //       io.to(roomId).emit("vote:progress", {
  //         votesCast,
  //         totalPlayers,
  //       });
  //     }

  //     // Check if all players voted
  //     if (allPlayersVoted(room.state)) {
  //       completeVoting(room.state);
  //       const publicState = serializeGameState(room.state, socket.data.playerId);
  //       io.to(roomId).emit("room:state", publicState);
  //     }
  //   } catch (error: any) {
  //     console.error("Error casting vote:", error);
  //     ack?.({ success: false, reason: error.message || "Failed to cast vote" });
  //     socket.emit("error", { message: error.message || "Failed to cast vote" });
  //   }
  // });

  // socket.on("vote:reveal", () => {
  //   try {
  //     const roomId = socket.data.roomId;
  //     if (!roomId) {
  //       socket.emit("error", { message: "Not in a room" });
  //       return;
  //     }

  //     const room = getRoom(roomId);
  //     if (!room) {
  //       socket.emit("error", { message: "Room not found" });
  //       return;
  //     }

  //     // Only host can reveal votes early
  //     if (room.state.hostId !== socket.data.playerId) {
  //       socket.emit("error", { message: "Only the host can reveal votes" });
  //       return;
  //     }

  //     if (room.state.phase !== "voting" || !room.state.votes) {
  //       socket.emit("error", { message: "Not in voting phase" });
  //       return;
  //     }

  //     completeVoting(room.state);
      
  //     const tally: Record<string, number> = {};
  //     room.state.votes?.tally?.forEach((votes, playerId) => {
  //       tally[playerId] = votes;
  //     });

  //     io.to(roomId).emit("vote:reveal", { tally });

  //     const publicState = serializeGameState(room.state, socket.data.playerId);
  //     io.to(roomId).emit("room:state", publicState);
  //   } catch (error: any) {
  //     console.error("Error revealing votes:", error);
  //     socket.emit("error", { message: error.message || "Failed to reveal votes" });
  //   }
  // });
}
