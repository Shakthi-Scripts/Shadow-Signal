import React from "react";
import Image from "next/image";
import profileImg from "./icons/profile.jpg";

export default function VictoryNavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[rgb(12,18,18)] backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6">
        <div className="leading-tight">
          <p className="text-sm font-semibold tracking-wide text-white sm:text-base">
            SHADOW SIGNAL
          </p>
          <p className="text-[10px] tracking-widest text-emerald-400">
            ENCRYPTION: VERIFIED
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden text-right leading-tight sm:block">
            <p className="text-[10px] tracking-widest text-emerald-400">
              SESSION OUTCOME
            </p>
            <p className="text-sm font-semibold tracking-widest text-emerald-300">
              TOTAL VICTORY
            </p>
          </div>

          <p className="text-xs font-semibold tracking-widest text-emerald-300 sm:hidden">
            VICTORY
          </p>

          <div className="h-9 w-9 overflow-hidden rounded-md border border-emerald-500/40">
            <Image
              src={profileImg}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
