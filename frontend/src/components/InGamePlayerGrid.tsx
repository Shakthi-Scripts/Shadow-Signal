"use client";

import React from "react";
import type { PublicPlayer, eliminatedPlayer } from "@/types/game";

interface InGamePlayerGridProps {
  players: PublicPlayer[];
  currentPlayerId: string | null;
  playerId: string | null;
  eliminatedPlayers: Record<string, eliminatedPlayer> | null;
}

export default function InGamePlayerGrid({
  players,
  currentPlayerId,
  playerId,
  eliminatedPlayers,
}: InGamePlayerGridProps) {
  return (
    <div className="mx-6 mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 lg:p-6">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {players.map((player) => {
          const isCurrentSpeaker = player.id === currentPlayerId;
          const isMe = player.id === playerId;
          const isEliminated = !player.alive;
          const eliminationInfo = eliminatedPlayers?.[player.id];
          const eliminationReason =
            eliminationInfo?.reason === "vote"
              ? "VOTED OUT"
              : eliminationInfo?.reason === "disconnection"
                ? "DISCONNECTED"
                : null;

          return (
            <div
              key={player.id}
              className={`flex h-28 flex-col items-center justify-center rounded-xl border text-sm font-semibold tracking-widest lg:h-32 ${
                isCurrentSpeaker
                  ? "border-emerald-400 bg-emerald-500/20 text-white"
                  : isEliminated
                    ? "border-red-500/40 bg-red-500/10 text-white/60"
                    : "border-white/10 bg-white/5 text-white/80"
              }`}
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <div className="flex items-center gap-2">
                  <div>{player.name}</div>
                  {isMe && (
                    <div className="text-[10px] text-emerald-400">(YOU)</div>
                  )}
                </div>
                {isCurrentSpeaker && (
                  <div className="text-[10px] text-emerald-400">TYPING</div>
                )}
                {isEliminated && eliminationReason && (
                  <div className="text-[9px] text-red-400">ELIMINATED</div>
                )}
                {isEliminated && eliminationReason && (
                  <div className="text-[8px] text-red-300/60">
                    {eliminationReason}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
