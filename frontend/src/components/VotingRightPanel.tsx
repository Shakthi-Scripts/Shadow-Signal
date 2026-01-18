import React from "react";

export default function VotingRightPanel() {
  return (
    <aside className="flex w-full flex-col border-t border-white/10 px-6 py-8 lg:w-80 lg:border-t-0 lg:border-l">
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-xs tracking-widest text-emerald-400">
            GAME PROTOCOL
          </p>

          <div className="space-y-4">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-4 py-3">
              <p className="text-[10px] tracking-widest text-emerald-400">
                CURRENT ROUND
              </p>
              <p className="mt-1 text-xl font-semibold text-white">04 / 06</p>
            </div>

            <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3">
              <p className="text-[10px] tracking-widest text-red-400">
                THREAT LEVEL
              </p>
              <p className="mt-1 text-sm font-semibold text-white">CRITICAL</p>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs tracking-widest text-emerald-400">
            VOTING TALLY
          </p>

          <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
            <div className="mb-2 flex items-center justify-between text-sm text-white">
              <span>Votes Cast</span>
              <span className="font-semibold">4 / 5</span>
            </div>

            <div className="h-2 w-full rounded-full bg-white/10">
              <div className="h-full w-[80%] rounded-full bg-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-5 py-4 lg:mt-auto">
        <p className="text-xs tracking-widest text-emerald-400">
          SECRET KEYPHRASE
        </p>

        <p className="mt-2 text-lg font-semibold tracking-widest text-white">
          &quot;BEACH&quot;
        </p>

        <p className="mt-2 text-xs text-white/40">
          Do not reveal to potential anomalies
        </p>
      </div>
    </aside>
  );
}
