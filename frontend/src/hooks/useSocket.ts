"use client";

import { useEffect } from "react";
import { useGame } from "../contexts/GameContext";
import type { Socket } from "socket.io-client";

export function useSocket() {
  const { socket, connectSocket, disconnect } = useGame();

  useEffect(() => {
    // Socket connection is managed by GameContext
    return () => {
      // Cleanup handled by GameContext
    };
  }, []);

  return {
    socket,
    connectSocket,
    disconnect,
  };
}

export function useSocketEvent<T>(
  event: string,
  handler: (data: T) => void,
  deps: any[] = []
) {
  const { socket } = useGame();

  useEffect(() => {
    if (!socket) return;

    socket.on(event, handler);

    return () => {
      socket.off(event, handler);
    };
  }, [socket, event, ...deps]);
}
