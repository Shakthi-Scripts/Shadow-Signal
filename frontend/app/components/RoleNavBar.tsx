import React from "react";

export default function RoleNavBar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-[rgb(15,22,21)] backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-wide text-white sm:text-base">
              SHADOW SIGNAL
            </p>
            <p className="truncate text-[9px] tracking-widest text-emerald-400 sm:text-[10px]">
              SECURE CONNECTION ESTABLISHED
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <div className="text-right">
            <p className="text-[9px] tracking-widest whitespace-nowrap text-white/40 sm:text-[10px]">
              SYSTEM STATUS
            </p>
            <p className="text-xs font-semibold tracking-widest whitespace-nowrap text-emerald-400 sm:text-sm">
              ENCRYPTED
            </p>
          </div>

          <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-emerald-500/40 text-emerald-400 transition hover:bg-emerald-500/10 sm:h-9 sm:w-9">
            <span className="material-symbols-outlined text-white">
              settings
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
