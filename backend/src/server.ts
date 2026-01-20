import app from "./app.js";
import http from "node:http";
import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./socket/socket.types.js";
import { onConnection } from "./socket/connection.js";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

export const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  onConnection(socket);
});

server.listen(PORT, () => {
  console.log("Server is listening on", PORT);
});
