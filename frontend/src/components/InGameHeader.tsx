"use client";

import React from "react";

interface InGameHeaderProps {
  round: number;
  timeRemaining: number;
  currentPlayer: string;
}

export default function InGameHeader({
  round,
  timeRemaining,
  currentPlayer,
}: InGameHeaderProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-4 text-center sm:py-6">
      <div className="text-sm text-white/60">ROUND {round}</div>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex flex-col items-center rounded-md border border-emerald-500/30 bg-emerald-950/60 px-3 py-2 sm:px-4">
          <span className="text-xl font-bold tracking-widest text-white sm:text-2xl">
            {String(minutes).padStart(2, "0")}
          </span>
          <span className="text-[9px] tracking-widest text-emerald-400 sm:text-[10px]">
            MIN
          </span>
        </div>

        <span className="text-xl font-bold text-emerald-400 sm:text-2xl">
          :
        </span>

        <div className="flex flex-col items-center rounded-md border border-emerald-500/30 bg-emerald-950/60 px-3 py-2 sm:px-4">
          <span className="text-xl font-bold tracking-widest text-white sm:text-2xl">
            {String(seconds).padStart(2, "0")}
          </span>
          <span className="text-[9px] tracking-widest text-emerald-400 sm:text-[10px]">
            SEC
          </span>
        </div>
      </div>

      <p className="max-w-full text-sm font-bold tracking-wide text-white uppercase sm:text-base sm:tracking-[0.35em]">
        CURRENTLY TRANSMITTING:
        <span className="mt-1 block font-bold tracking-widest text-emerald-400 sm:ml-2 sm:inline">
          {currentPlayer || "WAITING..."}
        </span>
      </p>
    </div>
  );
}
