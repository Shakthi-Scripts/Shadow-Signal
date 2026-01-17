import React from "react";

export default function LobbyNavBar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-[rgb(15,22,21) backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xl font-semibold tracking-wide text-white">
              SHADOW SIGNAL
            </p>
           <span className="relative inline-flex items-center gap-1.5 rounded-md  px-3 py-1 text-[10px] sm:text-xs font-semibold tracking-widest text-emerald-400">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
        </span>
        SIGNAL ACTIVE
      </span>
          </div>
        </div>



        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] tracking-widest text-white/40">
              FREQUENCY CODE
            </p>
            <p className="text-sm font-semibold tracking-widest text-white">
              SIGNAL-772
            </p>
          </div>

          <button className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/70 transition hover:border-white/30 hover:text-white">
            ⚙
          </button>

          <div className="h-9 w-9 overflow-hidden rounded-md border border-white/10 bg-black/40">
            <div className="h-full w-full bg-linear-to-br from-emerald-400/40 to-black" />
          </div>
        </div>
      </div>
    </div>
  );
}
