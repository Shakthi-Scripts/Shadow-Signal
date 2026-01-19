"use client";

import React from "react";
import type { PublicPlayer } from "@/types/game";

interface InGamePlayerGridProps {
  players: PublicPlayer[];
  currentPlayerId: string | null;
  playerId: string | null;
}

export default function InGamePlayerGrid({
  players,
  currentPlayerId,
  playerId,
}: InGamePlayerGridProps) {
  return (
    <div className="mx-6 mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 lg:p-6">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {players.map((player) => {
          const isCurrentSpeaker = player.id === currentPlayerId;
          const isMe = player.id === playerId;

          return (
            <div
              key={player.id}
              className={`flex h-28 items-center justify-center rounded-xl border text-sm font-semibold tracking-widest lg:h-32 ${
                isCurrentSpeaker
                  ? "border-emerald-400 bg-emerald-500/20 text-white"
                  : !player.alive
                    ? "border-white/5 bg-white/5 text-white/40 opacity-50"
                    : "border-white/10 bg-white/5 text-white/80"
              }`}
            >
              <div className="flex gap-3 text-center">
                <div>{player.name}</div>
                {isMe && (
                  <div className="mt-1 text-[10px] text-emerald-400">(YOU)</div>
                )}
                {isCurrentSpeaker && (
                  <div className="mt-1 text-[10px] text-emerald-400">
                    SPEAKING
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
