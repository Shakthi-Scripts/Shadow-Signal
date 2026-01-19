import React from "react";

type LobbyNavBarProps = {
  inviteCode?: string;
};
export default function LobbyNavBar({ inviteCode }: LobbyNavBarProps) {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-[rgb(15,22,21)] backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-base font-semibold tracking-wide text-white sm:text-xl">
              SHADOW SIGNAL
            </p>
            <span className="relative inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[9px] font-semibold tracking-widest text-emerald-400 sm:px-3 sm:text-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              </span>
              SIGNAL ACTIVE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-[9px] tracking-widest text-white/40 sm:text-[10px]">
              INVITE CODE
            </p>
            <p className="text-xs font-semibold tracking-widest text-white sm:text-sm">
              {inviteCode}
            </p>
          </div>

          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/70 transition hover:border-white/30 hover:text-white sm:h-9 sm:w-9">
            <span className="material-symbols-outlined">content_copy</span>
          </button>

          <div className="h-8 w-8 overflow-hidden rounded-md border border-white/10 bg-black/40 sm:h-9 sm:w-9">
            <div className="h-full w-full bg-linear-to-br from-emerald-400/40 to-black" />
          </div>
        </div>
      </div>
    </div>
  );
}
