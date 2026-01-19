"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Socket } from "socket.io-client";
import { createSocket, getSocket, disconnectSocket } from "../libs/socket";
import type { PublicGameState } from "../types/game";

interface GameContextType {
  socket: Socket | null;
  gameState: PublicGameState | null;
  playerId: string | null;
  roomId: string | null;
  playerRole: "citizen" | "infiltrator" | "agent" | "spy" | null;
  playerWord: string | null;
  error: string | null;
  setError: (error: string | null) => void;
  connectSocket: (playerId: string) => void;
  disconnect: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameState, setGameState] = useState<PublicGameState | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [playerRole, setPlayerRole] = useState<"citizen" | "infiltrator" | "agent" | "spy" | null>(null);
  const [playerWord, setPlayerWord] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectSocket = (id: string) => {
    // Avoid creating multiple connections or re-attaching listeners
    if (socket && playerId === id) {
      return;
    }
    const sock = createSocket(id);
    setPlayerId(id);
    setSocket(sock);

    // Set up event listeners
    sock.on("connect", () => {
      console.log("Socket connected");
      setError(null);
    });

    sock.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    sock.on("error", (payload: { message: string }) => {
      console.error("Socket error:", payload.message);
      setError(payload.message);
    });

    sock.on("room:joined", (payload: { roomId: string }) => {
      setRoomId(payload.roomId);
    });

    sock.on("room:state", (state: PublicGameState) => {
      setGameState(state);
    });

    sock.on("game:started", (state: PublicGameState) => {
      setGameState(state);
    });

    sock.on("role:assigned", (payload: { role: "citizen" | "infiltrator" | "agent" | "spy"; word: string | null }) => {
      setPlayerRole(payload.role);
      setPlayerWord(payload.word);
    });
  };

  const disconnect = () => {
    disconnectSocket();
    setSocket(null);
    setGameState(null);
    setPlayerId(null);
    setRoomId(null);
    setPlayerRole(null);
    setPlayerWord(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return (
    <GameContext.Provider
      value={{
        socket,
        gameState,
        playerId,
        roomId,
        playerRole,
        playerWord,
        error,
        setError,
        connectSocket,
        disconnect,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
