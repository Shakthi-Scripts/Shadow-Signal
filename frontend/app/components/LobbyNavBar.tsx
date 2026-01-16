import React from "react";

export default function LobbyNavBar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-emerald-950/40 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/40 text-[rgb(0,209,174)]">
            ◎
          </div>

          <div>
            <p className="text-sm font-semibold tracking-wide text-white">
              SHADOW SIGNAL
            </p>
            <p className="text-[10px] tracking-widest text-[rgb(0,209,174)]">
              ● SIGNAL ACTIVE
            </p>
          </div>
        </div>

        {/* Center (reserved) */}
        <div />

        {/* Right */}
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
