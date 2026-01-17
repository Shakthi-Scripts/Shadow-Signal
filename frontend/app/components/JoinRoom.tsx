"use client"

import React, { useState } from "react";
import api from "../libs/api";

export default function JoinRoom() {
  const [ accessCode, setAccessCode ] = useState<string>("");
  const [ alias , setAlias ] = useState<string>("");

  const handleJoinRoom = async () => {
    if (accessCode?.length === 0 || alias?.length === 0) return;
    await api.joinRoom(accessCode, alias);
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute -inset-px -z-10 rounded-xl bg-[rgb(0,209,174)] opacity-30 blur-lg" />

      <div className="relative rounded-xl border border-emerald-400/30 bg-emerald-950/40 p-8 backdrop-blur-md">
        <div className="mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-[rgb(0,209,174)]">
            terminal
          </span>

          <h3 className="text-lg font-semibold tracking-wide text-white">
            INFILTRATE OPERATION
          </h3>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-xs tracking-widest text-[rgb(0,209,174)]">
              ACCESS CODE
            </label>
            <input
              onInput={(e) => setAccessCode(e.currentTarget.value)}
              type="text"
              placeholder="e.g. XJ-99"
              className="w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/30 focus:border-emerald-400/60 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs tracking-widest text-[rgb(0,209,174)]">
              OPERATOR ID
            </label>
            <input
            onInput={(e) => setAlias(e.currentTarget.value)}
              type="text"
              placeholder="Enter Alias"
              className="w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/30 focus:border-emerald-400/60 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={handleJoinRoom}
            className="rounded-md bg-[rgb(0,209,174)] px-6 py-3 text-sm font-semibold tracking-widest text-black transition hover:opacity-90"
          >
            JOIN ROOM
          </button>

          <span className="text-xs text-white/40 italic">
            Authenticating via encrypted tunnel...
          </span>
        </div>
      </div>
    </div>
  );
}
