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

export default function SystemLog() {
  return (
    <aside className="w-full mt-4 mr-4 ml-2 max-w-sm border border-white/10 bg-black/20 p-4">
      <header className="mb-4">
        <h2 className="text-sm font-semibold text-white">SYSTEM LOG</h2>
      </header>

      <div className="max-h-100 space-y-2 overflow-y-auto text-xs">
        {logs.map((log) => (
          <LogItem key={log.id} log={log} />
        ))}
      </div>
    </aside>
  );
}

function LogItem({ log }: { log: LogEntry }) {
  return (
    <div className="flex gap-2 text-white/70">
      <span className="text-emerald-400">[{log.time}]</span>
      <span>{log.message}</span>
    </div>
  );
}
