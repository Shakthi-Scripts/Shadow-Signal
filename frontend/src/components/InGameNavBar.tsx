import React from "react";

export default function InGameNavBar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-[rgb(15,22,21)] backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-3 sm:h-16 sm:px-6">
        <p className="truncate text-sm font-semibold tracking-wide text-white sm:text-base">
          SHADOW SIGNAL
        </p>

        <div className="flex items-center gap-2 sm:gap-4">
          <span className="relative inline-flex items-center gap-1.5 rounded-md border border-emerald-500/40 bg-emerald-950/60 px-2 py-1 text-[9px] font-semibold tracking-widest text-emerald-400 sm:px-3 sm:text-xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            </span>
            PHASE : TYPING
          </span>

          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-emerald-500/40 text-emerald-400 transition hover:bg-emerald-500/10 sm:h-9 sm:w-9">
            ⚙
          </button>

          <div className="text-right leading-tight">
            <p className="text-[8px] tracking-widest text-emerald-400 sm:text-[9px]">
              PROTOCOL
            </p>
            <p className="text-[10px] font-semibold tracking-widest text-white sm:text-xs">
              ALIAS_139
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
