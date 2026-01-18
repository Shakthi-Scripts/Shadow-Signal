import React from "react";

interface LogEntry {
  id: number;
  time: string;
  message: string;
}

const logs: LogEntry[] = [
  { id: 1, time: "14:22:01", message: "CIPHER_X connected." },
  { id: 2, time: "14:22:15", message: "NEON_GHOST ready." },
  { id: 3, time: "14:23:42", message: "HOST set mode: INFILTRATOR." },
  { id: 4, time: "14:24:05", message: "VOID_WALKER connected." },
  { id: 5, time: "14:24:08", message: "Protocol check: PASS." },
  { id: 6, time: "14:25:30", message: "Awaiting final signal sync…" },
];

export default function LobbySystemLog() {
  return (
    <aside className="mt-6 w-full min-w-0 border border-white/10 bg-black/20 p-4 lg:w-[22%] lg:min-w-60">
      <header className="mb-4">
        <h2 className="text-sm font-semibold text-white">SYSTEM LOG</h2>
      </header>

      <div className="space-y-2 text-xs">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-2 text-white/70">
            <span className="whitespace-nowrap text-emerald-400">
              [{log.time}]
            </span>
            <span className="wrap-break-word">{log.message}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
