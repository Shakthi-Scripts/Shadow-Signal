"use client";

import { useEffect } from "react";
import { useGame } from "../contexts/GameContext";

export function useSocketEvent<T>(
  event: string,
  handler: (data: T) => void,
  deps: any[] = [],
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
