"use client";
import React from "react";

type InGameEndTurnEarlyProps = {
  onEndTurn?: () => void;
};

export default function InGameEndTurnEarly({
  onEndTurn,
}: InGameEndTurnEarlyProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onEndTurn}
        className="flex items-center gap-3 rounded-xl bg-emerald-500 px-7 py-3 text-sm font-bold tracking-widest text-white transition hover:bg-emerald-400 active:scale-[0.98]"
      >
        <span className="material-symbols-outlined text-lg text-white">
          keyboard_double_arrow_right
        </span>
        NEXT ROUND
      </button>
    </div>
  );
}
