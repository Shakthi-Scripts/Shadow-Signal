"use client";
import React from "react";
import Image from "next/image";
import profileImg from "./icons/profile.jpg";

export default function InGameNavBar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-[rgb(15,22,21)] backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6">
        <div className="flex flex-col leading-tight">
          <p className="text-sm font-semibold tracking-wide text-white sm:text-base">
            SHADOW SIGNAL
          </p>
          <p className="text-[9px] tracking-widest text-emerald-400">
            SECTOR : 07–GAMMA
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden flex-col items-end leading-tight sm:flex">
            <p className="text-[9px] tracking-widest text-emerald-400">
              SYSTEM INTEGRITY
            </p>
            <p className="text-sm font-semibold text-emerald-400">84%</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right leading-tight">
              <p className="text-[9px] tracking-widest text-emerald-400">
                CURRENT ROLE
              </p>
              <p className="text-xs font-semibold tracking-widest text-white">
                SIGNALIST
              </p>
            </div>

            <button className="flex h-9 w-9 items-center justify-center rounded-md border border-emerald-500/40 text-emerald-400 transition hover:bg-emerald-500/10">
            <span className="material-symbols-outlined text-white">
              settings
            </span>
            </button>

            <div className="h-9 w-9 overflow-hidden rounded-md border border-emerald-500/40">
              <Image src={profileImg} alt="Profile" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
