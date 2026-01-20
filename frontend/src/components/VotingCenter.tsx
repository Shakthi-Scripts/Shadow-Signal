"use client";

import React from "react";
import type { PublicPlayer } from "@/types/game";

interface VotingCenterProps {
  players: PublicPlayer[];
  timeRemaining: number;
  onVote: (targetId: string) => void;
  selectedTarget: string | null;
  playerId: string | null;
  votesRevealed: boolean;
  voteTally: Record<string, number>;
  currentPlayerAlive?: boolean;
}

export default function VotingCenter({
  players,
  timeRemaining,
  onVote,
  selectedTarget,
  playerId,
  votesRevealed,
  voteTally,
  currentPlayerAlive = true,
}: VotingCenterProps) {
  return (
    <main className="flex flex-1 flex-col items-center px-4 sm:px-10">
      <div className="mt-10 text-center sm:mt-14">
        <h1 className="text-2xl font-semibold tracking-[0.3em] text-white sm:text-3xl sm:tracking-[0.4em]">
          VOTING PHASE
        </h1>
        <p className="mt-2 text-xs tracking-widest text-red-500">
          SELECT ONE ANOMALY
        </p>
      </div>

      <div className="mt-8 flex items-center gap-4 sm:mt-10">
        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-white/5 sm:h-20 sm:w-20">
          <span className="text-2xl font-bold text-white sm:text-3xl">
            {String(Math.floor(timeRemaining / 60)).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[9px] tracking-widest text-white/40 sm:text-[10px]">
            MIN
          </span>
        </div>

        <span className="text-2xl font-bold text-red-500">:</span>

        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-white/5 sm:h-20 sm:w-20">
          <span className="text-2xl font-bold text-red-500 sm:text-3xl">
            {String(timeRemaining % 60).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[9px] tracking-widest text-white/40 sm:text-[10px]">
            SEC
          </span>
        </div>
      </div>

      {!currentPlayerAlive && (
        <div className="mt-8 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3">
          <p className="text-center text-sm text-red-400">
            You have been eliminated and cannot vote.
          </p>
        </div>
      )}
      <div className="mt-10 grid w-full max-w-4xl grid-cols-2 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-6">
        {players
          .filter((p) => p.id !== playerId)
          .map((player) => {
            const isSelected = selectedTarget === player.id;
            const votes = voteTally[player.id] || 0;
            const isEliminated = !player.alive;

            return (
              <button
                key={player.id}
                onClick={() =>
                  !votesRevealed &&
                  !isEliminated &&
                  currentPlayerAlive &&
                  onVote(player.id)
                }
                disabled={
                  votesRevealed ||
                  isEliminated ||
                  !!selectedTarget ||
                  !currentPlayerAlive
                }
                className={`min-w-0 rounded-lg border px-4 py-4 text-left transition ${
                  isSelected
                    ? "border-red-500/60 bg-red-500/10"
                    : isEliminated
                      ? "border-white/5 bg-white/5 opacity-50"
                      : "border-white/10 bg-white/5 hover:border-white/30 disabled:cursor-not-allowed"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs font-semibold tracking-wide text-white sm:text-sm">
                    {player.name}
                  </p>

                  {isSelected && (
                    <span className="shrink-0 rounded bg-red-500 px-2 py-0.5 text-[9px] tracking-widest text-white">
                      SELECTED
                    </span>
                  )}
                  {votesRevealed && votes > 0 && (
                    <span className="shrink-0 rounded bg-red-500 px-2 py-0.5 text-[9px] tracking-widest text-white">
                      {votes} VOTES
                    </span>
                  )}
                </div>

                {isSelected && (
                  <p className="mt-1 text-[10px] text-red-400 sm:text-xs">
                    YOUR VOTE
                  </p>
                )}
              </button>
            );
          })}
      </div>

      {selectedTarget && !votesRevealed && (
        <div className="mt-12 flex flex-col items-center sm:mt-16">
          <p className="text-center text-[9px] tracking-widest text-white/30 sm:text-[10px]">
            VOTE CAST FOR{" "}
            {players.find((p) => p.id === selectedTarget)?.name || "UNKNOWN"}
          </p>
        </div>
      )}
      {votesRevealed && (
        <div className="mt-12 flex flex-col items-center sm:mt-16">
          <p className="text-center text-sm tracking-widest text-white/60">
            Votes revealed. Waiting for elimination...
          </p>
        </div>
      )}
    </main>
  );
}
