"use client"

import React from "react";
import api from "../libs/api";

export default function CreateRoom() {
  const handleCreateRoom: React.MouseEventHandler = async (e) => {
    e.preventDefault();
    await api.createRoom();
  };
  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute -inset-1 -z-10 rounded-xl bg-[rgb(0,209,174)] opacity-40 blur-xl" />

      <div className="relative rounded-xl border border-[rgb(0,209,174)]/60 bg-emerald-950/50 p-10 backdrop-blur-lg">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-xl text-[rgb(0,209,174)]">▸</span>
          <h3 className="text-xl font-semibold tracking-wide text-white">
            INITIATE SIGNAL
          </h3>
        </div>

        <p className="mb-8 text-sm leading-relaxed text-white/70">
          Establish a new secure frequency. Invite up to 12 operators for a
          deep-cover extraction mission.
        </p>

        <div className="mb-8 flex items-center justify-between rounded-md border border-white/15 bg-black/30 px-4 py-4">
          <span className="text-xs tracking-widest text-white/60">
            PRIVACY PROTOCOL
          </span>
          <span className="text-sm font-semibold text-[rgb(0,209,174)]">
            PRIVATE
          </span>
        </div>

        <button
          onClick={handleCreateRoom}
          className="w-full rounded-md border border-[rgb(0,209,174)] bg-transparent px-6 py-4 text-sm font-semibold tracking-widest text-[rgb(0,209,174)] transition hover:bg-[rgb(0,209,174)]/10"
        >
          INITIALIZE ROOM
        </button>
      </div>
    </div>
  );
}
