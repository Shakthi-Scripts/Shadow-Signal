"use client";

import React from "react";
import { useGame } from "@/contexts/GameContext";

export default function LobbySystemLog() {
  const { gameState } = useGame();

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

  const systemMessages = gameState.messages.filter((m) => m.type === "system");

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
        <h2 className="text-sm font-semibold text-white">SYSTEM LOG</h2>
      </header>

      <div className="space-y-2 text-xs max-h-96 overflow-y-auto">
        {systemMessages.length === 0 ? (
          <div className="text-white/70">No system messages yet.</div>
        ) : (
          systemMessages.map((log) => (
            <div key={log.id} className="flex gap-2 text-white/70">
              <span className="whitespace-nowrap text-emerald-400">
                [{formatTime(log.timestamp)}]
              </span>
              <span className="wrap-break-word">{log.content}</span>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
