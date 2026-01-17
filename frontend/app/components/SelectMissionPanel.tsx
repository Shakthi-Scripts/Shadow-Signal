"use client";
import React, { useState } from "react";

type ProtocolType = "INFILTRATOR" | "SPY";

export default function SelectMissionPanel() {
  const [selectedProtocol, setSelectedProtocol] =
    useState<ProtocolType>("INFILTRATOR");

  return (
    <main className="mt-6 h-full w-full flex-1 overflow-y-auto bg-black/20 p-6 lg:w-[56%]">
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-white">
          SELECT MISSION PROTOCOL
        </h1>
        <p className="mt-2 text-sm text-white/60">
          Choose how the signal transmission will operate.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          onClick={() => setSelectedProtocol("INFILTRATOR")}
          className={`cursor-pointer rounded-md border p-6 transition-all ${
            selectedProtocol === "INFILTRATOR"
              ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
              : "border-white/10 bg-black/30 hover:border-white/30"
          }`}
        >
          <h3 className="mb-3 text-sm font-semibold text-white">
            INFILTRATOR MODE
          </h3>
          <ul className="space-y-1 text-xs text-white/70">
            <li>• Signal matching required</li>
            <li>• Hidden agents</li>
            <li>• High social deduction</li>
          </ul>
        </div>

        <div
          onClick={() => setSelectedProtocol("SPY")}
          className={`cursor-pointer rounded-md border p-6 transition-all ${
            selectedProtocol === "SPY"
              ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
              : "border-white/10 bg-black/30 hover:border-white/30"
          }`}
        >
          <h3 className="mb-3 text-sm font-semibold text-white">SPY MODE</h3>
          <ul className="space-y-1 text-xs text-white/70">
            <li>• Identity deception focus</li>
            <li>• Double agent role</li>
            <li>• Psychological gameplay</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-6">
        <div>
          <p className="mb-2 text-xs text-white/60">TIMER</p>
          <div className="flex gap-2">
            <OptionButton label="60s" />
            <OptionButton label="90s" />
            <OptionButton label="120s" />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs text-white/60">DIFFICULTY</p>
          <div className="flex gap-2">
            <OptionButton label="Easy" />
            <OptionButton label="Hard" />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-white">SYSTEM STATUS</p>
          <p className="text-xs text-emerald-400">Ready for signal launch</p>
        </div>

        <button className="rounded-md bg-emerald-500 px-6 py-3 text-sm font-semibold text-black">
          START GAME
        </button>
      </div>
    </main>
  );
}

function OptionButton({ label }: { label: string }) {
  return (
    <button className="rounded-md border border-white/20 px-4 py-1.5 text-xs text-white hover:bg-white/10">
      {label}
    </button>
  );
}
