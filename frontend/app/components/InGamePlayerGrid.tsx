import React from "react";

export default function InGamePlayerGrid() {
  const players = [
    "PLAYER_04",
    "OPERATOR_09",
    "XENON_GHOST",
    "VOID_WALKER",
    "CYBER_PUNK",
    "DELTA_RAY",
    "NEON_SOUL",
    "SHADOW_REED",
  ];

  return (
    <div className="mx-6 mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 lg:p-6">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {players.map((player, i) => (
          <div
            key={i}
            className="flex h-28 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-semibold tracking-widest text-white/80 lg:h-32"
          >
            {player}
          </div>
        ))}
      </div>
    </div>
  );
}
