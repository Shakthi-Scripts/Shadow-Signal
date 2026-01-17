import React from "react";
import StartGameButton from "./StartGameButton";

function RoleCurrentAssignment() {
  return (
    <div className="w-full max-w-md rounded-xl border border-emerald-400/30 bg-linear-to-b from-emerald-950/60 to-emerald-950/30 p-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-[10px] tracking-widest text-emerald-400/70">
            CURRENT ASSIGNMENT
          </p>
          <h3 className="mt-1 text-3xl font-bold tracking-wide text-white">AGENT</h3>
        </div>
      </div>

      <ul className="space-y-4 text-sm text-emerald-200">
        <li className="flex gap-3">
          <span className="mt-1 h-4 w-4 flex items-center justify-center rounded-full border border-emerald-400 text-[10px] text-emerald-400">
            ✓
          </span>
          Protect the secret word from the Shadow.
        </li>

        <li className="flex gap-3">
          <span className="mt-1 h-4 w-4 flex items-center justify-center rounded-full border border-emerald-400 text-[10px] text-emerald-400">
            ✓
          </span>
          Identify the infiltrator through cryptic signals.
        </li>
      </ul>

      <button className="mt-6 w-full rounded-md border border-emerald-400/30 py-3 text-sm tracking-widest text-emerald-300 transition hover:bg-emerald-400/10">
        ROLE DETAILS →
      </button>
    </div>
  );
}

export default RoleCurrentAssignment;
