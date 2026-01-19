import { io, Socket } from "socket.io-client";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

let socket: Socket | null = null;

export function getSocket(): Socket | null {
  return socket;
}

export function createSocket(playerId: string): Socket {
  if (socket?.connected) {
    return socket;
  }

  socket = io(backendURL, {
    transports: ["websocket"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
  });

  // Store playerId in socket auth
  socket.auth = { playerId };

  return socket;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
