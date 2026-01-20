import React from "react";

export default function VictorySummary() {
    return (
        <section className="mx-auto mt-6 flex w-full max-w-5xl flex-col gap-5 px-6 lg:flex-row">
            <div className="flex flex-1 flex-col items-center rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-6 py-5 text-center">
                <div className="mb-3 mt-15 flex h-20 w-20 items-center justify-center rounded-xl border border-emerald-400/40 bg-emerald-500/10">
                    <span className="material-symbols-outlined text-white" style={{ fontSize: "80px" }}>
                        trophy
                    </span>
                </div>

                <h2 className="text-4xl font-semibold tracking-widest text-white">
                    AGENTS
                </h2>
                <p className="mt-1 text-2xl tracking-widest text-emerald-400">
                    MISSION ACCOMPLISHED
                </p>
            </div>

            <div className="flex flex-[1.3] flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                        <p className="text-[10px] tracking-widest text-white/50">
                         INFILTRATOR'S WORD
                        </p>
                        <p className="mt-1 text-lg font-semibold text-red-500">
                            WATER
                        </p>
                    </div>

                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-4 py-3">
                        <p className="text-[10px] tracking-widest text-emerald-400">
                            SECRET KEYPHRASE
                        </p>
                        <p className="mt-1 text-lg font-semibold tracking-widest text-white">
                            BEACH
                        </p>
                    </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
                    <p className="mb-3 text-[10px] tracking-widest text-white font-bold">
                        PLAYERS SUMMARY
                    </p>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">
                            <span className="text-sm text-white">Player_Alpha</span>
                            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[9px] tracking-widest text-emerald-400">
                                AGENT
                            </span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">
                            <span className="text-sm text-white">Cyber_Wraith</span>
                            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[9px] tracking-widest text-emerald-400">
                               AGENT
                            </span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2">
                            <span className="text-sm text-white">Neon_Spectre</span>
                            <span className="rounded bg-red-500/20 px-2 py-0.5 text-[9px] tracking-widest text-red-400">
                                INFILTRATOR
                            </span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">
                            <span className="text-sm text-white">Void_Walker</span>
                            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[9px] tracking-widest text-emerald-400">
                                AGENT
                            </span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">
                            <span className="text-sm text-white">Echo_Vanish</span>
                            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[9px] tracking-widest text-emerald-400">
                                AGENT
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
