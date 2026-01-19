"use client";

import React, { useState } from "react";
import api from "../libs/api";
import { useRouter } from "next/navigation";

export default function CreateRoom() {
  const [alias, setAlias] = useState("");
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [aliasError, setAliasError] = useState<string>("");
  const router = useRouter();
  const handleCreateRoom: React.MouseEventHandler = async (e) => {
    e.preventDefault();
    if (alias.length === 0) return;
    if (alias.length >= 20) {
      setAliasError("Alias must be less than 20 characters");
      return;
    }
    setAliasError("");
    try {
      setIsCreatingRoom(true);
      const result = await api.createRoom(alias);
      if (result.success && result.inviteCode && result.playerId) {
        localStorage.setItem("playerAlias", alias);
        localStorage.setItem("playerId", result.playerId);
        router.push(`/game/${result.inviteCode}`);
      } else {
        alert(result.error || "Failed to create room");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create room");
    } finally {
      setIsCreatingRoom(false);
    }
  };
  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute -inset-1 -z-10 rounded-xl bg-[rgb(0,209,174)] opacity-30 blur-xl" />

      <div className="relative flex flex-col gap-8 rounded-xl border border-[rgb(0,209,174)]/60 bg-emerald-950/50 p-10 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <span className="text-xl text-[rgb(0,209,174)]">▸</span>
          <h3 className="text-xl font-semibold tracking-wide text-white">
            INITIATE SIGNAL
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-white/70">
          Establish a new secure frequency. Invite up to 12 operators for a
          deep-cover extraction mission.
        </p>

        <input
          onInput={(e) => {
            const value = e.currentTarget.value.trim();
            setAlias(value);
            if (value.length >= 20) {
              setAliasError("Alias must be less than 20 characters");
            } else {
              setAliasError("");
            }
          }}
          className="w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/30 focus:border-emerald-400/60 focus:outline-none"
          placeholder="Enter Alias"
        />
        {aliasError && (
          <p className="text-xs text-red-400">{aliasError}</p>
        )}

        <button
          onClick={handleCreateRoom}
          className="w-full rounded-md border border-[rgb(0,209,174)] bg-transparent px-6 py-4 text-sm font-semibold tracking-widest text-[rgb(0,209,174)] transition hover:bg-[rgb(0,209,174)]/10 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
          disabled={alias.length === 0 || alias.length >= 20}
        >
          {isCreatingRoom ? "INITIALIZING ..." : "INITIALIZE ROOM"}
        </button>
      </div>
    </div>
  );
}
