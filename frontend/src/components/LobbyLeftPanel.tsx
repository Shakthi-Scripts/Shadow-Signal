"use client";

import React from "react";
import { useGame } from "@/contexts/GameContext";
import type { PublicPlayer } from "@/types/game";

export default function LobbyLeftPanel() {
  const { gameState } = useGame();

  if (!gameState) {
    return (
      <aside className="mt-6 h-full w-full min-w-60 overflow-y-auto border-r border-white/10 bg-black/20 p-4 lg:w-[22%]">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">PERSONNEL</h2>
          <p className="text-sm text-emerald-400">Loading...</p>
        </div>
      </aside>
    );
  }

  const players = Object.values(gameState.players).filter((p) => p.connected);
  const alivePlayers = players.filter((p) => p.alive);
  const maxPlayers = gameState.maxPlayers || 12;

  return (
    <aside className="mt-6 h-full w-full min-w-60 overflow-y-auto border-r border-white/10 bg-black/20 p-4 lg:w-[22%]">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">PERSONNEL</h2>
        <p className="text-sm text-emerald-400">
          ACTIVE LINKS: {players.length} / {maxPlayers}
        </p>
      </div>

      <div className="space-y-3">
        {players.map((player) => (
          <div
            key={player.id}
            className={`flex items-center justify-between rounded-md border border-white/10 bg-black/30 p-3 ${
              !player.alive ? "opacity-50" : ""
            }`}
          >
            <div>
              <div className="text-sm font-semibold text-white">
                {player.name}
              </div>
              <div className="mt-1 text-xs text-emerald-400">
                {player.connected
                  ? player.alive
                    ? "CONNECTED"
                    : "ELIMINATED"
                  : "DISCONNECTED"}
              </div>
            </div>
            {player.id === gameState.hostPlayerId && (
              <div className="text-sm">Host</div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
