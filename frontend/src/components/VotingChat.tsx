import React from "react";

export default function VotingChat() {
  return (
    <aside className="flex w-full flex-col border-t border-white/10 px-4 py-6 lg:min-h-[calc(100vh-64px)] lg:w-80 lg:border-t-0 lg:border-r lg:px-6">
      <div>
        <p className="mb-4 text-xs tracking-widest text-emerald-400">
          ACCUSATION CHAT
        </p>

        <div className="space-y-4 text-sm leading-relaxed text-white/80">
          <p>
            <span className="font-semibold text-emerald-400">
              Cyber_Wraith:
            </span>{" "}
            Neon_Spectre has been awfully quiet during the last sync.
          </p>

          <p>
            <span className="font-semibold text-yellow-400">Neon_Spectre:</span>{" "}
            I was processing data packets! Look at my integrity levels.
          </p>

          <p>
            <span className="font-semibold text-emerald-400">Void_Walker:</span>{" "}
            Suspect detected. Flagging protocol initiated.
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 lg:mt-auto lg:pt-10">
        <p className="mb-2 flex items-center gap-2 text-xs tracking-widest text-red-500">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          ELIMINATION HAZARD ACTIVE
        </p>

        <p className="text-xs leading-relaxed text-white/40">
          Select one player to <span className="italic">&quot;Flag as Anomaly&quot;</span>
          . If the majority agrees, their signal will be severed permanently.
        </p>
      </div>
    </aside>
  );
}
