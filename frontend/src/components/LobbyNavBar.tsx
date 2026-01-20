"use client";

import React, { useState, useEffect } from "react";

type LobbyNavBarProps = {
  inviteCode?: string;
};
export default function LobbyNavBar({ inviteCode }: LobbyNavBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!inviteCode) return;

    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy invite code:", err);
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

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

          <div className="relative">
            <button
              onClick={handleCopy}
              disabled={!inviteCode}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/70 transition hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:h-9 sm:w-9"
              title={copied ? "Copied!" : "Copy invite code"}
            >
              <span className="material-symbols-outlined">
                {copied ? "check" : "content_copy"}
              </span>
            </button>
            {copied && (
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-emerald-600 px-3 py-2 text-xs text-white shadow-lg">
                Copied!
                <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-emerald-600"></div>
              </div>
            )}
          </div>

          <div className="h-8 w-8 overflow-hidden rounded-md border border-white/10 bg-black/40 sm:h-9 sm:w-9">
            <div className="h-full w-full bg-linear-to-br from-emerald-400/40 to-black" />
          </div>
        </div>
      </div>
    </div>
  );
}
