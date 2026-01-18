import React from "react";

export default function VotingCenter() {
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
          <span className="text-2xl font-bold text-white sm:text-3xl">00</span>
          <span className="mt-1 text-[9px] tracking-widest text-white/40 sm:text-[10px]">
            MIN
          </span>
        </div>

        <span className="text-2xl font-bold text-red-500">:</span>

        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-white/5 sm:h-20 sm:w-20">
          <span className="text-2xl font-bold text-red-500 sm:text-3xl">
            42
          </span>
          <span className="mt-1 text-[9px] tracking-widest text-white/40 sm:text-[10px]">
            SEC
          </span>
        </div>
      </div>

      <div className="mt-10 grid w-full max-w-4xl grid-cols-2 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-6">
        {[
          "PLAYER_ALPHA",
          "CYBER_WRAITH",
          "NEON_SPECTRE",
          "DATA_GHOST",
          "PLAYER_04",
          "ECHO_VANISH",
        ].map((name) => {
          const flagged = name === "NEON_SPECTRE";

          return (
            <div
              key={name}
              className={`min-w-0 rounded-lg border px-4 py-4 ${
                flagged
                  ? "border-red-500/60 bg-red-500/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-xs font-semibold tracking-wide text-white sm:text-sm">
                  {name}
                </p>

                {flagged && (
                  <span className="shrink-0 rounded bg-red-500 px-2 py-0.5 text-[9px] tracking-widest text-white">
                    FLAGGED
                  </span>
                )}
              </div>

              {flagged && (
                <p className="mt-1 text-[10px] text-red-400 sm:text-xs">
                  ANOMALY SUSPECT
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col items-center sm:mt-16">
        <button className="w-full rounded-lg bg-red-600 px-10 py-3 text-xs font-semibold tracking-widest text-white hover:bg-red-500 sm:w-auto sm:px-12 sm:text-sm">
          CONFIRM ANOMALY FLAG
        </button>

        <p className="mt-3 text-center text-[9px] tracking-widest text-white/30 sm:text-[10px]">
          CONFIRMING WILL FINALIZE VOTE FOR NEON_SPECTRE
        </p>
      </div>
    </main>
  );
}
