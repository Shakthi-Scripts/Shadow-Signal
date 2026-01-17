import React from "react";

export default function RoleNavBar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-[rgb(15,22,21)] backdrop-blur-md">
      <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">

          <div className="min-w-0">
            <p className="truncate text-sm sm:text-base font-semibold tracking-wide text-white">
              SHADOW SIGNAL
            </p>
            <p className="truncate text-[9px] sm:text-[10px] tracking-widest text-emerald-400">
              SECURE CONNECTION ESTABLISHED
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="text-right">
            <p className="text-[9px] sm:text-[10px] tracking-widest text-white/40 whitespace-nowrap">
              SYSTEM STATUS
            </p>
            <p className="text-xs sm:text-sm font-semibold tracking-widest text-emerald-400 whitespace-nowrap">
              ENCRYPTED
            </p>
          </div>

          <button className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-md border border-emerald-500/40 text-emerald-400 transition hover:bg-emerald-500/10">
            ⚙
          </button>
        </div>
      </div>
    </div>
  );
}
