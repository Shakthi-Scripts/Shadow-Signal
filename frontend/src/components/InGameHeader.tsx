import React from "react";

export default function InGameHeaderStatus() {
  return (
    <div className="flex flex-col items-center gap-4 px-4 py-4 text-center sm:py-6">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex flex-col items-center rounded-md border border-emerald-500/30 bg-emerald-950/60 px-3 py-2 sm:px-4">
          <span className="text-xl font-bold tracking-widest text-white sm:text-2xl">
            00
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
            {" "}
            24
          </span>
          <span className="text-[9px] tracking-widest text-emerald-400 sm:text-[10px]">
            {" "}
            SEC
          </span>
        </div>
      </div>

      <p className="max-w-full text-sm font-bold tracking-wide text-white uppercase sm:text-base sm:tracking-[0.35em]">
        CURRENTLY TRANSMITTING:
        <span className="mt-1 block font-bold tracking-widest text-emerald-400 sm:ml-2 sm:inline">
          PLAYER_04
        </span>
      </p>
    </div>
  );
}
