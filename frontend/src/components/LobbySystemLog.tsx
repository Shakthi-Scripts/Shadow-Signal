"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useGame } from "@/contexts/GameContext";

export default function LobbyLog() {
  const { gameState } = useGame();
  const [viewMode, setViewMode] = useState<"system" | "broadcast">("broadcast");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getPlayerName = (playerId: string) => {
    if (gameState?.players[playerId]) {
      return gameState.players[playerId].name;
    }
    return playerId.substring(0, 12);
  };

  const systemMessages = useMemo(
    () => gameState?.messages.filter((m) => m.type === "system") ?? [],
    [gameState?.messages],
  );
  const broadcastMessages = useMemo(
    () =>
      gameState?.messages.filter(
        (m) => m.type === "chat" && m.from !== "system",
      ) ?? [],
    [gameState?.messages],
  );

  const displayedMessages =
    viewMode === "system" ? systemMessages : broadcastMessages;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [displayedMessages, viewMode]);

  if (!gameState) {
    return (
      <aside className="mt-6 w-full min-w-0 border border-white/10 bg-black/20 p-4 lg:w-[22%] lg:min-w-60">
        <header className="mb-4">
          <h2 className="text-sm font-semibold text-white">SYSTEM LOG</h2>
        </header>
        <div className="text-xs text-white/70">Loading...</div>
      </aside>
    );
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <aside className="mt-6 w-full min-w-0 border border-white/10 bg-black/20 p-4 lg:w-[22%] lg:min-w-60">
      <header className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">
            {viewMode === "system" ? "SYSTEM LOG" : "BROADCAST"}
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("broadcast")}
            className={`rounded-md px-3 py-1 text-xs transition ${
              viewMode === "broadcast"
                ? "border border-emerald-500/40 bg-emerald-500/20 text-emerald-400"
                : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            BROADCAST
          </button>
          <button
            onClick={() => setViewMode("system")}
            className={`rounded-md px-3 py-1 text-xs transition ${
              viewMode === "system"
                ? "border border-emerald-500/40 bg-emerald-500/20 text-emerald-400"
                : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            SYSTEM
          </button>
        </div>
      </header>

      <div
        ref={scrollContainerRef}
        className="max-h-96 space-y-2 overflow-y-auto text-xs"
      >
        {displayedMessages.length === 0 ? (
          <div className="text-white/70">
            {viewMode === "system"
              ? "No system messages yet."
              : "No broadcast messages yet."}
          </div>
        ) : (
          displayedMessages.map((msg) => {
            if (viewMode === "system") {
              return (
                <div key={msg.id} className="flex gap-2 text-white/70">
                  <span className="whitespace-nowrap text-emerald-400">
                    [{formatTime(msg.timestamp)}]
                  </span>
                  <span className="wrap-break-word">{msg.content}</span>
                </div>
              );
            } else {
              return (
                <div key={msg.id} className="rounded-md bg-white/5 px-3 py-2">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs text-white/40">
                      [{formatTime(msg.timestamp)}]
                    </span>
                    <span className="text-xs tracking-widest text-white/60">
                      {getPlayerName(msg.from)}
                    </span>
                  </div>
                  <p className="text-white/90">{msg.content}</p>
                </div>
              );
            }
          })
        )}
      </div>
    </aside>
  );
}
