"use client";
import React, { useState } from "react";

export default function InGameTacticalFeed() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    console.log("FEED:", message);
    setMessage("");
  };

  return (
    <aside className="w-full border-t border-white/10 bg-[rgb(13,20,19)] lg:flex lg:min-h-0 lg:w-80 lg:flex-col lg:border-t-0 lg:border-l">
      <div className="shrink-0 border-b border-white/10 px-4 py-3">
        <p className="text-xs tracking-widest text-emerald-400">
          TACTICAL FEED
        </p>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 text-sm text-white/70">
        <p>
          <span className="mr-2 text-xs text-white/30">14:02:31</span>
          <span className="text-emerald-400">SYSTEM:</span> Speaking order
          randomized for Round 2.
        </p>
        <p>
          <span className="mr-2 text-xs text-white/30">14:02:45</span>
          <span className="text-emerald-400">SYSTEM:</span> Player_01 finished
          transmission.
        </p>
        <p>
          <span className="mr-2 text-xs text-white/30">14:03:02</span>
          <span className="text-emerald-400">SYSTEM:</span> Player_02 finished
          transmission.
        </p>
        <p>
          <span className="mr-2 text-xs text-white/30">14:03:15</span>
          <span className="text-emerald-400">SYSTEM:</span> Player_03 finished
          transmission.
        </p>

        <div className="border-l-2 border-emerald-400 bg-emerald-400/10 px-3 py-2 text-white">
          <span className="mr-2 text-xs text-white/40">14:03:30</span>
          <span className="font-semibold">PLAYER_04</span> began transmission.
        </div>

        <div className="rounded-md bg-white/5 px-3 py-2">
          <p className="text-xs tracking-widest text-white/40">XENON_GHOST</p>
          <p className="text-white">Wait, what did he say about the relay?</p>
        </div>

        <div className="rounded-md bg-white/5 px-3 py-2">
          <p className="text-xs tracking-widest text-white/40">VOID_WALKER</p>
          <p className="text-white">Suspect. Nebula wasn&apos;t mentioned.</p>
        </div>
      </div>

      <div className="shrink-0 border-t border-white/10 p-3">
        <div className="flex items-center gap-2 rounded-md border border-emerald-500/40 bg-emerald-950/60 px-3 py-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="SEND TRANSMISSION..."
            className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
          />
          <button onClick={handleSend}>
            <span className="material-symbols-outlined text-sm text-white">
              send
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
